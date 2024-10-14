import {generationPaging, getPostListData, Paging} from "@/app/lib/Posts";
import {PostCard} from "@/app/components/PostRender";
import Pagination from "@/app/components/Pagination";

export default async function Page() {
    const dataList = await getPostListData();

    const paging: Paging = new Paging(10, 2);
    const result = await generationPaging(dataList, paging);

    const pageData = result[1];

    return (
        <div className="max-w-[50rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {pageData.list.map(props => (
                    <PostCard key={props.filename} {...props} />
                ))}
            </div>
            <Pagination total={paging.total} thisPageNumber='1'/>
        </div>
    );
}