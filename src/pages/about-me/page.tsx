import {aboutLock} from "@/pages/lib/Config";
import CustomNotFound from "@/pages/404";
import React from "react";
import PortfolioForm from "@/pages/about-me/PortfolioForm";
import ResumeForm from "@/pages/about-me/ResumeForm";
import {DocsSidebar, DocsSidebarProps} from "@_components/common/Sidebar";

export default async function Page() {
    if (aboutLock) return <CustomNotFound message={'포스터를 찾지 못했습니다.'}/>;
    const docs: DocsSidebarProps[] = [
        {name: '이력서', children: <ResumeForm/>},
        {name: '포트폴리오', children: <PortfolioForm/>}
    ];
    return (
        <DocsSidebar docs={docs}/>
    );
}
