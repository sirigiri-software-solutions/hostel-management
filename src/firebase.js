// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push} from "firebase/database";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDczL0G3Posqk67RnsB7en38zXsujEsZ9k",
  authDomain: "signuppage-2f4c8.firebaseapp.com",
  databaseURL: "https://signuppage-2f4c8-default-rtdb.firebaseio.com",
  projectId: "signuppage-2f4c8",
  storageBucket: "signuppage-2f4c8.appspot.com",
  messagingSenderId: "333871852694",
  appId: "1:333871852694:web:a6b7173d62a8842515e6b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage, ref, push};