import pluginAngular from '@angular-eslint/eslint-plugin';
import pluginAngularTemplate from '@angular-eslint/eslint-plugin-template';
import parserAngularTemplate from '@angular-eslint/template-parser';
import pluginNx from '@nx/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  { ignores: ['.angular/*', '**/dist/*', '.nx/*', 'coverage/*'] },
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      import: pluginImport,
      'simple-import-sort': pluginSimpleImportSort,
      'unused-imports': pluginUnusedImports,
      '@nx': pluginNx,
    },
    rules: {
      curly: 'error',

      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000', '^node:'],
            ['^'],
            ['^@demo-app/'],
            ['^#', '^\\.\\.', '^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:application',
              onlyDependOnLibsWithTags: ['type:feature', 'type:env', "type:util"],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:env',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:util',
                'type:data-access',
              ],
            },
            {
              sourceTag: 'type:env',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:env'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:env'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // @ts-ignore
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    processor: pluginAngularTemplate.processors['extract-inline-html'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@angular-eslint': pluginAngular,
    },
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/class-methods-use-this': [
        'error',
        {
          ignoreOverrideMethods: true,
          ignoreClassesThatImplementAnInterface: 'public-fields',
        },
      ],
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/max-params': 'off', // TODO
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            'static-field',
            'decorated-field',
            'decorated-get',
            'instance-field',
            'constructor',
            'instance-method',
          ],
        },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          custom: {
            regex: '^#',
            match: true,
          },
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'memberLike',
          modifiers: ['public'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'property',
          format: null,
        },
      ],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'off', // TODO
      '@typescript-eslint/no-dupe-class-members': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': [
        'error',
        { fixToUnknown: true, ignoreRestArgs: true },
      ],
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-loss-of-precision': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'off', // TODO
        {
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreTypeIndexes: true,
        },
      ],
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        { name: 'rxjs/operators', message: 'Please use `rxjs` instead.' },
      ],
      '@typescript-eslint/no-shadow': 'off', // TODO
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': 'off', // TODO
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/parameter-properties': 'off',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/sort-type-constituents': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off', // TODO
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/typedef': 'off', // TODO
      '@typescript-eslint/unified-signatures': 'error',

      'no-console': ['error', { allow: ['warn', 'error'] }],

      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-max-inline-declarations': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: ['app'],
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/contextual-decorator': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/directive-selector': 'off', // TODO
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-forward-ref': 'off',
      '@angular-eslint/no-input-prefix': 'error',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-pipe-impure': 'off',
      '@angular-eslint/pipe-prefix': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/use-component-selector': 'error', // TODO
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/use-injectable-provided-in': 'off', // TODO
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
    },
  },

  {
    files: ['**/*.component.html'],
    languageOptions: { parser: parserAngularTemplate },
    plugins: {
      '@angular-eslint/template': pluginAngularTemplate,
    },
    rules: {
      '@angular-eslint/template/alt-text': 'off',
      '@angular-eslint/template/attributes-order': 'off', // prettier-plugin-organize-attributes
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/cyclomatic-complexity': 'off',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/eqeqeq': [
        'error',
        { allowNullOrUndefined: true },
      ],
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-call-expression': 'off', // TODO: find an alternative for signals
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-duplicate-attributes': [
        'error',
        { ignore: ['class'] },
      ],
      '@angular-eslint/template/no-inline-styles': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/role-has-required-aria': 'off',
      '@angular-eslint/template/use-track-by-function': 'error',
    },
  },
);
