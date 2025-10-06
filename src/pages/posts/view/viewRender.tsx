'use client'

import React, {useEffect, useState} from "react";
import {findById} from "@/pages/lib/db/ClientPostDB";
import {PostRenderHeader} from "@_components/post/main/ServerPostRender";
import {generationPostCardProps} from "@/pages/lib/post/ClientPost";
import {generateCompiledForMDX} from "@/pages/lib/post/ServerPosts";
import {useRouter} from "next/router";
import {PostSchema} from "@/pages/lib/db/Init";

export default function ViewRender({id}: { id: string }) {
    const router = useRouter();

    const [post, setPost] = React.useState<PostSchema | null>(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setError(false);
                const post = await findById(id)

                if (!post) {
                    setError(true);
                    return;
                }

                setPost(post);
                setLoading(false);
            } catch (err) {
                console.error(`api 호출 오류 : ${err}`);
                setError(true);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }

        fetchPost().then(r => r);
    }, [id]);

    if (loading) return <p>...Loading</p>
    if (error) {
        router.replace('/404?message=' + encodeURIComponent('게시글 ID가 유효하지 않습니다.')).then(r => r);
        return;
    }

    return (
        <ServerPostRender post={post}/>
    )
}

export const ServerPostRender: React.FC<{ headerIgnore?: boolean, post: PostSchema | null }>
    = ({headerIgnore, post}) => {

    const [compiledContent, setCompiledContent] = useState<string | null>(null);
    const [loadingContent, setLoadingContent] = useState(true);
    const [contentError, setContentError] = useState<string | null>(null);

    useEffect(() => {
        if (!post) {
            setCompiledContent(null);
            setLoadingContent(false);
            return;
        }

        const compileMdx = async () => {
            setLoadingContent(true);
            setContentError(null);
            try {
                const {content} = await generateCompiledForMDX(post.content);
                setCompiledContent(content);
            } catch (err: any) {
                console.error("MDX 컴파일 오류:", err);
                setContentError("게시글 내용을 불러오는 데 실패했습니다.");
            } finally {
                setLoadingContent(false);
            }
        };

        compileMdx().then(r => r);
    }, [post]);


    if (!post) {
        return <div>게시글 데이터를 로딩 중...</div>;
    }

    if (loadingContent) {
        return <div>게시글 내용을 준비 중입니다...</div>;
    }

    if (contentError) {
        return <div style={{color: 'red'}}>오류: {contentError}</div>;
    }

    const postProps = generationPostCardProps('', post);

    return (
        <div className="prose">
            {headerIgnore ? null : <PostRenderHeader props={postProps}/>}
            {compiledContent}
        </div>
    );
};