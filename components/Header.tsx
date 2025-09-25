export default function Header(){
  return (
    <header style={{borderBottom:'1px solid var(--border)'}}> 
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBlock:16}}>
        <a href="/" className="logo">Heyday</a>
        <nav aria-label="Primary">
          <a className="btn" href="#portfolio">Portfolio</a>
          <a className="btn" href="#process">Process</a>
          <a className="btn" href="#investment">Investment</a>
        </nav>
      </div>
    </header>
  )
}
