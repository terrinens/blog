import {SimpleContentRender} from "@_components/post/main/ServerPostRender";
import {AccordionBlock, AccordionCase} from "@_components/post/proj/Accordion";
import {findAllIds, findByIdForDocsPaths, findByPathsForDocs} from "@/app/lib/db/ServerProjDB";

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
            title: doc.id,
            render: <SimpleContentRender key={`render:${id}:${index}`} mdxContent={doc.data.content}/>,
        }
    })


    return (
        <AccordionCase>
            <a className={'hidden'} href={'#'}></a>
            {docsRenders.map((data, index) => (
                <AccordionBlock key={`AB:${data.title}:${index}`}
                                props={{title: data.title, ariaExpanded: true}}>
                    {data.render}
                </AccordionBlock>
            ))
            }
        </AccordionCase>
    )
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

