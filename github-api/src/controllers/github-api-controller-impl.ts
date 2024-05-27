import { Request, Response } from 'express';
import { GitHubApiService } from '../services/github-api-service';
import { GitHubApiController } from './github-api-controller';
import { GitHubApiResponse } from '../models/github/github-api-response';
import { injectable, inject } from 'inversify';
import { TYPES } from '../utils/constants';

@injectable()
export class GitHubApiControllerImpl implements GitHubApiController {
    constructor(@inject(TYPES.GitHubApiService) private service: GitHubApiService) {}

    public async getRepos(req: Request, res: Response): Promise<GitHubApiResponse[]> {
        try {
            const { username, records } = req.params;
            return await this.service.getPopularRepos(username, parseInt(records));
        } catch (error) {
            console.log(error);
            throw new Error(`Controller error while attempting to retrieve the user's repositories: ${error}`);
        }
    }
}
