import React, {useState} from 'react';

interface TypeButtonProps {
    onTypeChange: (type: string) => void;
    onSave: (postType: string, projectType: string, projectName: string, apiName: string) => void;
}

export function TypeButton({onTypeChange, onSave}: TypeButtonProps) {
    const [postType, setPostType] = useState('main');
    const [projectType, setProjectType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [apiName, setApiName] = useState('');
    const [error, setError] = useState('');

    const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        if (selectedType !== postType) {
            setPostType(selectedType);
            onTypeChange(selectedType);

            if (selectedType !== 'proj') {
                setProjectType('');
                setProjectName('');
                setApiName('');
                setError('');
            } else {
                setProjectType('team');
            }
        }
    }

    const handleProjTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setProjectType(selectedType);
    }

    const handleProjNameChange = (e: React.ChangeEvent<HTMLInputElement>,) => {
        setProjectName(e.target.value);
        if (error) setError('');
    };

    const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiName(e.target.value);
    };

    const handleSubmit = () => {
        if (postType === 'proj' && !projectName) {
            setError('프로젝트 이름은 필수입니다.');
        } else {
            onSave(postType, projectType, projectName, apiName);
        }
    };


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
                    onChange={handleProjTypeChange}
                >
                    <option value="team">팀 프로젝트</option>
                    <option value="personal">개인 프로젝트</option>
                </select>
            </div>

            <div>
                <label htmlFor="proj_name" className="block text-lg font-medium text-gray-700">프로젝트 이름</label>
                <input
                    id="proj_name"
                    type="text"
                    disabled={postType !== 'proj'}
                    value={projectName}
                    onChange={handleProjNameChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500 ${postType !== 'proj' ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {error && <p className="mt-1 text-red-500">{error}</p>}
            </div>

            <div>
                <label htmlFor="document_type" className="block text-lg font-medium text-gray-700">문서</label>
                <input
                    id="document_type"
                    type="text"
                    disabled={postType !== 'proj'}
                    value={apiName}
                    onChange={handleDocumentTypeChange}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500 ${postType !== 'proj' ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>

            <button className='border border-black mb-5' onClick={handleSubmit}>저장</button>
        </div>
    );
}

const formatDate = (date: Date): string => {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day: string = String(date.getDate()).padStart(2, '0');
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');
    const milliseconds: string = String(date.getMilliseconds()).padStart(3, '0'); // 밀리초는 3자리로 맞춤

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const MainTemplate = `
---
title: Main template
mainImg: 
timestamp: ${formatDate(new Date(Date.now()))}
tags: []
description: this is Main template
---

# Welcome to My Main Template!!
This is a sample document written in MDX (Markdown + JSX). MDX allows you to seamlessly mix Markdown and React components. Let's explore some features:
`

export const ProjTemplate = `
---
title: Proj template
mainImg: 
timestamp: ${formatDate(new Date(Date.now()))}
start: 2022-02-07
end: 2023-04-02
tags: []
description: this is Proj template
---

# Welcome to Proj Template!!
This is a sample document written in MDX (Markdown + JSX). MDX allows you to seamlessly mix Markdown and React components. Let's explore some features:
`