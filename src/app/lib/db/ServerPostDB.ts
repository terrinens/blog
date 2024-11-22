import {db, PostSchema, ProjSchema} from "@/app/lib/db/Init";
import {initAdmin} from "@/app/lib/db/ServerDBInit";
import {collection, getCountFromServer} from "@firebase/firestore";

const tableName = "main";
const admin = initAdmin();
const adminRef = admin.collection(tableName);

const getCollectionRef = () => collection(db, tableName);


export async function insertPost(data: PostSchema) {
    const result = await adminRef.add(data);
    return result.id;
}

export async function getTotalCount() {
    const countSnapshot = await getCountFromServer(getCollectionRef());
    return countSnapshot.data().count;
}

export async function findAllIds() {
    const result = await adminRef.select('id').get()
    return result.docs.map(doc => doc.id);
}

export async function findAllTags() {
    const docsList = await adminRef.listDocuments();
    const promisesData = docsList.map(snapshot => snapshot.get());
    const snapshots = await Promise.all(promisesData);
    const tags: string[] = [];

    snapshots.map(snapshot => {
        const data = snapshot.data() as ProjSchema;
        tags.push(...data.tags ?? []);
    })

    return Array.from(new Set(tags));
}