"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  /** Available to withdraw (USD) — calculated as a portion of rewards */
  available: number;
  /** Pending (being processed) */
  pending: number;
  /** Total ever earned */
  total: number;
}

export interface AppStore {
  user: UserState;
  progress: ProgressState;
  points: PointsState;
  streak: StreakState;
  balance: BalanceState;

  // Actions
  addPoints: (amount: number, source: PointSource) => void;
  checkAndUpdateStreak: () => void;
  requestWithdraw: (amount: number) => void;
  setUserName: (name: string) => void;
  setUserLevel: (level: UserLevel) => void;
  completeLesson: (level: UserLevel, scorePercentage: number) => void;
}

export type PointSource =
  | "lesson"
  | "daily_login"
  | "watch_ad"
  | "bug_report"
  | "call"
  | "onboarding";

// ─── ZBT Reward Formula ───────────────────────────────────────────
// In Closed Beta (ЗБТ): 1 point = $0.08, NO caps
export const ZBT_RATE = 0.08;

export function calcReward(points: number): number {
  return parseFloat((points * ZBT_RATE).toFixed(2));
}

// ─── Point Values ─────────────────────────────────────────────────
export const POINT_VALUES: Record<PointSource, number> = {
  lesson: 15,
  daily_login: 5,
  watch_ad: 3,
  bug_report: 10,
  call: 20,
  onboarding: 10,
};

const INITIAL_STATE = {
  user: {
    name: "Пользователь",
    avatar: "П",
    status: "Активный" as UserStatus,
    level: "A0" as UserLevel,
    rank: 13,
    rankTarget: 10,
  },
  progress: {
    A0: 0,
    A1: 0,
    A2: 0,
    B1: 0,
  },
  points: {
    total: 1000,
    todayGain: 45,
    pointsToTop: 751,
  },
  streak: {
    days: 3,
    lastLoginDate: null,
  },
  balance: {
    available: 50.0,
    pending: 30.0,
    total: 80.0,
  },
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addPoints: (amount: number, source: PointSource) => {
        // Streak multiplier applied on top of base points
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
              // Decrease pointsToTop (can't go below 0)
              pointsToTop: Math.max(0, state.points.pointsToTop - earned),
            },
            balance: {
              ...state.balance,
              total: newReward,
              // 62.5% immediately available, 37.5% pending
              available: parseFloat((newReward * 0.625).toFixed(2)),
              pending: parseFloat((newReward * 0.375).toFixed(2)),
            },
          };
        });

        console.log(`[ZBT] +${earned} pts from ${source} (x${multiplier} streak)`);
      },

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const { streak } = get();

        if (streak.lastLoginDate === today) return; // already logged today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newDays = streak.lastLoginDate === yesterday ? streak.days + 1 : 1;

        set((state) => ({
          streak: { days: newDays, lastLoginDate: today },
          // Daily login bonus
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
          // If level is placed higher, auto-complete previous levels
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
          const isExam = currentProgress === 39; // 40th lesson is index 39
          
          if (isExam) {
            if (scorePercentage >= 80) {
              // Passed exam! Upgrade level if possible
              let nextLevel: UserLevel = level;
              if (level === "A0") nextLevel = "A1";
              else if (level === "A1") nextLevel = "A2";
              else if (level === "A2") nextLevel = "B1";
              
              return {
                user: { ...state.user, level: nextLevel },
                progress: { ...state.progress, [level]: 40 }, // maxed out this level
              };
            } else {
              // Failed exam. Rollback 3 lessons
              return {
                progress: {
                  ...state.progress,
                  [level]: Math.max(0, currentProgress - 3),
                },
              };
            }
          } else {
            // Normal lesson pass. Just increment progress.
            return {
              progress: {
                ...state.progress,
                [level]: Math.min(39, currentProgress + 1), // cap at 39 (exam)
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
