// @ts-nocheck
export default async function Page() {
    return (
        <div>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div
                                className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">

                                {/* 검색 */}
                                <div className="sm:col-span-1">
                                    <label for="hs-as-table-product-review-search" className="sr-only">Search</label>
                                    <div className="relative">
                                        <input type="text" id="hs-as-table-product-review-search"
                                               name="hs-as-table-product-review-search"
                                               className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                               placeholder="Search"/>
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                            <svg className="shrink-0 size-4 text-gray-400"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="m21 21-4.3-4.3"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                      Tag
                    </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                      Title
                    </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Description
                    </span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-start">
                                        <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                      Date
                    </span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                <tr className="bg-white hover:bg-gray-50">
                                    <td className="size-px whitespace-nowrap align-top">
                                        <a className="block p-6" href="#">
                                            <div className="flex items-center gap-x-4">
                                                <img className="shrink-0 size-[38px] rounded-lg"
                                                     src="https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80"
                                                     alt="Product Image"/>
                                                <div>
                                                    <span className="block text-sm font-semibold text-gray-800">Brown Hat</span>
                                                </div>
                                            </div>
                                        </a>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                        <a className="block p-6" href="#">
                                            <div className="flex items-center gap-x-3">
                                                <img className="inline-block size-[38px] rounded-full"
                                                     src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                                     alt="Product Image"/>
                                                <div className="grow">
                                                    <span className="block text-sm font-semibold text-gray-800">Christina Bersh</span>
                                                    <span
                                                        className="block text-sm text-gray-500">christina@site.com</span>
                                                </div>
                                            </div>
                                        </a>
                                    </td>
                                    <td className="h-px w-72 min-w-72 align-top">
                                        <a className="block p-6" href="#">
                                            <div className="flex gap-x-1 mb-2">
                                                <svg className="shrink-0 size-3 text-gray-800"
                                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <svg className="shrink-0 size-3 text-gray-800"
                                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <svg className="shrink-0 size-3 text-gray-800"
                                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <svg className="shrink-0 size-3 text-gray-800"
                                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <svg className="shrink-0 size-3 text-gray-800"
                                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="block text-sm font-semibold text-gray-800">I just love it!</span>
                                            <span className="block text-sm text-gray-500">I bought this hat for my boyfriend, but then i found out he cheated on me so I kept it and I love it!! I wear it all the time and there is no problem with the fit even though its a mens" hat.</span>
                                        </a>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                        <a className="block p-6" href="#">
                                            <span className="text-sm text-gray-600">10 Jan 2022</span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}