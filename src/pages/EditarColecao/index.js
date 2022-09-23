import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ColecaoContext } from "../../contexts/ColecaoContext";
import { AuthContext } from "../../contexts/AuthContext";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

import './index.css'

const EditarColecao = () => {
  // Recuperar o param idColecao da URL
  const { idColecao } = useParams()
  const navigate = useNavigate()
  // Context
  const { userData } = useContext(AuthContext)
  const { criarColecao } = useContext(ColecaoContext)
  // States
  const [action, setAction] = useState()
  const [colecaoId, setColecaoId] = useState()
  // Form states
  const [titulo, setTitulo] = useState('')
  const [desc, setDesc] = useState('')
  const [thumbnail, setThumbnail] = useState()

  useEffect(() => {
    const _action = idColecao
    if (_action === 'novo') {
      setAction('criar')
    } else {
      setAction('editar')
      setColecaoId(_action)
    }
  }, [])

  const handeImageAsFile = (e) => {
    const image = e.target.files[0]
    setThumbnail(image)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCollection = {
      title: titulo,
      desc: desc,
    }

    criarColecao(userData.uid, newCollection, thumbnail)

    navigate(-1)
  }

  return (
    <>
      <Header screem="Home" />

      <div className="EditarColecao container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="content">
              <h3 className="mb-4">Nova Coleção</h3>
              <h5 className="mb-4">Atualize os dados necessários da coleção</h5>
              <form onSubmit={handleSubmit}>
                <div className="input-group-lg mb-3">
                  <label htmlFor="inputTitulo" className="form-label">Nome coleção</label>
                  <input
                    value={titulo}
                    type="text"
                    className="form-control"
                    id="inputTitulo"
                    placeholder='Insira o nome da coleção'
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <p>Descrição</p>
                <div className="input-group input-group-lg mb-3">
                  <textarea
                    className="form-control"
                    value={desc}
                    type="text"
                    placeholder='Descreva os detalhes da coleção'
                    onChange={(e) => setDesc(e.target.value)}
                    rows={5}
                    required
                  ></textarea>
                </div>
                <p>Imagem</p>
                <div className="input-group input-group-lg mb-3">
                  <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                  <input type="file" className="form-control" id="inputGroupFile01" placeholder="Escolha uma imagem" onChange={handeImageAsFile} />
                </div>
                <CustomButton label='Salvar alterações' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditarColecao
