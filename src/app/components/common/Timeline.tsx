import React from "react";

export function DateBlock({date}: { date: string | Date }) {
    return (<div className="ps-2 my-2 first:mt-0 not-prose">
        <h3 className="text-sm font-medium uppercase text-gray-500 dark:text-neutral-400">
            {date instanceof Date ? date.toLocaleDateString() : date}
        </h3>
    </div>)
}

export const RecordCase = ({title, children}: { title: string, children: React.ReactNode }) => (
    <div className="flex gap-x-3 not-prose">
        <div
            className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
            <div className="relative z-10 size-7 flex justify-center items-center">
                <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
            </div>
        </div>
        <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                {title}
            </h3>
            {children}
        </div>
    </div>
)