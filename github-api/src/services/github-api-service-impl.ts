import { GitHubApiResponse } from '../models/github/github-api-response';
import { AxiosAdapter } from '../adapters/http/axios-adapter';
import { GitHubApiService } from './github-api-service';
import { injectable, inject } from 'inversify';
import { TYPES } from '../utils/constants';
import { environment } from '../environment';

@injectable()
export class GitHubApiServiceImpl implements GitHubApiService {
    constructor(@inject(TYPES.AxiosAdapter) private httpAdapter: AxiosAdapter) {}

    public async getPopularRepos(username: string, records: number): Promise<GitHubApiResponse[]> {
        // const requestHeaders: object = {
        //     headers: {
        //         Authorization: environment.GITHUB_TOKEN,
        //     },
        // };
        try {
            const url = environment.GITHUB_ENDPOINT.replace('${username}', username);
            const response = await this.httpAdapter.get<GitHubApiResponse[]>(url);
            const repos: GitHubApiResponse[] = response.data;
            const sortedRepos = repos.reduce((acc: GitHubApiResponse[], repo: GitHubApiResponse) => {
                if (acc.length < records || repo.stargazers_count > acc[acc.length - 1].stargazers_count) {
                    acc.push({
                        name: repo.name,
                        html_url: repo.html_url,
                        stargazers_count: repo.stargazers_count,
                    });
                    acc.sort((a, b) => b.stargazers_count - a.stargazers_count);
                    if (acc.length > records) acc.pop();
                }
                return acc;
            }, []);
            console.log(sortedRepos);
            return sortedRepos;
        } catch (error) {
            console.log(error);
            throw new Error(`Service error while attempting to fetch the user's repositories: ${error}`);
        }
    }
}
