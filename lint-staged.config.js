export default {
  '*.{ts,html,json,md}': ['prettier --write'],
  '*.js': ['eslint --fix', 'prettier --write'],
};
