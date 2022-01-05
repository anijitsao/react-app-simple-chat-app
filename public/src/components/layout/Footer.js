// Footer component
export default ({ toggleBackButton, showBackButton }) => {
  return (
    <div className="footer">
      {showBackButton == true && (
        <i
          className="fa fa-arrow-left left-arrow"
          onClick={() => toggleBackButton(false)}
        ></i>
      )}
    </div>
  )
}
