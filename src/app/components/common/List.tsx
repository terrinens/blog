import React from "react";

export function DescriptionList({data}: { data: { title: string, content: string[] }[] }) {
    const CaseBox = ({children}: { children: React.ReactNode }) => {
        return (
            <dl className="flex flex-col sm:flex-row gap-1 items-center">
                {children}
            </dl>
        )
    }

    const Title = ({title}: { title: string }) => {
        return (
            <dt className="min-w-24 flex justify-between items-baseline">
                <span className="block text-sm font-semibold">{title}</span>
                <span className="text-sm font-semibold mr-5">:</span>
            </dt>
        )
    }

    const Content = ({contents}: { contents: string[] }) => {
        return (
            <dd>
                <ul>
                    {contents.map((item, index) => (
                        <li key={`${item}:${index}`}
                            className={`${index === contents.length - 1 ? '' : 'after:content-[\',\']'} me-1  inline-flex items-center text-sm text-gray-800 dark:text-neutral-200`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </dd>
        )
    }

    return (<div className="space-y-3 not-prose">{data.map((item, index) => (
        <CaseBox key={`${item}:${index}}`}>
            <Title title={item.title}/>
            <Content contents={item.content}/>
        </CaseBox>))}
    </div>)
}