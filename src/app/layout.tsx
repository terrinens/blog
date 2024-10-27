import "./globals.css";

import PrelineScript from "@/app/components/PrelineScript";
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
        <PrelineScript/>
        </body>
        </html>
    );
}

