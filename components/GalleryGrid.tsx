
type Item = { src:string; alt:string; color?:string }

const defaults: Item[] = [
  { src:'/images/gallery/01.jpg', alt:'Garden ceremony pillars', color:'neutral,greenery' },
  { src:'/images/gallery/02.jpg', alt:'Blush table arrangement', color:'blush,neutral' },
  { src:'/images/gallery/03.jpg', alt:'Bold centerpiece', color:'bold' },
  { src:'/images/gallery/04.jpg', alt:'Greenery aisle markers', color:'greenery' },
  { src:'/images/gallery/05.jpg', alt:'Pastel bouquet', color:'blush' },
  { src:'/images/gallery/06.jpg', alt:'Modern neutral tablescape', color:'neutral' },
]

export type ColorFilterKey = 'all'|'neutral'|'blush'|'bold'|'greenery'

export default function GalleryGrid({ items = defaults, filter='all' }:{ items?: Item[]; filter?: ColorFilterKey }){
  const visible = (colors?: string) => {
    if(filter==='all' || !colors) return true
    return colors.toLowerCase().includes(filter)
  }
  return (
    <section className="container" style={{paddingBlock:32}}>
      <ul className="masonry" aria-label="Gallery">
        {items.filter(i=>visible(i.color)).map((i,idx)=> (
          <li key={idx} className="card" data-color={i.color}>
            <img src={i.src} alt={i.color ? `${i.color} floral arrangement` : 'Floral arrangement'} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  )
}
