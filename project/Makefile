nx-all: all-run
nx-account: account-run
nx-blog: blog-run
nx-uploader: uploader-run

### Docker
account-up:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml up -d
account-down:
	docker-compose --file ./apps/accounts/docker-compose.dev.yml down --remove-orphans

blog-up:
	docker-compose --file ./apps/blog/docker-compose.dev.yml up -d
blog-down:
	docker-compose --file ./apps/blog/docker-compose.dev.yml down --remove-orphans

uploader-up:
	docker-compose --file ./apps/uploader/docker-compose.dev.yml up -d
uploader-down:
	docker-compose --file ./apps/uploader/docker-compose.dev.yml down --remove-orphans

notify-up:
	docker-compose --file ./apps/notify/docker-compose.dev.yml up -d
notify-down:
	docker-compose --file ./apps/notify/docker-compose.dev.yml down --remove-orphans

### NX
all-run:
	nx run-many --target=serve --all --parallel=10

account-run:
	nx run accounts:serve
blog-run:
	nx run blog:serve
uploader-run:
	nx run uploader:serve
notify-run:
	nx run notify:serve
gateway-run:
	nx run gateway:serve


nx-lint:
	nx run-many --target=lint
