import {getPostSlugs} from "@/app/lib/Posts";
import {PostRender} from "@/app/components/PostRender";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page(props: Props) {
    const {id} = props.params;
    return (
        <PostRender deep={'/main'} postName={id}/>
    )
}

export async function generateStaticParams() {
    const postList = await getPostSlugs('/main');
    return postList.map(id => ({id: id.replace('.mdx', '')}))
}

