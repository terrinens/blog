import {initAdmin} from "@/app/lib/db/ServerDBInit";
import {DocSchema, ProjSchema} from "@/app/lib/db/Init";
import {dateFormatter, DirectoryNode} from "@/app/lib/post/PostConfig";
import {addNodeByPath} from "@/app/lib/post/ServerPosts";

const tableName = "proj";
const admin = initAdmin();
const adminRef = admin.collection(tableName);

const dataParse = (d: ProjSchema) => {
    d.startAt = dateFormatter(d.startAt);
    if (d.endAt) {
        d.endAt = dateFormatter(d.endAt);
    }

    return d;
}

const generationPostData = (docs: FirebaseFirestore.DocumentSnapshot) => {
    return ({id: docs.id, data: dataParse(docs.data() as ProjSchema)})
}


export async function findAll() {
    return await adminRef.listDocuments();
}

export async function findAllIds() {
    const result = await adminRef.select('id').get();
    return result.docs.map(doc => doc.id);
}

export async function findAllAndSplitOfType() {
    const allProj = await findAll();
    const team: { data: ProjSchema, id: string } [] = []
    const personal: { data: ProjSchema, id: string }[] = [];

    for (const proj of allProj) {
        const snapshot = await proj.get();
        const data = snapshot.data() as ProjSchema;
        const pushData: { data: ProjSchema, id: string } = generationPostData(snapshot);

        if (data.type === "team") team.push(pushData);
        else personal.push(pushData);
    }

    return {team, personal};
}

export async function findByIdForDocs(id: string): Promise<DirectoryNode> {
    const snapshots = await adminRef.doc(id).collection('docs').get();
    const dirNode: DirectoryNode = {name: 'docs', type: 'dir', children: []};

    for (const doc of snapshots.docs) {
        const data = doc.data() as DocSchema;
        const dir = data.parentDir;
        const newNode: DirectoryNode = {name: doc.id, type: 'file'}
        addNodeByPath(dirNode, dir, newNode);
    }

    return dirNode;
}

export async function findByIdForDocsPaths(id: string) {
    const snapshots = await adminRef.doc(id).collection('docs').get();
    const dirs = snapshots.docs.map(doc => {
        const data = doc.data() as DocSchema
        return data.parentDir;
    })

    return Array.from(new Set(dirs));
}

export async function findByPathsForDocs(id: string, paths: string[]) {
    const join = `/${paths.join('/')}/`;
    const snapshots = await adminRef.doc(id)
        .collection('docs').where('parentDir', '==', join).get();

    return snapshots.docs.map(doc => ({id: doc.id, data: doc.data() as DocSchema}));
}

export async function modifyDocs(id: string, name: string, data: DocSchema) {
    await adminRef.doc(id).collection('docs').doc(name).set(data);
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