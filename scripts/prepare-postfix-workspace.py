#!/usr/bin/env python3
"""Adapt an ephemeral runner workspace; never edit the vendored source.
Copyright (c) 2026 Apollo API. SPDX-License-Identifier: MIT.
"""
from pathlib import Path
import shutil

root = Path.cwd()
source = root / 'catalog-recipes'
if not (source / 'LICENSE').is_file():
    raise SystemExit('Import the licensed Minimal recipes through the import PR first.')
for name in ('images', 'tools', 'tests', 'vex', 'docs'):
    shutil.copytree(source / name, root / name, dirs_exist_ok=True)
shutil.copy2(source / 'Makefile', root / 'Makefile')
shutil.copy2(source / 'catalog.json', root / 'catalog.json')
upstream = source / 'upstream-github-workflows'
if not upstream.exists():
    upstream = source / '.github'
shutil.copytree(upstream / 'scripts', root / '.github/scripts', dirs_exist_ok=True)
for name in ('versions.yaml', 'autoupdate-coverage.yaml', 'patch-deps.yaml'):
    if (upstream / name).exists():
        shutil.copy2(upstream / name, root / '.github' / name)
# Non-active copies support upstream make targets without activating their timers.
for workflow in (upstream / 'workflows').glob('*.yml'):
    if workflow.name not in ('build.yml', 'melange-images.yml'):
        (root / '.github/workflows' / workflow.name).write_text(workflow.read_text())
for recipe in (root / 'images').glob('*/apko/*.yaml'):
    text = recipe.read_text().replace('"minimal-', '"postfix-ci-')
    text = text.replace('https://github.com/rtvkiz/minimal/tree/main/images/', 'https://github.com/apolloapi/postfix-ci/tree/main/catalog-recipes/images/')
    text = text.replace('https://github.com/rtvkiz/minimal', 'https://github.com/apolloapi/postfix-ci')
    recipe.write_text(text)
