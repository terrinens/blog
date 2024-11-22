import {ProjectInfoRender} from "@_components/post/proj/ProjectMDXRender";

import {DirectoryNode} from "@/app/lib/post/PostConfig";
import {findAllIds, findByIdForDocs} from "@/app/lib/db/ServerProjDB";
import {findById} from "@/app/lib/db/ClientProjDB";
import {ProjSchema} from "@/app/lib/db/Init";

export type Props = {
    params: {
        id: string;
    }
}

export default async function Page({params}: Props) {
    const {id} = params;
    const projData = await findById(id);
    const dirNods: DirectoryNode = await findByIdForDocs(id);

    return (
        <ProjectInfoRender data={projData.data() as ProjSchema} dirNods={dirNods}/>
    )
}

/**
 * Type error: Type 'OmitWithTag<typeof import("D:/All Conding Space/Side Projects/GIT Blog/terrinens.github.io/src/app/projects/view/
 * [type]/[dir]/page"), "default" | "config" | "generateStaticParams" | ... 10 more ... | "generateViewport", "">' does not satisfy the constraint '{ [x: string]: never; }'.
 *   Property 'typeDirParams' is incompatible with index signature.
 *     Type '() => Promise<{ type: string; dir: string; }[]>' is not assignable to type 'never'.
 *
 *  자식 경로에서도 사용을 하려고 정의했으나 page 에서 생성된 함수는 generateStaticParams에서 사용 불가능했음.
 *  이유는 모르겠음.
 *  해결 방식 : 각 generateStaticParams 에서 사용하기로함. 어쩔수 없이 복붙함.
 async function typeDirParams(): Promise<{ type: string; dir: string; }[]> {
 const types = ['team', 'personal'];
 const staticParams: { type: string, dir: string; }[] = [];

 await Promise.all(
 types.map(async type => {
 const dirs = await getDirList('proj', type);
 dirs.forEach(dir => {
 staticParams.push({type: type, dir: dir})
 })
 })
 )

 return staticParams;
 }*/

export async function generateStaticParams() {
    const allIds = await findAllIds();
    return allIds.map(id => ({id: id}));
}


export async function generateMetadata(props: Props) {
    const {id} = props.params;
    const projData = await findById(id);
    const data = projData.data() as ProjSchema;
    return {
        title: data.name,
        description: `${data.tags?.join(' ')}  ${data.description}`,
    }
}