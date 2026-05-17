#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const upstreamUrl = 'https://github.com/guokaigdg/animal-island-ui.git';

function git(args, options = {}) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim();
}

function hasRemote(name) {
  return git(['remote']).split('\n').filter(Boolean).includes(name);
}

if (!hasRemote('upstream')) {
  git(['remote', 'add', 'upstream', upstreamUrl]);
}

git(['fetch', '--depth=1', 'upstream', 'main:refs/remotes/upstream/main'], {
  stdio: ['ignore', 'pipe', 'inherit'],
});

const headSha = git(['rev-parse', 'HEAD']);
const upstreamSha = git(['rev-parse', 'upstream/main']);
const [behind, ahead] = git([
  'rev-list',
  '--left-right',
  '--count',
  'HEAD...upstream/main',
]).split(/\s+/).map(Number);

const upstreamOnlyLog = git([
  'log',
  '--oneline',
  '--decorate',
  'HEAD..upstream/main',
]);

const forkOnlyLog = git([
  'log',
  '--oneline',
  '--decorate',
  'upstream/main..HEAD',
  '--max-count=20',
]);

console.log(`# Upstream sync check

- local HEAD: ${headSha}
- upstream/main: ${upstreamSha}
- upstream-only commits: ${ahead}
- fork-only commits: ${behind}

## Upstream-only commits

${upstreamOnlyLog || 'None.'}

## Recent fork-only commits

${forkOnlyLog || 'None.'}
`);

if (ahead === 0) {
  console.log('No upstream-only commits found. Nothing to sync.');
}
