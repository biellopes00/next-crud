import Layout from '../components/Layout'
import Table from '../components/Table'
import Button from '../components/Button'
import Form from '../components/Form'
import useClients from '../hooks/useClients'


export default function Home() {

  const {
    clientSelected,
    deletedClient,
    client,
    clients,
    newClient,
    saveClient,
    visibleTable,
    showTable } = useClients()

  return (
    <div className={`
    flex h-screen justify-center items-center 
    bg-gradient-to-r from-blue-500 to-purple-500 
    text-white
   `}>
      <Layout title='Register'>
        {visibleTable ? (
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
            canceled={() => showTable}
          />
        )}
      </Layout>
    </div>
  )
}
