import {NextResponse} from "next/server";
import {saveImage} from "../../../lib/MDXSave";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const source = url.searchParams.get("source");
    const filePath = path.join(process.env.PROJ_ROOT, 'data/image', type, source);

    const data = await fs.promises.readFile(filePath, {encoding: 'base64'});
    const imgSrc = `data:image/jpeg;base64,${data}`;
    return NextResponse.json({image: imgSrc});
}

export async function POST(request: Request) {
    const formData = await request.formData();

    const file = formData.get('file') as File;
    const postType = formData.get('postType') as string;

    const filePath = await saveImage({postType, content: file});

    return NextResponse.json({filePath: filePath});
}