import {DirectoryNode, getDirList, getDocsTreeNode} from "@/app/lib/ServerPosts";
import {ProjectInfoRender} from "@/app/components/post/proj/ProjectMDXRender";
import {PostRenderProps} from "@_components/post/main/ServerPostRender";
import fs from "fs";
import {PostsDir} from "@/app/lib/Config";
import path from "path";
import {PostType} from "@/app/lib/ClientPost";

export type Props = {
    params: {
        type: string;
        dir: string;
    }
}

export default async function Page({params}: Props) {
    const {type, dir} = params;

    const deep = ['proj', type, dir];
    const postType: PostType = {postType: 'proj', projType: type as 'team' | 'personal'}
    const props: PostRenderProps = {postType: postType, postName: 'info', deep: deep}

    const nodePath = `${type}/${dir}/docs`
    let dirNods: DirectoryNode;

    if (fs.existsSync(path.join(PostsDir, 'proj', nodePath))) {
        dirNods = getDocsTreeNode(nodePath)
    } else {
        console.info(`Docs 문서를 찾지 못했습니다. 빈값으로 랜더링을 시도합니다.`);
        dirNods = {name: "docs is empty", type: 'dir'};
    }

    return (
        <ProjectInfoRender props={props} dirNods={dirNods}/>
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
}
