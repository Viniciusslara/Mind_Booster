import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ColecaoContext } from '../../contexts/ColecaoContext'

import Header from '../../components/Header'
import Flashcard from '../../components/Flashcard'
import CustomButton from '../../components/CustomButton'

import './index.css'

const Jogar = () => {
  const navigate = useNavigate()
  const { idColecao } = useParams()
  const { colecoes } = useContext(ColecaoContext)

  const [isFlipped, setIsFlipped] = useState(false)
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Recuparar a colecao do ColecaoContext
    // com base no id da colecao passado por parametro na URL
    // e entao guardar em state a lista de flashcards daquela Colecao
    const _colecao = colecoes.find(colecao => colecao.id === idColecao)
    setCards([..._colecao.cardsList])
  }, [idColecao, colecoes])

  return (
    <>
      <Header screem='Home' />

      <div className="Jogar container mt-5">
        <div className="row">
          <div className="col">
            <div className='body-container'>
              <div className='body'>
                {cards.length > 0
                  ? <>
                    <div className='header'>
                      <div className='counter'>Cartão {`${index + 1}/${cards.length}`}</div>
                    </div>
                    <div className='main'>
                      <Flashcard
                        card={cards[index]}
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div className='footer'>
                      {(index === (cards.length - 1)) && (isFlipped)
                        ? (
                          <CustomButton label='Finalizar' state='secondary' onClick={() => navigate(-1)} />
                        )
                        : (
                          <CustomButton
                            label={isFlipped ? 'Próximo' : 'Virar'}
                            state='primary'
                            onClick={isFlipped
                              ? (() => {
                                setIndex(index + 1)
                                setIsFlipped(false)
                              })
                              : (() => setIsFlipped(!isFlipped))}
                          />
                        )
                      }
                    </div>
                  </>
                  : <div>Não existem flashcards ainda.</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Jogar
