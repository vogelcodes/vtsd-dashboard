/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import Link from "next/link";

export default function Home({ response, body }: {response: string, body:{"access_token": string, "token_type": string, "expires_in": number, scope: string, jti: string} }) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Hotmart status: {response}
          </h1>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Meta BM status: OFFLINE
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          </div>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps () {
  const response = await fetch(`https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=${process.env.HOTMART_API_CLIENT_ID}&client_secret=${process.env.HOTMART_CLIENT_SECRET}`, {method: "POST", 'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.HOTMART_BASIC_HASH}`
  },})

  const body: {"access_token": string, "token_type": string, "expires_in": number, scope: string, jti: string} = await response.json()
  console.log(body)

  return {props: {
            response: response.status,
            body: body
                }
        }
}