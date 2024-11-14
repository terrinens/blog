import {countUsedTags} from "@/app/lib/Posts";
import {MainContainerGrid} from "@_components/main_frame/MainContainer";

export default async function TagBlock() {
    const result = await countUsedTags(['main', 'proj']);

    return (
        <div className="w-full">
            <div
                className="scroll-hidden max-h-[calc(3*4rem)] flex justify-center">
                <MainContainerGrid title={'블로그 태그 사용 수'}>
                    <div
                        className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-10 md:gap-4 lg:grid-cols-11 lg:gap-5 xl:grid-cols-12 xl:gap-7 gap-4">
                        {
                            Object.entries(result).map(([key, value]) => (
                                <div key={'TagCountBlockParents:' + key} className={'flex items-center justify-center'}>
                                    <GenerationBlock key={'TagCountBlock:' + key} tag={key} count={value}/>
                                </div>
                            ))
                        }
                    </div>
                </MainContainerGrid>
            </div>
        </div>
    );
}

function GenerationBlock({tag, count}: { tag: string, count: number }) {
    return (
        <div className="flex flex-col items-center justify-center border rounded-xl w-full max-h-20 overflow-hidden">
            <div className="w-full pt-2 pb-2 p-0 flex flex-col items-center">
                <div className="flex flex-col gap-x-2 w-full">
                    <p className="text-sm text-center font-semibold text-gray-500 break-words overflow-hidden">
                        {tag}
                    </p>
                </div>

                <div className="mt-2 text-2 sm:text-sm md:text-lg lg:text-xl text-gray-800">
                    <span className="font-semibold">{count}</span>
                </div>
            </div>
        </div>
    )
}