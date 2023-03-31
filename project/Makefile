up: docker-up
down: docker-down
clear: docker-clear
reset: down up

nx-all: all-accounts-run
nx-account: account-run
nx-blog: blog-run
nx-comments: comments-run

### Docker

docker-up:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml up -d

docker-down:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml down --remove-orphans

docker-clear:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml down --remove-orphans -v

### NX

all-accounts-run:
	nx run-many --target=serve --all --parallel=10

account-run:
	nx run accounts:serve

blog-run:
	nx run blog:serve

comments-run:
	nx run comments:serve

nx-lint:
	nx run-many --target=lint
