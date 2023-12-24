#!/usr/bin/env bash

MEDIA_DIRECTORY=$(dirname $(command -v "$0"))

for input_file in $MEDIA_DIRECTORY/*.mp4; do
	width=(100 200 400 800 1000 1400 1800)
	for width in "${width[@]}"; do
		output_video="$MEDIA_DIRECTORY/$(basename "${input_file%.mp4}-${width}.webm")"
		ffmpeg -n -i "$input_file" -c:v libvpx-vp9 -fs 500k -vf "scale=$width:-1" -c:a libopus "$output_video"
	done
done
