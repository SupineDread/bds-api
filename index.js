const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const gravatar = require('gravatar');
const findOrCreate = require('mongoose-find-or-create')
const User = require('./models/user.model');
const app = require('./app');
const config = require('./config');

mongoose.Promise = Promise
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexion correcta a la base de datos');
        User.findOne(
            {
                name: 'Administrador',
                username: 'Administrador',
                email: 'escomadmin@mail.com',
            },
            (err, user) => {
                // if (err) return res.status(500).send({msg: 'No se ha podido encontrar ene uusrio', status: 500});
                if (!user) {
                    bcrypt.hash('escom2019', null, null, (err, hash) => {
                        User.findOrCreate(
                            {
                                password: hash,
                                name: 'Administrador',
                                username: 'Administrador',
                                email: 'escomadmin@mail.com',
                                avatar: gravatar.url('escomadmin@mail.com', { s: '100', r: 'x', d: 'retro' }, true),
                                role: 'ADMIN',
                            },
                            (err, result) => {
                                console.log('Usuario administrador encontrado o creado');
                            },
                        );
                    });
                } else {
                    console.log('Usuario administrador encontrado o creado');
                }
            },
        );
        app.listen(config.PORT, function () {
            console.log(`Servidor iniciado en el puerto ${config.PORT}`);
        });
    }
});