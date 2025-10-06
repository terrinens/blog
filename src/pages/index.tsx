import {Metadata} from "next";
import React from "react";
import Banner from "@_components/main_frame/Banner";
import MainPageRender from "@/pages/mainPageRender";

const Home: React.FC = () => {
    return (
        <>
            <Banner/>
            <MainPageRender/>
        </>
    )
}

export const metadata: Metadata = {
    title: 'terrinens 기술 블로그',
    description: 'Github Pages에서 라우팅하는 기술 블로그입니다.',
}

export default Home;