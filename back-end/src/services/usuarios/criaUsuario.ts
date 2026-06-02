import type { FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcrypt'

export async function criaUsuario(
  request: FastifyRequest<{
    Body: { nome: string; sobrenome: string; email: string; senha: string; ehAdm?: boolean }
  }>,
) {
  const senhaHash = await bcrypt.hash(request.body.senha, 10)

  const usuario = await prisma.usuarios.create({
    data: {
      nome: `${request.body.nome} ${request.body.sobrenome}`,
      email: request.body.email,
      senha: senhaHash,
      ehAdm: request.body.ehAdm || false,
    },
  })

  return usuario
}
