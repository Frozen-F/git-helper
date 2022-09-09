const request = require('superagent');
const fs = require('fs-extra');
const path = require('path');

type provider = 'github' | 'gitlab'

interface Config {
  privateToken?: string; // Gitlab Personal Access Tokens
  userName?: string; // Github Basic Auth Username
  password?: string; // Github Basic Auth Password
  oauth2Token?: string; // Github OAuth2 Token
}

interface Options {
    provider: provider;
    repository: string; // 仓库 HTTPS
    branch?: string; // 分支 默认为master
    config: Config
}

export class GitHelper {
  public provider:string;
  public baseUrl:string;
  public branch:string;
  public config: Record<'auth'| 'header' | 'params', any> = {
    header: {},
    auth: {
      userName: '',
      password: '',
      oauth2Token: ''
    },
    params: {
      privateToken: ''
    }
  };

  constructor({ provider, repository, branch = 'master', config }: Options) {
    this.provider = provider;
    this.branch = branch;
    this.baseUrl = this.parseBaseUrl(repository);
    this.initAuth(config);
  }

  public initAuth({ privateToken, userName, password, oauth2Token }:Config) {
    const { provider, config } = this;
    if (provider === 'github') {
      Object.assign(config.header, {
        'Authorization': oauth2Token
      });
      Object.assign(config.auth, {
        'userName': userName,
        'password': password
      });
    } else {
      Object.assign(config.params, {
        'private_token': privateToken
      });
    }
  }

  public proxy(url:string) {
    const { header, auth, params } = this.config;
    const _params = {};
    Object.assign(_params, params);
    return new Promise((resolve, reject) => {
      const req = request.get(url, _params).redirects(0);

      // Setup headers
      for (const key in header) {
        if (!header[key]) continue;
        req.set(key, header[key]);
      }

      // Setup Basic Auth
      if (auth.userName && auth.password) {
        req.auth(auth.userName, auth.password);
      }

      // Send the request
      req.end((reqErr:any, res:any) => {
        if (reqErr) {
          reqErr.message = 'Error while downloading file. Please check options and token.';
          reject(reqErr);
        } else {
          resolve(res.text);
        }
      });
    });
  }

  // 解析url
  public parseBaseUrl(repository:string):string {
    const { provider } = this;
    if (provider === 'github') {
      const grep = /^https:\/\/github.com\/([^.]+)/i; 
      const host = repository.match(grep);
      if (!host) {
        throw new Error(`repository 解析失败`);
      }
      return 'https://raw.githubusercontent.com/' + host[1] + '/';
    }
    const grep = /^(https|http):\/\/([^/]+)\//i;  
    const host = repository.match(grep);
    if (!host) {
      throw new Error(`repository 解析失败`);
    }
    const pathOfProject = repository.replace(host[0], '').split('.git')[0];
    return `${host[0]}api/v4/projects/${encodeURIComponent(pathOfProject)}/`;
  }

  // 读取文件
  readFile(file:string): Promise<any> {
    const { provider, baseUrl, branch } = this;
    let url;
    if (provider === 'github') {
      url = baseUrl + [branch, file].join('/');
    } else {
      url = `${baseUrl}repository/files/${encodeURIComponent(file)}/raw?ref=${branch}`;
    }
    return this.proxy(url);
  }

  // 下载文件
  async downloadFile(file:string, outPath: string) {
    const text = await this.readFile(file);
    return this.outFile(file, outPath, text);
  }

  public outFile(file:string, outPath: string, context: string) {
    return new Promise((resolve, reject) => {
      const fileSubPath = path.basename(file);
      const filePath = path.join(outPath, fileSubPath);
      // Write file
      fs.writeFile(filePath, context, (writeError:any) => {
        if (writeError) {
          reject(writeError);
        } else {
          resolve(true);
        }
      });
    });
  }

};

