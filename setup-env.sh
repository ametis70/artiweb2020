#!/bin/sh

check_available() {
  # Function to check if a program is installed
  which $1 &> /dev/null

  if [ $? = 1 ]; then
    echo "$1 is not available, please install it before running the script"
    exit 1
  fi
}

gen_key() {
  check_available uuidgen
  uuidgen
}


gen_secret() {
  check_available openssl
  openssl rand -base64 24
}

read -p "Directus key: (press enter to randomize): " directus_key
directus_key=${directus_key:-`gen_key`}

read -p "Directus secret: (press enter to randomize): " directus_secret
directus_secret=${directus_secret:-`gen_secret`}

if [ ! -f "./.env" ]; then
  echo "Copying ./env.example to ./.env"
  cp ./env.example ./.env
fi

sed -i -e "s#KEY=.*#KEY=${directus_key}#g" \
       "$(dirname "$0")/.env"

sed -i -e "s#SECRET=.*#SECRET=${directus_secret}#g" \
       "$(dirname "$0")/.env"
