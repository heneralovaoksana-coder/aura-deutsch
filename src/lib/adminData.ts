"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export interface FirebaseUser {
  id: string; // Telegram ID (document ID)
  user: {
    name: string;
    avatar: string;
    status: string;
    level: string;
    rank: number;
    rankTarget: number;
  };
  progress: {
    A0: number;
    A1: number;
    A2: number;
    B1: number;
  };
  points: {
    total: number;
    todayGain: number;
    pointsToTop: number;
  };
  streak: {
    days: number;
    lastLoginDate: string | null;
  };
  balance: {
    available: number;
    pending: number;
    total: number;
  };
  createdAt?: string;
  lastUpdated?: string;
}

/** Fetch all users from Firestore */
export async function fetchAllUsers(): Promise<FirebaseUser[]> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("points.total", "desc"), limit(500));
  
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseUser[];
  } catch (error) {
    console.error("Error fetching users:", error);
    // Fallback: fetch without ordering (in case index not created)
    try {
      const fallbackSnapshot = await getDocs(collection(db, "users"));
      return fallbackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirebaseUser[];
    } catch (fallbackError) {
      console.error("Fallback fetch also failed:", fallbackError);
      return [];
    }
  }
}

/** Aggregated stats for admin dashboard */
export interface AdminStats {
  totalUsers: number;
  totalPoints: number;
  totalBalanceUSD: number;
  activeToday: number;
  avgStreak: number;
  levelDistribution: Record<string, number>;
}

export function computeStats(users: FirebaseUser[]): AdminStats {
  const today = new Date().toISOString().split("T")[0];

  const levelDistribution: Record<string, number> = { A0: 0, A1: 0, A2: 0, B1: 0 };

  let totalPoints = 0;
  let totalBalanceUSD = 0;
  let activeToday = 0;
  let totalStreakDays = 0;

  for (const u of users) {
    totalPoints += u.points?.total || 0;
    totalBalanceUSD += u.balance?.total || 0;
    totalStreakDays += u.streak?.days || 0;

    if (u.streak?.lastLoginDate === today) activeToday++;

    const lvl = u.user?.level || "A0";
    levelDistribution[lvl] = (levelDistribution[lvl] || 0) + 1;
  }

  return {
    totalUsers: users.length,
    totalPoints,
    totalBalanceUSD: parseFloat(totalBalanceUSD.toFixed(2)),
    activeToday,
    avgStreak: users.length ? parseFloat((totalStreakDays / users.length).toFixed(1)) : 0,
    levelDistribution,
  };
}
