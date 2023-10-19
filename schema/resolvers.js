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
};

module.exports = {
    resolvers,
};
