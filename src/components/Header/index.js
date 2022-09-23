import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import './index.css'

import logo from '../../assets/icons/qilabs'

const Header = ({ screem }) => {
	const navegar = useNavigate()
	const { signOut } = useContext(AuthContext)

	const handleSignIn = () => {
		// if (localStorage.getItem('userToken')) {
		// 	navegar('/home')
		// 	return
		// }
		navegar('/login')
	}

	const handleSignOut = () => {
		signOut()
		localStorage.removeItem('userToken')
		navegar('/')
	}

	const renderNavLinks = (screen) => {
		switch (screen) {
			case 'Main':
				return (
					<>
						<span onClick={() => navegar('/cadastrar')}>Cadastre-se </span>
						<span onClick={handleSignIn} ><strong>Entrar</strong></span>
					</>
				)

			case 'Home':
				return (
					<>
						<span onClick={() => navegar('/home')} ><strong>Minhas Coleções</strong></span>
						<span onClick={handleSignOut}>Sair</span>
					</>
				)

			case 'Login':
				return (
					<>
						<span onClick={() => navegar('/cadastrar')} ><strong>Cadastre-se</strong></span>
					</>
				)

			case 'Cadastro':
				return (
					<>
						<span onClick={handleSignIn} ><strong>Entrar</strong></span>
					</>
				)

			default:
				break
		}
	}

	return (
		<div className="Header">
			<div className='Header-logo'>
				<img src={logo} alt="QI LABS" />
				<h2>QI LABS</h2>
			</div>
			<div className='Header-btns'>
				{renderNavLinks(screem)}
			</div>
		</div>
	)
}

export default Header