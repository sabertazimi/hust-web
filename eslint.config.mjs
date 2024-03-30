import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig.append({
  rules: {
    'react/prop-types': 'off',
  },
})
