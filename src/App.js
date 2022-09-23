import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import ColecaoContextProvider from './contexts/ColecaoContext';
import AuthContextProvider from './contexts/AuthContext';

// Components
import Inicial from './pages/Inicial';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Colecao from './pages/Colecao';
import Jogar from './pages/Jogar';
import EditarColecao from './pages/EditarColecao';
import EditarCartao from './pages/EditarCartao';

function App() {
  return (
    <AuthContextProvider>
      <ColecaoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inicial />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastrar' element={<Cadastro />} />
            <Route path='/home' element={<Home />} />
            <Route path='/colecao/:idColecao' element={<Colecao />} />
            <Route path='/colecao/:idColecao/jogar' element={<Jogar />} />
            <Route path='/colecao/:idColecao/gerenciar' element={<EditarColecao />} />
            <Route path='/colecao/:idColecao/:idCartao/gerenciar' element={<EditarCartao />} />
          </Routes>
        </BrowserRouter>
      </ColecaoContextProvider>
    </AuthContextProvider>
  )
}

export default App;
