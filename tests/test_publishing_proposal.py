"""Tests runnable in the standalone Apollo repository before importing recipes."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import yaml

spec = importlib.util.spec_from_file_location('prepare', 'scripts/prepare-postfix-builds.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class PublishingProposalTests(unittest.TestCase):
    def test_manual_publication_only_and_apollo_namespace(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            vendor = root / 'catalog-recipes'
            workflows = vendor / 'upstream-github-workflows/workflows'
            workflows.mkdir(parents=True)
            fixture = '''name: Build
on:
  schedule:
    - cron: '0 0 * * *'
jobs:
  detect-changes:
    steps:
      - uses: actions/checkout@abc
      - run: echo detect
  summary:
    steps:
      - run: echo summary
  cleanup:
    steps:
      - run: echo delete
'''
            (workflows / 'build.yml').write_text(fixture)
            (workflows / 'melange-images.yml').write_text('name: Shard\non:\n  workflow_call:\njobs: {}\n')
            (vendor / 'catalog.json').write_text(json.dumps({'registry': 'ghcr.io', 'org': 'rtvkiz', 'prefix': 'minimal-', 'images': []}))
            module.prepare(root)
            result = yaml.safe_load((root / '.github/workflows/build.yml').read_text())
            self.assertNotIn('schedule', result['on'])
            self.assertNotIn('cleanup', result['jobs'])
            self.assertIn("vars.POSTFIX_PUBLISH_ENABLED == 'true'", result['jobs']['detect-changes']['if'])
            catalog = json.loads((root / 'postfix-catalog.json').read_text())
            self.assertEqual(f"{catalog['registry']}/{catalog['org']}/{catalog['prefix']}python", 'ghcr.io/apolloapi/postfix-ci-python')


if __name__ == '__main__':
    unittest.main()