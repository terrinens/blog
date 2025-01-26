type LanguageMap = { [key: string]: string }

const ProgrammeLanguage: LanguageMap = {
    ".java": "Java",
    ".js": "JavaScript",
    ".mjs": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".py": "Python",
    ".pyw": "Python",
    ".ipynb": "Python",
    ".cpp": "C++",
    ".c": "C",
    ".h": "C/C++ Header",
    ".rs": "Rust",
    ".rb": "Ruby",
    ".go": "Go",
    ".swift": "Swift",
    ".php": "PHP",
    ".sql": "SQL",
    ".pl": "Perl",
    ".r": "R",
    ".sh": "Shell Script",
}

export function programmeLanguageAnyMath(str: string): boolean {
    const lowStr = str.toLowerCase();
    if (ProgrammeLanguage.hasOwnProperty(lowStr)) return true;
    return Object.values(ProgrammeLanguage)
        .some(value => value.toLowerCase() == lowStr.toLowerCase());
}

export function fileIsProgrammeLanguage(filePath: string) {
    const extension = '.' + filePath.split('.').pop();
    return programmeLanguageAnyMath(extension);
}

export function programmeLanguageMatching(key: string) {
    const lowKey = key.toLowerCase();
    const ifLowKey = '.' + key.toLowerCase();

    if (programmeLanguageAnyMath(lowKey) || programmeLanguageAnyMath(ifLowKey)) {
        for (const [extension, lang] of Object.entries(ProgrammeLanguage)) {
            if (extension == lowKey || extension == ifLowKey || lang.toLowerCase() == lowKey) return lang;
        }
    }
    return undefined;
}