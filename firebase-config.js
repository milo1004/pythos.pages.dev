// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDmFopvvT7QGumBOAF8ixPYqILleyN6i68",
  authDomain: "pythos-website.firebaseapp.com",
  projectId: "pythos-website",
  storageBucket: "pythos-website.firebasestorage.app",
  messagingSenderId: "781241739137",
  appId: "1:781241739137:web:c61a4961dfd6b284b2ea80",
  measurementId: "G-HE54S62K6K",
  databaseURL: "https://pythos-website-default-rtdb.firebaseio.com"
};

// 檢查 Firebase 是否已經初始化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 獲取 Firebase 服務實例
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();
const analytics = firebase.analytics();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 設定 Firebase 持久性
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn('Firebase 持久性初始化失敗：多個標籤頁開啟');
    } else if (err.code == 'unimplemented') {
      console.warn('當前瀏覽器不支援 Firebase 持久性');
    }
  });

// 設定 Google 登入選項
googleProvider.setCustomParameters({
  prompt: 'select_account'
}); 
