import "./globals.css"
import React from "react";
import ScriptsLoad from "./component/ScriptsLoad";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body>
        {children}
        <ScriptsLoad/>
        </body>
        </html>
    )
}
