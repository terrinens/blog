import fs from 'fs'
import path from "path";
import {randomUUID} from "crypto";

export type SaveProps = {
    postType: string,
    fileName?: string,
    isApi?: boolean,
    content: string | File,
}

const basePostPath = 'src/data/post'
const baseImagePath = 'src/data/image'

export function saveMDX({postType, isApi, fileName, content}: SaveProps) {
    fileName = fileName ? fileName : crypto.randomUUID();
    const savePath = path.join(basePostPath, postType)
    let saveName = path.join(savePath, fileName + '.mdx')
    const typeSplit = postType.split('/')

    const saveFile = () => fs.writeFileSync(saveName, content as string, 'utf-8')

    if (typeSplit[0] == 'main') {
        fs.openSync(saveName, 'wx');
        saveFile();
    } else if (typeSplit[0] == 'proj') {
        if (isApi) {
            const targetProj = postType.split('/').slice(0, 2).join('/');
            if (fs.existsSync(path.join(basePostPath, targetProj))) {
                const projPath = path.join(basePostPath, postType.split('/').slice(0, 3).join('/'))
                saveName = path.join(projPath, 'docs', fileName + '.mdx');

                const deep = fileName.split('/').slice(0, -1).join('/');
                const apiPath = path.join(projPath, 'docs', deep);
                if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath);

                saveFile();
            } else {
                return false;
            }
        } else {
            saveName = path.join(savePath, 'info.mdx');
            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath);
                fs.mkdirSync(path.join(savePath, 'docs'));
            }
            saveFile();
        }
    }

    return true;
}

export async function saveImage({postType, content}: SaveProps) {
    const image = content as File;

    const extension = path.extname(image.name);

    const savePath = path.join(baseImagePath, postType)
    const fileName = randomUUID() + extension
    const saveName = path.join(savePath, fileName);

    const fileBuffer = await image.arrayBuffer();
    fs.writeFileSync(saveName, Buffer.from(fileBuffer));

    return `../../data/image/${postType}/${fileName}`;
}

