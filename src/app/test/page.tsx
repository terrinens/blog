import RecencyPostsBlock from "@_components/main_frame/RecencyPostsBlock";
import {RecencyPostBlockData} from "@/app/page";


export default async function Page() {
    const recencyPostBlockData = await RecencyPostBlockData();
    return (<RecencyPostsBlock props={recencyPostBlockData.slice(1)} />)
}