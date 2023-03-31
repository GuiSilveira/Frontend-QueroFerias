import { create } from 'zustand'
import { UserState } from '../types/types'

export const useUserDataStore = create<UserState>((set) => ({
    userData: {},
    setUserData: (userData: any) => set({ userData }),
}))
