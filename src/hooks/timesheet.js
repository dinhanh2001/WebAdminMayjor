import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimesheetRequest, getTimeSheetRequest } from '~/store/slices/timesheet';

const useTimesheetStore = () => {
  const dispatch = useDispatch();

  const timesheetState = useSelector((state) => state.timesheet);

  const dispatchUpdateTimeSheet = useCallback(
    (payload) => {
      console.log('hooks');
      dispatch(updateTimesheetRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetTimeSheet = useCallback(
    (payload) => {
      console.log('hooks');
      dispatch(getTimeSheetRequest(payload));
      return true;
    },
    [dispatch]
  );
  return {
    timesheetState,
    dispatchUpdateTimeSheet,
    dispatchGetTimeSheet
  };
};

export { useTimesheetStore };
