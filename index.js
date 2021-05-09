const http = require('http');
const { parse } = require('url');
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@localhost:27017/api?authSource=admin',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.on('error', () => {console.log('Deu Ruim')});
mongoose.connection.on('open', () => {console.log('Tudo Certo')});

//Timestamps = true cria os parametros created at e updated at
const schema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', schema);



//request, response
const server = http.createServer(async (req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });


    const url = parse(req.url);

    if(url.pathname === '/users' && req.method === 'GET'){
        const users = await UserModel.find({});
        res.write(JSON.stringify(users));
        res.end();
    }

    if(url.pathname === '/users' && req.method === 'POST'){

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
                    async (memo, current) => ({
                        ...memo,
                        [current[0]]: current[1]
                    }),{}
                );

            const user = new UserModel(body);
            await user.save();

            res.write(JSON.stringify(user));
            res.end();
        });
    }
});

server.listen(8080);