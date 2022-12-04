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
    addUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      console.log('Redux: ', state)
    },
    clearUser: state => {
      state.email = '';
      state.id = '';
      state.name = '';
      state.role = '';
      console.log('Redux: ', state)
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, changeRole, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
