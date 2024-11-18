'use server'

import {DocSchema, initAdmin, ProjSchema} from "@/app/lib/db/Init";

const tableName = "proj";
const admin = initAdmin();
const tableRef = admin.collection(tableName);

export async function insertProject(data: ProjSchema) {
    return tableRef.add(data)
        .then(async (data) => { return await data.get()})
        .catch((e) => {throw e});
}


export async function modifyProject(id: string, data: ProjSchema) {
    const projRef = tableRef.doc(id);
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
    const docRef = tableRef.doc(id);

    return docRef.collection('docs').add(data)
        .then(async (data) => await data.get())
        .catch(error => {throw error;});
}