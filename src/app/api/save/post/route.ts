import {NextResponse} from "next/server";
import {saveMDX} from "../../../lib/MDXSave";

export async function POST(request: Request) {
    const {postType, content, fileName} = await request.json();
    saveMDX({postType, content, fileName})
    return NextResponse.json({message: 'saved'});
}