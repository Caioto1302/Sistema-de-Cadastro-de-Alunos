import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import decorateRequest from './plugins/decorateRequest.js'
import { autenticacaoRotas } from './routes/autenticacaoRotas.js'
import { usuariosRotas } from './routes/usuariosRotas.js'
import { adminRotas } from './routes/adminRotas.js'

const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})


app.register(decorateRequest)

app.register(autenticacaoRotas)
app.register(usuariosRotas)
app.register(adminRotas)

app
  .listen({
    port: 5000,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Servidor rodando em http://0.0.0.0:5000')
  })
