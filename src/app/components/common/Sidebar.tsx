import Link from "next/link";
import Logo from "@_public/svg/logo.svg"
import Image from "next/image";
import React from "react";

type ElementLiType = {
    content: string;
    href?: string;
    src?: string;
}

export function DocsSidebarLi({content, href, src}: ElementLiType) {
    return (
        <li>
            <Link href={href ? `#${href}` : '#'}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Image src={src ?? Logo} alt="" width={40} height={40}/>
                <span className="ms-3">{content}</span>
            </Link>
        </li>
    )
}

type DocsSidebarProps = {
    title: string;
    children: React.ReactNode;
}

export function DocsSidebar() {
    const x: DocsSidebarProps = {title: '', children: (<div/>)}
    return (<>
        <div className="text-center not-prose">
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation"
                data-drawer-backdrop="false"
                aria-controls="drawer-navigation">
                Show navigation
                {x.children}
            </button>
        </div>

        <div id="drawer-navigation"
             className="not-prose fixed top-0 left-0 z-50 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white"
             aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label"
                className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
            <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <DocsSidebarLi content={'haha'}/>
                </ul>
            </div>
        </div>
    </>)
}

export default function Sidebar() {
    return <DocsSidebar></DocsSidebar>
}