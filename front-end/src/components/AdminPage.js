import React, {useEffect} from 'react'
import { startGetUsersData} from '../actions/usersAction'
import {Table, Button, Image} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import {  useDispatch, useSelector } from 'react-redux'
import { startDeleteUserData } from '../actions/usersAction'
import EditUser from './EditUser'


const AdminPage = (props) => {
    const usersData = useSelector((state) => {
        return state.usersData
    })
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetUsersData())
    }, [dispatch])
    const originData = [];
        for (let i = 0; i < usersData.length; i++) {
           
                originData.push({
                    key: usersData[i]._id,
                    index: i + 1,
                    name: usersData[i].name,
                    mobile: usersData[i].mobile,
                    username: usersData[i].username,
                    image: usersData[i].image
                });
            
        
        }
          
        const handleClick = (id) => {
           dispatch(startDeleteUserData(id))
        }

          const columns = [ 
            { 
                title: 'S.No',
                dataIndex: 'index',
                width: '25%'
              },
            {
              title: 'Name',
              dataIndex: 'name',
              width: '25%',
            },
            {
              title: 'E-mail/Username',
              dataIndex: 'username',
              width: '25%',
            },
            {
              title: 'Mobile',
              dataIndex: 'mobile',
              width: '25%',
            },
            {
                title: 'Image',
                dataIndex: 'image',
                render: (_, record) => 
                    <Image src={record.image}/>
              },
              {
                title: 'Action',
                dataIndex: 'operation',
                render: (_, record) =>
                    <div>
                        <EditUser data={record}/>
                        <Button type='link' 
                                name='delete' 
                                htmlType='button' 
                                icon={<DeleteOutlined/>} 
                                danger 
                                onClick={(e) => {handleClick(record.key)}}>
                                    Delete
                        </Button>
                        
                    </div>
                        
                  
              },
           
          ];
          const mergedColumns = columns.map((col) => {
              return col;
          })
            
    

    return (
      <div className='table-container'>
      <a href='http://localhost:3033/users-data-download' download>Download pdf</a>
      <Table
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination
      />
      </div>
    )
}


export default AdminPage