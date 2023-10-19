import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
        }
    }
`;

const DisplayData = () => {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);

    if (error) {
        console.warn(error);
        return <div>There was an error</div>;
    }

    return (
        <div>
            <h2>List of Users</h2>
            <div>
                {!loading &&
                    data.users &&
                    data.users.map((u) => (
                        <div key={u.id}>
                            {u.id}: {u.name} a.k.a. {u.username}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DisplayData;
