import TagBlock from "@/app/components/main_frame/TagBlock";
import RecencyPostBlockData from "@/app/components/main_frame/RecencyPostBlockData";
import LanguageBlock from "@/app/components/main_frame/LanguageBlock";
import {PostCard} from "@/app/components/PostRender";

export default async function Home() {
    const recencyPostBlockData = await RecencyPostBlockData();

    return (
        <div>
            <TagBlock key={'TagBlock'}/>
            <div className='grid-cols-4 grid gap-4'>
                {
                    recencyPostBlockData.map(data => (
                        <PostCard
                            key={'MainRecencyPost:' + data.filename}
                            filename={data.filename} info={data.info}
                            tagRender={false}
                        />
                    ))
                }
            </div>
            <LanguageBlock key={'LanguageBlock'}/>
        </div>
    );
}
