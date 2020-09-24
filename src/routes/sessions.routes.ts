import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';
// essa rota ficará responsavel pela criação de uma sessão


const sessionRouter = Router();


sessionRouter.post('/', async(request, response) => {
    try{
        const { email, password } = request.body;
    
        const createSession = new CreateSessionService();

        const data = await createSession.execute({
            email, password
        });

        delete data.user.password;

        return response.json(data);
    }catch(err) {
        return response.status(400).json({ error: err.message })
    }
    
});

export default sessionRouter;