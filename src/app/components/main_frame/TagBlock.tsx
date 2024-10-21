import {countUsedTags} from "@/app/lib/Posts";
import './TagBlock.css'

export default async function TagBlock() {
    const result = await countUsedTags(['main', 'proj']);

    return (
        <div className="w-full px-1 py-5 lg:px-20 lg:py-14 mx-auto">
            <div
                className="scroll-hidden max-h-[calc(3*4rem)] overflow-hidden overflow-y-auto grid grid-cols-7 lg:grid-cols-10 gap-1 sm:gap-3">
                {
                    Object.entries(result).map(([key, value]) => (
                        <div key={'TagCountBlockParents:' + key} className={'flex items-center justify-center'}>
                            <GenerationBlock key={'TagCountBlock:' + key} tag={key} count={value}/>
                        </div>
                    ))
                }
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
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </p>
                </div>

                <div className="mt-2 text-2 sm:text-sm lg:text-4xl text-gray-800">
                    <span className="font-semibold">{count}</span>
                </div>
            </div>
        </div>
    )
}