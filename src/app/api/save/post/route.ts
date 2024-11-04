import {NextResponse} from "next/server";
import {saveMDX} from "../../../lib/MDXSave";

export async function POST(request: Request) {
    const {postType, isApi, content, fileName} = await request.json();
    const success = saveMDX({postType, isApi, fileName, content})
    return success ? NextResponse.json({message: 'saved'})
        : NextResponse.json({message: 'failed'}, {status: 400});
}