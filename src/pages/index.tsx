import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Client from '../core/Client'
import Button from '../components/Button'
import Form from '../components/Form'
import { useEffect, useState } from 'react'
import ClientRepository from '../core/ClientRepository'
import ClientCollection from '../core/db/ClientCollection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const repo: ClientRepository = new ClientCollection()

  const [visible, setVisible] = useState<'table' | 'form'>('table')
  const [client, setClient] = useState<Client>(Client.empty)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    getClients
  }, [])

  function getClients() {
    repo.getClients().then(clients => {
      setClients(clients)
      setVisible('table')
    })
  }
  function clientSelected(client: Client) {
    setClient(client);
    setVisible('form')
  }
  function deletedClient(client: Client) {

  }

  function newClient() {
    setClient(Client.empty)
    setVisible('form')
  }
  async function saveClient(client: Client) {
    await repo.save(client)
    getClients()
  }


  return (
    <div className={`
    flex h-screen justify-center items-center 
    bg-gradient-to-r from-blue-500 to-purple-500 
    text-white
   `}>
      <Layout title='Register'>
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4"
                onClick={newClient}>
                New Client
              </Button>

            </div>

            <Table clients={clients}
              clientSelected={clientSelected}
              deletedClient={deletedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            onChange={saveClient}
            canceled={() => setVisible('table')}
          />
        )}
      </Layout>
    </div>
  )
}
