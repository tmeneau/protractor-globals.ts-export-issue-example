# Protractor globals.ts Non Exclusion from NPM Package Issue

This is a simple demonstration of the consequence of
both leaving the `globals.ts` typescript source file
in the Protractor NPM package and of not including
a `globals.d.ts` definition file

## Expected Behavior

The expected behavior is demonstrated by the typescript
project in `src-with-no-globals.ts, which compiles to
compiled/correct and includes a local `node_modules`
override for the protractor `globals` export that
resolves the behavior.

## Actual Behavior

The actual behavior is demosntrated by
`src-with-globals.ts`, which compiles to
copmiled/incorrect and uses the the current public
NPM release for Protractor.

## Demonstration

```
npm install
npm run show
```

The compiled directory structure will be printed to
demonstrate how each of the contained Typescript
projects compiles, demonstrating both the issue and
the expected behavior.

## Details

This project uses Typescript 2.0.0. The behavior is
triggered when a source file imports `protractor/globals`,
presumably because `protractor/globals` points to
`node_modules/protractor/globals.ts`. My (inexpert) rationale
for this is that:

  1. the typescript compiler recognizes the import for
  protractor/globals and gives precedence* to the typescript
  file.
  2. because this is a TS file and not a definition file,
  the typescript compiler re-computes the common source
  root directory to the common parent directory of both:

    1. `node_modules/protractor`
    2. `src-with-global.ts/test/app.e2e-spec.ts`

  which is the project's root directory.

_*NOTE: "gives precedence to" includes precedence over a
`globals.d.ts` file. In other words, to resolve this
behavior, the NPM package must both remove the `global.ts`
and add a `global.d.ts` file; simply adding the definition
file is not adequate to resolve this behavior._
