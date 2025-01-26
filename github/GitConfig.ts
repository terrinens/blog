interface CallAPIOptions {
    method?: string
    replaceToken?: string
    noToken?: boolean;
    noJson?: boolean;
}

export const callAPI = async (url: string, options: CallAPIOptions = {}) => {
    const {method = 'GET', noToken = false, noJson = false} = options;

    const headers = new Headers({'Content-Type': 'application/json'});

    if (!options.replaceToken && process.env.GIT_TOKEN == undefined) {
        console.log(`has not git token. token value : ${process.env.GIT_TOKEN}`);
        throw Error("has not git token")
    }

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