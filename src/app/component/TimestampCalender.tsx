import React, {useState} from "react";

export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};


export default function TimestampCalender() {
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleDateTimeChange = (event) => {
        const dateTime = new Date(event.target.value); // 선택된 날짜와 시간을 Date 객체로 변환
        setSelectedDateTime(formatDateTime(dateTime)); // 포맷된 문자열로 저장
    };

    const handleCopy = () => {
        if (selectedDateTime) {
            navigator.clipboard.writeText(selectedDateTime)
        }
    };

    return (
        <div>
            <input
                type="datetime-local"
                onChange={handleDateTimeChange}
                className="border rounded p-2"
            />
            {selectedDateTime && (
                <div className="flex items-center justify-between mt-2">
                    <p className={'mr-4'}>선택된 날짜 및 시간: {selectedDateTime}</p>
                    <button
                        onClick={handleCopy}
                        className="bg-blue-500 text-white rounded px-4 py-2"
                    >
                        복사하기
                    </button>
                </div>
            )}
        </div>
    )
}