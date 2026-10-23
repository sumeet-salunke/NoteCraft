import './Header.css'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>

      <input
        className="page-header__search"
        type="search"
        placeholder="Search notes..."
        aria-label="Search notes"
      />
    </header>
  )
}

export default Header