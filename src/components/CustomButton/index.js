import './index.css'

const CustomButton = ({ label, type, state, onClick }) => {
  return (
    <button
      type='submit'
      className="CustomButton btn btn-primary"
      data-state={state}
      onClick={onClick}
    >
      <b>{label}</b>
    </button>
  )
}

export default CustomButton
