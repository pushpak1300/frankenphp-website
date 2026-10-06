#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const SOURCE = "https://raw.githubusercontent.com/php/frankenphp/main";

for (const name of ["install.sh", "install.ps1"]) {
  const destination = path.join(PUBLIC, name);
  try {
    const response = await fetch(`${SOURCE}/${name}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
    console.log(`✓ ${name} fetched from php/frankenphp`);
  } catch (error) {
    if (!fs.existsSync(destination)) {
      console.error(`✗ could not fetch ${name}: ${error.message}`);
      process.exit(1);
    }
    console.warn(`! could not fetch ${name} (${error.message}), keeping the local copy`);
  }
}
