# dockerfile for carthago deploy.
FROM node:16.13 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
RUN ls
RUN ls dist/

FROM nginx:latest
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html
RUN sed -i 's/\(index.*\)/try_files\ \$uri\ \$uri\/\ \/index.html;/' /etc/nginx/conf.d/default.conf

# my bad way.w sana wehlet fel webpack iwwwwww.
RUN cp /usr/share/nginx/html/styles*.css /usr/share/nginx/html/easybet.css

EXPOSE 80
