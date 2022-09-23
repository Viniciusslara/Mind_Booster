import './index.css'

import remover from '../../assets/icons/remover'
import editar from '../../assets/icons/editar'

const ItemListaColecao = ({ front, onPressDelete }) => {
  return (
    <div className="ItemListaColecao">
      <div className="titulo">{front}</div>
      <div className="wrapper-icones">
        <div className='icones'><img src={editar} alt='' /></div>
        <div className='icones'><img src={remover} alt='' onClick={onPressDelete} /></div>
      </div>
    </div>
  )
}

export default ItemListaColecao
