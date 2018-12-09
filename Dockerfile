FROM node:10

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --quiet
COPY . ./

CMD ["printenv"]
