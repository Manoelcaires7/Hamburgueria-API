/* 
* store => Cadastrar / adicionar
* index => Listar vários
* show => Listar apenas um
* update => Atualizar
* delete => Deletar
*/
import User from '../models/User';
import { v4 } from 'uuid';
import * as Yup from 'yup';

class UserController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password_hash: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });


        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name, email, password_hash, admin } = req.body;

        const userExists = await User.findOne({
            where: {
                email,
            },
        });

        if (userExists) {
            return res.status(400).json({ error: 'user already exists' });
        };

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
        });
    };
};

export default new UserController();