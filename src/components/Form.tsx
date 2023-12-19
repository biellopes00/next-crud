import { useState } from "react";
import Input from "./Input";
import Client from "../core/Client";
import Button from "./Button";

interface FormProps {
    client: Client
    onChange?: (client: Client) => void
    canceled?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)

    return (
        <div>
            {id ? (
                <Input
                    readonly
                    text="Code"
                    value={id}
                    className="mb-4"
                />
            ) : false}
            <Input
                text="Name"
                value={name}
                onChange={setName}
                className="mb-4"
            />
            <Input
                text="Age"
                type="number"
                value={age}
                onChange={setAge}

            />
            <div className="flex justify-end mt-7">
                <Button color="blue" className="mr-2" onClick={() => props.onChange?.(new Client(name, +age, id))}>
                    {id ? 'Change' : 'Save'}
                </Button>
                <Button onClick={props.canceled}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}