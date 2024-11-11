import {Button, insertJsx$, JsxComponentDescriptor, usePublisher} from "@mdxeditor/editor";
import CopyGenericJsxEditor from "@/app/component/MDX/descriptors/CopyGenericJsxEditor";
import React from "react";

declare function GitMembers({orgName, token}: { orgName: string, token: string }): Promise<Element>

export type SimpleGitUserInfo = {
    name: string;
    gitURL: string;
    avatarURL: string;
}

const dummyInfos = [
    {
        name: "Belieb3764",
        gitURL: "https://github.com/Belieb3764",
        avatarURL: "https://avatars.githubusercontent.com/u/129468849?v=4"
    },
    {
        name: "daheeh",
        gitURL: "https://github.com/daheeh",
        avatarURL: "https://avatars.githubusercontent.com/u/129082388?v=4"
    },
    {
        name: "heoap9",
        gitURL: "https://github.com/heoap9",
        avatarURL: "https://avatars.githubusercontent.com/u/83992590?v=4"
    },
    {
        name: "hyerancho",
        gitURL: "https://github.com/hyerancho",
        avatarURL: "https://avatars.githubusercontent.com/u/129468803?v=4"
    }
];

function GitMember({simpleInfo, popoverId}: { simpleInfo: SimpleGitUserInfo, popoverId: string }) {
    return (
        <div className={'flex items-center ml-2'}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">
                <img src={simpleInfo.avatarURL}
                     data-popover-target={popoverId}
                     className="w-full h-full rounded-full object-cover m-0"
                     alt="User Profile"
                />
            </div>

            <div data-popover id={popoverId} role="tooltip"
                 className="absolute z-10 invisible inline-block w-52 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 ml-2">
                <div className="p-3">
                    <div className="flex items-center mb-2">
                        <a href={simpleInfo.gitURL}>
                            <img className="w-10 h-10 rounded-full m-0" src={simpleInfo.avatarURL}
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

export function DummyElement() {
    return (
        <div className={'not-prose mb-5'}>
            <div className={'flex'}>
                {dummyInfos.map((info, index) => (
                    <GitMember key={index} simpleInfo={info} popoverId={`${info.name}:${index}`}/>
                ))}
            </div>
        </div>
    )
}

export const gitMemberComponentDescriptors: JsxComponentDescriptor = {
    name: 'GitMembers',
    kind: 'flow',
    source: '@_components/post/proj/GitMembers',
    props: [
        {name: 'orgName', type: 'string', required: true},
        {name: 'token', type: 'string', required: false}
    ],
    hasChildren: true,
    Editor: (props) => CopyGenericJsxEditor({...props, TargetNode: DummyElement}),
}


export const InsertGitMember = () => {
    const insertJsx = usePublisher(insertJsx$)
    return (
        <Button onClick={() =>
            insertJsx({
                name: 'GitMembers',
                kind: 'flow',
                props: {orgName: null, token: null}
            })
        }>
            GitMember
        </Button>
    )
}