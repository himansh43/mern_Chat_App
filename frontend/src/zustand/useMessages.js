import {create} from "zustand"

const useMessages= create((set)=>({
    selectedUser: null,
	setSelectedUser: (selectedUser) => set({ selectedUser }),
    messages:[],
    setMessages:(messages) => set({ messages }),
}))

export default useMessages