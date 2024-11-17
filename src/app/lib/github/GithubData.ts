import {callAPI, GitUserInfo, SimpleGitUserInfo} from "@/app/lib/github/GitConfig";

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
    const bio = userJson.bio;

    return {...simpleInfo, blog, publicRepos, bio};
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

export async function callUserInfos(...userNames: string[]) {
    const calls = userNames.map(name => {
        const api = `https://api.github.com/users/${name}`;
        return callAPI(api);
    })

    const jsons = await Promise.all(calls);

    return jsons.map(json => genGitUserInfo(json));
}

export async function getOrgContributorsInfo(
    orgName: string, repName: string,
    option?: { token?: string; forceAdd?: string[] }) {

    const json = await callAPI(`https://api.github.com/repos/${orgName}/${repName}/contributors`,
        option ? {replaceToken: option.token} : {}
    )

    if (json.length <= 0) return [];

    const forceInfos: GitUserInfo[] = [];
    if (option && option.forceAdd) {
        if (json.length != undefined) {
            const forceList = option.forceAdd
                .filter(name => !json.some((user: Record<string, any>) => user.login === name));
            forceInfos.push(...(await callUserInfos(...forceList)))
        } else {
            forceInfos.push(...(await callUserInfos(...option.forceAdd)))
        }
    }

    const userInfos: GitUserInfo[] = [];
    if (json.length != undefined) {
        for (const data of json) {
            const userData = await callAPI(data.url, {noToken: true});
            userInfos.push(genGitUserInfo(userData));
        }
    }

    return userInfos.concat(forceInfos);
}

