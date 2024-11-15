import {PostCardProps} from "@_components/post/main/ServerPostRender";
import {PostCard} from "@_components/post/main/ClientPostRender";

const SliceBlock = ({props}: { props: [PostCardProps, PostCardProps] }) => {
    return (
        <div className="grid grid-cols-2 gap-3 duration-700 ease-in-out bg-white"
             data-carousel-item="active">
            <PostCard dateRender={false} {...props[0]} />
            {props[1] != undefined ? <PostCard dateRender={false} {...props[1]} /> : null}
        </div>
    )
}


export default function RecencyPostsBlock({props}: { props: PostCardProps[] }) {
    const slicedProps: [PostCardProps, PostCardProps][] = [];
    for (let i = 0; i < props.length; i += 2) {
        slicedProps.push(props.slice(i, i + 2) as [PostCardProps, PostCardProps]);
    }

    return (
        <div id="indicators-carousel" className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {slicedProps.map((data, index) => (<SliceBlock key={index} props={data}/>))}
            </div>

            <button type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30  group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white  rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
            </button>
            <button type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
            </button>
        </div>
    )
}