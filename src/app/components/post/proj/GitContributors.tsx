import {callUserInfos, getOrgContributorsInfo, GitUserInfo} from "@/app/lib/GithubData";

function Card({info, role}: { info: GitUserInfo, role?: string }) {
    return (
        <div
            className="max-w-72 flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
            <div className="flex items-center gap-x-4">
                <img className="rounded-full size-20" src={info.avatarURL} alt="Avatar"/>
                <div className="grow">
                    <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                        {info.name}
                    </h3>

                    {role ?
                        <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                            {role}
                        </p>
                        : <div/>
                    }

                    <p className="text-xs text-gray-500 dark:text-neutral-500">
                        Public Repos : {info.publicRepos}
                    </p>
                </div>
            </div>

            <p className="mt-3 text-gray-500 dark:text-neutral-500">
                {info.bio ? info.bio : '자기 소개가 없습니다.'}
            </p>


            <div className="mt-3 space-x-1">
                <a className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                   href={info.gitURL}>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a>

                {
                    info.blog ?
                        <a className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                           href={info.blog}>
                            <svg className="shrink-0 size-3.5" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                                 y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256">
                                <path fill="#535252" data-title="Layer 0"
                                      d="M17.4,32.1h221.3v14.8H17.4V32.1z M17.4,209.1h221.3v14.8H17.4V209.1z M39.5,54.3h14.8V69H39.5V54.3z M61.6,54.3h14.8V69H61.6V54.3z M83.8,54.3h14.8V69H83.8V54.3z M98.5,187h-59v-73.8h59V187z M54.3,172.3h29.5V128H54.3V172.3z M113.3,113.3h51.6V128h-51.6V113.3z M246,91.1H10v-59h236V91.1z M24.8,76.4h206.5V46.9H24.8V76.4z M246,223.9H10V113.3h14.8v95.8 h206.5V106H246V223.9z M113.3,142.8h103.3v14.8H113.3V142.8z M113.3,172.3h103.3V187H113.3V172.3z"/>
                            </svg>
                        </a>
                        : <div/>

                }
            </div>
        </div>
    );
}

type GitContributorProps = {
    orgName: string,
    repName: string,
    role?: string,
    forceAdd?: string[],
    token?: string
}

export default async function GitContributors({orgName, repName, role, forceAdd, token}: GitContributorProps) {
    const infos = await getOrgContributorsInfo(orgName, repName, {forceAdd, token})

    return (
        <div className="not-prose max-w-[85rem] pl-0 pb-5 mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-2 md:gap-3 lg:grid-cols-4 lg:gap-6 gap-6">
                {infos.map((info, index) => (
                    <Card key={`${index}:${info.name}`} info={info} role={role}/>
                ))}
            </div>
        </div>
    )
}

export async function ForceCreateGitContributors({role, forceAdd}: {
    role: string, forceAdd: string[]
}) {
    const infos = await callUserInfos(...forceAdd);
    return (
        <div className="not-prose max-w-[85rem] pl-0 pb-5 mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-2 md:gap-3 lg:grid-cols-4 lg:gap-6 gap-6">
                {infos.map((info, index) => (
                    <Card key={`${index}:${info.name}`} info={info} role={role}/>
                ))}
            </div>
        </div>
    )
}
