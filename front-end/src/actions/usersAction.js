import axios from 'axios'
import swal from 'sweetalert'

export const startRegisterUser = (formData, resetFields) => {

    return async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:3033/users/register', formData)
            swal("Successfully Registered")
            resetFields()
        }catch(e){
            alert(e.message)
        }
    }
}

export const startLoginUser = (formData, redirectHome) => {

    return async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:3033/users/login', formData)
            const data = response.data
            localStorage.setItem('token', data.token)
            dispatch(setUser(data.user))
            redirectHome()
        }catch(e) {
            alert(e.message)
        }
    }
}

export const startGetUser = () => {

    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3033/users/data', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            const data = response.data
            dispatch(setUser(data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const startGetUsersData = () => {

    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3033/users', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            const data = response.data 
            dispatch(setUsersData(data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const startDeleteUserData = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:3033/users/${id}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        const data = response.data
        console.log(data)
        dispatch(deleteUserData(data))
    }
}

export const startEditUserData = (id, formData, resetFields, handleCancel) => {

    return async (dispatch) => {
        const response = await axios.put(`http://localhost:3033/users/${id}`, formData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        const data = response.data
        dispatch(updateUserData(data))
        resetFields()
        handleCancel()
    }
}


export const setUser = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}

const setUsersData = (data) => {
    return {
        type: "SET_USERS_DATA",
        payload: data
    }
}

const deleteUserData = (data) => {
    return {
        type: 'DELETE_USER_DATA',
        payload: data
    }
}

const updateUserData = (data) => {
    return {
        type: 'UPDATE_USER_DATA',
        payload: data
    }
}