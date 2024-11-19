import MainContainer from "@_components/main_frame/MainContainer";
import MainPostListRender from "@_components/post/main/MainPostListRender";

export const revalidate = 60
export const dynamicParams = false

export default async function Page() {
    return (
        <MainContainer>
            <MainPostListRender pageSize={8}/>
        </MainContainer>
    );
}
