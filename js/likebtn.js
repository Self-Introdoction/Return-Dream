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

// 좋아요 수 불러오기
export async function fetchCount(targetKey) {
    const likeDocRef = doc(db, "LIKE", targetKey);
    const docSnap = await getDoc(likeDocRef);

    // 문서 없을때 값 생성
    if (!docSnap.exists()) {
        await setDoc(likeDocRef, { count: 0 });
        $("#count").text(0);
        $("#heart").text("♡");
        return;
    }

    // 숫자와 하트 변경
    const count = docSnap.data().count ?? 0;
    $("#count").text(count);
    $("#heart").text(count >= 1 ? "❤" : "♡");
}

// 버튼 클릭시 좋아요 증가
export async function updateLike(targetKey) {
    const likeDocRef = doc(db, "LIKE", targetKey);
    await updateDoc(likeDocRef, {
        count: increment(1)
    });
    fetchCount(targetKey);
}

// 데이터 가져오기 및 이벤트
$(document).ready(function () {
    fetchCount(targetId);

    // 좋아요 버튼 이벤트
    $("#LIKEBTN").on("click", function () {
        updateLike(targetId);
    });
});