import React from "react";
import {getCompileMDX} from "@/app/lib/ServerPosts";
import {PostsDir} from "@/app/lib/Config";
import {generationPostCardProps} from "@/app/lib/ClientPost";
import {dateFormatter} from "@_components/post/main/ClientPostRender";

export type PostRenderProps = {
    postName: string;
    deep: string[];
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
                <PostRenderHeaderBlock key={'title'} name={'title'} values={info.title}/>
                <PostRenderHeaderBlock key={'date'} name={'date'} values={dateFormatter(info.date)}/>
                <PostRenderHeaderBlock key={'tags'} name={'tags'} values={info.tags}/>
            </div>
        </div>
    );
}

export async function ServerPostRender({postName, deep, headerIgnore}: PostRenderProps) {
    const {content, frontmatter} = await getCompileMDX(PostsDir, ...deep, postName + '.mdx');
    const cardProps = generationPostCardProps(postName, frontmatter)

    return (
        <div className="prose">{headerIgnore
            ? <div/>
            : <PostRenderHeader key={'post_header:' + postName} props={cardProps}/>
        }
            {content}
        </div>
    );
}

export type PostCardProps = {
    filename: string,
    info: {
        mainImg: string;
        title: string,
        description: string,
        tags: string[];
        date: Date;
    },

    tagRender?: boolean
    imgRender?: boolean
    dateRender?: boolean
}

