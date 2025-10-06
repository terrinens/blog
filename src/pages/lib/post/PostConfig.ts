import {Timestamp} from "@firebase/firestore";

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

    constructor(size: number, total: number) {
        this.total = total;
        this.size = size;
    }

    get getTotalPage() {
        return Math.ceil(this.total / this.size);
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

export const dateFormatter = (date: Date | Timestamp | string): string => {
    if (typeof date === 'string') return date;

    if (date instanceof Timestamp) {
        date = (date as Timestamp).toDate();
    } else if ('seconds' in date) {
        date = (date as unknown as Timestamp).toDate();
    }

    const year = date.getFullYear();
    if (isNaN(year)) return 'Not Recode Date';

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
}