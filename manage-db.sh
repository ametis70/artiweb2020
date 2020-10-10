#!/bin/sh
set -Eeo pipefail

# This script asumes postgres container_name is "mysql", and the user and db are "directus"

# get $MYSQL_PASSWORD from .env
source ./.env

backup() {
  if [ -z "$FILENAME" ]; then
    FILENAME="dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql"
  fi

  sudo docker-compose exec -T mysql /usr/bin/mysqldump -udirectus -p$MYSQL_PASSWORD directus > $FILENAME 
  echo "$FILENAME written"
  exit 0
}

restore() {
  if [ -z "$FILENAME" ]; then
    help
    exit 1
  elif [ -f "$FILENAME" ]; then
    cat "$FILENAME" | sudo docker-compose exec -T /bin/bash -c 'mysql -uroot -proot'
    echo "backup $FILENAME restored"
    exit 0
  else
    echo "Error while opening $FILENAME"
    exit 1
  fi
}

help() {
  cat <<EOF

  Usage: $(basename $0) command

  Commands:
    backup [filename]
    restore filename

EOF
}

main() {
  if [ -z "$COMMAND" ]; then
    help
    exit 1
  fi

  case "$COMMAND" in
    "backup")
      backup
      ;;
    "restore")
      restore
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

COMMAND=$1
FILENAME=$2

main
