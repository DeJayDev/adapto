import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

async function* getFiles(path: string, hasRecursed = false) {
  const files = await readdir(path, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* getFiles(join(path, file.name), true);
    } else {
      const filePath = parse(file.path);
      yield {
        folder: hasRecursed ? filePath.name : null,
        file: hasRecursed ? `${filePath.name}/${file.name}` : `./${file.name}`
      };
    }
  }
}

export { getFiles };
