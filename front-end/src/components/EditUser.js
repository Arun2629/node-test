import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import {EditTwoTone} from '@ant-design/icons'
import UserDataEditForm from './UserDataEditForm';
import { startEditUserData } from '../actions/usersAction';


const EditUser = (props) => {
const {data} = props
const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formSubmit = (formData, resetFields) => {
    dispatch(startEditUserData(data.key, formData, resetFields, handleCancel))
  };
  return (
    <>
      <Button type="link" 
              onClick={showModal} 
              icon={<EditTwoTone/>} 
              size='large'>
                Edit
      </Button><br/>
      <Modal  title="Edit User Data" 
              footer={null} 
              open={isModalOpen} 
              onCancel={handleCancel}>
          <UserDataEditForm formSubmit={formSubmit} data={data}/>
      </Modal>
    </>
  );
};
export default EditUser;