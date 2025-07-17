import "../styles/globals.css"
import Head from 'next/head'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Newsletter App</title>
                <meta name="description" content="Egyszerű hírlevél feliratkozó alkalmazás" />
                {/* Egyéb meta tagek */}
            </Head>
            <Component {...pageProps} />
        </>
    )
}
