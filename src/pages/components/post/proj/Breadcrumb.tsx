import React, {ReactNode} from "react";
import path from "path";

/** Flowbite의 https://flowbite.com/docs/components/breadcrumb/#breadcrumb-with-dropdown를 사용하려고 했으나
 * SSR을 지원하지 않아 Preline의 브레드를 수정하여 사용함
 *  */
export function BreadcrumbCase({children}: { children: ReactNode }) {
    return (
        <ol className="m-0 flex items-center whitespace-nowrap">
            {children}
        </ol>
    )
}

export function BreadcrumbPrevious({str, href}: { str: string, href?: string }) {
    return <li className="inline-flex items-center py-1.5 px-2">
        <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
           href={href || '#'}>
            {str}
        </a>
        <svg className="shrink-0 ms-2 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24"
             height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    </li>
}


export function BreadcrumbEntries({children}: { children?: React.ReactNode }) {
    return (
        <li className="inline-flex items-center text-sm">
            <div className="hs-dropdown [--placement:down-left] relative inline-flex">
                <button id="hs-breadcrumb-dropdown" type="button"
                        className="hs-dropdown-toggle py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"
                        disabled={!children}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                    Docs
                </button>
                {children || <div></div>}
            </div>
            <svg className="shrink-0 ms-2 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24"
                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </li>
    )
}

export function BreadcrumbLowerEntries({entries, baseUrl}: { entries: string[], baseUrl?: string[] }) {
    return (
        <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 bg-white shadow-md rounded-lg p-1 space-y-0.5 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
            role="menu" aria-orientation="vertical" aria-labelledby="hs-breadcrumb-dropdown">
            {
                entries.map((item, index) => {
                    const uri = item.split('/').map(encodeURI).join('/');
                    const href = baseUrl ? path.join(...baseUrl, uri) : '#';

                    return (
                        <a key={`BLE:${item}:${index}`}
                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                           href={href}>
                            {item}
                        </a>
                    )
                })
            }
        </div>
    )
}

export function BreadcrumbNow({str}: { str: string }) {
    return (
        <li className="inline-flex items-center py-1.5 px-2 text-sm font-semibold text-gray-800 truncate"
            aria-current="page">
            {str}
        </li>
    )
}