FROM node:18
WORKDIR /app
COPY . .
RUN npm install express cors node-fetch
EXPOSE 80
CMD ["npx", "serve", "-s", ".", "-l", "80"]
