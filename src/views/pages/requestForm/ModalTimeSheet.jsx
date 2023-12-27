import { useEffect } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'antd';
import { useTimesheetStore } from '../../../hooks/timesheet';
import { Badge } from 'antd';

const ModalTimeSheet = ({ id, open, setOpen }) => {
  const { dispatchGetTimeSheet, timesheetState } = useTimesheetStore();
  const { t } = useTranslation();

  useEffect(() => {
    dispatchGetTimeSheet(id);
  }, [dispatchGetTimeSheet, id]);

  const handleCancel = useCallback(() => {
    // formik.handleReset();
    setOpen(false);
  }, [setOpen]);

  const cellData = useCallback(
    (date) => {
      return timesheetState?.timesheetUser?.map((value) => {
        // console.log(value);
        if (new Date(value?.datetime).getMonth() === new Date(date).getMonth())
          if (new Date(value?.datetime).getDate() === new Date(date).getDate())
            return (
              <div key={value?.id} style={{ display: 'flex' }}>
                <Badge status={value?.status === 'out' ? 'success' : 'warning'} style={{ fontSize: 10 }} size="small" />
                <p style={{ fontSize: 12, marginLeft: 3 }}>{value?.name}</p>
              </div>
            );
      });
    },
    [timesheetState?.timesheetUser]
  );

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.timesheet.title')}
        // onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="1000px"
        okText={t('modal.user.submitEditUser')}
        cancelText={t('modal.user.cancel')}
      >
        <Calendar cellRender={cellData} />
      </Modal>
    </>
  );
};

export default memo(ModalTimeSheet);
