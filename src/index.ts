import express from "express";
import http    from "node:http"
import { Routes } from "./routes";

function bootstrap(){
  const app    = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT || 3000

  Routes(app)

  server.listen(PORT, () => {
    console.log('listening on: http://localhost:' + PORT);
  })
}

bootstrap()