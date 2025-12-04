// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsjaY0NldXnVpGJUA9awhqa4bMhfxI6vI",
  authDomain: "personal-blog-fadcb.firebaseapp.com",
  projectId: "personal-blog-fadcb",
  storageBucket: "personal-blog-fadcb.firebasestorage.app",
  messagingSenderId: "796369720322",
  appId: "1:796369720322:web:d04d71f61de32671ef431b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);