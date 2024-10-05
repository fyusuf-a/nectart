import collections
import os
import re
import shutil
import tempfile
import typing

import click
import requests
import textwrap
import tqdm

NOTES_URL = "https://www.fragrantica.com/notes/"
NOTE_PATTERN = r"<a href=\"https:\/\/www\.fragrantica\.com\/notes\/(.+?)-(\d+)\.html\"><img src=\".+?\" style=\"width: 3rem; height: 3rem;\" alt=\"(.+?)\" \/>"


Note = collections.namedtuple("Note", ["id", "slug", "name"])


@click.command()
@click.option("--index-html-path", type=click.Path(exists=True, dir_okay=False), required=True)
@click.option("--output-directory-path", type=click.Path(exists=True, file_okay=False), required=True)
@click.option("--output-codegen-path", type=click.Path(dir_okay=False), required=True)
def cli(
    index_html_path: str,
    output_directory_path: str,
    output_codegen_path: str,
):
    notes: typing.List[Note] = []
    
    tqdm.tqdm.write(f"doing extraction")
    if True:
        with open(index_html_path, "r") as fd:
            index_html = fd.read()

        for match in re.finditer(NOTE_PATTERN, index_html):
            slug = match.group(1).lower()
            id = int(match.group(2))
            name = match.group(3)

            notes.append(Note(id, slug, name))
    
    def get_splash_path(note: Note):
        return os.path.join(output_directory_path, f"{note.slug}.splash.jpg")

    def get_tiny_path(note: Note):
        return os.path.join(output_directory_path, f"{note.slug}.tiny.jpg")

    tqdm.tqdm.write(f"doing download")
    for note in tqdm.tqdm(notes, miniters=1):
        splash_url = f"https://fimgs.net/mdimg/sastojci/splash.{note.id}.jpg"
        tiny_url = f"https://fimgs.net/mdimg/sastojci/t.{note.id}.jpg"

        urls = [
            ("splash", splash_url, get_splash_path(note)),
            ("tiny", tiny_url, get_tiny_path(note)),
        ]

        for size, url, path in urls:
            missing_path = f"{path}.missing"
            if os.path.exists(path) or os.path.exists(missing_path):
                tqdm.tqdm.write(f"{note.slug}: {size} already downloaded")
                continue

            response = requests.get(url)
            if not response.ok:
                tqdm.tqdm.write(f"{note.slug}: {size} not available")

                with open(missing_path, "w"):
                    pass

                continue

            temporary_path = tempfile.mktemp()
            with open(temporary_path, "wb") as fd:
                fd.write(response.content)

            shutil.move(temporary_path, path)
            tqdm.tqdm.write(f"{note.slug}: {size} saved to `{path}`")

    tqdm.tqdm.write(f"doing codegen")
    if True:
        temporary_path = tempfile.mktemp()

        with open(temporary_path, "w") as fd:
            fd.write(textwrap.dedent("""
                /* file automatically generated, do not edit directly */

                export interface OlfactiveNote {
                    id: number,
                    slug: string,
                    label: string,
                    tinyUrl: string,
                    slashUrl?: string,
                }

                export const olfactiveNotes: Array<OlfactiveNote> = [
            """))

            for note in notes:
                slash_path = get_splash_path(note)
                tiny_path = get_tiny_path(note)

                part = ""

                part += "\t{\n"
                part += f'\t\tid: {note.id},\n'
                part += f'\t\tslug: "{note.slug}",\n'
                part += f'\t\tlabel: "{note.name}",\n'

                if os.path.exists(slash_path):
                    part += f'\t\tslashUrl: "/images/{os.path.basename(slash_path)}",\n'

                if os.path.exists(tiny_path):
                    part += f'\t\ttinyUrl: "/images/{os.path.basename(tiny_path)}",\n'

                part += "\t},\n"

                fd.write(part)

            fd.write("];")

        shutil.move(temporary_path, output_codegen_path)
        tqdm.tqdm.write(f"codegen: saved to `{output_codegen_path}`")

if __name__ == '__main__':
    cli()
