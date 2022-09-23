import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './index.css'
import remover from '../../assets/icons/remover'
import editar from '../../assets/icons/editar'

import firebase from "../../config/firebase"

const ItemColecao = ({ colecao, onPressDelete }) => {
  const navigate = useNavigate()

  const [url, setUrl] = useState()

  useEffect(() => {
    let _isMounted = true

    // Get thumbnail from Firebase Storage
    const storage = firebase.storage()
    storage.ref(`images/${colecao.thumbnail}`)
      .getDownloadURL()
      .then(url => {
        if (_isMounted) {
          setUrl(url)
        }
      })
      .catch(error => {
        console.log(error)
      })

    // Cleanup function
    return () => {
      _isMounted = false
    }
  }, [colecao])

  return (
    <div className="colecao-item">
      <img className="edit" src={editar} alt="" />
      <img className="colecao-img" src={url} alt="" onClick={() => navigate(`/colecao/${colecao.id}`)} />
      <h3>{colecao.title}</h3>
      <img className="excluir" src={remover} alt="" onClick={() => onPressDelete(colecao.id)} />
    </div>
  )
}

export default ItemColecao
