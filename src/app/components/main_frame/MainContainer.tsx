export default function MainContainer({children}: { children: React.ReactNode }) {
    return (
        <div className={'container max-w-screen-xl mx-auto gap-0 mb-9'}>
            {children}
        </div>
    )
}