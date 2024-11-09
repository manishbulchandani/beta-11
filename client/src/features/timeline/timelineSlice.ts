// timelineSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Timeline } from "./timelineTypes";

interface timelineState {
  timeline: Timeline | null;
  isAuthenticated: boolean;
}

const initialState: timelineState = {
  timeline: null,
  isAuthenticated: false,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    // settimeline(state, action: PayloadAction<timeline>) {
    //   state.timeline = action.payload;
    //   state.isAuthenticated = true;
    // },
    // logouttimeline(state) {
    //   state.timeline = null;
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginThunk.fulfilled, (state, action) => {
    //   state.timeline = action.payload;
    //   state.isAuthenticated = true;
    // });
    // builder.addCase(gettimelineThunk.fulfilled,(state,action)=>{
    //   state.isAuthenticated=true;
    //   state.timeline=action.payload
    // })
  },
});

// export const { settimeline, logouttimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
