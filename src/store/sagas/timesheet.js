import { put, call, takeLatest } from 'redux-saga/effects';
import { requestUpdateTimeSheetApi, requestGetTimeSheetByUser } from '../../api/timesheet';
import {
  updateTimesheetFailt,
  updateTimesheetSuccess,
  updateTimesheetRequest,
  getTimeSheetFailt,
  getTimeSheetSuccess,
  getTimeSheetRequest
} from '~/store/slices/rootAction';

function* requestUpdateTimeSheetSaga(action) {
  try {
    console.log('sagas');
    const data = yield call(requestUpdateTimeSheetApi, action.payload);
    yield put(updateTimesheetSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(updateTimesheetFailt(error?.message || 'Update explain info failed!'));
  }
}
function* requestGetTimeSheetSage(action) {
  try {
    const data = yield call(requestGetTimeSheetByUser, action.payload);
    // console.log('sagas', data);
    yield put(getTimeSheetSuccess(data));
  } catch (error) {
    yield put(getTimeSheetFailt(error?.message || 'get all time get failt'));
  }
}
export default function* watchTimesheet() {
  yield takeLatest(updateTimesheetRequest.type, requestUpdateTimeSheetSaga);
  yield takeLatest(getTimeSheetRequest.type, requestGetTimeSheetSage);
  // Khi sua explain thành công hoặc xóa organization thành công thì đều gọi lại requestExplain để cập nhật lại list
  //   yield takeLatest([updateTimesheetSuccess.type, updateExplainSuccess.type], requestAllExplainsSaga);
}
