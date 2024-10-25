import {getCompileMDX, getDirList, Paging, PostListProps, slicePage} from "@/app/lib/Posts";
import {ProjectCard} from "@/app/components/ProjectRender";
import {PostsDir} from "@/app/lib/Config";
import {PostCardProps} from "@/app/components/PostRender";

const deep = '/proj';
const getProjNameList = async () => { return getDirList(deep) }

export default async function Page({params}: { params: { page: number } }) {
    const page = Number(params.page);

    const projDataList: PostListProps[] = await Promise.all(
        (await getProjNameList()).map(async name => {
            const {frontmatter} = await getCompileMDX(PostsDir, deep, name, 'info.mdx')
            return {filename: name, frontmatter: frontmatter};
        })
    )

    projDataList.sort((a, b) => {
        const aStart = new Date(a.frontmatter.start as string);
        const bStart = new Date(b.frontmatter.start as string);
        return bStart.getTime() - aStart.getTime();
    });

    const paging: Paging = new Paging(5, projDataList.length);

    const result: PostCardProps[] = await slicePage(projDataList, page, paging);

    return (<ProjectCard postCardProps={result}/>)
}

export async function generateStaticParams() {
    const projNameList = await getDirList('/proj')
    return new Paging(5, projNameList.length).generateStaticParams
}
