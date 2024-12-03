'use client'

import {DefaultFileSVG} from "@_components/post/proj/TreeView";
import React, {useEffect, useRef, useState} from "react";

export type DocsSidebarProps = {
    name: string;
    children: React.ReactNode;
}

const DocsSidebarLi = ({id, onClick}: { id: string, onClick: React.MouseEventHandler<HTMLLIElement> }) => {
    return (<li onClick={onClick}>
        <a href={`#${id}`}
           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <DefaultFileSVG/>
            <span className="ms-3">{id}</span>
        </a>
    </li>)
}

export function DocsSidebar({docs}: { docs: DocsSidebarProps[] }) {
    const [content, setContent] = useState<React.ReactNode>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (window.innerWidth >= 768) setIsOpen(true);
        else (setIsOpen(false));
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hashId = window.location.hash.replace('#', '');
            const decodeHashId = decodeURIComponent(hashId);
            const doc = docs.find(d => d.name === decodeHashId);

            if (doc) setContent(doc.children);
            else setContent(docs[0].children);
        }

        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [docs]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [content]);

    const handleChangeDoc = (doc: React.ReactNode) => setContent(doc);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarWidth = '192px';

    return (
        <div ref={contentRef} className={'flex'}>{docs.length > 1 && (<>
            <div className={`fixed top-6 xl:ml-2 right-16 md:right-20 md:ml-2 sm:top-24 sm:left-0 md:top-24 md:left-0 h-12 z-50 text-center ${isOpen ? 'hidden' : 'block'}`}>
                <button
                    onClick={toggleSidebar}
                    className={`flex flex-col justify-center items-center border hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2`}
                    type="button" data-drawer-backdrop="false" data-drawer-target="default-sidebar" data-drawer-show="default-sidebar" aria-controls="default-sidebar"
                    data-drawer-body-scrolling="true">
                    <DefaultFileSVG/>
                    <span>docs</span>
                </button>
            </div>

            <div id="default-sidebar" className={`fixed top-16 md:top-20 z-40 h-screen overflow-y-auto left-0 transition-transform bg-white dark:bg-gray-800`}
                 style={{width: isOpen ? sidebarWidth : '0'}}
                 aria-labelledby="drawer-backdrop-label">

                <div className="h-full px-3 py-4 overflow-y-auto border-r dark:bg-gray-800">
                    <button onClick={toggleSidebar} type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <ul className="space-y-2 font-medium mt-5">
                        {docs.map(data => (
                            <DocsSidebarLi key={data.name} id={data.name} onClick={() => handleChangeDoc(data.children)}/>
                        ))}
                    </ul>
                </div>
            </div>
        </>)}

            <div className={`flex-grow p-0 transition-all duration-300`}
                 style={{marginLeft: isOpen ? sidebarWidth : '0', width: isOpen ? `calc(100% - ${sidebarWidth})` : '100%'}}>
                {content}
            </div>
        </div>
    )
}
