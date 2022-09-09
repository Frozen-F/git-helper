import { GitHelper } from '../src';

async function github() {
  const h = new GitHelper({
    provider: 'github',
    repository: 'https://github.com/xxx.git',
    branch: 'master',
    config: {
      userName: 'xxx',
      password: 'xxx'
    }
  });
  const f = await h.readFile('package.json');
  console.log(f);
}

async function gitlab() {
  const h = new GitHelper({
    provider: 'gitlab',
    repository: 'https://gitlab.com/xx.git',
    branch: 'master',
    config: {
      privateToken: 'xxx'
    }
  });
  const f = await h.readFile('package.json');
  console.log(f);
}

github();
gitlab();

