import {getPostListData} from "@/app/lib/post/ServerPosts";
import MainContainer from "@_components/main_frame/MainContainer";
import MainPostListRender from "@_components/post/main/MainPostListRender";

import {Paging} from "@/app/lib/post/PostConfig";


export default async function Page() {
    const dataList = await getPostListData('/main');
    dataList.sort((a, b) => Paging.default_sort(a.frontmatter, b.frontmatter));

    return (
        <MainContainer>
            <MainPostListRender props={dataList}/>
        </MainContainer>
    );
}
