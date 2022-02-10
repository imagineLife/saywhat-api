FROM node:16.13-alpine as dev-dependencies

WORKDIR /server
# COPY files & directories from host into image
COPY package.json package-lock.json index.js ./
COPY db/ db/
COPY global/ global/
COPY helpers/ helpers/
COPY middleware/ middleware/
COPY routes/ routes/
COPY server-setup/ server-setup/

RUN npm i
RUN npm install -g nodemon

FROM node:16.13-alpine as build
COPY --from=dev-dependencies . .
RUN npm run build
USER node
CMD ["nodemon", "."]