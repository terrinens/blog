import React, {useState} from 'react';

interface TypeButtonProps {
    onTypeChange: (type: string) => void;
}

export function TypeButton({onTypeChange}: TypeButtonProps) {
    const [postType, setPostType] = useState('main');

    const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setPostType(selectedType);
        onTypeChange(selectedType);
    }

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="post_type" className="block text-lg font-medium text-gray-700">게시글 타입</label>
                <select
                    id="post_type"
                    value={postType}
                    onChange={handlePostTypeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="main">메인</option>
                    <option value="proj">프로젝트</option>
                </select>
            </div>

            <div>
                <label htmlFor="proj_type" className="block text-lg font-medium text-gray-700">프로젝트 타입</label>
                <select
                    id="proj_type"
                    disabled={postType !== 'proj'}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500 ${postType !== 'proj' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="team">팀 프로젝트</option>
                    <option value="personal">개인 프로젝트</option>
                </select>
            </div>
        </div>
    );
}

export const MainTemplate = `
---
title: Main template
timestamp: 2024-10-03 09:57:46.310752
tags: ["react", "mdx", "javascript"]
description: this is description!!
---

import MDXImage from "@_mdx-components/";

# Welcome to My Main Template!!
This is a sample document written in MDX (Markdown + JSX). MDX allows you to seamlessly mix Markdown and React components. Let's explore some features:
`

export const ProjTemplate = `
---
title: Proj template
timestamp: 2024-10-03 09:57:46.310752
start: 2022-02-07
end: 2023-04-02
tags: ["react", "java", "spring boot", "jwt"]
description: this is description!!
---

# Welcome to Proj Template!!
This is a sample document written in MDX (Markdown + JSX). MDX allows you to seamlessly mix Markdown and React components. Let's explore some features:
`