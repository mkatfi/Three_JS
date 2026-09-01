NAME = scroll-animation

all:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose restart

re:
	docker compose down
	docker compose up --build

install:
	docker compose run --rm threejs-app npm install

fclean:
	./clean.sh