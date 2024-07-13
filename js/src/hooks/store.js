import { create } from "zustand";
import { persist } from "zustand/middleware"

// const useStore = create((set) => ({
//   count: 0,
//   selectedButton: null,

//   setSelectedButton: (button) => set({ selectedButton: button }),
//   incrementCount: () => set((state) => ({ count: state.count + 1 })),
//   removeCount: () => set({ count: 0 }),
// }));

const useLoginStore = create(persist(
  ( set ) => ({
    siteNumId: 0,
    siteUserId: null,
    siteUserName: null,
    userImg: null,
    acsTkn: null,



    setSiteUserId: ( info ) => set({
      siteNumId: info.item._id,
      siteUserId: info.item.email,
      siteUserName: info.item.name,
      userImg: info.item.profileImage.path,
      acsTkn: info.item.token.accessToken
      }),
    }),

    {name : "setPersist"}));
export default useLoginStore;