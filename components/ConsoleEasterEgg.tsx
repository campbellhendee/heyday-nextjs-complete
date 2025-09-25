'use client'

import { useEffect } from 'react'

const MESSAGE = "%c🌸 Built with love in Houston"
const STYLE = 'font-size: 16px; color: #8EA693; font-weight: bold;'
const FLAG = '__heydayConsoleMessage'

type WindowWithFlag = Window & {
  __heydayConsoleMessage?: boolean
}

export default function ConsoleEasterEgg(){
  useEffect(()=>{
    if(typeof window === 'undefined') return
    const win = window as WindowWithFlag
  if(win[FLAG]) return
  win[FLAG] = true
    console.log(MESSAGE, STYLE)
  },[])

  return null
}
