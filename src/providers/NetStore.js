import create from 'zustand'

export const useNetStore = create((set, get) => ({
    isConnected: null,
    netIcon: null,
    networkStatus: null,
    setIsConnected : (isConnected) => {
        set({isConnected})
        if(isConnected){
            set({netIcon: 'checkmark-circle-outline'})
            set({networkStatus: 'CONNECTED'})
        }else{
            set({netIcon: 'close-circle-outline'})
            set({networkStatus: 'DISCONNECTED'})
        }
    }
}));