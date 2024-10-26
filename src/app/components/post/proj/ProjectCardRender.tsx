"use client"

import React from "react";
import {DefaultImg} from "@/app/lib/Config";
import Image from "next/image";
import {PostCardProps} from "@/app/components/post/main/PostRender";

export function DataDisplay({team, personal}: { team: React.ReactNode, personal: React.ReactNode }) {
    const [isTeam, setIsTeam] = React.useState(true);
    const handleSwitch = (isTeamProject: boolean) => {
        setIsTeam(isTeamProject);
    };

    const activation_css = 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500';
    const deactivate_css = 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

    return (
        <div className='w-full flex flex-col items-center'>
            <ul className="flex justify-center flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="me-2">
                    <a onClick={(e) => {
                        e.preventDefault();
                        handleSwitch(true)
                    }}
                       className={`inline-block p-4 rounded-t-lg ${isTeam ? activation_css : deactivate_css}`}
                       aria-current={isTeam ? "page" : undefined}>
                        팀 프로젝트
                    </a>
                </li>
                <li className="me-2">
                    <a onClick={(e) => {
                        e.preventDefault();
                        handleSwitch(false)
                    }}
                       className={`inline-block p-4 rounded-t-lg ${!isTeam ? activation_css : deactivate_css}`}
                       aria-current={!isTeam ? "page" : undefined}>
                        개인 프로젝트
                    </a>
                </li>
            </ul>
            <div className='flex justify-center w-full mt-4'>
                {isTeam ? team : personal}
            </div>
        </div>
    );
}

function GenTags(title: string, tag: string) {
    return (
        <span key={`Proj:${title}:${tag}`}
              className="py-1.5 px-3 bg-white text-gray-600 border border-gray-200 text-xs sm:text-sm rounded-xl">
                {tag}
            </span>
    );
}

function ProjCard(key: number, imgPath: string, title: string, description: string, tags: string[]) {
    return (
        <div key={`info:${key}`} className='p-4 border border-gray-200 shadow-sm rounded-xl mb-5 items-center'>
            <a
                className="my-4 group flex flex-col focus:outline-none mb-1 h-80 w-full md:w-96 lg:w-full"
                href="#">
                <div className="h-60 w-full relative flex justify-center overflow-hidden bg-gray-100 rounded-2xl">
                    <Image fill
                           style={{objectFit: 'cover'}}
                           className="object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-2xl"
                           src={imgPath == null ? DefaultImg.src : imgPath}
                           alt="Project Image"
                           sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="items-center pt-4 flex-grow text-center">
                    <h3 className="text-center relative inline-block font-medium text-lg text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-100 dark:text-white">
                        {title}
                    </h3>
                    <p className="text-center mt-1 text-gray-600">
                        {description}
                    </p>

                    <div className="justify-center mt-3 flex flex-wrap gap-2">
                        {tags.map(tag => (GenTags(title, tag)))}
                    </div>
                </div>
            </a>
        </div>
    )
}

function generationCards(props: PostCardProps[]) {
    return (
        <div className='mt-2'>
            {
                props.map((props, index) => {
                    const info = props.info;
                    return (
                        ProjCard(index, info.mainImg, info.title, info.description, info.tags)
                    )
                })
            }
        </div>
    )
}

export function ProjectCard({teamProps, personalProps}: {
    teamProps: PostCardProps[],
    personalProps: PostCardProps[]
}) {
    const team = generationCards(teamProps);
    const personal = generationCards(personalProps)
    return (<DataDisplay team={team} personal={personal}/>)
}
