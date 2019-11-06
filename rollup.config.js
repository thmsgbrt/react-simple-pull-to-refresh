import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'playground/src/pull-to-refresh/index.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    plugins: [
      del({ targets: ['build/*', 'playground/src/pull-to-refresh'] }),
      typescript(),
      postcss({
        plugins: [],
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
