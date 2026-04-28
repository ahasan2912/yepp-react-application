import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notMatchedData: [],
};

const notMatchSlice = createSlice({
    name: "notMatch",
    initialState,
    reducers: {
        setNotMatchedData: (state, action) => {
            state.notMatchedData = action.payload;
        },
    },
});

export const { setNotMatchedData } = notMatchSlice.actions;
export default notMatchSlice.reducer;