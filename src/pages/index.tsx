import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import Table from '@/components/Table'
import Client from '@/core/Client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const clients = [
    new Client('Gabriel', 26, '1'),
    new Client('Suellen', 27, '2'),
    new Client('Glauce', 64, '3'),
    new Client('Dobby', 17, '4'),
    new Client('Suelli', 68, '5'),
  ]

  function clientSelected(client: Client) {

  }
  function deletedClient(client: Client) {

  }

  return (
    <div className={`
    flex h-screen justify-center items-center 
    bg-gradient-to-r from-blue-500 to-purple-500 
    text-white
   `}>
      <Layout title='Register'>
        <Table clients={clients}
          clientSelected={clientSelected}
          deletedClient={deletedClient}
        />
      </Layout>
    </div>
  )
}
