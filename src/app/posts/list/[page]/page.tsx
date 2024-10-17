import {getPostListData, getPostSlugs, Paging, slicePage} from "@/app/lib/Posts";
import {PostCard, PostCardProps} from "@/app/components/PostRender";
import Pagination from "@/app/components/Pagination";

type Props = {
    params: {
        page: number;
    }
}

export default async function Page({params}: Props) {
    const page = Number(params.page);

    const dataList = await getPostListData('/main');
    const paging: Paging = new Paging(10, dataList.length);
    dataList.sort((a, b) => paging.default_sort(a.frontmatter, b.frontmatter));

    const result: PostCardProps[] = await slicePage(dataList, page, paging);

    return (
        <div className="max-w-[50rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    result.map(card => (
                        <PostCard key={card.filename} filename={card.filename} info={card.info}/>
                    ))
                }
            </div>
            <Pagination key={'page:nav' + page} thisPage={page} paging={paging} baseURL={'/posts/list'}/>
        </div>
    );
}

export async function generateStaticParams() {
    const postSlugs = await getPostSlugs('/main');
    const paging: Paging = new Paging(10, postSlugs.length);

    const map = []
    for (let i = 1; i <= paging.getTotalPage; i++) {
        map.push(i.toString());
    }

    return map.map(i => ({page: i}));
}

