'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const REDIRECT_SECONDS = 10

export default function NotFound(){
  const router = useRouter()
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS)

  useEffect(()=>{
    const timer = window.setInterval(()=>{
      setCountdown((prev)=>{
        if(prev <= 1){
          window.clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return ()=> window.clearInterval(timer)
  }, [router])

  return (
    <div className="not-found">
      <div className="container not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Page not found</p>
        <p className="not-found__message">
          The page you were looking for has been moved, updated, or never existed.
        </p>
        <p className="not-found__countdown" role="status">
          Redirecting to the home page in {countdown} second{countdown === 1 ? '' : 's'}.
        </p>
        <Link href="/" className="btn btn--primary">
          Go home now
        </Link>
      </div>
      <style jsx>{`
        .not-found {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(4rem, 12vw, 8rem) 0;
        }

        .not-found__container {
          text-align: center;
          display: grid;
          gap: 1.25rem;
        }

        .not-found__title {
          font-size: clamp(5rem, 14vw, 8rem);
          font-weight: 300;
          color: var(--accent);
          line-height: 1;
          margin: 0;
        }

        .not-found__subtitle {
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin: 0;
        }

        .not-found__message {
          margin: 0;
          color: var(--ink-2);
        }

        .not-found__countdown {
          margin: 0;
          color: var(--ink-3);
          font-size: var(--step--1);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}
