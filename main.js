import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const server = http.Server(app);

const ROOT_PATH = path.resolve('.');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');

app.use(express.static(PUBLIC_PATH));

app.get('/', (request, responce) => {
    responce.sendFile(path.join(PUBLIC_PATH, 'index.html'));
})

server.listen(80, () => {
    console.log("SERVER START");
});
