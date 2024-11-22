import {ProjectCard} from "@/app/components/post/proj/ProjectCardRender";
import {findAllAndSplitOfType} from "@/app/lib/db/ServerProjDB";

export default async function Page() {
    const {team, personal} = await findAllAndSplitOfType();
    return (<ProjectCard teamsData={team} personalsData={personal}/>)
}
