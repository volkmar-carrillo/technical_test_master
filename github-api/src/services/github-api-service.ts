import { GitHubApiResponse } from '../models/github/github-api-response';

export interface GitHubApiService {
    getPopularRepos(username: string, records: number): Promise<GitHubApiResponse[]>;
}
