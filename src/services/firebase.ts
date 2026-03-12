import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// @ts-ignore - Explicit ignore due to module resolution issues matching runtime config
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '@/src/types/job';

// YOUR FIREBASE CONFIG HERE
// Để bảo mật, nên dùng các biến môi trường env.
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase only once
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Ensure Auth works smoothly across restarts in React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

// Helper functions for jobs
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const jobsCol = collection(db, 'jobs');
    const jobSnapshot = await getDocs(jobsCol);
    const jobList = jobSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
    return jobList;
  } catch (error) {
    console.error("Error fetching jobs from Firebase:", error);
    return [];
  }
};

export const fetchJobById = async (id: string): Promise<Job | null> => {
  try {
    const docRef = doc(db, 'jobs', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Job;
    }
    return null;
  } catch (error) {
    console.error("Error fetching job detail:", error);
    return null;
  }
};
