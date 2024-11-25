import fs from 'fs';
import path from 'path';
import {compileMDX} from "next-mdx-remote/rsc";
import {PostsDir} from "@/app/lib/Config";
import {DirectoryNode} from "@/app/lib/post/PostConfig";
import {userMDXComponents} from "@_components/mdx/MDXComponents";

export async function generateCompiledForMDX(content: string) {
    return await compileMDX({
        source: content,
        options: {parseFrontmatter: true},
        components: userMDXComponents()
    });
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

export function addNodeByPath(root: DirectoryNode, path: string, newNode: DirectoryNode): DirectoryNode {
    const parts = path.split('/').filter(Boolean);
    let currentNode: DirectoryNode = root;

    for (const part of parts) {
        let nextNode = currentNode
            .children?.find(child => child.name === part);

        if (!nextNode) {
            nextNode = {name: part, type: "dir", children: []};
            if (!currentNode.children) {
                currentNode.children = [];
            }
            currentNode.children.push(nextNode);
        }

        currentNode = nextNode;
    }

    const existingNode = currentNode.children?.find(child => child.name === newNode.name && child.type === newNode.type);
    if (!existingNode) {
        if (!currentNode.children) {
            currentNode.children = [];
        }
        currentNode.children.push(newNode);
    }

    return currentNode;
}