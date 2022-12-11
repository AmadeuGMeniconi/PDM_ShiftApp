import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: '',
  uid: '',
  name: '',
  role: '',
  tasks: []
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.tasks = action.payload.tasks;
      console.log('Redux: ', state)
    },
    clearCurrentUser: state => {
      state.email = '';
      state.uid = '';
      state.name = '';
      state.role = '';
      state.tasks = []
      console.log('Redux: ', state)
    },
    setCurrentUserTasks: (state, action) => {
      state.tasks = action.payload;
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
export const { setCurrentUserTasks, setCurrentUser, changeCurrentUserRole, changeCurrentUserName, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
