import {rootPath} from "@/pages/lib/Config";
import {useRouter} from "next/router";

export default function CustomNotFound() {
    const router = useRouter();
    const {message} = router.query;
    const viewMessage = typeof message === "string" ? message : "해당 페이지를 찾을 수 없습니다.";

    return (
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">404</h1>
            <p className="mt-3 text-gray-600">이런, 문제가 발생했습니다.</p>
            <p className="text-gray-600">{viewMessage}</p>
            <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                   href={rootPath}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    메인 페이지로 돌아가기
                </a>
            </div>
        </div>
    )
}