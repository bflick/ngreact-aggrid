FROM node:0.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install

ENV NODE_ENV development # production for staging

CMD [ "npm", "start" ]

EXPOSE 3000
