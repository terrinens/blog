"use client"

import NotFound from "@/app/not-found";

export default function Error() {
    return (<NotFound message={'해당 게시글을 찾지 못했습니다!'}/>);
}