import { prisma } from '../../lib/prisma.js'
import bcrypt from 'bcrypt'

export async function atualizaUsuario(id: string, dados: { nome?: string; email?: string; senha?: string }) {
  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { id },
  })

  if (!usuarioExistente) throw new Error('Este usuário não existe')

  const atualizacao: any = {}
  
  if (dados.nome) atualizacao.nome = dados.nome
  if (dados.email) atualizacao.email = dados.email
  if (dados.senha) {
    atualizacao.senha = await bcrypt.hash(dados.senha, 10)
  }

  const usuario = await prisma.usuarios.update({
    where: { id },
    data: atualizacao,
    select: {
      id: true,
      nome: true,
      email: true,
      ehAdm: true,
    }
  })

  return usuario
}
