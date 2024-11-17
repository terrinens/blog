import {getOrgMemberSimpleInfo} from "@/app/lib/github/GithubData";
import React from "react";
import {SimpleGitUserInfo} from "@/app/lib/github/GitConfig";

function GitMember({simpleInfo, popoverId}: { simpleInfo: SimpleGitUserInfo, popoverId: string }) {
    return (
        <div className={'flex items-center ml-2'}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">
                <img src={simpleInfo.avatarURL}
                     data-popover-target={popoverId}
                     height={40} width={40}
                     className="w-full h-full rounded-full object-cover m-0"
                     alt="User Profile"
                />
            </div>

            <div data-popover id={popoverId} role="tooltip"
                 className="absolute z-10 invisible inline-block w-52 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 ml-2">
                <div className="p-3">
                    <div className="flex items-center mb-2">
                        <a href={simpleInfo.gitURL}>
                            <img height={40} width={40} className="w-10 h-10 rounded-full m-0"
                                   src={simpleInfo.avatarURL}
                                   alt={simpleInfo.name}/>
                        </a>
                    </div>
                    <p className="m-0 p-0 text-base font-semibold leading-none text-gray-900 dark:text-white">
                        {simpleInfo.name}
                    </p>
                    <p>
                        <a href={simpleInfo.gitURL} style={{textDecoration: 'none', color: 'inherit'}}>
                            {`${simpleInfo.name}@github.com`}
                        </a>
                    </p>
                </div>
                <div data-popper-arrow></div>
            </div>
        </div>
    )
}

export default async function GitMembers({orgName, token}: { orgName: string, token: string }) {
    const simpleInfos = await getOrgMemberSimpleInfo(orgName, {token: token});
    return (
        <div className={'not-prose mb-5'}>
            <div className={'flex'}>
                {simpleInfos.map((info, index) => (
                    <GitMember key={index} simpleInfo={info} popoverId={`${info.name}:${index}`}/>
                ))}
            </div>
        </div>
    )
}