#!/bin/sh

check_available() {
  # Function to check if a program is installed
  which $1 &> /dev/null

  if [ $? = 1 ]; then
    echo "$1 is not available, please install it before running the script"
    exit 1
  fi
}

gen_password() {
  check_available openssl
  openssl rand -base64 32
}

read -p "MySQL password: (press enter to randomize): " mysql_password
mysql_password=${mysql_password:-`gen_password`}

read -p "Directus pubkey: (press enter to randomize): " directus_pubkey
directus_pubkey=${directus_pubkey:-`gen_password`}

read -p "Directus secretkey: (press enter to randomize): " directus_secret
directus_secret=${directus_secret:-`gen_password`}

if [ ! -f "./.env" ]; then
  echo "Copying ./env.example to ./.env"
  cp ./env.example ./.env
fi

sed -i -e "s#MYSQL_PASSWORD=.*#MYSQL_PASSWORD=${mysql_password}#g" \
       "$(dirname "$0")/.env"

sed -i -e "s#DIRECTUS_AUTH_PUBLICKEY=.*#DIRECTUS_AUTH_PUBLICKEY=${directus_pubkey}#g" \
       "$(dirname "$0")/.env"

sed -i -e "s#DIRECTUS_AUTH_SECRETKEY=.*#DIRECTUS_AUTH_SECRETKEY=${directus_secret}#g" \
       "$(dirname "$0")/.env"

read -p "Start docker containers? (requires docker-compose) [Y/n] " start_docker
start_docker=${start_docker:-Y}

if [[ $start_docker =~ [yY] ]]; then
  check_available docker-compose
  sudo docker-compose up -d

  # while true; do
  #    sudo docker-compose logs mysql | grep "mysqld: ready for connections" &> /dev/null
  #    EC=$?
  #    if [ $EC -eq 0 ]; then
  #        sleep 5
  #        sudo docker-compose run --rm directus install --email admin@artiweb.net --password password
  #        break
  #    fi
  # done
fi
