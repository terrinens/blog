import {Props as ParentsProps} from "@/app/projects/view/[type]/[dir]/page";
import {DirectoryNode, getDirectoryNames, getDirList, getDocsTreeNode, getPostSlugs} from "@/app/lib/ServerPosts";
import path from "path";
import {ServerPostRender} from "@_components/post/main/ServerPostRender";
import {AccordionBlock, AccordionCase} from "@/app/components/post/proj/Accordion";
import fs from "fs";
import {PostsDir} from "@/app/lib/Config";

type Props = ParentsProps & {
    params: ParentsProps['params'] & {
        docs: string[];
    }
}

export default async function Page({params}: Props) {
    const {type, dir, docs} = params;
    const docsPath = path.join('proj', type, dir, ...docs.map(decodeURIComponent))
    const slug = await getPostSlugs(docsPath);

    const docsRenders = slug.map(doc => {
        return {
            title: doc,
            render: ServerPostRender({postName: doc.replace('.mdx', ''), deep: [docsPath], headerIgnore: true})
        };
    });

    return (
        <AccordionCase>{
            docsRenders.map((data, index) => (
                <AccordionBlock key={`AB:${data.title}:${index}`}
                                props={{title: data.title, ariaExpanded: true}}>
                    {data.render}
                </AccordionBlock>
            ))
        }</AccordionCase>
    )
}

/** TODO 경로가 끔찍하게 긺. 수정 할 방법 찾을것. */
export async function generateStaticParams() {
    const types = ['team', 'personal'];
    const parentStaticParams: { type: string, dir: string; }[] = [];

    await Promise.all(
        types.map(async type => {
            const dirs = await getDirList('proj', type);
            dirs.forEach(dir => {
                parentStaticParams.push({type: type, dir: dir})
            })
        })
    )

    const router = parentStaticParams.map(params => {
        const nodePath = path.join(params.type, params.dir, 'docs')

        if (!fs.existsSync(path.join(PostsDir, 'proj', nodePath))) return;

        const node: DirectoryNode = getDocsTreeNode(nodePath);
        const docs = getDirectoryNames(node);
        const routerDocs = docs.map(dir => dir.split(path.sep).map(encodeURIComponent))

        const type = params.type;
        const dir = params.dir;

        return routerDocs.map(routerParams => ({type, dir, docs: routerParams}))
    });

    return router.flat();
}

