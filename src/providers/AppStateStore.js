import create from 'zustand'

export const useAppStateStore = create((set, get) => ({
    currentAppState: null,
    setCurrentAppState: (currentAppState) => set({currentAppState})
}));