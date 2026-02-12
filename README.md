# ESGProgress
### An open platform for ESG Data from the top companies in the world

This project aims to consolidate ESG information, which is currently scattered across a lot of sources,
in inconsistent formats, into one comprehensible and consistent view. Our goal is to make corporate
ESG information available to the masses, and allow companies to be held accountable by the public in
cases wherein they sneakily change targets over time. 

To do this, we have established a set of standard questions for each of Environment, Social and Governance, plus
an additional set of Environment-related questions, which depend on the industry the company operates in. 
These answers are displayed on a minimalist interface that has been designed with user-friendliness and browser
performance in mind. 

-------

## Repository Structure
This is a monorepo, which means that all three components (main frontend, backend, docs frontend) sit in one repository.

-------

## Deployment instructions

#### Type 1: First-time deployment
Installation:
1. MongoDB
2. Node.js
3. Gunicorn (using a python virtual environment, and configure it appropriately as you need)
4. pm2


Configure the `.env` files with the correct paths, Auth0 keys, client secrets, Google Analytics keys, etc.
Make sure to keep the names of the collections and databases consistent across all three environment files.

```shell
sudo apt install pip
sudo apt install mongodb
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
nvm install
```

```shell
git clone https://github.com/ArjunQuickwork/esg_proj
cd esg_proj/backends
pip install -r requirements.txt
cd migrations
python insert_types_and_questions.py
cd ../..
pkill gunicorn
backends/.venv/bin/gunicorn backends.main:web_server -c backends/gunicorn.conf.py
pm2 delete all
cd frontend
npm ci
npm run build
pm2 start npm   --name next-app   --   run start -- -H 127.0.0.1 -p 3000
cd ../docs
npm ci
npm run build
pm2 start npm   --name next-app-docs   --   run start -- -H 127.0.0.1 -p 3002
```

Now, install Caddy (https://caddyserver.com/), and configure it as you need. As per our default configuration, the backend lives on port 3001, the main frontend on 3000 and the docs frontend on 3002.

```shell
caddy start
```


#### Type 2: Updation with no package changes

```shell
git pull
pkill gunicorn
backends/.venv/bin/gunicorn backends.main:web_server -c backends/gunicorn.conf.py
pm2 delete all
cd frontend
npm run build
pm2 start npm   --name next-app   --   run start -- -H 127.0.0.1 -p 3000
cd ../docs
npm run build
pm2 start npm   --name next-app-docs   --   run start -- -H 127.0.0.1 -p 3002
```

#### Type 3: Updating with package changes

```shell
git pull
cd backends
pip install -r requirements.txt
cd ..
pkill gunicorn
backends/.venv/bin/gunicorn backends.main:web_server -c backends/gunicorn.conf.py
pm2 delete all
cd frontend
npm run build
pm2 start npm   --name next-app   --   run start -- -H 127.0.0.1 -p 3000
cd ../docs
npm run build
pm2 start npm   --name next-app-docs   --   run start -- -H 127.0.0.1 -p 3002
```
