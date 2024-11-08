import React from 'react';

const Button = (labelName: string, handleFileChange) => (
    <div>
        <label className="border rounded p-2 bg-blue-500 text-white cursor-pointer">
            {labelName}
            <input
                type="file"
                accept=".mdx"
                onChange={handleFileChange}
                className="hidden"
            />
        </label>
    </div>
)

const MDXContentLoad = ({onFileLoad, labelName}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                onFileLoad(content);
            };
            reader.readAsText(file);
        }
    };

    return (
        Button(labelName, handleFileChange)
    );
};


export default MDXContentLoad;
