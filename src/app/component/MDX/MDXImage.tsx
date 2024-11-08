import {
    Button,
    GenericJsxEditor,
    insertJsx$,
    JsxComponentDescriptor,
    JsxPropertyDescriptor,
    NestedLexicalEditor,
    usePublisher
} from "@mdxeditor/editor";
import React from "react";
import {MdxJsxTextElement} from "mdast-util-mdx-jsx";

declare type MDXImageType = {
    type: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

export const getMDXImageTypeKeyValue = (): JsxPropertyDescriptor[] => {
    return [
        {name: 'type', type: 'string', required: true},
        {name: 'src', type: 'string', required: true},
        {name: 'alt', type: 'string', required: false},
        {name: 'width', type: 'number', required: false},
        {name: 'height', type: 'number', required: false},
        {name: 'className', type: 'string', required: false}
    ];
};

export declare function MDXImage({type, src, alt, width, height, className}: MDXImageType): React.JSX.Element

export const mdxImageDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'MDXImage',
        kind: 'flow',
        source: '@_mdx-components/*',
        props: [{name: 'type', type: 'string'}],
        hasChildren: false,
        Editor: () => {
            return (
                <div style={{border: '1px solid red', padding: 8, margin: 8, display: 'inline-block'}}>
                    <NestedLexicalEditor<MdxJsxTextElement>
                        getContent={(node) => node.children}
                        getUpdatedMdastNode={(mdastNode, children: any) => {
                            return {...mdastNode, children}
                        }}
                    />
                </div>
            )
        }
    },
    {
        name: 'BlockNode',
        kind: 'flow',
        source: './external',
        props: [],
        hasChildren: true,
        Editor: GenericJsxEditor
    }
]

// a toolbar button that will insert a JSX element into the editor.
export const InsertMyLeaf = () => {
    const insertJsx = usePublisher(insertJsx$)
    return (
        <Button
            onClick={() =>
                insertJsx({
                    name: 'MyLeaf',
                    kind: 'text',
                    props: {
                        foo: 'bar',
                        bar: 'baz',
                        onClick: {type: 'expression', value: '() => console.log("Clicked")'}
                    }
                })
            }
        >
            Leaf
        </Button>
    )
}