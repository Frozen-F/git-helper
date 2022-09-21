git-helper
===

git api简单封装，目前仅支持下载文件.

## Installation

Install with npm

    npm install @fxs0819/git-helper

## Examples

```javascript
/** github */
const h = new GitHelper({
    provider: 'github',
    repository: 'https://github.com/xxx.git',
    branch: 'master',
    config: {
        userName: 'xxx', // Github Basic Auth Username
        password: 'xxx' // Github Basic Auth Password
    }
});
const f = await h.readFile('package.json');

// 或

const h = new GitHelper({
    provider: 'github',
    repository: 'https://github.com/xxx.git',
    branch: 'master',
    config: {
        oauth2Token: 'xxx' // Github OAuth2 Token
    }
});
const f = await h.readFile('package.json');

```

```javascript
/** gitlab */
const h = new GitHelper({
    provider: 'gitlab',
    repository: 'https://gitlab.com/xx.git',
    branch: 'master',
    config: {
        privateToken: 'xxx' // Gitlab Personal Access Tokens
    }
});
const f = await h.readFile('package.json');
```

## License

**MIT**

[GitLab REST API](https://docs.gitlab.com/ee/development/documentation/restful_api_styleguide.html#curl-commands)