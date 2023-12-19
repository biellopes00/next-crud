import Client from "../../core/Client";
import ClientRepository from "../ClientRepository";
import firebase from "../../backend/config";

export default class CollectionClient implements ClientRepository{

    #conversor = {
        toFirestore(client: Client){
            return{
                name: client.name,
                age: client.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
            const data = snapshot.data(options)
            return new Client(data.name, data.age, snapshot?.id)
        }
    }

    async save(client: Client): Promise<Client> {
        if(client?.id){
            await this.colletion().doc(client.id).set(client)
            return client
        } else{
            const docRef = await this.colletion().add(client)
            const doc = await docRef.get()
            return doc.data()
        }
    }
    async delete(client: Client): Promise<void> {
        return this.colletion().doc(client.id).delete()
    }
    async getClients(): Promise<Client[]> {
       const query = await this.colletion().get()
        return query.docs.map(doc => doc.data()) ?? []
    }
    
    private colletion(){
        return firebase
            .firestore().collection('clients')
            .withConverter(this.#conversor)
    }
}