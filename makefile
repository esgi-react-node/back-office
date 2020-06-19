.PHONY: start stop restart install

start:
	docker-compose pull
	docker-compose up --detach --quiet-pull --force-recreate --always-recreate-deps --build --renew-anon-volumes --remove-orphans

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install:
	docker-compose exec node yarn install

dev:
	docker-compose exec node yarn dev

prod:
	docker-compose exec node yarn prod

clean:
	docker-compose exec node sh -c 'for file in $(shell cat .gitignore); do rm -rf $$file; done'

test:
	docker-compose exec node yarn test
