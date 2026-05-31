import type { FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function buscaChamados(request: FastifyRequest) {
  let chamados

  if (request.user.ehAdm !== true) {
    chamados = await prisma.chamados.findMany({
      where: {
        usuarioId: request.user.id,
      },
      orderBy: {
        dataCriacao: 'asc',
      },
      include: {
        usuarios: {
          select: {
            nome: true,
            email: true
          }
        }
      }
    })

    if (chamados.length === 0) {
      throw new Error('Este usuário não possui chamados')
    }
  } else {
    chamados = await prisma.chamados.findMany({
      orderBy: {
        dataCriacao: 'asc',
      },
      include: {
        usuarios: {
          select: {
            nome: true,
            email: true
          }
        }
      }
    })

    if (chamados.length === 0) {
      throw new Error('Não há chamados no sistema')
    }
  }

  return chamados
}
