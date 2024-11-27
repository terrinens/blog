import {LowSection, Section, TechSection} from "@/app/about-me/AboutComponent";
import FlexibleIcon from "@/app/about-me/icons/flexible-access.svg";
import {DateBlock, RecordCase} from "@_components/common/Timeline";
import Link from "next/link";
import GitMembers, {ForceGitMembers} from "@_components/mdx/GitMembers";
import React from "react";
import EmailIcon from "@/app/about-me/icons/mail-reception.svg";
import {DescriptionList} from "@_components/common/List";
import {getOpenSourceContributorLog, getTotalRepositories} from "@/app/lib/github/GithubCodeByte";
import APISolutionIcon from "@/app/about-me/icons/api-interface-svgrepo-com.svg";
import path from "path";
import fs from "fs";
import MachineIcon from "@/app/about-me/icons/machine-vision-svgrepo-com.svg";
import {callAPI} from "@/app/lib/github/GitConfig";

const DateListForm = ({date, title, href, description, summations, children}: {
    children: React.ReactNode,
    date: string, title: string, href: string, description: string, summations: string[];
}) => (<>
    <DateBlock date={date}/>
    <RecordCase title={title}>
        <span>{description}</span>
        <Link className={'block'} href={href}>
            URL : {href}
        </Link>
        <div className={'space-y-2'}>
            <span className={'text-lg font-bold'}>참여 멤버</span>
            {children}
        </div>
        <div>
            <span className={'text-lg font-bold'}>프로젝트 요약</span>
            <ul className={'mt-2 space-y-2'}>
                {summations.map((sum, index) => (<li key={index}>{sum}</li>))}
            </ul>
        </div>
    </RecordCase>
</>)

const readJson = (fileName: string): Record<any, any> => {
    const dirPath = path.resolve('src', 'app', 'about-me')
    return JSON.parse(fs.readFileSync(path.resolve(dirPath, fileName), 'utf8'));
}

export const ProjTechs = () => {
    const projTech: Record<any, any> = readJson('ProjTech.json');
    return (<Section title={'사용가능 기술'} src={APISolutionIcon}>
        <TechSection data={projTech}/>
    </Section>)
}

const StudyTechs = () => {
    const studyTech: Record<any, any> = readJson('StudyTech.json');
    return (<Section title={'학습중인 기술'} src={MachineIcon}>
        <TechSection data={studyTech}/>
    </Section>)
}

export const PersonalInfo = () => (
    <Section title={'연락처'} src={EmailIcon}>
        <DescriptionList data={[
            {title: 'Name', content: ['김동철']},
            {
                title: 'Phone',
                content: [unpack('0000 0001 0000 00 0010 0001 0011 0000 00 0000 0111 1000 0101')]
            },
            {title: 'Address', content: ['서울특별시 성북구 장위동']},
            {title: 'Email', content: ['terrinens@gmail.com']},
            {title: 'Blog', content: ['https://terrinens.github.io/blog']},
            {title: 'Github', content: ['https://github.com/terrinens']},
        ]}/>
    </Section>
)


export const getInfos = async () => {
    const openSourceLogs = await getOpenSourceContributorLog();
    const ignoreNode = ['PR_kwDOKSbpvc5aF532'];
    const setUrls = new Set<string>(
        openSourceLogs.filter(log => !ignoreNode.includes(log.node_id))
            .map(log => log.repository_url)
    );

    return await Promise.all(Array.from(setUrls).map(async url => {
        const info = await callAPI(url, {noToken: true})
        const href: string = info.html_url;
        const img: string = info.organization.avatar_url;
        const name: string = (info.full_name as string).split('/')[0];
        const description: string = info.description;

        return {href, img, name, description};
    }))
}


export const unpack = (pack: string) => {
    return pack.split(' ').map(bits => {
        if (bits === '00') return '-';
        return (parseInt(bits, 2)).toString();
    }).join('');
};


export default async function ResumeForm() {
    const {personal, team} = await getTotalRepositories();
    const repInfos = await getInfos();

    return (
        <div className={'border-b mb-10'}>
            <h1 className={'text-center'}>지원서</h1>
            <Section title={'끈기있게 도전하는 개발자, 김동철입니다.'} src={''}>
                <LowSection title={'요약'}>
                    <span className={'text-lg'}>로직 하나하나 끈기있게 개선점을 찾아내, 개선하고자 노력하는 신입 백엔드 개발자 김동철 입니다.</span>
                    <ul>
                        <li>새로운 기술을 배우고 적용하는데 많은 관심이 있으며, 백엔드 개발 분야에서 지속적으로 성장하고자 합니다.</li>
                        <li>문제를 분석하고 끈기있게 해결책을 찾아내 해결후, 이를 문서화하여 추후에 재발을 방지하고자 합니다.</li>
                        <li>{personal}개의 개인프로젝트, {team}개의 팀프로젝트, {repInfos.length}개의 오픈소스에 참여했습니다.</li>
                    </ul>

                </LowSection>

                <LowSection title={'자기소개'}>
                    안녕하세요. Java, Python을 사용하고 있는 신입 개발자입니다. SpringBoot, NextJS, Flask, Fastapi를 프로젝트에 적용하여, 사용해본 경험이있습니다.

                    <div>
                        <h3>끈기있는 해결</h3>
                        저의 강점중 하나는 끈기있게 시도하는 능력입니다. 개발을 진행시에는 수많은 문제들이 발생하는데, 이를 해결하기 위해 필요한것은 끈기라고 생각합니다.
                        이러한 끈기가 필요하다 생각하는 이유는 끈기가 있어야지만 해결방안에 대해서 찾을수 있기 때문입니다.
                        문제점을 해결하기 위해
                    </div>
                    <div>
                        <h3></h3>
                    </div>
                </LowSection>
            </Section>

            <PersonalInfo/>

            <Section title={'프로젝트'} src={FlexibleIcon}>
                <DateListForm
                    date={'2023.07.20 - 진행중'}
                    title={'팀 SAW 스터디 블로그'}
                    href={'http://59.8.166.205:3001/'}
                    description={'스터디 팀 SAW의 스터디기록을 담는 블로그 프로젝트입니다.'}
                    summations={[
                        'SprintBoot Restfull 백엔드 서버',
                        'JPA 및 MySql DB 설계',
                        'JWT 인증 및 Spring AOP를 활용한 인증로직 처리'
                    ]}>
                    <GitMembers orgName={'SleepAswell'} token={process.env.GIT_SAW_TOKEN as string}/>
                </DateListForm>
                <DateListForm
                    date={'2023.12.10 - 2024.1.1'} title={'뷰티플 브라이드'}
                    href={'https://github.com/orgs/BeatifulBride/repositories'}
                    description={'Open AI Source :: HR Viton을 활용한 가상 옷 시착 프로젝트입니다.'}
                    summations={['Open AI Source :: HR Viton의 코드기반 생성형 AI 트레이닝', 'Spring Boot 및 FastAPI 혼합 백엔드 서비스']}>
                    <ForceGitMembers
                        names={['terrinens', 'heoap9', 'Hyeon818', 'jiyoubin', 'leeseungmin89']}></ForceGitMembers>
                </DateListForm>

                <DateListForm
                    date={'2023.09.18 - 2023.10.20'}
                    title={'Melona'}
                    href={'https://github.com/duddnr3618/melonaProj'}
                    description={'초기 투자자를 위한 가이드 및 주식, 코인 커뮤니티 사이트'}
                    summations={[
                        'SpringBoot 기반 Restfull 서버 개발 (OAuth2, Spring Security, Session, WebSocket)',
                        'JPA 및 QueryDSL을 활용한 MySQL 설계 및 관리',
                        'Thymeleaf를 이용한 SSR 개발 (JS, HTML, CSS, BootStrap)',
                        '오픈소스 Naver, TrandingView API를 활용한 서버 개발',
                        'GitHub를 이용한 형상관리',
                        'AWS EC2를 활용한 웹 배포']}>
                    <ForceGitMembers
                        names={['terrinens', 'duddnr3618', 'Heonamkyu93', 'SeunghyunJeong5', 'BeomjunKim123', 'Yun327']}/>
                </DateListForm>
            </Section>

            <ProjTechs/>
            <StudyTechs/>
        </div>
    )
}