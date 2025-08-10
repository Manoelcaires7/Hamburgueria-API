/* 
* store => Cadastrar / adicionar
* index => Listar vários
* show => Listar apenas um
* update => Atualizar
* delete => Deletar
*/

import User from '../models/User';
import { v4 } from 'uuid'

class UserController {
    async store(req, res) {
        const { name, email, password_hash, admin } = req.body;
        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
        });
        return res.status(201).json({
            id: user.id,
            name,
            email,
            admin,
        })
    }
};

export default new UserController();