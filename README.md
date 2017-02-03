# `mangal-backend`

[![Join the chat at https://gitter.im/mangal-wg/mangal-backend](https://badges.gitter.im/mangal-wg/mangal-backend.svg)](https://gitter.im/mangal-wg/mangal-backend?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![license](https://img.shields.io/github/license/mangal-wg/mangal-backend.svg?maxAge=2592000?style=flat-square)]() [![Build Status](https://travis-ci.org/mangal-wg/mangal-backend.svg?branch=master)](https://travis-ci.org/mangal-wg/mangal-backend)

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

## Getting started with `mangal-backend`

``` bash
npm install
npm run deploy_dbs
npm test
```
