import { configApp } from '@adonisjs/eslint-config';

export default configApp({
    rules: {
        semi: ['error', 'always'],
        // Desactivamos prettier temporalmente para permitir formateo personalizado
        'prettier/prettier': 'off',
        // Reglas de TypeScript más flexibles
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-implicit-any-catch': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // Reglas generales más flexibles
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'prefer-const': 'off',
        'no-var': 'off',
    },
});
