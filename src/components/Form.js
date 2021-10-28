import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, DatePicker, Radio, InputNumber } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function Forms(props) {
    const [form] = Form.useForm();
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [rollno, setRollno] = useState();
    // const [dateofbirth, setDateofbirth] = useState();
    // const [gender, setGender] = useState();
    // const [allregistered, setAllRegistered] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({
            name: props.editdata.name ? props.editdata.name : '',
            email: props.editdata.email ? props.editdata.email : '',
            rollno: props.editdata.rollno ? props.editdata.rollno : '',
            gender: props.editdata.gender ? props.editdata.gender : '',
            allregistered: props.editdata.allregistered ? props.editdata.allregistered : '',
            dateofbirth: props.editdata.dateofbirth ? moment(props.editdata.dateofbirth).utc() : ''
        })

    }, [props])
    const onFinish = (values) => {
        if (Object.keys(props.editdata).length === 0 && props.editdata.constructor === Object) {
            axios.post('http://localhost:4000/students/create-student', values)
                .then(res => axios.get('http://localhost:4000/students/').then(res => dispatch({ type: 'StudentList', res: res.data })));
            form.resetFields();
        } else {
            axios.post('http://localhost:4000/students/update-student/' + props.editdata._id, values )
                .then(res => axios.get('http://localhost:4000/students/').then(res => dispatch({ type: 'StudentList', res: res.data })));
            form.resetFields();
            dispatch({type: 'Editdata', res: {}})
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Rollno"
                name="rollno"
                rules={[
                    {
                        type: 'number',
                        required: true,
                        pattern: new RegExp(/^[0-9]+$/)
                    },
                    () => ({
                        validator(_, value) {
                            if (!value) {
                                return Promise.reject();
                            }
                            if (isNaN(value)) {
                                return Promise.reject();
                            }
                            if (!new RegExp(/^[0-9]+$/)) {
                                return Promise.reject();
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="dateofbirth"
                label="DateOfBirth"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">FeMale</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="allregistered"
                valuePropName="checked"
                wrapperCol={{
                    offset: 4,
                    span: 8,
                }}
            >
                <Checkbox>All Registered</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    )
}

export default Forms
