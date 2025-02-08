import { Hono } from 'hono'
const app = new Hono()

app.get('/', async (c) => {
  const text = await c.env.kv.get('text')
  return new Response(text)
})

app.post('/', async (c) => {
  const auth = c.req.header('X-Api-Key')
  if (!c.env.secret) return new Response('No secret set, cannot authorize', { status: 500 })
  if (!auth) return new Response('Unauthorized', { status: 401 })
  if (auth !== c.env.secret) return new Response('Unauthorized', { status: 401 })

  const text = await c.req.text()
  await c.env.kv.put('text', text)
  return new Response('ok')
})

export default app
