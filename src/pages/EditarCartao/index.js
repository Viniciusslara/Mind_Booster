import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ColecaoContext } from '../../contexts/ColecaoContext'

import CustomButton from '../../components/CustomButton'
import Header from '../../components/Header'

import './index.css'

const EditarCartao = () => {
  // Recuperar o param idColecao da URL
  const { idColecao, idCartao } = useParams()
  const navigate = useNavigate()
  // Context
  const { userData } = useContext(AuthContext)
  const { criarCartao } = useContext(ColecaoContext)
  // States
  const [action, setAction] = useState()
  const [colecaoId, setColecaoId] = useState(idColecao)
  const [cartaoId, setCartaoId] = useState(idCartao)
  // Form states
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  const handlePressCreate = () => {
    const _card = {
      id: Math.random().toString(),
      front: front,
      back: back,
    }

    criarCartao(colecaoId, _card)

    navigate('/home')
  }

  const handlePressUpdate = () => {}
  
  useEffect(() => {
    const _action = idCartao
    if (_action === 'novo') {
      setAction('criar')
    } else {
      setAction('editar')
    }
  }, [])

  return (
    <>
      <Header screem='Home' />

      <div className="EditarCartao container mt-5">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="content">
              <div className='headerMainWrapper'>
                <div className='header'>
                  <div className='headerText'>Preencha os dados do cartão</div>
                </div>
                <div className='main'>
                  <div className='form'>
                    <div className="formRow topRow">
                      <div className='rowContent'>
                        <div className='label'>Frente</div>
                        <div className='titleWrapper'>
                          <input
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            placeholder='Digite aqui...'
                            className='textInput'
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formRow bottomRow">
                      <div className='rowContent'>
                        <div className='label'>Verso</div>
                        <div className='titleWrapper'>
                          <input
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            placeholder='Digite aqui...'
                            className='textInput'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CustomButton
                  label={action === 'criar' ? 'Cadastrar' : 'Atualizar'}
                  state='primary'
                  onClick={action === 'criar' ? handlePressCreate : handlePressUpdate}
                />
              </div>
              <div className='footer'>
                <CustomButton
                  label='Cancelar'
                  state='secondary'
                  onClick={() => navigate(-1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditarCartao
