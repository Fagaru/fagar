import { create } from 'zustand';

interface useBookingDurationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useBookingDurationModal = create<useBookingDurationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));