import postCtrl from "../controllers/post.controller.js";
import { postValid } from "../validation/postValid.js";

export const postRoutes = (fastify, opts, done) => {
  fastify.get("/", postCtrl.listAll);
  fastify.get("/:id", postCtrl.listById);
  fastify.post("/",{schema:postValid}, postCtrl.create);
  fastify.put("/:id", postCtrl.update);
  fastify.delete("/:id", postCtrl.delete);
  done();
};
