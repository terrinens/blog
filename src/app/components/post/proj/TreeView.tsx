import React from "react";
import path from "path";
import Link from "next/link";

function DefaultFileSVG() {
    return (
        <svg className="shrink-0 size-4 text-gray-500"
             xmlns="http://www.w3.org/2000/svg" width="24"
             height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5"
             strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        </svg>
    )
}

function DirEntriesButton({dirname}: { dirname: string }) {
    return (
        <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
            <button
                className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                aria-expanded="false"
                aria-controls="hs-basic-usage-example-tree-collapse-one">
                <svg className="size-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                </svg>
            </button>
            <div
                className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 px-1.5 rounded-md cursor-pointer">
                <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path
                            d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                    </svg>
                    <div className="grow">
                        <span className="text-sm text-gray-800"> {dirname}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

/** 최상단에서 선언되어야 하는 함수입니다. 최상단에서 디렉토리를 선언하고, 하위 요소를 받습니다.
 * @param id
 * @param dirname 디렉토리 이름
 * @param children */
export function RootTree({id, dirname, children}: { id?: string, dirname: string, children?: React.ReactNode }) {
    return (
        <div className="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
            <div className="hs-accordion-group" role="group" data-hs-accordion-always-open="">
                <div className="hs-accordion active" role="treeitem" id={id} aria-expanded="true">
                    <DirEntriesButton dirname={dirname}/>
                    <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                         role="group">
                        {children || <div/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

/** 루트 하위에서 집합체를 사용하기 위한 함수입니다.
 * @param id
 * @param dirname 디렉토리 이름
 * @param children */
export function SubTree({id, dirname, children}: { id?: string, dirname: string, children: React.ReactNode }) {
    return (
        <div
            className="hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100"
            role="group">
            <div className="hs-accordion active" role="treeitem" aria-expanded="true" id={id}>
                <DirEntriesButton dirname={dirname}/>
                {children}
            </div>
        </div>
    )
}

/** {@link SubTree}에서 더 하위의 요소들을 선언하기 위한 함수입니다.
 * 동일한 {@link SubTree}에서 더 많은 트리를 선언하기 위해 반복적으로 사용될 수 있습니다.
 * @param toggle 하위 자식요소들이 서로 펼쳐진 형태를 유지하는지 제어하는 변수입니다.
 * false = 하나의 자식 요소만 펼쳐지고 다른 요소들은 접힘
 * @param children */
export function LowerTree({toggle, children}: { toggle?: boolean, children: React.ReactNode }) {
    const css = 'hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100';
    const accordionProps = toggle ? {} : {'data-hs-accordion-always-open': ''};

    return (
        <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group">
            <div className={css} role="group" {...accordionProps}>
                {children}
            </div>
        </div>
    );
}

/** {@link LowerTree} 이후 하위 디렉토리 요소를 선언하기 위한 함수입니다. 해당 함수로 이후 더 하위 요소를 선언할 수 있습니다.
 * @param id
 * @param dirname 디렉토리 이름 ||
 * 선언하지 않을 수도 있습니다. 하지만 선언하지 않을 경우 이후 하위 디렉토리 요소를 선언을 책임지지 않습니다.
 * 최하단의 구조에서 고려하십시오.
 * @param children */
export function LowerDirEntries({id, dirname, children}: {
    id?: string,
    dirname?: string,
    children?: React.ReactNode
}) {

    return (
        <div className="hs-accordion" role="treeitem" aria-expanded="false" id={id}>
            {dirname ? <DirEntriesButton dirname={dirname}/> : <div/>}
            <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                 role="group">
                <div
                    className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100">
                    {children || <div/>}
                </div>
            </div>
        </div>
    )
}

/** {@link LowerTree}의 종속적인 파일 집합체를 사용하기 위한 함수입니다. {@link LowerTree} 보다 하위 요소에서는 사용하지 마십시오. */
export function FileEntries({children}: { children: React.ReactNode }) {
    return (
        <div className="py-0.5 px-1.5" role="treeitem">
            {children}
        </div>
    )
}

/** {@link LowerDirEntries} 하위에서 파일의 집합체를 사용하기 위한 함수입니다. */
export function LowerFileEntries({children}: { children: React.ReactNode }) {
    return (
        <div
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            role="group"
            aria-labelledby="hs-basic-usage-example-tree-sub-level-two-heading-one">
            <div
                className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100">
                {children}
            </div>
        </div>
    )
}

/** 파일 오브젝트를 선언하기 위한 함수입니다.
 * @param filename 파일의 이름입니다.
 * @param baseUrl 이동할 위치
 * @param svg 만약 파일의 이미지를 변경하고 싶으면 사용하십시오. 선언하지 않을 경우 {@link DefaultFileSVG}가 사용됩니다. */
export function FileObject({filename, href, svg}: {
    filename: string,
    href?: string,
    svg?: React.ReactElement<React.SVGProps<SVGSVGElement>>
}) {
    const fileSVG = svg
        ? React.cloneElement(svg, {width: '24', height: '24'} as React.SVGProps<SVGSVGElement>)
        : <DefaultFileSVG/>;

    return (
        <div
            className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 px-2 rounded-md cursor-pointer"
            role="treeitem">
            <Link href={href || '#'}>
                <div className="flex items-center gap-x-3">
                    {fileSVG}
                    <div className="grow">
                    <span className="text-sm text-gray-800">
                        {filename}
                    </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

/** 간단한 파일 오브젝트를 선언하기 위한 함수입니다. 이미지를 사용하지 않습니다.
 * @param filename 파일의 이름입니다. */
export function SimpleFileObject({filename}: { filename: string }) {
    return (
        <div className="px-2">
            <span className="text-sm text-gray-800">
                {filename}
            </span>
        </div>
    )
}

export function Example() {
    return (
        <div className='mb-5'>
            <RootTree id={'level1:assets'} dirname={'assets'}>
                <SubTree id={'level2:css'} dirname={'css'}>
                    <LowerTree>
                        <LowerDirEntries id={'level3:main'} dirname={'main'}>
                            <LowerFileEntries>
                                <FileObject filename={'main.css'}/>
                                <FileObject filename={'docs.css'}/>
                                <SimpleFileObject filename={'README.txt'}/>
                            </LowerFileEntries>
                        </LowerDirEntries>

                        <LowerDirEntries id={'level3:deep1'} dirname={'deep example'}>
                            <LowerFileEntries>
                                <FileObject filename={'input.css'}/>
                            </LowerFileEntries>
                            <LowerDirEntries id={'level4:deep2'} dirname={'deep2 example'}>
                                <LowerFileEntries>
                                    <FileObject filename={'deep2 example.js'}/>
                                    <FileObject filename={'deep2 example2.ts'}/>
                                </LowerFileEntries>
                                <LowerDirEntries id={'level5:deep3'} dirname={'deep3 example'}>
                                    <LowerFileEntries>
                                        <FileObject filename={'deep3 example.java'}/>
                                        <FileObject filename={'deep3 example2.docker'}/>
                                    </LowerFileEntries>
                                </LowerDirEntries>
                            </LowerDirEntries>
                        </LowerDirEntries>

                        <FileEntries>
                            <SimpleFileObject filename={'.gitignore'}/>
                        </FileEntries>
                    </LowerTree>
                </SubTree>
            </RootTree>

            <RootTree id={'level1:more-root'} dirname={'More Root'}>
                <SubTree id={'level2:css-2'} dirname={'css'}>
                    <LowerTree>
                        <LowerDirEntries id={'level3:main2'} dirname={'main'}>
                            <LowerFileEntries>
                                <FileObject filename={'main.css'}/>
                                <FileObject filename={'docs.css'}/>
                                <SimpleFileObject filename={'README.txt'}/>
                            </LowerFileEntries>
                        </LowerDirEntries>
                    </LowerTree>
                </SubTree>
                <SubTree id={'level2:more-sub2'} dirname={'More Sub'}>
                    <LowerTree>
                        <LowerDirEntries id={'level3:main3'} dirname={'main'}>
                            <LowerFileEntries>
                                <FileObject filename={'main.css'}/>
                                <FileObject filename={'docs.css'}/>
                                <SimpleFileObject filename={'README.txt'}/>
                            </LowerFileEntries>
                        </LowerDirEntries>
                    </LowerTree>
                </SubTree>
            </RootTree>
        </div>
    )
}