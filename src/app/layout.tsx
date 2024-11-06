import "./globals.css";

import ScriptsLoad from "@_components/ScriptsLoad";
import Header from "@/app/components/frame/Header";
import Main from "@/app/components/frame/Main";
import Footer from "@/app/components/frame/Footer";
import {ReactNode} from "react";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="ko">
        <body>
        <Header/>
        <Main>
            {children}
        </Main>
        <Footer/>
        <ScriptsLoad/>
        </body>
        </html>
    );
}

