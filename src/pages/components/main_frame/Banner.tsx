export default function Banner() {
    return (
        <div className={'w-full max-w-screen-xl'}>
            <div className="flex flex-col justify-center items-center w-full p-4">
                <span className="text-4xl font-semibold pb-5">Tech Blog</span>
                <p className={'text-gray-600 text-lg font-semibold'}>개발하면서 겪은 과정들을 기록하는 블로그입니다.</p>
            </div>
        </div>
    )
}
