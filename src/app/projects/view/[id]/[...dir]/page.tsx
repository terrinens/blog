import {SimpleContentRender} from "@_components/post/main/ServerPostRender";
import {findAllIds, findByIdForDocsPaths, findByPathsForDocs} from "@/app/lib/db/ServerProjDB";
import {DocsSidebar} from "@_components/common/Sidebar";
import React from "react";

type Props = {
    params: {
        id: string;
        dir: string[];
    }
}

export default async function Page({params}: Props) {
    const {id, dir} = params;
    const data = await findByPathsForDocs(id, dir);
    const docsRenders = data.map((doc, index) => {
        return {
            name: doc.id,
            children: <SimpleContentRender key={`render:${id}:${index}`} mdxContent={doc.data.content}/>,
        }
    })

    return (<>
        <DocsSidebar docs={docsRenders}/>
    </>)
}

export async function generateStaticParams() {
    const allIds = await findAllIds();
    const params = await Promise.all(
        allIds.map(async id => {
                const paths = await findByIdForDocsPaths(id);
                return paths.map(path => ({id: id, dir: path.split('/').filter(Boolean)}));
            }
        )
    );

    return params.flat();
}

