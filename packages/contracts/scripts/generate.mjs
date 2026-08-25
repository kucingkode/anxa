import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";
import openapiTS, { astToString } from "openapi-typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const yamlPath = resolve(root, "openapi/openapi.yaml");
const outDir = resolve(root, "src/generated");
const jsonPath = resolve(outDir, "openapi.json");
const schemaPath = resolve(outDir, "schema.d.ts");

// Resolve external `$ref` files (openapi/components, openapi/paths) into a
// single document with only internal `$ref`s remaining.
const spec = await SwaggerParser.bundle(yamlPath);

mkdirSync(outDir, { recursive: true });

// Canonical JSON copy of the spec (served by the api as the source of truth).
writeFileSync(jsonPath, `${JSON.stringify(spec, null, 2)}\n`);

// TypeScript types consumed by api and web.
const ast = await openapiTS(spec, {
  exportType: true,
  immutableTypes: false,
});
writeFileSync(schemaPath, astToString(ast));

console.log(`Generated ${jsonPath}`);
console.log(`Generated ${schemaPath}`);
