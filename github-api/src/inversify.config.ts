import { Container } from 'inversify';
import { TYPES } from './utils/constants';
import { AxiosAdapter } from './adapters/http/axios-adapter';
import { AxiosAdapterImpl } from './adapters/http/axios-adapter-impl';
import { GitHubApiService } from './services/github-api-service';
import { GitHubApiServiceImpl } from './services/github-api-service-impl';
import { GitHubApiController } from './controllers/github-api-controller';
import { GitHubApiControllerImpl } from './controllers/github-api-controller-impl';

const AppContainer: Container = new Container();
AppContainer.bind<AxiosAdapter>(TYPES.AxiosAdapter).to(AxiosAdapterImpl);
AppContainer.bind<GitHubApiService>(TYPES.GitHubApiService).to(GitHubApiServiceImpl);
AppContainer.bind<GitHubApiController>(TYPES.GitHubApiController).to(GitHubApiControllerImpl);

export { AppContainer };
