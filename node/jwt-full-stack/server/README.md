# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## PostgreSQL

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

```bash
sudo -i -u postgres
postgres@server:~$ createuser --interactive

Enter name of role to add: dev
Shall the new role be a superuser? (y/n) y
```

```bash
sudo adduser dev
sudo -i -u dev
dev@server:~$ createdb dev
```

```bash
# connect to database
psql -d postgres
psql -d dev
```
