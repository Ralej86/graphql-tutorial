const { userList, movieList } = require("../data");

const resolvers = {
    Query: {
        // ----- User Resolvers -----
        users() {
            return userList;
        },
        user: (_p, args) => {
            const user = userList.find((u) => u.id === Number(args.id));
            if (user !== -1) return user;
            return null;
        },

        // ----- Movie Resolvers -----
        movies: () => {
            return movieList;
        },
        movie: (_p, args) => {
            const movieName = args.name;
            const movie = movieList.find((m) => m.name === movieName);
            if (movie !== -1) return movie;
            return null;
        },
    },
    User: {
        favoriteMovies: () => {
            return movieList.filter((m) => m.year >= 2000 && m.year <= 2010);
        },
    },

    // Mutation Resolvers
    Mutation: {
        createUser: (_p, args) => {
            const userData = args.input;
            const lastId = userList[userList.length - 1].id;
            const newUser = { ...userData, id: lastId + 1 };
            userList.push(newUser);
            return newUser;
        },
        updateUsername: (_p, args) => {
            const { id, username } = args.input;
            const user = userList.find((u) => u.id === Number(id));
            console.log(user, id, username);
            if (user !== -1) {
                user.username = username;
                return user;
            }
            return null;
        },
        deleteUser: (_p, args) => {
            const id = args.id;
            const userIdx = userList.findIndex((u) => u.id === Number(id));
            if (userIdx !== -1) {
                const deletedUser = userList[userIdx];
                userList.splice(userIdx, 1);
                console.log(deletedUser, userList);
                return deletedUser;
            }
            return null;
        },
    },
};

module.exports = {
    resolvers,
};
