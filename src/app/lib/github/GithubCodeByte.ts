import {fileIsProgrammeLanguage, programmeLanguageMatching} from "@/app/lib/Config";
import {callAPI, gitName} from "@/app/lib/github/GitConfig";

async function getGitRepositories() {
    const json = await callAPI(`https://api.github.com/user/repos?per_page=100`)
    const extraction: { [type: string]: { urls: string[] } } = {}

    const ifAction = (key: string, value: string) => {
        if (!Object.hasOwn(extraction, key)) {
            extraction[key] = {urls: [value]};
        } else extraction[key].urls.push(value);
    }

    for (const data of json) {
        if (data.fork == true) continue;

        const url = data.url;
        if (data.owner.type == 'Organization') ifAction('org', url);
        else if (data.owner.login != gitName) ifAction('other', url);
        else ifAction('user', url);
    }

    return extraction;
}

class LanguagesByte {
    languagesByte: Record<string, number> = {};

    public append(key: string, value: number) {
        const languageName = programmeLanguageMatching(key);
        if (languageName == undefined) return;

        if (!Object.hasOwn(this.languagesByte, languageName as string)) {
            this.languagesByte[languageName] = value;
        } else this.languagesByte[languageName] += value;
    }

    get getList() {
        return Object.fromEntries(
            Object.entries(this.languagesByte)
                .sort(([, byteA], [, byteB]) => byteB - byteA)
        )
    }

    public merge(...added: LanguagesByte[]) {
        added.forEach(languageByte => {
            const list = languageByte.getList;
            for (const key in list) {
                const byte = list[key];
                this.append(key, byte);
            }
        });
        return this;
    }
}

/* TODO 현재 모든 브랜치에서 코드 바이트를 계산하고 있음 메인 브랜치에서만 작동하도록 만들것. */
async function getUserCodeBytes(urls: string[]) {
    const languagesByte = new LanguagesByte();

    /*https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#list-repository-languages*/
    for (const url of urls) {
        const apiUrl = url + '/languages'
        const response = await callAPI(apiUrl);

        for (const key in response) {
            const byte = response[key] as number;
            languagesByte.append(key, byte);
        }
    }

    return languagesByte;
}

async function getOrgCommitData(urls: string[]) {
    const files = [];

    for (const url of urls) {
        const contributorsUrl = url + '/contributors';
        const contributorsResponse = await callAPI(contributorsUrl);

        const contributed: boolean = contributorsResponse.some((contributor: Record<string, any>) => contributor.login === gitName);
        if (!contributed) continue

        /*https://docs.github.com/ko/rest/commits/commits?apiVersion=2022-11-28#list-commits*/
        const commitUrl = url + '/commits' + `?author=${gitName}` + `&per_page=100`;
        const commitResponse = await callAPI(commitUrl);

        for (const data of commitResponse) {
            const sha = data.sha;
            const shaDataUrl = url + '/commits/' + sha;
            const shaResponse = await callAPI(shaDataUrl);

            files.push(...shaResponse.files);
        }
    }

    return files;
}

function extractChangeCode(files: any[]) {
    const separation: Record<string, { patch: string; filename: string }[]> = {}

    const append = (key: string, patch: string, filename: string) => {
        if (!Object.hasOwn(separation, key)) {
            separation[key] = [{patch: patch, filename: filename}];
        } else separation[key].push({patch: patch, filename: filename});
    }

    files.filter((file: Record<string, unknown>) => fileIsProgrammeLanguage(file.filename as string))
        .filter(file => !['removed', 'move', 'renamed'].includes(file.status as string))
        .forEach(file => append(file.status, file.patch, file.filename))

    return separation;
}

function calcCodeByte(extract: Record<string, { patch: string; filename: string }[]>) {
    const languagesByte = new LanguagesByte();

    const added = extract.added != null ? extract.added : [];
    const modified = extract.modified != null ? extract.modified : [];

    const codeToByte = (data: Record<string, any>, trueCode: string[]) => {
        const extension = data.filename.split('.').pop() as string;
        const byte = new TextEncoder().encode(trueCode.toString()).length;
        languagesByte.append(extension, byte);
    }

    for (const data of added) {
        const patch = data.patch;
        const trueCode = patch.split('\n').slice(1).map(str => str.slice(1));
        codeToByte(data, trueCode)
    }

    for (const data of modified) {
        const patch = data.patch;
        const changeCodes = patch.split('\n').filter(str => str.startsWith('+') || str.startsWith('-'))

        const trueCode = [];

        let tempRemoveCode = [];
        for (const changeCode of changeCodes) {
            if (changeCode == "") continue;

            const code = changeCode.slice(1);

            if (changeCode.startsWith('-')) {
                tempRemoveCode.push(code);
                continue;
            }

            if (tempRemoveCode.length <= 0) {
                trueCode.push(code);
            } else if (!tempRemoveCode.includes(code)) {
                tempRemoveCode = [];
                trueCode.push(code);
            } else tempRemoveCode = tempRemoveCode.shift();
        }
        codeToByte(data, trueCode)
    }

    return languagesByte
}

async function getOrgCodeBytes(urls: string[]) {
    const files = await getOrgCommitData(urls);
    const extract = extractChangeCode(files);
    return calcCodeByte(extract);
}

/*https://stackoverflow.com/a/23975976*/
async function getOpenSourceContributionPRs() {
    const genUrl = (page: number) => `https://api.github.com/search/issues?q=type:pr+state:closed+author:${gitName}&per_page=100&page=${page}`
    const result: Record<string, any>[] = [];

    let callPage = 1;
    while (true) {
        const url = genUrl(callPage);
        const response = await callAPI(url);
        callPage++;
        result.push(...response.items);

        if (response.total_count < 101) break;
    }

    const trueContributor = result
        .filter((record: Record<string, any>) => record.state == 'closed')
        .filter(record => record.author_association == 'CONTRIBUTOR')
        .filter(record => ![null, undefined].includes(record.pull_request.merged_at))

    const repAPIUrls = trueContributor
        .map(record => record.pull_request.url)
        .map((url: string) => url + '/files');

    const files = [];

    for (const repAPIUrl of repAPIUrls) {
        const json = await callAPI(repAPIUrl);
        files.push(...json);
    }

    return files;
}

async function getOpenSourceContributionCodeBytes() {
    const files = await getOpenSourceContributionPRs();
    const extract = extractChangeCode(files);
    return calcCodeByte(extract);
}

export async function getAllCodeBytes() {
    const allRepData = await getGitRepositories();
    const userCodeBytes = await getUserCodeBytes(allRepData['user'].urls);
    const orgCodeBytes = await getOrgCodeBytes(allRepData['org'].urls);
    const openSourceContributionCodeBytes = await getOpenSourceContributionCodeBytes();

    return userCodeBytes.merge(orgCodeBytes, openSourceContributionCodeBytes);
}