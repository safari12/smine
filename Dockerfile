FROM node:alpine

LABEL maintainer="Reza Safari <rsafari.s@gmail.com>"

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "./bin/smine.js" ]
CMD [ "--config", "./config/config.json" ]