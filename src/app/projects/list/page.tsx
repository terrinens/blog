import {generationPostCardProps, getCompileMDX, getDirList, PostListProps} from "@/app/lib/Posts";
import {ProjectCard} from "@/app/components/post/proj/ProjectCardRender";
import {PostsDir} from "@/app/lib/Config";

const getProjNameList = async (type: string) => {
    return getDirList('/proj', type)
}

const getData = async (type: string) => {
    const projDataList: PostListProps[] = await Promise.all(
        (await getProjNameList(type)).map(async name => {
            const {frontmatter} = await getCompileMDX(PostsDir, 'proj', type, name, 'info.mdx')
            return {filename: name, frontmatter: frontmatter};
        })
    )

    projDataList.sort((a, b) => {
        const aStart = new Date(a.frontmatter.start as string);
        const bStart = new Date(b.frontmatter.start as string);
        return bStart.getTime() - aStart.getTime();
    });

    return projDataList.map(data =>
        generationPostCardProps(data.filename, data.frontmatter)
    )
}

export default async function Page() {
    const teamData = await getData('team');
    const personalData = await getData('personal');
    return (<ProjectCard teamProps={['team', teamData]} personalProps={['personal', personalData]}/>)
}
