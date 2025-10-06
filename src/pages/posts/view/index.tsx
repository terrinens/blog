import React, {} from "react";
import {useRouter} from "next/router";
import ViewRender from "@/pages/posts/view/viewRender";

const Home: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;

    return <ViewRender id={id}/>
}

export default Home;