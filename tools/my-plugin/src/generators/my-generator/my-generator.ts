import type { Tree } from '@nx/devkit';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
} from '@nx/devkit';
import * as path from 'path';

import type { MyGeneratorGeneratorSchema } from './schema';

export default async function myGeneratorGenerator(
  tree: Tree,
  options: MyGeneratorGeneratorSchema,
): Promise<void> {

  const projectRoot = options.directory ?? `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
    tags: options.tags ?? []
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}
