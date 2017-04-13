# Udacity - Intro to Relational Databases

## Set Up

### Install Postgresql

```sh
$ sudo apt install postgresql postgresql-client
```

### Set Up Postgresql

```sh
$ sudo -u postgres createuser --superuser sabertazimi
$ sudo -u postgres createdb -O sabertazimi udacity
$ psql udacity
```

### Install Psycopg2

```sh
$ sudo apt install python-psycopg2
```

### Import Schemas

```sh
$ psql tournament < tournament.sql
```

