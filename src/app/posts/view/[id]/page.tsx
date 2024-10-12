import {getPostSlugs} from "@/app/lib/Posts";
import fs from "fs";
import path from "path";
import {compileMDX} from "next-mdx-remote/rsc";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page(props: Props) {
    const {id} = props.params;
    const target = path.join(process.cwd(), 'src/posts', id + '.mdx');
    const source = fs.readFileSync(target, "utf8");

    const {content, frontmatter} = await compileMDX({
        source, options: {parseFrontmatter: true}
    });

    return (
        <div className={'md:flex'}>
            <div
                className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg"
                     alt="Woman's Face"/>
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            Erin Lindford
                        </p>
                        <p className="text-slate-500 font-medium">
                            Product Engineer
                        </p>
                    </div>
                    <button
                        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message
                    </button>
                </div>
            </div>

            <h1>title?</h1>
            <div>{frontmatter.title}</div>

            <h1>date?</h1>
            <div>{frontmatter.date}</div>

            <h1>time?</h1>
            <div>{frontmatter.time}</div>

            <h1>tags?</h1>
            <div>{frontmatter.tags}</div>

            <h1>content?</h1>
            <div>{content}</div>
        </div>
    )
}

export async function generateStaticParams() {
    const postList = await getPostSlugs();
    return postList.map(id => ({id: id}))
}