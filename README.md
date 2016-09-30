# `mangaljs`

[![license](https://img.shields.io/github/license/mangal-wg/mangaljs.svg?maxAge=2592000?style=flat-square)]() [![Build Status](https://travis-ci.org/mangal-wg/mangaljs.svg?branch=master)](https://travis-ci.org/mangal-wg/mangaljs)

Server backend with API services.

:warning: **in development** :warning:

When released, this will introduce *v2* of the [mangal.io](http://mangal.io)
API, *and* be used for the front-end.

## Install and set `postgresql`

### on Fedora

``` bash
# dnf install postgresql95-server postgresql95-contrib
# /usr/pgsql-9.5/bin/postgresql95-setup initdb
# systemctl enable postgresql-9.5.service
# systemctl start postgresql-9.5.service
# createuser postgres --superuser
```

### on Mac OSX

``` bash
brew install postgresql
brew services start postgresql
initdb /usr/local/var/postgres
createuser postgres --superuser
```

## Getting started with `mangaljs`

``` bash
npm install
npm run deploy_dbs
npm test
```
