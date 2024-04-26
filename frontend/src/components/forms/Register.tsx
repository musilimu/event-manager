import { AUTH_TYPES, SERVER_URL } from 'schema'
import { AuthForm } from './AuthForm'
import { useState } from 'react'
import { authenticate } from '../../actions/authenticate'


export const Register = () => {
  const [responseMessage, setResponseMessage] = useState("")

  return (
    <>
      <AuthForm actionText='sign up' title='Register' formSubmit={(data) => {
        authenticate(data, AUTH_TYPES.REGISTER).then(res => {
          setResponseMessage(res.message || res.name)
        }).catch(error => {
          setResponseMessage(error.message || error.name)
        })
      }} link={{ link: "/login", text: "Have an account? Login!" }} />
      <p className='text-center'>{responseMessage}</p>
    </>
  )
}
