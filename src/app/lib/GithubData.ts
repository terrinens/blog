import {callAPI} from "@/app/lib/GithubCodeByte";

export type SimpleGitUserInfo = {
    name: string;
    gitURL: string;
    avatarURL: string;
}

export type GitUserInfo = {
    createdAt: Date;
    blog: string | undefined
    publicRepos: number;
} & SimpleGitUserInfo;

function genSimpleGitUserInfo(userJson: Record<string, any>): SimpleGitUserInfo {
    const name = userJson.login;
    const gitURL = userJson.html_url;
    const avatarURL = userJson.avatar_url;
    return {name, gitURL, avatarURL};
}

function genGitUserInfo(userJson: Record<string, any>): GitUserInfo {
    const simpleInfo = genSimpleGitUserInfo(userJson);
    const blog = userJson.blog;
    const publicRepos = userJson.public_repos;
    const createdAt = new Date(userJson.created_at);

    return {...simpleInfo, blog, publicRepos, createdAt};
}

export async function getOrgMemberSimpleInfo(orgName: string, option?: { token?: string }) {
    const json = await callAPI(`https://api.github.com/orgs/${orgName}/members`,
        option ? {replaceToken: option.token} : {});

    if (json.length < 0) return [];

    const simples: SimpleGitUserInfo[] = [];

    for (const data of json) {
        simples.push(genSimpleGitUserInfo(data));
    }

    return simples;
}

export async function getOrgContributorsInfo(
    orgName: string, repName: string,
    option?: { token?: string; forceAdd?: string[] }) {

    let json = await callAPI(`https://api.github.com/repos/${orgName}/${repName}/contributors`,
        option ? {replaceToken: option.token} : {}
    )

    if (json.length < 0) return [];

    if (option && option.forceAdd) {
        const forceList = option.forceAdd
            .filter(name => !json.some((user: Record<string, any>) => user.login === name))
            .map(name => ({url: `https://api.github.com/users/${name}`}));
        json = json.concat(forceList);
    }

    const userInfos: GitUserInfo[] = [];
    for (const data of json) {
        const userData = await callAPI(data.url, {noToken: true});
        userInfos.push(genGitUserInfo(userData));
    }

    return userInfos;
}
