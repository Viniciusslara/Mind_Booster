import { useContext, useEffect } from 'react'
import { ColecaoContext } from '../../contexts/ColecaoContext'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
// Componentes
import Header from "../../components/Header";
import ItemColecao from "../../components/ItemColecao";

import './index.css'

const Home = () => {
  const { userData } = useContext(AuthContext)
  const { colecoes, monitorarColecoes, deletarColecao } = useContext(ColecaoContext)

  const navigate = useNavigate()

  useEffect(() => {
    // Monitorar mudancas ao vivo do Firestore e guardar em ColecaoContext
    const unsub = monitorarColecoes(userData.uid)

    return () => {
      // Se desinscrever de monitorarColecoes quando componente desmontar
      unsub()
    }
  }, [])

  const handlePressDelete = (idColecao) => {
    const retVal = window.confirm('Tem certeza que gostaria de remover esta colecao?')
    if (retVal) {
      deletarColecao(idColecao)
    }
  }

  return (
    <div>
      <Header screem="Home" />

      <div className="home">
        <button
          onClick={() => navigate('/colecao/novo/gerenciar')}
          type="button"
          className="btn btn-primary"><b>Nova Coleção</b>
        </button>

        {/* Listagem com os itens de cada colecao */}
        <div className="container-colecoes">
          {
            colecoes.length > 0
              ? (
                colecoes.map(colecao => {
                  return <ItemColecao colecao={colecao} key={colecao.id} onPressDelete={handlePressDelete} />
                })
              )
              : (<p>Nenhuma colecao ainda</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default Home