import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import User from '../models/User';


interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: Request): Promise<Response> {

        const userRepository = getRepository(User);

        // checar se o email é válido
        const user = await userRepository.findOne({ where: { email } });

        if(!user)
            throw new Error('Inválid Email or Password');

        // checar senha criptografada

        const ckeckedPassoword = await compare(password, user.password);

        if(!ckeckedPassoword)
            throw new Error('Inválid Email or Password');

        // Gerando token

        const token = sign({}, 'd475247cbe226fece8c7d699e9ddb050', {
            subject: user.id,
            expiresIn: '1d'
        });


        return {
            user,
            token
        }
    }
}