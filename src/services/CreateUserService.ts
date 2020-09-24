import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User | undefined> {

        const userRepostiory = getRepository(User);

        // checar emails duplicados

        const checkedEmail = await userRepostiory.findOne({
            where: { email }
        });

        if(checkedEmail)
            throw new Error('Email adress already in use');

        // se n tiver com email duplicado, criar user

        const hashedPassword = await hash(password, 8);

        const user = userRepostiory.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepostiory.save(user);


        return user;
    }
}