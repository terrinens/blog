'use client'

import dynamic from 'next/dynamic'
import React, {useRef, useState} from 'react'
import {MDXEditorMethods} from "@mdxeditor/editor";
import {MainTemplate, ProjTemplate, TypeButton} from "./component/TypeButton";
import path from "path";
import TimestampCalender, {formatDateTime} from "./component/TimestampCalender";

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

function convertImagesInMDX(mdxContent: string) {
    const mdImageRegex = /!\[.*?]\((.*?)\)/g;
    const imgRegex = /<img\s+height="(\d+)"\s+width="(\d+)"\s+src="(.*?)"\s*\/?>/g;
    const nextImage = (src: string, height: number = 100, width: number = 100, alt?: string) =>
        `<Image src='${src}' alt='${alt}' height='${height}' width='${width}'/>`

    let content = mdxContent.replace(mdImageRegex, (_, path) => {
        return nextImage(path);
    });

    content = content.replace(imgRegex, (_, height, width, src) => {
        return nextImage(src, height, width);
    })

    return content;
}

function updateTimestamp(mdxContent: string) {
    const newTimestamp = formatDateTime(Date.now())
    return mdxContent.replace(/(timestamp:\s*)(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6})/, `$1${newTimestamp}`);
}

export default function Home() {
    const ref = useRef<MDXEditorMethods>(null)
    const [mdx, setMdx] = useState(MainTemplate)
    const [postType, setPostType] = useState<string>('main');

    const handleTypeChange = (type: string) => {
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

    return (
        <div className="prose">
            <TimestampCalender/>
            <TypeButton onTypeChange={handleTypeChange} onSave={handleSave}/>
            <div style={{border: '1px solid black'}}>
                <DemoEditor postType={postType} markdown={mdx} editorRef={ref}/>
            </div>
        </div>
    )
}
