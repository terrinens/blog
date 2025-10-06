import MainContainer from "@_components/main_frame/MainContainer";
import ListRender from "@/pages/posts/listRender";
import React from "react";

const Home: React.FC = () => {
    return (
        <MainContainer>
            <ListRender pageSize={8}/>
        </MainContainer>
    )
}

export default Home;