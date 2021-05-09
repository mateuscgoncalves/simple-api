const users = require('./users/controler');

const routes = {
    "/users": {
        get: users.list,
        post: users.save,
        put: users.update
    }
}

module.exports = routes;