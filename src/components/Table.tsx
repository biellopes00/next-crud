import Client from "@/core/Client";
import { EditIcon, DeletIcon } from "./Icons";

interface TableProps {
    clients: Client[];
    clientSelected?: (client: Client) => void;
    deletedClient?: (client: Client) => void;
}

export default function Table(props: TableProps) {

    const showActions = props.clientSelected || props.deletedClient

    function renderingHeader() {
        return (
            <tr>
                <th className="text-left p-4">Code</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Age</th>
                {showActions ? <th className="p-4">Actions</th> : false}
            </tr>
        )
    }

    function renderingData() {
        return props.clients?.map((client, i) => {
            return (
                <tr key={client.id}
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
                >
                    <td className="text-left p-4">{client.id}</td>
                    <td className="text-left p-4">{client.name}</td>
                    <td className="text-left p-4">{client.age}</td>
                    {showActions ? renderingActions(client) : false}
                </tr>
            )
        })

        function renderingActions(client: Client) {
            return (
                <td className="flex justify-center">
                    {props.clientSelected ? (
                        <button onClick={() => props.clientSelected?.(client)} className={`
                         flex justify-center items-center p-2 m-1
                         text-green-600 rounded-full hover:bg-purple-50
                         `}>
                            {EditIcon}
                        </button>
                    ) : false}
                    {props.deletedClient ? (
                        <button onClick={() => props.deletedClient?.(client)} className={`
                     flex justify-center items-center p-2 m-1
                     text-red-600 rounded-full hover:bg-purple-50
                     `}>
                            {DeletIcon}
                        </button>
                    ) : false}

                </td>
            )
        }
    }
    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
            text-gray-100
            bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderingHeader()}
            </thead>
            <tbody>
                {renderingData()}
            </tbody>
        </table>
    )
}