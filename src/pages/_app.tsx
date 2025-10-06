import "./styles/globals.css";
import {AppProps} from "next/app";
import ScriptsLoad from "@_components/ScriptsLoad";
import React from "react";
import {aboutLock, rootPath} from "@/pages/lib/Config";
import Image from "next/image";
import logo from "@/public/svg/logo.svg";
import name from "@/public/svg/Terrinens.log.svg";
import path from "path";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Header/>
            <main id="content">
                <div className="w-full mx-auto pt-5 px-0 sm:px-6 lg:px-8">
                    <div
                        className="min-h-screen bg-white xl:border-x border-x-gray-200 flex flex-col
                        items-center justify-start gap-y-10">
                        <Component {...pageProps} />
                    </div>
                </div>
            </main>
            <Footer/>
            <ScriptsLoad/>
        </>
    );
}

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-neutral-400">
                            © {year} terrinens@github
                        </p>
                    </div>

                    <ul className="flex flex-wrap items-center">
                        <li className="inline-block pe-4 text-xs">
                            <a className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
                               href={process.env.GITHUB}>GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

const Header = () => {
    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav
                className="mt-4 relative max-w-3xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto">
                <div className="px-4 md:px-0 flex justify-between items-center">
                    <div>
                        <a className="flex rounded-md text-xl font-semibold focus:outline-none focus:opacity-80 space-x-2"
                           href={rootPath} aria-label="Preline">
                            <Image src={logo} alt='logo' width={50} height={50} property={'true'}/>
                            <Image src={name} alt='name' width={150} height={50} property={'true'}/>
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button type="button"
                                className="hs-collapse-toggle flex justify-center items-center size-6 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                                id="hs-navbar-header-floating-collapse" aria-expanded="false"
                                aria-controls="hs-navbar-header-floating" aria-label="Toggle navigation"
                                data-hs-collapse="#hs-navbar-header-floating">
                            <svg className="hs-collapse-open:hidden shrink-0 size-3.5"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <line x1="3" x2="21" y1="6" y2="6"/>
                                <line x1="3" x2="21" y1="12" y2="12"/>
                                <line x1="3" x2="21" y1="18" y2="18"/>
                            </svg>
                            <svg className="hs-collapse-open:block hidden shrink-0 size-4"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="hs-navbar-header-floating"
                     className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
                     aria-labelledby="hs-navbar-header-floating-collapse">
                    <div
                        className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                        <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent font-medium text-gray-800 focus:outline-none"
                           href={path.join(rootPath, "/posts/list")}>포스트 목록</a>
                        <a className={`${aboutLock ? 'opacity-50 cursor-not-allowed' : ''} py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent font-medium text-gray-800 focus:outline-none`}
                           href={aboutLock ? undefined : path.join(rootPath, "/about-me")}>About Me</a>
                        <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent font-medium text-gray-800 focus:outline-none"
                           href='https://github.com/terrinens'>
                            <svg height="25" width="25" aria-hidden="true" viewBox="0 0 24 24" version="1.1"
                                 data-view-component="true"
                                 className="octicon octicon-mark-github v-align-middle color-fg-default">
                                <path
                                    d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};