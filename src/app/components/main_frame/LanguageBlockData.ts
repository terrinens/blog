import {getAllCodeBytes} from "@/app/lib/GithubCodeByte";

const ChartColors: string[] = [
    "#1C64F2",
    "#FBAA4D",
    "#0ABAB5",
    "#FF9A00",
    "#E74694",
    "#F59E0B",
    "#FFB6C1",
    "#009B9F",
    "#F4B400",
    "#D7176C",
    "#16BDCA",
    "#F9A8D4",
    "#1A56DB",
    "#C2185B",
    "#FDBA8C",
    "#FF6F61",
    "#FBBF24",
    "#0E4DA4",
    "#FEC94C",
    "#FCAF7E"
];

export interface ChartDataProps {
    bytes: number[];
    lang: string[];
    colors: string[];
}

export async function generationChartData() {
    const codeBytes = await getAllCodeBytes();
    const props: ChartDataProps = {bytes: [], lang: [], colors: []};
    let copyColors = [...ChartColors];
    for (const codeByte of Object.entries(codeBytes.getList)) {
        const lang = codeByte[0] as string;
        const byte = codeByte[1] as number;

        if (copyColors.length <= 0) copyColors = [...ChartColors];
        const color = copyColors.shift();

        props.lang.push(lang)
        props.bytes.push(byte);
        props.colors.push(color || '#1C64F2');
    }

    return props
}