import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), '/src/posts');

export async function getPostSlugs() {
    return await getPostSlugsDeep(null).then((x) => { return x });
}

export async function getPostSlugsDeep(deep: string | null) {
    const readDir = deep ? path.join(postsDir, deep) : postsDir
    return fs.readdirSync(readDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => file.replace(/.mdx$/, ''));
}


