// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs,
    doc, updateDoc, increment, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyC6n_NFwSRQr8vbpriDJ3nMAvX31z_wP1I",
    authDomain: "introduce-606f9.firebaseapp.com",
    projectId: "introduce-606f9",
    storageBucket: "introduce-606f9.appspot.com",
    messagingSenderId: "94396344619",
    appId: "1:94396344619:web:0384e74c40dcbd1ca1fd6e",
    measurementId: "G-KNFJY5H08H"
};

// firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// JQuery 버전
// 파라미터 가져오기
function getKeyFromHTML() {
    const likeSection = document.getElementById("like");
    return likeSection?.dataset.key || "LIKECOUNT";
}

// 초기 설정
const targetId = getKeyFromHTML();

// 좋아요 수 가져오기
export async function fetchCount(targetKey = "LIKECOUNT") {
    const likeDocRef = doc(db, "LIKE", targetKey);
    const docSnap = await getDoc(likeDocRef);

    if (!docSnap.exists()) {
        await setDoc(likeDocRef, { count: 0 });
        document.getElementById("count").textContent = 0;
        document.getElementById("heart").textContent = "♡";
        return;
    }

    const count = docSnap.data().count ?? 0;
    document.getElementById("count").textContent = count;
    document.getElementById("heart").textContent = count >= 1 ? "❤" : "♡";
}

// 좋아요 + 1
export async function updateLike(targetKey = "LIKECOUNT") {
    const likeDocRef = doc(db, "LIKE", targetKey);
    await updateDoc(likeDocRef, {
        count: increment(1)
    });

    fetchCount(targetKey);
}