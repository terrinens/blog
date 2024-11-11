'use client'

import dynamic from 'next/dynamic'
import React, {useRef, useState} from 'react'
import {MDXEditorMethods} from "@mdxeditor/editor";
import {MainTemplate, ProjTemplate, TypeButton} from "./component/TypeButton";
import path from "path";
import TimestampCalender, {formatDateTime} from "./component/TimestampCalender";
import MDXContentLoad from "./component/MDX/MDXContentLoad";

import '../../node_modules/@mdxeditor/editor/dist/style.css';
import {convertImagesInMDX, convertImgToMDXImages} from "@/app/component/MDX/descriptors/MDXImage";

async function mdxSave(postType: string, content: string, fileName?: string, isApi?: boolean) {
    const response = await fetch(`http://localhost:3000/api/save/post`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            postType: postType,
            fileName: fileName,
            isApi: isApi,
            content: content,
        })
    });

    if (response.ok) console.log('ok');
    else console.log('error');
}


function updateTimestamp(mdxContent: string) {
    const newTimestamp = formatDateTime(Date.now())
    return mdxContent.replace(/(timestamp:\s*)(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6})/, `$1${newTimestamp}`);
}

export default function Home() {
    const ref = useRef<MDXEditorMethods>(null)
    const [mdx, setMdx] = useState(MainTemplate)
    const [postType, setPostType] = useState<string>('main');
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const handleTypeChange = (type: string) => {
        if (isLoad) return;

        if (type == 'main') {
            setMdx(MainTemplate)
            setPostType('main')
        } else if (type == 'proj') {
            setMdx(ProjTemplate)
            setPostType('proj')
        }
    }

    const DemoEditor = dynamic(() => import('./component/DemoEditor'), {ssr: false})

    const handleSave = async (postType: string, projectType: string, projectName: string, apiName: string) => {
        if (ref.current) {
            let content = convertImagesInMDX(ref.current.getMarkdown());
            content = updateTimestamp(content);

            const isApi = apiName.length > 0;
            const saveType = path.join(postType, projectType, projectName)
            await mdxSave(saveType, content, apiName, isApi);
        } else console.error('save error')
    }

    const handleMainFileLoad = (content) => {
        const conversionContent = convertImgToMDXImages(content);
        setMdx(conversionContent);
        setIsLoad(true);
    };

    return (
        <div className={'bg-white'}>
            <MDXContentLoad onFileLoad={handleMainFileLoad} labelName={'불러오기'}/>
            <TimestampCalender/>
            <TypeButton onTypeChange={handleTypeChange} onSave={handleSave}/>
            <div className={'prose border-2 border-solid border-black overflow-y-auto'}>
                <DemoEditor postType={postType} markdown={mdx} editorRef={ref}/>
            </div>
        </div>
    )
}
