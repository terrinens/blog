import React from "react";

export default function Main({children,}: { children: React.ReactNode }) {
    return (
        <main id="content">
            <div className="w-full max-w-2xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
                <div className="py-10 min-h-screen bg-white xl:border-x border-x-gray-200">
                    {children}
                </div>
            </div>
        </main>
    )
}