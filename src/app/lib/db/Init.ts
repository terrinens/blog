import {getFirestore} from "@firebase/firestore";
import {getAuth, onAuthStateChanged, signOut} from "@firebase/auth";
import fireAdmin, {firestore} from 'firebase-admin'
import path from "path";
import {initializeApp} from "@firebase/app";
import Firestore = firestore.Firestore;

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export interface PostSchema {
    refProject?: string;
    content: string;
    tags?: string[];
    description: string[];
}

export interface ProjSchema {
    name: string;
    thumbnail?: string | undefined;
    startAt: Date;
    endAt?: Date;
    tags?: string[];
    description?: string;
    content: string;
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


/* nextjs 14 환경에서 firestore를 사용할시 버그가 있었음.
 * 지속적으로 app을 초기화하려고 하여서 이에 따라서 버그가 발생해, 이미 정의되었다는 버그가 발생했음.
 * 그렇기에 반드시 init 절차에 이미 있을 경우 정의되어있는것을 그대로 돌려주는 로직이 필요함.
 *
 * 해당 버그가 발생하는 이유는 admin api는 init를 실행할 경우에 자동으로 admin이라는 네임에 추가되고 이를 배열형태로 저장함.
 * 그리고 이를 '기억'하는데 기존에 있던 로직은 변수를 사용할때마다 init로 추가를 하려고 해서 발생한 문제임
 * 그렇기에 배열에서 namespace가 동일한 객체를 꺼내서 사용해야만함.
 * if (!fireAdmin.apps.length) {
 fireAdmin.initializeApp({
 credential: fireAdmin.credential.cert(path.join(process.cwd(), 'src/app/lib/db/google_auth_token.json')),
 }, 'admin')
 }
 export const admin = fireAdmin.firestore();*/
export const initAdmin = () => {
    const apps = fireAdmin.apps;
    if (apps.length > 0 && apps.find(x => x?.name === 'admin')) {
        return apps.find(x => x?.name === 'admin')?.firestore() as Firestore;
    } else {
        fireAdmin.apps[0]?.firestore();

        const adminApp = fireAdmin.initializeApp({
            credential: fireAdmin.credential.cert(path.join(process.cwd(), 'src/app/lib/db/google_auth_token.json')),
        }, 'admin');

        return adminApp.firestore();
    }
}