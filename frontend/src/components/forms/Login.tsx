import { AUTH_TYPES } from 'schema'
import { authenticate } from '../../actions/authenticate'
import { AuthForm } from './AuthForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [responseMessage, setResponseMessage] = useState("")
  const navigate = useNavigate()

  return (
    <>
      <AuthForm actionText='Login' title='Login now' formSubmit={(data) => {
        authenticate(data, AUTH_TYPES.LOGIN).then(res =>{
          setResponseMessage(res?.message)
          if(res.token){
            localStorage.setItem("jwt", res.token)
            navigate('/')
          }
        }).catch(error => {
          setResponseMessage(error.message || error.name)
        })
      }} link={{ link: "/register", text: "Don't have an account? Signup!" }} />
      <p className='text-center'>{responseMessage}</p>
    </>
  )
}
