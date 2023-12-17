import Client from "@/core/Client";

interface TableProps {
    clients: Client[];
}

export default function Table(props: TableProps) {

    function renderingHeader() {
        return (
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        )
    }

    function renderingData() {
        return props.clients?.map((client, i) => {
            return (
                <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.age}</td>
                </tr>
            )
        })
    }
    return (
        <table>
            <thead>
                {renderingHeader()}
            </thead>
            <tbody>
                {renderingData()}
            </tbody>
        </table>
    )
}