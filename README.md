# Server-Sent Events (SSE)
Server-Sent Events (SSE) is a technology where a server can push updates to the browser over a single, `long-lived HTTP connection`. This is particularly useful for real-time updates, like auto-refreshing a table in a React application when new data is added.

## SSE Overview
- SSE Basics: SSE is a unidirectional communication channel (server to client). Unlike WebSockets, which allow bidirectional communication, SSE is simpler to implement when you only need the server to push updates to the client.
- Browser Support: SSE is natively supported in modern browsers via the `EventSource API`. This makes it easy to set up without requiring additional libraries or frameworks on the client side.

## How SSE Works
1. Client Initiates Connection: The client creates an EventSource connection to the server.
2. Server Sends Events: The server sends updates to the client over this connection as text data, formatted according to the SSE protocol.
3. Client Receives Updates: The client listens for incoming messages and processes them, such as updating the UI with new data.

## Advantages of Using SSE
- Simple Setup: SSE is straightforward to implement for scenarios where the server needs to push updates to the client.
- Built-In Reconnection: The `EventSource API automatically handles reconnections` if the connection drops, making it reliable for real-time updates.
- Lightweight: SSE is less resource-intensive compared to WebSockets, as it uses a single `HTTP connection` and sends only the necessary updates.

# Limitations
- Unidirectional: SSE only allows the server to send data to the client. If you need two-way communication, WebSockets would be more appropriate.
- Scaling Considerations: While SSE works well for a smaller number of clients, scaling to a large number of concurrent connections may require more `robust server architecture`, such as using a `load balancer` or `horizontally scaling` your servers.

# Attention points
- Works only in moderns browser
- When not used over HTTP/2, SSE suffers from a limitation to the maximum number of open connections, which can be especially painful when opening multiple tabs, as the limit is per browser and is set to a very low number (6). The issue has been marked as "Won't fix" in Chrome and Firefox. This limit is per browser + domain, which means that you can open 6 SSE connections across all of the tabs to www.example1.com and another 6 SSE connections to www.example2.com (per Stackoverflow). When using HTTP/2, the maximum number of simultaneous HTTP streams is negotiated between the server and the client (defaults to 100)
- Pay attention with: server scaling, load balancing, number of connections, open/close connections, etc

# How to run locally
- Choose a **BFF** between NestJS or Express (both runs on 3001 port) and run:
  - NestJS: `npm run start`
  - Express: `node server.js`
- Run the **React web app**: `npm start`
- Open the **web app** on `http://localhost:3000`
- Create new offers calling the **BFF**: 
    ```curl
    curl --request POST \
        --url http://localhost:3001/offers \
        --header 'Content-Type: application/json' \
        --data '{
            "id": 1,
            "description": "Special Offer",
            "value": 1000000
        }'
    ```
  
# Reference:
https://docs.nestjs.com/techniques/server-sent-events \
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events \
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server \
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format \
