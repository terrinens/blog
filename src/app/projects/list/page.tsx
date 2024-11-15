import {getCompileMDX, getDirList, PostListProps} from "@/app/lib/ServerPosts";
import {ProjectCard} from "@/app/components/post/proj/ProjectCardRender";
import {PostsDir} from "@/app/lib/Config";
import {generationPostCardProps, PostType} from "@/app/lib/ClientPost";

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

    const postType: PostType = {postType: 'proj', projType: type as 'team' | 'personal'}

    return projDataList.map(data =>
        generationPostCardProps(postType, data.filename, data.frontmatter)
    )
}

export default async function Page() {
    const teamData = await getData('team');
    const personalData = await getData('personal');
    return (<ProjectCard teamProps={['team', teamData]} personalProps={['personal', personalData]}/>)
}
