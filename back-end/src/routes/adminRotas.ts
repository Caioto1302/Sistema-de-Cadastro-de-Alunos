import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { autenticar } from '../middleware/autenticar'
import { autenticarAdmin } from '../middleware/autenticarAdmin'
import { validaId } from '../validators/validaId'
import { validaBodyRespostas } from '../validators/validaBodyRepostas'
import { buscaChamado } from '../services/chamados/buscaChamado'
import { atualizaChamado } from '../services/chamados/atualizaChamado'
import { buscaUsuario } from '../services/usuarios/buscaUsuario'
import { buscaRespostas } from '../services/respostas/buscaRespostas'
import { criaResposta } from '../services/respostas/criaResposta'
import { atualizaResposta } from '../services/respostas/atualizaResposta'
import { deletaResposta } from '../services/respostas/deletaResposta'
import { enviaEmail } from '../email_services/enviaEmail'

import { buscaUsuarios } from '../services/usuarios/buscaUsuarios'
import { criaUsuario } from '../services/usuarios/criaUsuario'
import { atualizaUsuario } from '../services/usuarios/atualizaUsuario'
import { deletaUsuario } from '../services/usuarios/deletaUsuario'
import { prisma } from '../lib/prisma'

export async function adminRotas(app: FastifyInstance) {
  app.register(async (rotasAdmin) => {
    rotasAdmin.addHook('preHandler', autenticar)
    rotasAdmin.addHook('preHandler', autenticarAdmin)

    // PUT - Editar status do chamado

    rotasAdmin.put<{
      Body: { status: string }
      Params: { id: string }
    }>('/chamados/:id', async (request, reply) => {
      const statusSchema = z.enum(['Aberto', 'EmAndamento', 'Concluido'])

      try {
        const idValido = validaId(request.params.id)

        await buscaChamado(idValido)

        const status = statusSchema.parse(request.body.status)

        const chamado = await atualizaChamado(idValido, status)

        const usuario = await buscaUsuario(chamado.usuarioId)

        const link = `http://localhost:5173/pages/acompanhar-chamados.html`

        await enviaEmail(
          usuario.email,
          `UNICLASS - CHAMADO COM TÍTULO "${chamado.titulo}" TEVE STATUS ALTERADO`,
          `
          <p>Seu chamado está sendo analisado, segue o link do acompanhamento:</p>
          <a href="${link}">${link}</a>
          `,
        )

        return reply.status(200).send(chamado)
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.log(err)
          return reply
            .status(400)
            .send({ message: 'Formato de dados inválido' })
        } else if (
          err instanceof Error &&
          err.message === 'Este chamado não existe'
        ) {
          console.log(err)
          return reply.status(404).send({ message: err.message })
        }

        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // GET - Puxa todas as respostas á chamados do sistema e ordena pelo mais antigo primeiro

    rotasAdmin.get<{ Querystring: { usuarioId?: string } }>(
      '/respostas',
      async (request, reply) => {
        try {
          let usuarioId = request.query.usuarioId

          if (usuarioId) {
            usuarioId = validaId(usuarioId)

            await buscaUsuario(usuarioId)
          }

          return reply.status(200).send(await buscaRespostas(usuarioId))
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err)
            return reply.status(400).send({ message: 'Formato de id inválido' })
          } else if (
            err instanceof Error &&
            err.message === 'Este usuário não existe'
          ) {
            console.log(err)
            return reply.status(404).send({ message: err.message })
          } else if (
            err instanceof Error &&
            err.message === 'Este usuário não possui chamados concluídos'
          ) {
            console.log(err)
            return reply.status(404).send({ message: err.message })
          } else if (
            err instanceof Error &&
            err.message === 'Não há chamados concluídos no sistema'
          ) {
            console.log(err)
            return reply.status(404).send({ message: err.message })
          }

          console.log(err)
          return reply.status(500).send({ message: 'Erro interno no servidor' })
        }
      },
    )

    // POST - Cria uma resposta a um chamado

    rotasAdmin.post<{
      Body: { chamadoId: string; mensagem: string }
    }>('/respostas', async (request, reply) => {
      try {
        validaBodyRespostas(request.body.mensagem)

        const chamado = await buscaChamado(request.body.chamadoId)

        const usuario = await buscaUsuario(chamado.usuarioId)

        const chamadoRespondido = await criaResposta(request)

        const link = `http://localhost:5173/pages/acompanhar-chamados.html`

        await enviaEmail(
          usuario.email,
          `UNICLASS - CHAMADO COM TÍTULO "${chamadoRespondido?.titulo}" RESPONDIDO`,
          `
          <p>Seu chamado foi respondido, segue link do acompanhamento de chamados:</p>
          <a href="${link}">${link}</a>
          `,
        )

        return reply.status(200).send(chamadoRespondido)
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.log(err)
          return reply
            .status(400)
            .send({ message: 'Formato de campo inválido' })
        } else if (
          err instanceof Error &&
          err.message === 'Este chamado não existe'
        ) {
          console.log(err)
          return reply.status(404).send({ message: err.message })
        }

        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // PUT - Muda a resposta de um chamado

    rotasAdmin.put<{
      Body: { mensagem: string }
      Params: { id: string }
    }>('/respostas/:id', async (request, reply) => {
      try {
        const id = validaId(request.params.id)

        validaBodyRespostas(request.body.mensagem)

        return reply
          .status(200)
          .send(await atualizaResposta(id, request.body.mensagem))
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.log(err)
          return reply
            .status(400)
            .send({ message: 'Formato de campo inválido' })
        }

        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // DELETE - Deleta uma resposta de um chamado

    rotasAdmin.delete<{ Params: { id: string } }>(
      '/respostas/:id',
      async (request, reply) => {
        try {
          const id = validaId(request.params.id)

          await deletaResposta(id)

          return reply
            .status(200)
            .send({ message: 'Resposta apagada com sucesso!' })
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err)
            return reply
              .status(400)
              .send({ message: 'Formato de campo inválido' })
          }

          console.log(err)
          return reply.status(500).send({ message: 'Erro interno no servidor' })
        }
      },
    )

    // GET - Puxa todos os usuários

    rotasAdmin.get('/usuarios', async (request, reply) => {
      try {
        const usuarios = await buscaUsuarios()
        return reply.status(200).send(usuarios)
      } catch (err) {
        if (err instanceof Error && err.message === 'Não há usuários no sistema') {
          return reply.status(404).send({ message: err.message })
        }
        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // GET - Puxa um único usuário

    rotasAdmin.get<{ Params: { id: string } }>('/usuarios/:id', async (request, reply) => {
      try {
        const idValido = validaId(request.params.id)
        const usuario = await buscaUsuario(idValido)
        return reply.status(200).send({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          ehAdm: usuario.ehAdm
        })
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: 'Formato de id inválido' })
        } else if (err instanceof Error && err.message === 'Este usuário não existe') {
          return reply.status(404).send({ message: err.message })
        }
        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // POST - Cria um novo usuário (Admin)

    rotasAdmin.post<{
      Body: { nome: string; sobrenome: string; email: string; senha: string; ehAdm?: boolean }
    }>('/usuarios', async (request, reply) => {
      try {
        const schema = z.object({
          nome: z.string().min(1, 'Nome é obrigatório'),
          sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
          email: z.string().email('E-mail inválido'),
          senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
          ehAdm: z.boolean().optional()
        })
        const dadosValidados = schema.parse(request.body)

        const usuarioExistente = await prisma.usuarios.findUnique({
          where: { email: dadosValidados.email }
        })

        if (usuarioExistente) {
          return reply.status(409).send({ message: 'E-mail já cadastrado' })
        }

        const usuario = await criaUsuario(request as any)
        return reply.status(201).send(usuario)
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: err.errors[0].message })
        }
        console.error(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })

    // PUT - Atualiza nome, e-mail, senha ou role do usuário

    rotasAdmin.put<{
      Body: { nome?: string; email?: string; senha?: string; ehAdm?: boolean }
      Params: { id: string }
    }>('/usuarios/:id', async (request, reply) => {
      try {
        const idValido = validaId(request.params.id)
        const schema = z.object({
          nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
          email: z.string().email('E-mail inválido').optional(),
          senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
          ehAdm: z.boolean().optional()
        })
        const dadosValidados = schema.parse(request.body)

        const usuarioAtualizado = await atualizaUsuario(idValido, dadosValidados)
        return reply.status(200).send(usuarioAtualizado)
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: err.errors[0].message })
        } else if (err instanceof Error && err.message === 'Este usuário não existe') {
          return reply.status(404).send({ message: err.message })
        }
        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })
    // DELETE - Deleta um usuário

    rotasAdmin.delete<{ Params: { id: string } }>('/usuarios/:id', async (request, reply) => {
      try {
        const idValido = validaId(request.params.id)
        await deletaUsuario(idValido)
        return reply.status(200).send({ message: 'Usuário excluído com sucesso!' })
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: 'Formato de id inválido' })
        } else if (err instanceof Error && err.message === 'Este usuário não existe') {
          return reply.status(404).send({ message: err.message })
        }
        console.log(err)
        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    })
  })
}
