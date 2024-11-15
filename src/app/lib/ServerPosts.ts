import fs from 'fs';
import * as pfs from 'fs/promises'
import path from 'path';
import {compileMDX} from "next-mdx-remote/rsc";
import {PostsDir} from "@/app/lib/Config";
import {userMDXComponents} from "@_components/MDXComponents";
import React from "react";
import {generationPostCardProps} from "@/app/lib/ClientPost";

/** 기본 Post 저장 위치에서 deep 수준에 따라 MDX 파일을 찾습니다.
 * @param deep 기본 포스터 위치에서 하위 디렉토리 수준 */
export async function getPostSlugs(...deep: (string)[]) {
    const readDir = deep.length > 0 ? path.join(PostsDir, ...deep) : PostsDir;
    try {
        const files = await pfs.readdir(decodeURIComponent(readDir), {encoding: 'utf-8'})
        return files.filter(file => file.endsWith('.mdx'));
    } catch (err) {
        throw err
    }
}

/** 기본 Post 저장 위치에서 deep 수준에 따라서 디렉토리를 찾습니다.
 * @param deep 기본 포스터 위치에서 하위 디렉토리 수준 */
export async function getDirList(...deep: (string)[]) {
    const readDir = path.join(PostsDir, ...deep)

    try {
        return fs.readdirSync(readDir).filter(item => {
            const itemPath = path.join(readDir, item);
            return fs.statSync(itemPath).isDirectory()
        });
    } catch (ignoredError) {
        ignoredError = '';
        console.log(`no such dir but ignoring : such dir ? ${deep} ${ignoredError}`);
        return Promise.resolve([]);
    }
}

export type PostListProps = {
    filename: string,
    frontmatter: Record<string, unknown>
}

/**
 * 경로로부터 MDX 파일을 가져오며, source, compiled, frontmatter 결과를 반환합니다. 기본 포스터 경로를 책임지지 않습니다.
 * @return {source, compiled, frontmatter}
 * */
export async function getCompileMDX(...readPath: string[]): Promise<{
    content: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    frontmatter: Record<string, unknown>
}> {
    const join = path.join(...readPath);
    const source = fs.readFileSync(join, 'utf8');
    const compiled = await compileMDX({
        source: source,
        options: {parseFrontmatter: true},
        components: userMDXComponents()
    })
    const content = compiled.content;
    const frontmatter = compiled.frontmatter;
    return {content, frontmatter}
}

/** 기본 Post 저장 위치에서 deep 수준에 따라 MDX 문서들을 가져오고, 이를 {@link PostListProps} 데이터로 가공하여 반환합니다.
 * @param deep 기본 포스터 위치에서 하위 디렉토리 수준
 * @return {Promise<PostListProps[]>}
 * @see {@link PostListProps}*/
export async function getPostListData(...deep: (string)[]): Promise<PostListProps[]> {
    const readDir = deep ? path.join(PostsDir, ...deep) : PostsDir
    const mdList = await getPostSlugs(...deep);

    if (mdList.length <= 0) return [];

    const result: PostListProps[] = [];

    for (const slug of mdList) {
        try {
            const {frontmatter} = await getCompileMDX(readDir, slug);
            result.push({filename: slug, frontmatter: frontmatter})
        } catch (error) {
            console.log('not read a file but pass');
            console.log(error);
        }
    }

    return result;
}

/** 주어진 경로들의 디렉토리를 탐색하여 모든 MDX 파일에서 사용된 태그의 사용수를 계산합니다.
 @param dirs 탐색할 디렉토리들 */
export async function countUsedTags(dirs: string[]) {
    const allSlugs: string[] = [];

    for (const dir of dirs) {
        const slugs = await getPostSlugs(dir);
        for (const slug of slugs) {
            allSlugs.push(path.join(PostsDir, dir, slug));
        }
    }

    const data: { [tag: string]: number; } = {};

    for (const slug of allSlugs) {
        const {frontmatter} = await getCompileMDX(slug);

        const {info} = generationPostCardProps({postType: 'main'}, '', frontmatter);
        const tags = info.tags;

        if (tags == undefined || tags.length < 0) continue;

        for (let tag of tags) {
            tag = tag.toLowerCase();

            if (Object.hasOwn(data, tag)) {
                data[tag] += 1;
            } else {
                data[tag] = 1;
            }
        }
    }

    return data;
}

export interface DirectoryNode {
    name: string,
    type: "dir" | "file",
    children?: DirectoryNode[];
}

export function getDocsTreeNode(projPath: string): DirectoryNode {
    const dirPath = path.join(PostsDir, 'proj', projPath);

    const result: DirectoryNode = {
        name: path.basename(projPath),
        type: 'dir',
        children: []
    };

    const push = (add: DirectoryNode) => {
        if (!result.children) result.children = [];
        result.children.push(add)
    }

    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            const childNode = getDocsTreeNode(path.join(projPath, item));
            push(childNode)
        } else {
            push({name: item, type: 'file'});
        }
    });

    return result;
}

/** 디렉토리에 종속된 파일이 존재하는 경우에만 디렉토리를 반환하는 재귀적 함수입니다. */
export function getDirectoryNames(dirNode: DirectoryNode, currentPath: string = ''): string[] {
    const result: string[] = [];

    const newPath = path.join(currentPath, dirNode.name);

    if (dirNode.children?.find(node => node.type === 'file')) {
        result.push(newPath);
    } else if (dirNode.children) {
        for (const children of dirNode.children) {
            const deepResult = getDirectoryNames(children, newPath)
            if (deepResult) result.push(...deepResult);
        }
    }
    return result;
}