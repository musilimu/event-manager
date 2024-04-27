import { AUTH_TYPES } from 'schema'
import { AuthForm } from './AuthForm'
import { useState } from 'react'
import { authenticate } from '../../actions/authenticate'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'


export const Register = () => {
  const [responseMessage, setResponseMessage] = useState("")
  const navigate = useNavigate()
  const mutation = useMutation(authenticate, {
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error: any) => {
      setResponseMessage(error.message || error.name)
    }
  })
  return (
    <>
      <AuthForm actionText='sign up' title='Register' formSubmit={(data) => {
        mutation.mutateAsync({
          data,
          type: AUTH_TYPES.REGISTER
        })
      }} link={{ link: "/login", text: "Have an account? Login!" }} />
      <p className='text-center'>{responseMessage}</p>
    </>
  )
}
