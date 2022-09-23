import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from "../../components/Header"
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../contexts/AuthContext'

import firebase from '../../config/firebase'

import './index.css'

const Login = () => {
	const navegar = useNavigate()
	// Context
	const { signIn } = useContext(AuthContext)
	// Form states
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// Aux states
	const [isLoading, setIsLoading] = useState(false)
	const [feedbackMsg, setFeedbackMsg] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)

		// Fazer autenticacao no Firebase Auth
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(userCredential => {
				const { user } = userCredential
				user.getIdToken()
					.then(token => {
						signIn({
							userToken: token,
							uid: user.uid
						})
						// Login com sucesso, salvar token em localStorage e ir para tela inicial
						localStorage.setItem('userToken', token)
						navegar('/home')
					})
					.catch(error => {
						console.error('Erro ao tentar recuperar token id: ', error)
						setFeedbackMsg(error.message)
					})
			})
			.catch(error => {
				console.error('Erro ao tentar logar: ', error)
				setFeedbackMsg(error.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const renderFeedbackMsg = (msg) => {
		return (
			<div className='my-3'>
				<p className='mensagem-erro'>{msg}</p>
			</div>
		)
	}

	return (
		<>
			<Header screem='Login' />

			<div className="Login container mt-4">
				<div className="row justify-content-center">
					<div className="col-6">
						<h1>Login</h1>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="inputEmail" className="form-label">Email</label>
								<input
									value={email}
									type="email"
									className="form-control"
									id="inputEmail"
									placeholder='Insira seu email'
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="inputPassword" className="form-label">Senha</label>
								<input
									value={password}
									type="password"
									className="form-control"
									id="inputPassword"
									placeholder='Insira sua senha'
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							{feedbackMsg && renderFeedbackMsg(feedbackMsg)}

							<CustomButton label={isLoading ? 'Carregando...' : 'Entrar'} state='primary' />
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
