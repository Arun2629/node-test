import React from 'react'
import {useHistory, withRouter} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Menu } from 'antd'
import swal from 'sweetalert'

const NavBar = (props) => {
    const history = useHistory()

    const user = useSelector((state) => {
        return state.user
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        swal("Logged Out Successfully!")
            .then((value) => {
                props.history.push('/')
            });
        
    }

    return (
        <div className='main-container'>  
        <Menu
        onClick={({key}) => {
            history.push(key)
        }}
        
        items={[{label: <div>Logo</div>, disabled: true},
                props.location.pathname === '/' && {label: "Registration", key: "/register"}, 
                props.location.pathname === '/register' && {label: "Login", key: "/"},
                props.location.pathname === '/home' && {label: <div>Welcome {user.username}</div>, disabled: true},
                props.location.pathname === '/home' && {label: <Button type='link' danger onClick={handleLogout}>Logout</Button>}
                ]}

        defaultActiveFirst={['/']}
        selectedKeys={[props.location.pathname]}
        mode='horizontal'
        >

        </Menu>
       
    </div>
    )
}

export default withRouter(NavBar)