import {ServerPostRender} from "@_components/post/main/ServerPostRender";
import {findById} from "@/app/lib/db/ClientPostDB";
import {findAllIds} from "@/app/lib/db/ServerPostDB";

type Props = {
    params: {
        id: string;
    }
}

export const revalidate = 60
export const dynamicParams = true

export default async function Page(props: Props) {
    const {id} = props.params;
    const postData = await findById(id);
    return (
        <ServerPostRender post={postData} />
    )
}

export async function generateStaticParams() {
    const allPostIds = await findAllIds();
    return allPostIds.map(id => ({id: id}));
}

