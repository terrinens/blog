import {DefaultImg, rootPath} from "@/app/lib/Config";
import path from "path";
import React from "react";
import {PostCardProps} from "@_components/post/main/ServerPostRender";
import Image from "next/image";
import {MDXImage} from "@_components/MDXImage";

export const dateFormatter = (date: Date) => {
    const year = date.getFullYear();

    if (isNaN(year)) return 'Not Recode Date'

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
}


export function PostCard({imgRender = true, dateRender = true, tagRender = true, ...props}: PostCardProps) {
    const info = props.info;
    const postType = props.postType;

    const img = (info.mainImg == null || (info.mainImg as string).trim().length <= 0)
        ? <Image style={{objectFit: "cover", width: "100%", height: "100%"}} width={'100'} height={'100'}
                         src={DefaultImg.src}
                         alt={'none'}/>
        : <MDXImage type={props.postType.postType} src={info.mainImg} alt={'none'}/>;

    const gridCalculation = (...bool: boolean[]) => bool.reduce((a, b) => Number(a) + Number(b), 0)
    const parentsGridCount = 1 + gridCalculation(imgRender);
    const gridCount = 2 + Number([dateRender, tagRender].some(x => x));
    const baseHref = postType.postType === 'main' ? '/posts/view/' : `/projects/view/${postType.projType}/`;

    return (
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
            <a href={path.join(rootPath, baseHref, props.filename.replace('.mdx', ''))}>
                <div className={`grid-rows-${parentsGridCount} ` + 'grid max-h-[500px] flex-grow'}>
                    {imgRender
                        ? (<div
                            className="max-w-full h-48 flex justify-center items-center rounded-t-xl overflow-hidden">{img}</div>)
                        : null
                    }

                    <div className={`grid-rows-${gridCount} ` + "flex-grow grid p-2 md:p-4"}>
                        <div
                            className="min-h-14 flex justify-center overflow-hidden text-ellipsis text-center md:text-[20px] text-lg font-semibold text-gray-800">
                            <text className="overflow-hidden text-ellipsis line-clamp-2">
                                {info.title}
                            </text>
                        </div>

                        <div className='block min-h-20 justify-center items-center'>
                            <text
                                className="overflow-hidden text-ellipsis text-center mt-1.5 text-gray-500 line-clamp-3">
                                {info.description === undefined || null ? 'The description is empty. The description is empty. The description is empty. The description is empty. The description is empty.' : info.description}
                            </text>
                        </div>

                        <div className={'flex flex-col'}>
                            {dateRender
                                ? (<div
                                    className='text-center pt-1 text-sm text-gray-500'>{info.date != null || undefined ? dateFormatter(info.date) : '기록된 날짜가 없습니다.'}</div>)
                                : null
                            }

                            {tagRender
                                ? (<div className="mt-1.5">
                                    <ul className="flex flex-row flex-wrap justify-center max-h-[4.5rem] overflow-hidden">
                                        {info.tags.map(tag => (
                                            <li key={tag}
                                                className="py-0.5 px-2 mx-1 bg-white text-gray-600 border border-gray-200 text-xs sm:text-sm rounded-xl">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>)
                                : null}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}