"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

import {IStaticMethods} from "preline/preline";

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function ScriptsLoad() {
    const path = usePathname();

    useEffect(() => {
        const loadPreline = async () => {
            await import("preline/preline");
            window.HSStaticMethods.autoInit();

            const flowbite = await import('flowbite');
            flowbite.initFlowbite();
        };
        loadPreline();

    }, [path]);

    return null;
}