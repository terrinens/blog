import {generateCompiledForMDX, getDirectoryNames} from "@/app/lib/post/ServerPosts";
import {rootPath} from "@/app/lib/Config";
import React from "react";
import path from "path";
import {BreadcrumbCase, BreadcrumbEntries, BreadcrumbLowerEntries, BreadcrumbNow, BreadcrumbPrevious} from "@/app/components/post/proj/Breadcrumb";
import {FileEntries, FileObject, LowerDirEntries, LowerFileEntries, RootTree, SubTree} from "@/app/components/post/proj/TreeView";
import {MainContainerGrid} from "@_components/main_frame/MainContainer";
import {DirectoryNode} from "@/app/lib/post/PostConfig";
import {ProjSchema} from "@/app/lib/db/Init";

type DocsBreadcrumbProps = {
    projName: string,
    now: string,
    dirs: string[],
    baseUrl: string[]
}

export function DocsBreadcrumb({projName, now, dirs}: DocsBreadcrumbProps) {
    return (
        <div
            className='mb-5 flex whitespace-nowrap border max-h-24 rounded-xl shadow-sm p-1 dark:bg-neutral-800 dark:border-neutral-700'>
            <BreadcrumbCase>
                <BreadcrumbPrevious str={'프로젝트'} href={path.join(rootPath, 'projects', 'list')}/>
                <BreadcrumbPrevious str={projName}/>
                <BreadcrumbEntries>
                    <BreadcrumbLowerEntries entries={dirs} baseUrl={[]}/>
                </BreadcrumbEntries>
                <BreadcrumbNow str={now}/>
            </BreadcrumbCase>
        </div>
    )
}

function DocsLowerTree({dirNods, baseURL}: { dirNods: DirectoryNode[], baseURL: string }) {
    const files: string[] = []
    const lowerTree = dirNods.map((node, index) => {
        if (node.type === 'dir') {
            const unique = `LDE:${index}:${node.name}`
            return (
                <LowerDirEntries dirname={node.name} ariaExpanded={true} id={unique} key={unique}>
                    {node.children ? <DocsLowerTree baseURL={baseURL} dirNods={node.children}/> : null}
                </LowerDirEntries>
            )
        } else {
            files.push(node.name);
        }
    })

    return <>
        {lowerTree}
        {files.length > 0
            ? <LowerFileEntries>
                {files.map((file, index) => (
                    <FileObject href={`${baseURL}#${file}`} filename={file} key={`${dirNods.keys()}:${file}:${index}`}/>
                ))}
            </LowerFileEntries>
            : null
        }
    </>
}

function DocsSubTree({dirNods, baseURL}: { dirNods: DirectoryNode[], baseURL: string }) {
    const files: string[] = [];
    const subTrees = dirNods.map((node, index) => {
        if (node.type === 'dir' && node.children) {
            return (
                <SubTree dirname={node.name} key={`subtree:${index}`}>
                    <DocsLowerTree baseURL={path.join(baseURL, node.name)} dirNods={node.children}
                                   key={`DLT-${node.name}-${index}`}/>
                </SubTree>
            )
        } else {
            files.push(node.name);
        }
    })

    return <>
        {subTrees}
        {files.length > 0
            ? (
                <FileEntries>
                    {files.map((file, index) =>
                        (<FileObject href={`${baseURL}#${file}`} filename={file} key={`${file}:${index}`}/>))}
                </FileEntries>
            )
            : null
        }
    </>
}

function DocsTreeView({dirNods}: { dirNods: DirectoryNode }) {
    const body = <>
        {
            dirNods.children?.map((node, index) => {
                const name = node.name;
                const dirs = [];
                const files = [];

                if (node.type === 'dir') {
                    const deepChildren = node.children;
                    const element =
                        <SubTree dirname={name} ariaExpanded={true} key={`R-subtree-${name}-${index}`}
                                 id={`subtree:-${index}`}>
                            {deepChildren
                                ? <DocsSubTree dirNods={deepChildren} baseURL={path.join(node.name)}
                                               key={`DST-${name}-${index}`}/>
                                : null
                            }
                        </SubTree>;

                    dirs.push(element);
                } else {
                    files.push(node.name)
                }

                return <div key={`body:${node.name}:${index}`}>
                    {dirs}
                    {files
                        ? <FileEntries>
                            {files.map((file, index) => (
                                <FileObject filename={file} key={`fileObject-${index}`}/>
                            ))}
                        </FileEntries>
                        : null
                    }
                </div>
            })
        }
    </>

    return (
        <div className='mb-5'>
            <RootTree dirname={dirNods.name} ariaExpanded={true}>
                {body}
            </RootTree>
            <FileObject filename={'info.mdx'}/>
        </div>
    )
}

export async function ProjectInfoRender({data, dirNods}: {data: ProjSchema, dirNods: DirectoryNode }) {
    const docsDirs = getDirectoryNames(dirNods).map(dir => dir.split(path.sep).join('/'));
    const projName = data.name;
    const {content} = await generateCompiledForMDX(data.content);

    return (
        <div className='prose w-full'>
            <DocsBreadcrumb projName={projName} dirs={docsDirs} now={'info'} baseUrl={['/projects/view']}/>
            <MainContainerGrid title={`${projName} Docs`} option={{
                id: `${projName}::treeview`,
                tooltipText: (
                    <>
                        <span className={'block'}>{`프로젝트 ${projName}를 나타내는 문서구조입니다.`}</span>
                        <span className={'block'}>문서의 상세 정보를 원하시면 문서객체를 클릭하여 페이지를 이동해 확인이 가능합니다.</span>
                    </>
                )
            }}>
                <DocsTreeView dirNods={dirNods}/>
            </MainContainerGrid>
            {content}
        </div>
    );
}