import {generationPostCardProps, getPostListData, Paging} from "@/app/lib/Posts";

export default async function RecencyPostBlockData() {
    const allList = [...await getPostListData('/main'), ...await getPostListData('/proj')];
    allList.sort((a, b) => Paging.default_sort(a.frontmatter, b.frontmatter));

    const sliceCount = 4;
    const sliceList = allList.slice(0, sliceCount);
    return  sliceList.map(data => generationPostCardProps(data.filename, data.frontmatter));
}