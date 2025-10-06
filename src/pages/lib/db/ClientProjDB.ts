import {collection, doc, getDoc} from "@firebase/firestore";
import {db} from "@/pages/lib/db/Init";

const tableName = "proj";
const ref = collection(db, tableName);
const getDocRef = (id: string) => doc(ref, id);
/*const getCollectionRef = () => collection(db, tableName);*/

export async function findById(id: string) {
    const docRef = getDocRef(id);
    return await getDoc(docRef);
}