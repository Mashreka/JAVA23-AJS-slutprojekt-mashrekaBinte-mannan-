import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACVANyprbbJ1dIq6xs5gQhEpWlhWHTX6U",
  authDomain: "scrumboardapp-6556a.firebaseapp.com",
  databaseURL:
    "https://scrumboardapp-6556a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrumboardapp-6556a",
  storageBucket: "scrumboardapp-6556a.appspot.com",
  messagingSenderId: "707016569711",
  appId: "1:707016569711:web:3c8ecf5ecff634824fae9a",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const tasksRef = ref(db, "tasks");

export { tasksRef };
