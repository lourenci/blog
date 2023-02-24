#!/bin/bash

gnu_sed="docker run --rm -i hairyhenderson/sed"

TITLE=$1
FILENAME="$(echo "$TITLE" | \
	$gnu_sed 's/ /-/g' | \
	$gnu_sed -E 's/[^0-9A-Za-z_-]+//g' | \
	$gnu_sed 's/./\L&/g').md"
POST_PATH="./content/posts/$FILENAME"
NOW=$(date +"%Y-%m-%dT%H:%M:%S%z")

cp ./template-post.md $POST_PATH

sed -i '' -e "s/{title}/$TITLE/" -e "s/{date}/$NOW/" $POST_PATH
