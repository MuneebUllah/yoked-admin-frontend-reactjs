import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSidebarExpanded: true,
  name: localStorage.getItem('name') || '',
  email: 'admin@gmail.com',
  activeButton: 'Posts',
  activeButtonReel: 'Posts',
  activeButtonSaved: 'Posts',
  activeReportButton:'posts',
  unReadNotificationCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    expandSidebar(state) {
      state.isSidebarExpanded = true;
    },
    unexpandSidebar(state) {
      state.isSidebarExpanded = false;
    },
    updateProfile(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setActiveButton(state, action) {
      state.activeButton = action.payload;
    },
    setActiveButtonReel(state, action) {
      state.activeButtonReel = action.payload;
    },
    setActiveReportButton(state, action) {
      state.activeReportButton = action.payload;
    },
    setActiveButtonSaved(state, action) {
      state.activeButtonSaved = action.payload;
    },
    setunReadNotificationCount(state, action) {
      state.unReadNotificationCount = action.payload;
    },
  },
});

export const { startLoading, stopLoading,setActiveButtonReel , setunReadNotificationCount , setActiveButtonSaved, expandSidebar, unexpandSidebar, updateProfile, setReadNotificationCount, setActiveButton ,setActiveReportButton} = userSlice.actions;

export function setSideBarOpened() {
  return async () => {
    dispatch(userSlice.actions.expandSidebar());
  };
}

export function setSideBarClosed() {
  return async () => {
    dispatch(userSlice.actions.unexpandSidebar());
  };
}

export const updateProfileAsync = (profile) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(updateProfile(profile));
    }, 1000);
  };
};



export default userSlice.reducer;