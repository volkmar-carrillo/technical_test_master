export interface GitHubApiResponse {
    name: string;
    html_url: string;
    stargazers_count: number;
    [key: string]: any;
}
