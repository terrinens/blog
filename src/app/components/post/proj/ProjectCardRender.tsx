"use client"

import React from "react";
import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {PostCard} from "@_components/post/main/ClientPostRender";
import {ProjSchema} from "@/app/lib/db/Init";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";

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

function generationCards(props: PostCardProps[]) {
    return (
        <div className='mt-2 max-w-xl w-full flex flex-col items-center'>
            {props.map((prop, index) => {
                return (
                    <div key={`${index}:${prop.id}`} className={'w-full'}>
                        <PostCard baseURL={'/projects/view'} {...prop}/>
                    </div>
                )
            })}
        </div>
    )
}

export function ProjectCard({teamsData, personalsData}: {
    teamsData: { id: string, data: ProjSchema }[],
    personalsData: { id: string, data: ProjSchema }[]
}) {

    const teamProps: PostCardProps[] = teamsData.map(data => generationPostCardProps(data.id, data.data))
    const personalProps: PostCardProps[] = personalsData.map(data => generationPostCardProps(data.id, data.data))
    const team = generationCards(teamProps);
    const personal = generationCards(personalProps);

    return (<DataDisplay team={team} personal={personal}/>)
}

