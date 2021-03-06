# svg-facory-app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Goals ##

* A cross device application.
* Advanced use of angular libraries (inter dependencies, multiple entry points).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Stop current server:
```
fg ng serve
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Library management

Use **ng-workspace-command-helper** to manage libraries.

Link libraries to their **source** directory during development :
```bash
ngh ls
```
Link libraries to **dist** directory to build :
```bash
ngh ld
```
Create a new library :
```bash
ngh new my-lib
```
Import library components :
```typescript
import { Foo } from 'my-lib'
```
Create a new entry point to an existing library :
```bash
ngh sub my-lib entry-point
```
Import library sub components :
```typescript
import { Bar} from 'my-lib/entry-point'
```
Build all libraries :
```bash
# Libraries must be linked to dist directory
ngh ld
ngh build
```
#### Libraries build order
Add peer depencencies to automatically resolve build order :
```bash
# build my-other-lib before my-lib
ngh dep my-lib my-other-lib
```
## Build App

Actualy, building with compiled libraries is not working as expected.
- ### WEB
    ```
    npm run build:web
    ```
- ### Darwin App
    ```
    npm run build:app
    npm run darwin:pkg
    ```

## Running app tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run the vscode configuration `Test` to debug.

## Running libraries tests

- #### Execute a library unit tests: 
    ```bash
    # testing the components library
    ng t components
    ```
    Run the vscode configuration `Karma components` to debug.
- #### Execute all libraries unit tests: 
    ```
    npm run tl
    ```
    Run the vscode configuration `Test` to debug.
- #### Filtering unit tests
    Edit [projects/test.js](projects/test.js):
    ```typescript
    // only specs in the components library
    const context = require.context('./components/', true, /\.spec\.ts$/);
    // single spec
    const context = require.context('./', true, /symbol-factory\.spec\.ts$/);
    ```
    Execute test(s)
    ```
    npm run tl
    ```
    Run the vscode configuration `Test` to debug.

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
