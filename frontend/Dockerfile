FROM node:16-slim

ARG PORT=3000
ENV PORT $PORT

RUN npm i npm@latest -g

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app/frontend

COPY . .

EXPOSE $PORT

# For react apps, it is better to run npm run build 
# and serve the build through nginx or some other server
CMD [ "npm", "start" ]
