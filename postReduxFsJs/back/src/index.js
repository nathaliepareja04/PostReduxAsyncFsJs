import { connectDb } from "./database.js";
import Fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import { postRoutes } from "./routes/post.routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(connectDb);
fastify.register(cors, { origin: "*" });
fastify.register(formbody);

//ROUTES
fastify.register(postRoutes, { prefix: "/post" });

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("server escuchando por el puerto 4000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
