import React from "react";
import {MDXRemote} from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import {userMDXComponents} from "@/app/mdx-componets"
import {DefaultImg} from "@/app/lib/Posts";

type PostRenderProps = {
    postPath: string;
    postName: string;
}

export function PostRender({postPath, postName}: PostRenderProps) {
    const target = path.join(process.cwd(), postPath, postName + '.mdx');
    const source = fs.readFileSync(target, "utf8");

    return (
        /** RECORD
         * PROBLEM : MDX를 렌더링하였으나 <h1> 같은 태그들이 정상적으로 작동하지 않아 글자 크기들이 일정했음.
         * RESOLUTION :
         * MDX를 파싱할때 globals.css의 @tailwind base;가 기존의 태그들을 재정의 하고 있었던 탓에
         * <h1> 같이 정상적으로 작동하지 않았음.
         * */
        <div className="prose">
            <MDXRemote components={userMDXComponents} source={source} options={{parseFrontmatter: true}}/>
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

const dataFormatter = (date: Date) => {
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
                    <img className='w-full, h-full object-cover'
                         src={info.mainImg == null ? DefaultImg.src : info.mainImg}
                         alt={info.mainImg == null ? DefaultImg.alt : ''}/>
                </div>
                <div className="p-2 md:p-4">
                    <div className='text-center pt-1 text-sm text-gray-500'>
                        {info.date != null ? dataFormatter(info.date) : '기록된 날짜가 없습니다.'}
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