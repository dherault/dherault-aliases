#! /usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')

const aliases = `
function commit() {
  git add . -A

  if [[ -z "$1" ]]; then
    git commit
  else
    git commit -m "$*"
  fi
}

function amend() {
  git add . -A
  git commit --amend --no-edit
}

alias amendx="git commit --amend"
alias glog="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias grc="git add . -A && git rebase --continue"
alias gpf="git push --force-with-lease"
alias gp="git push"
alias gpl="git pull"
alias gs="git status"
alias n="npm start"
alias t="npm test"
alias d="npm run dev"
alias b="npm run build"
alias w="npm run watch"
alias i="npm i"
alias conflicts="git diff --name-only --diff-filter=U --relative"
alias fps-on="/bin/launchctl setenv MTL\_HUD\_ENABLED 1"
alias fps-off="/bin/launchctl setenv MTL\_HUD\_ENABLED 0"
`

const zshrcPath = path.resolve(process.env.HOME, '.zshrc')
const zshrc = fs.readFileSync(zshrcPath, 'utf8')

fs.writeFileSync(zshrcPath, zshrc + aliases)

execSync(`source ${zshrcPath}`, { shell: '/bin/zsh' })
