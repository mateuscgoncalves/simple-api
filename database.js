const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@localhost:27017/api?authSource=admin',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.on('error', () => {console.log('Deu Ruim')});
mongoose.connection.on('open', () => {console.log('Tudo Certo')});