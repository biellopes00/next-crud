import { useEffect, useState } from "react"
import Client from "../core/Client"
import ClientCollection from "../core/db/ClientCollection"
import ClientRepository from "../core/ClientRepository"
import useTableOrForm from "./useTableOrForm"

export default function useClients(){
    const repo: ClientRepository = new ClientCollection()

    const { visibleTable, showTable, showForm } = useTableOrForm()
    const [client, setClient] = useState<Client>(Client.empty)
    const [clients, setClients] = useState<Client[]>([])
  
    useEffect(() => {
      getClients
    })
  
    function getClients() {
      repo.getClients().then(clients => {
        setClients(clients)
        showTable()
      })
    }
    function clientSelected(client: Client) {
      setClient(client);
      showForm()
    }
    async function deletedClient(client: Client) {
      await repo.delete(client)
      getClients()
    }
  
    function newClient() {
      setClient(Client.empty)
      showForm()
    }
    async function saveClient(client: Client) {
      await repo.save(client)
      getClients()
    }
  return {
    newClient,
    getClients,
    deletedClient,
    clientSelected,
    saveClient,
    client,
    clients,
    visibleTable,
    showTable
  }
}