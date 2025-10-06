import {getFirestore, Timestamp} from "@firebase/firestore";
import {getAuth, onAuthStateChanged, signOut} from "@firebase/auth";
import {initializeApp} from "@firebase/app";

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

/* Firestore에서 넘어온 time 객체는 절대로 firebase 라이브러리의 Timestamp를 직접적으로 가져오는것이 아닌
 * object 객체이다. 그러므로  instanceof에서 Timestamp와 비교를 진행하면 무조건 false이다.
 * 하지만 object 객체이더라도 Timestamp의 필드는 그대로 사용하고 있으므로, 이 때문에 많은 혼동이 있었다.
 * 다시한번 적는다. Firestore에서 바로 넘어온 time은 object이지 Timestamp가 아니다.
 * 이거 때문에 하루종일 테스트했다. */
interface BasePostSchema {
    name: string;
    thumbnail?: string;
    content: string;
    tags?: string[];
    description: string;
}

export interface PostSchema extends BasePostSchema {
    createdAt: string | Timestamp;
    refProject?: string;
}

export interface ProjSchema extends BasePostSchema {
    startAt: string | Timestamp;
    endAt?: string | Timestamp;
    type: 'team' | 'personal';
}

export interface DocSchema {
    parentDir: string;
    content: string;
    description: string;
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
    if (user && process.env.NODE_ENV === "production") await signOut(auth);
})
