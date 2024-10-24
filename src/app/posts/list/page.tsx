import {getPostListData, Paging, slicePage} from "@/app/lib/Posts";
import {PostCard, PostCardProps} from "@/app/components/PostRender";
import Pagination from "@/app/components/Pagination";

export default async function Page() {
    const dataList = await getPostListData('/main');
    const paging: Paging = new Paging(10, dataList.length);
    dataList.sort((a, b) => Paging.default_sort(a.frontmatter, b.frontmatter));

    const result: PostCardProps[] = await slicePage(dataList, 1, paging);

    return (
        <div className="max-w-[50rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    result.map(card => (
                        <PostCard key={card.filename} filename={card.filename} info={card.info} tagRender={true}/>
                    ))
                }
            </div>
            <Pagination key={'page:nav' + 1} thisPage={1} paging={paging} baseURL={'/posts/list'}/>
        </div>
    );
}
