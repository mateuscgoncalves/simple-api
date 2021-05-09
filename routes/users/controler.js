const UserModel = require('./model');

const parseBody = (req, callback) => {
    let body = [];

    req.on("data", chunk => {

        body.push(chunk);
    });

    req.on("end", async () => {

        body = Buffer.concat(body).toString();

        body = await body
            .split('&')
            .map(item => item.split('='))
            .reduce(
                (memo, current) => ({
                    ...memo,
                    [current[0]]: current[1]
                }), {}
            );
        callback(body);
    });
}

const list = async (req, res) => {
    const users = await UserModel.find({});
    res.write(JSON.stringify(users));
    res.end();
};
const save = (req, res) => {
    parseBody(req, async body => {
        const user = new UserModel(body);
        await user.save();

        res.write(JSON.stringify(user));
        res.end();
    })

};

const update = (req, res) => {
    parseBody(req, async body => {

        const conditions = {_id: body.id};
        const data = {name: body.name};
        const user = await UserModel.updateOne(conditions, data);

        res.write(JSON.stringify(user));
        res.end();
    });
}

module.exports = {list, save, update};