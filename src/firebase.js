import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBiUExgGElygIg_6m5-92L8Coe0adX1yc0",
    authDomain: "app-request-services.firebaseapp.com",
    projectId: "app-request-services",
    storageBucket: "app-request-services.appspot.com",
    messagingSenderId: "635994058857",
    appId: "1:635994058857:web:fc1547d30343e41959f2f8"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
const db = app.firestore()
const auth = app.auth()

export { db, auth };