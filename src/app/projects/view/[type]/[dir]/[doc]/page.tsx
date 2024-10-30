import {Props as ParentsProps} from "@/app/projects/view/[type]/[dir]/page";
import {getDirList, getPostSlugs} from "@/app/lib/Posts";
import path from "path";
import {PostRender} from "@/app/components/post/main/PostRender";
import {AccordionBlock, AccordionCase} from "@/app/components/post/proj/Accordion";

type Props = ParentsProps & {
    params: ParentsProps['params'] & {
        doc: string;
    }
}

export default async function Page({params}: Props) {
    const {type, dir, doc} = params;
    const docsPath = path.join('proj', type, dir, 'docs', doc)
    const docs = await getPostSlugs(docsPath);

    const docsRenders = docs.map(doc => {
        return {
            title: doc,
            render: PostRender({postName: doc.replace('.mdx', ''), deep: [docsPath], headerIgnore: true})
        };
    });

    return (
        <AccordionCase>{
            docsRenders.map((data, index) => (
                <AccordionBlock key={`AB:${data.title}:${index}`}
                                props={{title: data.title, ariaExpanded: true, anchor: true}}>
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

    const staticParams: { type: string; dir: string; doc: string; }[] = [];

    await Promise.all(parentStaticParams.map(async proj => {
        const type = proj.type;
        const dir = proj.dir;
        const docs = await getDirList('proj', type, dir, 'docs');
        docs.forEach(doc => {
            staticParams.push({type: type, dir: dir, doc: doc});
        })
    }))

    return staticParams;
}