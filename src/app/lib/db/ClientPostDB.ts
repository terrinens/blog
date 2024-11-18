'use client'

import {collection, doc, getDoc} from "@firebase/firestore";
import {db} from "@/app/lib/db/Init";

const tableName = "main";
const ref = collection(db, tableName);

export async function findById(id: string) {
    const docRef = doc(ref, id);
    const result = await getDoc(docRef);

    if (result.exists()) {
        return result.data();
    } else {
        throw new Error('포스트를 찾지 못했습니다.');
    }
}