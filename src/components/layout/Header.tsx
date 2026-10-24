import './Header.css'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>

    
    </header>
  )
}

export default Header