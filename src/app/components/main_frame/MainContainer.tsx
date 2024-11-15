import Tooltip from "@_components/main_frame/Tooltip";
import React from "react";

export default function MainContainer({children}: { children: React.ReactNode }) {
    return (
        <div className={'container max-w-screen-xl mx-auto gap-0 mb-9 my-10'}>
            {children}
        </div>
    )
}

type MainContainerProps = {
    title: string;
    children: React.ReactNode;
    option?: {
        id: string;
        tooltipText: string | React.ReactNode;
    };
    href?: string;
}

export function MainContainerGrid({title, children, option, href}: MainContainerProps) {
    return (
        <div className={'grid-cols-2'}>
            <div className={'prose flex flex-row items-center mb-5'}>
                <h2 className={'m-0 mr-2'}>{title}</h2>
                {option?.tooltipText ? (
                    <Tooltip id={option.id} description={option.tooltipText} href={href}/>) : null}
            </div>
            {children}
        </div>
    );
}