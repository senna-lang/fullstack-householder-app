/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
   overrides: [
     {
       files: ["*.ts", "*.tsx"],
       // https://github.com/typescript-eslint/typescript-eslint/issues/251#issuecomment-567365174
       parserOptions: {
         project: "./tsconfig.json",
         tsconfigRootDir: __dirname,
       },
     },
     {
       // `api` ディレクトリ配下のファイルに適用
       files: ["src/app/api/**/*"],
       rules: {
         "@typescript-eslint/no-unused-vars": "off",
       },
     },
   ],
   ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "src/components/ui/**/*" , // ui ディレクトリを ESLint の対象から除外
    "src/lib/hono.ts"  // hono.ts ディレクトリを ESLint の対象から除外
  ],
   extends: [
     "next",
     "next/core-web-vitals",
     "eslint:recommended",
     "plugin:@typescript-eslint/recommended",
     "plugin:@typescript-eslint/recommended-requiring-type-checking",
     "next/core-web-vitals",
     "plugin:react/recommended",
     "plugin:react-hooks/recommended",
     "plugin:jsx-a11y/recommended",
     "prettier",
   ],
   plugins: ["import", "import-access", "@typescript-eslint"],
   rules: {
     "react/react-in-jsx-scope": "off",
     "import/no-default-export": "off",
     "react/prop-types": "off",
     "import/order": [
       "error",
       {
         groups: [
           "builtin",
           "external",
           "internal",
           "parent",
           "sibling",
           "index",
           "object",
         ],
         "newlines-between": "always",
         alphabetize: { order: "asc", caseInsensitive: true },
       },
     ],
     "import/no-restricted-paths": [
       "error",
       {
         zones: [
           //より厳しく設定する場合は、feature内のファイルはその中でしかインポートできないようにする
           {
             target: './src/features/dashboard',
             from: './src/features',
             except: ['./dashboard'],
           },
 
           // appからはfeaturesにアクセスできるが、featuresからはappにアクセスできない
           {
             target: "./src/features",
             from: "./src/app",
           },
 
           // 共有モジュールがapp,featureのコードをインポートすることを防ぐ
           {
             target: [
               "./src/components",
               "./src/hooks",
               "./src/lib",
               "./src/types",
               "./src/utils",
             ],
             from: ["./src/features", "./src/app"],
           },
         ],
       },
     ],
     "@next/next/no-img-element": "off",
     "import-access/jsdoc": ["error"],
   },
 };