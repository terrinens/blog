export const gitName = 'terrinens';

interface CallAPIOptions {
    method?: string
    replaceToken?: string
    noToken?: boolean;
    noJson?: boolean;
}

export const callAPI = async (url: string, options: CallAPIOptions = {}) => {
    const {method = 'GET', noToken = false, noJson = false} = options;

    const headers = new Headers({'Content-Type': 'application/json'});
    if (!process.env.GIT_TOKEN) Error('Not Has GitToken')
    if (!noToken) headers.append('Authorization', `Bearer ${options.replaceToken ? options.replaceToken : process.env.GIT_TOKEN}`);

    const response = await fetch(url,
        {
            method: method,
            headers: headers
        });

    if (!response.ok) return {};

    if (noJson) return response;
    else return await response.json();
}

export type SimpleGitUserInfo = {
    name: string;
    gitURL: string;
    avatarURL: string;
}

export type GitUserInfo = {
    blog: string | undefined
    publicRepos: number;
    bio: string;
} & SimpleGitUserInfo;