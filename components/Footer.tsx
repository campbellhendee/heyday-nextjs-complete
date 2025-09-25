import Link from 'next/link'
import { BRAND } from '@/lib/brand'

export default function Footer(){
  return (
    <footer style={{marginTop:64,borderTop:'1px solid var(--border)'}}>
      <div className="container" style={{paddingBlock:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div>
          <p style={{margin:0,fontWeight:600}}>{BRAND.name}</p>
          <p style={{margin:0,color:'#666'}}>{BRAND.region} • {BRAND.tagline}</p>
        </div>
        <nav aria-label="Footer" style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          {BRAND.nav.map(i=> (<Link key={i.href} className="btn" href={i.href}>{i.name}</Link>))}
        </nav>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <a className="btn" href={BRAND.phone.href}>{BRAND.phone.display}</a>
          <a className="btn btn--primary" href={BRAND.email.href}>Email Us</a>
        </div>
      </div>
      <div className="container" style={{paddingBottom:24,color:'#777',fontSize:14}}>
        © {new Date().getFullYear()} {BRAND.name}
      </div>
    </footer>
  )
}
