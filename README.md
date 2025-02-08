`microsite` is a very simple way to generate a website using Cloudflare Workers and KV.

[`/raycast`](https://github.com/kristianfreeman/microsite/tree/main/raycast) is a Raycast extension that you can use to edit the site directly.

## Install

1. git clone
2. `npm install`
3. set a secret: `wrangler secret put secret`
4. `npm run deploy`

## API

`GET /` returns the content
`POST /` accepts a text body and updates the content - it requires a secret set as `X-Api-Key` header value

## Raycast

You can work with your microsite directly from Raycast. Install the extension and then set your deploy URL and secret. Now run the "Update Microsite" action.
