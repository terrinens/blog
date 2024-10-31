import fs from 'fs'
import path from "path";
import {randomUUID} from "crypto";

export type SaveProps = {
    postType: string,
    fileName?: string,
    content: string | File,
}

const basePostPath = 'src/data/post'
const baseImagePath = 'src/data/image'

export function saveMDX({postType, fileName, content}: SaveProps) {
    fileName = fileName ? fileName : crypto.randomUUID();
    const savePath = path.join(basePostPath, postType)
    const saveName = path.join(savePath, fileName + '.mdx')

    fs.openSync(saveName, 'wx');
    fs.writeFileSync(saveName, content as string, 'utf-8')
}

export async function saveImage({postType, content}: SaveProps) {
    const image = content as File;

    const extension = path.extname(image.name);

    const savePath = path.join(baseImagePath, postType)
    const fileName = randomUUID() + extension
    const saveName = path.join(savePath, fileName);

    const fileBuffer = await image.arrayBuffer();
    fs.writeFileSync(saveName, Buffer.from(fileBuffer));

    return `../../data/img/${postType}/${fileName}`;
}

