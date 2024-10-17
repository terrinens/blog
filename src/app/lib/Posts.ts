import fs from 'fs';
import path from 'path';
import default_img from '@/public/post_default.jpg'
import {compileMDX} from "next-mdx-remote/rsc";
import {PostCardProps} from "@/app/components/PostRender";

const postsDir = path.join(process.cwd(), '/src/posts');

export class Paging {
    size: number;
    total: number;
    sort: any;

    default_sort(a: any, b: any) {
        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return b.getTime() - a.getTime();
    }

    constructor(size: number, total: any[] | number, sort: any = this.default_sort) {
        this.size = size;
        this.total = (total instanceof Array) ? total.length : total
        this.sort = sort;
    }

    get getTotalPage() {
        return Math.ceil(this.total / this.size);
    }
}

export async function getPostSlugs(deep: string | null = null) {
    const readDir = deep ? path.join(postsDir, deep) : postsDir
    return fs.readdirSync(readDir).filter(file => file.endsWith('.mdx'));
}

function postSort(a: any, b: any, paging: Paging) {
    if (typeof paging.sort === "function") return paging.sort(a, b);

    const elementA = a[paging.sort];
    const elementB = b[paging.sort];

    if (elementA < elementB) return -1;
    if (elementA > elementB) return 1;

    return 0;
}

export type PostListProps = {
    filename: string,
    frontmatter: Record<string, unknown>
}

export async function getPostListData(deep: string | null = null) {
    const readDir = deep ? path.join(postsDir, deep) : postsDir
    const mdList = await getPostSlugs(deep);

    const result: PostListProps[] = [];

    for (const slug of mdList) {
        const source = fs.readFileSync(path.join(readDir, slug), 'utf8');
        try {
            const compiled = await compileMDX({source: source, options: {parseFrontmatter: true}})
            const frontmatter = compiled.frontmatter;
            result.push({filename: slug, frontmatter: frontmatter})
        } catch (error) {
            console.log('not read a file but pass');
            console.log(error);
        }
    }

    return result;
}

export async function generationPaging(list: PostListProps[], paging: Paging) {
    list = list.sort((a, b) => postSort(a.frontmatter, b.frontmatter, paging))

    const result: { [key: number]: { list: PostCardProps[] } } = {};

    for (let i = 0, page = 1; i < paging.total; i += paging.size, page++) {
        const page_slice: PostCardProps[] = [];

        for (const obj of list.slice(i, i + paging.size)) {
            const filename = obj.filename.replace('.mdx', '');
            const frontmatter = obj.frontmatter;

            const props: PostCardProps = {
                filename: filename,
                info: {
                    mainImg: (<string>frontmatter.mainImg),
                    title: (<string>frontmatter.title),
                    description: (<string>frontmatter.description),
                    tags: (<Array<string>>frontmatter.tags),
                    date: (new Date(<Date>frontmatter.timestamp))
                }
            }

            page_slice.push(props)
        }
        result[page] = {list: page_slice};
    }

    return result;
}

export function generationPostCardProps(filename: string, frontmatter: Record<string, unknown>): PostCardProps {
    return {
        filename: filename,
        info: {
            mainImg: (<string>frontmatter.mainImg),
            title: (<string>frontmatter.title),
            description: (<string>frontmatter.description),
            tags: (<Array<string>>frontmatter.tags),
            date: (new Date(<Date>frontmatter.timestamp))
        }
    }
}

export async function slicePage(list: PostListProps[], thisPage: number, paging: Paging) {
    const result: PostCardProps[] = [];

    const push = (obj: { filename: string, frontmatter: {} }) => {
        const filename = obj.filename.replace('.mdx', '');
        const frontmatter = obj.frontmatter;
        const props: PostCardProps = generationPostCardProps(filename, frontmatter);
        result.push(props);
    }

    if (thisPage == 1) {
        for (const obj of list.slice(0, thisPage * paging.size)) {
            push(obj)
        }
    } else {
        const startSlice = ((thisPage - 1) * paging.size) - 1;
        const endSlice = paging.size * thisPage - 1;
        for (const obj of list.slice(startSlice, endSlice)) {
            push(obj)
        }
    }

    return result;
}

export const DefaultImg = {src: default_img.src, alt: 'https://www.freepik.com/ Designed by : freepik'}


