import path from "path";

export const rootPath = process.env.NODE_ENV === 'production'
    ? '/blog'
    : '/';

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
    if (Object.hasOwn(ProgrammeLanguage, lowStr)) return true;
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

export const PostsDir = path.join(process.cwd(), '/src/data/post');
export const aboutLock = false;

export const LanguageImageCollection = {
    "SpringBoot": "https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg",
    "FastAPI": "https://icon.icepanel.io/Technology/svg/FastAPI.svg",
    "Flask": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAJ1BMVEVHcEw4qL44qL44qL44qL44qL44qL44qL44qL44qL44qL44qL44qL4lcOQyAAAADHRSTlMAYZ42gQ7zt03gIst5VRyuAAAAr0lEQVQ4jb1Syw7DIAyDEF5p/v97BypUpJjdNkucbCWxjXP/RaTwjQ5Z1Z9pX1XPgsh6g4+zB+g4eyDvfNIV1y4gI0jgPiMAK1YFRWhieugWuSAbna2+J419unZ8eNJAgiLtzTRwXTzTSLgMXugCnaRJhwtG4cLddKMbkFPHLQS5xiaBdzz0yYlpdcYVV1Prt2it+SCSbLK2+IFqvKSNf+dWlksrS0ShFaZMBGv/FT7xQgzNC1BGFQAAAABJRU5ErkJggg==",
    "NextJS": "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    "MYSQL": "https://www.svgrepo.com/show/303251/mysql-logo.svg",
    "Firestore": "data:image/png;base64,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",
    "H2": "https://dbdb.io/media/logos/h2-logo.svg",
    "Java": "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/121px-Java_programming_language_logo.svg.png",
    "Python": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "TypeScript": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    "JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    "C#": "data:image/png;base64,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",
    "Rust": "https://rust-lang.org/logos/rust-logo-512x512.png",
    "Lua": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr6kEKFPFRwXOa7sD8kTsjqmRFDQ1TbFl9Ng&s",
    "Oracle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8zK-1GcpU1bWSN4sRrB1Hfoi3NfOiDwE3g&s"

}