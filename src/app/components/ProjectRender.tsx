import React from "react";
import {DefaultImg} from "@/app/lib/Config";
import Image from "next/image";
import {PostCardProps} from "@/app/components/PostRender";

function CardCase({children}: { children: React.ReactNode }) {
    return (
        <div className="w-2/3 py-12 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {children}
        </div>
    )
}

function GenTags(title: string, tag: string) {
    return (
        <span key={`Proj:${title}:${tag}`}
              className="py-1.5 px-3 bg-white text-gray-600 border border-gray-200 text-xs sm:text-sm rounded-xl">
                {tag}
            </span>
    );
}

function ProjCard(imgPath: string, title: string, description: string, tags: string[]) {
    return (
        <a key={`info:${title}`} className="group flex flex-col focus:outline-none mb-1" href="#">
            <div className="h-60 w-full relative flex justify-center overflow-hidden bg-gray-100 rounded-2xl">
                <Image fill
                       style={{objectFit: 'cover'}}
                       className="object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-2xl"
                       src={imgPath == null ? DefaultImg.src : imgPath} alt="Project Image"/>
            </div>

            <div className="pt-4">
                <h3 className="relative inline-block font-medium text-lg text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-100 dark:text-white">
                    {title}
                </h3>
                <p className="mt-1 text-gray-600">
                    {description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map(tag => (GenTags(title, tag)))}
                </div>
            </div>
        </a>
    )
}

export function ProjectCard({postCardProps}: { postCardProps: PostCardProps[] }) {
    return (
        <CardCase>
            {
                postCardProps.map(props => {
                    const info = props.info;
                    return (
                        ProjCard(info.mainImg, info.title, info.description, info.tags)
                    )
                })
            }
        </CardCase>
    )
}