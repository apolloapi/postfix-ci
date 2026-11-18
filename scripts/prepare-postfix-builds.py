#!/usr/bin/env python3
"""Generate Apollo workflow copies without editing vendored MIT source.

Copyright (c) 2026 Apollo API. Derived workflows retain rtvkiz's MIT notice.
"""
import argparse
import json
from pathlib import Path
import yaml

HEADER = '# Copyright (c) 2026 rtvkiz; modifications (c) 2026 Apollo API.\n# SPDX-License-Identifier: MIT; see catalog-recipes/LICENSE.\n'


def prepare(root: Path):
    source = root / 'catalog-recipes'
    original = source / 'upstream-github-workflows'
    # A fresh upstream archive has .github rather than our inactive vendor path.
    if not original.exists():
        original = source / '.github'
    output = root / '.github/workflows'
    output.mkdir(parents=True, exist_ok=True)
    for name in ('build.yml', 'melange-images.yml'):
        text = (original / 'workflows' / name).read_text()
        text = text.replace('minimal-${{ matrix.name }}', 'postfix-ci-${{ matrix.name }}')
        text = text.replace('echo "$CHANGED_FILES" | grep -E', 'echo "$CHANGED_FILES" | sed \'s|^catalog-recipes/||\' | grep -E')
        text = text.replace("--certificate-identity-regexp='https://github.com/rtvkiz/minimal/'", "--certificate-identity-regexp='^https://github\\.com/apolloapi/postfix-ci/\\.github/workflows/[^@]+@refs/heads/main$'")
        doc = yaml.safe_load(text)
        # PyYAML's YAML 1.1 parser calls the GitHub Actions 'on' key True.
        events = doc.pop(True, doc.pop('on', {}))
        if name == 'build.yml':
            events = {'workflow_dispatch': {}, 'pull_request': {'branches': ['main'], 'paths': ['catalog-recipes/**', '.github/workflows/build.yml', '.github/workflows/melange-images.yml', 'scripts/prepare-postfix-builds.py']}}
            # No scheduled builds, automatic publishing, or org-wide deletion.
            doc['jobs'].pop('cleanup', None)
        doc = {'name': doc.pop('name'), 'on': events, **doc}
        for job in doc['jobs'].values():
            if 'steps' not in job:
                continue
            # Manual publication is restricted to the owner-approved main branch.
            if name == 'build.yml' and job is doc['jobs'].get('detect-changes'):
                job['if'] = "github.repository == 'apolloapi/postfix-ci' && (github.event_name == 'pull_request' || (github.ref == 'refs/heads/main' && vars.POSTFIX_PUBLISH_ENABLED == 'true'))"
            steps = job['steps']
            for index in range(len(steps) - 1, -1, -1):
                if str(steps[index].get('uses', '')).startswith('actions/checkout@'):
                    steps.insert(index + 1, {'name': 'Prepare vendored build workspace', 'run': 'python3 scripts/prepare-postfix-workspace.py'})
            # Upstream website assertions describe Minimal, not the Apollo site.
            job['steps'] = [step for step in steps if step.get('run') not in ('make check-site-claims', 'make check-docs')]
        # Fail closed: do not let summary report a skipped manual publication as success.
        if name == 'build.yml':
            summary = doc['jobs']['summary']['steps'][0]['run']
            doc['jobs']['summary']['steps'][0]['run'] = 'if [ "${{ needs.detect-changes.result }}" != "success" ]; then echo "Build disabled or detection failed"; exit 1; fi\n' + summary
        (output / name).write_text(HEADER + yaml.safe_dump(doc, sort_keys=False, width=1000))
    catalog = json.loads((source / 'catalog.json').read_text())
    catalog.update(registry='ghcr.io', org='apolloapi', prefix='postfix-ci-')
    (root / 'postfix-catalog.json').write_text(json.dumps(catalog, indent=2) + '\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path.cwd())
    prepare(parser.parse_args().root)
