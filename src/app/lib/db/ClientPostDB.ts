import {db, PostSchema} from "@/app/lib/db/Init";
import {
    collection,
    doc,
    DocumentSnapshot,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    Timestamp
} from "@firebase/firestore";
import {dateFormatter} from "@/app/lib/post/PostConfig";

const tableName = "main";
const ref = collection(db, tableName);
const getDocRef = (id: string) => doc(ref, id);
const getCollectionRef = () => collection(db, tableName);

const dataParse = (d: PostSchema) => {
    if (d.createdAt instanceof Timestamp) {
        d.createdAt = dateFormatter(d.createdAt);
    }
    return d;
}

const generationPostData = (docs: DocumentSnapshot[]) => {
    return docs.map(doc => ({
        id: doc.id, data: dataParse(doc.data() as PostSchema)
    }))
}

export async function findById(id: string): Promise<PostSchema> {
    const docRef = getDocRef(id);
    const result = await getDoc(docRef);

    if (result.exists()) {
        return dataParse(result.data() as PostSchema);
    } else {
        throw new Error('포스트를 찾지 못했습니다.');
    }
}

export async function findAll() {
    const colRef = getCollectionRef();
    return await getDocs(colRef);
}

export async function findAllId() {
    const allDocs = await findAll();
    return allDocs.docs.map(snapshot => {
        return snapshot.id;
    })
}

export async function getTotalCount() {
    const countSnapshot = await getCountFromServer(getCollectionRef());
    return countSnapshot.data().count;
}

export type PaginationResult = {
    posts: { id: string, data: PostSchema }[]
    nextRefId: string | null;
    nextCall: (() => Promise<PaginationResult>) | null;
}

export async function getPosts(pageSize: number, nextRefId?: string): Promise<PaginationResult> {
    const collectionRef = getCollectionRef();
    const baseQuery = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
    );

    const queryRef = nextRefId
        ? query(baseQuery, startAfter(await getDoc(getDocRef(nextRefId))))
        : query(baseQuery);

    const snapshots = await getDocs(queryRef);
    const posts = generationPostData(snapshots.docs);

    let nextCall: (() => Promise<PaginationResult>) | null;
    if (posts.length < pageSize) {
        return {posts, nextRefId: null, nextCall: null};
    } else {
        console.info(nextRefId);
        const nextId = posts[posts.length - 1].id;
        nextCall = async () => getPosts(pageSize, nextId);
        console.info(nextId);
        return {posts, nextRefId: nextId, nextCall};
    }
}
