import { create } from 'zustand';

interface useBookingModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useBookingModal = create<useBookingModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));