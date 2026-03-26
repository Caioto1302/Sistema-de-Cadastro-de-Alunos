import type { FastifyInstance } from "fastify";

export async function rotaPrincipal(app: FastifyInstance) {
  // GET - Teste

  app.get("/", async (request, reply) => {
    console.log("deu bom")

    return reply.sendFile("inicio.html");
  });
}