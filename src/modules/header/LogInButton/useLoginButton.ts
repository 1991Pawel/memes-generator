import { useState } from 'react';

export const useLoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return {
        isModalOpen,
        handleModalClose,
        handleModalOpen
    }
}