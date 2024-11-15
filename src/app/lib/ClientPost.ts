import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {PostListProps} from "@/app/lib/ServerPosts";

export type PostType = {
    postType: 'main'
} | {
    postType: 'proj'
    projType: 'team' | 'personal'
}


/** 페이징 계산을 위해 만들어진 클래스 입니다. */
export class Paging {
    size: number;
    total: number;
    sort: any;

    static default_sort(a: any, b: any) {
        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return b.getTime() - a.getTime();
    }

    constructor(size: number, total: any[] | number, sort?: any) {
        this.size = size;
        this.total = (total instanceof Array) ? total.length : total
        this.sort = sort;
    }

    get getTotalPage() {
        return Math.ceil(this.total / this.size);
    }

    get generateStaticParams() {
        return Array.from({length: this.getTotalPage}, (_, index) =>
            ({page: String(index + 1)}))
    }
}

export function generationPostCardProps(postType: PostType, filename: string, frontmatter: Record<string, unknown>)
    : PostCardProps {
    if (frontmatter.tags != undefined) {
        if (!(frontmatter.tags instanceof Array)) {
            frontmatter.tags = (frontmatter.tags as string).trim();
            frontmatter.tags = (frontmatter.tags as string).split(',')
                .filter(tag => tag.length > 0);
        } else {
            frontmatter.tags = frontmatter.tags.map(x => x.trim())
        }
    }

    Object.entries(frontmatter).forEach(([key, value]) => {
        if (typeof value == 'string') {
            frontmatter[key] = value.trim();
        } else if (value instanceof Array) {
            frontmatter[key] = value.map(val => (val as string).trim())
        }
    })

    return {
        filename: filename,
        info: {
            mainImg: (<string>frontmatter.mainImg),
            title: (<string>frontmatter.title),
            description: (<string>frontmatter.description),
            tags: (<Array<string>>frontmatter.tags),
            date: (new Date(<Date>frontmatter.timestamp))
        },
        postType: postType,
    }
}

/** 주어진 데이터, 현재 페이지 번호, 페이징을 사용하여 페이징 크기에 맞게 현재 페이지의 정보를 반환합니다.
 * @see  {@link Paging} */
export function slicePage(postType: PostType, list: PostListProps[], thisPage: number, paging: Paging) {
    const result: PostCardProps[] = [];

    const push = (obj: { filename: string, frontmatter: Record<string, unknown> }) => {
        const filename = obj.filename.replace('.mdx', '');
        const frontmatter = obj.frontmatter;
        const props: PostCardProps = generationPostCardProps(postType, filename, frontmatter);
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