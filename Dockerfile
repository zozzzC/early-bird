FROM node:18.18

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1010

CMD ["npm", "run", "dev"]