import React from "react";
import {MDXRemote} from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";

type PostRenderProps = {
    postPath: string;
    postName: string;
}

export default function PostRender({postPath, postName}: PostRenderProps) {
    const target = path.join(process.cwd(), postPath, postName + '.mdx');
    let source = fs.readFileSync(target, "utf8");
    return (
        /** RECORD
         * PROBLEM : MDX를 렌더링하였으나 <h1> 같은 태그들이 정상적으로 작동하지 않아 글자 크기들이 일정했음.
         * RESOLUTION :
         * MDX를 파싱할때 globals.css의 @tailwind base;가 기존의 태그들을 재정의 하고 있었던 탓에
         * <h1> 같이 정상적으로 작동하지 않았음.
         * */
        <div className="prose">
            <MDXRemote source={source} options={{parseFrontmatter: true}}/>
        </div>
    )
};