const Footer = () => {
    return (
        <footer className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-neutral-400">
                            © 2024 terrinens@github
                        </p>
                    </div>

                    <ul className="flex flex-wrap items-center">
                        <li className="inline-block pe-4 text-xs">
                            <a className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
                               href={process.env.GITHUB}>GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;