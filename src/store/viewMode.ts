import { create } from 'zustand'

type ViewMode = 'user' | 'admin'
type AdminPage = 'orders' | 'menu'

interface ViewModeStore {
  mode: ViewMode
  adminPage: AdminPage
  toggleMode: () => void
  setMode: (mode: ViewMode) => void
  setAdminPage: (page: AdminPage) => void
}

export const useViewModeStore = create<ViewModeStore>((set) => ({
  mode: 'user',
  adminPage: 'orders', // default admin page
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'user' ? 'admin' : 'user',
      adminPage: 'orders', // reset to orders view when switching to admin
    })),
  setMode: (mode) => set({ mode }),
  setAdminPage: (page) => set({ adminPage: page }),
}))
