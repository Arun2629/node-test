import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetUser } from '../actions/usersAction'
import AdminPage from './AdminPage'

const MainContainer = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(startGetUser())
    }, [])

    return (
        <div>
           <AdminPage/>
        </div>
    )
}

export default MainContainer