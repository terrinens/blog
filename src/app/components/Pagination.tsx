import {Paging} from "@/app/lib/Posts";
import path from "path";

const PaginationItem = ({page, baseUrl, nowPage = false}: { page: number, baseUrl: string, nowPage?: boolean }) => {
    let css = "px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100";
    if (nowPage) {
        css = css.replace('bg-white', 'bg-green-200');
    }

    return (
        <li>
            <a href={path.join(baseUrl, page.toString())}
               className={css}>
                {page}
            </a>
        </li>
    )
}

interface PaginationProps {
    thisPage: number
    paging: Paging;
    baseURL: string;
}

function extracted(nowPage: number, paging: Paging) {
    const buttonMaxSize = 7;
    const totalPageCount = paging.getTotalPage - 1;

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

export default function Pagination({thisPage, baseURL, paging}: PaginationProps) {
    const buttons = extracted(thisPage, paging);

    const preUrl = path.join(baseURL, String((thisPage - 1)))
    const nextUrl = path.join(baseURL, String((thisPage + 1)))

    let preCss = 'px-3 py-2 ml-0 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100';
    if (thisPage - 1 <= 0) preCss = 'pointer-events-none ' + preCss.replace('bg-white', 'bg-gray-400');

    let nextCss = 'px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100'
    if (thisPage + 1 >= paging.getTotalPage) nextCss = 'pointer-events-none ' + nextCss.replace('bg-white', 'bg-gray-400');

    return (
        <div className="flex justify-center mt-6">
            <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <a href={preUrl} className={preCss} aria-label="Previous">이전</a>
                    </li>
                    {
                        buttons.map(pNumber => (
                            pNumber == thisPage
                                ? <PaginationItem key={'page_number:' + pNumber} page={pNumber} baseUrl={baseURL}
                                                  nowPage={true}/>
                                : <PaginationItem key={'page_number:' + pNumber} page={pNumber} baseUrl={baseURL}/>
                        ))
                    }
                    <li>
                        <a href={nextUrl} className={nextCss}>다음</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}