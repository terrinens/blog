import {getPostSlugs, getPostSlugsDeep} from "@/app/lib/Posts";
import PostCard from "@/app/components/PostCard";
import fs from "fs";

// export async function getStaticProps() {
//     const posts = await getPostSlugs();
// }

export default async function Page() {
    const postSlugs = await getPostSlugs();

    return (
        <>
            {postSlugs.map((slug) => (
                <div>
                    <h1>title : {slug}</h1>
                </div>
            ))}
        </>
    );
}