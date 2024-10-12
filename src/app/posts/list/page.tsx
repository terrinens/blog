import {getPostSlugs} from "@/app/lib/Posts";

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