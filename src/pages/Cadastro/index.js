import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import firebase from '../../config/firebase'

import Header from "../../components/Header"
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../contexts/AuthContext'

import './index.css'

const Cadastro = () => {
  const navegar = useNavigate()
  // Context
  const { signUp } = useContext(AuthContext)
  // States
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  // Aux states
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar campos do formulario
    const validationResponse = validateForm({ password, passwordConfirm })
    if (validationResponse !== 'OK') {
      setFeedbackMsg(validationResponse)
      return
    }

    setIsLoading(true)

    // Fazer autenticacao no Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const { user } = userCredential
        user.getIdToken()
          .then(token => {
            signUp({
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
        console.error('Erro ao criar nova conta: ', error)
        setFeedbackMsg(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const validateForm = (fields) => {
    const { password, passwordConfirm } = fields

    if (password !== passwordConfirm) {
      return 'Senhas não conferem.'
    }

    // se passar em todas as validacoes, retornar true
    return 'OK'
  }

  const renderFeedbackMsg = (msg) => {
    return (
      <div className='my-3'>
        <p className='mensagem-erro'>{msg}</p>
      </div>
    )
  }

  return (
    <div>
      <Header screem="Cadastro" />

      <div className="cadastro">
        <h1>Cadastre-se</h1>
        <p className="descricao">Como a sua conta, você poderá gerenciar suas coleções em flash cards.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input value={username} name="name" placeholder="Insira o seu nome completo" type="text" onChange={e => setUsername(e.target.value)} required />

          <label htmlFor="email">E-mail</label>
          <input value={email} name="email" placeholder="Insira o seu e-mail" type="email" onChange={e => setEmail(e.target.value)} required />

          <label htmlFor="password">Senha</label>
          <input value={password} name="password" type="password" onChange={e => setPassword(e.target.value)} required />
          <p className="condicaosenha">Use ao menos 8 caracteres contendo letras, números e ao menos um caracter especial</p>

          <label htmlFor="repeat-password">Repetir a Senha</label>
          <input value={passwordConfirm} name="repeat-password" type="password" onChange={e => setPasswordConfirm(e.target.value)} required />

          {feedbackMsg && renderFeedbackMsg(feedbackMsg)}

          <CustomButton label={isLoading ? 'Carregando...' : 'Cadastrar'} state='primary' />
        </form>
      </div>
    </div>
  )
}

export default Cadastro