# payment-front

## Requirement

- Git
- Docker
- Docker Compose
- GNU/Make

## Installation

```console
$ git clone git@github.com:esgi-react-node/payment-front.git
$ cd payment-front
```

## Commands

Command | Description
---|---
`make start` | Start the Docker Compose services.
`make install` | Install the Node modules.
`make dev` | Start the web server at [localhost:9000](http://localhost:9000/).
`make stop` | Stop the Docker Compose services.
`make prod` | Build the website's static files.
`make clean` | Remove all files listed in `.gitignore`.
`make test` | Run all specifications files in the `lib` folder.
`make restart` | Restart the Docker Compose services.
