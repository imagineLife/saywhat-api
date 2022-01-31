FROM node:16.13-alpine

# COPY files & directories from host into image
COPY package.json package-lock.json index.js ./
COPY routes/ routes/
RUN npm i

USER node
CMD ["node", "."]