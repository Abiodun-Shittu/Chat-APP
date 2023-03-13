.PHONY: help
help:
	@echo ------------------------------------
	@echo  LIST OF AVAILABLE MAKEFILE COMMANDS
	@echo ------------------------------------
	@echo
	@echo "make help: will print this message"
	@echo
	@echo "make install": "Installs all dependencies"
	@echo
	@echo "make start": "Starts the application"
	@echo
	@echo "make stop": "Stops the application"
	@echo
	@echo "make logs": "Shows the logs of the application"
	@echo

.PHONY: install
install:
	docker compose run app yarn install

.PHONY: start
start:
	docker compose up -d

.PHONY: stop
stop:
	docker compose down

.PHONY: logs
logs:
	docker compose logs -f
