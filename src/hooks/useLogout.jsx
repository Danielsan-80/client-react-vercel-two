import { useAuthContext } from "./useAuthContext"

export const useLogout = ()=>{

    const {dispatch} = useAuthContext()

    const logout = () => {
        //remove user data from storage
        localStorage.removeItem('user')

        //remove the user from context
        dispatch({type: 'LOGOUT'})

    }

    return {logout}

}