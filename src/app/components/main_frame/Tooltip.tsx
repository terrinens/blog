'use client'

import questionMark from '@_public/svg/question-mark-circle-svgrepo-com.svg'
import React from "react";
import Image from "next/image";

export default function Tooltip(
    {id, description, href}: {
        id: string,
        description: string | React.ReactNode,
        href?: string
    }) {
    return (
        <>
            <button data-tooltip-target={id} data-tooltip-style="light" type="button"
                    data-tooltip-placement="top"
                    className="w-8 h-8 flex items-center justify-center text-white  hover:bg-gray-200 focus:ring-1 focus:outline-none rounded-full text-sm p-1 text-center"
                    onClick={(e) => {
                        if (href) {
                            e.preventDefault()
                            window.location.href = href
                        }
                    }}>
                <Image src={questionMark.src} alt={''} width={40} height={40} className={'m-0'}/>
            </button>

            <div id={id} role="tooltip"
                 className="max-w-2xl h-auto max-h-full absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                {description}
                <div className="tooltip-arrow" data-popper-arrow=""/>
            </div>
        </>
    )
}