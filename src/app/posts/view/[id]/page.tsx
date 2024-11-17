import {getPostSlugs} from "@/app/lib/post/ServerPosts";
import {ServerPostRender} from "@_components/post/main/ServerPostRender";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page(props: Props) {
    const {id} = props.params;
    return (
        <ServerPostRender postType={{postType: 'main'}} deep={['/main']} postName={id}/>
    )
}

export async function generateStaticParams() {
    const postList = await getPostSlugs('/main');
    return postList.map(id => ({id: id.replace('.mdx', '')}))
}

