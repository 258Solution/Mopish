import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDN6WD6rxB7CqqK-OMRTkzJlSz-xNbe_Ks",
  authDomain: "xavamoz.firebaseapp.com",
  projectId: "xavamoz",
  storageBucket: "xavamoz.firebasestorage.app",
  messagingSenderId: "681441008756",
  appId: "1:681441008756:web:433985ef3f374672b78521"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const msg = document.getElementById("msg");

// LOGIN EMAIL/SENHA
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(() => msg.innerText = "Email ou palavra-passe incorretos");
});

// LOGIN GOOGLE
document.getElementById("googleBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => msg.innerText = err.message);
});

// MANTÉM SESSÃO
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "dashboard.html";
});
