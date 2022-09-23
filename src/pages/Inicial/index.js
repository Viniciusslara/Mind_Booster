import Header from "../../components/Header"
import Cards from '../../components/Cards'

import './index.css'

import setatransicao from '../../assets/icons/setatransicao'
import setaclick from '../../assets/icons/setaclick'

const Inicial = () => {
  return (
    <div>
      <Header screem="Main" />

      <div className='main'>
        <h1 id="Mindbooster">Mind Booster</h1>
        <h2>Treine a sua memória com Flash Cards!</h2>
        <div className="flashcard-container">
          <p className="flashcard-strong"><strong>Como se chama em inglês?</strong></p>
          <div className='info-e-flashcard'>
            <div>
              <p id="clickcartao">Clique no cartão <br /> para descobrir</p>
              <img className='seta-click' src={setaclick} alt="SetaClick" />
            </div>
            <Cards portuguese="Carro" english="" />
            <img className='seta-transicao' src={setatransicao} alt="SetaTransicao" />
            <Cards portuguese="Carro" english="Car" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicial
