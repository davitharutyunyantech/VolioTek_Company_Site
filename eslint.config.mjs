import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: ['src/app/components/ui/**', 'src/app/components/figma/**', 'src/generated/**'],
  },
  ...nextVitals,
];

export default eslintConfig;
