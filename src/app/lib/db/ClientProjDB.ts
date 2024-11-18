'use client'

import {db, DocSchema} from "@/app/lib/db/Init";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";

const tableName = 'proj';
const ref = collection(db, tableName);

export async function findByIdProj(id: string) {
    const docRef = doc(ref, id);
    const result = await getDoc(docRef);

    if (result.exists()) {
        return result.data();
    } else {
        throw new Error('포스트를 찾지 못했습니다.');
    }
}

export async function findByIdForDocs(id: string) {
    const docRef = doc(ref, id);
    const docsCollection = collection(docRef, 'docs');

    const collectionRefs = await getDocs(docsCollection);
    const dataPromise = collectionRefs.docs.map(async snapshot => {
        if (!snapshot.exists) return;
        const data = snapshot.data() as DocSchema;

        return {id: ref.id, ...data, ref: snapshot.ref};
    })

    return Promise.all(dataPromise);
}
