import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-374816510-d4f3d",
  appId: "1:150759802952:web:8d742ef79027bc60ff307d",
  storageBucket: "studio-374816510-d4f3d.firebasestorage.app",
  apiKey: "AIzaSyCR1Q_uasJeacBSSWtmB4JqQjwWXLadVqo",
  authDomain: "studio-374816510-d4f3d.firebaseapp.com",
  messagingSenderId: "150759802952"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in anonymously for prototype access
signInAnonymously(auth).catch((error) => {
  console.error("Firebase Anonymous Auth failed", error);
});

export { auth, db };
