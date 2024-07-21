import eslintConfig from '@dg-scripts/eslint-config'
import globals from 'globals'

export default eslintConfig.append({
  rules: {
    'react/prop-types': 'off',
    'security/detect-object-injection': 'off',
  },
}).append({
  files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
})
