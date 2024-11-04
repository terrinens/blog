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
import PD from '../../public/post_default.jpg'

/* public외 제대로 접근이 불가능한 소스임.
 * 본 프로젝트의 특성상 MDX는 이미 빌드완료된 소스이기 때문에 /_next/static/media/download.538da40f.jpg 같이 이미지를 참조해서 가져옴.
 * 하지만 해당 코드는 어떤 폴더에 있는 즉, 빌드되지 않은 소스에서 가져오기 때문에 해당 프로젝트 특성처럼 업로드된 이미지를 정상적으로 사용할수없음.
 *
 * */
export function imagePreview(imageSource: string): Promise<string> {
    console.log(imageSource);
    const image = new Image();
    image.src = PD.src;

    return new Promise((resolve) => {
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
                        resolve(reader.result as string);
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

function ImageInsertButton() {
    const x = imagePlugin();
    imagePlugin();

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
        imagePreviewHandler: async (imageSource) => imagePreview(imageSource),
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