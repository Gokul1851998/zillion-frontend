import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice ({
    name:'admins',
    initialState:{
        admin : null,
    },
    reducers: {
        setAdmin : (state,action) => {
            state.admin = action.payload 
        }
    }
})

export const {setAdmin} = adminSlice.actions;

export default adminSlice.reducer;