import React from "react";

export default function Main({children,}: { children: React.ReactNode }) {
    return (
        <main id="content">
            <div className="w-full max-w-2xl mx-auto pt-5 px-0 sm:px-6 lg:px-8">
                <div className="min-h-screen bg-white xl:border-x border-x-gray-200">
                    {children}
                </div>
            </div>
        </main>
    )
}