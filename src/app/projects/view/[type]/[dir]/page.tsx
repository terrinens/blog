import {getDirList, getPostSlugs} from "@/app/lib/Posts";
import {DocsProps, ProjectInfoRender} from "@/app/components/post/proj/ProjectMDXRender";
import {PostRenderProps} from "@/app/components/post/main/PostRender";

export type Props = {
    params: {
        type: string;
        dir: string;
    }
}

export default async function Page({params}: Props) {
    const {type, dir} = params;
    const deep = ['proj', type, dir];
    const props: PostRenderProps = {postName: 'info', deep: deep}

    const docs_dirs = await getDirList(...deep, 'docs');
    const docs_list: DocsProps = {
        entries: await Promise.all(
            docs_dirs.map(async dir => {
                const docs = await getPostSlugs(...deep, 'docs', dir);
                return {dir: dir, docs: docs}
            })
        )
    }

    return (
        <ProjectInfoRender props={props} docs_list={docs_list}/>
    )
}

export async function getStaticParams() {
    const projList = await Promise.all(
        ['team', 'personal'].map(async deep => {
            const dirs = await getDirList('proj', deep);
            return {type: deep, dirs: dirs}
        })
    )

    return projList.flatMap(proj => {
        return proj.dirs.map(dir => ({
            type: proj.type,
            dir: dir
        }));
    });
}

export async function generateStaticParams() {
    return await getStaticParams();
}
