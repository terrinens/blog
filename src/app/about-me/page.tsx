import {aboutLock} from "@/app/lib/Config";
import NotFound from "@/app/not-found";
import React from "react";
import PortfolioForm from "@/app/about-me/PortfolioForm";
import ResumeForm from "@/app/about-me/ResumeForm";
import {DocsSidebar, DocsSidebarProps} from "@_components/common/Sidebar";

export default async function Page() {
    if (aboutLock) return <NotFound message={'포스터를 찾지 못했습니다.'}/>;
    const docs: DocsSidebarProps[] = [
        {name: '이력서', children: <ResumeForm/>},
        {name: '포트폴리오', children: <PortfolioForm/>}
    ];
    return (
        <DocsSidebar docs={docs}/>
    );
}
