# svg-facory-app

## Goal ##

A cross device application. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Library

Run `ng g library my-lib` to create a library, then create a [index.ts]() file at the root directory :
```bash
echo "export * from './src/public_api'" >> projects/svg-geom/index.ts
```   
In [tsconfig.json](./tsconfig.json), modify the path of the new library :
```json
{
  "compilerOptions": {
    "paths": {
      "my-lib": [
        "projects/my-lib"
      ],
      "my-lib/*": [
        "projects/my-lib/src/*"
      ]
    }
  }
}
```
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Building the libraries seems not be required. 
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test my-lib` to only run unit tests of a library.

[angular.json](./angular.json) has been modified to make working the vscode debugger during the tests :
```json
{
    "projects": {
        "web-app": {
            "architect": {
                "test": {
                    "options": {
                        "sourceMap": false

```


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Git memo

Push a local branch to a remote and track it too :
```bash
git push -u origin feature_branch_name
# OUTPUT
remote: Create a pull request for 'feature_branch_name' on GitHub by visiting:
remote:      https://github.com/$USER/$REPO/pull/new/feat/feature_branch_name
remote:
To https://github.com/$USER/$REPO/
 * [new branch]      feature_branch_name -> feature_branch_name
```
