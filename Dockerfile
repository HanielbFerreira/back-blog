FROM node:12.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --quiet
COPY ./src .
EXPOSE 4000
CMD [ "npm", "start" ]