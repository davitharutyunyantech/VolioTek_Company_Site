import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: ['src/app/components/ui/**', 'src/app/components/figma/**'],
  },
  ...nextVitals,
];

export default eslintConfig;
