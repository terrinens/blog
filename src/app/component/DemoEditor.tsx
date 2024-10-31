'use client'
import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    codeBlockPlugin,
    codeMirrorPlugin,
    CodeToggle,
    CreateLink,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    InsertCodeBlock,
    InsertFrontmatter,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    ListsToggle,
    MDXEditor,
    MDXEditorMethods,
    MDXEditorProps,
    quotePlugin,
    Separator,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor'
import {ForwardedRef} from "react";
import TestImage from '../public/test.png'

export function imagePreview(): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = TestImage.src

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result as string); // Base64 문자열 반환
                    };
                    reader.readAsDataURL(blob);
                });
            }
        };
    });
}

const imageUpload = async (file: any, postType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('postType', postType);

    const response = await fetch(`http://localhost:3000/api/save/img`, {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const json = await response.json()
        return json.filePath;
    } else {
        return null;
    }
}

function Toolbar() {
    return (
        <>
            <InsertFrontmatter/>
            <InsertThematicBreak/>
            <BlockTypeSelect/>
            <Separator/>

            <CodeToggle/>
            <BoldItalicUnderlineToggles/>
            <Separator/>

            <ListsToggle/>
            <Separator/>

            <CreateLink/>
            <InsertCodeBlock/>
            <InsertTable/>

            <InsertImage/>
        </>
    )
}

const allPlugins = (postType: string) => [
    toolbarPlugin({toolbarContents: () => <Toolbar/>}),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({defaultCodeBlockLanguage: 'txt'}),
    codeMirrorPlugin({
        codeBlockLanguages: {
            java: 'Java',
            js: 'JavaScript',
            css: 'CSS',
            txt: 'text',
            tsx: 'TypeScript'
        }
    }),

    imagePlugin({
        imageUploadHandler: async (file) => imageUpload(file, postType),
        imagePreviewHandler: () => imagePreview(),
    }),
]


export default function DemoEditor({editorRef, postType, ...props}: {
    editorRef: ForwardedRef<MDXEditorMethods> | null, postType: string
} & MDXEditorProps) {
    return (
        <MDXEditor
            contentEditableClassName="prose max-w-full font-sans"
            plugins={allPlugins(postType)}
            {...props}
            ref={editorRef}
        />
    )
}