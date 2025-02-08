export default {
  async fetch(request, env, ctx) {
    const text = await env.kv.get('text')
    return new Response(text)
  }
}
