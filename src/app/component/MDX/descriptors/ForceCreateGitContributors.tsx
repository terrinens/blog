import {Card, dummyInfos} from "@/app/component/MDX/descriptors/GitContributors";
import {Button, insertJsx$, JsxComponentDescriptor, usePublisher} from "@mdxeditor/editor";
import CopyGenericJsxEditor from "@/app/component/MDX/descriptors/CopyGenericJsxEditor";
import React from "react";

export async function DummyElement({role}: { role: string, forceAdd: string[] }) {
    return (
        <div className="not-prose max-w-[85rem] pl-0 pb-5 mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-2 md:gap-3 lg:grid-cols-4 lg:gap-6 gap-6">
                {<Card info={dummyInfos[0]} role={role}/>}
            </div>
        </div>
    )
}

export const forceCreateGitContributorsComponentDescriptors: JsxComponentDescriptor = {
    name: 'ForceCreateGitContributors',
    kind: 'flow',
    source: '@_components/post/proj/GitContributors',
    props: [
        {name: 'role', type: 'string', required: false},
        {name: 'forceAdd', type: 'string', required: false},
    ],
    hasChildren: true,
    Editor: (props) => CopyGenericJsxEditor({...props, TargetNode: DummyElement}),
}

export const InsertForceCreateGitContributors = () => {
    const insertJsx = usePublisher(insertJsx$)
    return (
        <Button onClick={() =>
            insertJsx({
                name: 'ForceCreateGitContributors',
                kind: 'flow',
                props: {
                    role: null,
                    forceAdd: null,
                }
            })
        }>
            ForceContributors
        </Button>
    )
}