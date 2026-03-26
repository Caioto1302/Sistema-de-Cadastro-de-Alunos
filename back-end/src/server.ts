import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import decorateRequest from './plugins/decorateRequest.js'
import { autenticacaoRotas } from './routes/autenticacaoRotas.js'
import { usuariosRotas } from './routes/usuariosRotas.js'
import { adminRotas } from './routes/adminRotas.js'
import { rotaPrincipal } from './routes/rotaPrincipal.js'
import fastifyStatic from '@fastify/static'
import { join } from 'path'

const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(fastifyStatic, {
  root: join(__dirname, '../../front-End/pages'),
})

app.register(decorateRequest)

app.register(autenticacaoRotas)
app.register(usuariosRotas)
app.register(adminRotas)
app.register(rotaPrincipal)

app
  .listen({
    port: 5000,
  })
  .then(() => {
    console.log('Servidor rodando em http://localhost:5000')
  })
