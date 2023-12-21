import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  timesheetUser: []
};

export const Timesheet = createSlice({
  name: 'Timesheet',
  initialState,
  reducers: {
    updateTimesheetRequest: () => {
      // dispatchToast('success', action.payload);
    },
    updateTimesheetSuccess: (_, action) => {
      dispatchToast('success', action.payload);
    },
    updateTimesheetFailt: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getTimeSheetRequest: () => {
      // console.log('state slice', state);
      // console.log('action action', action);
    },
    getTimeSheetSuccess: (state, action) => {
      const { results } = action.payload;
      state.timesheetUser = results;
      dispatchToast('success', action.payload);
    },
    getTimeSheetFailt: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const {
  updateTimesheetSuccess,
  updateTimesheetFailt,
  updateTimesheetRequest,
  getTimeSheetFailt,
  getTimeSheetSuccess,
  getTimeSheetRequest
} = Timesheet.actions;

export default Timesheet.reducer;
