FROM node:latest

WORKDIR /home/node/app
ADD / /home/node/app/

RUN yarn

RUN ls /home/node/app

CMD [ "yarn", "start" ]