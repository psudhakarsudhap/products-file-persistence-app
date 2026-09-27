# Products Persistence API

A small Express API that supports product CRUD operations and stores records in `data/products.json`.

## Requirements

- Node.js 18 or later
- npm

## Run locally

From this directory, install dependencies and start the server:

```sh
npm install
npm start
```

The server runs at `http://localhost:5000` and restarts automatically when the server file changes. Product changes are written to `data/products.json`.

## API

All routes accept and return JSON. Products use a numeric `id` and can include fields such as `name`, `category`, and `price`.

| Method   | Path                              | Description                          |
| -------- | --------------------------------- | ------------------------------------ |
| `GET`    | `/`                               | Check that the server is running     |
| `POST`   | `/products`                       | Add a product using the request body |
| `GET`    | `/products`                       | List all products                    |
| `GET`    | `/products/:id`                   | Get a product by numeric ID          |
| `GET`    | `/products?category=someCategory` | Get products by category             |
| `PUT`    | `/products/:id`                   | Update fields on a product           |
| `DELETE` | `/products/:id`                   | Delete a product                     |

### Examples

Add a product:

```sh
curl.exe -X POST http://localhost:5000/products -H "Content-Type: application/json" -d "{\"id\":3,\"name\":\"tablet\",\"category\":\"electronics\",\"price\":25000}"
```

List products or retrieve one by ID:

```sh
curl.exe http://localhost:5000/products
curl.exe http://localhost:5000/products/1
curl.exe http://localhost:5000/products?category=someCategory
```

Update or delete product `1`:

```sh
curl.exe -X PUT http://localhost:5000/products/1 -H "Content-Type: application/json" -d "{\"price\":45000}"
curl.exe -X DELETE http://localhost:5000/products/1
```

Requests for an unknown product or route return `404`.
