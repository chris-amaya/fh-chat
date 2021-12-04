FROM node:16-alpine as BASE
WORKDIR /usr/src/app
COPY . .
VOLUME [ "/usr/src/app/node_modules" ]
VOLUME [ "/usr/src/app/backend/node_modules" ]
VOLUME [ "/usr/src/app/frontend/node_modules" ]
RUN yarn install