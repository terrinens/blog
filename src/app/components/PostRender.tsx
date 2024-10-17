import React from "react";
import {compileMDX, MDXRemote} from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import {userMDXComponents} from "@/app/mdx-componets"
import {DefaultImg, generationPostCardProps} from "@/app/lib/Posts";
import Image from "next/image";

type PostRenderProps = {
    deep: string;
    postName: string;
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

export async function PostRender({deep, postName}: PostRenderProps) {
    const target = path.join(process.cwd(), 'src/posts/', deep, postName + '.mdx');
    const source = fs.readFileSync(target, "utf8");
    const compiled = await compileMDX({source: source, options: {parseFrontmatter: true}})
    const cardProps = generationPostCardProps(postName, compiled.frontmatter)

    return (
        /** RECORD
         * PROBLEM : MDX를 렌더링하였으나 <h1> 같은 태그들이 정상적으로 작동하지 않아 글자 크기들이 일정했음.
         * RESOLUTION :
         * MDX를 파싱할때 globals.css의 @tailwind base;가 기존의 태그들을 재정의 하고 있었던 탓에
         * <h1> 같이 정상적으로 작동하지 않았음.
         * */
        <div className="prose">
            <PostRenderHeader key={'post_header:' + postName} props={cardProps}/>
            <MDXRemote key={'post_body:' + postName} components={userMDXComponents} source={source}
                       options={{parseFrontmatter: true}}
            />
        </div>
    )
}

export type PostCardProps = {
    filename: string;
    info: {
        mainImg: string;
        title: string,
        description: string,
        tags: string[];
        date: Date;
    }
}

const dateFormatter = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function PostCard(props: PostCardProps) {
    const info = props.info;
    return (
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
            <a href={path.join('/posts/view/', props.filename)}>
                <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
                    <Image width={200} height={80}  className='w-full, h-full object-cover'
                         src={info.mainImg == null ? DefaultImg.src : info.mainImg}
                         alt={info.mainImg == null ? DefaultImg.alt : ''}/>
                </div>
                <div className="p-2 md:p-4">
                    <div className='text-center pt-1 text-sm text-gray-500'>
                        {info.date != null ? dateFormatter(info.date) : '기록된 날짜가 없습니다.'}
                    </div>

                    <h3 className="text-center text-xl font-semibold text-gray-800">
                        {info.title}
                    </h3>

                    <div className='block min-h-20 justify-center items-center'>
                        <text
                            className="text-center mt-1.5 text-gray-500 line-clamp-3">
                            {info.description === undefined || null ? 'The description is empty. The description is empty. The description is empty. The description is empty. The description is empty.' : info.description}
                        </text>
                    </div>

                    <div className="mt-1.5">
                        <ul className="flex flex-row justify-center overflow-hidden *:rounded-full *:border *:border-gray-300 *:bg-gray-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
                            {info.tags.map(tag => (
                                <li key={tag}
                                    className="mx-1 inline-block px-1 py-0.5 text-sm text-black mr-1 mt-0.5">{tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    )
}