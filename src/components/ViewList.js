import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'antd';
import moment from 'moment';

function ViewList() {
    const view = useSelector(state => state.viewdata)

    useEffect(() => { }, [view])
    return (
        <div className="site-card-border-less-wrapper">
            <Card title={view?.name} bordered={false} style={{ width: 300 }}>
                <p>email:  {view?.email}</p>
                <p>rollno: {view?.rollno}</p>
                <p>dateofbirth: {moment(view?.dateofbirth).format('YYYY-MM-DD')}</p>
                <p>gender: {view?.gender}</p>
                <p>allregistered: {JSON.stringify(view?.allregistered)}</p>
            </Card>
        </div>
    )
}

export default ViewList
