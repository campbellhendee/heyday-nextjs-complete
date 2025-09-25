export default function Footer(){
  return (
    <footer style={{marginTop:64,borderTop:'1px solid var(--border)'}}>
      <div className="container" style={{paddingBlock:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <p>© {new Date().getFullYear()} Heyday Flower Co</p>
        <a className="btn" href="mailto:hello@heyday.flowers">Get in touch</a>
      </div>
    </footer>
  )
}
