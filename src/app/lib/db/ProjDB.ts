import {db, DocSchema, ProjSchema} from "@/app/lib/db/Init";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";
import {initAdmin} from "@/app/lib/db/ServerDBInit";

const tableName = "proj";
const admin = initAdmin();
const adminRef = admin.collection(tableName);

const ref = collection(db, tableName);

export async function insertProject(data: ProjSchema) {
    return adminRef.add(data)
        .then(async (data) => { return await data.get()})
        .catch((e) => {throw e});
}


export async function modifyProject(id: string, data: ProjSchema) {
    const projRef = adminRef.doc(id);
    const projData = await projRef.get();
    if (!projData.exists) {
        throw Error(`Not Found Project ID : ${id}`)
    } else {
        return await projRef.set(data)
            .then(() => true)
            .catch((e) => {throw e});
    }
}

export async function insertDoc(id: string, data: DocSchema) {
    const docRef = adminRef.doc(id);

    return docRef.collection('docs').add(data)
        .then(async (data) => await data.get())
        .catch(error => {throw error;});
}

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
