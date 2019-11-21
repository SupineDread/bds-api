const gravatar = require('gravatar');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user.model');
const jwt = require('../services/jwt');

module.exports = {

    login: (req, res) => {
        const params = req.body;
        const password = params.password;
        const email = params.email;

        User.findOne({ email: email }, (err, user) => {
            if (err) return res.status(500).send({ msg: 'No se han podido verificar las credenciales' });
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) return res.status(403).send({ msg: 'No se han podido verificar las credenciales', status: 403 });
                    if (!result) return res.status(403).send({ msg: 'Contraseña incorrecta', status: 403 });
                    return res.status(200).send({ user, token: jwt.createToken(user), status: 200 });
                })
            } else {
                return res.status(404).send({ msg: 'Usuario no encontrado', status: 404 });
            }
        });

    },

    register: (req, res) => {
        const params = req.body;
        let user = new User();

        user.name = params.name;
        user.username = params.username;
        user.email = params.email;
        user.avatar = gravatar.url('escomadmin@mail.com', { s: '100', r: 'x', d: 'retro' }, true);
        user.role = 'USER'

        bcrypt.hash(user.password, null, null, (err, hash) => {
            if (err) return res.status(500).send({ msg: 'No se ha podido guardar el usuario', status: 500 });
            user.password = hash;
            user.save((err, userSaved) => {
                if (err) return res.status(500).send({ msg: 'No se ha podido guardar el perfil', status: 500 });
                return res.status(200).send({ msg: 'Se ha registrado el usuario', status: 200, user: userSaved })
            });
        });

    },

    getProfile: (req, res) => {
    },

    updateUser: (req, res) => {
    },

    deleteUser: (req, res) => {
    }

}