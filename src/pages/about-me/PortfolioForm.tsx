import {LowSection, Section, TechnologyList} from "@/pages/about-me/AboutComponent";
import OpenSourceIcon from "@/pages/about-me/icons/cloud-backup-svgrepo-com.svg";
import {SimpleRepoCard} from "@_components/mdx/GitRepositoryCard";
import BoxIcon from "@/pages/about-me/icons/multiple-defenses.svg";
import React from "react";
import {findAllAndSplitOfType} from "@/pages/lib/db/ServerProjDB";
import {generationPostCardProps} from "@/pages/lib/post/ClientPost";
import {getInfos, PersonalInfo} from "@/pages/about-me/ResumeForm";
import {MDXImage} from "@_components/mdx/MDXImage";
import Logo from "@_public/svg/logo.svg"
import Image from "next/image";
import Link from "next/link";
import path from "path";
import {DefaultFileSVG} from "@_components/post/proj/TreeView";
import GitMembers, {ForceGitMembers} from "@_components/mdx/GitMembers";
import {getLanguageImageCollection} from "@/pages/lib/Config";

const Card = ({thumbnail, name, description, id}: {
    thumbnail: string,
    name: string,
    description: string,
    id: string
}) => {

    const Block = ({children}: { children: React.ReactNode }) => (
        id ? <Link className={"flex flex-col max-h-[300px] flex-grow justify-center space-y-2 w-auto"}
                   href={path.join('/projects/view', id)}>{children}</Link> : <>{children}</>
    );

    return (<Block>
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
    </Block>);
}

const sawProj = (<Section title={'SAW Project'}>
    <LowSection title={'목적'}>
        SAW(Sleep As Well)은 스터디팀 디비자바의 다양한 활동 기록을 남기기 위한 팀 블로그입니다.
        스터디, 회의기록 등등 여러 정보를 담는 블로그입니다.
    </LowSection>
    <LowSection title={'참여 멤버'}>
        <GitMembers orgName={'SleepAswell'} token={process.env.GIT_SAW_TOKEN as string}/>
    </LowSection>

    <LowSection title={'사용 기술'}>
        <TechnologyList list={getLanguageImageCollection(['SpringBoot', 'Java', 'JWT', 'TypeScript', 'React', 'Jenkins'])}/>
    </LowSection>

    <LowSection title={'담당 파트'}>
        해당 프로젝트에서 제가 맡은 파트는 기초부터 시작해서 심화까지 모든 개발의 흐름을 설계하고, 80%의 코드를 작성하였습니다. <br/>
        특히 Security 로직에 관련해서 많은것들을 기여했으며, JWT 기반의 인증로직을 구축하였습니다. <br/>
    </LowSection>

    <LowSection title={'성과'}>
        주목할 만한 부분은 Spring AOP를 활용한 JWT 인증 로직 최적화입니다. 처음에는 JWT 인증을 위해 Session 방식을 사용하지 않으면서, SecurityContext를 사용하지 않는 방식으로 구현하였습니다. <br/>
        하지만 이 접근법은 모든 사용자 정보가 필요한 로직에서 JWT를 해석해야 하므로, 반복적인 작업이 발생했습니다. 따라서 API를 개발하는 과정에서 개발자가 이러한 반복 작업을 줄이기 위해 SecurityContext를 활용하여 필터를 구성하게 되었습니다.

        <MDXImage src={'aop_filter_before'}/>

        그러나 이 방법은 모든 요청에 대해 필터 검증을 거쳐야 하며, 인증이 필요한 URL에만 Context 주입 과정을 수행해야 하기 때문에 허용된 URL을 전체 탐색해야한다는 단점이 있었습니다. <br/><br/>
        이를 해결하기 위해 Spring AOP를 통해 필요한 인증이 요구되는 메서드에만 필터를 적용하는 방식으로 전환했습니다.<br/>
        그 결과, 처리 속도를 83% 감소(708ms에서 120ms로)시킬 수 있었습니다.

        <MDXImage src={'aop_filter_after'}/>
    </LowSection>
</Section>)

const bbProj = (<Section title={'뷰티플 브라이드'}>
    <LowSection title={'목적'}>
        BB Proj(Beautiful Bride)는 Open AI Source :: HR Viton을 활용하여 Gan, Gen 기반의 가상 옷 시착을 목적으로 진행하였습니다.
    </LowSection>
    <LowSection title={'참여 멤버'}>
        <ForceGitMembers
            names={['terrinens', 'heoap9', 'Hyeon818', 'jiyoubin', 'leeseungmin89']}/>
    </LowSection>

    <LowSection title={'사용 기술'}>
        <TechnologyList list={getLanguageImageCollection(['SpringBoot', 'Java', 'React', 'Python', 'TensorFlow', 'PyTorch'])}/>
    </LowSection>

    <LowSection title={'담당 파트'}>
        해당 프로젝트에서 제가 맡은 역할은 모든 백엔드 설계를 담당하였습니다. <br/>
        HR Viton의 학습을 보다 간편하게 시작할 수 있도록 리팩토링을 진행했으며, 기존에는 상의만 인식하던 모델을 확장하여 드레스 같은 의상도 인식할 수 있게 재구축 하였습니다.
    </LowSection>

    <LowSection title={'성과'}>
        <LowSection title={'AI 모델의 인식 확장'}>
            기존에는 모델이 사람의 상의 구간만 인식을하여 상의를 제외한 다른 의류에는 적용을 불가능하였습니다. <br/>
            그렇기 때문에 프로젝트의 처음 시작 목표였던 드레스 시착에는 많은 에로사항이 있었습니다. <br/>

            <Image src={'https://github.com/BeatifulBride/FindTuning-HR-VITON/raw/main/figures/fig.jpg'} className={'w-fit h-72'} alt={''} width={100} height={100}/>

            그러나 끈질기게 소스 코드를 분석하고 디버깅을 진행한 결과, AI 모델이 의상을 인식하는 소스 코드를 찾아내어 이를 재구축할 수 있었습니다. <br/>
            기존에 3차적으로 인식하던 Agnostic Masking 부분의 영역을 확장하여, 하의까지 인식할 수 있도록 개선하였습니다.

            <Image src={'https://github.com/BeatifulBride/PipeLine-HR-VITON/raw/1.0/README/assets/AgonsitcTuning.png'} className={'w-fit h-72'} alt={''} width={100} height={100}/>
            <Image src={'https://github.com/BeatifulBride/PipeLine-HR-VITON/raw/1.0/README/assets/Result.png'} className={'w-full h-72'} alt={''} width={100} height={100}/>

            그 결과, 상의와 하의를 동시에 진행하는 것은 불가능하지만, 당초의 목적이었던 드레스 인식 및 생성을 성공적으로 구현하여 가상 시착이 가능하게 되었습니다.
        </LowSection>
    </LowSection>
</Section>)

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
        <div className={'prose'}>
            <h2>끈기있게 도전하는 개발자, 김동철입니다.</h2>

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
                    className="grid grid-cols-2 gap-4 sm:grid-rows-1">
                    {teamProps.map((props, index) => (<div key={`card:${props.id}:${index}`} className={'not-prose w-auto border rounded-xl'}>
                        <Card key={`${props.id}:${index}`} id={props.id}  {...props.info} />
                    </div>))}
                </div>
            </Section>

            <Section description={'개인이 진행한 프로젝트입니다. 더 자세한 문서가 있을시, 문서 아이콘으로 나타내고 있습니다. 클릭시 해당 페이지로 이동 할 수 있습니다.'}
                     title={'개인 프로젝트 진행 이력'} src={BoxIcon}>
                <div
                    className="grid grid-cols-2 gap-4">
                    {personalProps.map((props, index) => (<div key={`card:${props.id}:${index}`} className={'not-prose w-auto border rounded-xl'}>
                        <Card key={`${props.id}:${index}`} id={props.id} {...props.info} />
                    </div>))}
                </div>
            </Section>

            {sawProj}
            {bbProj}
        </div>
    )
}