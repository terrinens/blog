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

export type PostListProps = {
    filename: string,
    frontmatter: Record<string, unknown>
}

export interface DirectoryNode {
    name: string,
    type: "dir" | "file",
    children?: DirectoryNode[];
}