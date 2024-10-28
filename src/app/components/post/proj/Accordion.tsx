import React from "react";

type AccordionProps = {
    title: string
    anchor?: boolean
    ariaExpanded?: boolean
}

function AccordionButton({props}: { props: AccordionProps }) {
    return (
        <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
            aria-expanded={props.ariaExpanded} aria-controls="hs-basic-active-bordered-collapse-one">
            {props.title}
            <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
            <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
            </svg>
        </button>
    )
}

export function AccordionBlock({props, children}: { props: AccordionProps, children: React.ReactNode }) {
    const block = (
        <div id="hs-basic-active-bordered-collapse-one"
             className={`${props.ariaExpanded ? '' : 'hidden'} hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
             role="region" aria-labelledby="hs-active-bordered-heading-one">
            <div className="pb-4 px-5">
                {children}
            </div>
        </div>
    );

    return (
        <div
            className={`${props.ariaExpanded ? 'active' : ''} mb-5 hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-neutral-700 dark:bg-neutral-800 dark:border-transparent`}
            id={props.title}>
            <AccordionButton props={props}/>
            {props.anchor ? (
                <a href={`#${props.title}`}>
                    {block}
                </a>
            ) : (block)}
        </div>
    )
}

export function AccordionCase({children}: { children: React.ReactNode }) {
    return (
        <div className="hs-accordion-group" data-hs-accordion-always-open=''>
            {children}
        </div>
    )
}