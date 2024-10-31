'use client'

import {useState} from "react";

export function ImageUploadButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                모달 열기
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}/>
        </>
    );
}


const Modal = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
                <h2 className="text-lg font-bold mb-4">모달 제목</h2>
                <p className="mb-4">여기에 모달 내용을 추가하세요.</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}