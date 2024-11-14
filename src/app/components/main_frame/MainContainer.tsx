export default function MainContainer({children}: { children: React.ReactNode }) {
    return (
        <div className={'container max-w-screen-xl mx-auto gap-0 mb-9 my-10'}>
            {children}
        </div>
    )
}

export function MainContainerGrid({title, children}: { title: string, children: React.ReactNode }) {
    return (
        <div className={'grid-cols-2'}>
            <div className={'prose'}>
                <h2 className={'mb-5'}>{title}</h2>
            </div>
            {children}
        </div>
    );
}