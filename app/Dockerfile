FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DOCKERIZE_VERSION v0.9.2

RUN apk add --no-cache wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && rm -rf /var/cache/apk/*

EXPOSE 3000

ENTRYPOINT ["dockerize", "-wait", "tcp://mysqldb:3306", "-timeout", "20s", "node", "index.js"]
