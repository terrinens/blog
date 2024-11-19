import {MainContainerGrid} from "@_components/main_frame/MainContainer";

export default async function TagBlock({allTags}: { allTags: string[] }) {
    return (
        <div className="max-w-screen-xl w-full">
            <div
                className="scroll-hidden max-h-[calc(3*4rem)] flex justify-center">
                <MainContainerGrid title={'Tags'} option={{
                    id: 'total_tags_used_block',
                    tooltipText: '블로그에서 사용된 태그를 나타내는 블록입니다.'
                }}>
                    <div className="flex flex-wrap justify-start">
                        {allTags.map((key) => (
                            <div key={'TCB:' + key}
                                 className={'flex items-center w-auto mx-1 justify-center'}>
                                <GenerationBlock key={'TagCountBlock:' + key} tag={key}/>
                            </div>
                        ))}
                    </div>
                </MainContainerGrid>
            </div>
        </div>
    );
}

function GenerationBlock({tag}: { tag: string }) {
    return (
        <div
            className="mb-2.5 flex flex-col items-center justify-center border rounded-xl w-full max-h-20 overflow-hidden">
            <div className="w-full py-2.5 flex flex-col items-center gap-x-2 px-4">
                <p className="text-sm text-center font-semibold text-gray-500 break-words overflow-hidden">
                    {tag}
                </p>
            </div>
        </div>
    )
}