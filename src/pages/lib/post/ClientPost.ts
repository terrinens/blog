import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {PostSchema, ProjSchema} from "@/pages/lib/db/Init";

export function generationPostCardProps(id: string, data: PostSchema | ProjSchema): PostCardProps {
    let date;

    if ('createdAt' in data) {
        date = data.createdAt as string;
    } else {
        date = data.startAt as string;
    }

    return {
        id: id,
        info: {
            thumbnail: data.thumbnail ?? '',
            date: date,
            description: data.description,
            tags: data.tags ?? [],
            name: data.name,
        },
    }
}