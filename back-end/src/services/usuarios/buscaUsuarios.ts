import { prisma } from '../../lib/prisma.js'

export async function buscaUsuarios() {
  const usuarios = await prisma.usuarios.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      ehAdm: true,
    },
    orderBy: {
      nome: 'asc',
    },
  })

  if (!usuarios || usuarios.length === 0) throw new Error('Não há usuários no sistema')

  return usuarios
}
