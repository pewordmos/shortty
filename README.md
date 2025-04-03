# 🩳 shortty

A very, _very_ simple (less than 100 LoC, for whatever that's worth) link shortener powered by [Cloudflare Workers](https://workers.cloudflare.com/) and [Hono](https://hono.dev/).

## Setup

[The docs are pretty much already written...](https://developers.cloudflare.com/workers/wrangler/) But essentially:

1. Create a Cloudflare KV store: `npx wrangler kv namespace create my-links`
1. Update [wrangler.jsonc](wrangler.jsonc) with that namespace's ID, your worker's name, and your own domain.
1. Set a random authentication token: `npx wrangler secret put BEARER_TOKEN`
1. Deploy: `npx wrangler deploy`

## Usage

There is **no GUI**. Quite literally everything is done via `curl` requests in your terminal (hence the name).

### Add a link with a _**random**_ shortcode

```sh
curl -X POST \
  -H "Authorization: Bearer <BEARER_TOKEN>" \
  -H "URL: https://ubuntu.com/download/server/thank-you?version=24.04.2&architecture=amd64&lts=true" \
  https://jrvs.io
```

### Add a link with a _**specific**_ shortcode

```sh
curl -X PUT \
  -H "Authorization: Bearer <BEARER_TOKEN>" \
  -H "URL: https://github.com/jakejarvis/shortty/blob/main/README.md" \
  https://jrvs.io/readme
```

### Delete a link

```sh
curl -X DELETE \
  -H "Authorization: Bearer <BEARER_TOKEN>" \
  https://jrvs.io/readme
```

### List all links

Soon, maybe. 🤷‍♂️

## License

[MIT](LICENSE)
