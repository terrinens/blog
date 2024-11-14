'use client'

import React from "react";

function calculationPageNumbers(nowPage: number, totalPageCount: number) {
    const buttonMaxSize = 3;
    const halfSize = Math.floor(buttonMaxSize / 2);

    if (totalPageCount <= buttonMaxSize) {
        return Array.from({length: totalPageCount}, (_, i) => i + 1);
    }

    let startPage = Math.max(1, nowPage - halfSize);
    let endPage = Math.min(totalPageCount, nowPage + halfSize);

    if (endPage - startPage + 1 < buttonMaxSize) {
        if (startPage === 1) {
            endPage = Math.min(startPage + buttonMaxSize - 1, totalPageCount);
        } else if (endPage === totalPageCount) {
            startPage = Math.max(endPage - buttonMaxSize + 1, 1);
        }
    }

    return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
}


type ButtonProps = {
    pageNumber: number;
    currentPage?: boolean;
    onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

const PageButton = ({pageNumber, currentPage, onClickEvent}: ButtonProps) => {
    return (
        <button type="button"
                onClick={onClickEvent}
                className={`${currentPage ? 'bg-gray-200' : ''} min-h-[38px] min-w-[38px] flex justify-center items-center  text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`}
                aria-current="page">{pageNumber}
        </button>
    )
}

const TooltipButton = ({pageNumber, next, onClickEvent}: { next?: boolean } & ButtonProps) => {
    return (
        <div className="hs-tooltip inline-block">
            <button type="button"
                    onClick={onClickEvent}
                    className="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:bg-white/10">
                <span className="group-hover:hidden text-xs">•••</span>
                {next
                    ? <svg className="group-hover:block hidden shrink-0 size-5" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 17 5-5-5-5"></path>
                        <path d="m13 17 5-5-5-5"></path>
                    </svg>
                    : <svg className="group-hover:block hidden shrink-0 size-5" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 7-5 5 5 5"></path>
                        <path d="m11 7-5 5 5 5"></path>
                    </svg>
                }

                <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip">
          {next ? 'Next' : 'Previous'} {pageNumber} pages
        </span>
            </button>
        </div>
    )
}

export default function Pagination({nowPageNumber = 1, totalPage, onPageChange}: {
    nowPageNumber?: number,
    totalPage: number,
    onPageChange?: (page: number) => void
}) {
    const [currentPage, setCurrentPage] = React.useState(nowPageNumber);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange ? onPageChange(page) : null;
    }

    const genNumbers = calculationPageNumbers(currentPage, totalPage);
    const previousPage = genNumbers[0] - 1;
    const nextPage = genNumbers[genNumbers.length - 1] + 1;

    const buttonProps = (pageNumber: number, currentPage?: boolean): ButtonProps => ({
        onClickEvent: () => handlePageChange(pageNumber),
        pageNumber: pageNumber,
        currentPage: currentPage
    })

    return (
        <nav className="flex items-center gap-x-1" aria-label="Pagination">
            <button type="button"
                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                    aria-label="Previous">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span className="sr-only">Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                {1 === currentPage - 2 && <PageButton {...buttonProps(1)}/>}
                {1 < previousPage &&
                    (<>
                        <PageButton {...buttonProps(previousPage - 1)}/>
                        <TooltipButton {...buttonProps(previousPage)}/>
                    </>)
                }

                {genNumbers.map(num => <PageButton
                    key={`page:button:${num}`}{...buttonProps(num, num == currentPage)}/>)}

                {totalPage > nextPage - 1 &&
                    (<>
                        {totalPage > nextPage &&
                            <TooltipButton {...buttonProps(nextPage)} next={true}/>}
                        {totalPage === nextPage &&
                            <PageButton {...buttonProps(totalPage)}/>}
                        {totalPage > nextPage &&
                            <PageButton {...buttonProps(totalPage)}/>}
                    </>)
                }
            </div>
            <button type="button"
                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                    aria-label="Next">
                <span className="sr-only">Next</span>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    );
}