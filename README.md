# vue3-demo

This project has been created as a pet project to test some Vue3 features. Node22 is uses here.

There are some features:

- used Composition API
- `RouterView` component has been used in 2 places `src\App.vue` and `src\views\CommonView.vue` to try such routing configuration
- `mande` library has been used as the lightweight fetch-based modern HTTP client instead of `axios`
- used [Platzi Fake Store API](https://fakeapi.platzi.com/en/about/introduction/) to make login and get categories and products
- making form validation with a modern `regle` library instead of `vuelidate`
- using TailwindCSS

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
