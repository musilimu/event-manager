import { AUTH_TYPES } from 'schema'
import { authenticate } from '../../actions/authenticate'
import { AuthForm } from './AuthForm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useToken } from '../../hooks/getToken'
import { queryClient } from '../../main'

export const Login = () => {
  const [responseMessage, setResponseMessage] = useState("")
  const navigate = useNavigate()
  const mutation = useMutation(authenticate, {
    onSuccess: () => {
      navigate('/')
      queryClient.invalidateQueries('tickets')
    },
    onError: (error: any) => {
      setResponseMessage(error.message || error.name)
    }
  })
  const token = useToken()
  useEffect(()=>{
    if (token)
      navigate('/')
  },[])


  return (
    <>
      <AuthForm actionText='Login' title='Login now' formSubmit={(data) => {
        mutation.mutateAsync({
          data,
          type: AUTH_TYPES.LOGIN
        })
      }} link={{ link: "/register", text: "Don't have an account? Signup!" }} />
      <p className='text-center'>{responseMessage}</p>
    </>
  )
}
