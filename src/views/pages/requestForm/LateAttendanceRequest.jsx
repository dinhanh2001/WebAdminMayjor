import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { DataTable } from '~/ui-component/molecules';
import IconButton from '@mui/material/IconButton';
import { AiFillEye } from 'react-icons/ai';
import styled from 'styled-components';
import { Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import Pagination from '@mui/material/Pagination';
import { useUsersStore } from '~/hooks/users';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import ModalTimeSheet from './ModalTimeSheet';
import { useTimesheetStore } from '../../../hooks/timesheet';
const PatrolRequestPage = () => {
  const { t } = useTranslation();
  const { usersState, dispatchGetAllUsers } = useUsersStore();
  const { timesheetState } = useTimesheetStore();
  const [page, setPage] = useState(1);
  const [openModal, setopenModal] = useState(false);
  const [idUser, setIdUser] = useState('');
  useEffect(() => {
    dispatchGetAllUsers(idUser);
  }, [dispatchGetAllUsers, idUser]);

  useEffect(() => {
    setPage(usersState.pagination.currentPage);
  }, [usersState.pagination.currentPage]);

  const users = useMemo(() => {
    return usersState.users?.filter((item) => item?.role === 'user');
  }, [usersState.users]);
  // console.log(users);
  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllUsers({ params: { page: value } });
      setPage(value);
    },
    [dispatchGetAllUsers]
  );

  const handleShow = useCallback((params) => {
    setIdUser(params?.row?.id);
    setopenModal(true);
  }, []);
  const handleHide = useCallback(() => {
    setopenModal(false);
  }, []);
  const columns = [
    { field: 'username', headerName: t('table.user.username'), flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: t('table.user.name'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: t('table.user.email'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'role', headerName: t('table.user.role'), flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: t('table.timesheet.action'),
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleShow(params)}>
            {/* <IconButton aria-label="delete">
              <MdDelete color="tomato" size={22} />
            </IconButton>{' '} */}
            <AiFillEye />
            {/* <AiFillEdit size={22} /> */}
          </IconButton>
          {/* <Popconfirm
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(params)}
            okText="Đồng ý"
            cancelText="Hủy"
          ></Popconfirm> */}
        </>
      ),
      flex: 2,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  return (
    <MainCard>
      <DataTableWrapper>
        <DataTable columns={columns} rows={users} checkboxSelection={false} />
      </DataTableWrapper>
      {/* <PaginationWrapper>
        <Pagination count={usersState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper> */}
      <ModalTimeSheet
        id={idUser}
        open={openModal ?? openModal}
        setOpen={handleHide}
        // handleChangeEditPasswordModal={handleHide}
      />
    </MainCard>
  );
};

// const ControlBar = styled.div`
//   width: 100%;
//   height: fit-content;
//   padding-bottom: 16px;
//   position: relative;
//   justify-content: flex-end;
//   display: flex;
//   flex-direction: row;

//   & > Button {
//     margin: 0 8px;
//   }
// `;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0 0;
`;

export default memo(PatrolRequestPage);
