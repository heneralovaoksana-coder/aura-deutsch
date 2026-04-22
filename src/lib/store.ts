"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ─── Types ────────────────────────────────────────────────────────
export type UserStatus = "Бета-тест" | "ТОП" | "Активный" | "Новичок";
export type UserLevel = "A0" | "A1" | "A2" | "B1";

export interface UserState {
  name: string;
  avatar: string; // initials
  status: UserStatus;
  level: UserLevel;
  rank: number; // e.g. 13
  rankTarget: number; // e.g. 10 (ТОП-10)
}

export interface ProgressState {
  A0: number; // max unlocked lesson (0 to 39)
  A1: number;
  A2: number;
  B1: number;
}

export interface PointsState {
  total: number;
  todayGain: number;
  pointsToTop: number; // points needed to reach TOP
}

export interface StreakState {
  days: number;
  lastLoginDate: string | null; // ISO date string
}

export interface BalanceState {
  available: number;
  pending: number;
  total: number;
}

export interface AppStore {
  telegramId: string | null;
  isLoadedFromDB: boolean;
  user: UserState;
  progress: ProgressState;
  points: PointsState;
  streak: StreakState;
  balance: BalanceState;

  // Actions
  initUser: (tgUser: any) => Promise<void>;
  addPoints: (amount: number, source: PointSource) => void;
  checkAndUpdateStreak: () => void;
  requestWithdraw: (amount: number) => void;
  setUserName: (name: string) => void;
  setUserLevel: (level: UserLevel) => void;
  completeLesson: (level: UserLevel, scorePercentage: number) => void;
}

export type PointSource = "lesson" | "daily_login" | "watch_ad" | "bug_report" | "call" | "onboarding";

export const ZBT_RATE = 0.08;

export function calcReward(points: number): number {
  return parseFloat((points * ZBT_RATE).toFixed(2));
}

export const POINT_VALUES: Record<PointSource, number> = {
  lesson: 15,
  daily_login: 5,
  watch_ad: 3,
  bug_report: 10,
  call: 20,
  onboarding: 10,
};

const INITIAL_STATE = {
  telegramId: null,
  isLoadedFromDB: false,
  user: {
    name: "Пользователь",
    avatar: "П",
    status: "Новичок" as UserStatus,
    level: "A0" as UserLevel,
    rank: 0,
    rankTarget: 10,
  },
  progress: {
    A0: 0,
    A1: 0,
    A2: 0,
    B1: 0,
  },
  points: {
    total: 0,
    todayGain: 0,
    pointsToTop: 2600,
  },
  streak: {
    days: 0,
    lastLoginDate: null,
  },
  balance: {
    available: 0,
    pending: 0,
    total: 0,
  },
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      initUser: async (tgUser: any) => {
        if (!tgUser?.id) return;
        const tgId = String(tgUser.id);
        const name = tgUser.first_name || "User";

        const docRef = doc(db, "users", tgId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Load user from DB
          const dbData = docSnap.data();
          set({
            telegramId: tgId,
            isLoadedFromDB: true,
            user: dbData.user || INITIAL_STATE.user,
            progress: dbData.progress || INITIAL_STATE.progress,
            points: dbData.points || INITIAL_STATE.points,
            streak: dbData.streak || INITIAL_STATE.streak,
            balance: dbData.balance || INITIAL_STATE.balance,
          });
        } else {
          // New user
          const newUserState = {
            ...INITIAL_STATE.user,
            name,
            avatar: name.charAt(0).toUpperCase(),
          };
          set({
            telegramId: tgId,
            isLoadedFromDB: true,
            user: newUserState,
            progress: INITIAL_STATE.progress,
            points: INITIAL_STATE.points,
            streak: INITIAL_STATE.streak,
            balance: INITIAL_STATE.balance,
          });
          // Immediately save to DB
          await setDoc(docRef, {
            user: newUserState,
            progress: INITIAL_STATE.progress,
            points: INITIAL_STATE.points,
            streak: INITIAL_STATE.streak,
            balance: INITIAL_STATE.balance,
            createdAt: new Date().toISOString()
          });
        }
      },

      addPoints: (amount: number, source: PointSource) => {
        const { streak } = get();
        let multiplier = 1;
        if (streak.days >= 14) multiplier = 1.5;
        else if (streak.days >= 7) multiplier = 1.25;
        else if (streak.days >= 3) multiplier = 1.1;

        const earned = Math.round(amount * multiplier);

        set((state) => {
          const newTotal = state.points.total + earned;
          const newReward = calcReward(newTotal);

          return {
            points: {
              ...state.points,
              total: newTotal,
              todayGain: state.points.todayGain + earned,
              pointsToTop: Math.max(0, state.points.pointsToTop - earned),
            },
            balance: {
              ...state.balance,
              total: newReward,
              available: parseFloat((newReward * 0.625).toFixed(2)),
              pending: parseFloat((newReward * 0.375).toFixed(2)),
            },
          };
        });
      },

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const { streak } = get();
        if (streak.lastLoginDate === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newDays = streak.lastLoginDate === yesterday ? streak.days + 1 : 1;

        set((state) => ({
          streak: { days: newDays, lastLoginDate: today },
          points: {
            ...state.points,
            total: state.points.total + POINT_VALUES.daily_login,
            todayGain: state.points.todayGain + POINT_VALUES.daily_login,
          },
        }));
      },

      requestWithdraw: (amount: number) => {
        set((state) => ({
          balance: {
            ...state.balance,
            available: Math.max(0, state.balance.available - amount),
            pending: state.balance.pending + amount,
          },
        }));
      },

      setUserName: (name: string) => {
        set((state) => ({
          user: {
            ...state.user,
            name,
            avatar: name.charAt(0).toUpperCase(),
          },
        }));
      },

      setUserLevel: (level: UserLevel) => {
        set((state) => {
          const newProgress = { ...state.progress };
          if (level === "A1" || level === "A2" || level === "B1") newProgress.A0 = 40;
          if (level === "A2" || level === "B1") newProgress.A1 = 40;
          if (level === "B1") newProgress.A2 = 40;

          return {
            user: { ...state.user, level },
            progress: newProgress,
          };
        });
      },

      completeLesson: (level: UserLevel, scorePercentage: number) => {
        set((state) => {
          const currentProgress = state.progress[level];
          const isExam = currentProgress === 39;
          
          if (isExam) {
            if (scorePercentage >= 80) {
              let nextLevel: UserLevel = level;
              if (level === "A0") nextLevel = "A1";
              else if (level === "A1") nextLevel = "A2";
              else if (level === "A2") nextLevel = "B1";
              
              return {
                user: { ...state.user, level: nextLevel },
                progress: { ...state.progress, [level]: 40 },
              };
            } else {
              return {
                progress: {
                  ...state.progress,
                  [level]: Math.max(0, currentProgress - 3),
                },
              };
            }
          } else {
            return {
              progress: {
                ...state.progress,
                [level]: Math.min(39, currentProgress + 1),
              },
            };
          }
        });
      },
    }),
    {
      name: "aura-deutsch-store",
      version: 1,
    }
  )
);

// Subscriber to sync state changes back to Firebase
useAppStore.subscribe((state, prevState) => {
  if (state.telegramId && state.isLoadedFromDB) {
    // Only save to DB if important data changed to prevent unnecessary writes
    const changed = 
      JSON.stringify(state.user) !== JSON.stringify(prevState.user) ||
      JSON.stringify(state.progress) !== JSON.stringify(prevState.progress) ||
      JSON.stringify(state.points) !== JSON.stringify(prevState.points) ||
      JSON.stringify(state.balance) !== JSON.stringify(prevState.balance) ||
      JSON.stringify(state.streak) !== JSON.stringify(prevState.streak);

    if (changed) {
      const docRef = doc(db, "users", state.telegramId);
      setDoc(docRef, {
        user: state.user,
        progress: state.progress,
        points: state.points,
        balance: state.balance,
        streak: state.streak,
        lastUpdated: new Date().toISOString()
      }, { merge: true }).catch(console.error);
    }
  }
});
