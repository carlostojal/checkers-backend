FROM node:current-alpine

WORKDIR /usr/src/checkers-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]