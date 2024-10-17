import React from "react";

export default function Main({children}: { children: React.ReactNode }) {
    return (
        <main id="content">
            <div className="w-full mx-auto pt-5 px-0 sm:px-6 lg:px-8">
                <div className="min-h-screen bg-white xl:border-x border-x-gray-200 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </main>
    )
}