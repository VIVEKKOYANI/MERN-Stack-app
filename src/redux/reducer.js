import { REHYDRATE } from 'redux-persist';

const initState = {
    students: [],
    editdata: {},
    Viewdata:{},
    edit: false
}
function reducer(state = initState, action) {
    switch (action.type) {
        case 'StudentList':
            return {
                ...state,
                students: action.res
            }
        case 'Editdata':
            return {
                ...state,
                editdata: action.res,
                edit: false
            }
        case 'Viewdata':
            return {
            ...state,
                viewdata: action.res,
            }
        case REHYDRATE:
            return {
                ...state,
                students: action.payload ? action.payload.students : [],
                editdata: action.payload ? action.payload.editdata : {},
                viewdata: action.payload ? action.payload.viewdata : {}, 
                edit: action.payload ? action.payload.edit : false
            }
        default:
            return {
                ...state,
            }
    }
}

export default reducer
