'use client'

import dynamic from 'next/dynamic'
import React, {useRef, useState} from 'react'
import {MDXEditorMethods} from "@mdxeditor/editor";
import {MainTemplate, ProjTemplate, TypeButton} from "./component/TypeButton";
import path from "path";
import TimestampCalender, {formatDateTime} from "./component/TimestampCalender";
import MdxContentLoad from "./component/MdxContentLoad";


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
    const imgRegex = /<img\s+([^>]+)\/?>/g;

    const nextImage = (src: string, height: number = 100, width: number = 100, alt?: string) => {
        const type = src.split('/')[0];
        return `<MDXImage type='${type}' src='${src.split('/')[1]}' alt='${alt}' height='${height}' width='${width}'/>`
    }

    let content = mdxContent.replace(mdImageRegex, (_, src) => {
        return nextImage(src);
    });

    content = content.replace(imgRegex, (_, propsStr: string) => {
        const props: { [key: string]: string; } = {};
        const attrRegex = /(\w+)=['"]([^'"]+)['"]/g;
        let match;

        while ((match = attrRegex.exec(propsStr)) !== null) {
            const [_, key, value] = match;
            props[key] = value;
        }

        const src = props['src'];
        props['src'] = src.split('/')[1];
        props['type'] = src.split('/')[0];

        return `<MDXImage ${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
    })

    return content;
}

function convertImgToMDXImages(mdxContent: string) {
    const mdImageRegex = /<MDXImage\s+([^>]+)\/?>/g;
    return mdxContent.replace(mdImageRegex, (_, propsStr: string) => {
        const props: { [key: string]: string; } = {};

        const attrRegex = /(\w+)=['"]([^'"]+)['"]/g;
        let match;

        while ((match = attrRegex.exec(propsStr)) !== null) {
            const [_, key, value] = match;
            props[key] = value;
        }

        props['src'] = path.join(props['type'], props['src']);
        delete props['type'];

        return `<img ${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
    });
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
        /* MDX Editor는 <Image> 같은 커스텀 노드를 인식하지 못하여 그 이하의 글들을 전부 못불러오게됨.
         * 그래서 기존의 md 태그들을 활용해 변경해주어야 함.
         * Image 노드만 그런지는 차후 테스트 해봐야함. */
        const conversionContent = convertImgToMDXImages(content);
        setMdx(conversionContent);
        setIsLoad(true);
    };

    return (
        <div className="prose">
            <MdxContentLoad onFileLoad={handleMainFileLoad} labelName={'불러오기'}/>
            <TimestampCalender/>
            <TypeButton onTypeChange={handleTypeChange} onSave={handleSave}/>
            <div style={{border: '1px solid black'}}>
                <DemoEditor postType={postType} markdown={mdx} editorRef={ref}/>
            </div>
        </div>
    )
}
