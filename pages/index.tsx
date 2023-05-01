/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'


export default function Home() {
  const { data: session } = useSession()
  

  return (
    <Layout>
      <div className="text-black flex justify-between items-center">
        <h2 className="font-bold">
          hello, <span className='text-cyan-500'>{session?.user?.name}</span>
        </h2>
        <div className="flex items-center gap-1 bg-gray-200 font-bold rounded-full">
          <img
            src={session?.user?.image}
            alt="img user"
            className="rounded-full w-10 h-10"
          />
          <span className="py-1 px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}
