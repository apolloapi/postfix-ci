import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

describe("Apollo publishing proposal", () => {
  it("generates Apollo names without scheduled publishing or cleanup", () => {
    const root = mkdtempSync(join(tmpdir(), "postfix-build-test-"));
    try {
      symlinkSync(resolve("catalog-recipes"), join(root, "catalog-recipes"));
      execFileSync("python3", ["scripts/prepare-postfix-builds.py", "--root", root]);
      const main = readFileSync(join(root, ".github/workflows/build.yml"), "utf8");
      const shard = readFileSync(join(root, ".github/workflows/melange-images.yml"), "utf8");
      const catalog = JSON.parse(readFileSync(join(root, "postfix-catalog.json"), "utf8"));
      expect(`${catalog.registry}/${catalog.org}/${catalog.prefix}python`).toBe("ghcr.io/apolloapi/postfix-ci-python");
      for (const text of [main, shard]) {
        expect(text).not.toContain("minimal-${{ matrix.name }}");
        expect(text).not.toContain("https://github.com/rtvkiz/minimal/");
        expect(text).toContain("postfix-ci-${{ matrix.name }}");
        expect(text).toContain("Prepare vendored build workspace");
      }
      expect(main).toContain("POSTFIX_PUBLISH_ENABLED");
      expect(main).not.toContain("schedule:");
      expect(main).not.toContain("cleanup:");
      expect(main).toContain("s|^catalog-recipes/||");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it("keeps the Zot example local and authenticated pending owner decisions", () => {
    const config = JSON.parse(readFileSync("zot-deployment/config.example.json", "utf8"));
    expect(config.http.address).toBe("127.0.0.1");
    expect(config.http.auth.htpasswd.path).toBe("/etc/zot/htpasswd");
    expect(config.http.accessControl).toBeUndefined();
  });
});