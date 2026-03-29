import type { FastifyInstance } from "fastify";

export async function rotaPrincipal(app: FastifyInstance) {
  // GET - Teste

  app.get("/", async (request, reply) => {
    try {
      console.log("deu bom")

      return reply.sendFile("login.html");
    } catch (err) {
      console.log(err);
    }
  });
}