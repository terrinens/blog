import {getAllCodeBytes} from "@/app/lib/Github";

export default async function LanguageBlock() {
    const x = await getAllCodeBytes();

    return (
        <div>

        </div>
    )
}