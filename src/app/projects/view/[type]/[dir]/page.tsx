import {getDirList} from "@/app/lib/Posts";
import {PostRender} from "@/app/components/post/main/PostRender";

type Props = {
    params: {
        type: string;
        dir: string;
    }
}

export default async function Page({params}: Props) {
    const {type, dir} = params;
    return (<PostRender deep={['proj', type, dir]} postName={'info'}/>);
}

export async function generateStaticParams() {
    const projList = await Promise.all(
        ['team', 'personal'].map(async deep => {
            const dirs = await getDirList('proj', deep);
            return {type: deep, dirs: dirs}
        })
    )

    return projList.flatMap(proj => {
        return proj.dirs.map(dir => ({
            type: proj.type,
            dir: dir
        }));
    });
}
