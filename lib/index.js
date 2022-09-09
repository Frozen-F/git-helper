"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHelper = void 0;
const request = require('superagent');
const fs = require('fs-extra');
const path = require('path');
class GitHelper {
    constructor({ provider, repository, branch = 'master', config }) {
        this.config = {
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
        this.provider = provider;
        this.branch = branch;
        this.baseUrl = this.parseBaseUrl(repository);
        this.initAuth(config);
    }
    initAuth({ privateToken, userName, password, oauth2Token }) {
        const { provider, config } = this;
        if (provider === 'github') {
            Object.assign(config.header, {
                'Authorization': oauth2Token
            });
            Object.assign(config.auth, {
                'userName': userName,
                'password': password
            });
        }
        else {
            Object.assign(config.params, {
                'private_token': privateToken
            });
        }
    }
    proxy(url) {
        const { header, auth, params } = this.config;
        const _params = {};
        Object.assign(_params, params);
        return new Promise((resolve, reject) => {
            const req = request.get(url, _params).redirects(0);
            for (const key in header) {
                if (!header[key])
                    continue;
                req.set(key, header[key]);
            }
            if (auth.userName && auth.password) {
                req.auth(auth.userName, auth.password);
            }
            req.end((reqErr, res) => {
                if (reqErr) {
                    reqErr.message = 'Error while downloading file. Please check options and token.';
                    reject(reqErr);
                }
                else {
                    resolve(res.text);
                }
            });
        });
    }
    parseBaseUrl(repository) {
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
    readFile(file) {
        const { provider, baseUrl, branch } = this;
        let url;
        if (provider === 'github') {
            url = baseUrl + [branch, file].join('/');
        }
        else {
            url = `${baseUrl}repository/files/${encodeURIComponent(file)}/raw?ref=${branch}`;
        }
        return this.proxy(url);
    }
    downloadFile(file, outPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield this.readFile(file);
            return this.outFile(file, outPath, text);
        });
    }
    outFile(file, outPath, context) {
        return new Promise((resolve, reject) => {
            const fileSubPath = path.basename(file);
            const filePath = path.join(outPath, fileSubPath);
            fs.writeFile(filePath, context, (writeError) => {
                if (writeError) {
                    reject(writeError);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.GitHelper = GitHelper;
;
