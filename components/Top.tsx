import React from 'react'
import Head from 'next/head'

const Top: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0c1013" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#603cba" />
      <link rel="manifest" href="/manifest.json" />

      {/* <!-- Primary Meta Tags --> */}
      <title>To Do</title>
      <meta name="title" content="To Do" />
      <meta name="description" content="Get Your Shit Done with satisfying sounds to reward progress!"/>

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://todo.chatts.co" />
      <meta property="og:title" content="To Do" />
      <meta property="og:description" content="Get Your Shit Done with satisfying sounds to reward progress!" />
      <meta property="og:image" content="/ss.png" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://todo.chatts.co" />
      <meta property="twitter:title" content="To Do" />
      <meta property="twitter:description" content="Get Your Shit Done with satisfying sounds to reward progress!" />
      <meta property="twitter:image" content="/ss.png" />
    </Head>
  )
}

export default Top
