import './index.css'

const Flashcard = ({ card, isFlipped }) => {
  return (
    <div className='Flashcard'>
      {isFlipped
        ? (<>
          <div className='Flashcard-row topRow'>
            <div className="rowContent">
              <div className="label">Frente</div>
              <div className="titleWrapper">
                <div className="title">{card.front}</div>
              </div>
            </div>
          </div>
          <div className='Flashcard-row'>
            <div className='rowContent'>
              <div className='label'>Verso</div>
              <div className='titleWrapper'>
                <div className='title'>{card.back}</div>
              </div>
            </div>
          </div>
        </>)
        : (<div className='title'>{card.front}</div>)
      }
    </div>
  )
}

export default Flashcard
