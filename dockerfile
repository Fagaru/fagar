FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE  3000
#CMD npm run dev
CMD HOSTNAME="0.0.0.0" node server.js
