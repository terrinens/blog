import {PostRenderProps} from "@/app/components/post/main/PostRender";
import {getCompileMDX} from "@/app/lib/Posts";
import {PostsDir, rootPath} from "@/app/lib/Config";
import React from "react";
import path from "path";
import {
    BreadcrumbCase,
    BreadcrumbEntries,
    BreadcrumbLowerEntries,
    BreadcrumbNow,
    BreadcrumbPrevious
} from "@/app/components/post/proj/Breadcrumb";
import {FileObject, LowerFileEntries, RootTree, SubTree} from "@/app/components/post/proj/TreeView";

type DocsBreadcrumbProps = {
    projName: string,
    now: string,
    dirs: string[],
    baseUrl: string[]
}

function DocsBreadcrumb({projName, now, dirs}: DocsBreadcrumbProps) {
    return (
        <div
            className='mb-5 flex whitespace-nowrap border max-h-24 rounded-xl shadow-sm p-1 dark:bg-neutral-800 dark:border-neutral-700'>
            <BreadcrumbCase>
                <BreadcrumbPrevious str={'프로젝트'} href={path.join(rootPath, 'projects', 'list')}/>
                <BreadcrumbPrevious str={projName}/>
                <BreadcrumbEntries>
                    <BreadcrumbLowerEntries entries={dirs} baseUrl={[]}/>
                </BreadcrumbEntries>
                <BreadcrumbNow str={now}/>
            </BreadcrumbCase>
        </div>
    )
}

export type DocsProps = {
    entries: {
        dir: string;
        docs: string[];
    }[]
}

function DocsTreeView({docs_list}: { docs_list: DocsProps }) {
    return (
        <div className='mb-5'>
            <RootTree dirname={'docs'} ariaExpanded={true}>{
                docs_list.entries.map((entry, index) => {
                    const dir = entry.dir;
                    const docs = entry.docs;
                    return (
                        <SubTree key={`sub-tree-${index}-${dir}`} dirname={dir}
                                 ariaExpanded={docs_list.entries.length < 5 && docs.length < 5}>
                            <LowerFileEntries>{
                                docs.map(doc => (
                                    <FileObject key={`file-object-${dir}-${doc}`} filename={doc}
                                                href={`${dir}#${doc}`}/>
                                ))
                            }</LowerFileEntries>
                        </SubTree>
                    )
                })
            }</RootTree>
        </div>
    )
}

export async function ProjectInfoRender({props, docs_list}: {
    props: PostRenderProps,
    docs_list: DocsProps
}) {
    const deep = props.deep;
    const postName = props.postName;

    const projDir = path.join(PostsDir, ...deep);
    /** TODO 최적화 할것 Source 를 제외하고 사용되지 않음 */
    const {content} = await getCompileMDX(projDir, postName + '.mdx');

    const docsDirs = docs_list.entries.flatMap(x => x.dir);

    return (
        <div className='prose w-full'>
            <DocsBreadcrumb projName={deep[2]} dirs={docsDirs} now={'info'} baseUrl={deep}/>
            <DocsTreeView docs_list={docs_list}/>
            {content}
        </div>
    );
}