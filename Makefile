.PHONY:	start status stop

start:
	docker-compose up -d --build

status:
	docker ps

stop:
	docker-compose down
