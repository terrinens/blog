import {PostRenderProps} from "@/app/components/post/main/PostRender";
import {getCompileMDX} from "@/app/lib/Posts";
import {PostsDir} from "@/app/lib/Config";
import {MDXRemote} from "next-mdx-remote/rsc";
import React from "react";
import {userMDXComponents} from "@/app/mdx-componets";
import path from "path";
import {
    BreadcrumbCase,
    BreadcrumbEntries,
    BreadcrumbEntriesProps,
    BreadcrumbNow,
    BreadcrumbPrevious
} from "@/app/components/post/proj/Breadcrumb";

function DocsBreadcrumb() {
    const props: BreadcrumbEntriesProps = {entries: []}
    return (
        <div
            className='mb-5 flex whitespace-nowrap border max-h-24 rounded-xl shadow-sm p-1 dark:bg-neutral-800 dark:border-neutral-700'>
            <BreadcrumbCase>
                <BreadcrumbPrevious str={'프로젝트'}/>
                <BreadcrumbPrevious str={'보고 있는 프로젝트 이름'}/>
                <BreadcrumbEntries props={props}/>
                <BreadcrumbNow str={'info'}/>
            </BreadcrumbCase>
        </div>
    )
}

export async function ProjectInfoRender({props, docs_list}: {
    props: PostRenderProps,
    docs_list: BreadcrumbEntriesProps
}) {
    const deep = props.deep;
    const postName = props.postName;

    const projDir = path.join(PostsDir, ...deep);
    const {source, compiled} = await getCompileMDX(projDir, postName + '.mdx');

    return (
        <div className='prose'>
            <DocsBreadcrumb/>
            <MDXRemote components={userMDXComponents} source={source} options={{parseFrontmatter: true}}/>
        </div>
    );
}