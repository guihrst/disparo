FROM node:18
WORKDIR /app
COPY server.js .
RUN npm install express cors node-fetch
EXPOSE 3000
CMD ["node", "server.js"]
