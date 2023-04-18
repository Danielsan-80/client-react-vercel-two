import { useState } from "react";
import {useAuthContext} from './useAuthContext'


export const useSignupLogin = ()=> {
    const [error, setError]= useState(null)
    const [isLoading, setIsLoading]= useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (name, email, password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        
        const json = await response.json()
        

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the user jsonweb token and email to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the AuthContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    const login = async (email, password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the user jsonweb token and email to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the AuthContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, login, isLoading, error}
}

