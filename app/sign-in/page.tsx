import LoginForm from '@/components/auth/login/form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

const Login = () => <LoginForm />

export default Login
