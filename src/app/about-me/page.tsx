import {aboutLock} from "@/app/lib/Config";
import NotFound from "@/app/not-found";
import {getOpenSourceContributorLog, getTotalRepositories} from "@/app/lib/github/GithubCodeByte";
import {SimpleRepoCard} from "@_components/mdx/GitRepositoryCard";
import OpenSourceIcon from "./icons/cloud-backup-svgrepo-com.svg"
import APISolutionIcon from "./icons/api-interface-svgrepo-com.svg"
import MachineIcon from "./icons/machine-vision-svgrepo-com.svg"
import FlexibleIcon from './icons/flexible-access.svg'
import BoxIcon from './icons/multiple-defenses.svg'
import EmailIcon from './icons/mail-reception.svg'
import React from "react";
import fs from "fs";
import path from "path";
import {Section, TechSection} from "@/app/about-me/AboutComponent";
import {callAPI} from "@/app/lib/github/GitConfig";
import {findAllAndSplitOfType} from "@/app/lib/db/ServerProjDB";
import {generationPostCardProps} from "@/app/lib/post/ClientPost";
import {PostCard} from "@_components/post/main/ClientPostRender";
import {DateBlock, RecordCase} from "@_components/common/Timeline";
import {DescriptionList} from "@_components/common/List";

const getInfos = async () => {
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

const readJson = (fileName: string): Record<any, any> => {
    const dirPath = path.resolve('src', 'app', 'about-me')
    return JSON.parse(fs.readFileSync(path.resolve(dirPath, fileName), 'utf8'));
}

const unpack = (pack: string) => {
    return pack.split(' ').map(bits => {
        if (bits === '00') return '-';
        return (parseInt(bits, 2)).toString();
    }).join('');
};

export default async function Page() {
    if (aboutLock) return <NotFound message={'포스터를 찾지 못했습니다.'}/>;
    const repInfos = await getInfos();
    const {personal, team} = await getTotalRepositories();

    const projTech: Record<any, any> = readJson('ProjTech.json');
    const studyTech: Record<any, any> = readJson('StudyTech.json');

    const projData = await findAllAndSplitOfType();
    const teamProps = projData.team.map(data => generationPostCardProps(data.id, data.data));
    const personalProps = projData.personal.map(data => generationPostCardProps(data.id, data.data));

    return (<div className={'flex justify-start w-full prose flex-col'}>
            <div className={'border-b mb-10'}>
                <h1>자기소개</h1>
                <Section title={'끈기있게 도전하는 개발자, 김동철입니다.'} src={''}>
                    <span className={'text-lg'}>로직 하나하나 끈기있게 개선점을 찾아내, 개선하고자 노력하는 신입 백엔드 개발자 김동철 입니다.</span>
                    <ul>
                        <li>새로운 기술을 배우고 적용하는데 많은 관심이 있으며, 백엔드 개발 분야에서 지속적으로 성장하고자 합니다.</li>
                        <li>문제를 분석하고 끈기있게 해결책을 찾아내 해결후, 이를 문서화하여 추후에 재발을 방지하고자 합니다.</li>
                        <li>{personal}개의 개인프로젝트, {team}개의 팀프로젝트, {repInfos.length}개의 오픈소스에 참여했습니다.</li>
                    </ul>
                </Section>
            </div>

            <div>
                <h1>포트폴리오</h1>
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

                <Section title={'프로젝트에 사용해본 기술'} src={APISolutionIcon}>
                    <TechSection data={projTech}/>
                </Section>

                <Section title={'학습중인 기술'} src={MachineIcon}>
                    <TechSection data={studyTech}/>
                </Section>

                <Section description={'오픈 소스에 기여한 목록입니다. 클릭시 해당 소스로 이동이 가능합니다.'}
                         title={'오픈 소스 기여 목록'} src={OpenSourceIcon}>
                    <div className={'not-prose flex flex-wrap'}>{repInfos.map((info, index) => (
                        <SimpleRepoCard key={`${index}:${info.name}`} {...info}/>
                    ))}</div>
                </Section>

                <Section description={'교육기관 혹은 모집하여 결성된 팀으로 진행한 프로젝트입니다. 카드를 클릭시 더 자세한 정보를위해 문서로 이동합니다.'}
                         title={'팀 프로젝트 진행 이력'} src={BoxIcon}>
                    <div
                        className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-7 sm:grid-cols-2 sm:gap-5 gap-10">{teamProps.map(props => (
                        <div key={`card:${props.id}`} className={'not-prose w-[272px]'}>
                            <PostCard baseURL={'/projects/view'} dateRender={false} tagRender={false} {...props} />
                        </div>))}
                    </div>
                </Section>

                <Section description={'개인이 진행한 프로젝트입니다. 문서를 작성한 프로젝트만 나타내고 있습니다. 카드를 클릭시 더 자세한 정보를위해 문서로 이동합니다.'}
                         title={'개인 프로젝트 진행 이력'} src={BoxIcon}>
                    <div
                        className="grid xl:grid-cols-3 xl:gap-5 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-7 sm:grid-cols-2 sm:gap-5 gap-10">{personalProps.map(props => (
                        <div key={`card:${props.id}`} className={'not-prose w-[272px]'}>
                            <PostCard baseURL={'/projects/view'} dateRender={false} tagRender={false} {...props} />
                        </div>))}
                    </div>
                </Section>

                <Section title={'교육과정'} src={FlexibleIcon}>
                    <DateBlock date={'2023. 11. 1 - 2024. 1. 1'}/>
                    <RecordCase title={'인공지능(AI-X) 프로젝트 부트캠프'}>
                        <ul className={'mt-2 space-y-2'}>
                            <li>인공지능 라이브러리 사용을 위한 Python 기초 학습</li>
                            <li>Python 웹 프레임워크 FastAPI 학습</li>
                            <li>PyTorch, TensorFlow 기본 개념 학습</li>
                            <li>구글 Mediapipe를 활용한 기초 AI API 활용 학습</li>
                        </ul>
                    </RecordCase>

                    <DateBlock date={'2023. 4. 1 - 2023. 10. 1'}/>
                    <RecordCase title={'클라우드 기반의 MSA 풀스택 자바 개발자'}>
                        <ul className={'mt-2 space-y-2'}>
                            <li>Java를 통한 객체 지향 프로그래밍 기초 학습</li>
                            <li>SprintBoot를 통한 백엔드 기초 학습</li>
                            <li>MYSQL, Orcale를 통한 DB 기초 학습</li>
                            <li>AWS EC2를 통한 기초 클라우드 컴퓨팅 학습</li>
                            <li>Docker를 통한 애플리케이션 컨테이너 운영 기초 학습</li>
                            <li>Node, React를 통한 프론트 기초 학습</li>
                        </ul>
                    </RecordCase>
                </Section>
            </div>
        </div>
    );
}
