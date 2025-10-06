type CardProps = {
    href?: string;
    img: string;
    name: string;
    description?: string;
};

export function SimpleRepoCard({img, name, ...option}: CardProps) {
    return (
        <a className="not-prose hs-tooltip max-w-[181px] py-1 pr-2 pl-1 rounded-xl mr-2 mb-2 border subnav-item selected"
           href={option.href ?? '#'}>
            <div className={`flex flex-row items-center ${option?.description ? 'hs-tooltip-toggle' : ''}`}>
                <img className="bg-gray-100 avatar mr-2" alt="" src={img}
                     width="20" height="20"/>
                <span className="truncate text-center text-lg">@{name}</span>
                {option.description && (<span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 border rounded-lg shadow-sm bg-white"
                    role="tooltip">
                    {option.description}
                </span>)}
            </div>
        </a>)
}