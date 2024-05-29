import { Request, Response } from 'express';
import { GitHubApiResponse } from '../models/github/github-api-response';

export interface GitHubApiController {
    getRepos(req: Request, res: Response): Promise<GitHubApiResponse[]>;
}
