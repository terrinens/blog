import {Section} from "@/app/about-me/AboutComponent";
import OpenSourceIcon from "@/app/about-me/icons/cloud-backup-svgrepo-com.svg";
import {SimpleRepoCard} from "@_components/mdx/GitRepositoryCard";
import BoxIcon from "@/app/about-me/icons/multiple-defenses.svg";
import React from "react";
import {findAllAndSplitOfType} from "@/app/lib/db/ServerProjDB";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";
import {getInfos, PersonalInfo} from "@/app/about-me/ResumeForm";
import {MDXImage} from "@_components/mdx/MDXImage";
import Logo from "@_public/svg/logo.svg"
import Image from "next/image";
import Link from "next/link";
import path from "path";
import {DefaultFileSVG} from "@_components/post/proj/TreeView";

const Card = ({thumbnail, name, description, id}: {
    thumbnail: string,
    name: string,
    description: string,
    id: string
}) => {

    const Block = ({children}: { children: React.ReactNode }) => (
        id ? <Link href={path.join('/projects/view', id)}>{children}</Link> : <>{children}</>
    );

    return (<Block>
        <div
            className="flex flex-col max-h-[300px] flex-grow justify-center space-y-2 max-w-lg">
            <div className="row-span-2 flex justify-center">
                {thumbnail.length > 0
                    ? <MDXImage src={thumbnail} className="object-cover w-32 h-32"/>
                    : <Image src={Logo} alt={''} className="object-cover w-32 h-32"/>}
            </div>
            <div className={'flex flex-col'}>
                <span className="text-center justify-center items-center text-xl flex flex-row space-x-1">
                    <span>{name}</span>
                    {id && (<DefaultFileSVG/>)}
                </span>
                <span className="flex justify-center text-center items-center">{description}</span>
            </div>
        </div>
    </Block>);
}

export default async function PortfolioForm() {
    const repInfos = await getInfos();

    const projData = await findAllAndSplitOfType();
    const teamProps = projData.team.map(data => generationPostCardProps(data.id, data.data));
    teamProps.push(
        {id: '', info: {name: '뷰티플 브라이드', description: 'Open AI Source HR Viton을 활용한 가상 옷 시착 프로젝트', thumbnail: '121654fjvnkjdfbgjksakldnlfk', date: '', tags: []}},
        {id: '', info: {name: '메로나', description: '초기 투자자를 위한 가이드 및 주식, 코인 커뮤니티 사이트', thumbnail: '25sdf44df542564435645xcv4wro2jfckhjasdf', date: '', tags: []}},
    );

    const personalProps = projData.personal.map(data => generationPostCardProps(data.id, data.data));
    personalProps.push(
        {id: '', info: {name: 'UEC', description: '업로드 컨트롤, 자동실행, 자동백업', thumbnail: '', date: '', tags: []}},
    );

    return (
        <div>
            <h1 className={'text-center'}>포트폴리오</h1>
            <h2>끈기있게 도전하는 개발자, 김동철 입니다.</h2>

            <PersonalInfo/>

            <Section description={'오픈 소스에 기여한 목록입니다. 클릭시 해당 소스로 이동이 가능합니다.'}
                     title={'오픈 소스 기여 목록'} src={OpenSourceIcon}>
                <div className={'not-prose flex flex-wrap'}>{repInfos.map((info, index) => (
                    <SimpleRepoCard key={`${index}:${info.name}`} {...info}/>
                ))}</div>
            </Section>

            <Section
                description={'교육기관 혹은 모집하여 결성된 팀으로 진행한 프로젝트입니다. 더 자세한 문서가 있을시, 문서 아이콘으로 나타내고 있습니다. 클릭시 해당 페이지로 이동 할 수 있습니다.'}
                title={'팀 프로젝트 진행 이력'} src={BoxIcon}>
                <div
                    className="grid grid-cols-2 gap-4">
                    {teamProps.map((props, index) => (<div key={`card:${props.id}:${index}`} className={'not-prose w-[272px] border rounded-xl'}>
                        <Card key={`${props.id}:${index}`} id={props.id}  {...props.info} />
                    </div>))}
                </div>
            </Section>

            <Section description={'개인이 진행한 프로젝트입니다. 더 자세한 문서가 있을시, 문서 아이콘으로 나타내고 있습니다. 클릭시 해당 페이지로 이동 할 수 있습니다.'}
                     title={'개인 프로젝트 진행 이력'} src={BoxIcon}>
                <div
                    className="grid grid-cols-2">
                    {personalProps.map((props, index) => (<div key={`card:${props.id}:${index}`} className={'not-prose w-[272px] border rounded-xl'}>
                        <Card key={`${props.id}:${index}`} id={props.id} {...props.info} />
                    </div>))}
                </div>
            </Section>

            {/*<Section title={'SAW Project'}>
             <LowSection title={'목적'}>
             SAW(Sleep As Well)은 스터디팀 디비자바의 다양한 활동 기록을 남기기 위한 팀 블로그입니다.
             스터디, 대면회의 등등 여러 정보를 담는 블로그입니다.
             </LowSection>
             <LowSection title={'사용 기술'}>

             </LowSection>
             </Section>*/}
        </div>
    )
}