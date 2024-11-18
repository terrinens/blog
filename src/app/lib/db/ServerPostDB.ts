'use server'

import {initAdmin, PostSchema} from "@/app/lib/db/Init";

const tableName = "main";
const admin = initAdmin();
const adminRef = admin.collection(tableName);

export async function insertPost(data: PostSchema) {
    const result = await adminRef.add(data);
    return result.id;
}

