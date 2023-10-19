import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
        }
    }
`;

const QUERY_USER = gql`
    query GetUser($userId: ID!) {
        user(id: $userId) {
            name
            username
            age
        }
    }
`;

const DisplayData = () => {
    const [searchedUser, setSearchedUser] = useState("");
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const [
        fetchUserData,
        { data: searchedUserData, error: searchedUserError },
    ] = useLazyQuery(QUERY_USER);

    if (error) {
        console.warn(error);
    }

    if (searchedUserError) {
        console.warn(searchedUserError);
    }

    return (
        <div>
            <h2>List of Users</h2>
            <div>
                {!loading &&
                    data.users &&
                    data.users.map((u) => (
                        <div key={u.id}>
                            {u.id}: {u.name}
                        </div>
                    ))}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="1..."
                    onChange={(e) => setSearchedUser(e.target.value)}
                />
                <button
                    onClick={() =>
                        fetchUserData({ variables: { userId: searchedUser } })
                    }
                >
                    Fetch User
                </button>
                <div>
                    {searchedUserData && (
                        <div>
                            Name: {searchedUserData.user.name} aka{" "}
                            {searchedUserData.user.username}
                        </div>
                    )}
                    {searchedUserError && (
                        <div>There was an error fetching the user</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayData;
