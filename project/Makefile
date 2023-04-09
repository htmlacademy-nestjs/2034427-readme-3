nx-all: all-run
nx-account: account-run
nx-blog: blog-run
nx-comments: comments-run

### Docker

account-up:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml up -d
account-down:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml down --remove-orphans
account-clear:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml down --remove-orphans -v

blog-up:
	docker-compose --file ./apps/blog/docker-compose.dev.yml up -d
blog-down:
	docker-compose --file ./apps/blog/docker-compose.dev.yml down --remove-orphans
blog-clear:
	docker-compose --file ./apps/blog/docker-compose.dev.yml down --remove-orphans -v

### NX

all-run:
	nx run-many --target=serve --all --parallel=10

account-run:
	nx run accounts:serve

blog-run:
	nx run blog:serve

nx-lint:
	nx run-many --target=lint
