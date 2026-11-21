# The site is a static export (next.config.ts: output "export"), so there is no
# Node server to run. Build the static files, then serve them with nginx.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
# Serve /privacy-policy from privacy-policy.html, and use the exported 404 page.
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  location / { try_files $uri $uri.html $uri/ =404; }\n  error_page 404 /404.html;\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
