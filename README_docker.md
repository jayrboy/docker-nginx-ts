# Dockerfile and Nginx

https://www.docker.com/products/docker-desktop/

## Dockerfile (VS Code auto)

1. [CTRL + SHIFT + P] to `Docker: Add Docker Files to Workspace...`

- Node.js
- package.json
- yes (default: PORT 3000)

2. Delete: docker-compose.debug.yml

- Add: serviceName and imageName
- Update: docker-compose.yml

```s
version: '3.4'

services:
  dockernginxts:  # <SERVICE-NAME>
    image: docker-nginx-ts  # <IMAGE-NAME>
    container_name: docker-nginx-ts # <CONTAINER-NAME>
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
```

### (1) คำสั่งสร้าง Image และ RUN Container

```sh
docker build ./ -t <IMAGE-NAME> # <IMAGE-NAME> is Image. if needed

docker compose up
docker compose up -d    # creating a container image in the background. (Docker Desktop)
```

### (2) คำสั่ง: หยุดการทำงานของ Container

```sh
docker compose down
```

### (3) คำสั่ง: Docker Scaling

```sh
docker compose up --scale dockernginxts=3 # error scale <SERVICE-NAME>=3
```

3.1 ปัญหา

! Error: <CONTAINER-NAME> // ต้องให้ระบบ gen มาให้ กำหนดเองไม่ได้
! Error: port 3000:3000 // มัน config ที่เปิดตั้งแต่ scale1-3 port 3000

แนวทางแก้ไข

- Edit: docker-compose.yml

```s
version: '3.4'

services:
  dockernginxts:
    image: docker-nginx-ts
    # container_name: docker-nginx-ts # TODO: comment a <CONTAINER-NAME>
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
    # ports:  # TODO: comment port
    #   - 3000:3000
```

3.2 ทดสอบ Scaling อีกครั้ง

```sh
docker compose up --scale dockernginxts=3 # running
```

#### Configuration with Nginx

1. Add: Nginx Service to `docker-compose.yml`

```s
version: '3.4'

services:
  dockernginxts:
    image: docker-nginx-ts
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
    # ports:
    #   - 3000:3000
  #TODO: Add a Nginx
  nginx:
    container_name: nginx
    image: nginx:latest
    volumes:
      - ./conf.d:/etc/nginx/conf.d
    depends_on:
      - dockernginxts
    ports:
      - 3000:3000
  #TODO: Added a Nginx

```

2. Add: `conf.d/nginx.conf`

หาก Client ส่ง request มาที่ PORT: 3000 โดยใช้ Nginx ให้ Reverse Proxy เปลี่ยนเส้นที่ไปที่ http://api:3000 แทน

```conf
server {
    listen 3000;
    location / {
        proxy_pass http://api:3000;
    }
}
```

#### เพิ่ม Load Balancer กรณีมี Request จำนวนมากจาก Client

```sh
docker compose up --scale api=10 --build -d # running
```
