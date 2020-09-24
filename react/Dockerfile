FROM node:latest

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ADD / /home/node/app/

RUN yarn

RUN yarn global add react-scripts@3.4.3

RUN yarn build

CMD ["yarn", "start"]