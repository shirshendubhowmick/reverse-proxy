# Simple NodeJS based reverse proxy

**Backend**

To start the proxy server:
```
cd backend
npm install
npm run dev
```

This starts the server at `localhost:8085`

The server has got two end points:

`PATCH /config`

This end point used to configure origin & destination mapping, example

```JSON
{ "www.abc.com": "www.xyz.com"}
````

This will proxy all request originating from `www.abc.com` to `www.xyz.com`


`ALL /proxy`

This endpoint acts as proxy endpoint, all request to this endpoint is proxied. As per the available origin destination mapping.

If a particular origin is not registered, server responds with status `400` and body
```JSON
{
    "error": "Origin not registered"
}
```
Incase the destination server is unreachable server responds with `500` and body
```JSON
{
    "error": "Unbale to reach destination server"
}
```

**Frontend**

To start the frontend server:
```
cd frontend
npm install
npm start
```
This will start the frontend local server. The frontend uses `/config` endpoint to configure origin & destination mapping.