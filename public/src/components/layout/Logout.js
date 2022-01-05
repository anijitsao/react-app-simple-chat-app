// Logout component
export default () => {
  return (
    <div className="logout">
      <a
        href="#"
        className="logout-link"
        onClick={() => {
          location.reload()
        }}
      >
        Logout
      </a>
    </div>
  )
}
