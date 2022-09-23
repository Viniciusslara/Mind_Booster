import { useEffect, useContext, useState } from "react";
import { ColecaoContext } from "../../contexts/ColecaoContext";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import ItemListaColecao from "../../components/ItemListaColecao";
import CustomButton from "../../components/CustomButton";

import './index.css'

const Colecao = () => {
  // Referenciar Context Colecao
  const { colecoes, deletarCartao } = useContext(ColecaoContext)
  // Recuperar o param idColecao da URL
  const { idColecao } = useParams()
  const navigate = useNavigate()

  const [colecao, setColecao] = useState()
  const [cartoes, setCartoes] = useState([])
  const [cartoesFiltrados, setCartoesFiltrados] = useState([])
  const [filter, setFilter] = useState('')

  const handleChangeText = (value) => {
    setFilter(value)

    const cartoesFiltrados = cartoes.filter(card => {
      return card.front
        .toLowerCase()
        .includes(value.toLowerCase())
        || card.back
          .toLowerCase()
          .includes(value.toLowerCase())
    })

    setCartoesFiltrados(cartoesFiltrados)
  }

  const handlePressDelete = (cardId) => {
    const res = window.confirm('Tem certeza que gostaria de apagar este cartão?')
    if (res) {
      deletarCartao(idColecao, cardId)
    }

    navigate('/home')
  }

  useEffect(() => {
    // Recuparar a colecao do ColecaoContext
    // com base no id da colecao passado por parametro na URL
    const _colecao = colecoes.find(colecao => colecao.id === idColecao)

    setColecao(_colecao)
    setCartoes([..._colecao.cardsList])
    setCartoesFiltrados([..._colecao.cardsList])
  }, [idColecao, colecoes])

  return (
    <>
      <Header screem="Home" />
      <div className="Colecao container pt-5">
        {/* Titulo , barra de pesquisa e Botao de novo cartao*/}
        <div className="row">
          <div className="col-12 mb-4">
            <h3>{colecao ? colecao.title : 'Coleção'}</h3>
            <div className="input-group my-4 input-group-lg">
              <span className="input-group-text">@</span>
              <input
                value={filter}
                type="text"
                className="form-control"
                onChange={e => handleChangeText(e.target.value)}
                placeholder="Busque por um elemento"
              />
            </div>
            <CustomButton label='Novo cartão' state='primary' onClick={() => navigate(`/colecao/${idColecao}/novo/gerenciar`)} />
          </div>
        </div>
        {/* Listagem dos cartoes desta colecao */}
        <div className="row">
          {cartoesFiltrados.length > 0
            ? (cartoesFiltrados.map((cartao) => (
              <div className="col-12" key={cartao.id}>
                <ItemListaColecao
                  front={cartao.front}
                  onPressDelete={() => handlePressDelete(cartao.id)}
                />
              </div>
            )))
            : (
              <div className="col-12">
                <p>Nenhum cartão ainda.</p>
              </div>
            )}
        </div>
        {/* Botao Jogar */}
        <div className="row justify-content-center mt-4">
          <div className="col-2">
            <CustomButton
              label='Jogar'
              state='secondary'
              onClick={() => navigate(`/colecao/${idColecao}/jogar`)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Colecao
