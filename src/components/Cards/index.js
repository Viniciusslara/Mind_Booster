import './index.css'

const Cards = (props) => {

  if (props.english == null) {
    return (
      <div className='flashcard'>
        <h3>{props.portuguese}</h3>
      </div>
    )
  } 
  else {
    return (
      <div className='flashcard'>
        <h3>{props.portuguese}</h3>
        <hr />
        <h3>{props.english}</h3>
      </div>
    )
  }
}

export default Cards