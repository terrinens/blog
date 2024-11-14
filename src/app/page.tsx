import TagBlock from "@/app/components/main_frame/TagBlock";
import dynamic from "next/dynamic";
import {generationPostCardProps, getPostListData, Paging} from "@/app/lib/Posts";
import {ChartDataProps, generationChartData} from "@/app/components/main_frame/LanguageBlockData";
import MainContainer, {MainContainerGrid} from "@_components/main_frame/MainContainer";
import RecencyPostsBlock from "@_components/main_frame/RecencyPostsBlock";

export async function RecencyPostBlockData() {
    const allList = [...await getPostListData('/main'), ...await getPostListData('/proj')];
    allList.sort((a, b) => Paging.default_sort(a.frontmatter, b.frontmatter));

    const sliceCount = 6;
    const sliceList = allList.slice(0, sliceCount);
    return sliceList.map(data => generationPostCardProps(data.filename, data.frontmatter));
}

export default async function Home() {
    const recencyPostBlockData = await RecencyPostBlockData();

    const chartData = await generationChartData()
        .catch(() => {
            const props: ChartDataProps = {bytes: [0], lang: ["undefined"], colors: ['red']};
            return props;
        })

    const LanguageBlock = dynamic(() =>
        import('@/app/components/main_frame/LanguageBlock'), {
        ssr: false
    })

    return (
        <div className='grid grid-cols-1 gap-4'>
            <MainContainer>
                <div className='col-span-1 mb-3'>
                    <TagBlock key={'TagBlock'}/>
                </div>
            </MainContainer>

            <MainContainer>
                <div className='col-span-1 mb-3'>
                    <RecencyPostsBlock props={recencyPostBlockData}/>
                </div>
            </MainContainer>

            <MainContainer>
                <MainContainerGrid title={'Github 기여 언어 Byte'}>
                    <LanguageBlock chartData={chartData}/>
                </MainContainerGrid>
            </MainContainer>
        </div>
    );
}
