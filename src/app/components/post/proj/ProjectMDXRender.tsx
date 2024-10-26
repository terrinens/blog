import {PostRenderProps} from "@/app/components/post/main/PostRender";
import {getCompileMDX} from "@/app/lib/Posts";
import {PostsDir} from "@/app/lib/Config";
import {MDXRemote} from "next-mdx-remote/rsc";
import React from "react";

export async function ProjectInfoRender({postName, deep}: PostRenderProps) {
    const {source, compiled} = await getCompileMDX(PostsDir, ...deep, postName + '.mdx');
    return (
        <div>
            <MDXRemote source={source} options={{parseFrontmatter: true}}/>
        </div>
    );
}