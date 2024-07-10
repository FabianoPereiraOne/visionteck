export const httpStatus = {
  ok: { statusCode: 200, error: "OK" },
  create: { statusCode: 201, error: "Criado" },
  notContent: { statusCode: 204, error: "Nenhum Conteúdo" },
  invalidRequest: { statusCode: 400, error: "Requisição Inválida" },
  unAuthorized: { statusCode: 401, error: "Não Autorizado" },
  forbidden: { statusCode: 403, error: "Proibido" },
  notFound: { statusCode: 404, error: "Não Encontrado" },
  serverError: { statusCode: 500, error: "Erro Interno do Servidor" },
  badGateway: { statusCode: 502, error: "Bad Gateway" },
  notService: { statusCode: 503, error: "Serviço Indisponível" }
}
