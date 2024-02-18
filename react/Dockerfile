FROM node:latest

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ADD / /home/node/app/
RUN mkdir -p /home/node/app/dist

RUN npm i

RUN npm run build

CMD ["npm", "run", "dev"]