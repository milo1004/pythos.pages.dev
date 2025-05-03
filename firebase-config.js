// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDmFopvvT7QGumBOAF8ixPYqILleyN6i68",
  authDomain: "pythos-website.firebaseapp.com",
  projectId: "pythos-website",
  storageBucket: "pythos-website.firebasestorage.app",
  messagingSenderId: "781241739137",
  appId: "1:781241739137:web:c61a4961dfd6b284b2ea80",
  measurementId: "G-HE54S62K6K"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 獲取 Firebase 服務實例
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleProvider }; 
