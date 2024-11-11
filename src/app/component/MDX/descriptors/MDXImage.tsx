import React from "react";
import path from "path";

type MDXImageType = {
    type: string,
    src: string,
    alt?: string,
    width?: number,
    height?: number,
    style?: React.CSSProperties
}

declare function MDXImage({type, src, alt, width, height, style, className}: { className?: string } & MDXImageType)


export function convertImagesInMDX(mdxContent: string) {
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

export function convertImgToMDXImages(mdxContent: string) {
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