import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAQS62kfeXusqtOX9n-bVfwWK91pKoo_vA",
    authDomain: "todolist-auth-7d93a.firebaseapp.com",
    projectId: "todolist-auth-7d93a",
    storageBucket: "todolist-auth-7d93a.appspot.com",
    messagingSenderId: "56631687576",
    appId: "1:56631687576:web:a96ec80b86d6ec0865d3ed"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
