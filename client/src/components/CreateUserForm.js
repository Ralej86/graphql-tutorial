import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
        }
    }
`;

const CreateUserForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    const handleSubmit = (event) => {
        event.stopPropagation();
        console.log("handle submit");
        createUser({
            variables: {
                input: { age: Number(age), name, username, nationality },
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="age">
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="nationality">
                    Nationality:
                    <input
                        type="text"
                        name="nationality"
                        value={nationality}
                        onChange={(e) => {
                            setNationality(e.target.value.toUpperCase());
                        }}
                    />
                </label>
                <input type="submit" value="Create User" />
            </form>
        </div>
    );
};

export default CreateUserForm;
