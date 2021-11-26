const userController = require("../controllers/user");

const resolver = {
    Query: {
        // User
        getUser: (_, { id, username }) => userController.getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input }, context) => userController.register(input),
        login: (_, { input }) => userController.login(input)
    }
};

module.exports = resolver;