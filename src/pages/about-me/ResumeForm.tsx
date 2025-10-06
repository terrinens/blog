import {Section, TechSection} from "@/pages/about-me/AboutComponent";
import FlexibleIcon from "@/pages/about-me/icons/flexible-access.svg";
import {DateBlock, RecordCase} from "@_components/common/Timeline";
import Link from "next/link";
import GitMembers, {ForceGitMembers} from "@_components/mdx/GitMembers";
import React from "react";
import EmailIcon from "@/pages/about-me/icons/mail-reception.svg";
import {DescriptionList} from "@_components/common/List";
import {getOpenSourceContributorLog} from "@/pages/lib/github/GithubCodeByte";
import APISolutionIcon from "@/pages/about-me/icons/api-interface-svgrepo-com.svg";
import path from "path";
import fs from "fs";
import {callAPI} from "@/pages/lib/github/GitConfig";

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

export const PersonalInfo = () => (
    <Section title={'연락처'} src={EmailIcon}>
        <DescriptionList data={[
            {title: 'Name', content: ['김동철']},
            {
                title: 'Phone',
                content: [unpack('0000 0001 0000 00 0010 0001 0011 0000 00 0000 0111 1000 0101')]
            },
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
    const repInfos = await getInfos();

    return (
        <div className={'prose space-y-4'}>
            <Section title={'끈기있게 도전하는 개발자, 김동철입니다.'}>
                <span className={'text-lg font-bold'}>로직 하나하나 끈기있게 개선점을 찾아내, 개선하고자 노력하는 신입 백엔드 개발자 김동철 입니다.</span>
                <ul>
                    <li>새로운 기술을 배우고 적용하는데 많은 관심이 있으며, 백엔드 개발 분야에서 지속적으로 성장하고자 합니다.</li>
                    <li>문제를 분석하고 끈기있게 해결책을 찾아내 해결후, 이를 문서화하여 추후에 재발을 방지하고자 합니다.</li>
                    <li>2개의 개인프로젝트, 3개의 팀프로젝트, {repInfos.length}개의 오픈소스에 참여했습니다.</li>
                </ul>

                <div>
                    <h3>끈기있는 해결</h3>
                    저의 강점 중 하나는 끈기 있게 문제를 해결하는 능력입니다. 개발 과정에서는 예상치 못한 여러 문제들이 발생하기 마련인데, 이러한 문제들을 해결하기 위해서는 끈기가 필수적이라고 믿습니다. <br/><br/>

                    문제가 발생했을 때, 이를 해결하기 위한 다양한 방안을 모색하는 과정은 결코 쉽지 않습니다. 그러나 끈기를 가지고 지속적으로 시도하다 보면, 결국에는 효과적인 해결책을 찾을 수 있습니다. <br/><br/>

                    예를 들어, 팀 프로젝트중, SAW 프로젝트에서 <b>JWT에 대한 인증 처리 방식을 Spring AOP로 구현하고자 했을 때</b>, 다양한 버그로 인해 수많은 수정과 테스트를 반복해야 했던 경험이 있습니다. <br/><br/>

                    하지만 그 과정에서 포기하지 않고 다양한 접근 방식을 시도하며, 관련 문서들을 하나하나씩 읽어나간 결과, 결국 문제를 해결하고 성공적으로 작동하는 인증 시스템을 만들어낼 수 있었습니다. <br/><br/>

                    이처럼 끈기가 있어야만 문제를 해결할 수 있는 능력이 더욱 빛을 발한다고 생각합니다. 앞으로도 이러한 끈기를 바탕으로 다양한 문제를 해결해 나가겠습니다.
                </div>

                <div>
                    <h3>하나의 해결마다 문서가 있어야한다.</h3>
                    문제를 해결하는 과정에서 제가 중요하게 생각하는 점은, 해결책마다 문서화가 필요하다는 것입니다. 개발에서는 문제를 해결하기 위해 여러 접근 방식을 시도하게 되는데, 이 과정에서 문서화는 그 해결책을 명확히 하고, 후속 작업에 큰 도움이 됩니다. <br/><br/>

                    문서가 없다면, 같은 문제를 반복해서 겪거나 해결책을 잊어버릴 위험이 크며, 다른 개발자가 해결한 방식을 알고자했을때 반복적으로 설명해야하는 문제점이 있습니다. <br/><br/>

                    예를 들어, <b>SAW 프로젝트 백엔드에서</b> API를 요청할시에, [프론트에서 전송한 헤더의 값이 없는 경우]를 해결한 문서가 있었습니다. <br/>
                    이 문서가 있었기 때문에 프론트에서도 동일한 문제가 발생했을때 동일하게 사용되는 설정부분을 탐색하게 되었고, 이를 빠르게 해결할 수 있게 되었습니다. <br/><br/>

                    그 결과, 제가 어떤 과정을 거쳤고, 어떤 문제해결 방식으로 해결했는지 다른 개발자에게 영감을 주어, 이후에 개발을 더 수월하게 하게되었습니다. <br/><br/>

                    이처럼 문서는 단순한 기록이 아니라, 팀원 간의 지식 공유를 촉진하고, 효율적인 문제 해결을 가능하게 합니다. 앞으로도 문제를 해결할 때마다 그 과정을 문서화하여, 혼자만이 아니라 팀 전체의 발전에 기여하고자 합니다.
                </div>

                <div>
                    <h3>완벽이란 과거에만 있다.</h3>
                    개발자로서 &quot;완벽&quot;이라는 개념은 과거에만 존재한다고 생각합니다. 기술은 끊임없이 변화하고 발전하기 때문에, 과거의 완벽한 결과물에 집착하기보다는 현재의 문제를 해결하고 지속적으로 학습하는 것이 중요합니다. <br/><br/>

                    예를 들어, 제가 이전에 참여했던 프로젝트에서 완벽하게 작동했던 로직이나 코드가 시간이 지나면서 새로운 요구사항이나 기술 스택의 변화에 맞지 않게 될 수 있습니다. 이럴 때 과거의 성공에 안주하면 현재의 문제를 해결하지 못하고, 자신의 발전을 저해할 수 있습니다. 따라서 과거의 경험을 바탕으로 현재의 문제에 유연하게
                    접근하는 것이 필요합니다. <br/><br/>

                    또한, 개발 과정에서 완벽함을 추구하면 오히려 문제해결 속도를 저해할 수 있습니다. 새로운 기술이나 방법론을 시도할 때, 완벽한 결과를 기대하다 보면 두려움 때문에 도전조차 하지 못할 수 있습니다. <br/><br/>

                    저는 최근에 NextJs 기반으로 <b>GitHub Pages 블로그를 개발할 때,</b> NextJs를 완벽히 이해하지 못한 상태에서 시도했기에 그 과정에서 많은 실패를 겪었습니다. 그러나 그 실패는 결국 저에게 더 많은 기술을 이해하는 기회를 얻게되었고, 저의 기술 스택을 한층 발전시킬 수
                    있었습니다. <br/><br/>

                    결국, 완벽함은 과거의 결과물이며, 현재와 미래의 개발 과정에서는 지속적인 학습과 실험이 필요합니다. 앞으로도 완벽에 얽매이지 않고, 실패와 경험을 통해 끊임없이 발전하는 개발자로 성장해 나가겠습니다. <br/><br/>
                </div>
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
                        names={['terrinens', 'heoap9', 'Hyeon818', 'jiyoubin', 'leeseungmin89']}/>
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
        </div>
    )
}