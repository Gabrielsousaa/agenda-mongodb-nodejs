const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        try {
            this.valida();
            if (this.errors.length > 0) return;
            this.user = await LoginModel.findOne({ email: this.body.email });

            if (!this.user) {
                this.errors.push('Usuario não existe');
                return;
            }

            if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
                this.errors.push('senha invalida');
                this.user = null;
                return;
            }

        } catch (error) {
            console.log(error)
        }


    }
    async register() {
        try {
            this.valida();
            if (this.errors.length > 0) return;

            this.userExists();

            if (this.errors.length > 0) return;
            const salt = bcryptjs.genSaltSync();
            this.body.password = bcryptjs.hashSync(this.body.password, salt);
            this.user = await LoginModel.create(this.body);

        } catch (error) {
            console.log(error);
        }

    }
    async userExists() {
        try {
            this.user = await LoginModel.findOne({ email: this.body.email });
            if (this.user) this.errors.push('Usuario já existe');
        } catch (error) {
            console.log(error);
        }

    }
    valida() {
        this.cleanUp();
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres. ');
        }
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password

        }

    };


}

module.exports = Login;