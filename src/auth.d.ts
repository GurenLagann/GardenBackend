import '@fastify/jwt'

declare   module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string,
      nome: string,
      funcao: string,
      status: string
    }
  }
}