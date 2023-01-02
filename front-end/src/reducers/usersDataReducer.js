const usersDataInitialValue = []

const usersDataReducer = (state=usersDataInitialValue, action) => {
    switch(action.type) {
        case "SET_USERS_DATA": {
            return [...action.payload]
        }
        case 'DELETE_USER_DATA': {
            return state.filter((user) => {
                return user._id !== action.payload._id
            })
        }
        case 'UPDATE_USER_DATA': {
            return state.map((user) => {
                if(user._id === action.payload._id){
                    return {...user, ...action.payload}
                }else{
                    return {...user}
                }
            })
        }

        default: {
            return [...state]
        }
    }

}

export default usersDataReducer