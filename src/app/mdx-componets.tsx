import type {MDXComponents} from "mdx/types";
import Image from 'next/image'

export function userMDXComponents(mdxComponents: MDXComponents) {
    return {
        ...mdxComponents, Image
    };
}