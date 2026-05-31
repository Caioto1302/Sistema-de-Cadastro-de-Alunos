import { prisma } from '../../lib/prisma'

export async function buscaChamado(id: string) {
  const chamado = await prisma.chamados.findUnique({
    where: {
      id,
    },
    include: {
      Respostas: {
        include: {
          usuario_id: {
            select: {
              nome: true
            }
          }
        }
      },
      usuarios: {
        select: {
          nome: true,
          email: true
        }
      }
    },
  })

  if (!chamado) throw new Error('Este chamado não existe')

  return chamado
}
