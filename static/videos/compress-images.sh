#!/usr/bin/env bash

MEDIA_DIRECTORY=$(dirname $(command -v "$0"))

for input_file in $MEDIA_DIRECTORY/*.webm; do
	frame_output="$MEDIA_DIRECTORY/$(basename "${input_file%.webm}.webp")"
	ffmpeg -loglevel error -n -i "$input_file" -vframes 1 "$frame_output"
done
