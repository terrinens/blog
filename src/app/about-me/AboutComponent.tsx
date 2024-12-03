import React from "react";
import Image from "next/image";
import Tooltip from "@_components/main_frame/Tooltip";

type SectionProps = { title: string, src?: string, children: React.ReactNode }

export const Section = ({title, src, children, ...option}: SectionProps & { description?: string }) => {
    return (
        <div key={`${title}`}>
            <h2 className={'mt-0 flex flex-row items-center'}>
                {src && (<Image className={'m-0 p-0 mr-2'} src={src} alt={''} width={50} height={50}/>)}
                <span className={'text-center'}>{title}</span>
                {option.description && (<Tooltip id={title} description={option.description}/>)}
            </h2>
            <div className={'xl:ml-2 lg:ml-2 md:ml-2 mb-7'}>
                {children}
            </div>
        </div>
    )
}
export const LowSection = ({title, src, children}: SectionProps) => {
    return (
        <div className={'m-0 mt-6'}>
            <h3 className={'mt-0 flex flex-row items-center'}>
                {src && <Image className={'m-0 p-0 mr-2'} src={src} alt={''} width={50} height={50}/>}
                <span className={'text-center'}>{title}</span>
            </h3>
            {children}
        </div>
    )
}
export const TechnologyList = ({list}: { list: { name: string, src?: string }[] }) => {
    const LiElement = (data: { name: string, src?: string; }) => (
        <li className="flex items-center justify-start m-0 mr-5 my-3">{data.src
            ? <Image src={data.src} alt={''} width={24} height={24} className={'rounded-full m-0'}/>
            : <svg className="text-blue-600 m-0"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>}
            <span className="text-gray-800 font-bold ml-1.5">{data.name}</span>
        </li>
    )

    return (
        <ul className="text-sm flex flex-wrap not-prose">
            {list.map((value, index) => <LiElement key={`${index}:${value.name}`} {...value}/>)}
        </ul>
    )
}

export const TechSection = ({data}: { data: Record<any, any> }) => {
    const jsonFilter = ([key, value]: [any, any]) => {
        if (key.length > 0 && typeof value === 'object' && Object.keys(value).length > 0) {
            return true;
        } else if (typeof value === 'string') {
            return value.length > 0;
        } else if (typeof value === 'object') {
            return Object.entries(value).some(jsonFilter);
        }
        return false;
    };

    return Object.entries(data).filter(jsonFilter).map(([key, value]) => {
        const list = Object.entries(value)
            .filter(jsonFilter)
            .map(([key, value]) => ({
                name: key,
                src: value as string ?? '',
            }));

        if (list.length === 0) return null;

        return (<LowSection key={`projUsed:${key}`} title={key}>
            <TechnologyList key={`prjUsedList:$${key}`} list={list}/>
        </LowSection>)
    })
}