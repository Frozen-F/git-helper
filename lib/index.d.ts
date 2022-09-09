declare type provider = 'github' | 'gitlab';
interface Config {
    privateToken?: string;
    userName?: string;
    password?: string;
    oauth2Token?: string;
}
interface Options {
    provider: provider;
    repository: string;
    branch?: string;
    config: Config;
}
export declare class GitHelper {
    provider: string;
    baseUrl: string;
    branch: string;
    config: Record<'auth' | 'header' | 'params', any>;
    constructor({ provider, repository, branch, config }: Options);
    initAuth({ privateToken, userName, password, oauth2Token }: Config): void;
    proxy(url: string): Promise<unknown>;
    parseBaseUrl(repository: string): string;
    readFile(file: string): Promise<any>;
    downloadFile(file: string, outPath: string): Promise<unknown>;
    outFile(file: string, outPath: string, context: string): Promise<unknown>;
}
export {};
