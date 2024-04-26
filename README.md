# Dockerizacion

## Crear imagen

docker build -t app-streaming-front-image .

## Ejecutar image, crear contenedor

docker run --name av-app-streaming-front-container -d -p 8888:80 av-app-streaming-front-image

## Abrir en navegador

http://localhost:8888/

