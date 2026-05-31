import { prisma } from '../../lib/prisma.js'

export async function deletaUsuario(id: string) {
  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { id },
  })

  if (!usuarioExistente) throw new Error('Este usuário não existe')

  // Usa transação para garantir que os dados relacionados sejam apagados antes do usuário
  await prisma.$transaction([
    prisma.respostas.deleteMany({
      where: { usuarioId: id },
    }),
    prisma.chamados.deleteMany({
      where: { usuarioId: id },
    }),
    prisma.usuarios.delete({
      where: { id },
    }),
  ])
}
