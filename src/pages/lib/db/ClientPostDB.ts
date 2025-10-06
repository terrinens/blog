import {db, PostSchema, ProjSchema} from "@/pages/lib/db/Init";
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
import {dateFormatter} from "@/pages/lib/post/PostConfig";

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
        return {} as PostSchema;
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
        const nextId = posts[posts.length - 1].id;
        nextCall = async () => getPosts(pageSize, nextId);
        return {posts, nextRefId: nextId, nextCall};
    }
}

export async function findAllTags(): Promise<string[]> {
    const collectionRef = getCollectionRef();

    try {
        const snapshots = await getDocs(collectionRef);
        const tags: string[] = []

        snapshots.forEach(snapshot => {
            const data = snapshot.data() as PostSchema;
            tags.push(...data.tags ?? []);
        })

        return Array.from(new Set(tags));
    } catch (error) {
        console.error("태그 불러오기 실패 ?= " + error);
        return [];
    }
}

