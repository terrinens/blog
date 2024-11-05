import TagBlock from "@/app/components/main_frame/TagBlock";
import {PostCard} from "@/app/components/post/main/PostRender";
import dynamic from "next/dynamic";
import {generationPostCardProps, getPostListData, Paging} from "@/app/lib/Posts";
import {ChartDataProps, generationChartData} from "@/app/components/main_frame/LanguageBlockData";

async function RecencyPostBlockData() {
    const allList = [...await getPostListData('/main'), ...await getPostListData('/proj')];
    allList.sort((a, b) => Paging.default_sort(a.frontmatter, b.frontmatter));

    const sliceCount = 4;
    const sliceList = allList.slice(0, sliceCount);
    return sliceList.map(data => generationPostCardProps(data.filename, data.frontmatter));
}

export default async function Home() {
    const recencyPostBlockData = await RecencyPostBlockData();

    const chartData = await generationChartData()
        .catch(() => {
            const props: ChartDataProps = {bytes: [0], lang: ["undefined"], colors: ['red']};
            return props;
        })

    const LanguageBlock = dynamic(() =>
        import('@/app/components/main_frame/LanguageBlock'), {
        ssr: false
    })

    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='col-span-1 mb-3'>
                <TagBlock key={'TagBlock'}/>
            </div>

            <div className='col-span-1 mb-3'>
                <div className=' grid-cols-4 grid gap-4'>
                    {
                        recencyPostBlockData.map(data => (
                            <PostCard
                                key={'MainRecencyPost:' + data.filename}
                                filename={data.filename.replace('.mdx', '')} info={data.info}
                                tagRender={false}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='col-span-1'>
                <LanguageBlock chartData={chartData}/>
            </div>
        </div>
    );
}
