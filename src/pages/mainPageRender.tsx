'use client'

import MainContainer, {MainContainerGrid} from "@_components/main_frame/MainContainer";
import {useEffect, useState} from "react";
import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {findAllTags, getPosts} from "@/pages/lib/db/ClientPostDB";
import {generationPostCardProps} from "@/pages/lib/post/ClientPost";
import TagBlock from "@_components/main_frame/TagBlock";
import RecencyPostsBlock from "@_components/main_frame/RecencyPostsBlock";
import {ChartDataProps, generationChartData} from "@_components/main_frame/LanguageBlockData";
import dynamic from "next/dynamic";

export default function MainPageRender() {
    return (<>
        <Tags/>
        <RecencyPosts/>
        <LanguageBlock/>
    </>)
}

function Tags() {
    const [loading, setLoading] = useState<boolean>(true);
    const [tags, setTags] = useState<string[]>([])
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        try {
            const init = async () => {
                setLoading(true);
                const postTags = await findAllTags();

                if (postTags.length < 0) {
                    setError(true);
                    return;
                }

                setTags(postTags);
            }
            init().then(r => r);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>서버 상태로인한 포스트 태그 집계 실패</p>;

    return (
        <MainContainer>
            <TagBlock allTags={tags} key={'TagBlock'}/>
        </MainContainer>
    )
}

function RecencyPosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostCardProps[]>([] as PostCardProps[]);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const postData = await getPosts(6);

                if (postData.posts.length === 0) {
                    setError(true);
                    setPosts([] as PostCardProps[])
                    console.error("최신 포스터를 DB에서 가져오기 실패")
                    return;
                }

                const recencyPostBlockData = postData.posts.map(post => generationPostCardProps(post.id, post.data));
                setPosts(recencyPostBlockData);
            } catch (err) {
                console.error(`최신 포스터 로딩 실패 : ${err}`)
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        init().then(r => r)
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>서버 상태로인한 최신 포스터 불러오기 실패</p>;

    return (
        <MainContainer>
            <MainContainerGrid
                title={'블로그 최신 포스팅'}
                option={{id: 'recency_post_block', tooltipText: '최신 포스터 6개를 나타냅니다. 카드 클릭시 해당 포스터로 이동이 가능합니다.'}}>
                <RecencyPostsBlock props={posts}/>
            </MainContainerGrid>
        </MainContainer>
    )
}

function LanguageBlock() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [chart, setChart] = useState<ChartDataProps>({} as ChartDataProps);

    useEffect(() => {
        const init = async () => {
            try {
                const chartData = await generationChartData()
                    .catch(() => {
                        const props: ChartDataProps = {bytes: [0], lang: ["undefined"], colors: ['red']};
                        return props;
                    })

                setChart(chartData);
            } catch (err) {
                setError(true);
                console.error("언어 집계 실패 오류 ?= " + err);
            } finally {
                setLoading(false);
            }
        }

        init().then(r => r);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>서버 상태로인한 언어 집계 실패</p>;

    const LanguageBlock = dynamic(() =>
        import('@/pages/components/main_frame/LanguageBlock'), {
        ssr: false
    })

    return (
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
                <LanguageBlock chartData={chart}/>
            </MainContainerGrid>
        </MainContainer>
    )
}