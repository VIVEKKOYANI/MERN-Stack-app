import React from 'react'
import Forms from './Form'
import StudList from './StudList'
import { useSelector } from 'react-redux';

function MainComponent() {
    const editdata = useSelector(state => state.editdata);
    return (
        <div>
            <Forms editdata={editdata} />
            <StudList  />
        </div>
    )
}

export default MainComponent
