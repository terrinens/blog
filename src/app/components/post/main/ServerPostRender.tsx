import React from "react";
import {generateCompiledForMDX} from "@/app/lib/post/ServerPosts";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";
import {PostSchema} from "@/app/lib/db/Init";

export type PostRenderProps = {
    headerIgnore?: boolean;
}

const PostRenderHeaderBlock = (
    {name, values}: { name: string, values: string | Array<any> }
) => {
    const content = [];
    const liCss = "me-1 inline-flex items-center text-sm text-gray-800"

    if (Array.isArray(values)) {
        const lis = values.map(value => (
            <li key={'li:' + value} className={liCss}>{String(value).trim()}</li>)
        )
        content.push(...lis);
    } else {
        content.push(<li key={'li' + values} className={liCss}>{values}</li>)
    }

    return (
        <dl className="min-h-5 min-w-1 m-0 flex flex-col sm:flex-row gap-1">
            <dt className="max-h-0 min-w-50">
                <span className="block text-sm text-gray-500">{name}:</span>
            </dt>
            <dd className='max-h-0 p-0 m-0 mt-2'>
                <ul key={'ul:' + name} className='ml-0 mt-1 list-disc pl-3 text-left'>
                    {content}
                </ul>
            </dd>
        </dl>
    )
}

async function PostRenderHeader({props}: { props: PostCardProps }) {
    const info = props.info
    return (
        <div
            className='relative rounded-lg shadow-sm overflow-hidden ring-1 ring-gray-800 ring-opacity-5  dark:ring-neutral-700
             pt-0.5 pb-0.5 pl-2 mb-5'>
            <div className="space-y-3 mb-10">
                <PostRenderHeaderBlock key={'title'} name={'title'} values={info.name}/>
                <PostRenderHeaderBlock key={'date'} name={'date'} values={info.date}/>
                <PostRenderHeaderBlock key={'tags'} name={'tags'} values={info.tags}/>
            </div>
        </div>
    );
}

export async function ServerPostRender({headerIgnore, post}: { headerIgnore?: boolean, post: PostSchema }) {
    const postProps = generationPostCardProps('', post);
    const {content} = await generateCompiledForMDX(post.content);
    return (
        <div className="prose">
            {headerIgnore ? null : <PostRenderHeader props={postProps}/>}
            {content}
        </div>
    );
}

export async function SimpleContentRender({mdxContent}: { mdxContent: string }) {
    const {content} = await generateCompiledForMDX(mdxContent)
    return (
        <div className="prose">
            {content}
        </div>
    );
}

export type PostCardProps = {
    id: string,
    info: {
        thumbnail: string;
        name: string,
        description: string,
        tags: string[];
        date: string;
    },
    tagRender?: boolean
    imgRender?: boolean
    dateRender?: boolean
}

