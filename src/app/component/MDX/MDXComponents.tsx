// noinspection JSUnusedGlobalSymbols

export declare function GitContributors({orgName, repName, role, forceAdd, token}: {
    orgName: string,
    repName: string,
    role?: string,
    forceAdd?: string[],
    token?: string
}): Promise<Element>

export declare function ForceCreateGitContributors({role, forceAdd}: {
    role: string, forceAdd: string[]
}): Promise<Element>


