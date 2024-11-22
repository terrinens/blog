'use client'

import {useEffect, useState} from "react";
import {getPosts, PaginationResult} from "@/app/lib/db/ClientPostDB";
import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";
import {PostCard} from "@_components/post/main/ClientPostRender";
import InfiniteScroll from "react-infinite-scroller";


export default function MainPostListRender({pageSize}: { pageSize: number }) {
    const [data, setData] = useState<PaginationResult>({} as PaginationResult);
    const [cardData, setCardData] = useState<PostCardProps[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const init = async () => {
            const data = await getPosts(pageSize)
            setData(data);
            setCardData(data.posts.map(post => generationPostCardProps(post.id, post.data)));
            setHasMore(!!data.nextCall);
        }
        init().then(r => r);
    }, [pageSize]);

    const loadNext = async () => {
        console.log("Load Next");
        if (data.nextCall) {
            const newData = await data.nextCall();
            setData(newData);

            setCardData(cardData => [
                ...cardData,
                ...newData.posts.map(post => generationPostCardProps(post.id, post.data))
            ]);

            setHasMore(!!newData.nextCall);
        } else {
            setHasMore(false);
        }
    }

    const loadingBlock = (
        <div className={'prose'}><h4>Loading...</h4></div>
    );

    const endBlock = (
        <div className={'flex justify-center items-center mt-9 text-center prose flex-col'}>
            <h3 className={'text-gray-500'}>포스터가 더 이상 존재하지 않습니다.</h3>
            <span className={'block text-gray-500'}>추후에 더 많은 포스터를 기대해주세요!</span>
        </div>
    )

    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <InfiniteScroll
                key={'infinite-scroll'}
                pageStart={0}
                loadMore={loadNext}
                hasMore={hasMore}
                loader={loadingBlock}>
                <div key={'infinite-scroll-dev'}
                     className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-7 sm:grid-cols-2 sm:gap-5 gap-10">
                    {cardData.map((props, index) => (
                        <PostCard key={`card:${index}:${props.id}`} baseURL={'/posts/view/'} {...props}/>))}
                </div>
                {!hasMore && endBlock}
            </InfiniteScroll>
        </div>
    )
}