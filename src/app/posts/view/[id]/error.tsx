"use client"

import NotFound from "@/app/not-found";

export default function Error({error, reset}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    if (process.env.NODE_ENV !== "development") {
        console.log(error);
        console.log(reset);
    }
    return (<NotFound message={'해당 게시글을 찾지 못했습니다!'}/>);
}

