import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLfwQHPTE6rbzVxlV-IlUgZgkSNAMwaTQ",
  authDomain: "auradeutsch-8a000.firebaseapp.com",
  projectId: "auradeutsch-8a000",
  storageBucket: "auradeutsch-8a000.firebasestorage.app",
  messagingSenderId: "605644425652",
  appId: "1:605644425652:web:a9b266361c9c8a391a4ea1",
  measurementId: "G-74NPNWQQ52"
};

// Initialize Firebase only once to prevent errors in Next.js hot reloading
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
