FROM node:latest

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ADD / /home/node/app/

RUN yarn

RUN yarn build

CMD ["yarn", "start"]