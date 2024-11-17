'use client'

import {PostCardProps} from "@_components/post/main/ServerPostRender";
import Pagination from "@_components/post/main/Pagination";
import {useEffect, useMemo, useState} from "react";
import {slicePage} from "@/app/lib/post/ClientPost";
import {PostCard} from "@_components/post/main/ClientPostRender";
import {Paging, PostListProps} from "@/app/lib/post/PostConfig";


export default function MainPostListRender({props}: { props: PostListProps[] }) {
    const paging = useMemo(() => new Paging(12, props.length), [props.length]);
    const [cardData, setCardData] = useState<PostCardProps[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const data = slicePage({postType: "main"}, props, page, paging);
        setCardData(data);
    }, [props, paging, page]);

    const handlePageChange = (page: number) => {
        setPage(page);
        setTimeout(() => {window.scrollTo({top: 0, behavior: 'smooth'});}, 0);
    }

    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div
                className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-7 sm:grid-cols-2 sm:gap-5 gap-10">
                {cardData.map((card, index) => (<PostCard key={`${index}:${card.filename}`} {...card} />))}
            </div>
            <div className={'pt-10 flex items-center justify-center'}>
                <Pagination totalPage={paging.getTotalPage} nowPageNumber={1} onPageChange={handlePageChange}/>
            </div>
        </div>
    )
}