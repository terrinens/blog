import {aboutLock} from "@/app/lib/Config";
import NotFound from "@/app/not-found";
import React from "react";
import PortfolioForm from "@/app/about-me/PortfolioForm";
import ResumeForm from "@/app/about-me/ResumeForm";

export default async function Page() {
    if (aboutLock) return <NotFound message={'포스터를 찾지 못했습니다.'}/>;
    return (<div className={'flex justify-start w-full prose flex-col'}>
        <ResumeForm/>
        <PortfolioForm/>
    </div>);
}
