'use client'

import dynamic from 'next/dynamic'
import React, {useRef, useState} from 'react'
import {MDXEditorMethods} from "@mdxeditor/editor";
import {MainTemplate, ProjTemplate, TypeButton} from "./component/TypeButton";

async function mdxSave(content: string) {
    const response = await fetch(`http://localhost:3000/api/save/post`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            postType: 'main',
            fileName: null,
            content: content,
        })
    });

    if (response.ok) console.log('ok');
    else console.log('error');
}


export default function Home() {
    const ref = useRef<MDXEditorMethods>(null)
    const [mdx, setMdx] = useState(MainTemplate)
    const [postType, setPostType] = useState<string>('main')

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

    const handleSave = async () => {
        if (ref.current) await mdxSave(ref.current.getMarkdown())
        else console.error('save error')
    }

    return (
        <div className="prose">
            <TypeButton onTypeChange={handleTypeChange}/>
            <button onClick={handleSave}> save</button>
            <div style={{border: '1px solid black'}}>
                <DemoEditor postType={postType} markdown={mdx} editorRef={ref}/>
            </div>
        </div>
    )
}
