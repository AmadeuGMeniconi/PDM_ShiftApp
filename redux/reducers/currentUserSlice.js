import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  name: '',
  role: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      console.log('Redux: ', state)
    },
    clearCurrentUser: state => {
      state.email = '';
      state.id = '';
      state.name = '';
      state.role = '';
      console.log('Redux: ', state)
    },
    changeCurrentUserRole: (state, action) => {
      state.role = action.payload;
      console.log('Redux: ', state)
    },
    changeCurrentUserName: (state, action) => {
      state.name = action.payload;
      console.log('Redux: ', state)
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, changeCurrentUserRole, changeCurrentUserName, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
