import TagBlock from "@/app/components/main_frame/TagBlock";
import dynamic from "next/dynamic";
import {ChartDataProps, generationChartData} from "@/app/components/main_frame/LanguageBlockData";
import MainContainer, {MainContainerGrid} from "@_components/main_frame/MainContainer";
import RecencyPostsBlock from "@_components/main_frame/RecencyPostsBlock";
import Banner from "@_components/main_frame/Banner";
import {getPosts} from "@/app/lib/db/ClientPostDB";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";
import {findAllTags as projFindAllTags} from "@/app/lib/db/ServerProjDB";
import {findAllTags} from "@/app/lib/db/ServerPostDB";
import {Metadata} from "next";

export const revalidate = 3600;

export default async function Home() {
    const postData = await getPosts(6);
    const recencyPostBlockData = postData.posts.map(post => generationPostCardProps(post.id, post.data));

    const chartData = await generationChartData()
        .catch(() => {
            const props: ChartDataProps = {bytes: [0], lang: ["undefined"], colors: ['red']};
            return props;
        })

    const LanguageBlock = dynamic(() =>
        import('@/app/components/main_frame/LanguageBlock'), {
        ssr: false
    })

    const postTags = await findAllTags();
    const projTags = await projFindAllTags();
    const tags = Array.from(new Set([...postTags, ...projTags]));

    return (
        <>
            <Banner/>
            <div className='grid grid-cols-1 gap-4 space-y-10'>
                <MainContainer>
                    <TagBlock allTags={tags} key={'TagBlock'}/>
                </MainContainer>

                <MainContainer>
                    <MainContainerGrid
                        title={'블로그 최신 포스팅'}
                        option={{id: 'recency_post_block', tooltipText: '최신 포스터 6개를 나타냅니다. 카드 클릭시 해당 포스터로 이동이 가능합니다.'}}>
                        <RecencyPostsBlock props={recencyPostBlockData}/>
                    </MainContainerGrid>
                </MainContainer>

                <MainContainer>
                    <MainContainerGrid
                        title={'Github 기여 언어 Byte'}
                        option={{
                            id: 'language_block',
                            tooltipText: (<div className={'m-0 p-0 h-auto'}>
                                <span className={'block'}>Github에서 개인 레파지토리 및 모든 기여한 코드의 총 Byte를 계산하여 나타내는 블록입니다. 그래프를 클릭시 더 상세한 값을 볼 수 있습니다.</span>
                                <br/>
                                <span className={'block'}>더 상세한 계산과정을 보고 싶으시다면은 물음표 버튼을 클릭하시면 이동 가능합니다.</span>
                            </div>)
                        }}>
                        <LanguageBlock chartData={chartData}/>
                    </MainContainerGrid>
                </MainContainer>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: 'terrinens 기술 블로그',
    description: 'Github Pages에서 라우팅하는 기술 블로그입니다.',
}