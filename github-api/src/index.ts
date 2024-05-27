import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { GitHubApiController } from './controllers/github-api-controller';
import { AppContainer } from './inversify.config';
import { TYPES } from './utils/constants';
import { ValidateParams } from './middlewares/validate-params';
import { environment } from './environment';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const port = environment.PORT || 3000;

const controller = AppContainer.get<GitHubApiController>(TYPES.GitHubApiController);

app.get(
    '/repos/:username/:records',
    ValidateParams.validate,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repos = await controller.getRepos(req, res);
            res.status(200).json(repos);
        } catch (error) {
            next(error);
        }
    },
);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
