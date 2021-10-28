import React, { useEffect, useState } from 'react'
import { Table, Space, Modal } from 'antd';
import {  useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function StudList() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editid, seteditId] = useState()
    const state = useSelector(state => state.students)
    console.log("state", state);
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:4000/students/').then(res => dispatch({ type: 'StudentList', res: res.data }));
    }, [])

    const handleOk = () => {
        axios.delete('http://localhost:4000/students/delete-student/' + editid).then(res => axios.get('http://localhost:4000/students/').then(res => dispatch({ type: 'StudentList', res: res.data })));
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deletebtn = (id) => {
        seteditId(id.id)
        setIsModalVisible(true);
    }

    const editbtn = (id) => {
        console.log("id", id);

        axios.get('http://localhost:4000/students/edit-student/' + id.id).then(res => dispatch({ type: 'Editdata', res: res.data }));
    }

    const viewbtn = (id) => {
        axios.get('http://localhost:4000/students/edit-student/' + id.id).then(res => dispatch({ type: 'Viewdata', res: res.data }));
        history.push('/view')
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'RollNo',
            dataIndex: 'rollno',
            key: 'rollno',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gendar',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'DateOfBirth',
            key: 'dateofbirth',
            dataIndex: 'dateofbirth',
        },
        {
            title: 'All Registered',
            key: 'allregistered',
            dataIndex: 'allregistered',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <button onClick={() => viewbtn(record)}>View</button>
                    <button onClick={() => editbtn(record)}>Edit</button>
                    <button onClick={() => deletebtn(record)}>Delete</button>
                </Space>
            ),
        },
    ];

    const data = state?.length > 0 && state?.map((item, i) => {
        return {
            id: item?._id,
            name: item?.name,
            rollno: item?.rollno,
            email: item?.email,
            gender: item?.gender,
            dateofbirth: item?.dateofbirth,
            allregistered: JSON.stringify(item?.allregistered)
        }
    })
    return (
        <div>
            <Table columns={columns} dataSource={data} />

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to delete this record?</p>
            </Modal>
        </div>
    )
}

export default StudList
