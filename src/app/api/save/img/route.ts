import {NextResponse} from "next/server";
import {saveImage} from "../../../lib/MDXSave";

export async function POST(request: Request) {
    const formData = await request.formData();

    const file = formData.get('file') as File;
    const postType = formData.get('postType') as string;

    const filePath = await saveImage({postType, content: file});

    return NextResponse.json({filePath: filePath});
}