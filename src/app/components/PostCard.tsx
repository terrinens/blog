"use client"

import React from "react";
import {GetStaticProps} from "next";
import matter from "gray-matter";
import {MDXComponents} from "mdx/types";
import fs from "fs";
import {MDXProvider} from "@mdx-js/react";

interface PostCardProps {
    mdxPath: string;
}

export default function PostCard({mdxPath}: PostCardProps) {
    const contents = fs.readFileSync(mdxPath, "utf8");
    return (
        <MDXProvider>{contents}</MDXProvider>
    )
    /*    return (
     <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
     <div className="bg-blue-600 text-white p-4 text-center">
     {img === 'sample.img'
     ? <h1 className="text-lg font-bold">{img}</h1>
     : <img alt='포스트 대표 이미지' src={img}/>
     }
     </div>
     <div className="p-4">
     <h2 className="text-xl font-semibold mb-2">
     {title}
     </h2>
     <p className="text-gray-700 mb-4">
     {content}
     </p>
     </div>
     </div>
     );*/

};

export function generateStaticParams() {}