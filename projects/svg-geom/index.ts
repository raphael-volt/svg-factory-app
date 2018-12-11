{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "web-app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
      },
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/web-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/theme.scss",
              "src/styles.scss"
            ],
            "scripts": [
              "node_modules/jspdf/dist/jspdf.min.js"
            ]
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "web-app:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "web-app:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "web-app:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "sourceMap": false,
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "src/karma.conf.js",
            "styles": [
              "src/theme.scss",
              "src/styles.scss"
            ],
            "scripts": [],
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ]
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "src/tsconfig.app.json",
              "src/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    },
    "web-app-e2e": {
      "root": "e2e/",
      "projectType": "application",
      "prefix": "",
      "architect": {
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "web-app:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "web-app:serve:production"
            }
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": "e2e/tsconfig.e2e.json",
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    },
    "svg-geom": {
      "root": "projects/svg-geom",
      "sourceRoot": "projects/svg-geom/src",
      "projectType": "library",
      "prefix": "",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "projects/svg-geom/tsconfig.lib.json",
            "project": "projects/svg-geom/ng-package.json"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/svg-geom/src/test.ts",
            "tsConfig": "projects/svg-geom/tsconfig.spec.json",
            "karmaConfig": "projects/svg-geom/karma.conf.js"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "projects/svg-geom/tsconfig.lib.json",
              "projects/svg-geom/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    }
  },
  "defaultProject": "web-app"
}{
  "name": "web-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test --source-map false",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "debug": "ng test --source-map=false"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^7.1.1",
    "@angular/cdk": "^7.1.1",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/material": "^7.1.1",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/router": "~7.1.0",
    "@fortawesome/angular-fontawesome": "^0.3.0",
    "@fortawesome/fontawesome-svg-core": "^1.2.8",
    "@fortawesome/free-solid-svg-icons": "^5.5.0",
    "@types/jspdf": "^1.2.2",
    "add": "^2.0.6",
    "core-js": "^2.6.0",
    "hammerjs": "^2.0.8",
    "jspdf": "^1.4.1",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "yarn": "^1.12.3",
    "zone.js": "~0.8.26"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^0.11.2",
    "@angular-devkit/build-ng-packagr": "^0.11.2",
    "@angular/cli": "^7.1.2",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
    "@types/jasmine": "~2.8.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "~8.9.4",
    "codelyzer": "~4.5.0",
    "jasmine-core": "~2.99.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "^3.1.3",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~1.1.2",
    "karma-jasmine-html-reporter": "^0.2.2",
    "ng-packagr": "^4.2.0",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tsickle": ">=0.29.0",
    "tslint": "~5.11.0",
    "typescript": "~3.1.6"
  }
}
{
  "name": "web-app",
  "version": "0.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@angular-devkit/architect": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/architect/-/architect-0.11.2.tgz",
      "integrity": "sha512-RTwpxc4glRsO6EW50WryZ2UZ+75hABnaRabRp7QsgADJylA10ANX2H3OjhRQQ6nQ3opE3w9GydM+5sHBKy6hPw==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "7.1.2",
        "rxjs": "6.3.3"
      }
    },
    "@angular-devkit/build-angular": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-angular/-/build-angular-0.11.2.tgz",
      "integrity": "sha512-pWOyV36GtvRxQmqBES0QtambXDmDH1NGG3jpGgj8CHPPSqi/TkxCQwFzoyYbPIHqylKpYGVGRrxuJ0I82D1jqQ==",
      "dev": true,
      "requires": {
        "@angular-devkit/architect": "0.11.2",
        "@angular-devkit/build-optimizer": "0.11.2",
        "@angular-devkit/build-webpack": "0.11.2",
        "@angular-devkit/core": "7.1.2",
        "@ngtools/webpack": "7.1.2",
        "ajv": "6.5.3",
        "autoprefixer": "9.3.1",
        "circular-dependency-plugin": "5.0.2",
        "clean-css": "4.2.1",
        "copy-webpack-plugin": "4.5.4",
        "file-loader": "2.0.0",
        "glob": "7.1.3",
        "istanbul": "0.4.5",
        "istanbul-instrumenter-loader": "3.0.1",
        "karma-source-map-support": "1.3.0",
        "less": "3.8.1",
        "less-loader": "4.1.0",
        "license-webpack-plugin": "2.0.2",
        "loader-utils": "1.1.0",
        "mini-css-extract-plugin": "0.4.4",
        "minimatch": "3.0.4",
        "node-sass": "4.10.0",
        "opn": "5.3.0",
        "parse5": "4.0.0",
        "portfinder": "1.0.17",
        "postcss": "7.0.5",
        "postcss-import": "12.0.0",
        "postcss-loader": "3.0.0",
        "raw-loader": "0.5.1",
        "rxjs": "6.3.3",
        "sass-loader": "7.1.0",
        "semver": "5.5.1",
        "source-map-loader": "0.2.4",
        "source-map-support": "0.5.9",
        "speed-measure-webpack-plugin": "1.2.3",
        "stats-webpack-plugin": "0.7.0",
        "style-loader": "0.23.1",
        "stylus": "0.54.5",
        "stylus-loader": "3.0.2",
        "terser-webpack-plugin": "1.1.0",
        "tree-kill": "1.2.0",
        "webpack": "4.23.1",
        "webpack-dev-middleware": "3.4.0",
        "webpack-dev-server": "3.1.10",
        "webpack-merge": "4.1.4",
        "webpack-sources": "1.3.0",
        "webpack-subresource-integrity": "1.1.0-rc.6"
      }
    },
    "@angular-devkit/build-ng-packagr": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-ng-packagr/-/build-ng-packagr-0.11.2.tgz",
      "integrity": "sha512-CzD5Nc/IQAXw/7vcX65kKQNeDCOIsEDOX/DjYFkDIhJiHkzZy0ctbYVYBbDcGs0e6fDqPLpa2fYN9evE/1VxzA==",
      "dev": true,
      "requires": {
        "@angular-devkit/architect": "0.11.2",
        "@angular-devkit/core": "7.1.2",
        "rxjs": "6.3.3",
        "semver": "5.5.1"
      }
    },
    "@angular-devkit/build-optimizer": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-optimizer/-/build-optimizer-0.11.2.tgz",
      "integrity": "sha512-NPNcAe4yxMEWABdI1oqoW7XA8m5O3Z+Zs9xsyBgwCCpFr3ZXiIL0r8+v7qS5UD4Yjsxjx35BJhvuiI+RBmGSfw==",
      "dev": true,
      "requires": {
        "loader-utils": "1.1.0",
        "source-map": "0.5.6",
        "typescript": "3.1.6",
        "webpack-sources": "1.2.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.6",
          "resolved": "http://registry.npmjs.org/source-map/-/source-map-0.5.6.tgz",
          "integrity": "sha1-dc449SvwczxafwwRjYEzSiu19BI=",
          "dev": true
        },
        "webpack-sources": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.2.0.tgz",
          "integrity": "sha512-9BZwxR85dNsjWz3blyxdOhTgtnQvv3OEs5xofI0wPYTwu5kaWxS08UuD1oI7WLBLpRO+ylf0ofnXLXWmGb2WMw==",
          "dev": true,
          "requires": {
            "source-list-map": "^2.0.0",
            "source-map": "~0.6.1"
          },
          "dependencies": {
            "source-map": {
              "version": "0.6.1",
              "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
              "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
              "dev": true
            }
          }
        }
      }
    },
    "@angular-devkit/build-webpack": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-webpack/-/build-webpack-0.11.2.tgz",
      "integrity": "sha512-biKjwoFXazNmgPiFJbXDbIMaZGjAV2VAauV3CWs8xHdIdC1Q2yVxF3I+babvgQnHEQWozykK/DuLoZn4kCzQUQ==",
      "dev": true,
      "requires": {
        "@angular-devkit/architect": "0.11.2",
        "@angular-devkit/core": "7.1.2",
        "rxjs": "6.3.3"
      }
    },
    "@angular-devkit/core": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-7.1.2.tgz",
      "integrity": "sha512-LyjHGuLnLWrgX7SYDkKmc3eW4H5uuaoC+CXYjRfgx3qundrLfvTCRgNGC6FPjhQNnVXH9qar+j9P1aMmKFb4Lw==",
      "dev": true,
      "requires": {
        "ajv": "6.5.3",
        "chokidar": "2.0.4",
        "fast-json-stable-stringify": "2.0.0",
        "rxjs": "6.3.3",
        "source-map": "0.7.3"
      }
    },
    "@angular-devkit/schematics": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@angular-devkit/schematics/-/schematics-7.1.2.tgz",
      "integrity": "sha512-NFhHLYWf9gpGQm0s19lq+nAw3CZ0udBpoBLzCm8Crlmu6+7aAXgw7Fv5P4ukWJ/e1m7NDGVids+B6kBGXaY6Ig==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "7.1.2",
        "rxjs": "6.3.3"
      }
    },
    "@angular/animations": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/animations/-/animations-7.1.1.tgz",
      "integrity": "sha512-iTNxhPPraCZsE4rgM23lguT1kDV4mfYAr+Bsi5J0+v9ZJA+VaKvi6eRW8ZGrx4/rDz6hzTnBn1jgPppHFbsOcw==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/cdk": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-7.1.1.tgz",
      "integrity": "sha512-woW9lWDBKRuxZipMzWofrAY7YpuZd4vf/J1YPjmAqV7U94MaDFyizRLyFolbTZVYo8ggh9U3SQAWRrEBvJNsjg==",
      "requires": {
        "parse5": "^5.0.0",
        "tslib": "^1.7.1"
      },
      "dependencies": {
        "parse5": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.0.tgz",
          "integrity": "sha512-fxNG2sQjHvlVAYmzBZS9YlDp6PTSSDwa98vkD4QgVDDCAo84z5X1t5XyJQ62ImdLXx5NdIIfihey6xpum9/gRQ==",
          "optional": true
        }
      }
    },
    "@angular/cli": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-7.1.2.tgz",
      "integrity": "sha512-e290s0ONx47QgBw03l0Kq7fIPB77WqEQPM45QEWWbewF2lAFXx54ooQsdgLn+ESk6J0cW7DazRb23CUygZZbBw==",
      "dev": true,
      "requires": {
        "@angular-devkit/architect": "0.11.2",
        "@angular-devkit/core": "7.1.2",
        "@angular-devkit/schematics": "7.1.2",
        "@schematics/angular": "7.1.2",
        "@schematics/update": "0.11.2",
        "inquirer": "6.2.0",
        "opn": "5.3.0",
        "semver": "5.5.1",
        "symbol-observable": "1.2.0"
      }
    },
    "@angular/common": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/common/-/common-7.1.1.tgz",
      "integrity": "sha512-SngekFx9v39sjgi9pON0Wehxpu+NdUk7OEebw4Fa8dKqTgydTkuhmnNH+9WQe264asoeCt51oufPRjIqMLNohA==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/compiler": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/compiler/-/compiler-7.1.1.tgz",
      "integrity": "sha512-oJvBe8XZ+DXF/W/DxWBTbBcixJTuPeZWdkcZIGWhJoQP7K5GnGnj8ffP9Lp6Dh4TKv85awtC6OfIKhbHxa650Q==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/compiler-cli": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/compiler-cli/-/compiler-cli-7.1.1.tgz",
      "integrity": "sha512-4NXlkDhOEQgaP3Agigqw93CvXJvsfnXa0xiglq9e/wjL+6XbtM9WcDb5lfRQz41N9RSkO3pEHGvKMweKZGgogA==",
      "dev": true,
      "requires": {
        "canonical-path": "1.0.0",
        "chokidar": "^1.4.2",
        "convert-source-map": "^1.5.1",
        "dependency-graph": "^0.7.2",
        "magic-string": "^0.25.0",
        "minimist": "^1.2.0",
        "reflect-metadata": "^0.1.2",
        "shelljs": "^0.8.1",
        "source-map": "^0.6.1",
        "tslib": "^1.9.0",
        "yargs": "9.0.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "anymatch": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-1.3.2.tgz",
          "integrity": "sha512-0XNayC8lTHQ2OI8aljNCN3sSx6hsr/1+rlcDAotXJR7C1oZZHCNsfpbKwMjRA3Uqb5tF1Rae2oloTr4xpq+WjA==",
          "dev": true,
          "requires": {
            "micromatch": "^2.1.5",
            "normalize-path": "^2.0.0"
          }
        },
        "arr-diff": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
          "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
          "dev": true,
          "requires": {
            "arr-flatten": "^1.0.1"
          }
        },
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "braces": {
          "version": "1.8.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
          "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
          "dev": true,
          "requires": {
            "expand-range": "^1.8.1",
            "preserve": "^0.2.0",
            "repeat-element": "^1.1.2"
          }
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0=",
          "dev": true
        },
        "chokidar": {
          "version": "1.7.0",
          "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-1.7.0.tgz",
          "integrity": "sha1-eY5ol3gVHIB2tLNg5e3SjNortGg=",
          "dev": true,
          "requires": {
            "anymatch": "^1.3.0",
            "async-each": "^1.0.0",
            "fsevents": "^1.0.0",
            "glob-parent": "^2.0.0",
            "inherits": "^2.0.1",
            "is-binary-path": "^1.0.0",
            "is-glob": "^2.0.0",
            "path-is-absolute": "^1.0.0",
            "readdirp": "^2.0.0"
          }
        },
        "cross-spawn": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-5.1.0.tgz",
          "integrity": "sha1-6L0O/uWPz/b4+UUQoKVUu/ojVEk=",
          "dev": true,
          "requires": {
            "lru-cache": "^4.0.1",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "execa": {
          "version": "0.7.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-0.7.0.tgz",
          "integrity": "sha1-lEvs00zEHuMqY6n68nrVpl/Fl3c=",
          "dev": true,
          "requires": {
            "cross-spawn": "^5.0.1",
            "get-stream": "^3.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        },
        "expand-brackets": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
          "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
          "dev": true,
          "requires": {
            "is-posix-bracket": "^0.1.0"
          }
        },
        "extglob": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
          "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        },
        "glob-parent": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
          "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
          "dev": true,
          "requires": {
            "is-glob": "^2.0.0"
          }
        },
        "is-extglob": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
          "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "is-glob": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
          "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        },
        "load-json-file": {
          "version": "2.0.0",
          "resolved": "http://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
          "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
          "dev": true,
          "requires": {
            "graceful-fs": "^4.1.2",
            "parse-json": "^2.2.0",
            "pify": "^2.0.0",
            "strip-bom": "^3.0.0"
          }
        },
        "mem": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/mem/-/mem-1.1.0.tgz",
          "integrity": "sha1-Xt1StIXKHZAP5kiVUFOZoN+kX3Y=",
          "dev": true,
          "requires": {
            "mimic-fn": "^1.0.0"
          }
        },
        "micromatch": {
          "version": "2.3.11",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
          "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
          "dev": true,
          "requires": {
            "arr-diff": "^2.0.0",
            "array-unique": "^0.2.1",
            "braces": "^1.8.2",
            "expand-brackets": "^0.1.4",
            "extglob": "^0.3.1",
            "filename-regex": "^2.0.0",
            "is-extglob": "^1.0.0",
            "is-glob": "^2.0.1",
            "kind-of": "^3.0.2",
            "normalize-path": "^2.0.1",
            "object.omit": "^2.0.0",
            "parse-glob": "^3.0.4",
            "regex-cache": "^0.4.2"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        },
        "os-locale": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-2.1.0.tgz",
          "integrity": "sha512-3sslG3zJbEYcaC4YVAvDorjGxc7tv6KVATnLPZONiljsUncvihe9BQoVCEs0RZ1kmf4Hk9OBqlZfJZWI4GanKA==",
          "dev": true,
          "requires": {
            "execa": "^0.7.0",
            "lcid": "^1.0.0",
            "mem": "^1.1.0"
          }
        },
        "path-type": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
          "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
          "dev": true,
          "requires": {
            "pify": "^2.0.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        },
        "read-pkg": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
          "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
          "dev": true,
          "requires": {
            "load-json-file": "^2.0.0",
            "normalize-package-data": "^2.3.2",
            "path-type": "^2.0.0"
          }
        },
        "read-pkg-up": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
          "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
          "dev": true,
          "requires": {
            "find-up": "^2.0.0",
            "read-pkg": "^2.0.0"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        },
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
          "dev": true
        },
        "which-module": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
          "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
          "dev": true
        },
        "y18n": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
          "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE=",
          "dev": true
        },
        "yargs": {
          "version": "9.0.1",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-9.0.1.tgz",
          "integrity": "sha1-UqzCP+7Kw0BCB47njAwAf1CF20w=",
          "dev": true,
          "requires": {
            "camelcase": "^4.1.0",
            "cliui": "^3.2.0",
            "decamelize": "^1.1.1",
            "get-caller-file": "^1.0.1",
            "os-locale": "^2.0.0",
            "read-pkg-up": "^2.0.0",
            "require-directory": "^2.1.1",
            "require-main-filename": "^1.0.1",
            "set-blocking": "^2.0.0",
            "string-width": "^2.0.0",
            "which-module": "^2.0.0",
            "y18n": "^3.2.1",
            "yargs-parser": "^7.0.0"
          }
        },
        "yargs-parser": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-7.0.0.tgz",
          "integrity": "sha1-jQrELxbqVd69MyyvTEA4s+P139k=",
          "dev": true,
          "requires": {
            "camelcase": "^4.1.0"
          }
        }
      }
    },
    "@angular/core": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/core/-/core-7.1.1.tgz",
      "integrity": "sha512-Osig5SRgDRQ+Hec/liN7nq/BCJieB+4/pqRh9rFbOXezb2ptgRZqdXOXN8P17i4AwPVf308Mh55V0niJ5Eu3Rw==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/forms": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/forms/-/forms-7.1.1.tgz",
      "integrity": "sha512-yCWuPjpu23Wc3XUw7v/ACNn/e249oT0bYlM8aaMQ1F5OwrmmC4NJC12Rpl9Ihza61RIHIKzNcHVEgzc7WhcSag==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/language-service": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/language-service/-/language-service-7.1.1.tgz",
      "integrity": "sha512-X+5g20PMtNRGZIa3svMv4PLJdJehn4wqrS8nwOtzH5XkSn5vA3IxjsJVdSzAy2AN0/sKKJK5jmQorPtKO4saJg==",
      "dev": true
    },
    "@angular/material": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/material/-/material-7.1.1.tgz",
      "integrity": "sha512-wjYAWsdWpb8/BgoIfoUomnycoljU00avJ3hRIgPNnEpZhB7zqiBA8tCitzDS4NK8dKBJjM9WRAOj6yl6x3+9wA==",
      "requires": {
        "tslib": "^1.7.1"
      }
    },
    "@angular/platform-browser": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-7.1.1.tgz",
      "integrity": "sha512-I6OPjecynGJSbPtzu0gvEgSmIR6X6/xEAhg4L9PycW1ryjzptTC9klWRTWIqsIBqMxhVnY44uKLeRNrDwMOwyA==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/platform-browser-dynamic": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/platform-browser-dynamic/-/platform-browser-dynamic-7.1.1.tgz",
      "integrity": "sha512-ZIu48Vn4S6gjD7CMbGlKGaPQ8v9rYkWzlNYi4vTYzgiqKKNC3hqLsVESU3mSvr5oeQBxSIBidTdHSyafHFrA2w==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@angular/router": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/@angular/router/-/router-7.1.1.tgz",
      "integrity": "sha512-jbnqEq/1iDBkeH8Vn13hauGPTzhwllWM+MLfmdNGTiMzGRx4pmkWa57seDOeBF/GNYBL9JjkWTCrkKFAc2FJKw==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@babel/code-frame": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.0.0.tgz",
      "integrity": "sha512-OfC2uemaknXr87bdLUkWog7nYuliM9Ij5HUcajsVcMCpQrcLmtxRbVFTIqmcSkSeYRBFBRxs2FiUqFJDLdiebA==",
      "dev": true,
      "requires": {
        "@babel/highlight": "^7.0.0"
      }
    },
    "@babel/generator": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.1.6.tgz",
      "integrity": "sha512-brwPBtVvdYdGxtenbQgfCdDPmtkmUBZPjUoK5SXJEBuHaA5BCubh9ly65fzXz7R6o5rA76Rs22ES8Z+HCc0YIQ==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.1.6",
        "jsesc": "^2.5.1",
        "lodash": "^4.17.10",
        "source-map": "^0.5.0",
        "trim-right": "^1.0.1"
      },
      "dependencies": {
        "jsesc": {
          "version": "2.5.2",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
          "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA==",
          "dev": true
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        }
      }
    },
    "@babel/helper-function-name": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.1.0.tgz",
      "integrity": "sha512-A95XEoCpb3TO+KZzJ4S/5uW5fNe26DjBGqf1o9ucyLyCmi1dXq/B3c8iaWTfBk3VvetUxl16e8tIrd5teOCfGw==",
      "dev": true,
      "requires": {
        "@babel/helper-get-function-arity": "^7.0.0",
        "@babel/template": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-get-function-arity": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-get-function-arity/-/helper-get-function-arity-7.0.0.tgz",
      "integrity": "sha512-r2DbJeg4svYvt3HOS74U4eWKsUAMRH01Z1ds1zx8KNTPtpTL5JAsdFv8BNyOpVqdFhHkkRDIg5B4AsxmkjAlmQ==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/helper-split-export-declaration": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.0.0.tgz",
      "integrity": "sha512-MXkOJqva62dfC0w85mEf/LucPPS/1+04nmmRMPEBUB++hiiThQ2zPtX/mEWQ3mtzCEjIJvPY8nuwxXtQeQwUag==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.0.0"
      }
    },
    "@babel/highlight": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.0.0.tgz",
      "integrity": "sha512-UFMC4ZeFC48Tpvj7C8UgLvtkaUuovQX+5xNWrsIoMG8o2z+XFKjKaN9iVmS84dPwVN00W4wPmqvYoZF3EGAsfw==",
      "dev": true,
      "requires": {
        "chalk": "^2.0.0",
        "esutils": "^2.0.2",
        "js-tokens": "^4.0.0"
      },
      "dependencies": {
        "js-tokens": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
          "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
          "dev": true
        }
      }
    },
    "@babel/parser": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.1.6.tgz",
      "integrity": "sha512-dWP6LJm9nKT6ALaa+bnL247GHHMWir3vSlZ2+IHgHgktZQx0L3Uvq2uAWcuzIe+fujRsYWBW2q622C5UvGK9iQ==",
      "dev": true
    },
    "@babel/template": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.1.2.tgz",
      "integrity": "sha512-SY1MmplssORfFiLDcOETrW7fCLl+PavlwMh92rrGcikQaRq4iWPVH0MpwPpY3etVMx6RnDjXtr6VZYr/IbP/Ag==",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/parser": "^7.1.2",
        "@babel/types": "^7.1.2"
      }
    },
    "@babel/traverse": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.1.6.tgz",
      "integrity": "sha512-CXedit6GpISz3sC2k2FsGCUpOhUqKdyL0lqNrImQojagnUMXf8hex4AxYFRuMkNGcvJX5QAFGzB5WJQmSv8SiQ==",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "@babel/generator": "^7.1.6",
        "@babel/helper-function-name": "^7.1.0",
        "@babel/helper-split-export-declaration": "^7.0.0",
        "@babel/parser": "^7.1.6",
        "@babel/types": "^7.1.6",
        "debug": "^4.1.0",
        "globals": "^11.1.0",
        "lodash": "^4.17.10"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.0.tgz",
          "integrity": "sha512-heNPJUJIqC+xB6ayLAMHaIrmN9HKa7aQO8MGqKpvCA+uJYVcvR6l5kgdrhRuwPFHU7P5/A1w0BjByPHwpfTDKg==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "globals": {
          "version": "11.9.0",
          "resolved": "https://registry.npmjs.org/globals/-/globals-11.9.0.tgz",
          "integrity": "sha512-5cJVtyXWH8PiJPVLZzzoIizXx944O4OmRro5MWKx5fT4MgcN7OfaMutPeaTdJCCURwbWdhhcCWcKIffPnmTzBg==",
          "dev": true
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        }
      }
    },
    "@babel/types": {
      "version": "7.1.6",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.1.6.tgz",
      "integrity": "sha512-DMiUzlY9DSjVsOylJssxLHSgj6tWM9PRFJOGW/RaOglVOK9nzTxoOMfTfRQXGUCUQ/HmlG2efwC+XqUEJ5ay4w==",
      "dev": true,
      "requires": {
        "esutils": "^2.0.2",
        "lodash": "^4.17.10",
        "to-fast-properties": "^2.0.0"
      },
      "dependencies": {
        "to-fast-properties": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
          "integrity": "sha1-3F5pjL0HkmW8c+A3doGk5Og/YW4=",
          "dev": true
        }
      }
    },
    "@fortawesome/angular-fontawesome": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@fortawesome/angular-fontawesome/-/angular-fontawesome-0.3.0.tgz",
      "integrity": "sha512-wXvyPI7GidoNiqeMz2re9iemUMFH4zBmuv94CfXlaanQ8+kMP/fYs/k69PLVN1KsebQY4kRA9GHmc1U1ndBkJg==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "@fortawesome/fontawesome-common-types": {
      "version": "0.2.8",
      "resolved": "https://registry.npmjs.org/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-0.2.8.tgz",
      "integrity": "sha512-0sU7JDLdEeGQlWBSr5uEE6PZOM15YM1s9rFlpZV+WhNdX2V6Co3Sj0OW5el4F54X1Tw+nfxf4Cc3dUedudaDWg=="
    },
    "@fortawesome/fontawesome-svg-core": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@fortawesome/fontawesome-svg-core/-/fontawesome-svg-core-1.2.8.tgz",
      "integrity": "sha512-cvcMQZ5F8WSNSGMk9uWlkmZNfDzmdsWLRrTMrNwwihHcEmWRlIuSbDt+PQ/rXsnGmJnmLQJLFBT1cse/3swxbg==",
      "requires": {
        "@fortawesome/fontawesome-common-types": "^0.2.8"
      }
    },
    "@fortawesome/free-solid-svg-icons": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/@fortawesome/free-solid-svg-icons/-/free-solid-svg-icons-5.5.0.tgz",
      "integrity": "sha512-VawIT2owNP97EwehZmxkvZDhoKwEevU/1HOMkln6kc4OtfE+JKYr6DpyzQnHVWXvz/eFj36QElHNe6zT8gR+Tg==",
      "requires": {
        "@fortawesome/fontawesome-common-types": "^0.2.8"
      }
    },
    "@ngtools/json-schema": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@ngtools/json-schema/-/json-schema-1.1.0.tgz",
      "integrity": "sha1-w6DFRNYjkqzCgTpCyKDcb1j4aSI=",
      "dev": true
    },
    "@ngtools/webpack": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@ngtools/webpack/-/webpack-7.1.2.tgz",
      "integrity": "sha512-Oc4N5QXh2u2q8OSfLBGcYkZrcvRmzxYRKUq99fO1u4JE4eZ3Pq7jp7X3/caro+9Y8eB2OpveSSC9UvEc0dz+AQ==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "7.1.2",
        "enhanced-resolve": "4.1.0",
        "rxjs": "6.3.3",
        "tree-kill": "1.2.0",
        "webpack-sources": "1.2.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        },
        "webpack-sources": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.2.0.tgz",
          "integrity": "sha512-9BZwxR85dNsjWz3blyxdOhTgtnQvv3OEs5xofI0wPYTwu5kaWxS08UuD1oI7WLBLpRO+ylf0ofnXLXWmGb2WMw==",
          "dev": true,
          "requires": {
            "source-list-map": "^2.0.0",
            "source-map": "~0.6.1"
          }
        }
      }
    },
    "@schematics/angular": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@schematics/angular/-/angular-7.1.2.tgz",
      "integrity": "sha512-coypNxjRjCExCbkJ8Vser4iZbdksl3cNqgdokDlEtpXnnph3ZYvNDhDD9TBWYQ+cwDhCHAOzT3U3IjN4R2MCgQ==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "7.1.2",
        "@angular-devkit/schematics": "7.1.2",
        "typescript": "3.1.6"
      }
    },
    "@schematics/update": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/@schematics/update/-/update-0.11.2.tgz",
      "integrity": "sha512-dGA2PYnBLWRjVSTrTMPnVzsl5h5ojVcgFTpMke0FmgaJcR/D15FiwSs2LuJrmbb8f4oTAbQe1ON696M9kjWJIQ==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "7.1.2",
        "@angular-devkit/schematics": "7.1.2",
        "@yarnpkg/lockfile": "1.1.0",
        "ini": "1.3.5",
        "pacote": "9.1.1",
        "rxjs": "6.3.3",
        "semver": "5.5.1",
        "semver-intersect": "1.4.0"
      }
    },
    "@types/estree": {
      "version": "0.0.39",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-0.0.39.tgz",
      "integrity": "sha512-EYNwp3bU+98cpU4lAWYYL7Zz+2gryWH1qbdDTidVd6hkiR6weksdbMadyXKXNPEkQFhXM+hVO9ZygomHXp+AIw==",
      "dev": true
    },
    "@types/jasmine": {
      "version": "2.8.12",
      "resolved": "https://registry.npmjs.org/@types/jasmine/-/jasmine-2.8.12.tgz",
      "integrity": "sha512-eE+xeiGBPgQsNcyg61JBqQS6NtxC+s2yfOikMCnc0Z4NqKujzmSahmtjLCKVQU/AyrTEQ76TOwQBnr8wGP2bmA==",
      "dev": true
    },
    "@types/jasminewd2": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/@types/jasminewd2/-/jasminewd2-2.0.6.tgz",
      "integrity": "sha512-2ZOKrxb8bKRmP/po5ObYnRDgFE4i+lQiEB27bAMmtMWLgJSqlIDqlLx6S0IRorpOmOPRQ6O80NujTmQAtBkeNw==",
      "dev": true,
      "requires": {
        "@types/jasmine": "*"
      }
    },
    "@types/jspdf": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@types/jspdf/-/jspdf-1.2.2.tgz",
      "integrity": "sha512-OeryGbolZyGuMGlVyn/D7g1KsVClNmbnt8DE9TgOxKG6ixMeG9f8iqspLuhhuQx8BS8zs8Tyn1yEth+ptdkVgw=="
    },
    "@types/node": {
      "version": "8.9.5",
      "resolved": "http://registry.npmjs.org/@types/node/-/node-8.9.5.tgz",
      "integrity": "sha512-jRHfWsvyMtXdbhnz5CVHxaBgnV6duZnPlQuRSo/dm/GnmikNcmZhxIES4E9OZjUmQ8C+HCl4KJux+cXN/ErGDQ==",
      "dev": true
    },
    "@types/q": {
      "version": "0.0.32",
      "resolved": "http://registry.npmjs.org/@types/q/-/q-0.0.32.tgz",
      "integrity": "sha1-vShOV8hPEyXacCur/IKlMoGQwMU=",
      "dev": true
    },
    "@types/selenium-webdriver": {
      "version": "3.0.13",
      "resolved": "https://registry.npmjs.org/@types/selenium-webdriver/-/selenium-webdriver-3.0.13.tgz",
      "integrity": "sha512-rI0LGoMiZGUM+tjDakQpwZOvcmQoubiJ7hxqrYU12VRxBuGGvOThxrBOU/QmJKlKg1WG6FMzuvcEyLffvVSsmw==",
      "dev": true
    },
    "@webassemblyjs/ast": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.7.10.tgz",
      "integrity": "sha512-wTUeaByYN2EA6qVqhbgavtGc7fLTOx0glG2IBsFlrFG51uXIGlYBTyIZMf4SPLo3v1bgV/7lBN3l7Z0R6Hswew==",
      "dev": true,
      "requires": {
        "@webassemblyjs/helper-module-context": "1.7.10",
        "@webassemblyjs/helper-wasm-bytecode": "1.7.10",
        "@webassemblyjs/wast-parser": "1.7.10"
      }
    },
    "@webassemblyjs/floating-point-hex-parser": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.7.10.tgz",
      "integrity": "sha512-gMsGbI6I3p/P1xL2UxqhNh1ga2HCsx5VBB2i5VvJFAaqAjd2PBTRULc3BpTydabUQEGlaZCzEUQhLoLG7TvEYQ==",
      "dev": true
    },
    "@webassemblyjs/helper-api-error": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.7.10.tgz",
      "integrity": "sha512-DoYRlPWtuw3yd5BOr9XhtrmB6X1enYF0/54yNvQWGXZEPDF5PJVNI7zQ7gkcKfTESzp8bIBWailaFXEK/jjCsw==",
      "dev": true
    },
    "@webassemblyjs/helper-buffer": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.7.10.tgz",
      "integrity": "sha512-+RMU3dt/dPh4EpVX4u5jxsOlw22tp3zjqE0m3ftU2tsYxnPULb4cyHlgaNd2KoWuwasCQqn8Mhr+TTdbtj3LlA==",
      "dev": true
    },
    "@webassemblyjs/helper-code-frame": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.7.10.tgz",
      "integrity": "sha512-UiytbpKAULOEab2hUZK2ywXen4gWJVrgxtwY3Kn+eZaaSWaRM8z/7dAXRSoamhKFiBh1uaqxzE/XD9BLlug3gw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/wast-printer": "1.7.10"
      }
    },
    "@webassemblyjs/helper-fsm": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.7.10.tgz",
      "integrity": "sha512-w2vDtUK9xeSRtt5+RnnlRCI7wHEvLjF0XdnxJpgx+LJOvklTZPqWkuy/NhwHSLP19sm9H8dWxKeReMR7sCkGZA==",
      "dev": true
    },
    "@webassemblyjs/helper-module-context": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.7.10.tgz",
      "integrity": "sha512-yE5x/LzZ3XdPdREmJijxzfrf+BDRewvO0zl8kvORgSWmxpRrkqY39KZSq6TSgIWBxkK4SrzlS3BsMCv2s1FpsQ==",
      "dev": true
    },
    "@webassemblyjs/helper-wasm-bytecode": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.7.10.tgz",
      "integrity": "sha512-u5qy4SJ/OrxKxZqJ9N3qH4ZQgHaAzsopsYwLvoWJY6Q33r8PhT3VPyNMaJ7ZFoqzBnZlCcS/0f4Sp8WBxylXfg==",
      "dev": true
    },
    "@webassemblyjs/helper-wasm-section": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.7.10.tgz",
      "integrity": "sha512-Ecvww6sCkcjatcyctUrn22neSJHLN/TTzolMGG/N7S9rpbsTZ8c6Bl98GpSpV77EvzNijiNRHBG0+JO99qKz6g==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-buffer": "1.7.10",
        "@webassemblyjs/helper-wasm-bytecode": "1.7.10",
        "@webassemblyjs/wasm-gen": "1.7.10"
      }
    },
    "@webassemblyjs/ieee754": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.7.10.tgz",
      "integrity": "sha512-HRcWcY+YWt4+s/CvQn+vnSPfRaD4KkuzQFt5MNaELXXHSjelHlSEA8ZcqT69q0GTIuLWZ6JaoKar4yWHVpZHsQ==",
      "dev": true,
      "requires": {
        "@xtuc/ieee754": "^1.2.0"
      }
    },
    "@webassemblyjs/leb128": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.7.10.tgz",
      "integrity": "sha512-og8MciYlA8hvzCLR71hCuZKPbVBfLQeHv7ImKZ4nlyxrYbG7uJHYtHiHu6OV9SqrGuD03H/HtXC4Bgdjfm9FHw==",
      "dev": true,
      "requires": {
        "@xtuc/long": "4.2.1"
      }
    },
    "@webassemblyjs/utf8": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.7.10.tgz",
      "integrity": "sha512-Ng6Pxv6siyZp635xCSnH3mKmIFgqWPCcGdoo0GBYgyGdxu7cUj4agV7Uu1a8REP66UYUFXJLudeGgd4RvuJAnQ==",
      "dev": true
    },
    "@webassemblyjs/wasm-edit": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.7.10.tgz",
      "integrity": "sha512-e9RZFQlb+ZuYcKRcW9yl+mqX/Ycj9+3/+ppDI8nEE/NCY6FoK8f3dKBcfubYV/HZn44b+ND4hjh+4BYBt+sDnA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-buffer": "1.7.10",
        "@webassemblyjs/helper-wasm-bytecode": "1.7.10",
        "@webassemblyjs/helper-wasm-section": "1.7.10",
        "@webassemblyjs/wasm-gen": "1.7.10",
        "@webassemblyjs/wasm-opt": "1.7.10",
        "@webassemblyjs/wasm-parser": "1.7.10",
        "@webassemblyjs/wast-printer": "1.7.10"
      }
    },
    "@webassemblyjs/wasm-gen": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.7.10.tgz",
      "integrity": "sha512-M0lb6cO2Y0PzDye/L39PqwV+jvO+2YxEG5ax+7dgq7EwXdAlpOMx1jxyXJTScQoeTpzOPIb+fLgX/IkLF8h2yw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-wasm-bytecode": "1.7.10",
        "@webassemblyjs/ieee754": "1.7.10",
        "@webassemblyjs/leb128": "1.7.10",
        "@webassemblyjs/utf8": "1.7.10"
      }
    },
    "@webassemblyjs/wasm-opt": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.7.10.tgz",
      "integrity": "sha512-R66IHGCdicgF5ZliN10yn5HaC7vwYAqrSVJGjtJJQp5+QNPBye6heWdVH/at40uh0uoaDN/UVUfXK0gvuUqtVg==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-buffer": "1.7.10",
        "@webassemblyjs/wasm-gen": "1.7.10",
        "@webassemblyjs/wasm-parser": "1.7.10"
      }
    },
    "@webassemblyjs/wasm-parser": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.7.10.tgz",
      "integrity": "sha512-AEv8mkXVK63n/iDR3T693EzoGPnNAwKwT3iHmKJNBrrALAhhEjuPzo/lTE4U7LquEwyvg5nneSNdTdgrBaGJcA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-api-error": "1.7.10",
        "@webassemblyjs/helper-wasm-bytecode": "1.7.10",
        "@webassemblyjs/ieee754": "1.7.10",
        "@webassemblyjs/leb128": "1.7.10",
        "@webassemblyjs/utf8": "1.7.10"
      }
    },
    "@webassemblyjs/wast-parser": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.7.10.tgz",
      "integrity": "sha512-YTPEtOBljkCL0VjDp4sHe22dAYSm3ZwdJ9+2NTGdtC7ayNvuip1wAhaAS8Zt9Q6SW9E5Jf5PX7YE3XWlrzR9cw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/floating-point-hex-parser": "1.7.10",
        "@webassemblyjs/helper-api-error": "1.7.10",
        "@webassemblyjs/helper-code-frame": "1.7.10",
        "@webassemblyjs/helper-fsm": "1.7.10",
        "@xtuc/long": "4.2.1"
      }
    },
    "@webassemblyjs/wast-printer": {
      "version": "1.7.10",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.7.10.tgz",
      "integrity": "sha512-mJ3QKWtCchL1vhU/kZlJnLPuQZnlDOdZsyP0bbLWPGdYsQDnSBvyTLhzwBA3QAMlzEL9V4JHygEmK6/OTEyytA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/wast-parser": "1.7.10",
        "@xtuc/long": "4.2.1"
      }
    },
    "@xtuc/ieee754": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
      "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==",
      "dev": true
    },
    "@xtuc/long": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.1.tgz",
      "integrity": "sha512-FZdkNBDqBRHKQ2MEbSC17xnPFOhZxeJ2YGSfr2BKf3sujG49Qe3bB+rGCwQfIaA7WHnGeGkSijX4FuBCdrzW/g==",
      "dev": true
    },
    "@yarnpkg/lockfile": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@yarnpkg/lockfile/-/lockfile-1.1.0.tgz",
      "integrity": "sha512-GpSwvyXOcOOlV70vbnzjj4fW5xW/FdUF6nQEt1ENy7m4ZCczi1+/buVUPAqmGfqznsORNFzUMjctTIp8a9tuCQ==",
      "dev": true
    },
    "JSONStream": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
      "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
      "dev": true,
      "requires": {
        "jsonparse": "^1.2.0",
        "through": ">=2.2.7 <3"
      }
    },
    "abab": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/abab/-/abab-1.0.4.tgz",
      "integrity": "sha1-X6rZwsB/YN12dw9xzwJbYqY8/U4="
    },
    "abbrev": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.0.9.tgz",
      "integrity": "sha1-kbR5JYinc4wl813W9jdSovh3YTU=",
      "dev": true
    },
    "accepts": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.5.tgz",
      "integrity": "sha1-63d99gEXI6OxTopywIBcjoZ0a9I=",
      "dev": true,
      "requires": {
        "mime-types": "~2.1.18",
        "negotiator": "0.6.1"
      }
    },
    "acorn": {
      "version": "5.7.3",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.7.3.tgz",
      "integrity": "sha512-T/zvzYRfbVojPWahDsE5evJdHb3oJoQfFbsrKM7w5Zcs++Tr257tia3BmMP8XYVjp1S9RZXQMh7gao96BlqZOw==",
      "dev": true
    },
    "acorn-dynamic-import": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/acorn-dynamic-import/-/acorn-dynamic-import-3.0.0.tgz",
      "integrity": "sha512-zVWV8Z8lislJoOKKqdNMOB+s6+XV5WERty8MnKBeFgwA+19XJjJHs2RP5dzM57FftIs+jQnRToLiWazKr6sSWg==",
      "dev": true,
      "requires": {
        "acorn": "^5.0.0"
      }
    },
    "acorn-globals": {
      "version": "1.0.9",
      "resolved": "http://registry.npmjs.org/acorn-globals/-/acorn-globals-1.0.9.tgz",
      "integrity": "sha1-VbtemGkVB7dFedBRNBMhfDgMVM8=",
      "requires": {
        "acorn": "^2.1.0"
      },
      "dependencies": {
        "acorn": {
          "version": "2.7.0",
          "resolved": "http://registry.npmjs.org/acorn/-/acorn-2.7.0.tgz",
          "integrity": "sha1-q259nYhqrKiwhbwzEreaGYQz8Oc="
        }
      }
    },
    "add": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/add/-/add-2.0.6.tgz",
      "integrity": "sha1-JI8Kn25aUo7yKV2+7DBTITCuIjU="
    },
    "adm-zip": {
      "version": "0.4.13",
      "resolved": "https://registry.npmjs.org/adm-zip/-/adm-zip-0.4.13.tgz",
      "integrity": "sha512-fERNJX8sOXfel6qCBCMPvZLzENBEhZTzKqg6vrOW5pvoEaQuJhRU4ndTAh6lHOxn1I6jnz2NHra56ZODM751uw==",
      "dev": true
    },
    "after": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/after/-/after-0.8.2.tgz",
      "integrity": "sha1-/ts5T58OAqqXaOcCvaI7UF+ufh8=",
      "dev": true
    },
    "agent-base": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.2.1.tgz",
      "integrity": "sha512-JVwXMr9nHYTUXsBFKUqhJwvlcYU/blreOEUkhNR2eXZIvwd+c+o5V4MgDPKWnMS/56awN3TRzIP+KoPn+roQtg==",
      "dev": true,
      "requires": {
        "es6-promisify": "^5.0.0"
      }
    },
    "agentkeepalive": {
      "version": "3.5.2",
      "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-3.5.2.tgz",
      "integrity": "sha512-e0L/HNe6qkQ7H19kTlRRqUibEAwDK5AFk6y3PtMsuut2VAH6+Q4xZml1tNDJD7kSAyqmbG/K08K5WEJYtUrSlQ==",
      "dev": true,
      "requires": {
        "humanize-ms": "^1.2.1"
      }
    },
    "ajv": {
      "version": "6.5.3",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.5.3.tgz",
      "integrity": "sha512-LqZ9wY+fx3UMiiPd741yB2pj3hhil+hQc8taf4o2QGRFpWgZ2V5C8HA165DY9sS3fJwsk7uT7ZlFEyC3Ig3lLg==",
      "dev": true,
      "requires": {
        "fast-deep-equal": "^2.0.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      }
    },
    "ajv-errors": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.0.tgz",
      "integrity": "sha1-7PAh+hCP0X37Xms4Py3SM+Mf/Fk=",
      "dev": true
    },
    "ajv-keywords": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.2.0.tgz",
      "integrity": "sha1-6GuBnGAs+IIa1jdBNpjx3sAhhHo=",
      "dev": true
    },
    "amdefine": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/amdefine/-/amdefine-1.0.1.tgz",
      "integrity": "sha1-SlKCrBZHKek2Gbz9OtFR+BfOkfU="
    },
    "ansi-align": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ansi-align/-/ansi-align-2.0.0.tgz",
      "integrity": "sha1-w2rsy6VjuJzrVW82kPCx2eNUf38=",
      "dev": true,
      "requires": {
        "string-width": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        }
      }
    },
    "ansi-colors": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.2.tgz",
      "integrity": "sha512-kJmcp4PrviBBEx95fC3dYRiC/QSN3EBd0GU1XoNEk/IuUa92rsB6o90zP3w5VAyNznR38Vkc9i8vk5zK6T7TxA==",
      "dev": true
    },
    "ansi-escapes": {
      "version": "3.1.0",
      "resolved": "http://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.1.0.tgz",
      "integrity": "sha512-UgAb8H9D41AQnu/PbWlCofQVcnV4Gs2bBJi9eZPxfU/hgglFh3SMDMENRIqdr7H6XFnXdoknctFByVsCOotTVw==",
      "dev": true
    },
    "ansi-html": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ansi-html/-/ansi-html-0.0.7.tgz",
      "integrity": "sha1-gTWEAhliqenm/QOflA0S9WynhZ4=",
      "dev": true
    },
    "ansi-regex": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
      "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
      "dev": true
    },
    "ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
      "dev": true,
      "requires": {
        "color-convert": "^1.9.0"
      }
    },
    "anymatch": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
      "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
      "dev": true,
      "requires": {
        "micromatch": "^3.1.4",
        "normalize-path": "^2.1.1"
      }
    },
    "app-root-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/app-root-path/-/app-root-path-2.1.0.tgz",
      "integrity": "sha1-mL9lmTJ+zqGZMJhm6BQDaP0uZGo=",
      "dev": true
    },
    "append-transform": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-transform/-/append-transform-1.0.0.tgz",
      "integrity": "sha512-P009oYkeHyU742iSZJzZZywj4QRJdnTWffaKuJQLablCZ1uz6/cW4yaRgcDaoQ+uwOxxnt0gRUcwfsNP2ri0gw==",
      "dev": true,
      "requires": {
        "default-require-extensions": "^2.0.0"
      }
    },
    "aproba": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
      "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
      "dev": true
    },
    "are-we-there-yet": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.5.tgz",
      "integrity": "sha512-5hYdAkZlcG8tOLujVDTgCT+uPX0VnpAH28gWsLfzpXYm7wP6mp5Q/gYyR7YQ0cKVJcXJnl3j2kpBan13PtQf6w==",
      "dev": true,
      "requires": {
        "delegates": "^1.0.0",
        "readable-stream": "^2.0.6"
      }
    },
    "argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "dev": true,
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
      "dev": true
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg==",
      "dev": true
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ=",
      "dev": true
    },
    "array-equal": {
      "version": "1.0.0",
      "resolved": "http://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz",
      "integrity": "sha1-jCpe8kcv2ep0KwTHenUJO6J1fJM="
    },
    "array-find-index": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-find-index/-/array-find-index-1.0.2.tgz",
      "integrity": "sha1-3wEKoSh+Fku9pvlyOwqWoexBh6E=",
      "dev": true
    },
    "array-flatten": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.2.tgz",
      "integrity": "sha512-hNfzcOV8W4NdualtqBFPyVO+54DSJuZGY9qT4pRroB6S9e3iiido2ISIC5h9R2sPJ8H3FHCIiEnsv1lPXO3KtQ==",
      "dev": true
    },
    "array-slice": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/array-slice/-/array-slice-0.2.3.tgz",
      "integrity": "sha1-3Tz7gO15c6dRF82sabC5nshhhvU=",
      "dev": true
    },
    "array-union": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
      "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
      "dev": true,
      "requires": {
        "array-uniq": "^1.0.1"
      }
    },
    "array-uniq": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
      "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY=",
      "dev": true
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
      "dev": true
    },
    "arraybuffer.slice": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/arraybuffer.slice/-/arraybuffer.slice-0.0.7.tgz",
      "integrity": "sha512-wGUIVQXuehL5TCqQun8OW81jGzAWycqzFF8lFp+GOM5BXLYj3bKNsYC4daB7n6XjCqxQA/qgTJ+8ANR3acjrog==",
      "dev": true
    },
    "arrify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
      "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0=",
      "dev": true
    },
    "asap": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",
      "integrity": "sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY=",
      "dev": true
    },
    "asn1": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
      "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
      "requires": {
        "safer-buffer": "~2.1.0"
      }
    },
    "asn1.js": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
      "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
      "dev": true,
      "requires": {
        "bn.js": "^4.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "assert": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.4.1.tgz",
      "integrity": "sha1-mZEtWRg2tab1s0XA8H7vwI/GXZE=",
      "dev": true,
      "requires": {
        "util": "0.10.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE=",
          "dev": true
        },
        "util": {
          "version": "0.10.3",
          "resolved": "http://registry.npmjs.org/util/-/util-0.10.3.tgz",
          "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
          "dev": true,
          "requires": {
            "inherits": "2.0.1"
          }
        }
      }
    },
    "assert-plus": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
      "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c=",
      "dev": true
    },
    "async": {
      "version": "1.5.2",
      "resolved": "http://registry.npmjs.org/async/-/async-1.5.2.tgz",
      "integrity": "sha1-7GphrlZIDAw8skHJVhjiCJL5Zyo=",
      "dev": true
    },
    "async-each": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.1.tgz",
      "integrity": "sha1-GdOGodntxufByF04iu28xW0zYC0=",
      "dev": true
    },
    "async-foreach": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/async-foreach/-/async-foreach-0.1.3.tgz",
      "integrity": "sha1-NhIfhFwFeBct5Bmpfb6x0W7DRUI=",
      "dev": true
    },
    "async-limiter": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.0.tgz",
      "integrity": "sha512-jp/uFnooOiO+L211eZOoSyzpOITMXx1rBITauYykG3BRYPu8h0UcxsPNB04RR5vo4Tyz3+ay17tR6JVf9qzYWg==",
      "dev": true
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
    },
    "atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg==",
      "dev": true
    },
    "autoprefixer": {
      "version": "9.3.1",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-9.3.1.tgz",
      "integrity": "sha512-DY9gOh8z3tnCbJ13JIWaeQsoYncTGdsrgCceBaQSIL4nvdrLxgbRSBPevg2XbX7u4QCSfLheSJEEIUUSlkbx6Q==",
      "dev": true,
      "requires": {
        "browserslist": "^4.3.3",
        "caniuse-lite": "^1.0.30000898",
        "normalize-range": "^0.1.2",
        "num2fraction": "^1.2.2",
        "postcss": "^7.0.5",
        "postcss-value-parser": "^3.3.1"
      }
    },
    "aws-sign2": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
      "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
    },
    "aws4": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.8.0.tgz",
      "integrity": "sha512-ReZxvNHIOv88FlT7rxcXIIC0fPt4KZqZbOlivyWtXLt8ESx84zd3kMC6iK5jVeS2qt+g7ftS7ye4fi06X5rtRQ=="
    },
    "babel-code-frame": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-code-frame/-/babel-code-frame-6.26.0.tgz",
      "integrity": "sha1-Y/1D99weO7fONZR9uP42mj9Yx0s=",
      "dev": true,
      "requires": {
        "chalk": "^1.1.3",
        "esutils": "^2.0.2",
        "js-tokens": "^3.0.2"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "http://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "babel-generator": {
      "version": "6.26.1",
      "resolved": "https://registry.npmjs.org/babel-generator/-/babel-generator-6.26.1.tgz",
      "integrity": "sha512-HyfwY6ApZj7BYTcJURpM5tznulaBvyio7/0d4zFOeMPUmfxkCjHocCuoLa2SAGzBI8AREcH3eP3758F672DppA==",
      "dev": true,
      "requires": {
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "detect-indent": "^4.0.0",
        "jsesc": "^1.3.0",
        "lodash": "^4.17.4",
        "source-map": "^0.5.7",
        "trim-right": "^1.0.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        }
      }
    },
    "babel-messages": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-messages/-/babel-messages-6.23.0.tgz",
      "integrity": "sha1-8830cDhYA1sqKVHG7F7fbGLyYw4=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-polyfill": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-polyfill/-/babel-polyfill-6.23.0.tgz",
      "integrity": "sha1-g2TKYt+Or7gwSZ9pkXdGbDsDSZ0=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "core-js": "^2.4.0",
        "regenerator-runtime": "^0.10.0"
      },
      "dependencies": {
        "regenerator-runtime": {
          "version": "0.10.5",
          "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.10.5.tgz",
          "integrity": "sha1-M2w+/BIgrc7dosn6tntaeVWjNlg=",
          "dev": true
        }
      }
    },
    "babel-runtime": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
      "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
      "dev": true,
      "requires": {
        "core-js": "^2.4.0",
        "regenerator-runtime": "^0.11.0"
      }
    },
    "babel-template": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-template/-/babel-template-6.26.0.tgz",
      "integrity": "sha1-3gPi0WOWsGn0bdn/+FIfsaDjXgI=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "babel-traverse": "^6.26.0",
        "babel-types": "^6.26.0",
        "babylon": "^6.18.0",
        "lodash": "^4.17.4"
      }
    },
    "babel-traverse": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-traverse/-/babel-traverse-6.26.0.tgz",
      "integrity": "sha1-RqnL1+3MYsjlwGTi0tjQ9ANXZu4=",
      "dev": true,
      "requires": {
        "babel-code-frame": "^6.26.0",
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "babylon": "^6.18.0",
        "debug": "^2.6.8",
        "globals": "^9.18.0",
        "invariant": "^2.2.2",
        "lodash": "^4.17.4"
      }
    },
    "babel-types": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-types/-/babel-types-6.26.0.tgz",
      "integrity": "sha1-o7Bz+Uq0nrb6Vc1lInozQ4BjJJc=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "esutils": "^2.0.2",
        "lodash": "^4.17.4",
        "to-fast-properties": "^1.0.3"
      }
    },
    "babylon": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babylon/-/babylon-6.18.0.tgz",
      "integrity": "sha512-q/UEjfGJ2Cm3oKV71DJz9d25TPnq5rhBVL2Q4fA5wcC3jcrdn7+SssEybFIxwAvvP+YCsCYNKughoF33GxgycQ==",
      "dev": true
    },
    "backo2": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/backo2/-/backo2-1.0.2.tgz",
      "integrity": "sha1-MasayLEpNjRj41s+u2n038+6eUc=",
      "dev": true
    },
    "balanced-match": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
      "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c=",
      "dev": true
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "dev": true,
      "requires": {
        "cache-base": "^1.0.1",
        "class-utils": "^0.3.5",
        "component-emitter": "^1.2.1",
        "define-property": "^1.0.0",
        "isobject": "^3.0.1",
        "mixin-deep": "^1.2.0",
        "pascalcase": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "base64-arraybuffer": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-0.1.5.tgz",
      "integrity": "sha1-c5JncZI7Whl0etZmqlzUv5xunOg=",
      "dev": true
    },
    "base64-js": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.0.tgz",
      "integrity": "sha512-ccav/yGvoa80BQDljCxsmmQ3Xvx60/UpBIij5QN21W3wBi/hhIC9OoO+KLpu9IJTS9j4DRVJ3aDDF9cMSoa2lw==",
      "dev": true
    },
    "base64id": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/base64id/-/base64id-1.0.0.tgz",
      "integrity": "sha1-R2iMuZu2gE8OBtPnY7HDLlfY5rY=",
      "dev": true
    },
    "batch": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
      "integrity": "sha1-3DQxT05nkxgJP8dgJyUl+UvyXBY=",
      "dev": true
    },
    "bcrypt-pbkdf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
      "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
      "requires": {
        "tweetnacl": "^0.14.3"
      }
    },
    "better-assert": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/better-assert/-/better-assert-1.0.2.tgz",
      "integrity": "sha1-QIZrnhueC1W0gYlDEeaPr/rrxSI=",
      "dev": true,
      "requires": {
        "callsite": "1.0.0"
      }
    },
    "big.js": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-3.2.0.tgz",
      "integrity": "sha512-+hN/Zh2D08Mx65pZ/4g5bsmNiZUuChDiQfTUQ7qJr4/kuopCr88xZsAXv6mBoZEsUI4OuGHlX59qE94K2mMW8Q==",
      "dev": true
    },
    "binary-extensions": {
      "version": "1.12.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.12.0.tgz",
      "integrity": "sha512-DYWGk01lDcxeS/K9IHPGWfT8PsJmbXRtRd2Sx72Tnb8pcYZQFF1oSDb8hJtS1vhp212q1Rzi5dUf9+nq0o9UIg==",
      "dev": true
    },
    "blob": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/blob/-/blob-0.0.5.tgz",
      "integrity": "sha512-gaqbzQPqOoamawKg0LGVd7SzLgXS+JH61oWprSLH+P+abTczqJbhTR8CmJ2u9/bUYNmHTGJx/UEmn6doAvvuig==",
      "dev": true
    },
    "block-stream": {
      "version": "0.0.9",
      "resolved": "https://registry.npmjs.org/block-stream/-/block-stream-0.0.9.tgz",
      "integrity": "sha1-E+v+d4oDIFz+A3UUgeu0szAMEmo=",
      "dev": true,
      "requires": {
        "inherits": "~2.0.0"
      }
    },
    "blocking-proxy": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/blocking-proxy/-/blocking-proxy-1.0.1.tgz",
      "integrity": "sha512-KE8NFMZr3mN2E0HcvCgRtX7DjhiIQrwle+nSVJVC/yqFb9+xznHl2ZcoBp2L9qzkI4t4cBFJ1efXF8Dwi132RA==",
      "dev": true,
      "requires": {
        "minimist": "^1.2.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "bluebird": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.5.3.tgz",
      "integrity": "sha512-/qKPUQlaW1OyR51WeCPBvRnAlnZFUJkCSG5HzGnuIqhgyJtF+T94lFnn33eiazjRm2LAHVy2guNnaq48X9SJuw==",
      "dev": true
    },
    "bn.js": {
      "version": "4.11.8",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
      "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA==",
      "dev": true
    },
    "body-parser": {
      "version": "1.18.3",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.18.3.tgz",
      "integrity": "sha1-WykhmP/dVTs6DyDe0FkrlWlVyLQ=",
      "dev": true,
      "requires": {
        "bytes": "3.0.0",
        "content-type": "~1.0.4",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "http-errors": "~1.6.3",
        "iconv-lite": "0.4.23",
        "on-finished": "~2.3.0",
        "qs": "6.5.2",
        "raw-body": "2.3.3",
        "type-is": "~1.6.16"
      }
    },
    "bonjour": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/bonjour/-/bonjour-3.5.0.tgz",
      "integrity": "sha1-jokKGD2O6aI5OzhExpGkK897yfU=",
      "dev": true,
      "requires": {
        "array-flatten": "^2.1.0",
        "deep-equal": "^1.0.1",
        "dns-equal": "^1.0.0",
        "dns-txt": "^2.0.2",
        "multicast-dns": "^6.0.1",
        "multicast-dns-service-types": "^1.1.0"
      }
    },
    "boxen": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/boxen/-/boxen-1.3.0.tgz",
      "integrity": "sha512-TNPjfTr432qx7yOjQyaXm3dSR0MH9vXp7eT1BFSl/C51g+EFnOR9hTg1IreahGBmDNCehscshe45f+C1TBZbLw==",
      "dev": true,
      "requires": {
        "ansi-align": "^2.0.0",
        "camelcase": "^4.0.0",
        "chalk": "^2.0.1",
        "cli-boxes": "^1.0.0",
        "string-width": "^2.0.0",
        "term-size": "^1.2.0",
        "widest-line": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        }
      }
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "dev": true,
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
      "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
      "dev": true,
      "requires": {
        "arr-flatten": "^1.1.0",
        "array-unique": "^0.3.2",
        "extend-shallow": "^2.0.1",
        "fill-range": "^4.0.0",
        "isobject": "^3.0.1",
        "repeat-element": "^1.1.2",
        "snapdragon": "^0.8.1",
        "snapdragon-node": "^2.0.1",
        "split-string": "^3.0.2",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8=",
      "dev": true
    },
    "browserify-aes": {
      "version": "1.2.0",
      "resolved": "http://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
      "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
      "dev": true,
      "requires": {
        "buffer-xor": "^1.0.3",
        "cipher-base": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.3",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
      "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
      "dev": true,
      "requires": {
        "browserify-aes": "^1.0.4",
        "browserify-des": "^1.0.0",
        "evp_bytestokey": "^1.0.0"
      }
    },
    "browserify-des": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
      "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.1",
        "des.js": "^1.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "browserify-rsa": {
      "version": "4.0.1",
      "resolved": "http://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
      "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "randombytes": "^2.0.1"
      }
    },
    "browserify-sign": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
      "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.1",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.2",
        "elliptic": "^6.0.0",
        "inherits": "^2.0.1",
        "parse-asn1": "^5.0.0"
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "dev": true,
      "requires": {
        "pako": "~1.0.5"
      }
    },
    "browserslist": {
      "version": "4.3.5",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.3.5.tgz",
      "integrity": "sha512-z9ZhGc3d9e/sJ9dIx5NFXkKoaiQTnrvrMsN3R1fGb1tkWWNSz12UewJn9TNxGo1l7J23h0MRaPmk7jfeTZYs1w==",
      "dev": true,
      "requires": {
        "caniuse-lite": "^1.0.30000912",
        "electron-to-chromium": "^1.3.86",
        "node-releases": "^1.0.5"
      }
    },
    "browserstack": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/browserstack/-/browserstack-1.5.1.tgz",
      "integrity": "sha512-O8VMT64P9NOLhuIoD4YngyxBURefaSdR4QdhG8l6HZ9VxtU7jc3m6jLufFwKA5gaf7fetfB2TnRJnMxyob+heg==",
      "dev": true,
      "requires": {
        "https-proxy-agent": "^2.2.1"
      }
    },
    "buffer": {
      "version": "4.9.1",
      "resolved": "http://registry.npmjs.org/buffer/-/buffer-4.9.1.tgz",
      "integrity": "sha1-bRu2AbB6TvztlwlBMgkwJ8lbwpg=",
      "dev": true,
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4",
        "isarray": "^1.0.0"
      }
    },
    "buffer-alloc": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/buffer-alloc/-/buffer-alloc-1.2.0.tgz",
      "integrity": "sha512-CFsHQgjtW1UChdXgbyJGtnm+O/uLQeZdtbDo8mfUgYXCHSM1wgrVxXm6bSyrUuErEb+4sYVGCzASBRot7zyrow==",
      "dev": true,
      "requires": {
        "buffer-alloc-unsafe": "^1.1.0",
        "buffer-fill": "^1.0.0"
      }
    },
    "buffer-alloc-unsafe": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/buffer-alloc-unsafe/-/buffer-alloc-unsafe-1.1.0.tgz",
      "integrity": "sha512-TEM2iMIEQdJ2yjPJoSIsldnleVaAk1oW3DBVUykyOLsEsFmEc9kn+SFFPz+gl54KQNxlDnAwCXosOS9Okx2xAg==",
      "dev": true
    },
    "buffer-fill": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/buffer-fill/-/buffer-fill-1.0.0.tgz",
      "integrity": "sha1-+PeLdniYiO858gXNY39o5wISKyw=",
      "dev": true
    },
    "buffer-from": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
      "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A==",
      "dev": true
    },
    "buffer-indexof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-indexof/-/buffer-indexof-1.1.1.tgz",
      "integrity": "sha512-4/rOEg86jivtPTeOUUT61jJO1Ya1TrR/OkqCSZDyq84WJh3LuuiphBYJN+fm5xufIk4XAFcEwte/8WzC8If/1g==",
      "dev": true
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk=",
      "dev": true
    },
    "builtin-modules": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-1.1.1.tgz",
      "integrity": "sha1-Jw8HbFpywC9bZaR9+Uxf46J4iS8=",
      "dev": true
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug=",
      "dev": true
    },
    "builtins": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/builtins/-/builtins-1.0.3.tgz",
      "integrity": "sha1-y5T662HIaWRR2zZTThQi+U8K7og=",
      "dev": true
    },
    "bytes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.0.0.tgz",
      "integrity": "sha1-0ygVQE1olpn4Wk6k+odV3ROpYEg=",
      "dev": true
    },
    "cacache": {
      "version": "10.0.4",
      "resolved": "http://registry.npmjs.org/cacache/-/cacache-10.0.4.tgz",
      "integrity": "sha512-Dph0MzuH+rTQzGPNT9fAnrPmMmjKfST6trxJeK7NQuHRaVw24VzPRWTmg9MpcwOVQZO0E1FBICUlFeNaKPIfHA==",
      "dev": true,
      "requires": {
        "bluebird": "^3.5.1",
        "chownr": "^1.0.1",
        "glob": "^7.1.2",
        "graceful-fs": "^4.1.11",
        "lru-cache": "^4.1.1",
        "mississippi": "^2.0.0",
        "mkdirp": "^0.5.1",
        "move-concurrently": "^1.0.1",
        "promise-inflight": "^1.0.1",
        "rimraf": "^2.6.2",
        "ssri": "^5.2.4",
        "unique-filename": "^1.1.0",
        "y18n": "^4.0.0"
      }
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "dev": true,
      "requires": {
        "collection-visit": "^1.0.0",
        "component-emitter": "^1.2.1",
        "get-value": "^2.0.6",
        "has-value": "^1.0.0",
        "isobject": "^3.0.1",
        "set-value": "^2.0.0",
        "to-object-path": "^0.3.0",
        "union-value": "^1.0.0",
        "unset-value": "^1.0.0"
      }
    },
    "callsite": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/callsite/-/callsite-1.0.0.tgz",
      "integrity": "sha1-KAOY5dZkvXQDi28JBRU+borxvCA=",
      "dev": true
    },
    "camelcase": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-2.1.1.tgz",
      "integrity": "sha1-fB0W1nmhu+WcoCys7PsBHiAfWh8=",
      "dev": true
    },
    "camelcase-keys": {
      "version": "2.1.0",
      "resolved": "http://registry.npmjs.org/camelcase-keys/-/camelcase-keys-2.1.0.tgz",
      "integrity": "sha1-MIvur/3ygRkFHvodkyITyRuPkuc=",
      "dev": true,
      "requires": {
        "camelcase": "^2.0.0",
        "map-obj": "^1.0.0"
      }
    },
    "caniuse-lite": {
      "version": "1.0.30000912",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30000912.tgz",
      "integrity": "sha512-M3zAtV36U+xw5mMROlTXpAHClmPAor6GPKAMD5Yi7glCB5sbMPFtnQ3rGpk4XqPdUrrTIaVYSJZxREZWNy8QJg==",
      "dev": true
    },
    "canonical-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/canonical-path/-/canonical-path-1.0.0.tgz",
      "integrity": "sha512-feylzsbDxi1gPZ1IjystzIQZagYYLvfKrSuygUCgf7z6x790VEzze5QEkdSV1U58RA7Hi0+v6fv4K54atOzATg==",
      "dev": true
    },
    "canvg": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/canvg/-/canvg-1.5.3.tgz",
      "integrity": "sha512-7Gn2IuQzvUQWPIuZuFHrzsTM0gkPz2RRT9OcbdmA03jeKk8kltrD8gqUzNX15ghY/4PV5bbe5lmD6yDLDY6Ybg==",
      "requires": {
        "jsdom": "^8.1.0",
        "rgbcolor": "^1.0.1",
        "stackblur-canvas": "^1.4.1",
        "xmldom": "^0.1.22"
      }
    },
    "capture-stack-trace": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/capture-stack-trace/-/capture-stack-trace-1.0.1.tgz",
      "integrity": "sha512-mYQLZnx5Qt1JgB1WEiMCf2647plpGeQ2NMR/5L0HNZzGQo4fuSPnK+wjfPnKZV0aiJDgzmWqqkV/g7JD+DW0qw==",
      "dev": true
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
    },
    "cf-blob.js": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/cf-blob.js/-/cf-blob.js-0.0.1.tgz",
      "integrity": "sha1-9at+EueYyvCMz4KMaaug8GPYP5k="
    },
    "chalk": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.1.tgz",
      "integrity": "sha512-ObN6h1v2fTJSmUXoS3nMQ92LbDK9be4TV+6G+omQlGJFdcUX5heKi1LZ1YnRMIgwTLEj3E24bT6tYni50rlCfQ==",
      "dev": true,
      "requires": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      }
    },
    "chardet": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
      "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA==",
      "dev": true
    },
    "chokidar": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.0.4.tgz",
      "integrity": "sha512-z9n7yt9rOvIJrMhvDtDictKrkFHeihkNl6uWMmZlmL6tJtX9Cs+87oK+teBx+JIgzvbX3yZHT3eF8vpbDxHJXQ==",
      "dev": true,
      "requires": {
        "anymatch": "^2.0.0",
        "async-each": "^1.0.0",
        "braces": "^2.3.0",
        "fsevents": "^1.2.2",
        "glob-parent": "^3.1.0",
        "inherits": "^2.0.1",
        "is-binary-path": "^1.0.0",
        "is-glob": "^4.0.0",
        "lodash.debounce": "^4.0.8",
        "normalize-path": "^2.1.1",
        "path-is-absolute": "^1.0.0",
        "readdirp": "^2.0.0",
        "upath": "^1.0.5"
      }
    },
    "chownr": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.1.tgz",
      "integrity": "sha512-j38EvO5+LHX84jlo6h4UzmOwi0UgW61WRyPtJz4qaadK5eY3BTS5TY/S1Stc3Uk2lIM6TPevAlULiEJwie860g==",
      "dev": true
    },
    "chrome-trace-event": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.0.tgz",
      "integrity": "sha512-xDbVgyfDTT2piup/h8dK/y4QZfJRSa73bw1WZ8b4XM1o7fsFubUVGYcE+1ANtOzJJELGpYoG2961z0Z6OAld9A==",
      "dev": true,
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "ci-info": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-1.6.0.tgz",
      "integrity": "sha512-vsGdkwSCDpWmP80ncATX7iea5DWQemg1UgCW5J8tqjU3lYw4FBYuj89J0CTVomA7BEfvSZd84GmHko+MxFQU2A==",
      "dev": true
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "circular-dependency-plugin": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/circular-dependency-plugin/-/circular-dependency-plugin-5.0.2.tgz",
      "integrity": "sha512-oC7/DVAyfcY3UWKm0sN/oVoDedQDQiw/vIiAnuTWTpE5s0zWf7l3WY417Xw/Fbi/QbAjctAkxgMiS9P0s3zkmA==",
      "dev": true
    },
    "circular-json": {
      "version": "0.5.9",
      "resolved": "https://registry.npmjs.org/circular-json/-/circular-json-0.5.9.tgz",
      "integrity": "sha512-4ivwqHpIFJZBuhN3g/pEcdbnGUywkBblloGbkglyloVjjR3uT6tieI89MVOfbP2tHX5sgb01FuLgAOzebNlJNQ==",
      "dev": true
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "dev": true,
      "requires": {
        "arr-union": "^3.1.0",
        "define-property": "^0.2.5",
        "isobject": "^3.0.0",
        "static-extend": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "clean-css": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-4.2.1.tgz",
      "integrity": "sha512-4ZxI6dy4lrY6FHzfiy1aEOXgu4LIsW2MhwG0VBKdcoGoH/XLFgaHSdLTGr4O8Be6A8r3MOphEiI8Gc1n0ecf3g==",
      "dev": true,
      "requires": {
        "source-map": "~0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "cli-boxes": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/cli-boxes/-/cli-boxes-1.0.0.tgz",
      "integrity": "sha1-T6kXw+WclKAEzWH47lCdplFocUM=",
      "dev": true
    },
    "cli-cursor": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-2.1.0.tgz",
      "integrity": "sha1-s12sN2R5+sw+lHR9QdDQ9SOP/LU=",
      "dev": true,
      "requires": {
        "restore-cursor": "^2.0.0"
      }
    },
    "cli-width": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-2.2.0.tgz",
      "integrity": "sha1-/xnt6Kml5XkyQUewwR8PvLq+1jk=",
      "dev": true
    },
    "cliui": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-3.2.0.tgz",
      "integrity": "sha1-EgYBU3qRbSmUD5NNo7SNWFo5IT0=",
      "dev": true,
      "requires": {
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1",
        "wrap-ansi": "^2.0.0"
      }
    },
    "clone": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/clone/-/clone-2.1.2.tgz",
      "integrity": "sha1-G39Ln1kfHo+DZwQBYANFoCiHQ18=",
      "dev": true
    },
    "clone-deep": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-2.0.2.tgz",
      "integrity": "sha512-SZegPTKjCgpQH63E+eN6mVEEPdQBOUzjyJm5Pora4lrwWRFS8I0QAxV/KD6vV/i0WuijHZWQC1fMsPEdxfdVCQ==",
      "dev": true,
      "requires": {
        "for-own": "^1.0.0",
        "is-plain-object": "^2.0.4",
        "kind-of": "^6.0.0",
        "shallow-clone": "^1.0.0"
      }
    },
    "co": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
      "integrity": "sha1-bqa989hTrlTMuOR7+gvz+QMfsYQ=",
      "dev": true
    },
    "code-point-at": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
      "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c=",
      "dev": true
    },
    "codelyzer": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/codelyzer/-/codelyzer-4.5.0.tgz",
      "integrity": "sha512-oO6vCkjqsVrEsmh58oNlnJkRXuA30hF8cdNAQV9DytEalDwyOFRvHMnlKFzmOStNerOmPGZU9GAHnBo4tGvtiQ==",
      "dev": true,
      "requires": {
        "app-root-path": "^2.1.0",
        "css-selector-tokenizer": "^0.7.0",
        "cssauron": "^1.4.0",
        "semver-dsl": "^1.0.1",
        "source-map": "^0.5.7",
        "sprintf-js": "^1.1.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        },
        "sprintf-js": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.1.1.tgz",
          "integrity": "sha1-Nr54Mgr+WAH2zqPueLblqrlA6gw=",
          "dev": true
        }
      }
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "dev": true,
      "requires": {
        "map-visit": "^1.0.0",
        "object-visit": "^1.0.0"
      }
    },
    "color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "dev": true,
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU=",
      "dev": true
    },
    "colors": {
      "version": "1.1.2",
      "resolved": "http://registry.npmjs.org/colors/-/colors-1.1.2.tgz",
      "integrity": "sha1-FopHAXVran9RoSzgyXv6KMCE7WM=",
      "dev": true
    },
    "combine-lists": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/combine-lists/-/combine-lists-1.0.1.tgz",
      "integrity": "sha1-RYwH4J4NkA/Ci3Cj/sLazR0st/Y=",
      "dev": true,
      "requires": {
        "lodash": "^4.5.0"
      }
    },
    "combined-stream": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.7.tgz",
      "integrity": "sha512-brWl9y6vOB1xYPZcpZde3N9zDByXTosAeMDo4p1wzo6UMOX4vumB+TP1RZ76sfE6Md68Q0NJSrE/gbezd4Ul+w==",
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "commander": {
      "version": "2.17.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.17.1.tgz",
      "integrity": "sha512-wPMUt6FnH2yzG95SA6mzjQOEKUU3aLaDEmzs1ti+1E9h+CsrZghRlqEM/EJ4KscsQVG8uNN4uVreUeT8+drlgg==",
      "dev": true
    },
    "commondir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
      "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs=",
      "dev": true
    },
    "compare-versions": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/compare-versions/-/compare-versions-3.4.0.tgz",
      "integrity": "sha512-tK69D7oNXXqUW3ZNo/z7NXTEz22TCF0pTE+YF9cxvaAM9XnkLo1fV621xCLrRR6aevJlKxExkss0vWqUCUpqdg==",
      "dev": true
    },
    "component-bind": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/component-bind/-/component-bind-1.0.0.tgz",
      "integrity": "sha1-AMYIq33Nk4l8AAllGx06jh5zu9E=",
      "dev": true
    },
    "component-emitter": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.2.1.tgz",
      "integrity": "sha1-E3kY1teCg/ffemt8WmPhQOaUJeY=",
      "dev": true
    },
    "component-inherit": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/component-inherit/-/component-inherit-0.0.3.tgz",
      "integrity": "sha1-ZF/ErfWLcrZJ1crmUTVhnbJv8UM=",
      "dev": true
    },
    "compressible": {
      "version": "2.0.15",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.15.tgz",
      "integrity": "sha512-4aE67DL33dSW9gw4CI2H/yTxqHLNcxp0yS6jB+4h+wr3e43+1z7vm0HU9qXOH8j+qjKuL8+UtkOxYQSMq60Ylw==",
      "dev": true,
      "requires": {
        "mime-db": ">= 1.36.0 < 2"
      }
    },
    "compression": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/compression/-/compression-1.7.3.tgz",
      "integrity": "sha512-HSjyBG5N1Nnz7tF2+O7A9XUhyjru71/fwgNb7oIsEVHR0WShfs2tIS/EySLgiTe98aOK18YDlMXpzjCXY/n9mg==",
      "dev": true,
      "requires": {
        "accepts": "~1.3.5",
        "bytes": "3.0.0",
        "compressible": "~2.0.14",
        "debug": "2.6.9",
        "on-headers": "~1.0.1",
        "safe-buffer": "5.1.2",
        "vary": "~1.1.2"
      }
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s=",
      "dev": true
    },
    "concat-stream": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
      "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
      "dev": true,
      "requires": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^2.2.2",
        "typedarray": "^0.0.6"
      }
    },
    "configstore": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/configstore/-/configstore-3.1.2.tgz",
      "integrity": "sha512-vtv5HtGjcYUgFrXc6Kx747B83MRRVS5R1VTEQoXvuP+kMI+if6uywV0nDGoiydJRy4yk7h9od5Og0kxx4zUXmw==",
      "dev": true,
      "requires": {
        "dot-prop": "^4.1.0",
        "graceful-fs": "^4.1.2",
        "make-dir": "^1.0.0",
        "unique-string": "^1.0.0",
        "write-file-atomic": "^2.0.0",
        "xdg-basedir": "^3.0.0"
      }
    },
    "connect": {
      "version": "3.6.6",
      "resolved": "https://registry.npmjs.org/connect/-/connect-3.6.6.tgz",
      "integrity": "sha1-Ce/2xVr3I24TcTWnJXSFi2eG9SQ=",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "finalhandler": "1.1.0",
        "parseurl": "~1.3.2",
        "utils-merge": "1.0.1"
      },
      "dependencies": {
        "finalhandler": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.0.tgz",
          "integrity": "sha1-zgtoVbRYU+eRsvzGgARtiCU91/U=",
          "dev": true,
          "requires": {
            "debug": "2.6.9",
            "encodeurl": "~1.0.1",
            "escape-html": "~1.0.3",
            "on-finished": "~2.3.0",
            "parseurl": "~1.3.2",
            "statuses": "~1.3.1",
            "unpipe": "~1.0.0"
          }
        },
        "statuses": {
          "version": "1.3.1",
          "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.3.1.tgz",
          "integrity": "sha1-+vUbnrdKrvOzrPStX2Gr8ky3uT4=",
          "dev": true
        }
      }
    },
    "connect-history-api-fallback": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-1.5.0.tgz",
      "integrity": "sha1-sGhzk0vF40T+9hGhlqb6rgruAVo=",
      "dev": true
    },
    "console-browserify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.1.0.tgz",
      "integrity": "sha1-8CQcRXMKn8YyOyBtvzjtx0HQuxA=",
      "dev": true,
      "requires": {
        "date-now": "^0.1.4"
      }
    },
    "console-control-strings": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/console-control-strings/-/console-control-strings-1.1.0.tgz",
      "integrity": "sha1-PXz0Rk22RG6mRL9LOVB/mFEAjo4=",
      "dev": true
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U=",
      "dev": true
    },
    "content-disposition": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.2.tgz",
      "integrity": "sha1-DPaLud318r55YcOoUXjLhdunjLQ=",
      "dev": true
    },
    "content-type": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
      "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA==",
      "dev": true
    },
    "convert-source-map": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.6.0.tgz",
      "integrity": "sha512-eFu7XigvxdZ1ETfbgPBohgyQ/Z++C0eEhTor0qRwBw9unw+L0/6V8wkSuGgzdThkiS5lSpdptOQPD8Ak40a+7A==",
      "dev": true,
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "cookie": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.3.1.tgz",
      "integrity": "sha1-5+Ch+e9DtMi6klxcWpboBtFoc7s=",
      "dev": true
    },
    "cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw=",
      "dev": true
    },
    "copy-concurrently": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
      "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1",
        "fs-write-stream-atomic": "^1.0.8",
        "iferr": "^0.1.5",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.0"
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=",
      "dev": true
    },
    "copy-webpack-plugin": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/copy-webpack-plugin/-/copy-webpack-plugin-4.5.4.tgz",
      "integrity": "sha512-0lstlEyj74OAtYMrDxlNZsU7cwFijAI3Ofz2fD6Mpo9r4xCv4yegfa3uHIKvZY1NSuOtE9nvG6TAhJ+uz9gDaQ==",
      "dev": true,
      "requires": {
        "cacache": "^10.0.4",
        "find-cache-dir": "^1.0.0",
        "globby": "^7.1.1",
        "is-glob": "^4.0.0",
        "loader-utils": "^1.1.0",
        "minimatch": "^3.0.4",
        "p-limit": "^1.0.0",
        "serialize-javascript": "^1.4.0"
      }
    },
    "core-js": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.0.tgz",
      "integrity": "sha512-kLRC6ncVpuEW/1kwrOXYX6KQASCVtrh1gQr/UiaVgFlf9WE5Vp+lNe5+h3LuMr5PAucWnnEXwH0nQHRH/gpGtw=="
    },
    "core-util-is": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
      "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
    },
    "cosmiconfig": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-4.0.0.tgz",
      "integrity": "sha512-6e5vDdrXZD+t5v0L8CrurPeybg4Fmf+FCSYxXKYVAqLUtyCSbuyqE059d0kDthTNRzKVjL7QMgNpEUlsoYH3iQ==",
      "dev": true,
      "requires": {
        "is-directory": "^0.3.1",
        "js-yaml": "^3.9.0",
        "parse-json": "^4.0.0",
        "require-from-string": "^2.0.1"
      },
      "dependencies": {
        "parse-json": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
          "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
          "dev": true,
          "requires": {
            "error-ex": "^1.3.1",
            "json-parse-better-errors": "^1.0.1"
          }
        }
      }
    },
    "create-ecdh": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
      "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "elliptic": "^6.0.0"
      }
    },
    "create-error-class": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/create-error-class/-/create-error-class-3.0.2.tgz",
      "integrity": "sha1-Br56vvlHo/FKMP1hBnHUAbyot7Y=",
      "dev": true,
      "requires": {
        "capture-stack-trace": "^1.0.0"
      }
    },
    "create-hash": {
      "version": "1.2.0",
      "resolved": "http://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
      "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.1",
        "inherits": "^2.0.1",
        "md5.js": "^1.3.4",
        "ripemd160": "^2.0.1",
        "sha.js": "^2.4.0"
      }
    },
    "create-hmac": {
      "version": "1.1.7",
      "resolved": "http://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
      "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.3",
        "create-hash": "^1.1.0",
        "inherits": "^2.0.1",
        "ripemd160": "^2.0.0",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "cross-spawn": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-3.0.1.tgz",
      "integrity": "sha1-ElYDfsufDF9549bvE14wdwGEuYI=",
      "dev": true,
      "requires": {
        "lru-cache": "^4.0.1",
        "which": "^1.2.9"
      }
    },
    "crypto-browserify": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
      "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
      "dev": true,
      "requires": {
        "browserify-cipher": "^1.0.0",
        "browserify-sign": "^4.0.0",
        "create-ecdh": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.0",
        "diffie-hellman": "^5.0.0",
        "inherits": "^2.0.1",
        "pbkdf2": "^3.0.3",
        "public-encrypt": "^4.0.0",
        "randombytes": "^2.0.0",
        "randomfill": "^1.0.3"
      }
    },
    "crypto-random-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/crypto-random-string/-/crypto-random-string-1.0.0.tgz",
      "integrity": "sha1-ojD2T1aDEOFJgAmUB5DsmVRbyn4=",
      "dev": true
    },
    "css-parse": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/css-parse/-/css-parse-1.7.0.tgz",
      "integrity": "sha1-Mh9s9zeCpv91ERE5D8BeLGV9jJs=",
      "dev": true
    },
    "css-selector-tokenizer": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/css-selector-tokenizer/-/css-selector-tokenizer-0.7.1.tgz",
      "integrity": "sha512-xYL0AMZJ4gFzJQsHUKa5jiWWi2vH77WVNg7JYRyewwj6oPh4yb/y6Y9ZCw9dsj/9UauMhtuxR+ogQd//EdEVNA==",
      "dev": true,
      "requires": {
        "cssesc": "^0.1.0",
        "fastparse": "^1.1.1",
        "regexpu-core": "^1.0.0"
      }
    },
    "cssauron": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/cssauron/-/cssauron-1.4.0.tgz",
      "integrity": "sha1-pmAt/34EqDBtwNuaVR6S6LVmKtg=",
      "dev": true,
      "requires": {
        "through": "X.X.X"
      }
    },
    "cssesc": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-0.1.0.tgz",
      "integrity": "sha1-yBSQPkViM3GgR3tAEJqq++6t27Q=",
      "dev": true
    },
    "cssom": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.4.tgz",
      "integrity": "sha512-+7prCSORpXNeR4/fUP3rL+TzqtiFfhMvTd7uEqMdgPvLPt4+uzFUeufx5RHjGTACCargg/DiEt/moMQmvnfkog=="
    },
    "cssstyle": {
      "version": "0.2.37",
      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-0.2.37.tgz",
      "integrity": "sha1-VBCXI0yyUTyDzu06zdwn/yeYfVQ=",
      "requires": {
        "cssom": "0.3.x"
      }
    },
    "cuint": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/cuint/-/cuint-0.2.2.tgz",
      "integrity": "sha1-QICG1AlVDCYxFVYZ6fp7ytw7mRs=",
      "dev": true
    },
    "currently-unhandled": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/currently-unhandled/-/currently-unhandled-0.4.1.tgz",
      "integrity": "sha1-mI3zP+qxke95mmE2nddsF635V+o=",
      "dev": true,
      "requires": {
        "array-find-index": "^1.0.1"
      }
    },
    "custom-event": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/custom-event/-/custom-event-1.0.1.tgz",
      "integrity": "sha1-XQKkaFCt8bSjF5RqOSj8y1v9BCU=",
      "dev": true
    },
    "cyclist": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-0.2.2.tgz",
      "integrity": "sha1-GzN5LhHpFKL9bW7WRHRkRE5fpkA=",
      "dev": true
    },
    "dashdash": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
      "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "date-format": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/date-format/-/date-format-1.2.0.tgz",
      "integrity": "sha1-YV6CjiM90aubua4JUODOzPpuytg=",
      "dev": true
    },
    "date-now": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/date-now/-/date-now-0.1.4.tgz",
      "integrity": "sha1-6vQ5/U1ISK105cx9vvIAZyueNFs=",
      "dev": true
    },
    "debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "requires": {
        "ms": "2.0.0"
      }
    },
    "decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA=",
      "dev": true
    },
    "decode-uri-component": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU=",
      "dev": true
    },
    "deep-equal": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-1.0.1.tgz",
      "integrity": "sha1-9dJgKStmDghO/0zbyfCK0yR0SLU=",
      "dev": true
    },
    "deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
      "dev": true
    },
    "deep-is": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
      "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ="
    },
    "default-gateway": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/default-gateway/-/default-gateway-2.7.2.tgz",
      "integrity": "sha512-lAc4i9QJR0YHSDFdzeBQKfZ1SRDG3hsJNEkrpcZa8QhBfidLAilT60BDEIVUUGqosFp425KOgB3uYqcnQrWafQ==",
      "dev": true,
      "requires": {
        "execa": "^0.10.0",
        "ip-regex": "^2.1.0"
      }
    },
    "default-require-extensions": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/default-require-extensions/-/default-require-extensions-2.0.0.tgz",
      "integrity": "sha1-9fj7sYp9bVCyH2QfZJ67Uiz+JPc=",
      "dev": true,
      "requires": {
        "strip-bom": "^3.0.0"
      },
      "dependencies": {
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
          "dev": true
        }
      }
    },
    "define-property": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
      "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
      "dev": true,
      "requires": {
        "is-descriptor": "^1.0.2",
        "isobject": "^3.0.1"
      },
      "dependencies": {
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "del": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/del/-/del-3.0.0.tgz",
      "integrity": "sha1-U+z2mf/LyzljdpGrE7rxYIGXZuU=",
      "dev": true,
      "requires": {
        "globby": "^6.1.0",
        "is-path-cwd": "^1.0.0",
        "is-path-in-cwd": "^1.0.0",
        "p-map": "^1.1.1",
        "pify": "^3.0.0",
        "rimraf": "^2.2.8"
      },
      "dependencies": {
        "globby": {
          "version": "6.1.0",
          "resolved": "http://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
          "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
          "dev": true,
          "requires": {
            "array-union": "^1.0.1",
            "glob": "^7.0.3",
            "object-assign": "^4.0.1",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          },
          "dependencies": {
            "pify": {
              "version": "2.3.0",
              "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
              "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
              "dev": true
            }
          }
        }
      }
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
    },
    "delegates": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delegates/-/delegates-1.0.0.tgz",
      "integrity": "sha1-hMbhWbgZBP3KWaDvRM2HDTElD5o=",
      "dev": true
    },
    "depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak=",
      "dev": true
    },
    "dependency-graph": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/dependency-graph/-/dependency-graph-0.7.2.tgz",
      "integrity": "sha512-KqtH4/EZdtdfWX0p6MGP9jljvxSY6msy/pRUD4jgNwVpv3v1QmNLlsB3LDSSUg79BRVSn7jI1QPRtArGABovAQ==",
      "dev": true
    },
    "des.js": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.0.tgz",
      "integrity": "sha1-wHTS4qpqipoH29YfmhXCzYPsjsw=",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "destroy": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
      "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA=",
      "dev": true
    },
    "detect-indent": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/detect-indent/-/detect-indent-4.0.0.tgz",
      "integrity": "sha1-920GQ1LN9Docts5hnE7jqUdd4gg=",
      "dev": true,
      "requires": {
        "repeating": "^2.0.0"
      }
    },
    "detect-node": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.0.4.tgz",
      "integrity": "sha512-ZIzRpLJrOj7jjP2miAtgqIfmzbxa4ZOr5jJc601zklsfEx9oTzmmj2nVpIPRpNlRTIh8lc1kyViIY7BWSGNmKw==",
      "dev": true
    },
    "di": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/di/-/di-0.0.1.tgz",
      "integrity": "sha1-gGZJMmzqp8qjMG112YXqJ0i6kTw=",
      "dev": true
    },
    "diff": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/diff/-/diff-3.5.0.tgz",
      "integrity": "sha512-A46qtFgd+g7pDZinpnwiRJtxbC1hpgf0uzP3iG89scHk0AUC7A1TGxf5OiiOUv/JMZR8GOt8hL900hV0bOy5xA==",
      "dev": true
    },
    "diffie-hellman": {
      "version": "5.0.3",
      "resolved": "http://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
      "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "miller-rabin": "^4.0.0",
        "randombytes": "^2.0.0"
      }
    },
    "dir-glob": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-2.0.0.tgz",
      "integrity": "sha512-37qirFDz8cA5fimp9feo43fSuRo2gHwaIn6dXL8Ber1dGwUosDrGZeCCXq57WnIqE4aQ+u3eQZzsk1yOzhdwag==",
      "dev": true,
      "requires": {
        "arrify": "^1.0.1",
        "path-type": "^3.0.0"
      }
    },
    "dns-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/dns-equal/-/dns-equal-1.0.0.tgz",
      "integrity": "sha1-s55/HabrCnW6nBcySzR1PEfgZU0=",
      "dev": true
    },
    "dns-packet": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-1.3.1.tgz",
      "integrity": "sha512-0UxfQkMhYAUaZI+xrNZOz/as5KgDU0M/fQ9b6SpkyLbk3GEswDi6PADJVaYJradtRVsRIlF1zLyOodbcTCDzUg==",
      "dev": true,
      "requires": {
        "ip": "^1.1.0",
        "safe-buffer": "^5.0.1"
      }
    },
    "dns-txt": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/dns-txt/-/dns-txt-2.0.2.tgz",
      "integrity": "sha1-uR2Ab10nGI5Ks+fRB9iBocxGQrY=",
      "dev": true,
      "requires": {
        "buffer-indexof": "^1.0.0"
      }
    },
    "dom-serialize": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/dom-serialize/-/dom-serialize-2.2.1.tgz",
      "integrity": "sha1-ViromZ9Evl6jB29UGdzVnrQ6yVs=",
      "dev": true,
      "requires": {
        "custom-event": "~1.0.0",
        "ent": "~2.2.0",
        "extend": "^3.0.0",
        "void-elements": "^2.0.0"
      }
    },
    "domain-browser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
      "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA==",
      "dev": true
    },
    "dot-prop": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-4.2.0.tgz",
      "integrity": "sha512-tUMXrxlExSW6U2EXiiKGSBVdYgtV8qlHL+C10TsW4PURY/ic+eaysnSkwB4kA/mBlCyy/IKDJ+Lc3wbWeaXtuQ==",
      "dev": true,
      "requires": {
        "is-obj": "^1.0.0"
      }
    },
    "duplexer3": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/duplexer3/-/duplexer3-0.1.4.tgz",
      "integrity": "sha1-7gHdHKwO08vH/b6jfcCo8c4ALOI=",
      "dev": true
    },
    "duplexify": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.6.1.tgz",
      "integrity": "sha512-vM58DwdnKmty+FSPzT14K9JXb90H+j5emaR4KYbr2KTIz00WHGbWOe5ghQTx233ZCLZtrGDALzKwcjEtSt35mA==",
      "dev": true,
      "requires": {
        "end-of-stream": "^1.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0",
        "stream-shift": "^1.0.0"
      }
    },
    "ecc-jsbn": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
      "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
      "requires": {
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.1.0"
      }
    },
    "ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0=",
      "dev": true
    },
    "electron-to-chromium": {
      "version": "1.3.86",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.3.86.tgz",
      "integrity": "sha512-BcmXOu37FCPxrrh0wyKgKi5dAjIu2ohxN5ptapkLPKRC3IBK2NeIwh9n1x/8HzSRQiEKamJkDce1ZgOGgEX9iw==",
      "dev": true
    },
    "elliptic": {
      "version": "6.4.1",
      "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.4.1.tgz",
      "integrity": "sha512-BsXLz5sqX8OHcsh7CqBMztyXARmGQ3LWPtGjJi6DiJHq5C/qvi9P3OqgswKSDftbu8+IoI/QDTAm2fFnQ9SZSQ==",
      "dev": true,
      "requires": {
        "bn.js": "^4.4.0",
        "brorand": "^1.0.1",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.0"
      }
    },
    "emojis-list": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-2.1.0.tgz",
      "integrity": "sha1-TapNnbAPmBmIDHn6RXrlsJof04k=",
      "dev": true
    },
    "encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k=",
      "dev": true
    },
    "encoding": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.12.tgz",
      "integrity": "sha1-U4tm8+5izRq1HsMjgp0flIDHS+s=",
      "dev": true,
      "requires": {
        "iconv-lite": "~0.4.13"
      }
    },
    "end-of-stream": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.1.tgz",
      "integrity": "sha512-1MkrZNvWTKCaigbn+W15elq2BB/L22nqrSY5DKlo3X6+vclJm8Bb5djXJBmEX6fS3+zCh/F4VBK5Z2KxJt4s2Q==",
      "dev": true,
      "requires": {
        "once": "^1.4.0"
      }
    },
    "engine.io": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/engine.io/-/engine.io-3.2.1.tgz",
      "integrity": "sha512-+VlKzHzMhaU+GsCIg4AoXF1UdDFjHHwMmMKqMJNDNLlUlejz58FCy4LBqB2YVJskHGYl06BatYWKP2TVdVXE5w==",
      "dev": true,
      "requires": {
        "accepts": "~1.3.4",
        "base64id": "1.0.0",
        "cookie": "0.3.1",
        "debug": "~3.1.0",
        "engine.io-parser": "~2.1.0",
        "ws": "~3.3.1"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "engine.io-client": {
      "version": "3.2.1",
      "resolved": "http://registry.npmjs.org/engine.io-client/-/engine.io-client-3.2.1.tgz",
      "integrity": "sha512-y5AbkytWeM4jQr7m/koQLc5AxpRKC1hEVUb/s1FUAWEJq5AzJJ4NLvzuKPuxtDi5Mq755WuDvZ6Iv2rXj4PTzw==",
      "dev": true,
      "requires": {
        "component-emitter": "1.2.1",
        "component-inherit": "0.0.3",
        "debug": "~3.1.0",
        "engine.io-parser": "~2.1.1",
        "has-cors": "1.1.0",
        "indexof": "0.0.1",
        "parseqs": "0.0.5",
        "parseuri": "0.0.5",
        "ws": "~3.3.1",
        "xmlhttprequest-ssl": "~1.5.4",
        "yeast": "0.1.2"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "engine.io-parser": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-2.1.3.tgz",
      "integrity": "sha512-6HXPre2O4Houl7c4g7Ic/XzPnHBvaEmN90vtRO9uLmwtRqQmTOw0QMevL1TOfL2Cpu1VzsaTmMotQgMdkzGkVA==",
      "dev": true,
      "requires": {
        "after": "0.8.2",
        "arraybuffer.slice": "~0.0.7",
        "base64-arraybuffer": "0.1.5",
        "blob": "0.0.5",
        "has-binary2": "~1.0.2"
      }
    },
    "enhanced-resolve": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.1.0.tgz",
      "integrity": "sha512-F/7vkyTtyc/llOIn8oWclcB25KdRaiPBpZYDgJHgh/UHtpgT2p2eldQgtQnLtUvfMKPKxbRaQM/hHkvLHt1Vng==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "memory-fs": "^0.4.0",
        "tapable": "^1.0.0"
      }
    },
    "ent": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/ent/-/ent-2.2.0.tgz",
      "integrity": "sha1-6WQhkyWiHQX0RGai9obtbOX13R0=",
      "dev": true
    },
    "err-code": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/err-code/-/err-code-1.1.2.tgz",
      "integrity": "sha1-BuARbTAo9q70gGhJ6w6mp0iuaWA=",
      "dev": true
    },
    "errno": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
      "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
      "dev": true,
      "requires": {
        "prr": "~1.0.1"
      }
    },
    "error-ex": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
      "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
      "dev": true,
      "requires": {
        "is-arrayish": "^0.2.1"
      }
    },
    "es6-promise": {
      "version": "4.2.5",
      "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.5.tgz",
      "integrity": "sha512-n6wvpdE43VFtJq+lUDYDBFUwV8TZbuGXLV4D6wKafg13ldznKsyEvatubnmUe31zcvelSzOHF+XbaT+Bl9ObDg==",
      "dev": true
    },
    "es6-promisify": {
      "version": "5.0.0",
      "resolved": "http://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
      "integrity": "sha1-UQnWLz5W6pZ8S2NQWu8IKRyKUgM=",
      "dev": true,
      "requires": {
        "es6-promise": "^4.0.3"
      }
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg=",
      "dev": true
    },
    "escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ=",
      "dev": true
    },
    "escodegen": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.8.1.tgz",
      "integrity": "sha1-WltTr0aTEQvrsIZ6o0MN07cKEBg=",
      "requires": {
        "esprima": "^2.7.1",
        "estraverse": "^1.9.1",
        "esutils": "^2.0.2",
        "optionator": "^0.8.1",
        "source-map": "~0.2.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.2.0",
          "resolved": "http://registry.npmjs.org/source-map/-/source-map-0.2.0.tgz",
          "integrity": "sha1-2rc/vPwrqBm03gO9b26qSBZLP50=",
          "optional": true,
          "requires": {
            "amdefine": ">=0.0.4"
          }
        }
      }
    },
    "eslint-scope": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.0.tgz",
      "integrity": "sha512-1G6UTDi7Jc1ELFwnR58HV4fK9OQK4S6N985f166xqXxpjU6plxFISJa2Ba9KCQuFa8RCnj/lSFJbHo7UFDBnUA==",
      "dev": true,
      "requires": {
        "esrecurse": "^4.1.0",
        "estraverse": "^4.1.1"
      },
      "dependencies": {
        "estraverse": {
          "version": "4.2.0",
          "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz",
          "integrity": "sha1-De4/7TH81GlhjOc0IJn8GvoL2xM=",
          "dev": true
        }
      }
    },
    "esprima": {
      "version": "2.7.3",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-2.7.3.tgz",
      "integrity": "sha1-luO3DVd59q1JzQMmc9HDEnZ7pYE="
    },
    "esrecurse": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.2.1.tgz",
      "integrity": "sha512-64RBB++fIOAXPw3P9cy89qfMlvZEXZkqqJkjqqXIvzP5ezRZjW+lPWjw35UX/3EhUPFYbg5ER4JYgDw4007/DQ==",
      "dev": true,
      "requires": {
        "estraverse": "^4.1.0"
      },
      "dependencies": {
        "estraverse": {
          "version": "4.2.0",
          "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz",
          "integrity": "sha1-De4/7TH81GlhjOc0IJn8GvoL2xM=",
          "dev": true
        }
      }
    },
    "estraverse": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-1.9.3.tgz",
      "integrity": "sha1-r2fy3JIlgkFZUJJgkaQAXSnJu0Q="
    },
    "estree-walker": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-0.5.2.tgz",
      "integrity": "sha512-XpCnW/AE10ws/kDAs37cngSkvgIR8aN3G0MS85m7dUpuK2EREo9VJ00uvw6Dg/hXEpfsE1I1TvJOJr+Z+TL+ig==",
      "dev": true
    },
    "esutils": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.2.tgz",
      "integrity": "sha1-Cr9PHKpbyx96nYrMbepPqqBLrJs="
    },
    "etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc=",
      "dev": true
    },
    "eventemitter3": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-3.1.0.tgz",
      "integrity": "sha512-ivIvhpq/Y0uSjcHDcOIccjmYjGLcP09MFGE7ysAwkAvkXfpZlC985pH2/ui64DKazbTW/4kN3yqozUxlXzI6cA==",
      "dev": true
    },
    "events": {
      "version": "1.1.1",
      "resolved": "http://registry.npmjs.org/events/-/events-1.1.1.tgz",
      "integrity": "sha1-nr23Y1rQmccNzEwqH1AEKI6L2SQ=",
      "dev": true
    },
    "eventsource": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-1.0.7.tgz",
      "integrity": "sha512-4Ln17+vVT0k8aWq+t/bF5arcS3EpT9gYtW66EPacdj/mAFevznsnyoHLPy2BA8gbIQeIHoPsvwmfBftfcG//BQ==",
      "dev": true,
      "requires": {
        "original": "^1.0.0"
      }
    },
    "evp_bytestokey": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
      "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
      "dev": true,
      "requires": {
        "md5.js": "^1.3.4",
        "safe-buffer": "^5.1.1"
      }
    },
    "execa": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/execa/-/execa-0.10.0.tgz",
      "integrity": "sha512-7XOMnz8Ynx1gGo/3hyV9loYNPWM94jG3+3T3Y8tsfSstFmETmENCMU/A/zj8Lyaj1lkgEepKepvd6240tBRvlw==",
      "dev": true,
      "requires": {
        "cross-spawn": "^6.0.0",
        "get-stream": "^3.0.0",
        "is-stream": "^1.1.0",
        "npm-run-path": "^2.0.0",
        "p-finally": "^1.0.0",
        "signal-exit": "^3.0.0",
        "strip-eof": "^1.0.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "dev": true,
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        }
      }
    },
    "exit": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/exit/-/exit-0.1.2.tgz",
      "integrity": "sha1-BjJjj42HfMghB9MKD/8aF8uhzQw=",
      "dev": true
    },
    "expand-braces": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/expand-braces/-/expand-braces-0.1.2.tgz",
      "integrity": "sha1-SIsdHSRRyz06axks/AMPRMWFX+o=",
      "dev": true,
      "requires": {
        "array-slice": "^0.2.3",
        "array-unique": "^0.2.1",
        "braces": "^0.1.2"
      },
      "dependencies": {
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "braces": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-0.1.5.tgz",
          "integrity": "sha1-wIVxEIUpHYt1/ddOqw+FlygHEeY=",
          "dev": true,
          "requires": {
            "expand-range": "^0.1.0"
          }
        },
        "expand-range": {
          "version": "0.1.1",
          "resolved": "http://registry.npmjs.org/expand-range/-/expand-range-0.1.1.tgz",
          "integrity": "sha1-TLjtoJk8pW+k9B/ELzy7TMrf8EQ=",
          "dev": true,
          "requires": {
            "is-number": "^0.1.1",
            "repeat-string": "^0.2.2"
          }
        },
        "is-number": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-0.1.1.tgz",
          "integrity": "sha1-aaevEWlj1HIG7JvZtIoUIW8eOAY=",
          "dev": true
        },
        "repeat-string": {
          "version": "0.2.2",
          "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-0.2.2.tgz",
          "integrity": "sha1-x6jTI2BoNiBZp+RlH8aITosftK4=",
          "dev": true
        }
      }
    },
    "expand-brackets": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
      "dev": true,
      "requires": {
        "debug": "^2.3.3",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "posix-character-classes": "^0.1.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "expand-range": {
      "version": "1.8.2",
      "resolved": "http://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz",
      "integrity": "sha1-opnv/TNf4nIeuujiV+x5ZE/IUzc=",
      "dev": true,
      "requires": {
        "fill-range": "^2.1.0"
      },
      "dependencies": {
        "fill-range": {
          "version": "2.2.4",
          "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-2.2.4.tgz",
          "integrity": "sha512-cnrcCbj01+j2gTG921VZPnHbjmdAf8oQV/iGeV2kZxGSyfYjjTyY79ErsK1WJWMpw6DaApEX72binqJE+/d+5Q==",
          "dev": true,
          "requires": {
            "is-number": "^2.1.0",
            "isobject": "^2.0.0",
            "randomatic": "^3.0.0",
            "repeat-element": "^1.1.2",
            "repeat-string": "^1.5.2"
          }
        },
        "is-number": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-2.1.0.tgz",
          "integrity": "sha1-Afy7s5NGOlSPL0ZszhbezknbkI8=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          }
        },
        "isobject": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
          "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
          "dev": true,
          "requires": {
            "isarray": "1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "express": {
      "version": "4.16.4",
      "resolved": "https://registry.npmjs.org/express/-/express-4.16.4.tgz",
      "integrity": "sha512-j12Uuyb4FMrd/qQAm6uCHAkPtO8FDTRJZBDd5D2KOL2eLaz1yUNdUB/NOIyq0iU4q4cFarsUCrnFDPBcnksuOg==",
      "dev": true,
      "requires": {
        "accepts": "~1.3.5",
        "array-flatten": "1.1.1",
        "body-parser": "1.18.3",
        "content-disposition": "0.5.2",
        "content-type": "~1.0.4",
        "cookie": "0.3.1",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "1.1.1",
        "fresh": "0.5.2",
        "merge-descriptors": "1.0.1",
        "methods": "~1.1.2",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.2",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "~2.0.4",
        "qs": "6.5.2",
        "range-parser": "~1.2.0",
        "safe-buffer": "5.1.2",
        "send": "0.16.2",
        "serve-static": "1.13.2",
        "setprototypeof": "1.1.0",
        "statuses": "~1.4.0",
        "type-is": "~1.6.16",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "dependencies": {
        "array-flatten": {
          "version": "1.1.1",
          "resolved": "http://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
          "integrity": "sha1-ml9pkFGx5wczKPKgCJaLZOopVdI=",
          "dev": true
        }
      }
    },
    "extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
    },
    "extend-shallow": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
      "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
      "dev": true,
      "requires": {
        "assign-symbols": "^1.0.0",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "dev": true,
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "external-editor": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-3.0.3.tgz",
      "integrity": "sha512-bn71H9+qWoOQKyZDo25mOMVpSmXROAsTJVVVYzrrtol3d4y+AsKjf4Iwl2Q+IuT0kFSQ1qo166UuIwqYq7mGnA==",
      "dev": true,
      "requires": {
        "chardet": "^0.7.0",
        "iconv-lite": "^0.4.24",
        "tmp": "^0.0.33"
      },
      "dependencies": {
        "iconv-lite": {
          "version": "0.4.24",
          "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
          "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
          "dev": true,
          "requires": {
            "safer-buffer": ">= 2.1.2 < 3"
          }
        }
      }
    },
    "extglob": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
      "dev": true,
      "requires": {
        "array-unique": "^0.3.2",
        "define-property": "^1.0.0",
        "expand-brackets": "^2.1.4",
        "extend-shallow": "^2.0.1",
        "fragment-cache": "^0.2.1",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "extsprintf": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
      "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
    },
    "fast-deep-equal": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-2.0.1.tgz",
      "integrity": "sha1-ewUhjd+WZ79/Nwv3/bLLFf3Qqkk="
    },
    "fast-json-stable-stringify": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.0.0.tgz",
      "integrity": "sha1-1RQsDK7msRifh9OnYREGT4bIu/I="
    },
    "fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc="
    },
    "fastparse": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/fastparse/-/fastparse-1.1.2.tgz",
      "integrity": "sha512-483XLLxTVIwWK3QTrMGRqUfUpoOs/0hbQrl2oz4J0pAcm3A3bu84wxTFqGqkJzewCLdME38xJLJAxBABfQT8sQ==",
      "dev": true
    },
    "faye-websocket": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.10.0.tgz",
      "integrity": "sha1-TkkvjQTftviQA1B/btvy1QHnxvQ=",
      "dev": true,
      "requires": {
        "websocket-driver": ">=0.5.1"
      }
    },
    "figgy-pudding": {
      "version": "3.5.1",
      "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.1.tgz",
      "integrity": "sha512-vNKxJHTEKNThjfrdJwHc7brvM6eVevuO5nTj6ez8ZQ1qbXTvGthucRF7S4vf2cr71QVnT70V34v0S1DyQsti0w==",
      "dev": true
    },
    "figures": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/figures/-/figures-2.0.0.tgz",
      "integrity": "sha1-OrGi0qYsi/tDGgyUy3l6L84nyWI=",
      "dev": true,
      "requires": {
        "escape-string-regexp": "^1.0.5"
      }
    },
    "file-loader": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/file-loader/-/file-loader-2.0.0.tgz",
      "integrity": "sha512-YCsBfd1ZGCyonOKLxPiKPdu+8ld9HAaMEvJewzz+b2eTF7uL5Zm/HdBF6FjCrpCMRq25Mi0U1gl4pwn2TlH7hQ==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.0.2",
        "schema-utils": "^1.0.0"
      }
    },
    "file-saver": {
      "version": "1.3.8",
      "resolved": "http://registry.npmjs.org/file-saver/-/file-saver-1.3.8.tgz",
      "integrity": "sha512-spKHSBQIxxS81N/O21WmuXA2F6wppUCsutpzenOeZzOCCJ5gEfcbqJP983IrpLXzYmXnMUa6J03SubcNPdKrlg=="
    },
    "filename-regex": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/filename-regex/-/filename-regex-2.0.1.tgz",
      "integrity": "sha1-wcS5vuPglyXdsQa3XB4wH+LxiyY=",
      "dev": true
    },
    "fileset": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/fileset/-/fileset-2.0.3.tgz",
      "integrity": "sha1-jnVIqW08wjJ+5eZ0FocjozO7oqA=",
      "dev": true,
      "requires": {
        "glob": "^7.0.3",
        "minimatch": "^3.0.3"
      }
    },
    "fill-range": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
      "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
      "dev": true,
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1",
        "to-regex-range": "^2.1.0"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "finalhandler": {
      "version": "1.1.1",
      "resolved": "http://registry.npmjs.org/finalhandler/-/finalhandler-1.1.1.tgz",
      "integrity": "sha512-Y1GUDo39ez4aHAw7MysnUD5JzYX+WaIj8I57kO3aEPT1fFRL4sr7mjei97FgnwhAyyzRYmQZaTHb2+9uZ1dPtg==",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.2",
        "statuses": "~1.4.0",
        "unpipe": "~1.0.0"
      }
    },
    "find-cache-dir": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-1.0.0.tgz",
      "integrity": "sha1-kojj6ePMN0hxfTnq3hfPcfww7m8=",
      "dev": true,
      "requires": {
        "commondir": "^1.0.1",
        "make-dir": "^1.0.0",
        "pkg-dir": "^2.0.0"
      }
    },
    "find-parent-dir": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/find-parent-dir/-/find-parent-dir-0.3.0.tgz",
      "integrity": "sha1-M8RLQpqysvBkYpnF+fcY83b/jVQ=",
      "dev": true
    },
    "find-up": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
      "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
      "dev": true,
      "requires": {
        "locate-path": "^2.0.0"
      }
    },
    "flatted": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-2.0.0.tgz",
      "integrity": "sha512-R+H8IZclI8AAkSBRQJLVOsxwAoHd6WC40b4QTNWIjzAa6BXOBfQcM587MXDTVPeYaopFNWHUFLx7eNmHDSxMWg==",
      "dev": true
    },
    "flush-write-stream": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.0.3.tgz",
      "integrity": "sha512-calZMC10u0FMUqoiunI2AiGIIUtUIvifNwkHhNupZH4cbNnW1Itkoh/Nf5HFYmDrwWPjrUxpkZT0KhuCq0jmGw==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.4"
      }
    },
    "follow-redirects": {
      "version": "1.5.10",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.5.10.tgz",
      "integrity": "sha512-0V5l4Cizzvqt5D44aTXbFZz+FtyXV1vrDN6qrelxtfYQKW0KO0W2T/hkE8xvGa/540LkZlkaUjO4ailYTFtHVQ==",
      "dev": true,
      "requires": {
        "debug": "=3.1.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "for-in": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
      "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA=",
      "dev": true
    },
    "for-own": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/for-own/-/for-own-1.0.0.tgz",
      "integrity": "sha1-xjMy9BXO3EsE2/5wz4NklMU8tEs=",
      "dev": true,
      "requires": {
        "for-in": "^1.0.1"
      }
    },
    "forever-agent": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
      "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
    },
    "form-data": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
      "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
      "requires": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.6",
        "mime-types": "^2.1.12"
      }
    },
    "forwarded": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.1.2.tgz",
      "integrity": "sha1-mMI9qxF1ZXuMBXPozszZGw/xjIQ=",
      "dev": true
    },
    "fragment-cache": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
      "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
      "dev": true,
      "requires": {
        "map-cache": "^0.2.2"
      }
    },
    "fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac=",
      "dev": true
    },
    "from2": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
      "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0"
      }
    },
    "fs-access": {
      "version": "1.0.1",
      "resolved": "http://registry.npmjs.org/fs-access/-/fs-access-1.0.1.tgz",
      "integrity": "sha1-1qh/JiJxzv6+wwxVNAf7mV2od3o=",
      "dev": true,
      "requires": {
        "null-check": "^1.0.0"
      }
    },
    "fs-extra": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
      "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "jsonfile": "^4.0.0",
        "universalify": "^0.1.0"
      }
    },
    "fs-minipass": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-1.2.5.tgz",
      "integrity": "sha512-JhBl0skXjUPCFH7x6x61gQxrKyXsxB5gcgePLZCwfyCGGsTISMoIeObbrvVeP6Xmyaudw4TT43qV2Gz+iyd2oQ==",
      "dev": true,
      "requires": {
        "minipass": "^2.2.1"
      }
    },
    "fs-write-stream-atomic": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
      "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "iferr": "^0.1.5",
        "imurmurhash": "^0.1.4",
        "readable-stream": "1 || 2"
      }
    },
    "fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8=",
      "dev": true
    },
    "fsevents": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.4.tgz",
      "integrity": "sha512-z8H8/diyk76B7q5wg+Ud0+CqzcAF3mBBI/bA5ne5zrRUUIvNkJY//D3BqyH571KuAC4Nr7Rw7CjWX4r0y9DvNg==",
      "dev": true,
      "optional": true,
      "requires": {
        "nan": "^2.9.2",
        "node-pre-gyp": "^0.10.0"
      },
      "dependencies": {
        "abbrev": {
          "version": "1.1.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "ansi-regex": {
          "version": "2.1.1",
          "bundled": true,
          "dev": true
        },
        "aproba": {
          "version": "1.2.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "are-we-there-yet": {
          "version": "1.1.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "balanced-match": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "brace-expansion": {
          "version": "1.1.11",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "balanced-match": "^1.0.0",
            "concat-map": "0.0.1"
          }
        },
        "chownr": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "code-point-at": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "concat-map": {
          "version": "0.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "console-control-strings": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "core-util-is": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "debug": {
          "version": "2.6.9",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "deep-extend": {
          "version": "0.5.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "delegates": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "detect-libc": {
          "version": "1.0.3",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "fs-minipass": {
          "version": "1.2.5",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "fs.realpath": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "gauge": {
          "version": "2.7.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "glob": {
          "version": "7.1.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "fs.realpath": "^1.0.0",
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "^3.0.4",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          }
        },
        "has-unicode": {
          "version": "2.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "iconv-lite": {
          "version": "0.4.21",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "safer-buffer": "^2.1.0"
          }
        },
        "ignore-walk": {
          "version": "3.0.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "minimatch": "^3.0.4"
          }
        },
        "inflight": {
          "version": "1.0.6",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "once": "^1.3.0",
            "wrappy": "1"
          }
        },
        "inherits": {
          "version": "2.0.3",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "ini": {
          "version": "1.3.5",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "isarray": {
          "version": "1.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "minimatch": {
          "version": "3.0.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "brace-expansion": "^1.1.7"
          }
        },
        "minimist": {
          "version": "0.0.8",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "minipass": {
          "version": "2.2.4",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "safe-buffer": "^5.1.1",
            "yallist": "^3.0.0"
          }
        },
        "minizlib": {
          "version": "1.1.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "minipass": "^2.2.1"
          }
        },
        "mkdirp": {
          "version": "0.5.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "minimist": "0.0.8"
          }
        },
        "ms": {
          "version": "2.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "needle": {
          "version": "2.2.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "debug": "^2.1.2",
            "iconv-lite": "^0.4.4",
            "sax": "^1.2.4"
          }
        },
        "node-pre-gyp": {
          "version": "0.10.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "detect-libc": "^1.0.2",
            "mkdirp": "^0.5.1",
            "needle": "^2.2.0",
            "nopt": "^4.0.1",
            "npm-packlist": "^1.1.6",
            "npmlog": "^4.0.2",
            "rc": "^1.1.7",
            "rimraf": "^2.6.1",
            "semver": "^5.3.0",
            "tar": "^4"
          }
        },
        "nopt": {
          "version": "4.0.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "abbrev": "1",
            "osenv": "^0.1.4"
          }
        },
        "npm-bundled": {
          "version": "1.0.3",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "npm-packlist": {
          "version": "1.1.10",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "ignore-walk": "^3.0.1",
            "npm-bundled": "^1.0.1"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "number-is-nan": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "object-assign": {
          "version": "4.1.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "once": {
          "version": "1.4.0",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "wrappy": "1"
          }
        },
        "os-homedir": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "os-tmpdir": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "osenv": {
          "version": "0.1.5",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "os-homedir": "^1.0.0",
            "os-tmpdir": "^1.0.0"
          }
        },
        "path-is-absolute": {
          "version": "1.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "process-nextick-args": {
          "version": "2.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "rc": {
          "version": "1.2.7",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "deep-extend": "^0.5.1",
            "ini": "~1.3.0",
            "minimist": "^1.2.0",
            "strip-json-comments": "~2.0.1"
          },
          "dependencies": {
            "minimist": {
              "version": "1.2.0",
              "bundled": true,
              "dev": true,
              "optional": true
            }
          }
        },
        "readable-stream": {
          "version": "2.3.6",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "rimraf": {
          "version": "2.6.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "glob": "^7.0.5"
          }
        },
        "safe-buffer": {
          "version": "5.1.1",
          "bundled": true,
          "dev": true
        },
        "safer-buffer": {
          "version": "2.1.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "sax": {
          "version": "1.2.4",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "semver": {
          "version": "5.5.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "set-blocking": {
          "version": "2.0.0",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "signal-exit": {
          "version": "3.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "string-width": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "bundled": true,
          "dev": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "strip-json-comments": {
          "version": "2.0.1",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "tar": {
          "version": "4.4.1",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "chownr": "^1.0.1",
            "fs-minipass": "^1.2.5",
            "minipass": "^2.2.4",
            "minizlib": "^1.1.0",
            "mkdirp": "^0.5.0",
            "safe-buffer": "^5.1.1",
            "yallist": "^3.0.2"
          }
        },
        "util-deprecate": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true,
          "optional": true
        },
        "wide-align": {
          "version": "1.1.2",
          "bundled": true,
          "dev": true,
          "optional": true,
          "requires": {
            "string-width": "^1.0.2"
          }
        },
        "wrappy": {
          "version": "1.0.2",
          "bundled": true,
          "dev": true
        },
        "yallist": {
          "version": "3.0.2",
          "bundled": true,
          "dev": true
        }
      }
    },
    "fstream": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/fstream/-/fstream-1.0.11.tgz",
      "integrity": "sha1-XB+x8RdHcRTwYyoOtLcbPLD9MXE=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "inherits": "~2.0.0",
        "mkdirp": ">=0.5 0",
        "rimraf": "2"
      }
    },
    "gauge": {
      "version": "2.7.4",
      "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
      "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
      "dev": true,
      "requires": {
        "aproba": "^1.0.3",
        "console-control-strings": "^1.0.0",
        "has-unicode": "^2.0.0",
        "object-assign": "^4.1.0",
        "signal-exit": "^3.0.0",
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1",
        "wide-align": "^1.1.0"
      }
    },
    "gaze": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/gaze/-/gaze-1.1.3.tgz",
      "integrity": "sha512-BRdNm8hbWzFzWHERTrejLqwHDfS4GibPoq5wjTPIoJHoBtKGPg3xAFfxmM+9ztbXelxcf2hwQcaz1PtmFeue8g==",
      "dev": true,
      "requires": {
        "globule": "^1.0.0"
      }
    },
    "genfun": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/genfun/-/genfun-5.0.0.tgz",
      "integrity": "sha512-KGDOARWVga7+rnB3z9Sd2Letx515owfk0hSxHGuqjANb1M+x2bGZGqHLiozPsYMdM2OubeMni/Hpwmjq6qIUhA==",
      "dev": true
    },
    "get-caller-file": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-1.0.3.tgz",
      "integrity": "sha512-3t6rVToeoZfYSGd8YoLFR2DJkiQrIiUrGcjvFX2mDw3bn6k2OtwHN0TNCLbBO+w8qTvimhDkv+LSscbJY1vE6w==",
      "dev": true
    },
    "get-stdin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/get-stdin/-/get-stdin-4.0.1.tgz",
      "integrity": "sha1-uWjGsKBDhDJJAui/Gl3zJXmkUP4=",
      "dev": true
    },
    "get-stream": {
      "version": "3.0.0",
      "resolved": "http://registry.npmjs.org/get-stream/-/get-stream-3.0.0.tgz",
      "integrity": "sha1-jpQ9E1jcN1VQVOy+LtsFqhdO3hQ=",
      "dev": true
    },
    "get-value": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg=",
      "dev": true
    },
    "getpass": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
      "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "glob": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",
      "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",
      "dev": true,
      "requires": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.0.4",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      }
    },
    "glob-base": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/glob-base/-/glob-base-0.3.0.tgz",
      "integrity": "sha1-27Fk9iIbHAscz4Kuoyi0l98Oo8Q=",
      "dev": true,
      "requires": {
        "glob-parent": "^2.0.0",
        "is-glob": "^2.0.0"
      },
      "dependencies": {
        "glob-parent": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
          "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
          "dev": true,
          "requires": {
            "is-glob": "^2.0.0"
          }
        },
        "is-extglob": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
          "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
          "dev": true
        },
        "is-glob": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
          "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        }
      }
    },
    "glob-parent": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
      "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
      "dev": true,
      "requires": {
        "is-glob": "^3.1.0",
        "path-dirname": "^1.0.0"
      },
      "dependencies": {
        "is-glob": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
          "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
          "dev": true,
          "requires": {
            "is-extglob": "^2.1.0"
          }
        }
      }
    },
    "global-dirs": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/global-dirs/-/global-dirs-0.1.1.tgz",
      "integrity": "sha1-sxnA3UYH81PzvpzKTHL8FIxJ9EU=",
      "dev": true,
      "requires": {
        "ini": "^1.3.4"
      }
    },
    "globals": {
      "version": "9.18.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-9.18.0.tgz",
      "integrity": "sha512-S0nG3CLEQiY/ILxqtztTWH/3iRRdyBLw6KMDxnKMchrtbj2OFmehVh0WUCfW3DUrIgx/qFrJPICrq4Z4sTR9UQ==",
      "dev": true
    },
    "globby": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/globby/-/globby-7.1.1.tgz",
      "integrity": "sha1-+yzP+UAfhgCUXfral0QMypcrhoA=",
      "dev": true,
      "requires": {
        "array-union": "^1.0.1",
        "dir-glob": "^2.0.0",
        "glob": "^7.1.2",
        "ignore": "^3.3.5",
        "pify": "^3.0.0",
        "slash": "^1.0.0"
      }
    },
    "globule": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/globule/-/globule-1.2.1.tgz",
      "integrity": "sha512-g7QtgWF4uYSL5/dn71WxubOrS7JVGCnFPEnoeChJmBnyR9Mw8nGoEwOgJL/RC2Te0WhbsEUCejfH8SZNJ+adYQ==",
      "dev": true,
      "requires": {
        "glob": "~7.1.1",
        "lodash": "~4.17.10",
        "minimatch": "~3.0.2"
      }
    },
    "got": {
      "version": "6.7.1",
      "resolved": "http://registry.npmjs.org/got/-/got-6.7.1.tgz",
      "integrity": "sha1-JAzQV4WpoY5WHcG0S0HHY+8ejbA=",
      "dev": true,
      "requires": {
        "create-error-class": "^3.0.0",
        "duplexer3": "^0.1.4",
        "get-stream": "^3.0.0",
        "is-redirect": "^1.0.0",
        "is-retry-allowed": "^1.0.0",
        "is-stream": "^1.0.0",
        "lowercase-keys": "^1.0.0",
        "safe-buffer": "^5.0.1",
        "timed-out": "^4.0.0",
        "unzip-response": "^2.0.1",
        "url-parse-lax": "^1.0.0"
      }
    },
    "graceful-fs": {
      "version": "4.1.15",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.1.15.tgz",
      "integrity": "sha512-6uHUhOPEBgQ24HM+r6b/QwWfZq+yiFcipKFrOFiBEnWdy5sdzYoi+pJeQaPI5qOLRFqWmAXUPQNsielzdLoecA==",
      "dev": true
    },
    "hammerjs": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/hammerjs/-/hammerjs-2.0.8.tgz",
      "integrity": "sha1-BO93hiz/K7edMPdpIJWTAiK/YPE="
    },
    "handle-thing": {
      "version": "1.2.5",
      "resolved": "http://registry.npmjs.org/handle-thing/-/handle-thing-1.2.5.tgz",
      "integrity": "sha1-/Xqtcmvxpf0W38KbL3pmAdJxOcQ=",
      "dev": true
    },
    "handlebars": {
      "version": "4.0.12",
      "resolved": "https://registry.npmjs.org/handlebars/-/handlebars-4.0.12.tgz",
      "integrity": "sha512-RhmTekP+FZL+XNhwS1Wf+bTTZpdLougwt5pcgA1tuz6Jcx0fpH/7z0qd71RKnZHBCxIRBHfBOnio4gViPemNzA==",
      "dev": true,
      "requires": {
        "async": "^2.5.0",
        "optimist": "^0.6.1",
        "source-map": "^0.6.1",
        "uglify-js": "^3.1.4"
      },
      "dependencies": {
        "async": {
          "version": "2.6.1",
          "resolved": "https://registry.npmjs.org/async/-/async-2.6.1.tgz",
          "integrity": "sha512-fNEiL2+AZt6AlAw/29Cr0UDe4sRAHCpEHh54WMz+Bb7QfNcFw4h3loofyJpLeQs4Yx7yuqu/2dLgM5hKOs6HlQ==",
          "dev": true,
          "requires": {
            "lodash": "^4.17.10"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "har-schema": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
      "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
    },
    "har-validator": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
      "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
      "requires": {
        "ajv": "^6.5.5",
        "har-schema": "^2.0.0"
      },
      "dependencies": {
        "ajv": {
          "version": "6.6.1",
          "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.6.1.tgz",
          "integrity": "sha512-ZoJjft5B+EJBjUyu9C9Hc0OZyPZSSlOF+plzouTrg6UlA8f+e/n8NIgBFG/9tppJtpPWfthHakK7juJdNDODww==",
          "requires": {
            "fast-deep-equal": "^2.0.1",
            "fast-json-stable-stringify": "^2.0.0",
            "json-schema-traverse": "^0.4.1",
            "uri-js": "^4.2.2"
          }
        }
      }
    },
    "has-ansi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
      "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
      "dev": true,
      "requires": {
        "ansi-regex": "^2.0.0"
      }
    },
    "has-binary2": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has-binary2/-/has-binary2-1.0.3.tgz",
      "integrity": "sha512-G1LWKhDSvhGeAQ8mPVQlqNcOB2sJdwATtZKl2pDKKHfpf/rYj24lkinxf69blJbnsvtqqNU+L3SL50vzZhXOnw==",
      "dev": true,
      "requires": {
        "isarray": "2.0.1"
      },
      "dependencies": {
        "isarray": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.1.tgz",
          "integrity": "sha1-o32U7ZzaLVmGXJ92/llu4fM4dB4=",
          "dev": true
        }
      }
    },
    "has-cors": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-cors/-/has-cors-1.1.0.tgz",
      "integrity": "sha1-XkdHk/fqmEPRu5nCPu9J/xJv/zk=",
      "dev": true
    },
    "has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0=",
      "dev": true
    },
    "has-unicode": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/has-unicode/-/has-unicode-2.0.1.tgz",
      "integrity": "sha1-4Ob+aijPUROIVeCG0Wkedx3iqLk=",
      "dev": true
    },
    "has-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
      "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
      "dev": true,
      "requires": {
        "get-value": "^2.0.6",
        "has-values": "^1.0.0",
        "isobject": "^3.0.0"
      }
    },
    "has-values": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
      "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
      "dev": true,
      "requires": {
        "is-number": "^3.0.0",
        "kind-of": "^4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "hash-base": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
      "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "hash.js": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
      "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.3",
        "minimalistic-assert": "^1.0.1"
      }
    },
    "hmac-drbg": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
      "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
      "dev": true,
      "requires": {
        "hash.js": "^1.0.3",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    },
    "hosted-git-info": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.7.1.tgz",
      "integrity": "sha512-7T/BxH19zbcCTa8XkMlbK5lTo1WtgkFi3GvdWEyNuc4Vex7/9Dqbnpsf4JMydcfj9HCg4zUWFTL3Za6lapg5/w==",
      "dev": true
    },
    "hpack.js": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
      "integrity": "sha1-h3dMCUnlE/QuhFdbPEVoH63ioLI=",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "obuf": "^1.0.0",
        "readable-stream": "^2.0.1",
        "wbuf": "^1.1.0"
      }
    },
    "html-entities": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/html-entities/-/html-entities-1.2.1.tgz",
      "integrity": "sha1-DfKTUfByEWNRXfueVUPl9u7VFi8=",
      "dev": true
    },
    "http-cache-semantics": {
      "version": "3.8.1",
      "resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-3.8.1.tgz",
      "integrity": "sha512-5ai2iksyV8ZXmnZhHH4rWPoxxistEexSi5936zIQ1bnNTW5VnA85B6P/VpXiRM017IgRvb2kKo1a//y+0wSp3w==",
      "dev": true
    },
    "http-deceiver": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
      "integrity": "sha1-+nFolEq5pRnTN8sL7HKE3D5yPYc=",
      "dev": true
    },
    "http-errors": {
      "version": "1.6.3",
      "resolved": "http://registry.npmjs.org/http-errors/-/http-errors-1.6.3.tgz",
      "integrity": "sha1-i1VoC7S+KDoLW/TqLjhYC+HZMg0=",
      "dev": true,
      "requires": {
        "depd": "~1.1.2",
        "inherits": "2.0.3",
        "setprototypeof": "1.1.0",
        "statuses": ">= 1.4.0 < 2"
      }
    },
    "http-parser-js": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.0.tgz",
      "integrity": "sha512-cZdEF7r4gfRIq7ezX9J0T+kQmJNOub71dWbgAXVHDct80TKP4MCETtZQ31xyv38UwgzkWPYF/Xc0ge55dW9Z9w==",
      "dev": true
    },
    "http-proxy": {
      "version": "1.17.0",
      "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.17.0.tgz",
      "integrity": "sha512-Taqn+3nNvYRfJ3bGvKfBSRwy1v6eePlm3oc/aWVxZp57DQr5Eq3xhKJi7Z4hZpS8PC3H4qI+Yly5EmFacGuA/g==",
      "dev": true,
      "requires": {
        "eventemitter3": "^3.0.0",
        "follow-redirects": "^1.0.0",
        "requires-port": "^1.0.0"
      }
    },
    "http-proxy-agent": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-2.1.0.tgz",
      "integrity": "sha512-qwHbBLV7WviBl0rQsOzH6o5lwyOIvwp/BdFnvVxXORldu5TmjFfjzBcWUWS5kWAZhmv+JtiDhSuQCp4sBfbIgg==",
      "dev": true,
      "requires": {
        "agent-base": "4",
        "debug": "3.1.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "http-proxy-middleware": {
      "version": "0.18.0",
      "resolved": "http://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-0.18.0.tgz",
      "integrity": "sha512-Fs25KVMPAIIcgjMZkVHJoKg9VcXcC1C8yb9JUgeDvVXY0S/zgVIhMb+qVswDIgtJe2DfckMSY2d6TuTEutlk6Q==",
      "dev": true,
      "requires": {
        "http-proxy": "^1.16.2",
        "is-glob": "^4.0.0",
        "lodash": "^4.17.5",
        "micromatch": "^3.1.9"
      }
    },
    "http-signature": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
      "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
      "requires": {
        "assert-plus": "^1.0.0",
        "jsprim": "^1.2.2",
        "sshpk": "^1.7.0"
      }
    },
    "https-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
      "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM=",
      "dev": true
    },
    "https-proxy-agent": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.1.tgz",
      "integrity": "sha512-HPCTS1LW51bcyMYbxUIOO4HEOlQ1/1qRaFWcyxvwaqUS9TY88aoEuHUY33kuAh1YhVVaDQhLZsnPd+XNARWZlQ==",
      "dev": true,
      "requires": {
        "agent-base": "^4.1.0",
        "debug": "^3.1.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        }
      }
    },
    "humanize-ms": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
      "integrity": "sha1-xG4xWaKT9riW2ikxbYtv6Lt5u+0=",
      "dev": true,
      "requires": {
        "ms": "^2.0.0"
      }
    },
    "iconv-lite": {
      "version": "0.4.23",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.23.tgz",
      "integrity": "sha512-neyTUVFtahjf0mB3dZT77u+8O0QB89jFdnBkd5P1JgYPbPaia3gXXOVL2fq8VyU2gMMD7SaN7QukTB/pmXYvDA==",
      "requires": {
        "safer-buffer": ">= 2.1.2 < 3"
      }
    },
    "ieee754": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.12.tgz",
      "integrity": "sha512-GguP+DRY+pJ3soyIiGPTvdiVXjZ+DbXOxGpXn3eMvNW4x4irjqXm4wHKscC+TfxSJ0yw/S1F24tqdMNsMZTiLA==",
      "dev": true
    },
    "iferr": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
      "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE=",
      "dev": true
    },
    "ignore": {
      "version": "3.3.10",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-3.3.10.tgz",
      "integrity": "sha512-Pgs951kaMm5GXP7MOvxERINe3gsaVjUWFm+UZPSq9xYriQAksyhg0csnS0KXSNRD5NmNdapXEpjxG49+AKh/ug==",
      "dev": true
    },
    "ignore-walk": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/ignore-walk/-/ignore-walk-3.0.1.tgz",
      "integrity": "sha512-DTVlMx3IYPe0/JJcYP7Gxg7ttZZu3IInhuEhbchuqneY9wWe5Ojy2mXLBaQFUQmo0AW2r3qG7m1mg86js+gnlQ==",
      "dev": true,
      "requires": {
        "minimatch": "^3.0.4"
      }
    },
    "image-size": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/image-size/-/image-size-0.5.5.tgz",
      "integrity": "sha1-Cd/Uq50g4p6xw+gLiZA3jfnjy5w=",
      "dev": true,
      "optional": true
    },
    "immediate": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/immediate/-/immediate-3.0.6.tgz",
      "integrity": "sha1-nbHb0Pr43m++D13V5Wu2BigN5ps=",
      "dev": true
    },
    "import-cwd": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-cwd/-/import-cwd-2.1.0.tgz",
      "integrity": "sha1-qmzzbnInYShcs3HsZRn1PiQ1sKk=",
      "dev": true,
      "requires": {
        "import-from": "^2.1.0"
      }
    },
    "import-from": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-from/-/import-from-2.1.0.tgz",
      "integrity": "sha1-M1238qev/VOqpHHUuAId7ja387E=",
      "dev": true,
      "requires": {
        "resolve-from": "^3.0.0"
      }
    },
    "import-lazy": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/import-lazy/-/import-lazy-2.1.0.tgz",
      "integrity": "sha1-BWmOPUXIjo1+nZLLBYTnfwlvPkM=",
      "dev": true
    },
    "import-local": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/import-local/-/import-local-2.0.0.tgz",
      "integrity": "sha512-b6s04m3O+s3CGSbqDIyP4R6aAwAeYlVq9+WUWep6iHa8ETRf9yei1U48C5MmfJmV9AiLYYBKPMq/W+/WRpQmCQ==",
      "dev": true,
      "requires": {
        "pkg-dir": "^3.0.0",
        "resolve-cwd": "^2.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.0.0.tgz",
          "integrity": "sha512-fl5s52lI5ahKCernzzIyAP0QAZbGIovtVHGwpcu1Jr/EpzLVDI2myISHwGqK7m8uQFugVWSrbxH7XnhGtvEc+A==",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.0.0.tgz",
          "integrity": "sha512-hMp0onDKIajHfIkdRk3P4CdCmErkYAxxDtP3Wx/4nZ3aGlau2VKh3mZpcuFkH27WQkL/3WBCPOktzA9ZOAnMQQ==",
          "dev": true
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "dev": true,
          "requires": {
            "find-up": "^3.0.0"
          }
        }
      }
    },
    "imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o=",
      "dev": true
    },
    "in-publish": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/in-publish/-/in-publish-2.0.0.tgz",
      "integrity": "sha1-4g/146KvwmkDILbcVSaCqcf631E=",
      "dev": true
    },
    "indent-string": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-2.1.0.tgz",
      "integrity": "sha1-ji1INIdCEhtKghi3oTfppSBJ3IA=",
      "dev": true,
      "requires": {
        "repeating": "^2.0.0"
      }
    },
    "indexof": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/indexof/-/indexof-0.0.1.tgz",
      "integrity": "sha1-gtwzbSMrkGIXnQWrMpOmYFn9Q10=",
      "dev": true
    },
    "inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
      "dev": true,
      "requires": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "inherits": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
      "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4=",
      "dev": true
    },
    "ini": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.5.tgz",
      "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw==",
      "dev": true
    },
    "injection-js": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/injection-js/-/injection-js-2.2.1.tgz",
      "integrity": "sha512-zHI+E+dM0PXix5FFTO1Y4/UOyAzE7zG1l/QwAn4jchTThOoBq+UYRFK4AVG7lQgFL+go62SbrzSsjXy9DFEZUg==",
      "dev": true
    },
    "inquirer": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-6.2.0.tgz",
      "integrity": "sha512-QIEQG4YyQ2UYZGDC4srMZ7BjHOmNk1lR2JQj5UknBapklm6WHA+VVH7N+sUdX3A7NeCfGF8o4X1S3Ao7nAcIeg==",
      "dev": true,
      "requires": {
        "ansi-escapes": "^3.0.0",
        "chalk": "^2.0.0",
        "cli-cursor": "^2.1.0",
        "cli-width": "^2.0.0",
        "external-editor": "^3.0.0",
        "figures": "^2.0.0",
        "lodash": "^4.17.10",
        "mute-stream": "0.0.7",
        "run-async": "^2.2.0",
        "rxjs": "^6.1.0",
        "string-width": "^2.1.0",
        "strip-ansi": "^4.0.0",
        "through": "^2.3.6"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        }
      }
    },
    "internal-ip": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/internal-ip/-/internal-ip-3.0.1.tgz",
      "integrity": "sha512-NXXgESC2nNVtU+pqmC9e6R8B1GpKxzsAQhffvh5AL79qKnodd+L7tnEQmTiUAVngqLalPbSqRA7XGIEL5nCd0Q==",
      "dev": true,
      "requires": {
        "default-gateway": "^2.6.0",
        "ipaddr.js": "^1.5.2"
      }
    },
    "interpret": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/interpret/-/interpret-1.1.0.tgz",
      "integrity": "sha1-ftGxQQxqDg94z5XTuEQMY/eLhhQ=",
      "dev": true
    },
    "invariant": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
      "dev": true,
      "requires": {
        "loose-envify": "^1.0.0"
      }
    },
    "invert-kv": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-1.0.0.tgz",
      "integrity": "sha1-EEqOSqym09jNFXqO+L+rLXo//bY=",
      "dev": true
    },
    "ip": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/ip/-/ip-1.1.5.tgz",
      "integrity": "sha1-vd7XARQpCCjAoDnnLvJfWq7ENUo=",
      "dev": true
    },
    "ip-regex": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
      "integrity": "sha1-+ni/XS5pE8kRzp+BnuUUa7bYROk=",
      "dev": true
    },
    "ipaddr.js": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.8.0.tgz",
      "integrity": "sha1-6qM9bd16zo9/b+DJygRA5wZzix4=",
      "dev": true
    },
    "is-accessor-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
      "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0=",
      "dev": true
    },
    "is-binary-path": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
      "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
      "dev": true,
      "requires": {
        "binary-extensions": "^1.0.0"
      }
    },
    "is-buffer": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
      "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w==",
      "dev": true
    },
    "is-builtin-module": {
      "version": "1.0.0",
      "resolved": "http://registry.npmjs.org/is-builtin-module/-/is-builtin-module-1.0.0.tgz",
      "integrity": "sha1-VAVy0096wxGfj3bDDLwbHgN6/74=",
      "dev": true,
      "requires": {
        "builtin-modules": "^1.0.0"
      }
    },
    "is-ci": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-ci/-/is-ci-1.2.1.tgz",
      "integrity": "sha512-s6tfsaQaQi3JNciBH6shVqEDvhGut0SUXr31ag8Pd8BBbVVlcGfWhpPmEOoM6RJ5TFhbypvf5yyRw/VXW1IiWg==",
      "dev": true,
      "requires": {
        "ci-info": "^1.5.0"
      }
    },
    "is-data-descriptor": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
      "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-descriptor": {
      "version": "0.1.6",
      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
      "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
      "dev": true,
      "requires": {
        "is-accessor-descriptor": "^0.1.6",
        "is-data-descriptor": "^0.1.4",
        "kind-of": "^5.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "is-directory": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/is-directory/-/is-directory-0.3.1.tgz",
      "integrity": "sha1-YTObbyR1/Hcv2cnYP1yFddwVSuE=",
      "dev": true
    },
    "is-dotfile": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/is-dotfile/-/is-dotfile-1.0.3.tgz",
      "integrity": "sha1-pqLzL/0t+wT1yiXs0Pa4PPeYoeE=",
      "dev": true
    },
    "is-equal-shallow": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz",
      "integrity": "sha1-IjgJj8Ih3gvPpdnqxMRdY4qhxTQ=",
      "dev": true,
      "requires": {
        "is-primitive": "^2.0.0"
      }
    },
    "is-extendable": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
      "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
      "dev": true
    },
    "is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
      "dev": true
    },
    "is-finite": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-finite/-/is-finite-1.0.2.tgz",
      "integrity": "sha1-zGZ3aVYCvlUO8R6LSqYwU0K20Ko=",
      "dev": true,
      "requires": {
        "number-is-nan": "^1.0.0"
      }
    },
    "is-fullwidth-code-point": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
      "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
      "dev": true,
      "requires": {
        "number-is-nan": "^1.0.0"
      }
    },
    "is-glob": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.0.tgz",
      "integrity": "sha1-lSHHaEXMJhCoUgPd8ICpWML/q8A=",
      "dev": true,
      "requires": {
        "is-extglob": "^2.1.1"
      }
    },
    "is-installed-globally": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/is-installed-globally/-/is-installed-globally-0.1.0.tgz",
      "integrity": "sha1-Df2Y9akRFxbdU13aZJL2e/PSWoA=",
      "dev": true,
      "requires": {
        "global-dirs": "^0.1.0",
        "is-path-inside": "^1.0.0"
      }
    },
    "is-module": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-module/-/is-module-1.0.0.tgz",
      "integrity": "sha1-Mlj7afeMFNW4FdZkM2tM/7ZEFZE=",
      "dev": true
    },
    "is-npm": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-npm/-/is-npm-1.0.0.tgz",
      "integrity": "sha1-8vtjpl5JBbQGyGBydloaTceTufQ=",
      "dev": true
    },
    "is-number": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
      "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-obj": {
      "version": "1.0.1",
      "resolved": "http://registry.npmjs.org/is-obj/-/is-obj-1.0.1.tgz",
      "integrity": "sha1-PkcprB9f3gJc19g6iW2rn09n2w8=",
      "dev": true
    },
    "is-path-cwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-1.0.0.tgz",
      "integrity": "sha1-0iXsIxMuie3Tj9p2dHLmLmXxEG0=",
      "dev": true
    },
    "is-path-in-cwd": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-1.0.1.tgz",
      "integrity": "sha512-FjV1RTW48E7CWM7eE/J2NJvAEEVektecDBVBE5Hh3nM1Jd0kvhHtX68Pr3xsDf857xt3Y4AkwVULK1Vku62aaQ==",
      "dev": true,
      "requires": {
        "is-path-inside": "^1.0.0"
      }
    },
    "is-path-inside": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-1.0.1.tgz",
      "integrity": "sha1-jvW33lBDej/cprToZe96pVy0gDY=",
      "dev": true,
      "requires": {
        "path-is-inside": "^1.0.1"
      }
    },
    "is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "dev": true,
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "is-posix-bracket": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz",
      "integrity": "sha1-MzTceXdDaOkvAW5vvAqI9c1ua8Q=",
      "dev": true
    },
    "is-primitive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-primitive/-/is-primitive-2.0.0.tgz",
      "integrity": "sha1-IHurkWOEmcB7Kt8kCkGochADRXU=",
      "dev": true
    },
    "is-promise": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-2.1.0.tgz",
      "integrity": "sha1-eaKp7OfwlugPNtKy87wWwf9L8/o=",
      "dev": true
    },
    "is-redirect": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-redirect/-/is-redirect-1.0.0.tgz",
      "integrity": "sha1-HQPd7VO9jbDzDCbk+V02/HyH3CQ=",
      "dev": true
    },
    "is-retry-allowed": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-retry-allowed/-/is-retry-allowed-1.1.0.tgz",
      "integrity": "sha1-EaBgVotnM5REAz0BJaYaINVk+zQ=",
      "dev": true
    },
    "is-stream": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-1.1.0.tgz",
      "integrity": "sha1-EtSj3U5o4Lec6428hBc66A2RykQ=",
      "dev": true
    },
    "is-typedarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
      "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
    },
    "is-utf8": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-utf8/-/is-utf8-0.2.1.tgz",
      "integrity": "sha1-Sw2hRCEE0bM2NA6AeX6GXPOffXI=",
      "dev": true
    },
    "is-windows": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
      "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA==",
      "dev": true
    },
    "is-wsl": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
      "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0=",
      "dev": true
    },
    "isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE=",
      "dev": true
    },
    "isbinaryfile": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/isbinaryfile/-/isbinaryfile-3.0.3.tgz",
      "integrity": "sha512-8cJBL5tTd2OS0dM4jz07wQd5g0dCCqIhUxPIGtZfa5L6hWlvV5MHTITy/DBAsF+Oe2LS1X3krBUhNwaGUWpWxw==",
      "dev": true,
      "requires": {
        "buffer-alloc": "^1.2.0"
      }
    },
    "isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA=",
      "dev": true
    },
    "isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
      "dev": true
    },
    "isstream": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
      "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
    },
    "istanbul": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/istanbul/-/istanbul-0.4.5.tgz",
      "integrity": "sha1-ZcfXPUxNqE1POsMQuRj7C4Azczs=",
      "dev": true,
      "requires": {
        "abbrev": "1.0.x",
        "async": "1.x",
        "escodegen": "1.8.x",
        "esprima": "2.7.x",
        "glob": "^5.0.15",
        "handlebars": "^4.0.1",
        "js-yaml": "3.x",
        "mkdirp": "0.5.x",
        "nopt": "3.x",
        "once": "1.x",
        "resolve": "1.1.x",
        "supports-color": "^3.1.0",
        "which": "^1.1.1",
        "wordwrap": "^1.0.0"
      },
      "dependencies": {
        "glob": {
          "version": "5.0.15",
          "resolved": "https://registry.npmjs.org/glob/-/glob-5.0.15.tgz",
          "integrity": "sha1-G8k2ueAvSmA/zCIuz3Yz0wuLk7E=",
          "dev": true,
          "requires": {
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "2 || 3",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          }
        },
        "has-flag": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-1.0.0.tgz",
          "integrity": "sha1-nZ55MWXOAXoA8AQYxD+UKnsdEfo=",
          "dev": true
        },
        "supports-color": {
          "version": "3.2.3",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-3.2.3.tgz",
          "integrity": "sha1-ZawFBLOVQXHYpklGsq48u4pfVPY=",
          "dev": true,
          "requires": {
            "has-flag": "^1.0.0"
          }
        }
      }
    },
    "istanbul-api": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/istanbul-api/-/istanbul-api-2.0.6.tgz",
      "integrity": "sha512-8W5oeAGWXhtTJjAyVfvavOLVyZCTNCKsyF6GON/INKlBdO7uJ/bv3qnPj5M6ERKzmMCJS1kntnjjGuJ86fn3rQ==",
      "dev": true,
      "requires": {
        "async": "^2.6.1",
        "compare-versions": "^3.2.1",
        "fileset": "^2.0.3",
        "istanbul-lib-coverage": "^2.0.1",
        "istanbul-lib-hook": "^2.0.1",
        "istanbul-lib-instrument": "^3.0.0",
        "istanbul-lib-report": "^2.0.2",
        "istanbul-lib-source-maps": "^2.0.1",
        "istanbul-reports": "^2.0.1",
        "js-yaml": "^3.12.0",
        "make-dir": "^1.3.0",
        "once": "^1.4.0"
      },
      "dependencies": {
        "async": {
          "version": "2.6.1",
          "resolved": "https://registry.npmjs.org/async/-/async-2.6.1.tgz",
          "integrity": "sha512-fNEiL2+AZt6AlAw/29Cr0UDe4sRAHCpEHh54WMz+Bb7QfNcFw4h3loofyJpLeQs4Yx7yuqu/2dLgM5hKOs6HlQ==",
          "dev": true,
          "requires": {
            "lodash": "^4.17.10"
          }
        },
        "istanbul-lib-coverage": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz",
          "integrity": "sha512-nPvSZsVlbG9aLhZYaC3Oi1gT/tpyo3Yt5fNyf6NmcKIayz4VV/txxJFFKAK/gU4dcNn8ehsanBbVHVl0+amOLA==",
          "dev": true
        },
        "istanbul-lib-instrument": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-3.0.0.tgz",
          "integrity": "sha512-eQY9vN9elYjdgN9Iv6NS/00bptm02EBBk70lRMaVjeA6QYocQgenVrSgC28TJurdnZa80AGO3ASdFN+w/njGiQ==",
          "dev": true,
          "requires": {
            "@babel/generator": "^7.0.0",
            "@babel/parser": "^7.0.0",
            "@babel/template": "^7.0.0",
            "@babel/traverse": "^7.0.0",
            "@babel/types": "^7.0.0",
            "istanbul-lib-coverage": "^2.0.1",
            "semver": "^5.5.0"
          }
        }
      }
    },
    "istanbul-instrumenter-loader": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-instrumenter-loader/-/istanbul-instrumenter-loader-3.0.1.tgz",
      "integrity": "sha512-a5SPObZgS0jB/ixaKSMdn6n/gXSrK2S6q/UfRJBT3e6gQmVjwZROTODQsYW5ZNwOu78hG62Y3fWlebaVOL0C+w==",
      "dev": true,
      "requires": {
        "convert-source-map": "^1.5.0",
        "istanbul-lib-instrument": "^1.7.3",
        "loader-utils": "^1.1.0",
        "schema-utils": "^0.3.0"
      },
      "dependencies": {
        "ajv": {
          "version": "5.5.2",
          "resolved": "https://registry.npmjs.org/ajv/-/ajv-5.5.2.tgz",
          "integrity": "sha1-c7Xuyj+rZT49P5Qis0GtQiBdyWU=",
          "dev": true,
          "requires": {
            "co": "^4.6.0",
            "fast-deep-equal": "^1.0.0",
            "fast-json-stable-stringify": "^2.0.0",
            "json-schema-traverse": "^0.3.0"
          }
        },
        "fast-deep-equal": {
          "version": "1.1.0",
          "resolved": "http://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-1.1.0.tgz",
          "integrity": "sha1-wFNHeBfIa1HaqFPIHgWbcz0CNhQ=",
          "dev": true
        },
        "json-schema-traverse": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.3.1.tgz",
          "integrity": "sha1-NJptRMU6Ud6JtAgFxdXlm0F9M0A=",
          "dev": true
        },
        "schema-utils": {
          "version": "0.3.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.3.0.tgz",
          "integrity": "sha1-9YdyIs4+kx7a4DnxfrNxbnE3+M8=",
          "dev": true,
          "requires": {
            "ajv": "^5.0.0"
          }
        }
      }
    },
    "istanbul-lib-coverage": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-1.2.1.tgz",
      "integrity": "sha512-PzITeunAgyGbtY1ibVIUiV679EFChHjoMNRibEIobvmrCRaIgwLxNucOSimtNWUhEib/oO7QY2imD75JVgCJWQ==",
      "dev": true
    },
    "istanbul-lib-hook": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-hook/-/istanbul-lib-hook-2.0.1.tgz",
      "integrity": "sha512-ufiZoiJ8CxY577JJWEeFuxXZoMqiKpq/RqZtOAYuQLvlkbJWscq9n3gc4xrCGH9n4pW0qnTxOz1oyMmVtk8E1w==",
      "dev": true,
      "requires": {
        "append-transform": "^1.0.0"
      }
    },
    "istanbul-lib-instrument": {
      "version": "1.10.2",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-1.10.2.tgz",
      "integrity": "sha512-aWHxfxDqvh/ZlxR8BBaEPVSWDPUkGD63VjGQn3jcw8jCp7sHEMKcrj4xfJn/ABzdMEHiQNyvDQhqm5o8+SQg7A==",
      "dev": true,
      "requires": {
        "babel-generator": "^6.18.0",
        "babel-template": "^6.16.0",
        "babel-traverse": "^6.18.0",
        "babel-types": "^6.18.0",
        "babylon": "^6.18.0",
        "istanbul-lib-coverage": "^1.2.1",
        "semver": "^5.3.0"
      }
    },
    "istanbul-lib-report": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-2.0.2.tgz",
      "integrity": "sha512-rJ8uR3peeIrwAxoDEbK4dJ7cqqtxBisZKCuwkMtMv0xYzaAnsAi3AHrHPAAtNXzG/bcCgZZ3OJVqm1DTi9ap2Q==",
      "dev": true,
      "requires": {
        "istanbul-lib-coverage": "^2.0.1",
        "make-dir": "^1.3.0",
        "supports-color": "^5.4.0"
      },
      "dependencies": {
        "istanbul-lib-coverage": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz",
          "integrity": "sha512-nPvSZsVlbG9aLhZYaC3Oi1gT/tpyo3Yt5fNyf6NmcKIayz4VV/txxJFFKAK/gU4dcNn8ehsanBbVHVl0+amOLA==",
          "dev": true
        }
      }
    },
    "istanbul-lib-source-maps": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-2.0.1.tgz",
      "integrity": "sha512-30l40ySg+gvBLcxTrLzR4Z2XTRj3HgRCA/p2rnbs/3OiTaoj054gAbuP5DcLOtwqmy4XW8qXBHzrmP2/bQ9i3A==",
      "dev": true,
      "requires": {
        "debug": "^3.1.0",
        "istanbul-lib-coverage": "^2.0.1",
        "make-dir": "^1.3.0",
        "rimraf": "^2.6.2",
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "istanbul-lib-coverage": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz",
          "integrity": "sha512-nPvSZsVlbG9aLhZYaC3Oi1gT/tpyo3Yt5fNyf6NmcKIayz4VV/txxJFFKAK/gU4dcNn8ehsanBbVHVl0+amOLA==",
          "dev": true
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "istanbul-reports": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-2.0.1.tgz",
      "integrity": "sha512-CT0QgMBJqs6NJLF678ZHcquUAZIoBIUNzdJrRJfpkI9OnzG6MkUfHxbJC3ln981dMswC7/B1mfX3LNkhgJxsuw==",
      "dev": true,
      "requires": {
        "handlebars": "^4.0.11"
      }
    },
    "jasmine": {
      "version": "2.8.0",
      "resolved": "https://registry.npmjs.org/jasmine/-/jasmine-2.8.0.tgz",
      "integrity": "sha1-awicChFXax8W3xG4AUbZHU6Lij4=",
      "dev": true,
      "requires": {
        "exit": "^0.1.2",
        "glob": "^7.0.6",
        "jasmine-core": "~2.8.0"
      },
      "dependencies": {
        "jasmine-core": {
          "version": "2.8.0",
          "resolved": "https://registry.npmjs.org/jasmine-core/-/jasmine-core-2.8.0.tgz",
          "integrity": "sha1-vMl5rh+f0FcB5F5S5l06XWPxok4=",
          "dev": true
        }
      }
    },
    "jasmine-core": {
      "version": "2.99.1",
      "resolved": "http://registry.npmjs.org/jasmine-core/-/jasmine-core-2.99.1.tgz",
      "integrity": "sha1-5kAN8ea1bhMLYcS80JPap/boyhU=",
      "dev": true
    },
    "jasmine-spec-reporter": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/jasmine-spec-reporter/-/jasmine-spec-reporter-4.2.1.tgz",
      "integrity": "sha512-FZBoZu7VE5nR7Nilzy+Np8KuVIOxF4oXDPDknehCYBDE080EnlPu0afdZNmpGDBRCUBv3mj5qgqCRmk6W/K8vg==",
      "dev": true,
      "requires": {
        "colors": "1.1.2"
      }
    },
    "jasminewd2": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/jasminewd2/-/jasminewd2-2.2.0.tgz",
      "integrity": "sha1-43zwsX8ZnM4jvqcbIDk5Uka07E4=",
      "dev": true
    },
    "js-base64": {
      "version": "2.4.9",
      "resolved": "https://registry.npmjs.org/js-base64/-/js-base64-2.4.9.tgz",
      "integrity": "sha512-xcinL3AuDJk7VSzsHgb9DvvIXayBbadtMZ4HFPx8rUszbW1MuNMlwYVC4zzCZ6e1sqZpnNS5ZFYOhXqA39T7LQ==",
      "dev": true
    },
    "js-tokens": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-3.0.2.tgz",
      "integrity": "sha1-mGbfOVECEw449/mWvOtlRDIJwls=",
      "dev": true
    },
    "js-yaml": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.12.0.tgz",
      "integrity": "sha512-PIt2cnwmPfL4hKNwqeiuz4bKfnzHTBv6HyVgjahA6mPLwPDzjDWrplJBMjHUFxku/N3FlmrbyPclad+I+4mJ3A==",
      "dev": true,
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      },
      "dependencies": {
        "esprima": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
          "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
          "dev": true
        }
      }
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
    },
    "jsdom": {
      "version": "8.5.0",
      "resolved": "http://registry.npmjs.org/jsdom/-/jsdom-8.5.0.tgz",
      "integrity": "sha1-1Nj12/J2hjW2KmKCO5R89wcevJg=",
      "requires": {
        "abab": "^1.0.0",
        "acorn": "^2.4.0",
        "acorn-globals": "^1.0.4",
        "array-equal": "^1.0.0",
        "cssom": ">= 0.3.0 < 0.4.0",
        "cssstyle": ">= 0.2.34 < 0.3.0",
        "escodegen": "^1.6.1",
        "iconv-lite": "^0.4.13",
        "nwmatcher": ">= 1.3.7 < 2.0.0",
        "parse5": "^1.5.1",
        "request": "^2.55.0",
        "sax": "^1.1.4",
        "symbol-tree": ">= 3.1.0 < 4.0.0",
        "tough-cookie": "^2.2.0",
        "webidl-conversions": "^3.0.1",
        "whatwg-url": "^2.0.1",
        "xml-name-validator": ">= 2.0.1 < 3.0.0"
      },
      "dependencies": {
        "acorn": {
          "version": "2.7.0",
          "resolved": "http://registry.npmjs.org/acorn/-/acorn-2.7.0.tgz",
          "integrity": "sha1-q259nYhqrKiwhbwzEreaGYQz8Oc="
        },
        "parse5": {
          "version": "1.5.1",
          "resolved": "https://registry.npmjs.org/parse5/-/parse5-1.5.1.tgz",
          "integrity": "sha1-m387DeMr543CQBsXVzzK8Pb1nZQ="
        },
        "sax": {
          "version": "1.2.4",
          "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
          "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
        }
      }
    },
    "jsesc": {
      "version": "1.3.0",
      "resolved": "http://registry.npmjs.org/jsesc/-/jsesc-1.3.0.tgz",
      "integrity": "sha1-RsP+yMGJKxKwgz25vHYiF226s0s=",
      "dev": true
    },
    "json-parse-better-errors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
      "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw==",
      "dev": true
    },
    "json-schema": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
      "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
    },
    "json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
    },
    "json3": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/json3/-/json3-3.3.2.tgz",
      "integrity": "sha1-PAQ0dD35Pi9cQq7nsZvLSDV19OE=",
      "dev": true
    },
    "json5": {
      "version": "0.5.1",
      "resolved": "http://registry.npmjs.org/json5/-/json5-0.5.1.tgz",
      "integrity": "sha1-Hq3nrMASA0rYTiOWdn6tn6VJWCE=",
      "dev": true
    },
    "jsonfile": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
      "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.6"
      }
    },
    "jsonparse": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
      "integrity": "sha1-P02uSpH6wxX3EGL4UhzCOfE2YoA=",
      "dev": true
    },
    "jspdf": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jspdf/-/jspdf-1.4.1.tgz",
      "integrity": "sha512-2vYVdrvrQUdKKPyWHw81t1jEYYAJ6uFJ/HtTcGbI4qXIQEdl18dLEuL2wTeSv2GzeQLSgUvEvwsXsszuHK+PTw==",
      "requires": {
        "canvg": "^1.0",
        "cf-blob.js": "0.0.1",
        "file-saver": "1.3.8",
        "omggif": "1.0.7",
        "stackblur": "^1.0.0"
      }
    },
    "jsprim": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
      "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.2.3",
        "verror": "1.10.0"
      }
    },
    "jszip": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/jszip/-/jszip-3.1.5.tgz",
      "integrity": "sha512-5W8NUaFRFRqTOL7ZDDrx5qWHJyBXy6velVudIzQUSoqAAYqzSh2Z7/m0Rf1QbmQJccegD0r+YZxBjzqoBiEeJQ==",
      "dev": true,
      "requires": {
        "core-js": "~2.3.0",
        "es6-promise": "~3.0.2",
        "lie": "~3.1.0",
        "pako": "~1.0.2",
        "readable-stream": "~2.0.6"
      },
      "dependencies": {
        "core-js": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/core-js/-/core-js-2.3.0.tgz",
          "integrity": "sha1-+rg/uwstjchfpjbEudNMdUIMbWU=",
          "dev": true
        },
        "es6-promise": {
          "version": "3.0.2",
          "resolved": "http://registry.npmjs.org/es6-promise/-/es6-promise-3.0.2.tgz",
          "integrity": "sha1-AQ1YWEI6XxGJeWZfRkhqlcbuK7Y=",
          "dev": true
        },
        "process-nextick-args": {
          "version": "1.0.7",
          "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-1.0.7.tgz",
          "integrity": "sha1-FQ4gt1ZZCtP5EJPyWk8q2L/zC6M=",
          "dev": true
        },
        "readable-stream": {
          "version": "2.0.6",
          "resolved": "http://registry.npmjs.org/readable-stream/-/readable-stream-2.0.6.tgz",
          "integrity": "sha1-j5A0HmilPMySh4jaz80Rs265t44=",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.1",
            "isarray": "~1.0.0",
            "process-nextick-args": "~1.0.6",
            "string_decoder": "~0.10.x",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "0.10.31",
          "resolved": "http://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz",
          "integrity": "sha1-YuIDvEF2bGwoyfyEMB2rHFMQ+pQ=",
          "dev": true
        }
      }
    },
    "karma": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/karma/-/karma-3.1.3.tgz",
      "integrity": "sha512-JU4FYUtFEGsLZd6ZJzLrivcPj0TkteBiIRDcXWFsltPMGgZMDtby/MIzNOzgyZv/9dahs9vHpSxerC/ZfeX9Qw==",
      "dev": true,
      "requires": {
        "bluebird": "^3.3.0",
        "body-parser": "^1.16.1",
        "chokidar": "^2.0.3",
        "colors": "^1.1.0",
        "combine-lists": "^1.0.0",
        "connect": "^3.6.0",
        "core-js": "^2.2.0",
        "di": "^0.0.1",
        "dom-serialize": "^2.2.0",
        "expand-braces": "^0.1.1",
        "flatted": "^2.0.0",
        "glob": "^7.1.1",
        "graceful-fs": "^4.1.2",
        "http-proxy": "^1.13.0",
        "isbinaryfile": "^3.0.0",
        "lodash": "^4.17.5",
        "log4js": "^3.0.0",
        "mime": "^2.3.1",
        "minimatch": "^3.0.2",
        "optimist": "^0.6.1",
        "qjobs": "^1.1.4",
        "range-parser": "^1.2.0",
        "rimraf": "^2.6.0",
        "safe-buffer": "^5.0.1",
        "socket.io": "2.1.1",
        "source-map": "^0.6.1",
        "tmp": "0.0.33",
        "useragent": "2.3.0"
      },
      "dependencies": {
        "mime": {
          "version": "2.4.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.0.tgz",
          "integrity": "sha512-ikBcWwyqXQSHKtciCcctu9YfPbFYZ4+gbHEmE0Q8jzcTYQg5dHCr3g2wwAZjPoJfQVXZq6KXAjpXOTf5/cjT7w==",
          "dev": true
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "karma-chrome-launcher": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/karma-chrome-launcher/-/karma-chrome-launcher-2.2.0.tgz",
      "integrity": "sha512-uf/ZVpAabDBPvdPdveyk1EPgbnloPvFFGgmRhYLTDH7gEB4nZdSBk8yTU47w1g/drLSx5uMOkjKk7IWKfWg/+w==",
      "dev": true,
      "requires": {
        "fs-access": "^1.0.0",
        "which": "^1.2.1"
      }
    },
    "karma-coverage-istanbul-reporter": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/karma-coverage-istanbul-reporter/-/karma-coverage-istanbul-reporter-2.0.4.tgz",
      "integrity": "sha512-xJS7QSQIVU6VK9HuJ/ieE5yynxKhjCCkd96NLY/BX/HXsx0CskU9JJiMQbd4cHALiddMwI4OWh1IIzeWrsavJw==",
      "dev": true,
      "requires": {
        "istanbul-api": "^2.0.5",
        "minimatch": "^3.0.4"
      }
    },
    "karma-jasmine": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/karma-jasmine/-/karma-jasmine-1.1.2.tgz",
      "integrity": "sha1-OU8rJf+0pkS5rabyLUQ+L9CIhsM=",
      "dev": true
    },
    "karma-jasmine-html-reporter": {
      "version": "0.2.2",
      "resolved": "http://registry.npmjs.org/karma-jasmine-html-reporter/-/karma-jasmine-html-reporter-0.2.2.tgz",
      "integrity": "sha1-SKjl7xiAdhfuK14zwRlMNbQ5Ukw=",
      "dev": true,
      "requires": {
        "karma-jasmine": "^1.0.2"
      }
    },
    "karma-source-map-support": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/karma-source-map-support/-/karma-source-map-support-1.3.0.tgz",
      "integrity": "sha512-HcPqdAusNez/ywa+biN4EphGz62MmQyPggUsDfsHqa7tSe4jdsxgvTKuDfIazjL+IOxpVWyT7Pr4dhAV+sxX5Q==",
      "dev": true,
      "requires": {
        "source-map-support": "^0.5.5"
      }
    },
    "killable": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/killable/-/killable-1.0.1.tgz",
      "integrity": "sha512-LzqtLKlUwirEUyl/nicirVmNiPvYs7l5n8wOPP7fyJVpUPkvCnW/vuiXGpylGUlnPDnB7311rARzAt3Mhswpjg==",
      "dev": true
    },
    "kind-of": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
      "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA==",
      "dev": true
    },
    "latest-version": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/latest-version/-/latest-version-3.1.0.tgz",
      "integrity": "sha1-ogU4P+oyKzO1rjsYq+4NwvNW7hU=",
      "dev": true,
      "requires": {
        "package-json": "^4.0.0"
      }
    },
    "lcid": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/lcid/-/lcid-1.0.0.tgz",
      "integrity": "sha1-MIrMr6C8SDo4Z7S28rlQYlHRuDU=",
      "dev": true,
      "requires": {
        "invert-kv": "^1.0.0"
      }
    },
    "less": {
      "version": "3.8.1",
      "resolved": "https://registry.npmjs.org/less/-/less-3.8.1.tgz",
      "integrity": "sha512-8HFGuWmL3FhQR0aH89escFNBQH/nEiYPP2ltDFdQw2chE28Yx2E3lhAIq9Y2saYwLSwa699s4dBVEfCY8Drf7Q==",
      "dev": true,
      "requires": {
        "clone": "^2.1.2",
        "errno": "^0.1.1",
        "graceful-fs": "^4.1.2",
        "image-size": "~0.5.0",
        "mime": "^1.4.1",
        "mkdirp": "^0.5.0",
        "promise": "^7.1.1",
        "request": "^2.83.0",
        "source-map": "~0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true,
          "optional": true
        }
      }
    },
    "less-loader": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/less-loader/-/less-loader-4.1.0.tgz",
      "integrity": "sha512-KNTsgCE9tMOM70+ddxp9yyt9iHqgmSs0yTZc5XH5Wo+g80RWRIYNqE58QJKm/yMud5wZEvz50ugRDuzVIkyahg==",
      "dev": true,
      "requires": {
        "clone": "^2.1.1",
        "loader-utils": "^1.1.0",
        "pify": "^3.0.0"
      }
    },
    "less-plugin-npm-import": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/less-plugin-npm-import/-/less-plugin-npm-import-2.1.0.tgz",
      "integrity": "sha1-gj5phskzGKmBccqFiEi2vq1Vvz4=",
      "dev": true,
      "requires": {
        "promise": "~7.0.1",
        "resolve": "~1.1.6"
      },
      "dependencies": {
        "promise": {
          "version": "7.0.4",
          "resolved": "http://registry.npmjs.org/promise/-/promise-7.0.4.tgz",
          "integrity": "sha1-Nj6EpMNsg1a4kP7WLJHOhdAu1Tk=",
          "dev": true,
          "requires": {
            "asap": "~2.0.3"
          }
        }
      }
    },
    "levn": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
      "integrity": "sha1-OwmSTt+fCDwEkP3UwLxEIeBHZO4=",
      "requires": {
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2"
      }
    },
    "license-webpack-plugin": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/license-webpack-plugin/-/license-webpack-plugin-2.0.2.tgz",
      "integrity": "sha512-GsomZw5VoT20ST8qH2tOjBgbyhn6Pgs9M94g0mbvfBIV1VXufm1iKY+4dbgfTObj1Mp6nSRE3Zf74deOZr0KwA==",
      "dev": true,
      "requires": {
        "webpack-sources": "^1.2.0"
      }
    },
    "lie": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/lie/-/lie-3.1.1.tgz",
      "integrity": "sha1-mkNrLMd0bKWd56QfpGmz77dr2H4=",
      "dev": true,
      "requires": {
        "immediate": "~3.0.5"
      }
    },
    "load-json-file": {
      "version": "1.1.0",
      "resolved": "http://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz",
      "integrity": "sha1-lWkFcI1YtLq0wiYbBPWfMcmTdMA=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "parse-json": "^2.2.0",
        "pify": "^2.0.0",
        "pinkie-promise": "^2.0.0",
        "strip-bom": "^2.0.0"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "loader-runner": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.3.1.tgz",
      "integrity": "sha512-By6ZFY7ETWOc9RFaAIb23IjJVcM4dvJC/N57nmdz9RSkMXvAXGI7SyVlAw3v8vjtDRlqThgVDVmTnr9fqMlxkw==",
      "dev": true
    },
    "loader-utils": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.1.0.tgz",
      "integrity": "sha1-yYrvSIvM7aL/teLeZG1qdUQp9c0=",
      "dev": true,
      "requires": {
        "big.js": "^3.1.3",
        "emojis-list": "^2.0.0",
        "json5": "^0.5.0"
      }
    },
    "locate-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
      "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
      "dev": true,
      "requires": {
        "p-locate": "^2.0.0",
        "path-exists": "^3.0.0"
      }
    },
    "lodash": {
      "version": "4.17.11",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.11.tgz",
      "integrity": "sha512-cQKh8igo5QUhZ7lg38DYWAxMvjSAKG0A8wGSVimP07SIUEK2UO+arSRKbRZWtelMtN5V0Hkwh5ryOto/SshYIg==",
      "dev": true
    },
    "lodash.assign": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/lodash.assign/-/lodash.assign-4.2.0.tgz",
      "integrity": "sha1-DZnzzNem0mHRm9rrkkUAXShYCOc=",
      "dev": true
    },
    "lodash.clonedeep": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.clonedeep/-/lodash.clonedeep-4.5.0.tgz",
      "integrity": "sha1-4j8/nE+Pvd6HJSnBBxhXoIblzO8=",
      "dev": true
    },
    "lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha1-gteb/zCmfEAF/9XiUVMArZyk168=",
      "dev": true
    },
    "lodash.mergewith": {
      "version": "4.6.1",
      "resolved": "https://registry.npmjs.org/lodash.mergewith/-/lodash.mergewith-4.6.1.tgz",
      "integrity": "sha512-eWw5r+PYICtEBgrBE5hhlT6aAa75f411bgDz/ZL2KZqYV03USvucsxcHUIlGTDTECs1eunpI7HOV7U+WLDvNdQ==",
      "dev": true
    },
    "lodash.tail": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.tail/-/lodash.tail-4.1.1.tgz",
      "integrity": "sha1-0jM6NtnncXyK0vfKyv7HwytERmQ=",
      "dev": true
    },
    "log4js": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/log4js/-/log4js-3.0.6.tgz",
      "integrity": "sha512-ezXZk6oPJCWL483zj64pNkMuY/NcRX5MPiB0zE6tjZM137aeusrOnW1ecxgF9cmwMWkBMhjteQxBPoZBh9FDxQ==",
      "dev": true,
      "requires": {
        "circular-json": "^0.5.5",
        "date-format": "^1.2.0",
        "debug": "^3.1.0",
        "rfdc": "^1.1.2",
        "streamroller": "0.7.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        }
      }
    },
    "loglevel": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.6.1.tgz",
      "integrity": "sha1-4PyVEztu8nbNyIh82vJKpvFW+Po=",
      "dev": true
    },
    "loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dev": true,
      "requires": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      }
    },
    "loud-rejection": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/loud-rejection/-/loud-rejection-1.6.0.tgz",
      "integrity": "sha1-W0b4AUft7leIcPCG0Eghz5mOVR8=",
      "dev": true,
      "requires": {
        "currently-unhandled": "^0.4.1",
        "signal-exit": "^3.0.0"
      }
    },
    "lowercase-keys": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/lowercase-keys/-/lowercase-keys-1.0.1.tgz",
      "integrity": "sha512-G2Lj61tXDnVFFOi8VZds+SoQjtQC3dgokKdDG2mTm1tx4m50NUHBOZSBwQQHyy0V12A0JTG4icfZQH+xPyh8VA==",
      "dev": true
    },
    "lru-cache": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-4.1.5.tgz",
      "integrity": "sha512-sWZlbEP2OsHNkXrMl5GYk/jKk70MBng6UU4YI/qGDYbgf6YbP4EvmqISbXCoJiRKs+1bSpFHVgQxvJ17F2li5g==",
      "dev": true,
      "requires": {
        "pseudomap": "^1.0.2",
        "yallist": "^2.1.2"
      }
    },
    "magic-string": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.25.1.tgz",
      "integrity": "sha512-sCuTz6pYom8Rlt4ISPFn6wuFodbKMIHUMv4Qko9P17dpxb7s52KJTmRuZZqHdGmLCK9AOcDare039nRIcfdkEg==",
      "dev": true,
      "requires": {
        "sourcemap-codec": "^1.4.1"
      }
    },
    "make-dir": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.3.0.tgz",
      "integrity": "sha512-2w31R7SJtieJJnQtGc7RVL2StM2vGYVfqUOvUDxH6bC6aJTxPxTF0GnIgCyu7tjockiUWAYQRbxa7vKn34s5sQ==",
      "dev": true,
      "requires": {
        "pify": "^3.0.0"
      }
    },
    "make-error": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.5.tgz",
      "integrity": "sha512-c3sIjNUow0+8swNwVpqoH4YCShKNFkMaw6oH1mNS2haDZQqkeZFlHS3dhoeEbKKmJB4vXpJucU6oH75aDYeE9g==",
      "dev": true
    },
    "make-fetch-happen": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/make-fetch-happen/-/make-fetch-happen-4.0.1.tgz",
      "integrity": "sha512-7R5ivfy9ilRJ1EMKIOziwrns9fGeAD4bAha8EB7BIiBBLHm2KeTUGCrICFt2rbHfzheTLynv50GnNTK1zDTrcQ==",
      "dev": true,
      "requires": {
        "agentkeepalive": "^3.4.1",
        "cacache": "^11.0.1",
        "http-cache-semantics": "^3.8.1",
        "http-proxy-agent": "^2.1.0",
        "https-proxy-agent": "^2.2.1",
        "lru-cache": "^4.1.2",
        "mississippi": "^3.0.0",
        "node-fetch-npm": "^2.0.2",
        "promise-retry": "^1.1.1",
        "socks-proxy-agent": "^4.0.0",
        "ssri": "^6.0.0"
      },
      "dependencies": {
        "cacache": {
          "version": "11.3.1",
          "resolved": "https://registry.npmjs.org/cacache/-/cacache-11.3.1.tgz",
          "integrity": "sha512-2PEw4cRRDu+iQvBTTuttQifacYjLPhET+SYO/gEFMy8uhi+jlJREDAjSF5FWSdV/Aw5h18caHA7vMTw2c+wDzA==",
          "dev": true,
          "requires": {
            "bluebird": "^3.5.1",
            "chownr": "^1.0.1",
            "figgy-pudding": "^3.1.0",
            "glob": "^7.1.2",
            "graceful-fs": "^4.1.11",
            "lru-cache": "^4.1.3",
            "mississippi": "^3.0.0",
            "mkdirp": "^0.5.1",
            "move-concurrently": "^1.0.1",
            "promise-inflight": "^1.0.1",
            "rimraf": "^2.6.2",
            "ssri": "^6.0.0",
            "unique-filename": "^1.1.0",
            "y18n": "^4.0.0"
          }
        },
        "mississippi": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
          "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
          "dev": true,
          "requires": {
            "concat-stream": "^1.5.0",
            "duplexify": "^3.4.2",
            "end-of-stream": "^1.1.0",
            "flush-write-stream": "^1.0.0",
            "from2": "^2.1.0",
            "parallel-transform": "^1.1.0",
            "pump": "^3.0.0",
            "pumpify": "^1.3.3",
            "stream-each": "^1.1.0",
            "through2": "^2.0.0"
          }
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        },
        "ssri": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
          "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
          "dev": true,
          "requires": {
            "figgy-pudding": "^3.5.1"
          }
        }
      }
    },
    "map-age-cleaner": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/map-age-cleaner/-/map-age-cleaner-0.1.3.tgz",
      "integrity": "sha512-bJzx6nMoP6PDLPBFmg7+xRKeFZvFboMrGlxmNj9ClvX53KrmvM5bXFXEWjbz4cz1AFn+jWJ9z/DJSz7hrs0w3w==",
      "dev": true,
      "requires": {
        "p-defer": "^1.0.0"
      }
    },
    "map-cache": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
      "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8=",
      "dev": true
    },
    "map-obj": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/map-obj/-/map-obj-1.0.1.tgz",
      "integrity": "sha1-2TPOuSBdgr3PSIb2dCvcK03qFG0=",
      "dev": true
    },
    "map-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
      "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
      "dev": true,
      "requires": {
        "object-visit": "^1.0.0"
      }
    },
    "math-random": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/math-random/-/math-random-1.0.1.tgz",
      "integrity": "sha1-izqsWIuKZuSXXjzepn97sylgH6w=",
      "dev": true
    },
    "md5.js": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
      "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
      "dev": true,
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "media-typer": {
      "version": "0.3.0",
      "resolved": "http://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha1-hxDXrwqmJvj/+hzgAWhUUmMlV0g=",
      "dev": true
    },
    "mem": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/mem/-/mem-4.0.0.tgz",
      "integrity": "sha512-WQxG/5xYc3tMbYLXoXPm81ET2WDULiU5FxbuIoNbJqLOOI8zehXFdZuiUEgfdrU2mVB1pxBZUGlYORSrpuJreA==",
      "dev": true,
      "requires": {
        "map-age-cleaner": "^0.1.1",
        "mimic-fn": "^1.0.0",
        "p-is-promise": "^1.1.0"
      }
    },
    "memory-fs": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
      "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
      "dev": true,
      "requires": {
        "errno": "^0.1.3",
        "readable-stream": "^2.0.1"
      }
    },
    "meow": {
      "version": "3.7.0",
      "resolved": "http://registry.npmjs.org/meow/-/meow-3.7.0.tgz",
      "integrity": "sha1-cstmi0JSKCkKu/qFaJJYcwioAfs=",
      "dev": true,
      "requires": {
        "camelcase-keys": "^2.0.0",
        "decamelize": "^1.1.2",
        "loud-rejection": "^1.0.0",
        "map-obj": "^1.0.1",
        "minimist": "^1.1.3",
        "normalize-package-data": "^2.3.4",
        "object-assign": "^4.0.1",
        "read-pkg-up": "^1.0.1",
        "redent": "^1.0.0",
        "trim-newlines": "^1.0.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "merge-descriptors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
      "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E=",
      "dev": true
    },
    "methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha1-VSmk1nZUE07cxSZmVoNbD4Ua/O4=",
      "dev": true
    },
    "micromatch": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
      "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
      "dev": true,
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "braces": "^2.3.1",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "extglob": "^2.0.4",
        "fragment-cache": "^0.2.1",
        "kind-of": "^6.0.2",
        "nanomatch": "^1.2.9",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.2"
      }
    },
    "miller-rabin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
      "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
      "dev": true,
      "requires": {
        "bn.js": "^4.0.0",
        "brorand": "^1.0.1"
      }
    },
    "mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "dev": true,
      "optional": true
    },
    "mime-db": {
      "version": "1.37.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.37.0.tgz",
      "integrity": "sha512-R3C4db6bgQhlIhPU48fUtdVmKnflq+hRdad7IyKhtFj06VPNVdk2RhiYL3UjQIlso8L+YxAtFkobT0VK+S/ybg=="
    },
    "mime-types": {
      "version": "2.1.21",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.21.tgz",
      "integrity": "sha512-3iL6DbwpyLzjR3xHSFNFeb9Nz/M8WDkX33t1GFQnFOllWk8pOrh/LSrB5OXlnlW5P9LH73X6loW/eogc+F5lJg==",
      "requires": {
        "mime-db": "~1.37.0"
      }
    },
    "mimic-fn": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-1.2.0.tgz",
      "integrity": "sha512-jf84uxzwiuiIVKiOLpfYk7N46TSy8ubTonmneY9vrpHNAnp0QBt2BxWV9dO3/j+BoVAb+a5G6YDPW3M5HOdMWQ==",
      "dev": true
    },
    "mini-css-extract-plugin": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-0.4.4.tgz",
      "integrity": "sha512-o+Jm+ocb0asEngdM6FsZWtZsRzA8koFUudIDwYUfl94M3PejPHG7Vopw5hN9V8WsMkSFpm3tZP3Fesz89EyrfQ==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.1.0",
        "schema-utils": "^1.0.0",
        "webpack-sources": "^1.1.0"
      }
    },
    "minimalistic-assert": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
      "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A==",
      "dev": true
    },
    "minimalistic-crypto-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
      "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo=",
      "dev": true
    },
    "minimatch": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
      "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
      "dev": true,
      "requires": {
        "brace-expansion": "^1.1.7"
      }
    },
    "minimist": {
      "version": "0.0.8",
      "resolved": "http://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz",
      "integrity": "sha1-hX/Kv8M5fSYluCKCYuhqp6ARsF0=",
      "dev": true
    },
    "minipass": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-2.3.5.tgz",
      "integrity": "sha512-Gi1W4k059gyRbyVUZQ4mEqLm0YIUiGYfvxhF6SIlk3ui1WVxMTGfGdQ2SInh3PDrRTVvPKgULkpJtT4RH10+VA==",
      "dev": true,
      "requires": {
        "safe-buffer": "^5.1.2",
        "yallist": "^3.0.0"
      },
      "dependencies": {
        "yallist": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.0.3.tgz",
          "integrity": "sha512-S+Zk8DEWE6oKpV+vI3qWkaK+jSbIK86pCwe2IF/xwIpQ8jEuxpw9NyaGjmp9+BoJv5FV2piqCDcoCtStppiq2A==",
          "dev": true
        }
      }
    },
    "minizlib": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-1.1.1.tgz",
      "integrity": "sha512-TrfjCjk4jLhcJyGMYymBH6oTXcWjYbUAXTHDbtnWHjZC25h0cdajHuPE1zxb4DVmu8crfh+HwH/WMuyLG0nHBg==",
      "dev": true,
      "requires": {
        "minipass": "^2.2.1"
      }
    },
    "mississippi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-2.0.0.tgz",
      "integrity": "sha512-zHo8v+otD1J10j/tC+VNoGK9keCuByhKovAvdn74dmxJl9+mWHnx6EMsDN4lgRoMI/eYo2nchAxniIbUPb5onw==",
      "dev": true,
      "requires": {
        "concat-stream": "^1.5.0",
        "duplexify": "^3.4.2",
        "end-of-stream": "^1.1.0",
        "flush-write-stream": "^1.0.0",
        "from2": "^2.1.0",
        "parallel-transform": "^1.1.0",
        "pump": "^2.0.1",
        "pumpify": "^1.3.3",
        "stream-each": "^1.1.0",
        "through2": "^2.0.0"
      }
    },
    "mixin-deep": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.1.tgz",
      "integrity": "sha512-8ZItLHeEgaqEvd5lYBXfm4EZSFCX29Jb9K+lAHhDKzReKBQKj3R+7NOF6tjqYi9t4oI8VUfaWITJQm86wnXGNQ==",
      "dev": true,
      "requires": {
        "for-in": "^1.0.2",
        "is-extendable": "^1.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
          "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
          "dev": true,
          "requires": {
            "is-plain-object": "^2.0.4"
          }
        }
      }
    },
    "mixin-object": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/mixin-object/-/mixin-object-2.0.1.tgz",
      "integrity": "sha1-T7lJRB2rGCVA8f4DW6YOGUel5X4=",
      "dev": true,
      "requires": {
        "for-in": "^0.1.3",
        "is-extendable": "^0.1.1"
      },
      "dependencies": {
        "for-in": {
          "version": "0.1.8",
          "resolved": "https://registry.npmjs.org/for-in/-/for-in-0.1.8.tgz",
          "integrity": "sha1-2Hc5COMSVhCZUrH9ubP6hn0ndeE=",
          "dev": true
        }
      }
    },
    "mkdirp": {
      "version": "0.5.1",
      "resolved": "http://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz",
      "integrity": "sha1-MAV0OOrGz3+MR2fzhkjWaX11yQM=",
      "dev": true,
      "requires": {
        "minimist": "0.0.8"
      }
    },
    "move-concurrently": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
      "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1",
        "copy-concurrently": "^1.0.0",
        "fs-write-stream-atomic": "^1.0.8",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.3"
      }
    },
    "ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
      "dev": true
    },
    "multicast-dns": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-6.2.3.tgz",
      "integrity": "sha512-ji6J5enbMyGRHIAkAOu3WdV8nggqviKCEKtXcOqfphZZtQrmHKycfynJ2V7eVPUA4NhJ6V7Wf4TmGbTwKE9B6g==",
      "dev": true,
      "requires": {
        "dns-packet": "^1.3.1",
        "thunky": "^1.0.2"
      }
    },
    "multicast-dns-service-types": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/multicast-dns-service-types/-/multicast-dns-service-types-1.1.0.tgz",
      "integrity": "sha1-iZ8R2WhuXgXLkbNdXw5jt3PPyQE=",
      "dev": true
    },
    "mute-stream": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.7.tgz",
      "integrity": "sha1-MHXOk7whuPq0PhvE2n6BFe0ee6s=",
      "dev": true
    },
    "nan": {
      "version": "2.11.1",
      "resolved": "https://registry.npmjs.org/nan/-/nan-2.11.1.tgz",
      "integrity": "sha512-iji6k87OSXa0CcrLl9z+ZiYSuR2o+c0bGuNmXdrhTQTakxytAFsC56SArGYoiHlJlFoHSnvmhpceZJaXkVuOtA==",
      "dev": true
    },
    "nanomatch": {
      "version": "1.2.13",
      "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
      "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
      "dev": true,
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "fragment-cache": "^0.2.1",
        "is-windows": "^1.0.2",
        "kind-of": "^6.0.2",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      }
    },
    "negotiator": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.1.tgz",
      "integrity": "sha1-KzJxhOiZIQEXeyhWP7XnECrNDKk=",
      "dev": true
    },
    "neo-async": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.0.tgz",
      "integrity": "sha512-MFh0d/Wa7vkKO3Y3LlacqAEeHK0mckVqzDieUKTT+KGxi+zIpeVsFxymkIiRpbpDziHc290Xr9A1O4Om7otoRA==",
      "dev": true
    },
    "ng-packagr": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/ng-packagr/-/ng-packagr-4.4.5.tgz",
      "integrity": "sha512-O2s2j6c54HguKLX183zQtey/hcVY7+XVJ5ynpB/LEaiGmkhxFXAku7K/7lLdCO5GkE8YaYw55M/Cmt8O+AqPsQ==",
      "dev": true,
      "requires": {
        "@ngtools/json-schema": "^1.1.0",
        "autoprefixer": "^9.0.0",
        "browserslist": "^4.0.0",
        "chalk": "^2.3.1",
        "chokidar": "^2.0.3",
        "clean-css": "^4.1.11",
        "commander": "^2.12.0",
        "fs-extra": "^7.0.0",
        "glob": "^7.1.2",
        "injection-js": "^2.2.1",
        "less": "^3.8.0",
        "less-plugin-npm-import": "^2.1.0",
        "node-sass": "^4.9.3",
        "node-sass-tilde-importer": "^1.0.0",
        "opencollective": "^1.0.3",
        "postcss": "^7.0.0",
        "postcss-url": "^8.0.0",
        "read-pkg-up": "^4.0.0",
        "rimraf": "^2.6.1",
        "rollup": "^0.67.0",
        "rollup-plugin-commonjs": "^9.1.3",
        "rollup-plugin-json": "^3.1.0",
        "rollup-plugin-node-resolve": "^3.0.0",
        "rollup-plugin-sourcemaps": "^0.4.2",
        "rxjs": "^6.0.0",
        "stylus": "^0.54.5",
        "uglify-js": "^3.0.7",
        "update-notifier": "^2.3.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "load-json-file": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-4.0.0.tgz",
          "integrity": "sha1-L19Fq5HjMhYjT9U62rZo607AmTs=",
          "dev": true,
          "requires": {
            "graceful-fs": "^4.1.2",
            "parse-json": "^4.0.0",
            "pify": "^3.0.0",
            "strip-bom": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.0.0.tgz",
          "integrity": "sha512-fl5s52lI5ahKCernzzIyAP0QAZbGIovtVHGwpcu1Jr/EpzLVDI2myISHwGqK7m8uQFugVWSrbxH7XnhGtvEc+A==",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.0.0.tgz",
          "integrity": "sha512-hMp0onDKIajHfIkdRk3P4CdCmErkYAxxDtP3Wx/4nZ3aGlau2VKh3mZpcuFkH27WQkL/3WBCPOktzA9ZOAnMQQ==",
          "dev": true
        },
        "parse-json": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
          "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
          "dev": true,
          "requires": {
            "error-ex": "^1.3.1",
            "json-parse-better-errors": "^1.0.1"
          }
        },
        "read-pkg": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-3.0.0.tgz",
          "integrity": "sha1-nLxoaXj+5l0WwA4rGcI3/Pbjg4k=",
          "dev": true,
          "requires": {
            "load-json-file": "^4.0.0",
            "normalize-package-data": "^2.3.2",
            "path-type": "^3.0.0"
          }
        },
        "read-pkg-up": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-4.0.0.tgz",
          "integrity": "sha512-6etQSH7nJGsK0RbG/2TeDzZFa8shjQ1um+SwQQ5cwKy0dhSXdOncEhb1CPpvQG4h7FyOV6EB6YlV0yJvZQNAkA==",
          "dev": true,
          "requires": {
            "find-up": "^3.0.0",
            "read-pkg": "^3.0.0"
          }
        },
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
          "dev": true
        }
      }
    },
    "nice-try": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.5.tgz",
      "integrity": "sha512-1nh45deeb5olNY7eX82BkPO7SSxR5SSYJiPTrTdFUVYwAl8CKMA5N9PjTYkHiRjisVcxcQ1HXdLhx2qxxJzLNQ==",
      "dev": true
    },
    "node-fetch": {
      "version": "1.6.3",
      "resolved": "http://registry.npmjs.org/node-fetch/-/node-fetch-1.6.3.tgz",
      "integrity": "sha1-3CNO3WSJmC1Y6PDbT2lQKavNjAQ=",
      "dev": true,
      "requires": {
        "encoding": "^0.1.11",
        "is-stream": "^1.0.1"
      }
    },
    "node-fetch-npm": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/node-fetch-npm/-/node-fetch-npm-2.0.2.tgz",
      "integrity": "sha512-nJIxm1QmAj4v3nfCvEeCrYSoVwXyxLnaPBK5W1W5DGEJwjlKuC2VEUycGw5oxk+4zZahRrB84PUJJgEmhFTDFw==",
      "dev": true,
      "requires": {
        "encoding": "^0.1.11",
        "json-parse-better-errors": "^1.0.0",
        "safe-buffer": "^5.1.1"
      }
    },
    "node-forge": {
      "version": "0.7.5",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.7.5.tgz",
      "integrity": "sha512-MmbQJ2MTESTjt3Gi/3yG1wGpIMhUfcIypUCGtTizFR9IiccFwxSpfp0vtIZlkFclEqERemxfnSdZEMR9VqqEFQ==",
      "dev": true
    },
    "node-gyp": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-3.8.0.tgz",
      "integrity": "sha512-3g8lYefrRRzvGeSowdJKAKyks8oUpLEd/DyPV4eMhVlhJ0aNaZqIrNUIPuEWWTAoPqyFkfGrM67MC69baqn6vA==",
      "dev": true,
      "requires": {
        "fstream": "^1.0.0",
        "glob": "^7.0.3",
        "graceful-fs": "^4.1.2",
        "mkdirp": "^0.5.0",
        "nopt": "2 || 3",
        "npmlog": "0 || 1 || 2 || 3 || 4",
        "osenv": "0",
        "request": "^2.87.0",
        "rimraf": "2",
        "semver": "~5.3.0",
        "tar": "^2.0.0",
        "which": "1"
      },
      "dependencies": {
        "semver": {
          "version": "5.3.0",
          "resolved": "http://registry.npmjs.org/semver/-/semver-5.3.0.tgz",
          "integrity": "sha1-myzl094C0XxgEq0yaqa00M9U+U8=",
          "dev": true
        }
      }
    },
    "node-libs-browser": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.1.0.tgz",
      "integrity": "sha512-5AzFzdoIMb89hBGMZglEegffzgRg+ZFoUmisQ8HI4j1KDdpx13J0taNp2y9xPbur6W61gepGDDotGBVQ7mfUCg==",
      "dev": true,
      "requires": {
        "assert": "^1.1.1",
        "browserify-zlib": "^0.2.0",
        "buffer": "^4.3.0",
        "console-browserify": "^1.1.0",
        "constants-browserify": "^1.0.0",
        "crypto-browserify": "^3.11.0",
        "domain-browser": "^1.1.1",
        "events": "^1.0.0",
        "https-browserify": "^1.0.0",
        "os-browserify": "^0.3.0",
        "path-browserify": "0.0.0",
        "process": "^0.11.10",
        "punycode": "^1.2.4",
        "querystring-es3": "^0.2.0",
        "readable-stream": "^2.3.3",
        "stream-browserify": "^2.0.1",
        "stream-http": "^2.7.2",
        "string_decoder": "^1.0.0",
        "timers-browserify": "^2.0.4",
        "tty-browserify": "0.0.0",
        "url": "^0.11.0",
        "util": "^0.10.3",
        "vm-browserify": "0.0.4"
      },
      "dependencies": {
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4=",
          "dev": true
        }
      }
    },
    "node-releases": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-1.0.5.tgz",
      "integrity": "sha512-Ky7q0BO1BBkG/rQz6PkEZ59rwo+aSfhczHP1wwq8IowoVdN/FpiP7qp0XW0P2+BVCWe5fQUBozdbVd54q1RbCQ==",
      "dev": true,
      "requires": {
        "semver": "^5.3.0"
      }
    },
    "node-sass": {
      "version": "4.10.0",
      "resolved": "https://registry.npmjs.org/node-sass/-/node-sass-4.10.0.tgz",
      "integrity": "sha512-fDQJfXszw6vek63Fe/ldkYXmRYK/QS6NbvM3i5oEo9ntPDy4XX7BcKZyTKv+/kSSxRtXXc7l+MSwEmYc0CSy6Q==",
      "dev": true,
      "requires": {
        "async-foreach": "^0.1.3",
        "chalk": "^1.1.1",
        "cross-spawn": "^3.0.0",
        "gaze": "^1.0.0",
        "get-stdin": "^4.0.1",
        "glob": "^7.0.3",
        "in-publish": "^2.0.0",
        "lodash.assign": "^4.2.0",
        "lodash.clonedeep": "^4.3.2",
        "lodash.mergewith": "^4.6.0",
        "meow": "^3.7.0",
        "mkdirp": "^0.5.1",
        "nan": "^2.10.0",
        "node-gyp": "^3.8.0",
        "npmlog": "^4.0.0",
        "request": "^2.88.0",
        "sass-graph": "^2.2.4",
        "stdout-stream": "^1.4.0",
        "true-case-path": "^1.0.2"
      },
      "dependencies": {
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "http://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "node-sass-tilde-importer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/node-sass-tilde-importer/-/node-sass-tilde-importer-1.0.2.tgz",
      "integrity": "sha512-Swcmr38Y7uB78itQeBm3mThjxBy9/Ah/ykPIaURY/L6Nec9AyRoL/jJ7ECfMR+oZeCTVQNxVMu/aHU+TLRVbdg==",
      "dev": true,
      "requires": {
        "find-parent-dir": "^0.3.0"
      }
    },
    "nopt": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/nopt/-/nopt-3.0.6.tgz",
      "integrity": "sha1-xkZdvwirzU2zWTF/eaxopkayj/k=",
      "dev": true,
      "requires": {
        "abbrev": "1"
      }
    },
    "normalize-package-data": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.4.0.tgz",
      "integrity": "sha512-9jjUFbTPfEy3R/ad/2oNbKtW9Hgovl5O1FvFWKkKblNXoN/Oou6+9+KKohPK13Yc3/TyunyWhJp6gvRNR/PPAw==",
      "dev": true,
      "requires": {
        "hosted-git-info": "^2.1.4",
        "is-builtin-module": "^1.0.0",
        "semver": "2 || 3 || 4 || 5",
        "validate-npm-package-license": "^3.0.1"
      }
    },
    "normalize-path": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
      "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
      "dev": true,
      "requires": {
        "remove-trailing-separator": "^1.0.1"
      }
    },
    "normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha1-LRDAa9/TEuqXd2laTShDlFa3WUI=",
      "dev": true
    },
    "npm-bundled": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/npm-bundled/-/npm-bundled-1.0.5.tgz",
      "integrity": "sha512-m/e6jgWu8/v5niCUKQi9qQl8QdeEduFA96xHDDzFGqly0OOjI7c+60KM/2sppfnUU9JJagf+zs+yGhqSOFj71g==",
      "dev": true
    },
    "npm-package-arg": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-6.1.0.tgz",
      "integrity": "sha512-zYbhP2k9DbJhA0Z3HKUePUgdB1x7MfIfKssC+WLPFMKTBZKpZh5m13PgexJjCq6KW7j17r0jHWcCpxEqnnncSA==",
      "dev": true,
      "requires": {
        "hosted-git-info": "^2.6.0",
        "osenv": "^0.1.5",
        "semver": "^5.5.0",
        "validate-npm-package-name": "^3.0.0"
      }
    },
    "npm-packlist": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/npm-packlist/-/npm-packlist-1.1.12.tgz",
      "integrity": "sha512-WJKFOVMeAlsU/pjXuqVdzU0WfgtIBCupkEVwn+1Y0ERAbUfWw8R4GjgVbaKnUjRoD2FoQbHOCbOyT5Mbs9Lw4g==",
      "dev": true,
      "requires": {
        "ignore-walk": "^3.0.1",
        "npm-bundled": "^1.0.1"
      }
    },
    "npm-pick-manifest": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/npm-pick-manifest/-/npm-pick-manifest-2.2.3.tgz",
      "integrity": "sha512-+IluBC5K201+gRU85vFlUwX3PFShZAbAgDNp2ewJdWMVSppdo/Zih0ul2Ecky/X7b51J7LrrUAP+XOmOCvYZqA==",
      "dev": true,
      "requires": {
        "figgy-pudding": "^3.5.1",
        "npm-package-arg": "^6.0.0",
        "semver": "^5.4.1"
      }
    },
    "npm-registry-fetch": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/npm-registry-fetch/-/npm-registry-fetch-3.8.0.tgz",
      "integrity": "sha512-hrw8UMD+Nob3Kl3h8Z/YjmKamb1gf7D1ZZch2otrIXM3uFLB5vjEY6DhMlq80z/zZet6eETLbOXcuQudCB3Zpw==",
      "dev": true,
      "requires": {
        "JSONStream": "^1.3.4",
        "bluebird": "^3.5.1",
        "figgy-pudding": "^3.4.1",
        "lru-cache": "^4.1.3",
        "make-fetch-happen": "^4.0.1",
        "npm-package-arg": "^6.1.0"
      }
    },
    "npm-run-path": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-2.0.2.tgz",
      "integrity": "sha1-NakjLfo11wZ7TLLd8jV7GHFTbF8=",
      "dev": true,
      "requires": {
        "path-key": "^2.0.0"
      }
    },
    "npmlog": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
      "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
      "dev": true,
      "requires": {
        "are-we-there-yet": "~1.1.2",
        "console-control-strings": "~1.1.0",
        "gauge": "~2.7.3",
        "set-blocking": "~2.0.0"
      }
    },
    "null-check": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/null-check/-/null-check-1.0.0.tgz",
      "integrity": "sha1-l33/1xdgErnsMNKjnbXPcqBDnt0=",
      "dev": true
    },
    "num2fraction": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/num2fraction/-/num2fraction-1.2.2.tgz",
      "integrity": "sha1-b2gragJ6Tp3fpFZM0lidHU5mnt4=",
      "dev": true
    },
    "number-is-nan": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/number-is-nan/-/number-is-nan-1.0.1.tgz",
      "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0=",
      "dev": true
    },
    "nwmatcher": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/nwmatcher/-/nwmatcher-1.4.4.tgz",
      "integrity": "sha512-3iuY4N5dhgMpCUrOVnuAdGrgxVqV2cJpM+XNccjR2DKOB1RUP0aA+wGXEiNziG/UKboFyGBIoKOaNlJxx8bciQ=="
    },
    "oauth-sign": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
      "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
    },
    "object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=",
      "dev": true
    },
    "object-component": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/object-component/-/object-component-0.0.3.tgz",
      "integrity": "sha1-8MaapQ78lbhmwYb0AKM3acsvEpE=",
      "dev": true
    },
    "object-copy": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
      "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
      "dev": true,
      "requires": {
        "copy-descriptor": "^0.1.0",
        "define-property": "^0.2.5",
        "kind-of": "^3.0.3"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "object-visit": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
      "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
      "dev": true,
      "requires": {
        "isobject": "^3.0.0"
      }
    },
    "object.omit": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/object.omit/-/object.omit-2.0.1.tgz",
      "integrity": "sha1-Gpx0SCnznbuFjHbKNXmuKlTr0fo=",
      "dev": true,
      "requires": {
        "for-own": "^0.1.4",
        "is-extendable": "^0.1.1"
      },
      "dependencies": {
        "for-own": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
          "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
          "dev": true,
          "requires": {
            "for-in": "^1.0.1"
          }
        }
      }
    },
    "object.pick": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
      "dev": true,
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "obuf": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
      "integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg==",
      "dev": true
    },
    "omggif": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/omggif/-/omggif-1.0.7.tgz",
      "integrity": "sha1-WdLuywJj3oRjWz/riHwMmXPx5J0="
    },
    "on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
      "dev": true,
      "requires": {
        "ee-first": "1.1.1"
      }
    },
    "on-headers": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.0.1.tgz",
      "integrity": "sha1-ko9dD0cNSTQmUepnlLCFfBAGk/c=",
      "dev": true
    },
    "once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
      "dev": true,
      "requires": {
        "wrappy": "1"
      }
    },
    "onetime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-2.0.1.tgz",
      "integrity": "sha1-BnQoIw/WdEOyeUsiu6UotoZ5YtQ=",
      "dev": true,
      "requires": {
        "mimic-fn": "^1.0.0"
      }
    },
    "opencollective": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/opencollective/-/opencollective-1.0.3.tgz",
      "integrity": "sha1-ruY3K8KBRFg2kMPKja7PwSDdDvE=",
      "dev": true,
      "requires": {
        "babel-polyfill": "6.23.0",
        "chalk": "1.1.3",
        "inquirer": "3.0.6",
        "minimist": "1.2.0",
        "node-fetch": "1.6.3",
        "opn": "4.0.2"
      },
      "dependencies": {
        "ansi-escapes": {
          "version": "1.4.0",
          "resolved": "http://registry.npmjs.org/ansi-escapes/-/ansi-escapes-1.4.0.tgz",
          "integrity": "sha1-06ioOzGapneTZisT52HHkRQiMG4=",
          "dev": true
        },
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "http://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "chardet": {
          "version": "0.4.2",
          "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.4.2.tgz",
          "integrity": "sha1-tUc7M9yXxCTl2Y3IfVXU2KKci/I=",
          "dev": true
        },
        "external-editor": {
          "version": "2.2.0",
          "resolved": "http://registry.npmjs.org/external-editor/-/external-editor-2.2.0.tgz",
          "integrity": "sha512-bSn6gvGxKt+b7+6TKEv1ZycHleA7aHhRHyAqJyp5pbUFuYYNIzpZnQDk7AsYckyWdEnTeAnay0aCy2aV6iTk9A==",
          "dev": true,
          "requires": {
            "chardet": "^0.4.0",
            "iconv-lite": "^0.4.17",
            "tmp": "^0.0.33"
          }
        },
        "inquirer": {
          "version": "3.0.6",
          "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-3.0.6.tgz",
          "integrity": "sha1-4EqqnQW3o8ubD0B9BDdfBEcZA0c=",
          "dev": true,
          "requires": {
            "ansi-escapes": "^1.1.0",
            "chalk": "^1.0.0",
            "cli-cursor": "^2.1.0",
            "cli-width": "^2.0.0",
            "external-editor": "^2.0.1",
            "figures": "^2.0.0",
            "lodash": "^4.3.0",
            "mute-stream": "0.0.7",
            "run-async": "^2.2.0",
            "rx": "^4.1.0",
            "string-width": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "through": "^2.3.6"
          }
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        },
        "opn": {
          "version": "4.0.2",
          "resolved": "http://registry.npmjs.org/opn/-/opn-4.0.2.tgz",
          "integrity": "sha1-erwi5kTf9jsKltWrfyeQwPAavJU=",
          "dev": true,
          "requires": {
            "object-assign": "^4.0.1",
            "pinkie-promise": "^2.0.0"
          }
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
              "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
              "dev": true,
              "requires": {
                "ansi-regex": "^3.0.0"
              }
            }
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "opn": {
      "version": "5.3.0",
      "resolved": "http://registry.npmjs.org/opn/-/opn-5.3.0.tgz",
      "integrity": "sha512-bYJHo/LOmoTd+pfiYhfZDnf9zekVJrY+cnS2a5F2x+w5ppvTqObojTP7WiFG+kVZs9Inw+qQ/lw7TroWwhdd2g==",
      "dev": true,
      "requires": {
        "is-wsl": "^1.1.0"
      }
    },
    "optimist": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/optimist/-/optimist-0.6.1.tgz",
      "integrity": "sha1-2j6nRob6IaGaERwybpDrFaAZZoY=",
      "dev": true,
      "requires": {
        "minimist": "~0.0.1",
        "wordwrap": "~0.0.2"
      },
      "dependencies": {
        "wordwrap": {
          "version": "0.0.3",
          "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.3.tgz",
          "integrity": "sha1-o9XabNXAvAAI03I0u68b7WMFkQc=",
          "dev": true
        }
      }
    },
    "optionator": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.2.tgz",
      "integrity": "sha1-NkxeQJ0/TWMB1sC0wFu6UBgK62Q=",
      "requires": {
        "deep-is": "~0.1.3",
        "fast-levenshtein": "~2.0.4",
        "levn": "~0.3.0",
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2",
        "wordwrap": "~1.0.0"
      }
    },
    "original": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/original/-/original-1.0.2.tgz",
      "integrity": "sha512-hyBVl6iqqUOJ8FqRe+l/gS8H+kKYjrEndd5Pm1MfBtsEKA038HkkdbAl/72EAXGyonD/PFsvmVG+EvcIpliMBg==",
      "dev": true,
      "requires": {
        "url-parse": "^1.4.3"
      }
    },
    "os-browserify": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
      "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc=",
      "dev": true
    },
    "os-homedir": {
      "version": "1.0.2",
      "resolved": "http://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz",
      "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M=",
      "dev": true
    },
    "os-locale": {
      "version": "1.4.0",
      "resolved": "http://registry.npmjs.org/os-locale/-/os-locale-1.4.0.tgz",
      "integrity": "sha1-IPnxeuKe00XoveWDsT0gCYA8FNk=",
      "dev": true,
      "requires": {
        "lcid": "^1.0.0"
      }
    },
    "os-tmpdir": {
      "version": "1.0.2",
      "resolved": "http://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz",
      "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ=",
      "dev": true
    },
    "osenv": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/osenv/-/osenv-0.1.5.tgz",
      "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
      "dev": true,
      "requires": {
        "os-homedir": "^1.0.0",
        "os-tmpdir": "^1.0.0"
      }
    },
    "p-defer": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-defer/-/p-defer-1.0.0.tgz",
      "integrity": "sha1-n26xgvbJqozXQwBKfU+WsZaw+ww=",
      "dev": true
    },
    "p-finally": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-finally/-/p-finally-1.0.0.tgz",
      "integrity": "sha1-P7z7FbiZpEEjs0ttzBi3JDNqLK4=",
      "dev": true
    },
    "p-is-promise": {
      "version": "1.1.0",
      "resolved": "http://registry.npmjs.org/p-is-promise/-/p-is-promise-1.1.0.tgz",
      "integrity": "sha1-nJRWmJ6fZYgBewQ01WCXZ1w9oF4=",
      "dev": true
    },
    "p-limit": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
      "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
      "dev": true,
      "requires": {
        "p-try": "^1.0.0"
      }
    },
    "p-locate": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
      "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
      "dev": true,
      "requires": {
        "p-limit": "^1.1.0"
      }
    },
    "p-map": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/p-map/-/p-map-1.2.0.tgz",
      "integrity": "sha512-r6zKACMNhjPJMTl8KcFH4li//gkrXWfbD6feV8l6doRHlzljFWGJ2AP6iKaCJXyZmAUMOPtvbW7EXkbWO/pLEA==",
      "dev": true
    },
    "p-try": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
      "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
      "dev": true
    },
    "package-json": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/package-json/-/package-json-4.0.1.tgz",
      "integrity": "sha1-iGmgQBJTZhxMTKPabCEh7VVfXu0=",
      "dev": true,
      "requires": {
        "got": "^6.7.1",
        "registry-auth-token": "^3.0.1",
        "registry-url": "^3.0.3",
        "semver": "^5.1.0"
      }
    },
    "pacote": {
      "version": "9.1.1",
      "resolved": "https://registry.npmjs.org/pacote/-/pacote-9.1.1.tgz",
      "integrity": "sha512-f28Rq5ozzKAA9YwIKw61/ipwAatUZseYmVssDbHHaexF0wRIVotapVEZPAjOT7Eu3LYVqEp0NVpNizoAnYBUaA==",
      "dev": true,
      "requires": {
        "bluebird": "^3.5.2",
        "cacache": "^11.2.0",
        "figgy-pudding": "^3.5.1",
        "get-stream": "^4.1.0",
        "glob": "^7.1.3",
        "lru-cache": "^4.1.3",
        "make-fetch-happen": "^4.0.1",
        "minimatch": "^3.0.4",
        "minipass": "^2.3.5",
        "mississippi": "^3.0.0",
        "mkdirp": "^0.5.1",
        "normalize-package-data": "^2.4.0",
        "npm-package-arg": "^6.1.0",
        "npm-packlist": "^1.1.12",
        "npm-pick-manifest": "^2.1.0",
        "npm-registry-fetch": "^3.8.0",
        "osenv": "^0.1.5",
        "promise-inflight": "^1.0.1",
        "promise-retry": "^1.1.1",
        "protoduck": "^5.0.1",
        "rimraf": "^2.6.2",
        "safe-buffer": "^5.1.2",
        "semver": "^5.6.0",
        "ssri": "^6.0.1",
        "tar": "^4.4.6",
        "unique-filename": "^1.1.1",
        "which": "^1.3.1"
      },
      "dependencies": {
        "cacache": {
          "version": "11.3.1",
          "resolved": "https://registry.npmjs.org/cacache/-/cacache-11.3.1.tgz",
          "integrity": "sha512-2PEw4cRRDu+iQvBTTuttQifacYjLPhET+SYO/gEFMy8uhi+jlJREDAjSF5FWSdV/Aw5h18caHA7vMTw2c+wDzA==",
          "dev": true,
          "requires": {
            "bluebird": "^3.5.1",
            "chownr": "^1.0.1",
            "figgy-pudding": "^3.1.0",
            "glob": "^7.1.2",
            "graceful-fs": "^4.1.11",
            "lru-cache": "^4.1.3",
            "mississippi": "^3.0.0",
            "mkdirp": "^0.5.1",
            "move-concurrently": "^1.0.1",
            "promise-inflight": "^1.0.1",
            "rimraf": "^2.6.2",
            "ssri": "^6.0.0",
            "unique-filename": "^1.1.0",
            "y18n": "^4.0.0"
          }
        },
        "get-stream": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
          "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
          "dev": true,
          "requires": {
            "pump": "^3.0.0"
          }
        },
        "mississippi": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
          "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
          "dev": true,
          "requires": {
            "concat-stream": "^1.5.0",
            "duplexify": "^3.4.2",
            "end-of-stream": "^1.1.0",
            "flush-write-stream": "^1.0.0",
            "from2": "^2.1.0",
            "parallel-transform": "^1.1.0",
            "pump": "^3.0.0",
            "pumpify": "^1.3.3",
            "stream-each": "^1.1.0",
            "through2": "^2.0.0"
          }
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        },
        "semver": {
          "version": "5.6.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.6.0.tgz",
          "integrity": "sha512-RS9R6R35NYgQn++fkDWaOmqGoj4Ek9gGs+DPxNUZKuwE183xjJroKvyo1IzVFeXvUrvmALy6FWD5xrdJT25gMg==",
          "dev": true
        },
        "ssri": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
          "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
          "dev": true,
          "requires": {
            "figgy-pudding": "^3.5.1"
          }
        },
        "tar": {
          "version": "4.4.8",
          "resolved": "https://registry.npmjs.org/tar/-/tar-4.4.8.tgz",
          "integrity": "sha512-LzHF64s5chPQQS0IYBn9IN5h3i98c12bo4NCO7e0sGM2llXQ3p2FGC5sdENN4cTW48O915Sh+x+EXx7XW96xYQ==",
          "dev": true,
          "requires": {
            "chownr": "^1.1.1",
            "fs-minipass": "^1.2.5",
            "minipass": "^2.3.4",
            "minizlib": "^1.1.1",
            "mkdirp": "^0.5.0",
            "safe-buffer": "^5.1.2",
            "yallist": "^3.0.2"
          }
        },
        "yallist": {
          "version": "3.0.3",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.0.3.tgz",
          "integrity": "sha512-S+Zk8DEWE6oKpV+vI3qWkaK+jSbIK86pCwe2IF/xwIpQ8jEuxpw9NyaGjmp9+BoJv5FV2piqCDcoCtStppiq2A==",
          "dev": true
        }
      }
    },
    "pako": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.7.tgz",
      "integrity": "sha512-3HNK5tW4x8o5mO8RuHZp3Ydw9icZXx0RANAOMzlMzx7LVXhMJ4mo3MOBpzyd7r/+RUu8BmndP47LXT+vzjtWcQ==",
      "dev": true
    },
    "parallel-transform": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.1.0.tgz",
      "integrity": "sha1-1BDwZbBdojCB/NEPKIVMKb2jOwY=",
      "dev": true,
      "requires": {
        "cyclist": "~0.2.2",
        "inherits": "^2.0.3",
        "readable-stream": "^2.1.5"
      }
    },
    "parse-asn1": {
      "version": "5.1.1",
      "resolved": "http://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.1.tgz",
      "integrity": "sha512-KPx7flKXg775zZpnp9SxJlz00gTd4BmJ2yJufSc44gMCRrRQ7NSzAcSJQfifuOLgW6bEi+ftrALtsgALeB2Adw==",
      "dev": true,
      "requires": {
        "asn1.js": "^4.0.0",
        "browserify-aes": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.0",
        "pbkdf2": "^3.0.3"
      }
    },
    "parse-glob": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/parse-glob/-/parse-glob-3.0.4.tgz",
      "integrity": "sha1-ssN2z7EfNVE7rdFz7wu246OIORw=",
      "dev": true,
      "requires": {
        "glob-base": "^0.3.0",
        "is-dotfile": "^1.0.0",
        "is-extglob": "^1.0.0",
        "is-glob": "^2.0.0"
      },
      "dependencies": {
        "is-extglob": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
          "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
          "dev": true
        },
        "is-glob": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
          "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        }
      }
    },
    "parse-json": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
      "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
      "dev": true,
      "requires": {
        "error-ex": "^1.2.0"
      }
    },
    "parse5": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
      "integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA==",
      "dev": true
    },
    "parseqs": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/parseqs/-/parseqs-0.0.5.tgz",
      "integrity": "sha1-1SCKNzjkZ2bikbouoXNoSSGouJ0=",
      "dev": true,
      "requires": {
        "better-assert": "~1.0.0"
      }
    },
    "parseuri": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/parseuri/-/parseuri-0.0.5.tgz",
      "integrity": "sha1-gCBKUNTbt3m/3G6+J3jZDkvOMgo=",
      "dev": true,
      "requires": {
        "better-assert": "~1.0.0"
      }
    },
    "parseurl": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.2.tgz",
      "integrity": "sha1-/CidTtiZMRlGDBViUyYs3I3mW/M=",
      "dev": true
    },
    "pascalcase": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
      "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ=",
      "dev": true
    },
    "path-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.0.tgz",
      "integrity": "sha1-oLhwcpquIUAFt9UDLsLLuw+0RRo=",
      "dev": true
    },
    "path-dirname": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
      "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA=",
      "dev": true
    },
    "path-exists": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
      "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
      "dev": true
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "resolved": "http://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",
      "dev": true
    },
    "path-is-inside": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
      "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM=",
      "dev": true
    },
    "path-key": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
      "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A=",
      "dev": true
    },
    "path-parse": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
      "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw==",
      "dev": true
    },
    "path-to-regexp": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
      "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w=",
      "dev": true
    },
    "path-type": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-3.0.0.tgz",
      "integrity": "sha512-T2ZUsdZFHgA3u4e5PfPbjd7HDDpxPnQb5jN0SrDsjNSuVXHJqtwTnWqG0B1jZrgmJ/7lj1EmVIByWt1gxGkWvg==",
      "dev": true,
      "requires": {
        "pify": "^3.0.0"
      }
    },
    "pbkdf2": {
      "version": "3.0.17",
      "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
      "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
      "dev": true,
      "requires": {
        "create-hash": "^1.1.2",
        "create-hmac": "^1.1.4",
        "ripemd160": "^2.0.1",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
    },
    "pify": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
      "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY=",
      "dev": true
    },
    "pinkie": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
      "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA=",
      "dev": true
    },
    "pinkie-promise": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
      "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
      "dev": true,
      "requires": {
        "pinkie": "^2.0.0"
      }
    },
    "pkg-dir": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
      "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
      "dev": true,
      "requires": {
        "find-up": "^2.1.0"
      }
    },
    "portfinder": {
      "version": "1.0.17",
      "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.17.tgz",
      "integrity": "sha512-syFcRIRzVI1BoEFOCaAiizwDolh1S1YXSodsVhncbhjzjZQulhczNRbqnUl9N31Q4dKGOXsNDqxC2BWBgSMqeQ==",
      "dev": true,
      "requires": {
        "async": "^1.5.2",
        "debug": "^2.2.0",
        "mkdirp": "0.5.x"
      }
    },
    "posix-character-classes": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
      "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs=",
      "dev": true
    },
    "postcss": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.5.tgz",
      "integrity": "sha512-HBNpviAUFCKvEh7NZhw1e8MBPivRszIiUnhrJ+sBFVSYSqubrzwX3KG51mYgcRHX8j/cAgZJedONZcm5jTBdgQ==",
      "dev": true,
      "requires": {
        "chalk": "^2.4.1",
        "source-map": "^0.6.1",
        "supports-color": "^5.5.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "postcss-import": {
      "version": "12.0.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-12.0.0.tgz",
      "integrity": "sha512-3KqKRZcaZAvxbY8DVLdd81tG5uKzbUQuiWIvy0o0fzEC42bKacqPYFWbfCQyw6L4LWUaqPz/idvIdbhpgQ32eQ==",
      "dev": true,
      "requires": {
        "postcss": "^7.0.1",
        "postcss-value-parser": "^3.2.3",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      }
    },
    "postcss-load-config": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-2.0.0.tgz",
      "integrity": "sha512-V5JBLzw406BB8UIfsAWSK2KSwIJ5yoEIVFb4gVkXci0QdKgA24jLmHZ/ghe/GgX0lJ0/D1uUK1ejhzEY94MChQ==",
      "dev": true,
      "requires": {
        "cosmiconfig": "^4.0.0",
        "import-cwd": "^2.0.0"
      }
    },
    "postcss-loader": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postcss-loader/-/postcss-loader-3.0.0.tgz",
      "integrity": "sha512-cLWoDEY5OwHcAjDnkyRQzAXfs2jrKjXpO/HQFcc5b5u/r7aa471wdmChmwfnv7x2u840iat/wi0lQ5nbRgSkUA==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.1.0",
        "postcss": "^7.0.0",
        "postcss-load-config": "^2.0.0",
        "schema-utils": "^1.0.0"
      }
    },
    "postcss-url": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/postcss-url/-/postcss-url-8.0.0.tgz",
      "integrity": "sha512-E2cbOQ5aii2zNHh8F6fk1cxls7QVFZjLPSrqvmiza8OuXLzIpErij8BDS5Y3STPfJgpIMNCPEr8JlKQWEoozUw==",
      "dev": true,
      "requires": {
        "mime": "^2.3.1",
        "minimatch": "^3.0.4",
        "mkdirp": "^0.5.0",
        "postcss": "^7.0.2",
        "xxhashjs": "^0.2.1"
      },
      "dependencies": {
        "mime": {
          "version": "2.4.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.0.tgz",
          "integrity": "sha512-ikBcWwyqXQSHKtciCcctu9YfPbFYZ4+gbHEmE0Q8jzcTYQg5dHCr3g2wwAZjPoJfQVXZq6KXAjpXOTf5/cjT7w==",
          "dev": true
        }
      }
    },
    "postcss-value-parser": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
      "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ==",
      "dev": true
    },
    "prelude-ls": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
      "integrity": "sha1-IZMqVJ9eUv/ZqCf1cOBL5iqX2lQ="
    },
    "prepend-http": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/prepend-http/-/prepend-http-1.0.4.tgz",
      "integrity": "sha1-1PRWKwzjaW5BrFLQ4ALlemNdxtw=",
      "dev": true
    },
    "preserve": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",
      "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks=",
      "dev": true
    },
    "process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI=",
      "dev": true
    },
    "process-nextick-args": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.0.tgz",
      "integrity": "sha512-MtEC1TqN0EU5nephaJ4rAtThHtC86dNN9qCuEhtshvpVBkAW5ZO7BASN9REnF9eoXGcRub+pFuKEpOHE+HbEMw==",
      "dev": true
    },
    "promise": {
      "version": "7.3.1",
      "resolved": "https://registry.npmjs.org/promise/-/promise-7.3.1.tgz",
      "integrity": "sha512-nolQXZ/4L+bP/UGlkfaIujX9BKxGwmQ9OT4mOt5yvy8iK1h3wqTEJCijzGANTCCl9nWjY41juyAn2K3Q1hLLTg==",
      "dev": true,
      "optional": true,
      "requires": {
        "asap": "~2.0.3"
      }
    },
    "promise-inflight": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
      "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM=",
      "dev": true
    },
    "promise-retry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/promise-retry/-/promise-retry-1.1.1.tgz",
      "integrity": "sha1-ZznpaOMFHaIM5kl/srUPaRHfPW0=",
      "dev": true,
      "requires": {
        "err-code": "^1.0.0",
        "retry": "^0.10.0"
      }
    },
    "protoduck": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/protoduck/-/protoduck-5.0.1.tgz",
      "integrity": "sha512-WxoCeDCoCBY55BMvj4cAEjdVUFGRWed9ZxPlqTKYyw1nDDTQ4pqmnIMAGfJlg7Dx35uB/M+PHJPTmGOvaCaPTg==",
      "dev": true,
      "requires": {
        "genfun": "^5.0.0"
      }
    },
    "protractor": {
      "version": "5.4.1",
      "resolved": "https://registry.npmjs.org/protractor/-/protractor-5.4.1.tgz",
      "integrity": "sha512-ORey5ewQMYiXQxcQohsqEiKYOg/r5yJoJbt0tuROmmgajdg/CA3gTOZNIFJncUVMAJIk5YFqBBLUjKVmQO6tfA==",
      "dev": true,
      "requires": {
        "@types/node": "^6.0.46",
        "@types/q": "^0.0.32",
        "@types/selenium-webdriver": "^3.0.0",
        "blocking-proxy": "^1.0.0",
        "browserstack": "^1.5.1",
        "chalk": "^1.1.3",
        "glob": "^7.0.3",
        "jasmine": "2.8.0",
        "jasminewd2": "^2.1.0",
        "optimist": "~0.6.0",
        "q": "1.4.1",
        "saucelabs": "^1.5.0",
        "selenium-webdriver": "3.6.0",
        "source-map-support": "~0.4.0",
        "webdriver-js-extender": "2.1.0",
        "webdriver-manager": "^12.0.6"
      },
      "dependencies": {
        "@types/node": {
          "version": "6.14.2",
          "resolved": "https://registry.npmjs.org/@types/node/-/node-6.14.2.tgz",
          "integrity": "sha512-JWB3xaVfsfnFY8Ofc9rTB/op0fqqTSqy4vBcVk1LuRJvta7KTX+D//fCkiTMeLGhdr2EbFZzQjC97gvmPilk9Q==",
          "dev": true
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "http://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "del": {
          "version": "2.2.2",
          "resolved": "https://registry.npmjs.org/del/-/del-2.2.2.tgz",
          "integrity": "sha1-wSyYHQZ4RshLyvhiz/kw2Qf/0ag=",
          "dev": true,
          "requires": {
            "globby": "^5.0.0",
            "is-path-cwd": "^1.0.0",
            "is-path-in-cwd": "^1.0.0",
            "object-assign": "^4.0.1",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0",
            "rimraf": "^2.2.8"
          }
        },
        "globby": {
          "version": "5.0.0",
          "resolved": "http://registry.npmjs.org/globby/-/globby-5.0.0.tgz",
          "integrity": "sha1-69hGZ8oNuzMLmbz8aOrCvFQ3Dg0=",
          "dev": true,
          "requires": {
            "array-union": "^1.0.1",
            "arrify": "^1.0.0",
            "glob": "^7.0.3",
            "object-assign": "^4.0.1",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        },
        "source-map-support": {
          "version": "0.4.18",
          "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.4.18.tgz",
          "integrity": "sha512-try0/JqxPLF9nOjvSta7tVondkP5dwgyLDjVoyMDlmjugT2lRZ1OfsrYTkCd2hkDnJTKRbO/Rl3orm8vlsUzbA==",
          "dev": true,
          "requires": {
            "source-map": "^0.5.6"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        },
        "webdriver-manager": {
          "version": "12.1.0",
          "resolved": "https://registry.npmjs.org/webdriver-manager/-/webdriver-manager-12.1.0.tgz",
          "integrity": "sha512-oEc5fmkpz6Yh6udhwir5m0eN5mgRPq9P/NU5YWuT3Up5slt6Zz+znhLU7q4+8rwCZz/Qq3Fgpr/4oao7NPCm2A==",
          "dev": true,
          "requires": {
            "adm-zip": "^0.4.9",
            "chalk": "^1.1.1",
            "del": "^2.2.0",
            "glob": "^7.0.3",
            "ini": "^1.3.4",
            "minimist": "^1.2.0",
            "q": "^1.4.1",
            "request": "^2.87.0",
            "rimraf": "^2.5.2",
            "semver": "^5.3.0",
            "xml2js": "^0.4.17"
          }
        }
      }
    },
    "proxy-addr": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.4.tgz",
      "integrity": "sha512-5erio2h9jp5CHGwcybmxmVqHmnCBZeewlfJ0pex+UW7Qny7OOZXTtH56TGNyBizkgiOwhJtMKrVzDTeKcySZwA==",
      "dev": true,
      "requires": {
        "forwarded": "~0.1.2",
        "ipaddr.js": "1.8.0"
      }
    },
    "prr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
      "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY=",
      "dev": true
    },
    "pseudomap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pseudomap/-/pseudomap-1.0.2.tgz",
      "integrity": "sha1-8FKijacOYYkX7wqKw0wa5aaChrM=",
      "dev": true
    },
    "psl": {
      "version": "1.1.29",
      "resolved": "https://registry.npmjs.org/psl/-/psl-1.1.29.tgz",
      "integrity": "sha512-AeUmQ0oLN02flVHXWh9sSJF7mcdFq0ppid/JkErufc3hGIV/AMa8Fo9VgDo/cT2jFdOWoFvHp90qqBH54W+gjQ=="
    },
    "public-encrypt": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
      "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "parse-asn1": "^5.0.0",
        "randombytes": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "pump": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
      "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
      "dev": true,
      "requires": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "pumpify": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
      "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
      "dev": true,
      "requires": {
        "duplexify": "^3.6.0",
        "inherits": "^2.0.3",
        "pump": "^2.0.0"
      }
    },
    "punycode": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
      "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
    },
    "q": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/q/-/q-1.4.1.tgz",
      "integrity": "sha1-VXBbzZPF82c1MMLCy8DCs63cKG4=",
      "dev": true
    },
    "qjobs": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/qjobs/-/qjobs-1.2.0.tgz",
      "integrity": "sha512-8YOJEHtxpySA3fFDyCRxA+UUV+fA+rTWnuWvylOK/NCjhY+b4ocCtmu8TtsWb+mYeU+GCHf/S66KZF/AsteKHg==",
      "dev": true
    },
    "qs": {
      "version": "6.5.2",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
      "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA=="
    },
    "querystring": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
      "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA=",
      "dev": true
    },
    "querystring-es3": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
      "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM=",
      "dev": true
    },
    "querystringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/querystringify/-/querystringify-2.1.0.tgz",
      "integrity": "sha512-sluvZZ1YiTLD5jsqZcDmFyV2EwToyXZBfpoVOmktMmW+VEnhgakFHnasVph65fOjGPTWN0Nw3+XQaSeMayr0kg==",
      "dev": true
    },
    "randomatic": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/randomatic/-/randomatic-3.1.1.tgz",
      "integrity": "sha512-TuDE5KxZ0J461RVjrJZCJc+J+zCkTb1MbH9AQUq68sMhOMcy9jLcb3BrZKgp9q9Ncltdg4QVqWrH02W2EFFVYw==",
      "dev": true,
      "requires": {
        "is-number": "^4.0.0",
        "kind-of": "^6.0.0",
        "math-random": "^1.0.1"
      },
      "dependencies": {
        "is-number": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
          "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
          "dev": true
        }
      }
    },
    "randombytes": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.0.6.tgz",
      "integrity": "sha512-CIQ5OFxf4Jou6uOKe9t1AOgqpeU5fd70A8NPdHSGeYXqXsPe6peOwI0cUl88RWZ6sP1vPMV3avd/R6cZ5/sP1A==",
      "dev": true,
      "requires": {
        "safe-buffer": "^5.1.0"
      }
    },
    "randomfill": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
      "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
      "dev": true,
      "requires": {
        "randombytes": "^2.0.5",
        "safe-buffer": "^5.1.0"
      }
    },
    "range-parser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.0.tgz",
      "integrity": "sha1-9JvmtIeJTdxA3MlKMi9hEJLgDV4=",
      "dev": true
    },
    "raw-body": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.3.3.tgz",
      "integrity": "sha512-9esiElv1BrZoI3rCDuOuKCBRbuApGGaDPQfjSflGxdy4oyzqghxu6klEkkVIvBje+FF0BX9coEv8KqW6X/7njw==",
      "dev": true,
      "requires": {
        "bytes": "3.0.0",
        "http-errors": "1.6.3",
        "iconv-lite": "0.4.23",
        "unpipe": "1.0.0"
      }
    },
    "raw-loader": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/raw-loader/-/raw-loader-0.5.1.tgz",
      "integrity": "sha1-DD0L6u2KAclm2Xh793goElKpeao=",
      "dev": true
    },
    "rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "dev": true,
      "requires": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha1-5mTvMRYRZsl1HNvo28+GtftY93Q=",
      "dev": true,
      "requires": {
        "pify": "^2.3.0"
      },
      "dependencies": {
        "pify": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "read-pkg": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-1.1.0.tgz",
      "integrity": "sha1-9f+qXs0pyzHAR0vKfXVra7KePyg=",
      "dev": true,
      "requires": {
        "load-json-file": "^1.0.0",
        "normalize-package-data": "^2.3.2",
        "path-type": "^1.0.0"
      },
      "dependencies": {
        "path-type": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-1.1.0.tgz",
          "integrity": "sha1-WcRPfuSR2nBNpBXaWkBwuk+P5EE=",
          "dev": true,
          "requires": {
            "graceful-fs": "^4.1.2",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "read-pkg-up": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-1.0.1.tgz",
      "integrity": "sha1-nWPBMnbAZZGNV/ACpX9AobZD+wI=",
      "dev": true,
      "requires": {
        "find-up": "^1.0.0",
        "read-pkg": "^1.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-1.1.2.tgz",
          "integrity": "sha1-ay6YIrGizgpgq2TWEOzK1TyyTQ8=",
          "dev": true,
          "requires": {
            "path-exists": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-2.1.0.tgz",
          "integrity": "sha1-D+tsZPD8UY2adU3V77YscCJ2H0s=",
          "dev": true,
          "requires": {
            "pinkie-promise": "^2.0.0"
          }
        }
      }
    },
    "readable-stream": {
      "version": "2.3.6",
      "resolved": "http://registry.npmjs.org/readable-stream/-/readable-stream-2.3.6.tgz",
      "integrity": "sha512-tQtKA9WIAhBF3+VLAseyMqZeBjW0AHJoxOtYqSUZNJxauErmLbVm2FW1y+J/YA9dUrAC39ITejlZWhVIwawkKw==",
      "dev": true,
      "requires": {
        "core-util-is": "~1.0.0",
        "inherits": "~2.0.3",
        "isarray": "~1.0.0",
        "process-nextick-args": "~2.0.0",
        "safe-buffer": "~5.1.1",
        "string_decoder": "~1.1.1",
        "util-deprecate": "~1.0.1"
      }
    },
    "readdirp": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
      "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.11",
        "micromatch": "^3.1.10",
        "readable-stream": "^2.0.2"
      }
    },
    "rechoir": {
      "version": "0.6.2",
      "resolved": "https://registry.npmjs.org/rechoir/-/rechoir-0.6.2.tgz",
      "integrity": "sha1-hSBLVNuoLVdC4oyWdW70OvUOM4Q=",
      "dev": true,
      "requires": {
        "resolve": "^1.1.6"
      }
    },
    "redent": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/redent/-/redent-1.0.0.tgz",
      "integrity": "sha1-z5Fqsf1fHxbfsggi3W7H9zDCr94=",
      "dev": true,
      "requires": {
        "indent-string": "^2.1.0",
        "strip-indent": "^1.0.1"
      }
    },
    "reflect-metadata": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/reflect-metadata/-/reflect-metadata-0.1.12.tgz",
      "integrity": "sha512-n+IyV+nGz3+0q3/Yf1ra12KpCyi001bi4XFxSjbiWWjfqb52iTTtpGXmCCAOWWIAn9KEuFZKGqBERHmrtScZ3A==",
      "dev": true
    },
    "regenerate": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.0.tgz",
      "integrity": "sha512-1G6jJVDWrt0rK99kBjvEtziZNCICAuvIPkSiUFIQxVP06RCVpq3dmDo2oi6ABpYaDYaTRr67BEhL8r1wgEZZKg==",
      "dev": true
    },
    "regenerator-runtime": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
      "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg==",
      "dev": true
    },
    "regex-cache": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/regex-cache/-/regex-cache-0.4.4.tgz",
      "integrity": "sha512-nVIZwtCjkC9YgvWkpM55B5rBhBYRZhAaJbgcFYXXsHnbZ9UZI9nnVWYZpBlCqv9ho2eZryPnWrZGsOdPwVWXWQ==",
      "dev": true,
      "requires": {
        "is-equal-shallow": "^0.1.3"
      }
    },
    "regex-not": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
      "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
      "dev": true,
      "requires": {
        "extend-shallow": "^3.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "regexpu-core": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-1.0.0.tgz",
      "integrity": "sha1-hqdj9Y7k18L2sQLkdkBQ3n7ZDGs=",
      "dev": true,
      "requires": {
        "regenerate": "^1.2.1",
        "regjsgen": "^0.2.0",
        "regjsparser": "^0.1.4"
      }
    },
    "registry-auth-token": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/registry-auth-token/-/registry-auth-token-3.3.2.tgz",
      "integrity": "sha512-JL39c60XlzCVgNrO+qq68FoNb56w/m7JYvGR2jT5iR1xBrUA3Mfx5Twk5rqTThPmQKMWydGmq8oFtDlxfrmxnQ==",
      "dev": true,
      "requires": {
        "rc": "^1.1.6",
        "safe-buffer": "^5.0.1"
      }
    },
    "registry-url": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/registry-url/-/registry-url-3.1.0.tgz",
      "integrity": "sha1-PU74cPc93h138M+aOBQyRE4XSUI=",
      "dev": true,
      "requires": {
        "rc": "^1.0.1"
      }
    },
    "regjsgen": {
      "version": "0.2.0",
      "resolved": "http://registry.npmjs.org/regjsgen/-/regjsgen-0.2.0.tgz",
      "integrity": "sha1-bAFq3qxVT3WCP+N6wFuS1aTtsfc=",
      "dev": true
    },
    "regjsparser": {
      "version": "0.1.5",
      "resolved": "http://registry.npmjs.org/regjsparser/-/regjsparser-0.1.5.tgz",
      "integrity": "sha1-fuj4Tcb6eS0/0K4ijSS9lJ6tIFw=",
      "dev": true,
      "requires": {
        "jsesc": "~0.5.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "http://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0=",
          "dev": true
        }
      }
    },
    "remove-trailing-separator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8=",
      "dev": true
    },
    "repeat-element": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
      "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g==",
      "dev": true
    },
    "repeat-string": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
      "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc=",
      "dev": true
    },
    "repeating": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/repeating/-/repeating-2.0.1.tgz",
      "integrity": "sha1-UhTFOpJtNVJwdSf7q0FdvAjQbdo=",
      "dev": true,
      "requires": {
        "is-finite": "^1.0.0"
      }
    },
    "request": {
      "version": "2.88.0",
      "resolved": "https://registry.npmjs.org/request/-/request-2.88.0.tgz",
      "integrity": "sha512-NAqBSrijGLZdM0WZNsInLJpkJokL72XYjUpnB0iwsRgxh7dB6COrHnTBNwN0E+lHDAJzu7kLAkDeY08z2/A0hg==",
      "requires": {
        "aws-sign2": "~0.7.0",
        "aws4": "^1.8.0",
        "caseless": "~0.12.0",
        "combined-stream": "~1.0.6",
        "extend": "~3.0.2",
        "forever-agent": "~0.6.1",
        "form-data": "~2.3.2",
        "har-validator": "~5.1.0",
        "http-signature": "~1.2.0",
        "is-typedarray": "~1.0.0",
        "isstream": "~0.1.2",
        "json-stringify-safe": "~5.0.1",
        "mime-types": "~2.1.19",
        "oauth-sign": "~0.9.0",
        "performance-now": "^2.1.0",
        "qs": "~6.5.2",
        "safe-buffer": "^5.1.2",
        "tough-cookie": "~2.4.3",
        "tunnel-agent": "^0.6.0",
        "uuid": "^3.3.2"
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I=",
      "dev": true
    },
    "require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "dev": true
    },
    "require-main-filename": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-1.0.1.tgz",
      "integrity": "sha1-l/cXtp1IeE9fUmpsWqj/3aBVpNE=",
      "dev": true
    },
    "requires-port": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
      "integrity": "sha1-kl0mAdOaxIXgkc8NpcbmlNw9yv8=",
      "dev": true
    },
    "resolve": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.1.7.tgz",
      "integrity": "sha1-IDEU2CrSxe2ejgQRs5ModeiJ6Xs=",
      "dev": true
    },
    "resolve-cwd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-2.0.0.tgz",
      "integrity": "sha1-AKn3OHVW4nA46uIyyqNypqWbZlo=",
      "dev": true,
      "requires": {
        "resolve-from": "^3.0.0"
      }
    },
    "resolve-from": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
      "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g=",
      "dev": true
    },
    "resolve-url": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo=",
      "dev": true
    },
    "restore-cursor": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-2.0.0.tgz",
      "integrity": "sha1-n37ih/gv0ybU/RYpI9YhKe7g368=",
      "dev": true,
      "requires": {
        "onetime": "^2.0.0",
        "signal-exit": "^3.0.2"
      }
    },
    "ret": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg==",
      "dev": true
    },
    "retry": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/retry/-/retry-0.10.1.tgz",
      "integrity": "sha1-52OI0heZLCUnUCQdPTlW/tmNj/Q=",
      "dev": true
    },
    "rfdc": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/rfdc/-/rfdc-1.1.2.tgz",
      "integrity": "sha512-92ktAgvZhBzYTIK0Mja9uen5q5J3NRVMoDkJL2VMwq6SXjVCgqvQeVP2XAaUY6HT+XpQYeLSjb3UoitBryKmdA==",
      "dev": true
    },
    "rgbcolor": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgbcolor/-/rgbcolor-1.0.1.tgz",
      "integrity": "sha1-1lBezbMEplldom+ktDMHMGd1lF0="
    },
    "rimraf": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.6.2.tgz",
      "integrity": "sha512-lreewLK/BlghmxtfH36YYVg1i8IAce4TI7oao75I1g245+6BctqTVQiBP3YUJ9C6DQOXJmkYR9X9fCLtCOJc5w==",
      "dev": true,
      "requires": {
        "glob": "^7.0.5"
      }
    },
    "ripemd160": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
      "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
      "dev": true,
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1"
      }
    },
    "rollup": {
      "version": "0.67.4",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-0.67.4.tgz",
      "integrity": "sha512-AVuP73mkb4BBMUmksQ3Jw0jTrBTU1i7rLiUYjFxLZGb3xiFmtVEg40oByphkZAsiL0bJC3hRAJUQos/e5EBd+w==",
      "dev": true,
      "requires": {
        "@types/estree": "0.0.39",
        "@types/node": "*"
      }
    },
    "rollup-plugin-commonjs": {
      "version": "9.2.0",
      "resolved": "https://registry.npmjs.org/rollup-plugin-commonjs/-/rollup-plugin-commonjs-9.2.0.tgz",
      "integrity": "sha512-0RM5U4Vd6iHjL6rLvr3lKBwnPsaVml+qxOGaaNUWN1lSq6S33KhITOfHmvxV3z2vy9Mk4t0g4rNlVaJJsNQPWA==",
      "dev": true,
      "requires": {
        "estree-walker": "^0.5.2",
        "magic-string": "^0.25.1",
        "resolve": "^1.8.1",
        "rollup-pluginutils": "^2.3.3"
      },
      "dependencies": {
        "resolve": {
          "version": "1.8.1",
          "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.8.1.tgz",
          "integrity": "sha512-AicPrAC7Qu1JxPCZ9ZgCZlY35QgFnNqc+0LtbRNxnVw4TXvjQ72wnuL9JQcEBgXkI9JM8MsT9kaQoHcpCRJOYA==",
          "dev": true,
          "requires": {
            "path-parse": "^1.0.5"
          }
        }
      }
    },
    "rollup-plugin-json": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/rollup-plugin-json/-/rollup-plugin-json-3.1.0.tgz",
      "integrity": "sha512-BlYk5VspvGpjz7lAwArVzBXR60JK+4EKtPkCHouAWg39obk9S61hZYJDBfMK+oitPdoe11i69TlxKlMQNFC/Uw==",
      "dev": true,
      "requires": {
        "rollup-pluginutils": "^2.3.1"
      }
    },
    "rollup-plugin-node-resolve": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/rollup-plugin-node-resolve/-/rollup-plugin-node-resolve-3.4.0.tgz",
      "integrity": "sha512-PJcd85dxfSBWih84ozRtBkB731OjXk0KnzN0oGp7WOWcarAFkVa71cV5hTJg2qpVsV2U8EUwrzHP3tvy9vS3qg==",
      "dev": true,
      "requires": {
        "builtin-modules": "^2.0.0",
        "is-module": "^1.0.0",
        "resolve": "^1.1.6"
      },
      "dependencies": {
        "builtin-modules": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-2.0.0.tgz",
          "integrity": "sha512-3U5kUA5VPsRUA3nofm/BXX7GVHKfxz0hOBAPxXrIvHzlDRkQVqEn6yi8QJegxl4LzOHLdvb7XF5dVawa/VVYBg==",
          "dev": true
        }
      }
    },
    "rollup-plugin-sourcemaps": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/rollup-plugin-sourcemaps/-/rollup-plugin-sourcemaps-0.4.2.tgz",
      "integrity": "sha1-YhJaqUCHqt97g+9N+vYptHMTXoc=",
      "dev": true,
      "requires": {
        "rollup-pluginutils": "^2.0.1",
        "source-map-resolve": "^0.5.0"
      }
    },
    "rollup-pluginutils": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/rollup-pluginutils/-/rollup-pluginutils-2.3.3.tgz",
      "integrity": "sha512-2XZwja7b6P5q4RZ5FhyX1+f46xi1Z3qBKigLRZ6VTZjwbN0K1IFGMlwm06Uu0Emcre2Z63l77nq/pzn+KxIEoA==",
      "dev": true,
      "requires": {
        "estree-walker": "^0.5.2",
        "micromatch": "^2.3.11"
      },
      "dependencies": {
        "arr-diff": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
          "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
          "dev": true,
          "requires": {
            "arr-flatten": "^1.0.1"
          }
        },
        "array-unique": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
          "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
          "dev": true
        },
        "braces": {
          "version": "1.8.5",
          "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
          "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
          "dev": true,
          "requires": {
            "expand-range": "^1.8.1",
            "preserve": "^0.2.0",
            "repeat-element": "^1.1.2"
          }
        },
        "expand-brackets": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
          "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
          "dev": true,
          "requires": {
            "is-posix-bracket": "^0.1.0"
          }
        },
        "extglob": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
          "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        },
        "is-extglob": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
          "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
          "dev": true
        },
        "is-glob": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
          "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
          "dev": true,
          "requires": {
            "is-extglob": "^1.0.0"
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        },
        "micromatch": {
          "version": "2.3.11",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
          "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
          "dev": true,
          "requires": {
            "arr-diff": "^2.0.0",
            "array-unique": "^0.2.1",
            "braces": "^1.8.2",
            "expand-brackets": "^0.1.4",
            "extglob": "^0.3.1",
            "filename-regex": "^2.0.0",
            "is-extglob": "^1.0.0",
            "is-glob": "^2.0.1",
            "kind-of": "^3.0.2",
            "normalize-path": "^2.0.1",
            "object.omit": "^2.0.0",
            "parse-glob": "^3.0.4",
            "regex-cache": "^0.4.2"
          }
        }
      }
    },
    "run-async": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/run-async/-/run-async-2.3.0.tgz",
      "integrity": "sha1-A3GrSuC91yDUFm19/aZP96RFpsA=",
      "dev": true,
      "requires": {
        "is-promise": "^2.1.0"
      }
    },
    "run-queue": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
      "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1"
      }
    },
    "rx": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/rx/-/rx-4.1.0.tgz",
      "integrity": "sha1-pfE/957zt0D+MKqAP7CfmIBdR4I=",
      "dev": true
    },
    "rxjs": {
      "version": "6.3.3",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.3.3.tgz",
      "integrity": "sha512-JTWmoY9tWCs7zvIk/CvRjhjGaOd+OVBM987mxFo+OW66cGpdKjZcpmc74ES1sB//7Kl/PAe8+wEakuhG4pcgOw==",
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
    },
    "safe-regex": {
      "version": "1.1.0",
      "resolved": "http://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
      "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
      "dev": true,
      "requires": {
        "ret": "~0.1.10"
      }
    },
    "safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
    },
    "sass-graph": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/sass-graph/-/sass-graph-2.2.4.tgz",
      "integrity": "sha1-E/vWPNHK8JCLn9k0dq1DpR0eC0k=",
      "dev": true,
      "requires": {
        "glob": "^7.0.0",
        "lodash": "^4.0.0",
        "scss-tokenizer": "^0.2.3",
        "yargs": "^7.0.0"
      }
    },
    "sass-loader": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-7.1.0.tgz",
      "integrity": "sha512-+G+BKGglmZM2GUSfT9TLuEp6tzehHPjAMoRRItOojWIqIGPloVCMhNIQuG639eJ+y033PaGTSjLaTHts8Kw79w==",
      "dev": true,
      "requires": {
        "clone-deep": "^2.0.1",
        "loader-utils": "^1.0.1",
        "lodash.tail": "^4.1.1",
        "neo-async": "^2.5.0",
        "pify": "^3.0.0",
        "semver": "^5.5.0"
      }
    },
    "saucelabs": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/saucelabs/-/saucelabs-1.5.0.tgz",
      "integrity": "sha512-jlX3FGdWvYf4Q3LFfFWS1QvPg3IGCGWxIc8QBFdPTbpTJnt/v17FHXYVAn7C8sHf1yUXo2c7yIM0isDryfYtHQ==",
      "dev": true,
      "requires": {
        "https-proxy-agent": "^2.2.1"
      }
    },
    "sax": {
      "version": "0.5.8",
      "resolved": "http://registry.npmjs.org/sax/-/sax-0.5.8.tgz",
      "integrity": "sha1-1HLbIo6zMcJQaw6MFVJK25OdEsE=",
      "dev": true
    },
    "schema-utils": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
      "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
      "dev": true,
      "requires": {
        "ajv": "^6.1.0",
        "ajv-errors": "^1.0.0",
        "ajv-keywords": "^3.1.0"
      }
    },
    "scss-tokenizer": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/scss-tokenizer/-/scss-tokenizer-0.2.3.tgz",
      "integrity": "sha1-jrBtualyMzOCTT9VMGQRSYR85dE=",
      "dev": true,
      "requires": {
        "js-base64": "^2.1.8",
        "source-map": "^0.4.2"
      },
      "dependencies": {
        "source-map": {
          "version": "0.4.4",
          "resolved": "http://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz",
          "integrity": "sha1-66T12pwNyZneaAMti092FzZSA2s=",
          "dev": true,
          "requires": {
            "amdefine": ">=0.0.4"
          }
        }
      }
    },
    "select-hose": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
      "integrity": "sha1-Yl2GWPhlr0Psliv8N2o3NZpJlMo=",
      "dev": true
    },
    "selenium-webdriver": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/selenium-webdriver/-/selenium-webdriver-3.6.0.tgz",
      "integrity": "sha512-WH7Aldse+2P5bbFBO4Gle/nuQOdVwpHMTL6raL3uuBj/vPG07k6uzt3aiahu352ONBr5xXh0hDlM3LhtXPOC4Q==",
      "dev": true,
      "requires": {
        "jszip": "^3.1.3",
        "rimraf": "^2.5.4",
        "tmp": "0.0.30",
        "xml2js": "^0.4.17"
      },
      "dependencies": {
        "tmp": {
          "version": "0.0.30",
          "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.30.tgz",
          "integrity": "sha1-ckGdSovn1s51FI/YsyTlk6cRwu0=",
          "dev": true,
          "requires": {
            "os-tmpdir": "~1.0.1"
          }
        }
      }
    },
    "selfsigned": {
      "version": "1.10.4",
      "resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-1.10.4.tgz",
      "integrity": "sha512-9AukTiDmHXGXWtWjembZ5NDmVvP2695EtpgbCsxCa68w3c88B+alqbmZ4O3hZ4VWGXeGWzEVdvqgAJD8DQPCDw==",
      "dev": true,
      "requires": {
        "node-forge": "0.7.5"
      }
    },
    "semver": {
      "version": "5.5.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-5.5.1.tgz",
      "integrity": "sha512-PqpAxfrEhlSUWge8dwIp4tZnQ25DIOthpiaHNIthsjEFQD6EvqUKUDM7L8O2rShkFccYo1VjJR0coWfNkCubRw==",
      "dev": true
    },
    "semver-diff": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/semver-diff/-/semver-diff-2.1.0.tgz",
      "integrity": "sha1-S7uEN8jTfksM8aaP1ybsbWRdbTY=",
      "dev": true,
      "requires": {
        "semver": "^5.0.3"
      }
    },
    "semver-dsl": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/semver-dsl/-/semver-dsl-1.0.1.tgz",
      "integrity": "sha1-02eN5VVeimH2Ke7QJTZq5fJzQKA=",
      "dev": true,
      "requires": {
        "semver": "^5.3.0"
      }
    },
    "semver-intersect": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/semver-intersect/-/semver-intersect-1.4.0.tgz",
      "integrity": "sha512-d8fvGg5ycKAq0+I6nfWeCx6ffaWJCsBYU0H2Rq56+/zFePYfT8mXkB3tWBSjR5BerkHNZ5eTPIk1/LBYas35xQ==",
      "dev": true,
      "requires": {
        "semver": "^5.0.0"
      }
    },
    "send": {
      "version": "0.16.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.16.2.tgz",
      "integrity": "sha512-E64YFPUssFHEFBvpbbjr44NCLtI1AohxQ8ZSiJjQLskAdKuriYEP6VyGEsRDH8ScozGpkaX1BGvhanqCwkcEZw==",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "destroy": "~1.0.4",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "~1.6.2",
        "mime": "1.4.1",
        "ms": "2.0.0",
        "on-finished": "~2.3.0",
        "range-parser": "~1.2.0",
        "statuses": "~1.4.0"
      },
      "dependencies": {
        "mime": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/mime/-/mime-1.4.1.tgz",
          "integrity": "sha512-KI1+qOZu5DcW6wayYHSzR/tXKCDC5Om4s1z2QJjDULzLcmf3DvzS7oluY4HCTrc+9FiKmWUgeNLg7W3uIQvxtQ==",
          "dev": true
        }
      }
    },
    "serialize-javascript": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-1.5.0.tgz",
      "integrity": "sha512-Ga8c8NjAAp46Br4+0oZ2WxJCwIzwP60Gq1YPgU+39PiTVxyed/iKE/zyZI6+UlVYH5Q4PaQdHhcegIFPZTUfoQ==",
      "dev": true
    },
    "serve-index": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.1.tgz",
      "integrity": "sha1-03aNabHn2C5c4FD/9bRTvqEqkjk=",
      "dev": true,
      "requires": {
        "accepts": "~1.3.4",
        "batch": "0.6.1",
        "debug": "2.6.9",
        "escape-html": "~1.0.3",
        "http-errors": "~1.6.2",
        "mime-types": "~2.1.17",
        "parseurl": "~1.3.2"
      }
    },
    "serve-static": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.13.2.tgz",
      "integrity": "sha512-p/tdJrO4U387R9oMjb1oj7qSMaMfmOyd4j9hOFoxZe2baQszgHcSWjuya/CiT5kgZZKRudHNOA0pYXOl8rQ5nw==",
      "dev": true,
      "requires": {
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.2",
        "send": "0.16.2"
      }
    },
    "set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
      "dev": true
    },
    "set-value": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.0.tgz",
      "integrity": "sha512-hw0yxk9GT/Hr5yJEYnHNKYXkIA8mVJgd9ditYZCe16ZczcaELYYcfvaXesNACk2O8O0nTiPQcQhGUQj8JLzeeg==",
      "dev": true,
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-extendable": "^0.1.1",
        "is-plain-object": "^2.0.3",
        "split-string": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        }
      }
    },
    "setimmediate": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
      "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU=",
      "dev": true
    },
    "setprototypeof": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
      "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ==",
      "dev": true
    },
    "sha.js": {
      "version": "2.4.11",
      "resolved": "http://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
      "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "shallow-clone": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-1.0.0.tgz",
      "integrity": "sha512-oeXreoKR/SyNJtRJMAKPDSvd28OqEwG4eR/xc856cRGBII7gX9lvAqDxusPm0846z/w/hWYjI1NpKwJ00NHzRA==",
      "dev": true,
      "requires": {
        "is-extendable": "^0.1.1",
        "kind-of": "^5.0.0",
        "mixin-object": "^2.0.1"
      },
      "dependencies": {
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "shebang-command": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
      "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
      "dev": true,
      "requires": {
        "shebang-regex": "^1.0.0"
      }
    },
    "shebang-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
      "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM=",
      "dev": true
    },
    "shelljs": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/shelljs/-/shelljs-0.8.3.tgz",
      "integrity": "sha512-fc0BKlAWiLpwZljmOvAOTE/gXawtCoNrP5oaY7KIaQbbyHeQVg01pSEuEGvGh3HEdBU4baCD7wQBwADmM/7f7A==",
      "dev": true,
      "requires": {
        "glob": "^7.0.0",
        "interpret": "^1.0.0",
        "rechoir": "^0.6.2"
      }
    },
    "signal-exit": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.2.tgz",
      "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0=",
      "dev": true
    },
    "slash": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
      "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU=",
      "dev": true
    },
    "smart-buffer": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/smart-buffer/-/smart-buffer-4.0.1.tgz",
      "integrity": "sha512-RFqinRVJVcCAL9Uh1oVqE6FZkqsyLiVOYEZ20TqIOjuX7iFVJ+zsbs4RIghnw/pTs7mZvt8ZHhvm1ZUrR4fykg==",
      "dev": true
    },
    "snapdragon": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
      "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
      "dev": true,
      "requires": {
        "base": "^0.11.1",
        "debug": "^2.2.0",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "map-cache": "^0.2.2",
        "source-map": "^0.5.6",
        "source-map-resolve": "^0.5.0",
        "use": "^3.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        }
      }
    },
    "snapdragon-node": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
      "dev": true,
      "requires": {
        "define-property": "^1.0.0",
        "isobject": "^3.0.0",
        "snapdragon-util": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "snapdragon-util": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
      "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
      "dev": true,
      "requires": {
        "kind-of": "^3.2.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "socket.io": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/socket.io/-/socket.io-2.1.1.tgz",
      "integrity": "sha512-rORqq9c+7W0DAK3cleWNSyfv/qKXV99hV4tZe+gGLfBECw3XEhBy7x85F3wypA9688LKjtwO9pX9L33/xQI8yA==",
      "dev": true,
      "requires": {
        "debug": "~3.1.0",
        "engine.io": "~3.2.0",
        "has-binary2": "~1.0.2",
        "socket.io-adapter": "~1.1.0",
        "socket.io-client": "2.1.1",
        "socket.io-parser": "~3.2.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "socket.io-adapter": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/socket.io-adapter/-/socket.io-adapter-1.1.1.tgz",
      "integrity": "sha1-KoBeihTWNyEk3ZFZrUUC+MsH8Gs=",
      "dev": true
    },
    "socket.io-client": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/socket.io-client/-/socket.io-client-2.1.1.tgz",
      "integrity": "sha512-jxnFyhAuFxYfjqIgduQlhzqTcOEQSn+OHKVfAxWaNWa7ecP7xSNk2Dx/3UEsDcY7NcFafxvNvKPmmO7HTwTxGQ==",
      "dev": true,
      "requires": {
        "backo2": "1.0.2",
        "base64-arraybuffer": "0.1.5",
        "component-bind": "1.0.0",
        "component-emitter": "1.2.1",
        "debug": "~3.1.0",
        "engine.io-client": "~3.2.0",
        "has-binary2": "~1.0.2",
        "has-cors": "1.1.0",
        "indexof": "0.0.1",
        "object-component": "0.0.3",
        "parseqs": "0.0.5",
        "parseuri": "0.0.5",
        "socket.io-parser": "~3.2.0",
        "to-array": "0.1.4"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        }
      }
    },
    "socket.io-parser": {
      "version": "3.2.0",
      "resolved": "http://registry.npmjs.org/socket.io-parser/-/socket.io-parser-3.2.0.tgz",
      "integrity": "sha512-FYiBx7rc/KORMJlgsXysflWx/RIvtqZbyGLlHZvjfmPTPeuD/I8MaW7cfFrj5tRltICJdgwflhfZ3NVVbVLFQA==",
      "dev": true,
      "requires": {
        "component-emitter": "1.2.1",
        "debug": "~3.1.0",
        "isarray": "2.0.1"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "isarray": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.1.tgz",
          "integrity": "sha1-o32U7ZzaLVmGXJ92/llu4fM4dB4=",
          "dev": true
        }
      }
    },
    "sockjs": {
      "version": "0.3.19",
      "resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.19.tgz",
      "integrity": "sha512-V48klKZl8T6MzatbLlzzRNhMepEys9Y4oGFpypBFFn1gLI/QQ9HtLLyWJNbPlwGLelOVOEijUbTTJeLLI59jLw==",
      "dev": true,
      "requires": {
        "faye-websocket": "^0.10.0",
        "uuid": "^3.0.1"
      }
    },
    "sockjs-client": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/sockjs-client/-/sockjs-client-1.3.0.tgz",
      "integrity": "sha512-R9jxEzhnnrdxLCNln0xg5uGHqMnkhPSTzUZH2eXcR03S/On9Yvoq2wyUZILRUhZCNVu2PmwWVoyuiPz8th8zbg==",
      "dev": true,
      "requires": {
        "debug": "^3.2.5",
        "eventsource": "^1.0.7",
        "faye-websocket": "~0.11.1",
        "inherits": "^2.0.3",
        "json3": "^3.3.2",
        "url-parse": "^1.4.3"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "faye-websocket": {
          "version": "0.11.1",
          "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.1.tgz",
          "integrity": "sha1-8O/hjE9W5PQK/H4Gxxn9XuYYjzg=",
          "dev": true,
          "requires": {
            "websocket-driver": ">=0.5.1"
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        }
      }
    },
    "socks": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/socks/-/socks-2.2.2.tgz",
      "integrity": "sha512-g6wjBnnMOZpE0ym6e0uHSddz9p3a+WsBaaYQaBaSCJYvrC4IXykQR9MNGjLQf38e9iIIhp3b1/Zk8YZI3KGJ0Q==",
      "dev": true,
      "requires": {
        "ip": "^1.1.5",
        "smart-buffer": "^4.0.1"
      }
    },
    "socks-proxy-agent": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/socks-proxy-agent/-/socks-proxy-agent-4.0.1.tgz",
      "integrity": "sha512-Kezx6/VBguXOsEe5oU3lXYyKMi4+gva72TwJ7pQY5JfqUx2nMk7NXA6z/mpNqIlfQjWYVfeuNvQjexiTaTn6Nw==",
      "dev": true,
      "requires": {
        "agent-base": "~4.2.0",
        "socks": "~2.2.0"
      }
    },
    "source-list-map": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
      "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw==",
      "dev": true
    },
    "source-map": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.3.tgz",
      "integrity": "sha512-CkCj6giN3S+n9qrYiBTX5gystlENnRW5jZeNLHpe6aue+SrHcG5VYwujhW9s4dY31mEGsxBDrHR6oI69fTXsaQ==",
      "dev": true
    },
    "source-map-loader": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/source-map-loader/-/source-map-loader-0.2.4.tgz",
      "integrity": "sha512-OU6UJUty+i2JDpTItnizPrlpOIBLmQbWMuBg9q5bVtnHACqw1tn9nNwqJLbv0/00JjnJb/Ee5g5WS5vrRv7zIQ==",
      "dev": true,
      "requires": {
        "async": "^2.5.0",
        "loader-utils": "^1.1.0"
      },
      "dependencies": {
        "async": {
          "version": "2.6.1",
          "resolved": "https://registry.npmjs.org/async/-/async-2.6.1.tgz",
          "integrity": "sha512-fNEiL2+AZt6AlAw/29Cr0UDe4sRAHCpEHh54WMz+Bb7QfNcFw4h3loofyJpLeQs4Yx7yuqu/2dLgM5hKOs6HlQ==",
          "dev": true,
          "requires": {
            "lodash": "^4.17.10"
          }
        }
      }
    },
    "source-map-resolve": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.2.tgz",
      "integrity": "sha512-MjqsvNwyz1s0k81Goz/9vRBe9SZdB09Bdw+/zYyO+3CuPk6fouTaxscHkgtE8jKvf01kVfl8riHzERQ/kefaSA==",
      "dev": true,
      "requires": {
        "atob": "^2.1.1",
        "decode-uri-component": "^0.2.0",
        "resolve-url": "^0.2.1",
        "source-map-url": "^0.4.0",
        "urix": "^0.1.0"
      }
    },
    "source-map-support": {
      "version": "0.5.9",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.9.tgz",
      "integrity": "sha512-gR6Rw4MvUlYy83vP0vxoVNzM6t8MUXqNuRsuBmBHQDu1Fh6X015FrLdgoDKcNdkwGubozq0P4N0Q37UyFVr1EA==",
      "dev": true,
      "requires": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "source-map-url": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
      "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM=",
      "dev": true
    },
    "sourcemap-codec": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/sourcemap-codec/-/sourcemap-codec-1.4.4.tgz",
      "integrity": "sha512-CYAPYdBu34781kLHkaW3m6b/uUSyMOC2R61gcYMWooeuaGtjof86ZA/8T+qVPPt7np1085CR9hmMGrySwEc8Xg==",
      "dev": true
    },
    "spdx-correct": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.0.2.tgz",
      "integrity": "sha512-q9hedtzyXHr5S0A1vEPoK/7l8NpfkFYTq6iCY+Pno2ZbdZR6WexZFtqeVGkGxW3TEJMN914Z55EnAGMmenlIQQ==",
      "dev": true,
      "requires": {
        "spdx-expression-parse": "^3.0.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-exceptions": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.2.0.tgz",
      "integrity": "sha512-2XQACfElKi9SlVb1CYadKDXvoajPgBVPn/gOQLrTvHdElaVhr7ZEbqJaRnJLVNeaI4cMEAgVCeBMKF6MWRDCRA==",
      "dev": true
    },
    "spdx-expression-parse": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.0.tgz",
      "integrity": "sha512-Yg6D3XpRD4kkOmTpdgbUiEJFKghJH03fiC1OPll5h/0sO6neh2jqRDVHOQ4o/LMea0tgCkbMgea5ip/e+MkWyg==",
      "dev": true,
      "requires": {
        "spdx-exceptions": "^2.1.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-license-ids": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.2.tgz",
      "integrity": "sha512-qky9CVt0lVIECkEsYbNILVnPvycuEBkXoMFLRWsREkomQLevYhtRKC+R91a5TOAQ3bCMjikRwhyaRqj1VYatYg==",
      "dev": true
    },
    "spdy": {
      "version": "3.4.7",
      "resolved": "https://registry.npmjs.org/spdy/-/spdy-3.4.7.tgz",
      "integrity": "sha1-Qv9B7OXMD5mjpsKKq7c/XDsDrLw=",
      "dev": true,
      "requires": {
        "debug": "^2.6.8",
        "handle-thing": "^1.2.5",
        "http-deceiver": "^1.2.7",
        "safe-buffer": "^5.0.1",
        "select-hose": "^2.0.0",
        "spdy-transport": "^2.0.18"
      }
    },
    "spdy-transport": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-2.1.1.tgz",
      "integrity": "sha512-q7D8c148escoB3Z7ySCASadkegMmUZW8Wb/Q1u0/XBgDKMO880rLQDj8Twiew/tYi7ghemKUi/whSYOwE17f5Q==",
      "dev": true,
      "requires": {
        "debug": "^2.6.8",
        "detect-node": "^2.0.3",
        "hpack.js": "^2.1.6",
        "obuf": "^1.1.1",
        "readable-stream": "^2.2.9",
        "safe-buffer": "^5.0.1",
        "wbuf": "^1.7.2"
      }
    },
    "speed-measure-webpack-plugin": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/speed-measure-webpack-plugin/-/speed-measure-webpack-plugin-1.2.3.tgz",
      "integrity": "sha512-p+taQ69VkRUXYMoZOx2nxV/Tz8tt79ahctoZJyJDHWP7fEYvwFNf5Pd73k5kZ6auu0pTsPNLEUwWpM8mCk85Zw==",
      "dev": true,
      "requires": {
        "chalk": "^2.0.1"
      }
    },
    "split-string": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
      "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
      "dev": true,
      "requires": {
        "extend-shallow": "^3.0.0"
      }
    },
    "sprintf-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
      "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw=",
      "dev": true
    },
    "sshpk": {
      "version": "1.15.2",
      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.15.2.tgz",
      "integrity": "sha512-Ra/OXQtuh0/enyl4ETZAfTaeksa6BXks5ZcjpSUNrjBr0DvrJKX+1fsKDPpT9TBXgHAFsa4510aNVgI8g/+SzA==",
      "requires": {
        "asn1": "~0.2.3",
        "assert-plus": "^1.0.0",
        "bcrypt-pbkdf": "^1.0.0",
        "dashdash": "^1.12.0",
        "ecc-jsbn": "~0.1.1",
        "getpass": "^0.1.1",
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.0.2",
        "tweetnacl": "~0.14.0"
      }
    },
    "ssri": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/ssri/-/ssri-5.3.0.tgz",
      "integrity": "sha512-XRSIPqLij52MtgoQavH/x/dU1qVKtWUAAZeOHsR9c2Ddi4XerFy3mc1alf+dLJKl9EUIm/Ht+EowFkTUOA6GAQ==",
      "dev": true,
      "requires": {
        "safe-buffer": "^5.1.1"
      }
    },
    "stackblur": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/stackblur/-/stackblur-1.0.0.tgz",
      "integrity": "sha1-tAen4FyTsI1miDu4CNfLo6UD8S8="
    },
    "stackblur-canvas": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/stackblur-canvas/-/stackblur-canvas-1.4.1.tgz",
      "integrity": "sha1-hJqm+UsnL/JvZHH6QTDtH35HlVs="
    },
    "static-extend": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
      "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
      "dev": true,
      "requires": {
        "define-property": "^0.2.5",
        "object-copy": "^0.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "stats-webpack-plugin": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/stats-webpack-plugin/-/stats-webpack-plugin-0.7.0.tgz",
      "integrity": "sha512-NT0YGhwuQ0EOX+uPhhUcI6/+1Sq/pMzNuSCBVT4GbFl/ac6I/JZefBcjlECNfAb1t3GOx5dEj1Z7x0cAxeeVLQ==",
      "dev": true,
      "requires": {
        "lodash": "^4.17.4"
      }
    },
    "statuses": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.4.0.tgz",
      "integrity": "sha512-zhSCtt8v2NDrRlPQpCNtw/heZLtfUDqxBM1udqikb/Hbk52LK4nQSwr10u77iopCW5LsyHpuXS0GnEc48mLeew==",
      "dev": true
    },
    "stdout-stream": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/stdout-stream/-/stdout-stream-1.4.1.tgz",
      "integrity": "sha512-j4emi03KXqJWcIeF8eIXkjMFN1Cmb8gUlDYGeBALLPo5qdyTfA9bOtl8m33lRoC+vFMkP3gl0WsDr6+gzxbbTA==",
      "dev": true,
      "requires": {
        "readable-stream": "^2.0.1"
      }
    },
    "stream-browserify": {
      "version": "2.0.1",
      "resolved": "http://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.1.tgz",
      "integrity": "sha1-ZiZu5fm9uZQKTkUUyvtDu3Hlyds=",
      "dev": true,
      "requires": {
        "inherits": "~2.0.1",
        "readable-stream": "^2.0.2"
      }
    },
    "stream-each": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
      "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
      "dev": true,
      "requires": {
        "end-of-stream": "^1.1.0",
        "stream-shift": "^1.0.0"
      }
    },
    "stream-http": {
      "version": "2.8.3",
      "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
      "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
      "dev": true,
      "requires": {
        "builtin-status-codes": "^3.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.3.6",
        "to-arraybuffer": "^1.0.0",
        "xtend": "^4.0.0"
      }
    },
    "stream-shift": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.0.tgz",
      "integrity": "sha1-1cdSgl5TZ+eG944Y5EXqIjoVWVI=",
      "dev": true
    },
    "streamroller": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/streamroller/-/streamroller-0.7.0.tgz",
      "integrity": "sha512-WREzfy0r0zUqp3lGO096wRuUp7ho1X6uo/7DJfTlEi0Iv/4gT7YHqXDjKC2ioVGBZtE8QzsQD9nx1nIuoZ57jQ==",
      "dev": true,
      "requires": {
        "date-format": "^1.2.0",
        "debug": "^3.1.0",
        "mkdirp": "^0.5.1",
        "readable-stream": "^2.3.0"
      },
      "dependencies": {
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        }
      }
    },
    "string-width": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
      "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
      "dev": true,
      "requires": {
        "code-point-at": "^1.0.0",
        "is-fullwidth-code-point": "^1.0.0",
        "strip-ansi": "^3.0.0"
      }
    },
    "string_decoder": {
      "version": "1.1.1",
      "resolved": "http://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
      "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
      "dev": true,
      "requires": {
        "safe-buffer": "~5.1.0"
      }
    },
    "strip-ansi": {
      "version": "3.0.1",
      "resolved": "http://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
      "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
      "dev": true,
      "requires": {
        "ansi-regex": "^2.0.0"
      }
    },
    "strip-bom": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-2.0.0.tgz",
      "integrity": "sha1-YhmoVhZSBJHzV4i9vxRHqZx+aw4=",
      "dev": true,
      "requires": {
        "is-utf8": "^0.2.0"
      }
    },
    "strip-eof": {
      "version": "1.0.0",
      "resolved": "http://registry.npmjs.org/strip-eof/-/strip-eof-1.0.0.tgz",
      "integrity": "sha1-u0P/VZim6wXYm1n80SnJgzE2Br8=",
      "dev": true
    },
    "strip-indent": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/strip-indent/-/strip-indent-1.0.1.tgz",
      "integrity": "sha1-DHlipq3vp7vUrDZkYKY4VSrhoKI=",
      "dev": true,
      "requires": {
        "get-stdin": "^4.0.1"
      }
    },
    "strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
      "dev": true
    },
    "style-loader": {
      "version": "0.23.1",
      "resolved": "https://registry.npmjs.org/style-loader/-/style-loader-0.23.1.tgz",
      "integrity": "sha512-XK+uv9kWwhZMZ1y7mysB+zoihsEj4wneFWAS5qoiLwzW0WzSqMrrsIy+a3zkQJq0ipFtBpX5W3MqyRIBF/WFGg==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.1.0",
        "schema-utils": "^1.0.0"
      }
    },
    "stylus": {
      "version": "0.54.5",
      "resolved": "https://registry.npmjs.org/stylus/-/stylus-0.54.5.tgz",
      "integrity": "sha1-QrlWCTHKcJDOhRWnmLqeaqPW3Hk=",
      "dev": true,
      "requires": {
        "css-parse": "1.7.x",
        "debug": "*",
        "glob": "7.0.x",
        "mkdirp": "0.5.x",
        "sax": "0.5.x",
        "source-map": "0.1.x"
      },
      "dependencies": {
        "glob": {
          "version": "7.0.6",
          "resolved": "https://registry.npmjs.org/glob/-/glob-7.0.6.tgz",
          "integrity": "sha1-IRuvr0nlJbjNkyYNFKsTYVKz9Xo=",
          "dev": true,
          "requires": {
            "fs.realpath": "^1.0.0",
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "^3.0.2",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          }
        },
        "source-map": {
          "version": "0.1.43",
          "resolved": "http://registry.npmjs.org/source-map/-/source-map-0.1.43.tgz",
          "integrity": "sha1-wkvBRspRfBRx9drL4lcbK3+eM0Y=",
          "dev": true,
          "requires": {
            "amdefine": ">=0.0.4"
          }
        }
      }
    },
    "stylus-loader": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/stylus-loader/-/stylus-loader-3.0.2.tgz",
      "integrity": "sha512-+VomPdZ6a0razP+zinir61yZgpw2NfljeSsdUF5kJuEzlo3khXhY19Fn6l8QQz1GRJGtMCo8nG5C04ePyV7SUA==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.0.2",
        "lodash.clonedeep": "^4.5.0",
        "when": "~3.6.x"
      }
    },
    "supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "dev": true,
      "requires": {
        "has-flag": "^3.0.0"
      }
    },
    "symbol-observable": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/symbol-observable/-/symbol-observable-1.2.0.tgz",
      "integrity": "sha512-e900nM8RRtGhlV36KGEU9k65K3mPb1WV70OdjfxlG2EAuM1noi/E/BaW/uMhL7bPEssK8QV57vN3esixjUvcXQ==",
      "dev": true
    },
    "symbol-tree": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.2.tgz",
      "integrity": "sha1-rifbOPZgp64uHDt9G8KQgZuFGeY="
    },
    "tapable": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.1.tgz",
      "integrity": "sha512-9I2ydhj8Z9veORCw5PRm4u9uebCn0mcCa6scWoNcbZ6dAtoo2618u9UUzxgmsCOreJpqDDuv61LvwofW7hLcBA==",
      "dev": true
    },
    "tar": {
      "version": "2.2.1",
      "resolved": "http://registry.npmjs.org/tar/-/tar-2.2.1.tgz",
      "integrity": "sha1-jk0qJWwOIYXGsYrWlK7JaLg8sdE=",
      "dev": true,
      "requires": {
        "block-stream": "*",
        "fstream": "^1.0.2",
        "inherits": "2"
      }
    },
    "term-size": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/term-size/-/term-size-1.2.0.tgz",
      "integrity": "sha1-RYuDiH8oj8Vtb/+/rSYuJmOO+mk=",
      "dev": true,
      "requires": {
        "execa": "^0.7.0"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-5.1.0.tgz",
          "integrity": "sha1-6L0O/uWPz/b4+UUQoKVUu/ojVEk=",
          "dev": true,
          "requires": {
            "lru-cache": "^4.0.1",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "execa": {
          "version": "0.7.0",
          "resolved": "https://registry.npmjs.org/execa/-/execa-0.7.0.tgz",
          "integrity": "sha1-lEvs00zEHuMqY6n68nrVpl/Fl3c=",
          "dev": true,
          "requires": {
            "cross-spawn": "^5.0.1",
            "get-stream": "^3.0.0",
            "is-stream": "^1.1.0",
            "npm-run-path": "^2.0.0",
            "p-finally": "^1.0.0",
            "signal-exit": "^3.0.0",
            "strip-eof": "^1.0.0"
          }
        }
      }
    },
    "terser": {
      "version": "3.11.0",
      "resolved": "https://registry.npmjs.org/terser/-/terser-3.11.0.tgz",
      "integrity": "sha512-5iLMdhEPIq3zFWskpmbzmKwMQixKmTYwY3Ox9pjtSklBLnHiuQ0GKJLhL1HSYtyffHM3/lDIFBnb82m9D7ewwQ==",
      "dev": true,
      "requires": {
        "commander": "~2.17.1",
        "source-map": "~0.6.1",
        "source-map-support": "~0.5.6"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "terser-webpack-plugin": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.1.0.tgz",
      "integrity": "sha512-61lV0DSxMAZ8AyZG7/A4a3UPlrbOBo8NIQ4tJzLPAdGOQ+yoNC7l5ijEow27lBAL2humer01KLS6bGIMYQxKoA==",
      "dev": true,
      "requires": {
        "cacache": "^11.0.2",
        "find-cache-dir": "^2.0.0",
        "schema-utils": "^1.0.0",
        "serialize-javascript": "^1.4.0",
        "source-map": "^0.6.1",
        "terser": "^3.8.1",
        "webpack-sources": "^1.1.0",
        "worker-farm": "^1.5.2"
      },
      "dependencies": {
        "cacache": {
          "version": "11.3.1",
          "resolved": "https://registry.npmjs.org/cacache/-/cacache-11.3.1.tgz",
          "integrity": "sha512-2PEw4cRRDu+iQvBTTuttQifacYjLPhET+SYO/gEFMy8uhi+jlJREDAjSF5FWSdV/Aw5h18caHA7vMTw2c+wDzA==",
          "dev": true,
          "requires": {
            "bluebird": "^3.5.1",
            "chownr": "^1.0.1",
            "figgy-pudding": "^3.1.0",
            "glob": "^7.1.2",
            "graceful-fs": "^4.1.11",
            "lru-cache": "^4.1.3",
            "mississippi": "^3.0.0",
            "mkdirp": "^0.5.1",
            "move-concurrently": "^1.0.1",
            "promise-inflight": "^1.0.1",
            "rimraf": "^2.6.2",
            "ssri": "^6.0.0",
            "unique-filename": "^1.1.0",
            "y18n": "^4.0.0"
          }
        },
        "find-cache-dir": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.0.0.tgz",
          "integrity": "sha512-LDUY6V1Xs5eFskUVYtIwatojt6+9xC9Chnlk/jYOOvn3FAFfSaWddxahDGyNHh0b2dMXa6YW2m0tk8TdVaXHlA==",
          "dev": true,
          "requires": {
            "commondir": "^1.0.1",
            "make-dir": "^1.0.0",
            "pkg-dir": "^3.0.0"
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "mississippi": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
          "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
          "dev": true,
          "requires": {
            "concat-stream": "^1.5.0",
            "duplexify": "^3.4.2",
            "end-of-stream": "^1.1.0",
            "flush-write-stream": "^1.0.0",
            "from2": "^2.1.0",
            "parallel-transform": "^1.1.0",
            "pump": "^3.0.0",
            "pumpify": "^1.3.3",
            "stream-each": "^1.1.0",
            "through2": "^2.0.0"
          }
        },
        "p-limit": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.0.0.tgz",
          "integrity": "sha512-fl5s52lI5ahKCernzzIyAP0QAZbGIovtVHGwpcu1Jr/EpzLVDI2myISHwGqK7m8uQFugVWSrbxH7XnhGtvEc+A==",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.0.0.tgz",
          "integrity": "sha512-hMp0onDKIajHfIkdRk3P4CdCmErkYAxxDtP3Wx/4nZ3aGlau2VKh3mZpcuFkH27WQkL/3WBCPOktzA9ZOAnMQQ==",
          "dev": true
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "dev": true,
          "requires": {
            "find-up": "^3.0.0"
          }
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        },
        "ssri": {
          "version": "6.0.1",
          "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
          "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
          "dev": true,
          "requires": {
            "figgy-pudding": "^3.5.1"
          }
        }
      }
    },
    "through": {
      "version": "2.3.8",
      "resolved": "http://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU=",
      "dev": true
    },
    "through2": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
      "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
      "dev": true,
      "requires": {
        "readable-stream": "~2.3.6",
        "xtend": "~4.0.1"
      }
    },
    "thunky": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/thunky/-/thunky-1.0.3.tgz",
      "integrity": "sha512-YwT8pjmNcAXBZqrubu22P4FYsh2D4dxRmnWBOL8Jk8bUcRUtc5326kx32tuTmFDAZtLOGEVNl8POAR8j896Iow==",
      "dev": true
    },
    "timed-out": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/timed-out/-/timed-out-4.0.1.tgz",
      "integrity": "sha1-8y6srFoXW+ol1/q1Zas+2HQe9W8=",
      "dev": true
    },
    "timers-browserify": {
      "version": "2.0.10",
      "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.10.tgz",
      "integrity": "sha512-YvC1SV1XdOUaL6gx5CoGroT3Gu49pK9+TZ38ErPldOWW4j49GI1HKs9DV+KGq/w6y+LZ72W1c8cKz2vzY+qpzg==",
      "dev": true,
      "requires": {
        "setimmediate": "^1.0.4"
      }
    },
    "tmp": {
      "version": "0.0.33",
      "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.33.tgz",
      "integrity": "sha512-jRCJlojKnZ3addtTOjdIqoRuPEKBvNXcGYqzO6zWZX8KfKEpnGY5jfggJQ3EjKuu8D4bJRr0y+cYJFmYbImXGw==",
      "dev": true,
      "requires": {
        "os-tmpdir": "~1.0.2"
      }
    },
    "to-array": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/to-array/-/to-array-0.1.4.tgz",
      "integrity": "sha1-F+bBH3PdTz10zaek/zI46a2b+JA=",
      "dev": true
    },
    "to-arraybuffer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
      "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M=",
      "dev": true
    },
    "to-fast-properties": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-1.0.3.tgz",
      "integrity": "sha1-uDVx+k2MJbguIxsG46MFXeTKGkc=",
      "dev": true
    },
    "to-object-path": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
      "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "to-regex": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
      "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
      "dev": true,
      "requires": {
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "regex-not": "^1.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "to-regex-range": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
      "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
      "dev": true,
      "requires": {
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1"
      }
    },
    "tough-cookie": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.4.3.tgz",
      "integrity": "sha512-Q5srk/4vDM54WJsJio3XNn6K2sCG+CQ8G5Wz6bZhRZoAe/+TxjWB/GlFAnYEbkYVlON9FMk/fE3h2RLpPXo4lQ==",
      "requires": {
        "psl": "^1.1.24",
        "punycode": "^1.4.1"
      },
      "dependencies": {
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        }
      }
    },
    "tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha1-gYT9NH2snNwYWZLzpmIuFLnZq2o="
    },
    "tree-kill": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.0.tgz",
      "integrity": "sha512-DlX6dR0lOIRDFxI0mjL9IYg6OTncLm/Zt+JiBhE5OlFcAR8yc9S7FFXU9so0oda47frdM/JFsk7UjNt9vscKcg==",
      "dev": true
    },
    "trim-newlines": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/trim-newlines/-/trim-newlines-1.0.0.tgz",
      "integrity": "sha1-WIeWa7WCpFA6QetST301ARgVphM=",
      "dev": true
    },
    "trim-right": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/trim-right/-/trim-right-1.0.1.tgz",
      "integrity": "sha1-yy4SAwZ+DI3h9hQJS5/kVwTqYAM=",
      "dev": true
    },
    "true-case-path": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/true-case-path/-/true-case-path-1.0.3.tgz",
      "integrity": "sha512-m6s2OdQe5wgpFMC+pAJ+q9djG82O2jcHPOI6RNg1yy9rCYR+WD6Nbpl32fDpfC56nirdRy+opFa/Vk7HYhqaew==",
      "dev": true,
      "requires": {
        "glob": "^7.1.2"
      }
    },
    "ts-node": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-7.0.1.tgz",
      "integrity": "sha512-BVwVbPJRspzNh2yfslyT1PSbl5uIk03EZlb493RKHN4qej/D06n1cEhjlOJG69oFsE7OT8XjpTUcYf6pKTLMhw==",
      "dev": true,
      "requires": {
        "arrify": "^1.0.0",
        "buffer-from": "^1.1.0",
        "diff": "^3.1.0",
        "make-error": "^1.1.1",
        "minimist": "^1.2.0",
        "mkdirp": "^0.5.1",
        "source-map-support": "^0.5.6",
        "yn": "^2.0.0"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "tsickle": {
      "version": "0.34.0",
      "resolved": "https://registry.npmjs.org/tsickle/-/tsickle-0.34.0.tgz",
      "integrity": "sha512-O3wCPRtL18Hc/ZBnaiKwmmjVzeCWTOTpsi0btfC7FWL3RnXpxLPxD6hoJ0QEXuSfG/0QJk+MWNjqT9N6fOyyIg==",
      "dev": true,
      "requires": {
        "minimist": "^1.2.0",
        "mkdirp": "^0.5.1",
        "source-map": "^0.7.3"
      },
      "dependencies": {
        "minimist": {
          "version": "1.2.0",
          "resolved": "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
          "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ=",
          "dev": true
        }
      }
    },
    "tslib": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.9.3.tgz",
      "integrity": "sha512-4krF8scpejhaOgqzBEcGM7yDIEfi0/8+8zDRZhNZZ2kjmHJ4hv3zCbQWxoJGz1iw5U0Jl0nma13xzHXcncMavQ=="
    },
    "tslint": {
      "version": "5.11.0",
      "resolved": "https://registry.npmjs.org/tslint/-/tslint-5.11.0.tgz",
      "integrity": "sha1-mPMMAurjzecAYgHkwzywi0hYHu0=",
      "dev": true,
      "requires": {
        "babel-code-frame": "^6.22.0",
        "builtin-modules": "^1.1.1",
        "chalk": "^2.3.0",
        "commander": "^2.12.1",
        "diff": "^3.2.0",
        "glob": "^7.1.1",
        "js-yaml": "^3.7.0",
        "minimatch": "^3.0.4",
        "resolve": "^1.3.2",
        "semver": "^5.3.0",
        "tslib": "^1.8.0",
        "tsutils": "^2.27.2"
      },
      "dependencies": {
        "resolve": {
          "version": "1.8.1",
          "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.8.1.tgz",
          "integrity": "sha512-AicPrAC7Qu1JxPCZ9ZgCZlY35QgFnNqc+0LtbRNxnVw4TXvjQ72wnuL9JQcEBgXkI9JM8MsT9kaQoHcpCRJOYA==",
          "dev": true,
          "requires": {
            "path-parse": "^1.0.5"
          }
        }
      }
    },
    "tsutils": {
      "version": "2.29.0",
      "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-2.29.0.tgz",
      "integrity": "sha512-g5JVHCIJwzfISaXpXE1qvNalca5Jwob6FjI4AoPlqMusJ6ftFE7IkkFoMhVLRgK+4Kx3gkzb8UZK5t5yTTvEmA==",
      "dev": true,
      "requires": {
        "tslib": "^1.8.1"
      }
    },
    "tty-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
      "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY=",
      "dev": true
    },
    "tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "tweetnacl": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
      "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
    },
    "type-check": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
      "integrity": "sha1-WITKtRLPHTVeP7eE8wgEsrUg23I=",
      "requires": {
        "prelude-ls": "~1.1.2"
      }
    },
    "type-is": {
      "version": "1.6.16",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.16.tgz",
      "integrity": "sha512-HRkVv/5qY2G6I8iab9cI7v1bOIdhm94dVjQCPFElW9W+3GeDOSHmy2EBYe4VTApuzolPcmgFTN3ftVJRKR2J9Q==",
      "dev": true,
      "requires": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.18"
      }
    },
    "typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c=",
      "dev": true
    },
    "typescript": {
      "version": "3.1.6",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-3.1.6.tgz",
      "integrity": "sha512-tDMYfVtvpb96msS1lDX9MEdHrW4yOuZ4Kdc4Him9oU796XldPYF/t2+uKoX0BBa0hXXwDlqYQbXY5Rzjzc5hBA==",
      "dev": true
    },
    "uglify-js": {
      "version": "3.4.9",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.4.9.tgz",
      "integrity": "sha512-8CJsbKOtEbnJsTyv6LE6m6ZKniqMiFWmm9sRbopbkGs3gMPPfd3Fh8iIA4Ykv5MgaTbqHr4BaoGLJLZNhsrW1Q==",
      "dev": true,
      "requires": {
        "commander": "~2.17.1",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "uglifyjs-webpack-plugin": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/uglifyjs-webpack-plugin/-/uglifyjs-webpack-plugin-1.3.0.tgz",
      "integrity": "sha512-ovHIch0AMlxjD/97j9AYovZxG5wnHOPkL7T1GKochBADp/Zwc44pEWNqpKl1Loupp1WhFg7SlYmHZRUfdAacgw==",
      "dev": true,
      "requires": {
        "cacache": "^10.0.4",
        "find-cache-dir": "^1.0.0",
        "schema-utils": "^0.4.5",
        "serialize-javascript": "^1.4.0",
        "source-map": "^0.6.1",
        "uglify-es": "^3.3.4",
        "webpack-sources": "^1.1.0",
        "worker-farm": "^1.5.2"
      },
      "dependencies": {
        "commander": {
          "version": "2.13.0",
          "resolved": "https://registry.npmjs.org/commander/-/commander-2.13.0.tgz",
          "integrity": "sha512-MVuS359B+YzaWqjCL/c+22gfryv+mCBPHAv3zyVI2GN8EY6IRP8VwtasXn8jyyhvvq84R4ImN1OKRtcbIasjYA==",
          "dev": true
        },
        "schema-utils": {
          "version": "0.4.7",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.4.7.tgz",
          "integrity": "sha512-v/iwU6wvwGK8HbU9yi3/nhGzP0yGSuhQMzL6ySiec1FSrZZDkhm4noOSWzrNFo/jEc+SJY6jRTwuwbSXJPDUnQ==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-keywords": "^3.1.0"
          }
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        },
        "uglify-es": {
          "version": "3.3.9",
          "resolved": "https://registry.npmjs.org/uglify-es/-/uglify-es-3.3.9.tgz",
          "integrity": "sha512-r+MU0rfv4L/0eeW3xZrd16t4NZfK8Ld4SWVglYBb7ez5uXFWHuVRs6xCTrf1yirs9a4j4Y27nn7SRfO6v67XsQ==",
          "dev": true,
          "requires": {
            "commander": "~2.13.0",
            "source-map": "~0.6.1"
          }
        }
      }
    },
    "ultron": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ultron/-/ultron-1.1.1.tgz",
      "integrity": "sha512-UIEXBNeYmKptWH6z8ZnqTeS8fV74zG0/eRU9VGkpzz+LIJNs8W/zM/L+7ctCkRrgbNnnR0xxw4bKOr0cW0N0Og==",
      "dev": true
    },
    "union-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.0.tgz",
      "integrity": "sha1-XHHDTLW61dzr4+oM0IIHulqhrqQ=",
      "dev": true,
      "requires": {
        "arr-union": "^3.1.0",
        "get-value": "^2.0.6",
        "is-extendable": "^0.1.1",
        "set-value": "^0.4.3"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "set-value": {
          "version": "0.4.3",
          "resolved": "https://registry.npmjs.org/set-value/-/set-value-0.4.3.tgz",
          "integrity": "sha1-fbCPnT0i3H945Trzw79GZuzfzPE=",
          "dev": true,
          "requires": {
            "extend-shallow": "^2.0.1",
            "is-extendable": "^0.1.1",
            "is-plain-object": "^2.0.1",
            "to-object-path": "^0.3.0"
          }
        }
      }
    },
    "unique-filename": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
      "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
      "dev": true,
      "requires": {
        "unique-slug": "^2.0.0"
      }
    },
    "unique-slug": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.1.tgz",
      "integrity": "sha512-n9cU6+gITaVu7VGj1Z8feKMmfAjEAQGhwD9fE3zvpRRa0wEIx8ODYkVGfSc94M2OX00tUFV8wH3zYbm1I8mxFg==",
      "dev": true,
      "requires": {
        "imurmurhash": "^0.1.4"
      }
    },
    "unique-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-1.0.0.tgz",
      "integrity": "sha1-nhBXzKhRq7kzmPizOuGHuZyuwRo=",
      "dev": true,
      "requires": {
        "crypto-random-string": "^1.0.0"
      }
    },
    "universalify": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
      "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg==",
      "dev": true
    },
    "unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw=",
      "dev": true
    },
    "unset-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
      "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
      "dev": true,
      "requires": {
        "has-value": "^0.3.1",
        "isobject": "^3.0.0"
      },
      "dependencies": {
        "has-value": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
          "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
          "dev": true,
          "requires": {
            "get-value": "^2.0.3",
            "has-values": "^0.1.4",
            "isobject": "^2.0.0"
          },
          "dependencies": {
            "isobject": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
              "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
              "dev": true,
              "requires": {
                "isarray": "1.0.0"
              }
            }
          }
        },
        "has-values": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
          "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E=",
          "dev": true
        }
      }
    },
    "unzip-response": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unzip-response/-/unzip-response-2.0.1.tgz",
      "integrity": "sha1-0vD3N9FrBhXnKmk17QQhRXLVb5c=",
      "dev": true
    },
    "upath": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/upath/-/upath-1.1.0.tgz",
      "integrity": "sha512-bzpH/oBhoS/QI/YtbkqCg6VEiPYjSZtrHQM6/QnJS6OL9pKUFLqb3aFh4Scvwm45+7iAgiMkLhSbaZxUqmrprw==",
      "dev": true
    },
    "update-notifier": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/update-notifier/-/update-notifier-2.5.0.tgz",
      "integrity": "sha512-gwMdhgJHGuj/+wHJJs9e6PcCszpxR1b236igrOkUofGhqJuG+amlIKwApH1IW1WWl7ovZxsX49lMBWLxSdm5Dw==",
      "dev": true,
      "requires": {
        "boxen": "^1.2.1",
        "chalk": "^2.0.1",
        "configstore": "^3.0.0",
        "import-lazy": "^2.1.0",
        "is-ci": "^1.0.10",
        "is-installed-globally": "^0.1.0",
        "is-npm": "^1.0.0",
        "latest-version": "^3.0.0",
        "semver-diff": "^2.0.0",
        "xdg-basedir": "^3.0.0"
      }
    },
    "uri-js": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
      "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "urix": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
      "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI=",
      "dev": true
    },
    "url": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
      "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
      "dev": true,
      "requires": {
        "punycode": "1.3.2",
        "querystring": "0.2.0"
      },
      "dependencies": {
        "punycode": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
          "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0=",
          "dev": true
        }
      }
    },
    "url-parse": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/url-parse/-/url-parse-1.4.4.tgz",
      "integrity": "sha512-/92DTTorg4JjktLNLe6GPS2/RvAd/RGr6LuktmWSMLEOa6rjnlrFXNgSbSmkNvCoL2T028A0a1JaJLzRMlFoHg==",
      "dev": true,
      "requires": {
        "querystringify": "^2.0.0",
        "requires-port": "^1.0.0"
      }
    },
    "url-parse-lax": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/url-parse-lax/-/url-parse-lax-1.0.0.tgz",
      "integrity": "sha1-evjzA2Rem9eaJy56FKxovAYJ2nM=",
      "dev": true,
      "requires": {
        "prepend-http": "^1.0.1"
      }
    },
    "use": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
      "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ==",
      "dev": true
    },
    "useragent": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/useragent/-/useragent-2.3.0.tgz",
      "integrity": "sha512-4AoH4pxuSvHCjqLO04sU6U/uE65BYza8l/KKBS0b0hnUPWi+cQ2BpeTEwejCSx9SPV5/U03nniDTrWx5NrmKdw==",
      "dev": true,
      "requires": {
        "lru-cache": "4.1.x",
        "tmp": "0.0.x"
      }
    },
    "util": {
      "version": "0.10.4",
      "resolved": "https://registry.npmjs.org/util/-/util-0.10.4.tgz",
      "integrity": "sha512-0Pm9hTQ3se5ll1XihRic3FDIku70C+iHUdT/W926rSgHV5QgXsYbKZN8MSC3tJtSkhuROzvsQjAaFENRXr+19A==",
      "dev": true,
      "requires": {
        "inherits": "2.0.3"
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8=",
      "dev": true
    },
    "utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM=",
      "dev": true
    },
    "uuid": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.3.2.tgz",
      "integrity": "sha512-yXJmeNaw3DnnKAOKJE51sL/ZaYfWJRl1pK9dr19YFCu0ObS231AB1/LbqTKRAQ5kw8A90rA6fr4riOUpTZvQZA=="
    },
    "validate-npm-package-license": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
      "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
      "dev": true,
      "requires": {
        "spdx-correct": "^3.0.0",
        "spdx-expression-parse": "^3.0.0"
      }
    },
    "validate-npm-package-name": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/validate-npm-package-name/-/validate-npm-package-name-3.0.0.tgz",
      "integrity": "sha1-X6kS2B630MdK/BQN5zF/DKffQ34=",
      "dev": true,
      "requires": {
        "builtins": "^1.0.3"
      }
    },
    "vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha1-IpnwLG3tMNSllhsLn3RSShj2NPw=",
      "dev": true
    },
    "verror": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
      "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
      "requires": {
        "assert-plus": "^1.0.0",
        "core-util-is": "1.0.2",
        "extsprintf": "^1.2.0"
      }
    },
    "vm-browserify": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-0.0.4.tgz",
      "integrity": "sha1-XX6kW7755Kb/ZflUOOCofDV9WnM=",
      "dev": true,
      "requires": {
        "indexof": "0.0.1"
      }
    },
    "void-elements": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/void-elements/-/void-elements-2.0.1.tgz",
      "integrity": "sha1-wGavtYK7HLQSjWDqkjkulNXp2+w=",
      "dev": true
    },
    "watchpack": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.6.0.tgz",
      "integrity": "sha512-i6dHe3EyLjMmDlU1/bGQpEw25XSjkJULPuAVKCbNRefQVq48yXKUpwg538F7AZTf9kyr57zj++pQFltUa5H7yA==",
      "dev": true,
      "requires": {
        "chokidar": "^2.0.2",
        "graceful-fs": "^4.1.2",
        "neo-async": "^2.5.0"
      }
    },
    "wbuf": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.3.tgz",
      "integrity": "sha512-O84QOnr0icsbFGLS0O3bI5FswxzRr8/gHwWkDlQFskhSPryQXvrTMxjxGP4+iWYoauLoBvfDpkrOauZ+0iZpDA==",
      "dev": true,
      "requires": {
        "minimalistic-assert": "^1.0.0"
      }
    },
    "webdriver-js-extender": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/webdriver-js-extender/-/webdriver-js-extender-2.1.0.tgz",
      "integrity": "sha512-lcUKrjbBfCK6MNsh7xaY2UAUmZwe+/ib03AjVOpFobX4O7+83BUveSrLfU0Qsyb1DaKJdQRbuU+kM9aZ6QUhiQ==",
      "dev": true,
      "requires": {
        "@types/selenium-webdriver": "^3.0.0",
        "selenium-webdriver": "^3.0.1"
      }
    },
    "webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha1-JFNCdeKnvGvnvIZhHMFq4KVlSHE="
    },
    "webpack": {
      "version": "4.23.1",
      "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.23.1.tgz",
      "integrity": "sha512-iE5Cu4rGEDk7ONRjisTOjVHv3dDtcFfwitSxT7evtYj/rANJpt1OuC/Kozh1pBa99AUBr1L/LsaNB+D9Xz3CEg==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.7.10",
        "@webassemblyjs/helper-module-context": "1.7.10",
        "@webassemblyjs/wasm-edit": "1.7.10",
        "@webassemblyjs/wasm-parser": "1.7.10",
        "acorn": "^5.6.2",
        "acorn-dynamic-import": "^3.0.0",
        "ajv": "^6.1.0",
        "ajv-keywords": "^3.1.0",
        "chrome-trace-event": "^1.0.0",
        "enhanced-resolve": "^4.1.0",
        "eslint-scope": "^4.0.0",
        "json-parse-better-errors": "^1.0.2",
        "loader-runner": "^2.3.0",
        "loader-utils": "^1.1.0",
        "memory-fs": "~0.4.1",
        "micromatch": "^3.1.8",
        "mkdirp": "~0.5.0",
        "neo-async": "^2.5.0",
        "node-libs-browser": "^2.0.0",
        "schema-utils": "^0.4.4",
        "tapable": "^1.1.0",
        "uglifyjs-webpack-plugin": "^1.2.4",
        "watchpack": "^1.5.0",
        "webpack-sources": "^1.3.0"
      },
      "dependencies": {
        "schema-utils": {
          "version": "0.4.7",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.4.7.tgz",
          "integrity": "sha512-v/iwU6wvwGK8HbU9yi3/nhGzP0yGSuhQMzL6ySiec1FSrZZDkhm4noOSWzrNFo/jEc+SJY6jRTwuwbSXJPDUnQ==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-keywords": "^3.1.0"
          }
        }
      }
    },
    "webpack-core": {
      "version": "0.6.9",
      "resolved": "https://registry.npmjs.org/webpack-core/-/webpack-core-0.6.9.tgz",
      "integrity": "sha1-/FcViMhVjad76e+23r3Fo7FyvcI=",
      "dev": true,
      "requires": {
        "source-list-map": "~0.1.7",
        "source-map": "~0.4.1"
      },
      "dependencies": {
        "source-list-map": {
          "version": "0.1.8",
          "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-0.1.8.tgz",
          "integrity": "sha1-xVCyq1Qn9rPyH1r+rYjE9Vh7IQY=",
          "dev": true
        },
        "source-map": {
          "version": "0.4.4",
          "resolved": "http://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz",
          "integrity": "sha1-66T12pwNyZneaAMti092FzZSA2s=",
          "dev": true,
          "requires": {
            "amdefine": ">=0.0.4"
          }
        }
      }
    },
    "webpack-dev-middleware": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-3.4.0.tgz",
      "integrity": "sha512-Q9Iyc0X9dP9bAsYskAVJ/hmIZZQwf/3Sy4xCAZgL5cUkjZmUZLt4l5HpbST/Pdgjn3u6pE7u5OdGd1apgzRujA==",
      "dev": true,
      "requires": {
        "memory-fs": "~0.4.1",
        "mime": "^2.3.1",
        "range-parser": "^1.0.3",
        "webpack-log": "^2.0.0"
      },
      "dependencies": {
        "mime": {
          "version": "2.4.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.0.tgz",
          "integrity": "sha512-ikBcWwyqXQSHKtciCcctu9YfPbFYZ4+gbHEmE0Q8jzcTYQg5dHCr3g2wwAZjPoJfQVXZq6KXAjpXOTf5/cjT7w==",
          "dev": true
        }
      }
    },
    "webpack-dev-server": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-3.1.10.tgz",
      "integrity": "sha512-RqOAVjfqZJtQcB0LmrzJ5y4Jp78lv9CK0MZ1YJDTaTmedMZ9PU9FLMQNrMCfVu8hHzaVLVOJKBlGEHMN10z+ww==",
      "dev": true,
      "requires": {
        "ansi-html": "0.0.7",
        "bonjour": "^3.5.0",
        "chokidar": "^2.0.0",
        "compression": "^1.5.2",
        "connect-history-api-fallback": "^1.3.0",
        "debug": "^3.1.0",
        "del": "^3.0.0",
        "express": "^4.16.2",
        "html-entities": "^1.2.0",
        "http-proxy-middleware": "~0.18.0",
        "import-local": "^2.0.0",
        "internal-ip": "^3.0.1",
        "ip": "^1.1.5",
        "killable": "^1.0.0",
        "loglevel": "^1.4.1",
        "opn": "^5.1.0",
        "portfinder": "^1.0.9",
        "schema-utils": "^1.0.0",
        "selfsigned": "^1.9.1",
        "serve-index": "^1.7.2",
        "sockjs": "0.3.19",
        "sockjs-client": "1.3.0",
        "spdy": "^3.4.1",
        "strip-ansi": "^3.0.0",
        "supports-color": "^5.1.0",
        "webpack-dev-middleware": "3.4.0",
        "webpack-log": "^2.0.0",
        "yargs": "12.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0=",
          "dev": true
        },
        "cliui": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/cliui/-/cliui-4.1.0.tgz",
          "integrity": "sha512-4FG+RSG9DL7uEwRUZXZn3SS34DiDPfzP0VOiEwtUWlE+AR2EIg+hSyvrIgUUfhdgR/UkAeW2QHgeP+hWrXs7jQ==",
          "dev": true,
          "requires": {
            "string-width": "^2.1.1",
            "strip-ansi": "^4.0.0",
            "wrap-ansi": "^2.0.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
              "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
              "dev": true,
              "requires": {
                "ansi-regex": "^3.0.0"
              }
            }
          }
        },
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "decamelize": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-2.0.0.tgz",
          "integrity": "sha512-Ikpp5scV3MSYxY39ymh45ZLEecsTdv/Xj2CaQfI8RLMuwi7XvjX9H/fhraiSuU+C5w5NTDu4ZU72xNiZnurBPg==",
          "dev": true,
          "requires": {
            "xregexp": "4.0.0"
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "invert-kv": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-2.0.0.tgz",
          "integrity": "sha512-wPVv/y/QQ/Uiirj/vh3oP+1Ww+AWehmi1g5fFWGPF6IpCBCDVrhgHRMvrLfdYcwDh3QJbGXDW4JAuzxElLSqKA==",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "lcid": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/lcid/-/lcid-2.0.0.tgz",
          "integrity": "sha512-avPEb8P8EGnwXKClwsNUgryVjllcRqtMYa49NTsbQagYuT1DcXnl1915oxWjoyGrXR6zH/Y0Zc96xWsPcoDKeA==",
          "dev": true,
          "requires": {
            "invert-kv": "^2.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "ms": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
          "dev": true
        },
        "os-locale": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-3.0.1.tgz",
          "integrity": "sha512-7g5e7dmXPtzcP4bgsZ8ixDVqA7oWYuEz4lOSujeWyliPai4gfVDiFIcwBg3aGCPnmSGfzOKTK3ccPn0CKv3DBw==",
          "dev": true,
          "requires": {
            "execa": "^0.10.0",
            "lcid": "^2.0.0",
            "mem": "^4.0.0"
          }
        },
        "p-limit": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.0.0.tgz",
          "integrity": "sha512-fl5s52lI5ahKCernzzIyAP0QAZbGIovtVHGwpcu1Jr/EpzLVDI2myISHwGqK7m8uQFugVWSrbxH7XnhGtvEc+A==",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.0.0.tgz",
          "integrity": "sha512-hMp0onDKIajHfIkdRk3P4CdCmErkYAxxDtP3Wx/4nZ3aGlau2VKh3mZpcuFkH27WQkL/3WBCPOktzA9ZOAnMQQ==",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          },
          "dependencies": {
            "strip-ansi": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
              "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
              "dev": true,
              "requires": {
                "ansi-regex": "^3.0.0"
              }
            }
          }
        },
        "which-module": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
          "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
          "dev": true
        },
        "yargs": {
          "version": "12.0.2",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-12.0.2.tgz",
          "integrity": "sha512-e7SkEx6N6SIZ5c5H22RTZae61qtn3PYUE8JYbBFlK9sYmh3DMQ6E5ygtaG/2BW0JZi4WGgTR2IV5ChqlqrDGVQ==",
          "dev": true,
          "requires": {
            "cliui": "^4.0.0",
            "decamelize": "^2.0.0",
            "find-up": "^3.0.0",
            "get-caller-file": "^1.0.1",
            "os-locale": "^3.0.0",
            "require-directory": "^2.1.1",
            "require-main-filename": "^1.0.1",
            "set-blocking": "^2.0.0",
            "string-width": "^2.0.0",
            "which-module": "^2.0.0",
            "y18n": "^3.2.1 || ^4.0.0",
            "yargs-parser": "^10.1.0"
          }
        },
        "yargs-parser": {
          "version": "10.1.0",
          "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-10.1.0.tgz",
          "integrity": "sha512-VCIyR1wJoEBZUqk5PA+oOBF6ypbwh5aNB3I50guxAL/quggdfs4TtNHQrSazFA3fYZ+tEqfs0zIGlv0c/rgjbQ==",
          "dev": true,
          "requires": {
            "camelcase": "^4.1.0"
          }
        }
      }
    },
    "webpack-log": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/webpack-log/-/webpack-log-2.0.0.tgz",
      "integrity": "sha512-cX8G2vR/85UYG59FgkoMamwHUIkSSlV3bBMRsbxVXVUk2j6NleCKjQ/WE9eYg9WY4w25O9w8wKP4rzNZFmUcUg==",
      "dev": true,
      "requires": {
        "ansi-colors": "^3.0.0",
        "uuid": "^3.3.2"
      }
    },
    "webpack-merge": {
      "version": "4.1.4",
      "resolved": "https://registry.npmjs.org/webpack-merge/-/webpack-merge-4.1.4.tgz",
      "integrity": "sha512-TmSe1HZKeOPey3oy1Ov2iS3guIZjWvMT2BBJDzzT5jScHTjVC3mpjJofgueEzaEd6ibhxRDD6MIblDr8tzh8iQ==",
      "dev": true,
      "requires": {
        "lodash": "^4.17.5"
      }
    },
    "webpack-sources": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.3.0.tgz",
      "integrity": "sha512-OiVgSrbGu7NEnEvQJJgdSFPl2qWKkWq5lHMhgiToIiN9w34EBnjYzSYs+VbL5KoYiLNtFFa7BZIKxRED3I32pA==",
      "dev": true,
      "requires": {
        "source-list-map": "^2.0.0",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "webpack-subresource-integrity": {
      "version": "1.1.0-rc.6",
      "resolved": "https://registry.npmjs.org/webpack-subresource-integrity/-/webpack-subresource-integrity-1.1.0-rc.6.tgz",
      "integrity": "sha512-Az7y8xTniNhaA0620AV1KPwWOqawurVVDzQSpPAeR5RwNbL91GoBSJAAo9cfd+GiFHwsS5bbHepBw1e6Hzxy4w==",
      "dev": true,
      "requires": {
        "webpack-core": "^0.6.8"
      }
    },
    "websocket-driver": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.0.tgz",
      "integrity": "sha1-DK+dLXVdk67gSdS90NP+LMoqJOs=",
      "dev": true,
      "requires": {
        "http-parser-js": ">=0.4.0",
        "websocket-extensions": ">=0.1.1"
      }
    },
    "websocket-extensions": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.3.tgz",
      "integrity": "sha512-nqHUnMXmBzT0w570r2JpJxfiSD1IzoI+HGVdd3aZ0yNi3ngvQ4jv1dtHt5VGxfI2yj5yqImPhOK4vmIh2xMbGg==",
      "dev": true
    },
    "whatwg-url": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-2.0.1.tgz",
      "integrity": "sha1-U5ayBD8CDub3BNnEXqhRnnJN5lk=",
      "requires": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "when": {
      "version": "3.6.4",
      "resolved": "https://registry.npmjs.org/when/-/when-3.6.4.tgz",
      "integrity": "sha1-RztRfsFZ4rhQBUl6E5g/CVQS404=",
      "dev": true
    },
    "which": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
      "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
      "dev": true,
      "requires": {
        "isexe": "^2.0.0"
      }
    },
    "which-module": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-1.0.0.tgz",
      "integrity": "sha1-u6Y8qGGUiZT/MHc2CJ47lgJsKk8=",
      "dev": true
    },
    "wide-align": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.3.tgz",
      "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
      "dev": true,
      "requires": {
        "string-width": "^1.0.2 || 2"
      }
    },
    "widest-line": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/widest-line/-/widest-line-2.0.1.tgz",
      "integrity": "sha512-Ba5m9/Fa4Xt9eb2ELXt77JxVDV8w7qQrH0zS/TWSJdLyAwQjWoOzpzj5lwVftDz6n/EOu3tNACS84v509qwnJA==",
      "dev": true,
      "requires": {
        "string-width": "^2.1.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "dev": true,
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        }
      }
    },
    "wordwrap": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-1.0.0.tgz",
      "integrity": "sha1-J1hIEIkUVqQXHI0CJkQa3pDLyus="
    },
    "worker-farm": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.6.0.tgz",
      "integrity": "sha512-6w+3tHbM87WnSWnENBUvA2pxJPLhQUg5LKwUQHq3r+XPhIM+Gh2R5ycbwPCyuGbNg+lPgdcnQUhuC02kJCvffQ==",
      "dev": true,
      "requires": {
        "errno": "~0.1.7"
      }
    },
    "wrap-ansi": {
      "version": "2.1.0",
      "resolved": "http://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz",
      "integrity": "sha1-2Pw9KE3QV5T+hJc8rs3Rz4JP3YU=",
      "dev": true,
      "requires": {
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1"
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=",
      "dev": true
    },
    "write-file-atomic": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-2.3.0.tgz",
      "integrity": "sha512-xuPeK4OdjWqtfi59ylvVL0Yn35SF3zgcAcv7rBPFHVaEapaDr4GdGgm3j7ckTwH9wHL7fGmgfAnb0+THrHb8tA==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.11",
        "imurmurhash": "^0.1.4",
        "signal-exit": "^3.0.2"
      }
    },
    "ws": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-3.3.3.tgz",
      "integrity": "sha512-nnWLa/NwZSt4KQJu51MYlCcSQ5g7INpOrOMt4XV8j4dqTXdmlUmSHQ8/oLC069ckre0fRsgfvsKwbTdtKLCDkA==",
      "dev": true,
      "requires": {
        "async-limiter": "~1.0.0",
        "safe-buffer": "~5.1.0",
        "ultron": "~1.1.0"
      }
    },
    "xdg-basedir": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/xdg-basedir/-/xdg-basedir-3.0.0.tgz",
      "integrity": "sha1-SWsswQnsqNus/i3HK2A8F8WHCtQ=",
      "dev": true
    },
    "xml-name-validator": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-2.0.1.tgz",
      "integrity": "sha1-TYuPHszTQZqjYgYb7O9RXh5VljU="
    },
    "xml2js": {
      "version": "0.4.19",
      "resolved": "https://registry.npmjs.org/xml2js/-/xml2js-0.4.19.tgz",
      "integrity": "sha512-esZnJZJOiJR9wWKMyuvSE1y6Dq5LCuJanqhxslH2bxM6duahNZ+HMpCLhBQGZkbX6xRf8x1Y2eJlgt2q3qo49Q==",
      "dev": true,
      "requires": {
        "sax": ">=0.6.0",
        "xmlbuilder": "~9.0.1"
      },
      "dependencies": {
        "sax": {
          "version": "1.2.4",
          "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
          "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw==",
          "dev": true
        }
      }
    },
    "xmlbuilder": {
      "version": "9.0.7",
      "resolved": "http://registry.npmjs.org/xmlbuilder/-/xmlbuilder-9.0.7.tgz",
      "integrity": "sha1-Ey7mPS7FVlxVfiD0wi35rKaGsQ0=",
      "dev": true
    },
    "xmldom": {
      "version": "0.1.27",
      "resolved": "https://registry.npmjs.org/xmldom/-/xmldom-0.1.27.tgz",
      "integrity": "sha1-1QH5ezvbQDr4757MIFcxh6rawOk="
    },
    "xmlhttprequest-ssl": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/xmlhttprequest-ssl/-/xmlhttprequest-ssl-1.5.5.tgz",
      "integrity": "sha1-wodrBhaKrcQOV9l+gRkayPQ5iz4=",
      "dev": true
    },
    "xregexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/xregexp/-/xregexp-4.0.0.tgz",
      "integrity": "sha512-PHyM+sQouu7xspQQwELlGwwd05mXUFqwFYfqPO0cC7x4fxyHnnuetmQr6CjJiafIDoH4MogHb9dOoJzR/Y4rFg==",
      "dev": true
    },
    "xtend": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.1.tgz",
      "integrity": "sha1-pcbVMr5lbiPbgg77lDofBJmNY68=",
      "dev": true
    },
    "xxhashjs": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/xxhashjs/-/xxhashjs-0.2.2.tgz",
      "integrity": "sha512-AkTuIuVTET12tpsVIQo+ZU6f/qDmKuRUcjaqR+OIvm+aCBsZ95i7UVY5WJ9TMsSaZ0DA2WxoZ4acu0sPH+OKAw==",
      "dev": true,
      "requires": {
        "cuint": "^0.2.2"
      }
    },
    "y18n": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
      "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w==",
      "dev": true
    },
    "yallist": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-2.1.2.tgz",
      "integrity": "sha1-HBH5IY8HYImkfdUS+TxmmaaoHVI=",
      "dev": true
    },
    "yargs": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-7.1.0.tgz",
      "integrity": "sha1-a6MY6xaWFyf10oT46gA+jWFU0Mg=",
      "dev": true,
      "requires": {
        "camelcase": "^3.0.0",
        "cliui": "^3.2.0",
        "decamelize": "^1.1.1",
        "get-caller-file": "^1.0.1",
        "os-locale": "^1.4.0",
        "read-pkg-up": "^1.0.1",
        "require-directory": "^2.1.1",
        "require-main-filename": "^1.0.1",
        "set-blocking": "^2.0.0",
        "string-width": "^1.0.2",
        "which-module": "^1.0.0",
        "y18n": "^3.2.1",
        "yargs-parser": "^5.0.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-3.0.0.tgz",
          "integrity": "sha1-MvxLn82vhF/N9+c7uXysImHwqwo=",
          "dev": true
        },
        "y18n": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
          "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE=",
          "dev": true
        }
      }
    },
    "yargs-parser": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-5.0.0.tgz",
      "integrity": "sha1-J17PDX/+Bcd+ZOfIbkzZS/DhIoo=",
      "dev": true,
      "requires": {
        "camelcase": "^3.0.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-3.0.0.tgz",
          "integrity": "sha1-MvxLn82vhF/N9+c7uXysImHwqwo=",
          "dev": true
        }
      }
    },
    "yarn": {
      "version": "1.12.3",
      "resolved": "https://registry.npmjs.org/yarn/-/yarn-1.12.3.tgz",
      "integrity": "sha512-8f5rWNDvkhAmCxmn8C0LsNWMxTYVk4VGKiq0sIB6HGZjaZTHsGIH87SUmVDUEd2Wk54bqKoUlbVWgQFCQhRkVw=="
    },
    "yeast": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/yeast/-/yeast-0.1.2.tgz",
      "integrity": "sha1-AI4G2AlDIMNy28L47XagymyKxBk=",
      "dev": true
    },
    "yn": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/yn/-/yn-2.0.0.tgz",
      "integrity": "sha1-5a2ryKz0CPY4X8dklWhMiOavaJo=",
      "dev": true
    },
    "zone.js": {
      "version": "0.8.26",
      "resolved": "https://registry.npmjs.org/zone.js/-/zone.js-0.8.26.tgz",
      "integrity": "sha512-W9Nj+UmBJG251wkCacIkETgra4QgBo/vgoEkb4a2uoLzpQG7qF9nzwoLXWU5xj3Fg2mxGvEDh47mg24vXccYjA=="
    }
  }
}
# WebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "es2015",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ],
    "paths": {
      "svg-geom": [
        "projects/svg-geom"
      ],
      "svg-geom/*": [
        "projects/svg-geom/src/*"
      ]
    }
  }
}

{
  "rulesDirectory": [
    "node_modules/codelyzer"
  ],
  "rules": {
    "arrow-return-shorthand": true,
    "callable-types": true,
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "curly": true,
    "deprecation": {
      "severity": "warn"
    },
    "eofline": true,
    "forin": true,
    "import-blacklist": [
      true,
      "rxjs/Rx"
    ],
    "import-spacing": true,
    "indent": [
      true,
      "spaces"
    ],
    "interface-over-type-literal": true,
    "label-position": true,
    "max-line-length": [
      true,
      140
    ],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-empty": false,
    "no-empty-interface": true,
    "no-eval": true,
    "no-inferrable-types": [
      true,
      "ignore-params"
    ],
    "no-misused-new": true,
    "no-non-null-assertion": true,
    "no-redundant-jsdoc": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "prefer-const": true,
    "quotemark": [
      true,
      "single"
    ],
    "radix": true,
    "semicolon": [
      true,
      "always"
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "unified-signatures": true,
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-output-on-prefix": true,
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true
  }
}
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


"@angular-devkit/architect@0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/architect/-/architect-0.11.2.tgz#f0bcaa494c713f8648a5da2490e2b67cd0e57503"
  dependencies:
    "@angular-devkit/core" "7.1.2"
    rxjs "6.3.3"

"@angular-devkit/build-angular@^0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/build-angular/-/build-angular-0.11.2.tgz#dac1b5776591b424c775bca4739a49aed03ccbfe"
  dependencies:
    "@angular-devkit/architect" "0.11.2"
    "@angular-devkit/build-optimizer" "0.11.2"
    "@angular-devkit/build-webpack" "0.11.2"
    "@angular-devkit/core" "7.1.2"
    "@ngtools/webpack" "7.1.2"
    ajv "6.5.3"
    autoprefixer "9.3.1"
    circular-dependency-plugin "5.0.2"
    clean-css "4.2.1"
    copy-webpack-plugin "4.5.4"
    file-loader "2.0.0"
    glob "7.1.3"
    istanbul "0.4.5"
    istanbul-instrumenter-loader "3.0.1"
    karma-source-map-support "1.3.0"
    less "3.8.1"
    less-loader "4.1.0"
    license-webpack-plugin "2.0.2"
    loader-utils "1.1.0"
    mini-css-extract-plugin "0.4.4"
    minimatch "3.0.4"
    opn "5.3.0"
    parse5 "4.0.0"
    portfinder "1.0.17"
    postcss "7.0.5"
    postcss-import "12.0.0"
    postcss-loader "3.0.0"
    raw-loader "0.5.1"
    rxjs "6.3.3"
    sass-loader "7.1.0"
    semver "5.5.1"
    source-map-loader "0.2.4"
    source-map-support "0.5.9"
    speed-measure-webpack-plugin "1.2.3"
    stats-webpack-plugin "0.7.0"
    style-loader "0.23.1"
    stylus "0.54.5"
    stylus-loader "3.0.2"
    terser-webpack-plugin "1.1.0"
    tree-kill "1.2.0"
    webpack "4.23.1"
    webpack-dev-middleware "3.4.0"
    webpack-dev-server "3.1.10"
    webpack-merge "4.1.4"
    webpack-sources "1.3.0"
    webpack-subresource-integrity "1.1.0-rc.6"
  optionalDependencies:
    node-sass "4.10.0"

"@angular-devkit/build-ng-packagr@^0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/build-ng-packagr/-/build-ng-packagr-0.11.2.tgz#a6719b920c07d58676dd4fc55e6787cf54989cfe"
  dependencies:
    "@angular-devkit/architect" "0.11.2"
    "@angular-devkit/core" "7.1.2"
    rxjs "6.3.3"
    semver "5.5.1"

"@angular-devkit/build-optimizer@0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/build-optimizer/-/build-optimizer-0.11.2.tgz#93f18d732fa1f12011003b245e0209f83e2b63d3"
  dependencies:
    loader-utils "1.1.0"
    source-map "0.5.6"
    typescript "3.1.6"
    webpack-sources "1.2.0"

"@angular-devkit/build-webpack@0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/build-webpack/-/build-webpack-0.11.2.tgz#54c678cb295514e1c21a33e85547c4c2b8b21095"
  dependencies:
    "@angular-devkit/architect" "0.11.2"
    "@angular-devkit/core" "7.1.2"
    rxjs "6.3.3"

"@angular-devkit/core@7.1.2":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/core/-/core-7.1.2.tgz#86b0e5a4cdeaa3198f6b1b50e7e114fac403e57c"
  dependencies:
    ajv "6.5.3"
    chokidar "2.0.4"
    fast-json-stable-stringify "2.0.0"
    rxjs "6.3.3"
    source-map "0.7.3"

"@angular-devkit/schematics@7.1.2":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@angular-devkit/schematics/-/schematics-7.1.2.tgz#847639044417d044bf1bc87f64508a0c3f99fae2"
  dependencies:
    "@angular-devkit/core" "7.1.2"
    rxjs "6.3.3"

"@angular/animations@^7.1.1":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/animations/-/animations-7.1.1.tgz#8fecbd19417364946a9ea40c8fdf32462110232f"
  dependencies:
    tslib "^1.9.0"

"@angular/cdk@^7.1.1":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/cdk/-/cdk-7.1.1.tgz#6916b2303af5e0a56a9b64ff4d54642cf191c54f"
  dependencies:
    tslib "^1.7.1"
  optionalDependencies:
    parse5 "^5.0.0"

"@angular/cli@^7.1.2":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@angular/cli/-/cli-7.1.2.tgz#bcad530ef8ab36188f4e4ab800d636989194e9bf"
  dependencies:
    "@angular-devkit/architect" "0.11.2"
    "@angular-devkit/core" "7.1.2"
    "@angular-devkit/schematics" "7.1.2"
    "@schematics/angular" "7.1.2"
    "@schematics/update" "0.11.2"
    inquirer "6.2.0"
    opn "5.3.0"
    semver "5.5.1"
    symbol-observable "1.2.0"

"@angular/common@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/common/-/common-7.1.1.tgz#f78f884614ef81ab2fd648f1aa3e83aae370a6c8"
  dependencies:
    tslib "^1.9.0"

"@angular/compiler-cli@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/compiler-cli/-/compiler-cli-7.1.1.tgz#c5f6225fb72b56f42fa78c332fdee9755c64604e"
  dependencies:
    canonical-path "1.0.0"
    chokidar "^1.4.2"
    convert-source-map "^1.5.1"
    dependency-graph "^0.7.2"
    magic-string "^0.25.0"
    minimist "^1.2.0"
    reflect-metadata "^0.1.2"
    shelljs "^0.8.1"
    source-map "^0.6.1"
    tslib "^1.9.0"
    yargs "9.0.1"

"@angular/compiler@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/compiler/-/compiler-7.1.1.tgz#4efbcad27ab43d4cd36d936a8df2e073f6d02d0a"
  dependencies:
    tslib "^1.9.0"

"@angular/core@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/core/-/core-7.1.1.tgz#9748b0103cd86226554e1ccbd0f43dd8c46f1ed1"
  dependencies:
    tslib "^1.9.0"

"@angular/forms@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/forms/-/forms-7.1.1.tgz#d16ef10a901c007062fd19144cd77917ef55ee24"
  dependencies:
    tslib "^1.9.0"

"@angular/language-service@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/language-service/-/language-service-7.1.1.tgz#6bbe35b2430ad54618a1803f881efb5894b296c9"

"@angular/material@^7.1.1":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/material/-/material-7.1.1.tgz#147b7565262e04d504c8dab7317632967a3db02a"
  dependencies:
    tslib "^1.7.1"

"@angular/platform-browser-dynamic@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/platform-browser-dynamic/-/platform-browser-dynamic-7.1.1.tgz#6945298446173338782f437a996226110cda0d3e"
  dependencies:
    tslib "^1.9.0"

"@angular/platform-browser@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/platform-browser/-/platform-browser-7.1.1.tgz#a6bd408f656dc43ee5a2d8af3dfaa786c7c1dfca"
  dependencies:
    tslib "^1.9.0"

"@angular/router@~7.1.0":
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/@angular/router/-/router-7.1.1.tgz#80a4cdffc03a529b73485c2ad63a30ec435364ea"
  dependencies:
    tslib "^1.9.0"

"@babel/code-frame@^7.0.0":
  version "7.0.0"
  resolved "https://registry.yarnpkg.com/@babel/code-frame/-/code-frame-7.0.0.tgz#06e2ab19bdb535385559aabb5ba59729482800f8"
  dependencies:
    "@babel/highlight" "^7.0.0"

"@babel/generator@^7.0.0", "@babel/generator@^7.1.6":
  version "7.1.6"
  resolved "https://registry.yarnpkg.com/@babel/generator/-/generator-7.1.6.tgz#001303cf87a5b9d093494a4bf251d7b5d03d3999"
  dependencies:
    "@babel/types" "^7.1.6"
    jsesc "^2.5.1"
    lodash "^4.17.10"
    source-map "^0.5.0"
    trim-right "^1.0.1"

"@babel/helper-function-name@^7.1.0":
  version "7.1.0"
  resolved "https://registry.yarnpkg.com/@babel/helper-function-name/-/helper-function-name-7.1.0.tgz#a0ceb01685f73355d4360c1247f582bfafc8ff53"
  dependencies:
    "@babel/helper-get-function-arity" "^7.0.0"
    "@babel/template" "^7.1.0"
    "@babel/types" "^7.0.0"

"@babel/helper-get-function-arity@^7.0.0":
  version "7.0.0"
  resolved "https://registry.yarnpkg.com/@babel/helper-get-function-arity/-/helper-get-function-arity-7.0.0.tgz#83572d4320e2a4657263734113c42868b64e49c3"
  dependencies:
    "@babel/types" "^7.0.0"

"@babel/helper-split-export-declaration@^7.0.0":
  version "7.0.0"
  resolved "https://registry.yarnpkg.com/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.0.0.tgz#3aae285c0311c2ab095d997b8c9a94cad547d813"
  dependencies:
    "@babel/types" "^7.0.0"

"@babel/highlight@^7.0.0":
  version "7.0.0"
  resolved "https://registry.yarnpkg.com/@babel/highlight/-/highlight-7.0.0.tgz#f710c38c8d458e6dd9a201afb637fcb781ce99e4"
  dependencies:
    chalk "^2.0.0"
    esutils "^2.0.2"
    js-tokens "^4.0.0"

"@babel/parser@^7.0.0", "@babel/parser@^7.1.2", "@babel/parser@^7.1.6":
  version "7.1.6"
  resolved "https://registry.yarnpkg.com/@babel/parser/-/parser-7.1.6.tgz#16e97aca1ec1062324a01c5a6a7d0df8dd189854"

"@babel/template@^7.0.0", "@babel/template@^7.1.0":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@babel/template/-/template-7.1.2.tgz#090484a574fef5a2d2d7726a674eceda5c5b5644"
  dependencies:
    "@babel/code-frame" "^7.0.0"
    "@babel/parser" "^7.1.2"
    "@babel/types" "^7.1.2"

"@babel/traverse@^7.0.0":
  version "7.1.6"
  resolved "https://registry.yarnpkg.com/@babel/traverse/-/traverse-7.1.6.tgz#c8db9963ab4ce5b894222435482bd8ea854b7b5c"
  dependencies:
    "@babel/code-frame" "^7.0.0"
    "@babel/generator" "^7.1.6"
    "@babel/helper-function-name" "^7.1.0"
    "@babel/helper-split-export-declaration" "^7.0.0"
    "@babel/parser" "^7.1.6"
    "@babel/types" "^7.1.6"
    debug "^4.1.0"
    globals "^11.1.0"
    lodash "^4.17.10"

"@babel/types@^7.0.0", "@babel/types@^7.1.2", "@babel/types@^7.1.6":
  version "7.1.6"
  resolved "https://registry.yarnpkg.com/@babel/types/-/types-7.1.6.tgz#0adb330c3a281348a190263aceb540e10f04bcce"
  dependencies:
    esutils "^2.0.2"
    lodash "^4.17.10"
    to-fast-properties "^2.0.0"

"@fortawesome/angular-fontawesome@^0.3.0":
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/@fortawesome/angular-fontawesome/-/angular-fontawesome-0.3.0.tgz#380492f186469ce03d6fdbb3ec719810f771bf62"
  dependencies:
    tslib "^1.9.0"

"@fortawesome/fontawesome-common-types@^0.2.8":
  version "0.2.8"
  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-0.2.8.tgz#8cacd1efd1aa956e1ef173f0abcf2ce1b7a0c66f"

"@fortawesome/fontawesome-svg-core@^1.2.8":
  version "1.2.8"
  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-svg-core/-/fontawesome-svg-core-1.2.8.tgz#b802b7f3d5b9d9d92ae92c18e865df468dcdf561"
  dependencies:
    "@fortawesome/fontawesome-common-types" "^0.2.8"

"@fortawesome/free-solid-svg-icons@^5.5.0":
  version "5.5.0"
  resolved "https://registry.yarnpkg.com/@fortawesome/free-solid-svg-icons/-/free-solid-svg-icons-5.5.0.tgz#4d815df4bba076f209eb409bc56d9d830367a7c0"
  dependencies:
    "@fortawesome/fontawesome-common-types" "^0.2.8"

"@ngtools/json-schema@^1.1.0":
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/@ngtools/json-schema/-/json-schema-1.1.0.tgz#c3a0c544d62392acc2813a42c8a0dc6f58f86922"

"@ngtools/webpack@7.1.2":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@ngtools/webpack/-/webpack-7.1.2.tgz#03b2e5577a6de9269ff58e56bbc430c44c6c8ade"
  dependencies:
    "@angular-devkit/core" "7.1.2"
    enhanced-resolve "4.1.0"
    rxjs "6.3.3"
    tree-kill "1.2.0"
    webpack-sources "1.2.0"

"@schematics/angular@7.1.2":
  version "7.1.2"
  resolved "https://registry.yarnpkg.com/@schematics/angular/-/angular-7.1.2.tgz#b3eefbc81d12b0b53816896f6172eb613885826c"
  dependencies:
    "@angular-devkit/core" "7.1.2"
    "@angular-devkit/schematics" "7.1.2"
    typescript "3.1.6"

"@schematics/update@0.11.2":
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/@schematics/update/-/update-0.11.2.tgz#edcf6ed3cf84762a097f083253b2e35a482bee8b"
  dependencies:
    "@angular-devkit/core" "7.1.2"
    "@angular-devkit/schematics" "7.1.2"
    "@yarnpkg/lockfile" "1.1.0"
    ini "1.3.5"
    pacote "9.1.1"
    rxjs "6.3.3"
    semver "5.5.1"
    semver-intersect "1.4.0"

"@types/estree@0.0.39":
  version "0.0.39"
  resolved "https://registry.yarnpkg.com/@types/estree/-/estree-0.0.39.tgz#e177e699ee1b8c22d23174caaa7422644389509f"

"@types/jasmine@*":
  version "3.3.0"
  resolved "https://registry.yarnpkg.com/@types/jasmine/-/jasmine-3.3.0.tgz#6b0e4b0192367d77e438ff660ccc4487c9602e7b"

"@types/jasmine@~2.8.8":
  version "2.8.12"
  resolved "https://registry.yarnpkg.com/@types/jasmine/-/jasmine-2.8.12.tgz#dfe606b07686c977f54d17cb8ebe6cae2e26f8ff"

"@types/jasminewd2@~2.0.3":
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/@types/jasminewd2/-/jasminewd2-2.0.6.tgz#2f57a8d9875a6c9ef328a14bd070ba14a055ac39"
  dependencies:
    "@types/jasmine" "*"

"@types/jspdf@^1.2.2":
  version "1.2.2"
  resolved "https://registry.yarnpkg.com/@types/jspdf/-/jspdf-1.2.2.tgz#bb827def0130e72f0692749b0db0c25a7f261840"

"@types/node@*":
  version "10.12.12"
  resolved "https://registry.yarnpkg.com/@types/node/-/node-10.12.12.tgz#e15a9d034d9210f00320ef718a50c4a799417c47"

"@types/node@^6.0.46":
  version "6.14.2"
  resolved "https://registry.yarnpkg.com/@types/node/-/node-6.14.2.tgz#40b3dbb1221c7d66802cbcc32fe3b85e54569c77"

"@types/node@~8.9.4":
  version "8.9.5"
  resolved "http://registry.npmjs.org/@types/node/-/node-8.9.5.tgz#162b864bc70be077e6db212b322754917929e976"

"@types/q@^0.0.32":
  version "0.0.32"
  resolved "http://registry.npmjs.org/@types/q/-/q-0.0.32.tgz#bd284e57c84f1325da702babfc82a5328190c0c5"

"@types/selenium-webdriver@^3.0.0":
  version "3.0.13"
  resolved "https://registry.yarnpkg.com/@types/selenium-webdriver/-/selenium-webdriver-3.0.13.tgz#deb799c641773c5e367abafc92d1e733d62cddd7"

"@webassemblyjs/ast@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/ast/-/ast-1.7.10.tgz#0cfc61d61286240b72fc522cb755613699eea40a"
  dependencies:
    "@webassemblyjs/helper-module-context" "1.7.10"
    "@webassemblyjs/helper-wasm-bytecode" "1.7.10"
    "@webassemblyjs/wast-parser" "1.7.10"

"@webassemblyjs/floating-point-hex-parser@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.7.10.tgz#ee63d729c6311a85863e369a473f9983f984e4d9"

"@webassemblyjs/helper-api-error@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-api-error/-/helper-api-error-1.7.10.tgz#bfcb3bbe59775357475790a2ad7b289f09b2f198"

"@webassemblyjs/helper-buffer@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-buffer/-/helper-buffer-1.7.10.tgz#0a8c624c67ad0b214d2e003859921a1988cb151b"

"@webassemblyjs/helper-code-frame@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.7.10.tgz#0ab7e22fad0241a173178c73976fc0edf50832ce"
  dependencies:
    "@webassemblyjs/wast-printer" "1.7.10"

"@webassemblyjs/helper-fsm@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-fsm/-/helper-fsm-1.7.10.tgz#0915e7713fbbb735620a9d3e4fa3d7951f97ac64"

"@webassemblyjs/helper-module-context@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-module-context/-/helper-module-context-1.7.10.tgz#9beb83f72740f5ac8075313b5cac5e796510f755"

"@webassemblyjs/helper-wasm-bytecode@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.7.10.tgz#797b1e734bbcfdea8399669cdc58308ef1c7ffc0"

"@webassemblyjs/helper-wasm-section@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.7.10.tgz#c0ea3703c615d7bc3e3507c3b7991c8767b2f20e"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-buffer" "1.7.10"
    "@webassemblyjs/helper-wasm-bytecode" "1.7.10"
    "@webassemblyjs/wasm-gen" "1.7.10"

"@webassemblyjs/ieee754@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/ieee754/-/ieee754-1.7.10.tgz#62c1728b7ef0f66ef8221e2966a0afd75db430df"
  dependencies:
    "@xtuc/ieee754" "^1.2.0"

"@webassemblyjs/leb128@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/leb128/-/leb128-1.7.10.tgz#167e0bb4b06d7701585772a73fba9f4df85439f6"
  dependencies:
    "@xtuc/long" "4.2.1"

"@webassemblyjs/utf8@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/utf8/-/utf8-1.7.10.tgz#b6728f5b6f50364abc155be029f9670e6685605a"

"@webassemblyjs/wasm-edit@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wasm-edit/-/wasm-edit-1.7.10.tgz#83fe3140f5a58f5a30b914702be9f0e59a399092"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-buffer" "1.7.10"
    "@webassemblyjs/helper-wasm-bytecode" "1.7.10"
    "@webassemblyjs/helper-wasm-section" "1.7.10"
    "@webassemblyjs/wasm-gen" "1.7.10"
    "@webassemblyjs/wasm-opt" "1.7.10"
    "@webassemblyjs/wasm-parser" "1.7.10"
    "@webassemblyjs/wast-printer" "1.7.10"

"@webassemblyjs/wasm-gen@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wasm-gen/-/wasm-gen-1.7.10.tgz#4de003806ae29c97ab3707782469b53299570174"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-wasm-bytecode" "1.7.10"
    "@webassemblyjs/ieee754" "1.7.10"
    "@webassemblyjs/leb128" "1.7.10"
    "@webassemblyjs/utf8" "1.7.10"

"@webassemblyjs/wasm-opt@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wasm-opt/-/wasm-opt-1.7.10.tgz#d151e31611934a556c82789fdeec41a814993c2a"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-buffer" "1.7.10"
    "@webassemblyjs/wasm-gen" "1.7.10"
    "@webassemblyjs/wasm-parser" "1.7.10"

"@webassemblyjs/wasm-parser@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wasm-parser/-/wasm-parser-1.7.10.tgz#0367be7bf8f09e3e6abc95f8e483b9206487ec65"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-api-error" "1.7.10"
    "@webassemblyjs/helper-wasm-bytecode" "1.7.10"
    "@webassemblyjs/ieee754" "1.7.10"
    "@webassemblyjs/leb128" "1.7.10"
    "@webassemblyjs/utf8" "1.7.10"

"@webassemblyjs/wast-parser@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wast-parser/-/wast-parser-1.7.10.tgz#058f598b52f730b23fc874d4775b6286b6247264"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/floating-point-hex-parser" "1.7.10"
    "@webassemblyjs/helper-api-error" "1.7.10"
    "@webassemblyjs/helper-code-frame" "1.7.10"
    "@webassemblyjs/helper-fsm" "1.7.10"
    "@xtuc/long" "4.2.1"

"@webassemblyjs/wast-printer@1.7.10":
  version "1.7.10"
  resolved "https://registry.yarnpkg.com/@webassemblyjs/wast-printer/-/wast-printer-1.7.10.tgz#d817909d2450ae96c66b7607624d98a33b84223b"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/wast-parser" "1.7.10"
    "@xtuc/long" "4.2.1"

"@xtuc/ieee754@^1.2.0":
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/@xtuc/ieee754/-/ieee754-1.2.0.tgz#eef014a3145ae477a1cbc00cd1e552336dceb790"

"@xtuc/long@4.2.1":
  version "4.2.1"
  resolved "https://registry.yarnpkg.com/@xtuc/long/-/long-4.2.1.tgz#5c85d662f76fa1d34575766c5dcd6615abcd30d8"

"@yarnpkg/lockfile@1.1.0":
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/@yarnpkg/lockfile/-/lockfile-1.1.0.tgz#e77a97fbd345b76d83245edcd17d393b1b41fb31"

JSONStream@^1.3.4:
  version "1.3.5"
  resolved "https://registry.yarnpkg.com/JSONStream/-/JSONStream-1.3.5.tgz#3208c1f08d3a4d99261ab64f92302bc15e111ca0"
  dependencies:
    jsonparse "^1.2.0"
    through ">=2.2.7 <3"

abab@^1.0.0:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/abab/-/abab-1.0.4.tgz#5faad9c2c07f60dd76770f71cf025b62a63cfd4e"

abbrev@1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/abbrev/-/abbrev-1.1.1.tgz#f8f2c887ad10bf67f634f005b6987fed3179aac8"

abbrev@1.0.x:
  version "1.0.9"
  resolved "https://registry.yarnpkg.com/abbrev/-/abbrev-1.0.9.tgz#91b4792588a7738c25f35dd6f63752a2f8776135"

accepts@~1.3.4, accepts@~1.3.5:
  version "1.3.5"
  resolved "https://registry.yarnpkg.com/accepts/-/accepts-1.3.5.tgz#eb777df6011723a3b14e8a72c0805c8e86746bd2"
  dependencies:
    mime-types "~2.1.18"
    negotiator "0.6.1"

acorn-dynamic-import@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/acorn-dynamic-import/-/acorn-dynamic-import-3.0.0.tgz#901ceee4c7faaef7e07ad2a47e890675da50a278"
  dependencies:
    acorn "^5.0.0"

acorn-globals@^1.0.4:
  version "1.0.9"
  resolved "http://registry.npmjs.org/acorn-globals/-/acorn-globals-1.0.9.tgz#55bb5e98691507b74579d0513413217c380c54cf"
  dependencies:
    acorn "^2.1.0"

acorn@^2.1.0, acorn@^2.4.0:
  version "2.7.0"
  resolved "http://registry.npmjs.org/acorn/-/acorn-2.7.0.tgz#ab6e7d9d886aaca8b085bc3312b79a198433f0e7"

acorn@^5.0.0, acorn@^5.6.2:
  version "5.7.3"
  resolved "https://registry.yarnpkg.com/acorn/-/acorn-5.7.3.tgz#67aa231bf8812974b85235a96771eb6bd07ea279"

add@^2.0.6:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/add/-/add-2.0.6.tgz#248f0a9f6e5a528ef2295dbeec30532130ae2235"

adm-zip@^0.4.9:
  version "0.4.13"
  resolved "https://registry.yarnpkg.com/adm-zip/-/adm-zip-0.4.13.tgz#597e2f8cc3672151e1307d3e95cddbc75672314a"

after@0.8.2:
  version "0.8.2"
  resolved "https://registry.yarnpkg.com/after/-/after-0.8.2.tgz#fedb394f9f0e02aa9768e702bda23b505fae7e1f"

agent-base@4, agent-base@^4.1.0, agent-base@~4.2.0:
  version "4.2.1"
  resolved "https://registry.yarnpkg.com/agent-base/-/agent-base-4.2.1.tgz#d89e5999f797875674c07d87f260fc41e83e8ca9"
  dependencies:
    es6-promisify "^5.0.0"

agentkeepalive@^3.4.1:
  version "3.5.2"
  resolved "https://registry.yarnpkg.com/agentkeepalive/-/agentkeepalive-3.5.2.tgz#a113924dd3fa24a0bc3b78108c450c2abee00f67"
  dependencies:
    humanize-ms "^1.2.1"

ajv-errors@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/ajv-errors/-/ajv-errors-1.0.0.tgz#ecf021fa108fd17dfb5e6b383f2dd233e31ffc59"

ajv-keywords@^3.1.0:
  version "3.2.0"
  resolved "https://registry.yarnpkg.com/ajv-keywords/-/ajv-keywords-3.2.0.tgz#e86b819c602cf8821ad637413698f1dec021847a"

ajv@6.5.3:
  version "6.5.3"
  resolved "https://registry.yarnpkg.com/ajv/-/ajv-6.5.3.tgz#71a569d189ecf4f4f321224fecb166f071dd90f9"
  dependencies:
    fast-deep-equal "^2.0.1"
    fast-json-stable-stringify "^2.0.0"
    json-schema-traverse "^0.4.1"
    uri-js "^4.2.2"

ajv@^5.0.0:
  version "5.5.2"
  resolved "https://registry.yarnpkg.com/ajv/-/ajv-5.5.2.tgz#73b5eeca3fab653e3d3f9422b341ad42205dc965"
  dependencies:
    co "^4.6.0"
    fast-deep-equal "^1.0.0"
    fast-json-stable-stringify "^2.0.0"
    json-schema-traverse "^0.3.0"

ajv@^6.1.0, ajv@^6.5.5:
  version "6.6.1"
  resolved "https://registry.yarnpkg.com/ajv/-/ajv-6.6.1.tgz#6360f5ed0d80f232cc2b294c362d5dc2e538dd61"
  dependencies:
    fast-deep-equal "^2.0.1"
    fast-json-stable-stringify "^2.0.0"
    json-schema-traverse "^0.4.1"
    uri-js "^4.2.2"

amdefine@>=0.0.4:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/amdefine/-/amdefine-1.0.1.tgz#4a5282ac164729e93619bcfd3ad151f817ce91f5"

ansi-align@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/ansi-align/-/ansi-align-2.0.0.tgz#c36aeccba563b89ceb556f3690f0b1d9e3547f7f"
  dependencies:
    string-width "^2.0.0"

ansi-colors@^3.0.0:
  version "3.2.1"
  resolved "https://registry.yarnpkg.com/ansi-colors/-/ansi-colors-3.2.1.tgz#9638047e4213f3428a11944a7d4b31cba0a3ff95"

ansi-escapes@^1.1.0:
  version "1.4.0"
  resolved "http://registry.npmjs.org/ansi-escapes/-/ansi-escapes-1.4.0.tgz#d3a8a83b319aa67793662b13e761c7911422306e"

ansi-escapes@^3.0.0:
  version "3.1.0"
  resolved "http://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.1.0.tgz#f73207bb81207d75fd6c83f125af26eea378ca30"

ansi-html@0.0.7:
  version "0.0.7"
  resolved "https://registry.yarnpkg.com/ansi-html/-/ansi-html-0.0.7.tgz#813584021962a9e9e6fd039f940d12f56ca7859e"

ansi-regex@^2.0.0:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/ansi-regex/-/ansi-regex-2.1.1.tgz#c3b33ab5ee360d86e0e628f0468ae7ef27d654df"

ansi-regex@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/ansi-regex/-/ansi-regex-3.0.0.tgz#ed0317c322064f79466c02966bddb605ab37d998"

ansi-styles@^2.2.1:
  version "2.2.1"
  resolved "https://registry.yarnpkg.com/ansi-styles/-/ansi-styles-2.2.1.tgz#b432dd3358b634cf75e1e4664368240533c1ddbe"

ansi-styles@^3.2.1:
  version "3.2.1"
  resolved "https://registry.yarnpkg.com/ansi-styles/-/ansi-styles-3.2.1.tgz#41fbb20243e50b12be0f04b8dedbf07520ce841d"
  dependencies:
    color-convert "^1.9.0"

anymatch@^1.3.0:
  version "1.3.2"
  resolved "https://registry.yarnpkg.com/anymatch/-/anymatch-1.3.2.tgz#553dcb8f91e3c889845dfdba34c77721b90b9d7a"
  dependencies:
    micromatch "^2.1.5"
    normalize-path "^2.0.0"

anymatch@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/anymatch/-/anymatch-2.0.0.tgz#bcb24b4f37934d9aa7ac17b4adaf89e7c76ef2eb"
  dependencies:
    micromatch "^3.1.4"
    normalize-path "^2.1.1"

app-root-path@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/app-root-path/-/app-root-path-2.1.0.tgz#98bf6599327ecea199309866e8140368fd2e646a"

append-transform@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/append-transform/-/append-transform-1.0.0.tgz#046a52ae582a228bd72f58acfbe2967c678759ab"
  dependencies:
    default-require-extensions "^2.0.0"

aproba@^1.0.3, aproba@^1.1.1:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/aproba/-/aproba-1.2.0.tgz#6802e6264efd18c790a1b0d517f0f2627bf2c94a"

are-we-there-yet@~1.1.2:
  version "1.1.5"
  resolved "https://registry.yarnpkg.com/are-we-there-yet/-/are-we-there-yet-1.1.5.tgz#4b35c2944f062a8bfcda66410760350fe9ddfc21"
  dependencies:
    delegates "^1.0.0"
    readable-stream "^2.0.6"

argparse@^1.0.7:
  version "1.0.10"
  resolved "https://registry.yarnpkg.com/argparse/-/argparse-1.0.10.tgz#bcd6791ea5ae09725e17e5ad988134cd40b3d911"
  dependencies:
    sprintf-js "~1.0.2"

arr-diff@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/arr-diff/-/arr-diff-2.0.0.tgz#8f3b827f955a8bd669697e4a4256ac3ceae356cf"
  dependencies:
    arr-flatten "^1.0.1"

arr-diff@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/arr-diff/-/arr-diff-4.0.0.tgz#d6461074febfec71e7e15235761a329a5dc7c520"

arr-flatten@^1.0.1, arr-flatten@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/arr-flatten/-/arr-flatten-1.1.0.tgz#36048bbff4e7b47e136644316c99669ea5ae91f1"

arr-union@^3.1.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/arr-union/-/arr-union-3.1.0.tgz#e39b09aea9def866a8f206e288af63919bae39c4"

array-equal@^1.0.0:
  version "1.0.0"
  resolved "http://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz#8c2a5ef2472fd9ea742b04c77a75093ba2757c93"

array-find-index@^1.0.1:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/array-find-index/-/array-find-index-1.0.2.tgz#df010aa1287e164bbda6f9723b0a96a1ec4187a1"

array-flatten@1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/array-flatten/-/array-flatten-1.1.1.tgz#9a5f699051b1e7073328f2a008968b64ea2955d2"

array-flatten@^2.1.0:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/array-flatten/-/array-flatten-2.1.1.tgz#426bb9da84090c1838d812c8150af20a8331e296"

array-slice@^0.2.3:
  version "0.2.3"
  resolved "https://registry.yarnpkg.com/array-slice/-/array-slice-0.2.3.tgz#dd3cfb80ed7973a75117cdac69b0b99ec86186f5"

array-union@^1.0.1:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/array-union/-/array-union-1.0.2.tgz#9a34410e4f4e3da23dea375be5be70f24778ec39"
  dependencies:
    array-uniq "^1.0.1"

array-uniq@^1.0.1:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/array-uniq/-/array-uniq-1.0.3.tgz#af6ac877a25cc7f74e058894753858dfdb24fdb6"

array-unique@^0.2.1:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/array-unique/-/array-unique-0.2.1.tgz#a1d97ccafcbc2625cc70fadceb36a50c58b01a53"

array-unique@^0.3.2:
  version "0.3.2"
  resolved "https://registry.yarnpkg.com/array-unique/-/array-unique-0.3.2.tgz#a894b75d4bc4f6cd679ef3244a9fd8f46ae2d428"

arraybuffer.slice@~0.0.7:
  version "0.0.7"
  resolved "https://registry.yarnpkg.com/arraybuffer.slice/-/arraybuffer.slice-0.0.7.tgz#3bbc4275dd584cc1b10809b89d4e8b63a69e7675"

arrify@^1.0.0, arrify@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/arrify/-/arrify-1.0.1.tgz#898508da2226f380df904728456849c1501a4b0d"

asap@~2.0.3:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/asap/-/asap-2.0.6.tgz#e50347611d7e690943208bbdafebcbc2fb866d46"

asn1.js@^4.0.0:
  version "4.10.1"
  resolved "https://registry.yarnpkg.com/asn1.js/-/asn1.js-4.10.1.tgz#b9c2bf5805f1e64aadeed6df3a2bfafb5a73f5a0"
  dependencies:
    bn.js "^4.0.0"
    inherits "^2.0.1"
    minimalistic-assert "^1.0.0"

asn1@~0.2.3:
  version "0.2.4"
  resolved "https://registry.yarnpkg.com/asn1/-/asn1-0.2.4.tgz#8d2475dfab553bb33e77b54e59e880bb8ce23136"
  dependencies:
    safer-buffer "~2.1.0"

assert-plus@1.0.0, assert-plus@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/assert-plus/-/assert-plus-1.0.0.tgz#f12e0f3c5d77b0b1cdd9146942e4e96c1e4dd525"

assert@^1.1.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/assert/-/assert-1.4.1.tgz#99912d591836b5a6f5b345c0f07eefc08fc65d91"
  dependencies:
    util "0.10.3"

assign-symbols@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/assign-symbols/-/assign-symbols-1.0.0.tgz#59667f41fadd4f20ccbc2bb96b8d4f7f78ec0367"

async-each@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/async-each/-/async-each-1.0.1.tgz#19d386a1d9edc6e7c1c85d388aedbcc56d33602d"

async-foreach@^0.1.3:
  version "0.1.3"
  resolved "https://registry.yarnpkg.com/async-foreach/-/async-foreach-0.1.3.tgz#36121f845c0578172de419a97dbeb1d16ec34542"

async-limiter@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/async-limiter/-/async-limiter-1.0.0.tgz#78faed8c3d074ab81f22b4e985d79e8738f720f8"

async@1.x, async@^1.5.2:
  version "1.5.2"
  resolved "http://registry.npmjs.org/async/-/async-1.5.2.tgz#ec6a61ae56480c0c3cb241c95618e20892f9672a"

async@^2.5.0, async@^2.6.1:
  version "2.6.1"
  resolved "https://registry.yarnpkg.com/async/-/async-2.6.1.tgz#b245a23ca71930044ec53fa46aa00a3e87c6a610"
  dependencies:
    lodash "^4.17.10"

asynckit@^0.4.0:
  version "0.4.0"
  resolved "https://registry.yarnpkg.com/asynckit/-/asynckit-0.4.0.tgz#c79ed97f7f34cb8f2ba1bc9790bcc366474b4b79"

atob@^2.1.1:
  version "2.1.2"
  resolved "https://registry.yarnpkg.com/atob/-/atob-2.1.2.tgz#6d9517eb9e030d2436666651e86bd9f6f13533c9"

autoprefixer@9.3.1:
  version "9.3.1"
  resolved "https://registry.yarnpkg.com/autoprefixer/-/autoprefixer-9.3.1.tgz#71b622174de2b783d5fd99f9ad617b7a3c78443e"
  dependencies:
    browserslist "^4.3.3"
    caniuse-lite "^1.0.30000898"
    normalize-range "^0.1.2"
    num2fraction "^1.2.2"
    postcss "^7.0.5"
    postcss-value-parser "^3.3.1"

autoprefixer@^9.0.0:
  version "9.4.2"
  resolved "https://registry.yarnpkg.com/autoprefixer/-/autoprefixer-9.4.2.tgz#0234d20900684fc4bfb67926493deb68384067f5"
  dependencies:
    browserslist "^4.3.5"
    caniuse-lite "^1.0.30000914"
    normalize-range "^0.1.2"
    num2fraction "^1.2.2"
    postcss "^7.0.6"
    postcss-value-parser "^3.3.1"

aws-sign2@~0.7.0:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/aws-sign2/-/aws-sign2-0.7.0.tgz#b46e890934a9591f2d2f6f86d7e6a9f1b3fe76a8"

aws4@^1.8.0:
  version "1.8.0"
  resolved "https://registry.yarnpkg.com/aws4/-/aws4-1.8.0.tgz#f0e003d9ca9e7f59c7a508945d7b2ef9a04a542f"

babel-code-frame@^6.22.0, babel-code-frame@^6.26.0:
  version "6.26.0"
  resolved "https://registry.yarnpkg.com/babel-code-frame/-/babel-code-frame-6.26.0.tgz#63fd43f7dc1e3bb7ce35947db8fe369a3f58c74b"
  dependencies:
    chalk "^1.1.3"
    esutils "^2.0.2"
    js-tokens "^3.0.2"

babel-generator@^6.18.0:
  version "6.26.1"
  resolved "https://registry.yarnpkg.com/babel-generator/-/babel-generator-6.26.1.tgz#1844408d3b8f0d35a404ea7ac180f087a601bd90"
  dependencies:
    babel-messages "^6.23.0"
    babel-runtime "^6.26.0"
    babel-types "^6.26.0"
    detect-indent "^4.0.0"
    jsesc "^1.3.0"
    lodash "^4.17.4"
    source-map "^0.5.7"
    trim-right "^1.0.1"

babel-messages@^6.23.0:
  version "6.23.0"
  resolved "https://registry.yarnpkg.com/babel-messages/-/babel-messages-6.23.0.tgz#f3cdf4703858035b2a2951c6ec5edf6c62f2630e"
  dependencies:
    babel-runtime "^6.22.0"

babel-polyfill@6.23.0:
  version "6.23.0"
  resolved "https://registry.yarnpkg.com/babel-polyfill/-/babel-polyfill-6.23.0.tgz#8364ca62df8eafb830499f699177466c3b03499d"
  dependencies:
    babel-runtime "^6.22.0"
    core-js "^2.4.0"
    regenerator-runtime "^0.10.0"

babel-runtime@^6.22.0, babel-runtime@^6.26.0:
  version "6.26.0"
  resolved "https://registry.yarnpkg.com/babel-runtime/-/babel-runtime-6.26.0.tgz#965c7058668e82b55d7bfe04ff2337bc8b5647fe"
  dependencies:
    core-js "^2.4.0"
    regenerator-runtime "^0.11.0"

babel-template@^6.16.0:
  version "6.26.0"
  resolved "https://registry.yarnpkg.com/babel-template/-/babel-template-6.26.0.tgz#de03e2d16396b069f46dd9fff8521fb1a0e35e02"
  dependencies:
    babel-runtime "^6.26.0"
    babel-traverse "^6.26.0"
    babel-types "^6.26.0"
    babylon "^6.18.0"
    lodash "^4.17.4"

babel-traverse@^6.18.0, babel-traverse@^6.26.0:
  version "6.26.0"
  resolved "https://registry.yarnpkg.com/babel-traverse/-/babel-traverse-6.26.0.tgz#46a9cbd7edcc62c8e5c064e2d2d8d0f4035766ee"
  dependencies:
    babel-code-frame "^6.26.0"
    babel-messages "^6.23.0"
    babel-runtime "^6.26.0"
    babel-types "^6.26.0"
    babylon "^6.18.0"
    debug "^2.6.8"
    globals "^9.18.0"
    invariant "^2.2.2"
    lodash "^4.17.4"

babel-types@^6.18.0, babel-types@^6.26.0:
  version "6.26.0"
  resolved "https://registry.yarnpkg.com/babel-types/-/babel-types-6.26.0.tgz#a3b073f94ab49eb6fa55cd65227a334380632497"
  dependencies:
    babel-runtime "^6.26.0"
    esutils "^2.0.2"
    lodash "^4.17.4"
    to-fast-properties "^1.0.3"

babylon@^6.18.0:
  version "6.18.0"
  resolved "https://registry.yarnpkg.com/babylon/-/babylon-6.18.0.tgz#af2f3b88fa6f5c1e4c634d1a0f8eac4f55b395e3"

backo2@1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/backo2/-/backo2-1.0.2.tgz#31ab1ac8b129363463e35b3ebb69f4dfcfba7947"

balanced-match@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/balanced-match/-/balanced-match-1.0.0.tgz#89b4d199ab2bee49de164ea02b89ce462d71b767"

base64-arraybuffer@0.1.5:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/base64-arraybuffer/-/base64-arraybuffer-0.1.5.tgz#73926771923b5a19747ad666aa5cd4bf9c6e9ce8"

base64-js@^1.0.2:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/base64-js/-/base64-js-1.3.0.tgz#cab1e6118f051095e58b5281aea8c1cd22bfc0e3"

base64id@1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/base64id/-/base64id-1.0.0.tgz#47688cb99bb6804f0e06d3e763b1c32e57d8e6b6"

base@^0.11.1:
  version "0.11.2"
  resolved "https://registry.yarnpkg.com/base/-/base-0.11.2.tgz#7bde5ced145b6d551a90db87f83c558b4eb48a8f"
  dependencies:
    cache-base "^1.0.1"
    class-utils "^0.3.5"
    component-emitter "^1.2.1"
    define-property "^1.0.0"
    isobject "^3.0.1"
    mixin-deep "^1.2.0"
    pascalcase "^0.1.1"

batch@0.6.1:
  version "0.6.1"
  resolved "https://registry.yarnpkg.com/batch/-/batch-0.6.1.tgz#dc34314f4e679318093fc760272525f94bf25c16"

bcrypt-pbkdf@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz#a4301d389b6a43f9b67ff3ca11a3f6637e360e9e"
  dependencies:
    tweetnacl "^0.14.3"

better-assert@~1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/better-assert/-/better-assert-1.0.2.tgz#40866b9e1b9e0b55b481894311e68faffaebc522"
  dependencies:
    callsite "1.0.0"

big.js@^3.1.3:
  version "3.2.0"
  resolved "https://registry.yarnpkg.com/big.js/-/big.js-3.2.0.tgz#a5fc298b81b9e0dca2e458824784b65c52ba588e"

binary-extensions@^1.0.0:
  version "1.12.0"
  resolved "https://registry.yarnpkg.com/binary-extensions/-/binary-extensions-1.12.0.tgz#c2d780f53d45bba8317a8902d4ceeaf3a6385b14"

blob@0.0.5:
  version "0.0.5"
  resolved "https://registry.yarnpkg.com/blob/-/blob-0.0.5.tgz#d680eeef25f8cd91ad533f5b01eed48e64caf683"

block-stream@*:
  version "0.0.9"
  resolved "https://registry.yarnpkg.com/block-stream/-/block-stream-0.0.9.tgz#13ebfe778a03205cfe03751481ebb4b3300c126a"
  dependencies:
    inherits "~2.0.0"

blocking-proxy@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/blocking-proxy/-/blocking-proxy-1.0.1.tgz#81d6fd1fe13a4c0d6957df7f91b75e98dac40cb2"
  dependencies:
    minimist "^1.2.0"

bluebird@^3.3.0, bluebird@^3.5.1, bluebird@^3.5.2:
  version "3.5.3"
  resolved "https://registry.yarnpkg.com/bluebird/-/bluebird-3.5.3.tgz#7d01c6f9616c9a51ab0f8c549a79dfe6ec33efa7"

bn.js@^4.0.0, bn.js@^4.1.0, bn.js@^4.1.1, bn.js@^4.4.0:
  version "4.11.8"
  resolved "https://registry.yarnpkg.com/bn.js/-/bn.js-4.11.8.tgz#2cde09eb5ee341f484746bb0309b3253b1b1442f"

body-parser@1.18.3, body-parser@^1.16.1:
  version "1.18.3"
  resolved "https://registry.yarnpkg.com/body-parser/-/body-parser-1.18.3.tgz#5b292198ffdd553b3a0f20ded0592b956955c8b4"
  dependencies:
    bytes "3.0.0"
    content-type "~1.0.4"
    debug "2.6.9"
    depd "~1.1.2"
    http-errors "~1.6.3"
    iconv-lite "0.4.23"
    on-finished "~2.3.0"
    qs "6.5.2"
    raw-body "2.3.3"
    type-is "~1.6.16"

bonjour@^3.5.0:
  version "3.5.0"
  resolved "https://registry.yarnpkg.com/bonjour/-/bonjour-3.5.0.tgz#8e890a183d8ee9a2393b3844c691a42bcf7bc9f5"
  dependencies:
    array-flatten "^2.1.0"
    deep-equal "^1.0.1"
    dns-equal "^1.0.0"
    dns-txt "^2.0.2"
    multicast-dns "^6.0.1"
    multicast-dns-service-types "^1.1.0"

boxen@^1.2.1:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/boxen/-/boxen-1.3.0.tgz#55c6c39a8ba58d9c61ad22cd877532deb665a20b"
  dependencies:
    ansi-align "^2.0.0"
    camelcase "^4.0.0"
    chalk "^2.0.1"
    cli-boxes "^1.0.0"
    string-width "^2.0.0"
    term-size "^1.2.0"
    widest-line "^2.0.0"

brace-expansion@^1.1.7:
  version "1.1.11"
  resolved "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-1.1.11.tgz#3c7fcbf529d87226f3d2f52b966ff5271eb441dd"
  dependencies:
    balanced-match "^1.0.0"
    concat-map "0.0.1"

braces@^0.1.2:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/braces/-/braces-0.1.5.tgz#c085711085291d8b75fdd74eab0f8597280711e6"
  dependencies:
    expand-range "^0.1.0"

braces@^1.8.2:
  version "1.8.5"
  resolved "https://registry.yarnpkg.com/braces/-/braces-1.8.5.tgz#ba77962e12dff969d6b76711e914b737857bf6a7"
  dependencies:
    expand-range "^1.8.1"
    preserve "^0.2.0"
    repeat-element "^1.1.2"

braces@^2.3.0, braces@^2.3.1:
  version "2.3.2"
  resolved "https://registry.yarnpkg.com/braces/-/braces-2.3.2.tgz#5979fd3f14cd531565e5fa2df1abfff1dfaee729"
  dependencies:
    arr-flatten "^1.1.0"
    array-unique "^0.3.2"
    extend-shallow "^2.0.1"
    fill-range "^4.0.0"
    isobject "^3.0.1"
    repeat-element "^1.1.2"
    snapdragon "^0.8.1"
    snapdragon-node "^2.0.1"
    split-string "^3.0.2"
    to-regex "^3.0.1"

brorand@^1.0.1:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/brorand/-/brorand-1.1.0.tgz#12c25efe40a45e3c323eb8675a0a0ce57b22371f"

browserify-aes@^1.0.0, browserify-aes@^1.0.4:
  version "1.2.0"
  resolved "http://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz#326734642f403dabc3003209853bb70ad428ef48"
  dependencies:
    buffer-xor "^1.0.3"
    cipher-base "^1.0.0"
    create-hash "^1.1.0"
    evp_bytestokey "^1.0.3"
    inherits "^2.0.1"
    safe-buffer "^5.0.1"

browserify-cipher@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/browserify-cipher/-/browserify-cipher-1.0.1.tgz#8d6474c1b870bfdabcd3bcfcc1934a10e94f15f0"
  dependencies:
    browserify-aes "^1.0.4"
    browserify-des "^1.0.0"
    evp_bytestokey "^1.0.0"

browserify-des@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/browserify-des/-/browserify-des-1.0.2.tgz#3af4f1f59839403572f1c66204375f7a7f703e9c"
  dependencies:
    cipher-base "^1.0.1"
    des.js "^1.0.0"
    inherits "^2.0.1"
    safe-buffer "^5.1.2"

browserify-rsa@^4.0.0:
  version "4.0.1"
  resolved "http://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz#21e0abfaf6f2029cf2fafb133567a701d4135524"
  dependencies:
    bn.js "^4.1.0"
    randombytes "^2.0.1"

browserify-sign@^4.0.0:
  version "4.0.4"
  resolved "https://registry.yarnpkg.com/browserify-sign/-/browserify-sign-4.0.4.tgz#aa4eb68e5d7b658baa6bf6a57e630cbd7a93d298"
  dependencies:
    bn.js "^4.1.1"
    browserify-rsa "^4.0.0"
    create-hash "^1.1.0"
    create-hmac "^1.1.2"
    elliptic "^6.0.0"
    inherits "^2.0.1"
    parse-asn1 "^5.0.0"

browserify-zlib@^0.2.0:
  version "0.2.0"
  resolved "https://registry.yarnpkg.com/browserify-zlib/-/browserify-zlib-0.2.0.tgz#2869459d9aa3be245fe8fe2ca1f46e2e7f54d73f"
  dependencies:
    pako "~1.0.5"

browserslist@^4.0.0, browserslist@^4.3.3, browserslist@^4.3.5:
  version "4.3.5"
  resolved "https://registry.yarnpkg.com/browserslist/-/browserslist-4.3.5.tgz#1a917678acc07b55606748ea1adf9846ea8920f7"
  dependencies:
    caniuse-lite "^1.0.30000912"
    electron-to-chromium "^1.3.86"
    node-releases "^1.0.5"

browserstack@^1.5.1:
  version "1.5.1"
  resolved "https://registry.yarnpkg.com/browserstack/-/browserstack-1.5.1.tgz#e2dfa66ffee940ebad0a07f7e00fd4687c455d66"
  dependencies:
    https-proxy-agent "^2.2.1"

buffer-alloc-unsafe@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/buffer-alloc-unsafe/-/buffer-alloc-unsafe-1.1.0.tgz#bd7dc26ae2972d0eda253be061dba992349c19f0"

buffer-alloc@^1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/buffer-alloc/-/buffer-alloc-1.2.0.tgz#890dd90d923a873e08e10e5fd51a57e5b7cce0ec"
  dependencies:
    buffer-alloc-unsafe "^1.1.0"
    buffer-fill "^1.0.0"

buffer-fill@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/buffer-fill/-/buffer-fill-1.0.0.tgz#f8f78b76789888ef39f205cd637f68e702122b2c"

buffer-from@^1.0.0, buffer-from@^1.1.0:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/buffer-from/-/buffer-from-1.1.1.tgz#32713bc028f75c02fdb710d7c7bcec1f2c6070ef"

buffer-indexof@^1.0.0:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/buffer-indexof/-/buffer-indexof-1.1.1.tgz#52fabcc6a606d1a00302802648ef68f639da268c"

buffer-xor@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/buffer-xor/-/buffer-xor-1.0.3.tgz#26e61ed1422fb70dd42e6e36729ed51d855fe8d9"

buffer@^4.3.0:
  version "4.9.1"
  resolved "http://registry.npmjs.org/buffer/-/buffer-4.9.1.tgz#6d1bb601b07a4efced97094132093027c95bc298"
  dependencies:
    base64-js "^1.0.2"
    ieee754 "^1.1.4"
    isarray "^1.0.0"

builtin-modules@^1.0.0, builtin-modules@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/builtin-modules/-/builtin-modules-1.1.1.tgz#270f076c5a72c02f5b65a47df94c5fe3a278892f"

builtin-modules@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/builtin-modules/-/builtin-modules-2.0.0.tgz#60b7ef5ae6546bd7deefa74b08b62a43a232648e"

builtin-status-codes@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz#85982878e21b98e1c66425e03d0174788f569ee8"

builtins@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/builtins/-/builtins-1.0.3.tgz#cb94faeb61c8696451db36534e1422f94f0aee88"

bytes@3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/bytes/-/bytes-3.0.0.tgz#d32815404d689699f85a4ea4fa8755dd13a96048"

cacache@^10.0.4:
  version "10.0.4"
  resolved "http://registry.npmjs.org/cacache/-/cacache-10.0.4.tgz#6452367999eff9d4188aefd9a14e9d7c6a263460"
  dependencies:
    bluebird "^3.5.1"
    chownr "^1.0.1"
    glob "^7.1.2"
    graceful-fs "^4.1.11"
    lru-cache "^4.1.1"
    mississippi "^2.0.0"
    mkdirp "^0.5.1"
    move-concurrently "^1.0.1"
    promise-inflight "^1.0.1"
    rimraf "^2.6.2"
    ssri "^5.2.4"
    unique-filename "^1.1.0"
    y18n "^4.0.0"

cacache@^11.0.1, cacache@^11.0.2, cacache@^11.2.0:
  version "11.3.1"
  resolved "https://registry.yarnpkg.com/cacache/-/cacache-11.3.1.tgz#d09d25f6c4aca7a6d305d141ae332613aa1d515f"
  dependencies:
    bluebird "^3.5.1"
    chownr "^1.0.1"
    figgy-pudding "^3.1.0"
    glob "^7.1.2"
    graceful-fs "^4.1.11"
    lru-cache "^4.1.3"
    mississippi "^3.0.0"
    mkdirp "^0.5.1"
    move-concurrently "^1.0.1"
    promise-inflight "^1.0.1"
    rimraf "^2.6.2"
    ssri "^6.0.0"
    unique-filename "^1.1.0"
    y18n "^4.0.0"

cache-base@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/cache-base/-/cache-base-1.0.1.tgz#0a7f46416831c8b662ee36fe4e7c59d76f666ab2"
  dependencies:
    collection-visit "^1.0.0"
    component-emitter "^1.2.1"
    get-value "^2.0.6"
    has-value "^1.0.0"
    isobject "^3.0.1"
    set-value "^2.0.0"
    to-object-path "^0.3.0"
    union-value "^1.0.0"
    unset-value "^1.0.0"

callsite@1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/callsite/-/callsite-1.0.0.tgz#280398e5d664bd74038b6f0905153e6e8af1bc20"

camelcase-keys@^2.0.0:
  version "2.1.0"
  resolved "http://registry.npmjs.org/camelcase-keys/-/camelcase-keys-2.1.0.tgz#308beeaffdf28119051efa1d932213c91b8f92e7"
  dependencies:
    camelcase "^2.0.0"
    map-obj "^1.0.0"

camelcase@^2.0.0:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/camelcase/-/camelcase-2.1.1.tgz#7c1d16d679a1bbe59ca02cacecfb011e201f5a1f"

camelcase@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/camelcase/-/camelcase-3.0.0.tgz#32fc4b9fcdaf845fcdf7e73bb97cac2261f0ab0a"

camelcase@^4.0.0, camelcase@^4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/camelcase/-/camelcase-4.1.0.tgz#d545635be1e33c542649c69173e5de6acfae34dd"

caniuse-lite@^1.0.30000898, caniuse-lite@^1.0.30000912:
  version "1.0.30000912"
  resolved "https://registry.yarnpkg.com/caniuse-lite/-/caniuse-lite-1.0.30000912.tgz#08e650d4090a9c0ab06bfd2b46b7d3ad6dcaea28"

caniuse-lite@^1.0.30000914:
  version "1.0.30000916"
  resolved "https://registry.yarnpkg.com/caniuse-lite/-/caniuse-lite-1.0.30000916.tgz#3428d3f529f0a7b2bfaaec65e796037bdd433aab"

canonical-path@1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/canonical-path/-/canonical-path-1.0.0.tgz#fcb470c23958def85081856be7a86e904f180d1d"

canvg@^1.0:
  version "1.5.3"
  resolved "https://registry.yarnpkg.com/canvg/-/canvg-1.5.3.tgz#aad17915f33368bf8eb80b25d129e3ae922ddc5f"
  dependencies:
    jsdom "^8.1.0"
    rgbcolor "^1.0.1"
    stackblur-canvas "^1.4.1"
    xmldom "^0.1.22"

capture-stack-trace@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/capture-stack-trace/-/capture-stack-trace-1.0.1.tgz#a6c0bbe1f38f3aa0b92238ecb6ff42c344d4135d"

caseless@~0.12.0:
  version "0.12.0"
  resolved "https://registry.yarnpkg.com/caseless/-/caseless-0.12.0.tgz#1b681c21ff84033c826543090689420d187151dc"

cf-blob.js@0.0.1:
  version "0.0.1"
  resolved "https://registry.yarnpkg.com/cf-blob.js/-/cf-blob.js-0.0.1.tgz#f5ab7e12e798caf08ccf828c69aba0f063d83f99"

chalk@1.1.3, chalk@^1.0.0, chalk@^1.1.1, chalk@^1.1.3:
  version "1.1.3"
  resolved "http://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz#a8115c55e4a702fe4d150abd3872822a7e09fc98"
  dependencies:
    ansi-styles "^2.2.1"
    escape-string-regexp "^1.0.2"
    has-ansi "^2.0.0"
    strip-ansi "^3.0.0"
    supports-color "^2.0.0"

chalk@^2.0.0, chalk@^2.0.1, chalk@^2.3.0, chalk@^2.3.1, chalk@^2.4.1:
  version "2.4.1"
  resolved "https://registry.yarnpkg.com/chalk/-/chalk-2.4.1.tgz#18c49ab16a037b6eb0152cc83e3471338215b66e"
  dependencies:
    ansi-styles "^3.2.1"
    escape-string-regexp "^1.0.5"
    supports-color "^5.3.0"

chardet@^0.4.0:
  version "0.4.2"
  resolved "https://registry.yarnpkg.com/chardet/-/chardet-0.4.2.tgz#b5473b33dc97c424e5d98dc87d55d4d8a29c8bf2"

chardet@^0.7.0:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/chardet/-/chardet-0.7.0.tgz#90094849f0937f2eedc2425d0d28a9e5f0cbad9e"

chokidar@2.0.4, chokidar@^2.0.0, chokidar@^2.0.2, chokidar@^2.0.3:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/chokidar/-/chokidar-2.0.4.tgz#356ff4e2b0e8e43e322d18a372460bbcf3accd26"
  dependencies:
    anymatch "^2.0.0"
    async-each "^1.0.0"
    braces "^2.3.0"
    glob-parent "^3.1.0"
    inherits "^2.0.1"
    is-binary-path "^1.0.0"
    is-glob "^4.0.0"
    lodash.debounce "^4.0.8"
    normalize-path "^2.1.1"
    path-is-absolute "^1.0.0"
    readdirp "^2.0.0"
    upath "^1.0.5"
  optionalDependencies:
    fsevents "^1.2.2"

chokidar@^1.4.2:
  version "1.7.0"
  resolved "https://registry.yarnpkg.com/chokidar/-/chokidar-1.7.0.tgz#798e689778151c8076b4b360e5edd28cda2bb468"
  dependencies:
    anymatch "^1.3.0"
    async-each "^1.0.0"
    glob-parent "^2.0.0"
    inherits "^2.0.1"
    is-binary-path "^1.0.0"
    is-glob "^2.0.0"
    path-is-absolute "^1.0.0"
    readdirp "^2.0.0"
  optionalDependencies:
    fsevents "^1.0.0"

chownr@^1.0.1, chownr@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/chownr/-/chownr-1.1.1.tgz#54726b8b8fff4df053c42187e801fb4412df1494"

chrome-trace-event@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/chrome-trace-event/-/chrome-trace-event-1.0.0.tgz#45a91bd2c20c9411f0963b5aaeb9a1b95e09cc48"
  dependencies:
    tslib "^1.9.0"

ci-info@^1.5.0:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/ci-info/-/ci-info-1.6.0.tgz#2ca20dbb9ceb32d4524a683303313f0304b1e497"

cipher-base@^1.0.0, cipher-base@^1.0.1, cipher-base@^1.0.3:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/cipher-base/-/cipher-base-1.0.4.tgz#8760e4ecc272f4c363532f926d874aae2c1397de"
  dependencies:
    inherits "^2.0.1"
    safe-buffer "^5.0.1"

circular-dependency-plugin@5.0.2:
  version "5.0.2"
  resolved "https://registry.yarnpkg.com/circular-dependency-plugin/-/circular-dependency-plugin-5.0.2.tgz#da168c0b37e7b43563fb9f912c1c007c213389ef"

circular-json@^0.5.5:
  version "0.5.9"
  resolved "https://registry.yarnpkg.com/circular-json/-/circular-json-0.5.9.tgz#932763ae88f4f7dead7a0d09c8a51a4743a53b1d"

class-utils@^0.3.5:
  version "0.3.6"
  resolved "https://registry.yarnpkg.com/class-utils/-/class-utils-0.3.6.tgz#f93369ae8b9a7ce02fd41faad0ca83033190c463"
  dependencies:
    arr-union "^3.1.0"
    define-property "^0.2.5"
    isobject "^3.0.0"
    static-extend "^0.1.1"

clean-css@4.2.1, clean-css@^4.1.11:
  version "4.2.1"
  resolved "https://registry.yarnpkg.com/clean-css/-/clean-css-4.2.1.tgz#2d411ef76b8569b6d0c84068dabe85b0aa5e5c17"
  dependencies:
    source-map "~0.6.0"

cli-boxes@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/cli-boxes/-/cli-boxes-1.0.0.tgz#4fa917c3e59c94a004cd61f8ee509da651687143"

cli-cursor@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/cli-cursor/-/cli-cursor-2.1.0.tgz#b35dac376479facc3e94747d41d0d0f5238ffcb5"
  dependencies:
    restore-cursor "^2.0.0"

cli-width@^2.0.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/cli-width/-/cli-width-2.2.0.tgz#ff19ede8a9a5e579324147b0c11f0fbcbabed639"

cliui@^3.2.0:
  version "3.2.0"
  resolved "https://registry.yarnpkg.com/cliui/-/cliui-3.2.0.tgz#120601537a916d29940f934da3b48d585a39213d"
  dependencies:
    string-width "^1.0.1"
    strip-ansi "^3.0.1"
    wrap-ansi "^2.0.0"

cliui@^4.0.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/cliui/-/cliui-4.1.0.tgz#348422dbe82d800b3022eef4f6ac10bf2e4d1b49"
  dependencies:
    string-width "^2.1.1"
    strip-ansi "^4.0.0"
    wrap-ansi "^2.0.0"

clone-deep@^2.0.1:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/clone-deep/-/clone-deep-2.0.2.tgz#00db3a1e173656730d1188c3d6aced6d7ea97713"
  dependencies:
    for-own "^1.0.0"
    is-plain-object "^2.0.4"
    kind-of "^6.0.0"
    shallow-clone "^1.0.0"

clone@^2.1.1, clone@^2.1.2:
  version "2.1.2"
  resolved "https://registry.yarnpkg.com/clone/-/clone-2.1.2.tgz#1b7f4b9f591f1e8f83670401600345a02887435f"

co@^4.6.0:
  version "4.6.0"
  resolved "https://registry.yarnpkg.com/co/-/co-4.6.0.tgz#6ea6bdf3d853ae54ccb8e47bfa0bf3f9031fb184"

code-point-at@^1.0.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/code-point-at/-/code-point-at-1.1.0.tgz#0d070b4d043a5bea33a2f1a40e2edb3d9a4ccf77"

codelyzer@~4.5.0:
  version "4.5.0"
  resolved "https://registry.yarnpkg.com/codelyzer/-/codelyzer-4.5.0.tgz#a65ddeeeca2894653253a89bfa229118ff9f59b1"
  dependencies:
    app-root-path "^2.1.0"
    css-selector-tokenizer "^0.7.0"
    cssauron "^1.4.0"
    semver-dsl "^1.0.1"
    source-map "^0.5.7"
    sprintf-js "^1.1.1"

collection-visit@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/collection-visit/-/collection-visit-1.0.0.tgz#4bc0373c164bc3291b4d368c829cf1a80a59dca0"
  dependencies:
    map-visit "^1.0.0"
    object-visit "^1.0.0"

color-convert@^1.9.0:
  version "1.9.3"
  resolved "https://registry.yarnpkg.com/color-convert/-/color-convert-1.9.3.tgz#bb71850690e1f136567de629d2d5471deda4c1e8"
  dependencies:
    color-name "1.1.3"

color-name@1.1.3:
  version "1.1.3"
  resolved "https://registry.yarnpkg.com/color-name/-/color-name-1.1.3.tgz#a7d0558bd89c42f795dd42328f740831ca53bc25"

colors@1.1.2:
  version "1.1.2"
  resolved "http://registry.npmjs.org/colors/-/colors-1.1.2.tgz#168a4701756b6a7f51a12ce0c97bfa28c084ed63"

colors@^1.1.0:
  version "1.3.2"
  resolved "https://registry.yarnpkg.com/colors/-/colors-1.3.2.tgz#2df8ff573dfbf255af562f8ce7181d6b971a359b"

combine-lists@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/combine-lists/-/combine-lists-1.0.1.tgz#458c07e09e0d900fc28b70a3fec2dacd1d2cb7f6"
  dependencies:
    lodash "^4.5.0"

combined-stream@^1.0.6, combined-stream@~1.0.6:
  version "1.0.7"
  resolved "https://registry.yarnpkg.com/combined-stream/-/combined-stream-1.0.7.tgz#2d1d24317afb8abe95d6d2c0b07b57813539d828"
  dependencies:
    delayed-stream "~1.0.0"

commander@^2.12.0, commander@^2.12.1:
  version "2.19.0"
  resolved "https://registry.yarnpkg.com/commander/-/commander-2.19.0.tgz#f6198aa84e5b83c46054b94ddedbfed5ee9ff12a"

commander@~2.13.0:
  version "2.13.0"
  resolved "https://registry.yarnpkg.com/commander/-/commander-2.13.0.tgz#6964bca67685df7c1f1430c584f07d7597885b9c"

commander@~2.17.1:
  version "2.17.1"
  resolved "https://registry.yarnpkg.com/commander/-/commander-2.17.1.tgz#bd77ab7de6de94205ceacc72f1716d29f20a77bf"

commondir@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/commondir/-/commondir-1.0.1.tgz#ddd800da0c66127393cca5950ea968a3aaf1253b"

compare-versions@^3.2.1:
  version "3.4.0"
  resolved "https://registry.yarnpkg.com/compare-versions/-/compare-versions-3.4.0.tgz#e0747df5c9cb7f054d6d3dc3e1dbc444f9e92b26"

component-bind@1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/component-bind/-/component-bind-1.0.0.tgz#00c608ab7dcd93897c0009651b1d3a8e1e73bbd1"

component-emitter@1.2.1, component-emitter@^1.2.1:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/component-emitter/-/component-emitter-1.2.1.tgz#137918d6d78283f7df7a6b7c5a63e140e69425e6"

component-inherit@0.0.3:
  version "0.0.3"
  resolved "https://registry.yarnpkg.com/component-inherit/-/component-inherit-0.0.3.tgz#645fc4adf58b72b649d5cae65135619db26ff143"

compressible@~2.0.14:
  version "2.0.15"
  resolved "https://registry.yarnpkg.com/compressible/-/compressible-2.0.15.tgz#857a9ab0a7e5a07d8d837ed43fe2defff64fe212"
  dependencies:
    mime-db ">= 1.36.0 < 2"

compression@^1.5.2:
  version "1.7.3"
  resolved "https://registry.yarnpkg.com/compression/-/compression-1.7.3.tgz#27e0e176aaf260f7f2c2813c3e440adb9f1993db"
  dependencies:
    accepts "~1.3.5"
    bytes "3.0.0"
    compressible "~2.0.14"
    debug "2.6.9"
    on-headers "~1.0.1"
    safe-buffer "5.1.2"
    vary "~1.1.2"

concat-map@0.0.1:
  version "0.0.1"
  resolved "https://registry.yarnpkg.com/concat-map/-/concat-map-0.0.1.tgz#d8a96bd77fd68df7793a73036a3ba0d5405d477b"

concat-stream@^1.5.0:
  version "1.6.2"
  resolved "https://registry.yarnpkg.com/concat-stream/-/concat-stream-1.6.2.tgz#904bdf194cd3122fc675c77fc4ac3d4ff0fd1a34"
  dependencies:
    buffer-from "^1.0.0"
    inherits "^2.0.3"
    readable-stream "^2.2.2"
    typedarray "^0.0.6"

configstore@^3.0.0:
  version "3.1.2"
  resolved "https://registry.yarnpkg.com/configstore/-/configstore-3.1.2.tgz#c6f25defaeef26df12dd33414b001fe81a543f8f"
  dependencies:
    dot-prop "^4.1.0"
    graceful-fs "^4.1.2"
    make-dir "^1.0.0"
    unique-string "^1.0.0"
    write-file-atomic "^2.0.0"
    xdg-basedir "^3.0.0"

connect-history-api-fallback@^1.3.0:
  version "1.5.0"
  resolved "https://registry.yarnpkg.com/connect-history-api-fallback/-/connect-history-api-fallback-1.5.0.tgz#b06873934bc5e344fef611a196a6faae0aee015a"

connect@^3.6.0:
  version "3.6.6"
  resolved "https://registry.yarnpkg.com/connect/-/connect-3.6.6.tgz#09eff6c55af7236e137135a72574858b6786f524"
  dependencies:
    debug "2.6.9"
    finalhandler "1.1.0"
    parseurl "~1.3.2"
    utils-merge "1.0.1"

console-browserify@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/console-browserify/-/console-browserify-1.1.0.tgz#f0241c45730a9fc6323b206dbf38edc741d0bb10"
  dependencies:
    date-now "^0.1.4"

console-control-strings@^1.0.0, console-control-strings@~1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/console-control-strings/-/console-control-strings-1.1.0.tgz#3d7cf4464db6446ea644bf4b39507f9851008e8e"

constants-browserify@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/constants-browserify/-/constants-browserify-1.0.0.tgz#c20b96d8c617748aaf1c16021760cd27fcb8cb75"

content-disposition@0.5.2:
  version "0.5.2"
  resolved "https://registry.yarnpkg.com/content-disposition/-/content-disposition-0.5.2.tgz#0cf68bb9ddf5f2be7961c3a85178cb85dba78cb4"

content-type@~1.0.4:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/content-type/-/content-type-1.0.4.tgz#e138cc75e040c727b1966fe5e5f8c9aee256fe3b"

convert-source-map@^1.5.0, convert-source-map@^1.5.1:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/convert-source-map/-/convert-source-map-1.6.0.tgz#51b537a8c43e0f04dec1993bffcdd504e758ac20"
  dependencies:
    safe-buffer "~5.1.1"

cookie-signature@1.0.6:
  version "1.0.6"
  resolved "https://registry.yarnpkg.com/cookie-signature/-/cookie-signature-1.0.6.tgz#e303a882b342cc3ee8ca513a79999734dab3ae2c"

cookie@0.3.1:
  version "0.3.1"
  resolved "https://registry.yarnpkg.com/cookie/-/cookie-0.3.1.tgz#e7e0a1f9ef43b4c8ba925c5c5a96e806d16873bb"

copy-concurrently@^1.0.0:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/copy-concurrently/-/copy-concurrently-1.0.5.tgz#92297398cae34937fcafd6ec8139c18051f0b5e0"
  dependencies:
    aproba "^1.1.1"
    fs-write-stream-atomic "^1.0.8"
    iferr "^0.1.5"
    mkdirp "^0.5.1"
    rimraf "^2.5.4"
    run-queue "^1.0.0"

copy-descriptor@^0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/copy-descriptor/-/copy-descriptor-0.1.1.tgz#676f6eb3c39997c2ee1ac3a924fd6124748f578d"

copy-webpack-plugin@4.5.4:
  version "4.5.4"
  resolved "https://registry.yarnpkg.com/copy-webpack-plugin/-/copy-webpack-plugin-4.5.4.tgz#f2b2782b3cd5225535c3dc166a80067e7d940f27"
  dependencies:
    cacache "^10.0.4"
    find-cache-dir "^1.0.0"
    globby "^7.1.1"
    is-glob "^4.0.0"
    loader-utils "^1.1.0"
    minimatch "^3.0.4"
    p-limit "^1.0.0"
    serialize-javascript "^1.4.0"

core-js@^2.2.0, core-js@^2.4.0:
  version "2.5.7"
  resolved "https://registry.yarnpkg.com/core-js/-/core-js-2.5.7.tgz#f972608ff0cead68b841a16a932d0b183791814e"

core-js@^2.6.0:
  version "2.6.0"
  resolved "https://registry.yarnpkg.com/core-js/-/core-js-2.6.0.tgz#1e30793e9ee5782b307e37ffa22da0eacddd84d4"

core-js@~2.3.0:
  version "2.3.0"
  resolved "http://registry.npmjs.org/core-js/-/core-js-2.3.0.tgz#fab83fbb0b2d8dc85fa636c4b9d34c75420c6d65"

core-util-is@1.0.2, core-util-is@~1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/core-util-is/-/core-util-is-1.0.2.tgz#b5fd54220aa2bc5ab57aab7140c940754503c1a7"

cosmiconfig@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/cosmiconfig/-/cosmiconfig-4.0.0.tgz#760391549580bbd2df1e562bc177b13c290972dc"
  dependencies:
    is-directory "^0.3.1"
    js-yaml "^3.9.0"
    parse-json "^4.0.0"
    require-from-string "^2.0.1"

create-ecdh@^4.0.0:
  version "4.0.3"
  resolved "https://registry.yarnpkg.com/create-ecdh/-/create-ecdh-4.0.3.tgz#c9111b6f33045c4697f144787f9254cdc77c45ff"
  dependencies:
    bn.js "^4.1.0"
    elliptic "^6.0.0"

create-error-class@^3.0.0:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/create-error-class/-/create-error-class-3.0.2.tgz#06be7abef947a3f14a30fd610671d401bca8b7b6"
  dependencies:
    capture-stack-trace "^1.0.0"

create-hash@^1.1.0, create-hash@^1.1.2:
  version "1.2.0"
  resolved "http://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz#889078af11a63756bcfb59bd221996be3a9ef196"
  dependencies:
    cipher-base "^1.0.1"
    inherits "^2.0.1"
    md5.js "^1.3.4"
    ripemd160 "^2.0.1"
    sha.js "^2.4.0"

create-hmac@^1.1.0, create-hmac@^1.1.2, create-hmac@^1.1.4:
  version "1.1.7"
  resolved "http://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz#69170c78b3ab957147b2b8b04572e47ead2243ff"
  dependencies:
    cipher-base "^1.0.3"
    create-hash "^1.1.0"
    inherits "^2.0.1"
    ripemd160 "^2.0.0"
    safe-buffer "^5.0.1"
    sha.js "^2.4.8"

cross-spawn@^3.0.0:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/cross-spawn/-/cross-spawn-3.0.1.tgz#1256037ecb9f0c5f79e3d6ef135e30770184b982"
  dependencies:
    lru-cache "^4.0.1"
    which "^1.2.9"

cross-spawn@^5.0.1:
  version "5.1.0"
  resolved "https://registry.yarnpkg.com/cross-spawn/-/cross-spawn-5.1.0.tgz#e8bd0efee58fcff6f8f94510a0a554bbfa235449"
  dependencies:
    lru-cache "^4.0.1"
    shebang-command "^1.2.0"
    which "^1.2.9"

cross-spawn@^6.0.0:
  version "6.0.5"
  resolved "https://registry.yarnpkg.com/cross-spawn/-/cross-spawn-6.0.5.tgz#4a5ec7c64dfae22c3a14124dbacdee846d80cbc4"
  dependencies:
    nice-try "^1.0.4"
    path-key "^2.0.1"
    semver "^5.5.0"
    shebang-command "^1.2.0"
    which "^1.2.9"

crypto-browserify@^3.11.0:
  version "3.12.0"
  resolved "https://registry.yarnpkg.com/crypto-browserify/-/crypto-browserify-3.12.0.tgz#396cf9f3137f03e4b8e532c58f698254e00f80ec"
  dependencies:
    browserify-cipher "^1.0.0"
    browserify-sign "^4.0.0"
    create-ecdh "^4.0.0"
    create-hash "^1.1.0"
    create-hmac "^1.1.0"
    diffie-hellman "^5.0.0"
    inherits "^2.0.1"
    pbkdf2 "^3.0.3"
    public-encrypt "^4.0.0"
    randombytes "^2.0.0"
    randomfill "^1.0.3"

crypto-random-string@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/crypto-random-string/-/crypto-random-string-1.0.0.tgz#a230f64f568310e1498009940790ec99545bca7e"

css-parse@1.7.x:
  version "1.7.0"
  resolved "https://registry.yarnpkg.com/css-parse/-/css-parse-1.7.0.tgz#321f6cf73782a6ff751111390fc05e2c657d8c9b"

css-selector-tokenizer@^0.7.0:
  version "0.7.1"
  resolved "https://registry.yarnpkg.com/css-selector-tokenizer/-/css-selector-tokenizer-0.7.1.tgz#a177271a8bca5019172f4f891fc6eed9cbf68d5d"
  dependencies:
    cssesc "^0.1.0"
    fastparse "^1.1.1"
    regexpu-core "^1.0.0"

cssauron@^1.4.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/cssauron/-/cssauron-1.4.0.tgz#a6602dff7e04a8306dc0db9a551e92e8b5662ad8"
  dependencies:
    through X.X.X

cssesc@^0.1.0:
  version "0.1.0"
  resolved "https://registry.yarnpkg.com/cssesc/-/cssesc-0.1.0.tgz#c814903e45623371a0477b40109aaafbeeaddbb4"

cssom@0.3.x, "cssom@>= 0.3.0 < 0.4.0":
  version "0.3.4"
  resolved "https://registry.yarnpkg.com/cssom/-/cssom-0.3.4.tgz#8cd52e8a3acfd68d3aed38ee0a640177d2f9d797"

"cssstyle@>= 0.2.34 < 0.3.0":
  version "0.2.37"
  resolved "https://registry.yarnpkg.com/cssstyle/-/cssstyle-0.2.37.tgz#541097234cb2513c83ceed3acddc27ff27987d54"
  dependencies:
    cssom "0.3.x"

cuint@^0.2.2:
  version "0.2.2"
  resolved "https://registry.yarnpkg.com/cuint/-/cuint-0.2.2.tgz#408086d409550c2631155619e9fa7bcadc3b991b"

currently-unhandled@^0.4.1:
  version "0.4.1"
  resolved "https://registry.yarnpkg.com/currently-unhandled/-/currently-unhandled-0.4.1.tgz#988df33feab191ef799a61369dd76c17adf957ea"
  dependencies:
    array-find-index "^1.0.1"

custom-event@~1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/custom-event/-/custom-event-1.0.1.tgz#5d02a46850adf1b4a317946a3928fccb5bfd0425"

cyclist@~0.2.2:
  version "0.2.2"
  resolved "https://registry.yarnpkg.com/cyclist/-/cyclist-0.2.2.tgz#1b33792e11e914a2fd6d6ed6447464444e5fa640"

dashdash@^1.12.0:
  version "1.14.1"
  resolved "https://registry.yarnpkg.com/dashdash/-/dashdash-1.14.1.tgz#853cfa0f7cbe2fed5de20326b8dd581035f6e2f0"
  dependencies:
    assert-plus "^1.0.0"

date-format@^1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/date-format/-/date-format-1.2.0.tgz#615e828e233dd1ab9bb9ae0950e0ceccfa6ecad8"

date-now@^0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/date-now/-/date-now-0.1.4.tgz#eaf439fd4d4848ad74e5cc7dbef200672b9e345b"

debug@*, debug@^4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/debug/-/debug-4.1.0.tgz#373687bffa678b38b1cd91f861b63850035ddc87"
  dependencies:
    ms "^2.1.1"

debug@2.6.9, debug@^2.1.2, debug@^2.2.0, debug@^2.3.3, debug@^2.6.8:
  version "2.6.9"
  resolved "https://registry.yarnpkg.com/debug/-/debug-2.6.9.tgz#5d128515df134ff327e90a4c93f4e077a536341f"
  dependencies:
    ms "2.0.0"

debug@3.1.0, debug@=3.1.0, debug@~3.1.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/debug/-/debug-3.1.0.tgz#5bb5a0672628b64149566ba16819e61518c67261"
  dependencies:
    ms "2.0.0"

debug@^3.1.0, debug@^3.2.5:
  version "3.2.6"
  resolved "https://registry.yarnpkg.com/debug/-/debug-3.2.6.tgz#e83d17de16d8a7efb7717edbe5fb10135eee629b"
  dependencies:
    ms "^2.1.1"

decamelize@^1.1.1, decamelize@^1.1.2:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/decamelize/-/decamelize-1.2.0.tgz#f6534d15148269b20352e7bee26f501f9a191290"

decamelize@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/decamelize/-/decamelize-2.0.0.tgz#656d7bbc8094c4c788ea53c5840908c9c7d063c7"
  dependencies:
    xregexp "4.0.0"

decode-uri-component@^0.2.0:
  version "0.2.0"
  resolved "https://registry.yarnpkg.com/decode-uri-component/-/decode-uri-component-0.2.0.tgz#eb3913333458775cb84cd1a1fae062106bb87545"

deep-equal@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/deep-equal/-/deep-equal-1.0.1.tgz#f5d260292b660e084eff4cdbc9f08ad3247448b5"

deep-extend@^0.6.0:
  version "0.6.0"
  resolved "https://registry.yarnpkg.com/deep-extend/-/deep-extend-0.6.0.tgz#c4fa7c95404a17a9c3e8ca7e1537312b736330ac"

deep-is@~0.1.3:
  version "0.1.3"
  resolved "https://registry.yarnpkg.com/deep-is/-/deep-is-0.1.3.tgz#b369d6fb5dbc13eecf524f91b070feedc357cf34"

default-gateway@^2.6.0:
  version "2.7.2"
  resolved "https://registry.yarnpkg.com/default-gateway/-/default-gateway-2.7.2.tgz#b7ef339e5e024b045467af403d50348db4642d0f"
  dependencies:
    execa "^0.10.0"
    ip-regex "^2.1.0"

default-require-extensions@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/default-require-extensions/-/default-require-extensions-2.0.0.tgz#f5f8fbb18a7d6d50b21f641f649ebb522cfe24f7"
  dependencies:
    strip-bom "^3.0.0"

define-property@^0.2.5:
  version "0.2.5"
  resolved "https://registry.yarnpkg.com/define-property/-/define-property-0.2.5.tgz#c35b1ef918ec3c990f9a5bc57be04aacec5c8116"
  dependencies:
    is-descriptor "^0.1.0"

define-property@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/define-property/-/define-property-1.0.0.tgz#769ebaaf3f4a63aad3af9e8d304c9bbe79bfb0e6"
  dependencies:
    is-descriptor "^1.0.0"

define-property@^2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/define-property/-/define-property-2.0.2.tgz#d459689e8d654ba77e02a817f8710d702cb16e9d"
  dependencies:
    is-descriptor "^1.0.2"
    isobject "^3.0.1"

del@^2.2.0:
  version "2.2.2"
  resolved "https://registry.yarnpkg.com/del/-/del-2.2.2.tgz#c12c981d067846c84bcaf862cff930d907ffd1a8"
  dependencies:
    globby "^5.0.0"
    is-path-cwd "^1.0.0"
    is-path-in-cwd "^1.0.0"
    object-assign "^4.0.1"
    pify "^2.0.0"
    pinkie-promise "^2.0.0"
    rimraf "^2.2.8"

del@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/del/-/del-3.0.0.tgz#53ecf699ffcbcb39637691ab13baf160819766e5"
  dependencies:
    globby "^6.1.0"
    is-path-cwd "^1.0.0"
    is-path-in-cwd "^1.0.0"
    p-map "^1.1.1"
    pify "^3.0.0"
    rimraf "^2.2.8"

delayed-stream@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/delayed-stream/-/delayed-stream-1.0.0.tgz#df3ae199acadfb7d440aaae0b29e2272b24ec619"

delegates@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/delegates/-/delegates-1.0.0.tgz#84c6e159b81904fdca59a0ef44cd870d31250f9a"

depd@~1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/depd/-/depd-1.1.2.tgz#9bcd52e14c097763e749b274c4346ed2e560b5a9"

dependency-graph@^0.7.2:
  version "0.7.2"
  resolved "https://registry.yarnpkg.com/dependency-graph/-/dependency-graph-0.7.2.tgz#91db9de6eb72699209d88aea4c1fd5221cac1c49"

des.js@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/des.js/-/des.js-1.0.0.tgz#c074d2e2aa6a8a9a07dbd61f9a15c2cd83ec8ecc"
  dependencies:
    inherits "^2.0.1"
    minimalistic-assert "^1.0.0"

destroy@~1.0.4:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/destroy/-/destroy-1.0.4.tgz#978857442c44749e4206613e37946205826abd80"

detect-indent@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/detect-indent/-/detect-indent-4.0.0.tgz#f76d064352cdf43a1cb6ce619c4ee3a9475de208"
  dependencies:
    repeating "^2.0.0"

detect-libc@^1.0.2:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/detect-libc/-/detect-libc-1.0.3.tgz#fa137c4bd698edf55cd5cd02ac559f91a4c4ba9b"

detect-node@^2.0.3:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/detect-node/-/detect-node-2.0.4.tgz#014ee8f8f669c5c58023da64b8179c083a28c46c"

di@^0.0.1:
  version "0.0.1"
  resolved "https://registry.yarnpkg.com/di/-/di-0.0.1.tgz#806649326ceaa7caa3306d75d985ea2748ba913c"

diff@^3.1.0, diff@^3.2.0:
  version "3.5.0"
  resolved "https://registry.yarnpkg.com/diff/-/diff-3.5.0.tgz#800c0dd1e0a8bfbc95835c202ad220fe317e5a12"

diffie-hellman@^5.0.0:
  version "5.0.3"
  resolved "http://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz#40e8ee98f55a2149607146921c63e1ae5f3d2875"
  dependencies:
    bn.js "^4.1.0"
    miller-rabin "^4.0.0"
    randombytes "^2.0.0"

dir-glob@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/dir-glob/-/dir-glob-2.0.0.tgz#0b205d2b6aef98238ca286598a8204d29d0a0034"
  dependencies:
    arrify "^1.0.1"
    path-type "^3.0.0"

dns-equal@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/dns-equal/-/dns-equal-1.0.0.tgz#b39e7f1da6eb0a75ba9c17324b34753c47e0654d"

dns-packet@^1.3.1:
  version "1.3.1"
  resolved "https://registry.yarnpkg.com/dns-packet/-/dns-packet-1.3.1.tgz#12aa426981075be500b910eedcd0b47dd7deda5a"
  dependencies:
    ip "^1.1.0"
    safe-buffer "^5.0.1"

dns-txt@^2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/dns-txt/-/dns-txt-2.0.2.tgz#b91d806f5d27188e4ab3e7d107d881a1cc4642b6"
  dependencies:
    buffer-indexof "^1.0.0"

dom-serialize@^2.2.0:
  version "2.2.1"
  resolved "https://registry.yarnpkg.com/dom-serialize/-/dom-serialize-2.2.1.tgz#562ae8999f44be5ea3076f5419dcd59eb43ac95b"
  dependencies:
    custom-event "~1.0.0"
    ent "~2.2.0"
    extend "^3.0.0"
    void-elements "^2.0.0"

domain-browser@^1.1.1:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/domain-browser/-/domain-browser-1.2.0.tgz#3d31f50191a6749dd1375a7f522e823d42e54eda"

dot-prop@^4.1.0:
  version "4.2.0"
  resolved "https://registry.yarnpkg.com/dot-prop/-/dot-prop-4.2.0.tgz#1f19e0c2e1aa0e32797c49799f2837ac6af69c57"
  dependencies:
    is-obj "^1.0.0"

duplexer3@^0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/duplexer3/-/duplexer3-0.1.4.tgz#ee01dd1cac0ed3cbc7fdbea37dc0a8f1ce002ce2"

duplexify@^3.4.2, duplexify@^3.6.0:
  version "3.6.1"
  resolved "https://registry.yarnpkg.com/duplexify/-/duplexify-3.6.1.tgz#b1a7a29c4abfd639585efaecce80d666b1e34125"
  dependencies:
    end-of-stream "^1.0.0"
    inherits "^2.0.1"
    readable-stream "^2.0.0"
    stream-shift "^1.0.0"

ecc-jsbn@~0.1.1:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz#3a83a904e54353287874c564b7549386849a98c9"
  dependencies:
    jsbn "~0.1.0"
    safer-buffer "^2.1.0"

ee-first@1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/ee-first/-/ee-first-1.1.1.tgz#590c61156b0ae2f4f0255732a158b266bc56b21d"

electron-to-chromium@^1.3.86:
  version "1.3.86"
  resolved "https://registry.yarnpkg.com/electron-to-chromium/-/electron-to-chromium-1.3.86.tgz#a45ea01da5b26500d12bca5e0f194ebb3e1fd14e"

elliptic@^6.0.0:
  version "6.4.1"
  resolved "https://registry.yarnpkg.com/elliptic/-/elliptic-6.4.1.tgz#c2d0b7776911b86722c632c3c06c60f2f819939a"
  dependencies:
    bn.js "^4.4.0"
    brorand "^1.0.1"
    hash.js "^1.0.0"
    hmac-drbg "^1.0.0"
    inherits "^2.0.1"
    minimalistic-assert "^1.0.0"
    minimalistic-crypto-utils "^1.0.0"

emojis-list@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/emojis-list/-/emojis-list-2.1.0.tgz#4daa4d9db00f9819880c79fa457ae5b09a1fd389"

encodeurl@~1.0.1, encodeurl@~1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/encodeurl/-/encodeurl-1.0.2.tgz#ad3ff4c86ec2d029322f5a02c3a9a606c95b3f59"

encoding@^0.1.11:
  version "0.1.12"
  resolved "https://registry.yarnpkg.com/encoding/-/encoding-0.1.12.tgz#538b66f3ee62cd1ab51ec323829d1f9480c74beb"
  dependencies:
    iconv-lite "~0.4.13"

end-of-stream@^1.0.0, end-of-stream@^1.1.0:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/end-of-stream/-/end-of-stream-1.4.1.tgz#ed29634d19baba463b6ce6b80a37213eab71ec43"
  dependencies:
    once "^1.4.0"

engine.io-client@~3.2.0:
  version "3.2.1"
  resolved "http://registry.npmjs.org/engine.io-client/-/engine.io-client-3.2.1.tgz#6f54c0475de487158a1a7c77d10178708b6add36"
  dependencies:
    component-emitter "1.2.1"
    component-inherit "0.0.3"
    debug "~3.1.0"
    engine.io-parser "~2.1.1"
    has-cors "1.1.0"
    indexof "0.0.1"
    parseqs "0.0.5"
    parseuri "0.0.5"
    ws "~3.3.1"
    xmlhttprequest-ssl "~1.5.4"
    yeast "0.1.2"

engine.io-parser@~2.1.0, engine.io-parser@~2.1.1:
  version "2.1.3"
  resolved "https://registry.yarnpkg.com/engine.io-parser/-/engine.io-parser-2.1.3.tgz#757ab970fbf2dfb32c7b74b033216d5739ef79a6"
  dependencies:
    after "0.8.2"
    arraybuffer.slice "~0.0.7"
    base64-arraybuffer "0.1.5"
    blob "0.0.5"
    has-binary2 "~1.0.2"

engine.io@~3.2.0:
  version "3.2.1"
  resolved "https://registry.yarnpkg.com/engine.io/-/engine.io-3.2.1.tgz#b60281c35484a70ee0351ea0ebff83ec8c9522a2"
  dependencies:
    accepts "~1.3.4"
    base64id "1.0.0"
    cookie "0.3.1"
    debug "~3.1.0"
    engine.io-parser "~2.1.0"
    ws "~3.3.1"

enhanced-resolve@4.1.0, enhanced-resolve@^4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/enhanced-resolve/-/enhanced-resolve-4.1.0.tgz#41c7e0bfdfe74ac1ffe1e57ad6a5c6c9f3742a7f"
  dependencies:
    graceful-fs "^4.1.2"
    memory-fs "^0.4.0"
    tapable "^1.0.0"

ent@~2.2.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/ent/-/ent-2.2.0.tgz#e964219325a21d05f44466a2f686ed6ce5f5dd1d"

err-code@^1.0.0:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/err-code/-/err-code-1.1.2.tgz#06e0116d3028f6aef4806849eb0ea6a748ae6960"

errno@^0.1.1, errno@^0.1.3, errno@~0.1.7:
  version "0.1.7"
  resolved "https://registry.yarnpkg.com/errno/-/errno-0.1.7.tgz#4684d71779ad39af177e3f007996f7c67c852618"
  dependencies:
    prr "~1.0.1"

error-ex@^1.2.0, error-ex@^1.3.1:
  version "1.3.2"
  resolved "https://registry.yarnpkg.com/error-ex/-/error-ex-1.3.2.tgz#b4ac40648107fdcdcfae242f428bea8a14d4f1bf"
  dependencies:
    is-arrayish "^0.2.1"

es6-promise@^4.0.3:
  version "4.2.5"
  resolved "https://registry.yarnpkg.com/es6-promise/-/es6-promise-4.2.5.tgz#da6d0d5692efb461e082c14817fe2427d8f5d054"

es6-promise@~3.0.2:
  version "3.0.2"
  resolved "http://registry.npmjs.org/es6-promise/-/es6-promise-3.0.2.tgz#010d5858423a5f118979665f46486a95c6ee2bb6"

es6-promisify@^5.0.0:
  version "5.0.0"
  resolved "http://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz#5109d62f3e56ea967c4b63505aef08291c8a5203"
  dependencies:
    es6-promise "^4.0.3"

escape-html@~1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/escape-html/-/escape-html-1.0.3.tgz#0258eae4d3d0c0974de1c169188ef0051d1d1988"

escape-string-regexp@^1.0.2, escape-string-regexp@^1.0.5:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz#1b61c0562190a8dff6ae3bb2cf0200ca130b86d4"

escodegen@1.8.x:
  version "1.8.1"
  resolved "https://registry.yarnpkg.com/escodegen/-/escodegen-1.8.1.tgz#5a5b53af4693110bebb0867aa3430dd3b70a1018"
  dependencies:
    esprima "^2.7.1"
    estraverse "^1.9.1"
    esutils "^2.0.2"
    optionator "^0.8.1"
  optionalDependencies:
    source-map "~0.2.0"

escodegen@^1.6.1:
  version "1.11.0"
  resolved "https://registry.yarnpkg.com/escodegen/-/escodegen-1.11.0.tgz#b27a9389481d5bfd5bec76f7bb1eb3f8f4556589"
  dependencies:
    esprima "^3.1.3"
    estraverse "^4.2.0"
    esutils "^2.0.2"
    optionator "^0.8.1"
  optionalDependencies:
    source-map "~0.6.1"

eslint-scope@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/eslint-scope/-/eslint-scope-4.0.0.tgz#50bf3071e9338bcdc43331794a0cb533f0136172"
  dependencies:
    esrecurse "^4.1.0"
    estraverse "^4.1.1"

esprima@2.7.x, esprima@^2.7.1:
  version "2.7.3"
  resolved "https://registry.yarnpkg.com/esprima/-/esprima-2.7.3.tgz#96e3b70d5779f6ad49cd032673d1c312767ba581"

esprima@^3.1.3:
  version "3.1.3"
  resolved "https://registry.yarnpkg.com/esprima/-/esprima-3.1.3.tgz#fdca51cee6133895e3c88d535ce49dbff62a4633"

esprima@^4.0.0:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/esprima/-/esprima-4.0.1.tgz#13b04cdb3e6c5d19df91ab6987a8695619b0aa71"

esrecurse@^4.1.0:
  version "4.2.1"
  resolved "https://registry.yarnpkg.com/esrecurse/-/esrecurse-4.2.1.tgz#007a3b9fdbc2b3bb87e4879ea19c92fdbd3942cf"
  dependencies:
    estraverse "^4.1.0"

estraverse@^1.9.1:
  version "1.9.3"
  resolved "https://registry.yarnpkg.com/estraverse/-/estraverse-1.9.3.tgz#af67f2dc922582415950926091a4005d29c9bb44"

estraverse@^4.1.0, estraverse@^4.1.1, estraverse@^4.2.0:
  version "4.2.0"
  resolved "https://registry.yarnpkg.com/estraverse/-/estraverse-4.2.0.tgz#0dee3fed31fcd469618ce7342099fc1afa0bdb13"

estree-walker@^0.5.2:
  version "0.5.2"
  resolved "https://registry.yarnpkg.com/estree-walker/-/estree-walker-0.5.2.tgz#d3850be7529c9580d815600b53126515e146dd39"

esutils@^2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/esutils/-/esutils-2.0.2.tgz#0abf4f1caa5bcb1f7a9d8acc6dea4faaa04bac9b"

etag@~1.8.1:
  version "1.8.1"
  resolved "https://registry.yarnpkg.com/etag/-/etag-1.8.1.tgz#41ae2eeb65efa62268aebfea83ac7d79299b0887"

eventemitter3@^3.0.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/eventemitter3/-/eventemitter3-3.1.0.tgz#090b4d6cdbd645ed10bf750d4b5407942d7ba163"

events@^1.0.0:
  version "1.1.1"
  resolved "http://registry.npmjs.org/events/-/events-1.1.1.tgz#9ebdb7635ad099c70dcc4c2a1f5004288e8bd924"

eventsource@^1.0.7:
  version "1.0.7"
  resolved "https://registry.yarnpkg.com/eventsource/-/eventsource-1.0.7.tgz#8fbc72c93fcd34088090bc0a4e64f4b5cee6d8d0"
  dependencies:
    original "^1.0.0"

evp_bytestokey@^1.0.0, evp_bytestokey@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz#7fcbdb198dc71959432efe13842684e0525acb02"
  dependencies:
    md5.js "^1.3.4"
    safe-buffer "^5.1.1"

execa@^0.10.0:
  version "0.10.0"
  resolved "https://registry.yarnpkg.com/execa/-/execa-0.10.0.tgz#ff456a8f53f90f8eccc71a96d11bdfc7f082cb50"
  dependencies:
    cross-spawn "^6.0.0"
    get-stream "^3.0.0"
    is-stream "^1.1.0"
    npm-run-path "^2.0.0"
    p-finally "^1.0.0"
    signal-exit "^3.0.0"
    strip-eof "^1.0.0"

execa@^0.7.0:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/execa/-/execa-0.7.0.tgz#944becd34cc41ee32a63a9faf27ad5a65fc59777"
  dependencies:
    cross-spawn "^5.0.1"
    get-stream "^3.0.0"
    is-stream "^1.1.0"
    npm-run-path "^2.0.0"
    p-finally "^1.0.0"
    signal-exit "^3.0.0"
    strip-eof "^1.0.0"

exit@^0.1.2:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/exit/-/exit-0.1.2.tgz#0632638f8d877cc82107d30a0fff1a17cba1cd0c"

expand-braces@^0.1.1:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/expand-braces/-/expand-braces-0.1.2.tgz#488b1d1d2451cb3d3a6b192cfc030f44c5855fea"
  dependencies:
    array-slice "^0.2.3"
    array-unique "^0.2.1"
    braces "^0.1.2"

expand-brackets@^0.1.4:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/expand-brackets/-/expand-brackets-0.1.5.tgz#df07284e342a807cd733ac5af72411e581d1177b"
  dependencies:
    is-posix-bracket "^0.1.0"

expand-brackets@^2.1.4:
  version "2.1.4"
  resolved "https://registry.yarnpkg.com/expand-brackets/-/expand-brackets-2.1.4.tgz#b77735e315ce30f6b6eff0f83b04151a22449622"
  dependencies:
    debug "^2.3.3"
    define-property "^0.2.5"
    extend-shallow "^2.0.1"
    posix-character-classes "^0.1.0"
    regex-not "^1.0.0"
    snapdragon "^0.8.1"
    to-regex "^3.0.1"

expand-range@^0.1.0:
  version "0.1.1"
  resolved "http://registry.npmjs.org/expand-range/-/expand-range-0.1.1.tgz#4cb8eda0993ca56fa4f41fc42f3cbb4ccadff044"
  dependencies:
    is-number "^0.1.1"
    repeat-string "^0.2.2"

expand-range@^1.8.1:
  version "1.8.2"
  resolved "http://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz#a299effd335fe2721ebae8e257ec79644fc85337"
  dependencies:
    fill-range "^2.1.0"

express@^4.16.2:
  version "4.16.4"
  resolved "https://registry.yarnpkg.com/express/-/express-4.16.4.tgz#fddef61926109e24c515ea97fd2f1bdbf62df12e"
  dependencies:
    accepts "~1.3.5"
    array-flatten "1.1.1"
    body-parser "1.18.3"
    content-disposition "0.5.2"
    content-type "~1.0.4"
    cookie "0.3.1"
    cookie-signature "1.0.6"
    debug "2.6.9"
    depd "~1.1.2"
    encodeurl "~1.0.2"
    escape-html "~1.0.3"
    etag "~1.8.1"
    finalhandler "1.1.1"
    fresh "0.5.2"
    merge-descriptors "1.0.1"
    methods "~1.1.2"
    on-finished "~2.3.0"
    parseurl "~1.3.2"
    path-to-regexp "0.1.7"
    proxy-addr "~2.0.4"
    qs "6.5.2"
    range-parser "~1.2.0"
    safe-buffer "5.1.2"
    send "0.16.2"
    serve-static "1.13.2"
    setprototypeof "1.1.0"
    statuses "~1.4.0"
    type-is "~1.6.16"
    utils-merge "1.0.1"
    vary "~1.1.2"

extend-shallow@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/extend-shallow/-/extend-shallow-2.0.1.tgz#51af7d614ad9a9f610ea1bafbb989d6b1c56890f"
  dependencies:
    is-extendable "^0.1.0"

extend-shallow@^3.0.0, extend-shallow@^3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/extend-shallow/-/extend-shallow-3.0.2.tgz#26a71aaf073b39fb2127172746131c2704028db8"
  dependencies:
    assign-symbols "^1.0.0"
    is-extendable "^1.0.1"

extend@^3.0.0, extend@~3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/extend/-/extend-3.0.2.tgz#f8b1136b4071fbd8eb140aff858b1019ec2915fa"

external-editor@^2.0.1:
  version "2.2.0"
  resolved "http://registry.npmjs.org/external-editor/-/external-editor-2.2.0.tgz#045511cfd8d133f3846673d1047c154e214ad3d5"
  dependencies:
    chardet "^0.4.0"
    iconv-lite "^0.4.17"
    tmp "^0.0.33"

external-editor@^3.0.0:
  version "3.0.3"
  resolved "https://registry.yarnpkg.com/external-editor/-/external-editor-3.0.3.tgz#5866db29a97826dbe4bf3afd24070ead9ea43a27"
  dependencies:
    chardet "^0.7.0"
    iconv-lite "^0.4.24"
    tmp "^0.0.33"

extglob@^0.3.1:
  version "0.3.2"
  resolved "https://registry.yarnpkg.com/extglob/-/extglob-0.3.2.tgz#2e18ff3d2f49ab2765cec9023f011daa8d8349a1"
  dependencies:
    is-extglob "^1.0.0"

extglob@^2.0.4:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/extglob/-/extglob-2.0.4.tgz#ad00fe4dc612a9232e8718711dc5cb5ab0285543"
  dependencies:
    array-unique "^0.3.2"
    define-property "^1.0.0"
    expand-brackets "^2.1.4"
    extend-shallow "^2.0.1"
    fragment-cache "^0.2.1"
    regex-not "^1.0.0"
    snapdragon "^0.8.1"
    to-regex "^3.0.1"

extsprintf@1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/extsprintf/-/extsprintf-1.3.0.tgz#96918440e3041a7a414f8c52e3c574eb3c3e1e05"

extsprintf@^1.2.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/extsprintf/-/extsprintf-1.4.0.tgz#e2689f8f356fad62cca65a3a91c5df5f9551692f"

fast-deep-equal@^1.0.0:
  version "1.1.0"
  resolved "http://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-1.1.0.tgz#c053477817c86b51daa853c81e059b733d023614"

fast-deep-equal@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/fast-deep-equal/-/fast-deep-equal-2.0.1.tgz#7b05218ddf9667bf7f370bf7fdb2cb15fdd0aa49"

fast-json-stable-stringify@2.0.0, fast-json-stable-stringify@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/fast-json-stable-stringify/-/fast-json-stable-stringify-2.0.0.tgz#d5142c0caee6b1189f87d3a76111064f86c8bbf2"

fast-levenshtein@~2.0.4:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz#3d8a5c66883a16a30ca8643e851f19baa7797917"

fastparse@^1.1.1:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/fastparse/-/fastparse-1.1.2.tgz#91728c5a5942eced8531283c79441ee4122c35a9"

faye-websocket@^0.10.0:
  version "0.10.0"
  resolved "https://registry.yarnpkg.com/faye-websocket/-/faye-websocket-0.10.0.tgz#4e492f8d04dfb6f89003507f6edbf2d501e7c6f4"
  dependencies:
    websocket-driver ">=0.5.1"

faye-websocket@~0.11.1:
  version "0.11.1"
  resolved "https://registry.yarnpkg.com/faye-websocket/-/faye-websocket-0.11.1.tgz#f0efe18c4f56e4f40afc7e06c719fd5ee6188f38"
  dependencies:
    websocket-driver ">=0.5.1"

figgy-pudding@^3.1.0, figgy-pudding@^3.4.1, figgy-pudding@^3.5.1:
  version "3.5.1"
  resolved "https://registry.yarnpkg.com/figgy-pudding/-/figgy-pudding-3.5.1.tgz#862470112901c727a0e495a80744bd5baa1d6790"

figures@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/figures/-/figures-2.0.0.tgz#3ab1a2d2a62c8bfb431a0c94cb797a2fce27c962"
  dependencies:
    escape-string-regexp "^1.0.5"

file-loader@2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/file-loader/-/file-loader-2.0.0.tgz#39749c82f020b9e85901dcff98e8004e6401cfde"
  dependencies:
    loader-utils "^1.0.2"
    schema-utils "^1.0.0"

file-saver@1.3.8:
  version "1.3.8"
  resolved "http://registry.npmjs.org/file-saver/-/file-saver-1.3.8.tgz#e68a30c7cb044e2fb362b428469feb291c2e09d8"

filename-regex@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/filename-regex/-/filename-regex-2.0.1.tgz#c1c4b9bee3e09725ddb106b75c1e301fe2f18b26"

fileset@^2.0.3:
  version "2.0.3"
  resolved "https://registry.yarnpkg.com/fileset/-/fileset-2.0.3.tgz#8e7548a96d3cc2327ee5e674168723a333bba2a0"
  dependencies:
    glob "^7.0.3"
    minimatch "^3.0.3"

fill-range@^2.1.0:
  version "2.2.4"
  resolved "https://registry.yarnpkg.com/fill-range/-/fill-range-2.2.4.tgz#eb1e773abb056dcd8df2bfdf6af59b8b3a936565"
  dependencies:
    is-number "^2.1.0"
    isobject "^2.0.0"
    randomatic "^3.0.0"
    repeat-element "^1.1.2"
    repeat-string "^1.5.2"

fill-range@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/fill-range/-/fill-range-4.0.0.tgz#d544811d428f98eb06a63dc402d2403c328c38f7"
  dependencies:
    extend-shallow "^2.0.1"
    is-number "^3.0.0"
    repeat-string "^1.6.1"
    to-regex-range "^2.1.0"

finalhandler@1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/finalhandler/-/finalhandler-1.1.0.tgz#ce0b6855b45853e791b2fcc680046d88253dd7f5"
  dependencies:
    debug "2.6.9"
    encodeurl "~1.0.1"
    escape-html "~1.0.3"
    on-finished "~2.3.0"
    parseurl "~1.3.2"
    statuses "~1.3.1"
    unpipe "~1.0.0"

finalhandler@1.1.1:
  version "1.1.1"
  resolved "http://registry.npmjs.org/finalhandler/-/finalhandler-1.1.1.tgz#eebf4ed840079c83f4249038c9d703008301b105"
  dependencies:
    debug "2.6.9"
    encodeurl "~1.0.2"
    escape-html "~1.0.3"
    on-finished "~2.3.0"
    parseurl "~1.3.2"
    statuses "~1.4.0"
    unpipe "~1.0.0"

find-cache-dir@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/find-cache-dir/-/find-cache-dir-1.0.0.tgz#9288e3e9e3cc3748717d39eade17cf71fc30ee6f"
  dependencies:
    commondir "^1.0.1"
    make-dir "^1.0.0"
    pkg-dir "^2.0.0"

find-cache-dir@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/find-cache-dir/-/find-cache-dir-2.0.0.tgz#4c1faed59f45184530fb9d7fa123a4d04a98472d"
  dependencies:
    commondir "^1.0.1"
    make-dir "^1.0.0"
    pkg-dir "^3.0.0"

find-parent-dir@^0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/find-parent-dir/-/find-parent-dir-0.3.0.tgz#33c44b429ab2b2f0646299c5f9f718f376ff8d54"

find-up@^1.0.0:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/find-up/-/find-up-1.1.2.tgz#6b2e9822b1a2ce0a60ab64d610eccad53cb24d0f"
  dependencies:
    path-exists "^2.0.0"
    pinkie-promise "^2.0.0"

find-up@^2.0.0, find-up@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/find-up/-/find-up-2.1.0.tgz#45d1b7e506c717ddd482775a2b77920a3c0c57a7"
  dependencies:
    locate-path "^2.0.0"

find-up@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/find-up/-/find-up-3.0.0.tgz#49169f1d7993430646da61ecc5ae355c21c97b73"
  dependencies:
    locate-path "^3.0.0"

flatted@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/flatted/-/flatted-2.0.0.tgz#55122b6536ea496b4b44893ee2608141d10d9916"

flush-write-stream@^1.0.0:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/flush-write-stream/-/flush-write-stream-1.0.3.tgz#c5d586ef38af6097650b49bc41b55fabb19f35bd"
  dependencies:
    inherits "^2.0.1"
    readable-stream "^2.0.4"

follow-redirects@^1.0.0:
  version "1.5.10"
  resolved "https://registry.yarnpkg.com/follow-redirects/-/follow-redirects-1.5.10.tgz#7b7a9f9aea2fdff36786a94ff643ed07f4ff5e2a"
  dependencies:
    debug "=3.1.0"

for-in@^0.1.3:
  version "0.1.8"
  resolved "https://registry.yarnpkg.com/for-in/-/for-in-0.1.8.tgz#d8773908e31256109952b1fdb9b3fa867d2775e1"

for-in@^1.0.1, for-in@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/for-in/-/for-in-1.0.2.tgz#81068d295a8142ec0ac726c6e2200c30fb6d5e80"

for-own@^0.1.4:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/for-own/-/for-own-0.1.5.tgz#5265c681a4f294dabbf17c9509b6763aa84510ce"
  dependencies:
    for-in "^1.0.1"

for-own@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/for-own/-/for-own-1.0.0.tgz#c63332f415cedc4b04dbfe70cf836494c53cb44b"
  dependencies:
    for-in "^1.0.1"

forever-agent@~0.6.1:
  version "0.6.1"
  resolved "https://registry.yarnpkg.com/forever-agent/-/forever-agent-0.6.1.tgz#fbc71f0c41adeb37f96c577ad1ed42d8fdacca91"

form-data@~2.3.2:
  version "2.3.3"
  resolved "https://registry.yarnpkg.com/form-data/-/form-data-2.3.3.tgz#dcce52c05f644f298c6a7ab936bd724ceffbf3a6"
  dependencies:
    asynckit "^0.4.0"
    combined-stream "^1.0.6"
    mime-types "^2.1.12"

forwarded@~0.1.2:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/forwarded/-/forwarded-0.1.2.tgz#98c23dab1175657b8c0573e8ceccd91b0ff18c84"

fragment-cache@^0.2.1:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/fragment-cache/-/fragment-cache-0.2.1.tgz#4290fad27f13e89be7f33799c6bc5a0abfff0d19"
  dependencies:
    map-cache "^0.2.2"

fresh@0.5.2:
  version "0.5.2"
  resolved "https://registry.yarnpkg.com/fresh/-/fresh-0.5.2.tgz#3d8cadd90d976569fa835ab1f8e4b23a105605a7"

from2@^2.1.0:
  version "2.3.0"
  resolved "https://registry.yarnpkg.com/from2/-/from2-2.3.0.tgz#8bfb5502bde4a4d36cfdeea007fcca21d7e382af"
  dependencies:
    inherits "^2.0.1"
    readable-stream "^2.0.0"

fs-access@^1.0.0:
  version "1.0.1"
  resolved "http://registry.npmjs.org/fs-access/-/fs-access-1.0.1.tgz#d6a87f262271cefebec30c553407fb995da8777a"
  dependencies:
    null-check "^1.0.0"

fs-extra@^7.0.0:
  version "7.0.1"
  resolved "https://registry.yarnpkg.com/fs-extra/-/fs-extra-7.0.1.tgz#4f189c44aa123b895f722804f55ea23eadc348e9"
  dependencies:
    graceful-fs "^4.1.2"
    jsonfile "^4.0.0"
    universalify "^0.1.0"

fs-minipass@^1.2.5:
  version "1.2.5"
  resolved "https://registry.yarnpkg.com/fs-minipass/-/fs-minipass-1.2.5.tgz#06c277218454ec288df77ada54a03b8702aacb9d"
  dependencies:
    minipass "^2.2.1"

fs-write-stream-atomic@^1.0.8:
  version "1.0.10"
  resolved "https://registry.yarnpkg.com/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz#b47df53493ef911df75731e70a9ded0189db40c9"
  dependencies:
    graceful-fs "^4.1.2"
    iferr "^0.1.5"
    imurmurhash "^0.1.4"
    readable-stream "1 || 2"

fs.realpath@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/fs.realpath/-/fs.realpath-1.0.0.tgz#1504ad2523158caa40db4a2787cb01411994ea4f"

fsevents@^1.0.0, fsevents@^1.2.2:
  version "1.2.4"
  resolved "https://registry.yarnpkg.com/fsevents/-/fsevents-1.2.4.tgz#f41dcb1af2582af3692da36fc55cbd8e1041c426"
  dependencies:
    nan "^2.9.2"
    node-pre-gyp "^0.10.0"

fstream@^1.0.0, fstream@^1.0.2:
  version "1.0.11"
  resolved "https://registry.yarnpkg.com/fstream/-/fstream-1.0.11.tgz#5c1fb1f117477114f0632a0eb4b71b3cb0fd3171"
  dependencies:
    graceful-fs "^4.1.2"
    inherits "~2.0.0"
    mkdirp ">=0.5 0"
    rimraf "2"

gauge@~2.7.3:
  version "2.7.4"
  resolved "https://registry.yarnpkg.com/gauge/-/gauge-2.7.4.tgz#2c03405c7538c39d7eb37b317022e325fb018bf7"
  dependencies:
    aproba "^1.0.3"
    console-control-strings "^1.0.0"
    has-unicode "^2.0.0"
    object-assign "^4.1.0"
    signal-exit "^3.0.0"
    string-width "^1.0.1"
    strip-ansi "^3.0.1"
    wide-align "^1.1.0"

gaze@^1.0.0:
  version "1.1.3"
  resolved "https://registry.yarnpkg.com/gaze/-/gaze-1.1.3.tgz#c441733e13b927ac8c0ff0b4c3b033f28812924a"
  dependencies:
    globule "^1.0.0"

genfun@^5.0.0:
  version "5.0.0"
  resolved "https://registry.yarnpkg.com/genfun/-/genfun-5.0.0.tgz#9dd9710a06900a5c4a5bf57aca5da4e52fe76537"

get-caller-file@^1.0.1:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/get-caller-file/-/get-caller-file-1.0.3.tgz#f978fa4c90d1dfe7ff2d6beda2a515e713bdcf4a"

get-stdin@^4.0.1:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/get-stdin/-/get-stdin-4.0.1.tgz#b968c6b0a04384324902e8bf1a5df32579a450fe"

get-stream@^3.0.0:
  version "3.0.0"
  resolved "http://registry.npmjs.org/get-stream/-/get-stream-3.0.0.tgz#8e943d1358dc37555054ecbe2edb05aa174ede14"

get-stream@^4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/get-stream/-/get-stream-4.1.0.tgz#c1b255575f3dc21d59bfc79cd3d2b46b1c3a54b5"
  dependencies:
    pump "^3.0.0"

get-value@^2.0.3, get-value@^2.0.6:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/get-value/-/get-value-2.0.6.tgz#dc15ca1c672387ca76bd37ac0a395ba2042a2c28"

getpass@^0.1.1:
  version "0.1.7"
  resolved "https://registry.yarnpkg.com/getpass/-/getpass-0.1.7.tgz#5eff8e3e684d569ae4cb2b1282604e8ba62149fa"
  dependencies:
    assert-plus "^1.0.0"

glob-base@^0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/glob-base/-/glob-base-0.3.0.tgz#dbb164f6221b1c0b1ccf82aea328b497df0ea3c4"
  dependencies:
    glob-parent "^2.0.0"
    is-glob "^2.0.0"

glob-parent@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/glob-parent/-/glob-parent-2.0.0.tgz#81383d72db054fcccf5336daa902f182f6edbb28"
  dependencies:
    is-glob "^2.0.0"

glob-parent@^3.1.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/glob-parent/-/glob-parent-3.1.0.tgz#9e6af6299d8d3bd2bd40430832bd113df906c5ae"
  dependencies:
    is-glob "^3.1.0"
    path-dirname "^1.0.0"

glob@7.0.x:
  version "7.0.6"
  resolved "https://registry.yarnpkg.com/glob/-/glob-7.0.6.tgz#211bafaf49e525b8cd93260d14ab136152b3f57a"
  dependencies:
    fs.realpath "^1.0.0"
    inflight "^1.0.4"
    inherits "2"
    minimatch "^3.0.2"
    once "^1.3.0"
    path-is-absolute "^1.0.0"

glob@7.1.3, glob@^7.0.0, glob@^7.0.3, glob@^7.0.5, glob@^7.0.6, glob@^7.1.1, glob@^7.1.2, glob@^7.1.3, glob@~7.1.1:
  version "7.1.3"
  resolved "https://registry.yarnpkg.com/glob/-/glob-7.1.3.tgz#3960832d3f1574108342dafd3a67b332c0969df1"
  dependencies:
    fs.realpath "^1.0.0"
    inflight "^1.0.4"
    inherits "2"
    minimatch "^3.0.4"
    once "^1.3.0"
    path-is-absolute "^1.0.0"

glob@^5.0.15:
  version "5.0.15"
  resolved "https://registry.yarnpkg.com/glob/-/glob-5.0.15.tgz#1bc936b9e02f4a603fcc222ecf7633d30b8b93b1"
  dependencies:
    inflight "^1.0.4"
    inherits "2"
    minimatch "2 || 3"
    once "^1.3.0"
    path-is-absolute "^1.0.0"

global-dirs@^0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/global-dirs/-/global-dirs-0.1.1.tgz#b319c0dd4607f353f3be9cca4c72fc148c49f445"
  dependencies:
    ini "^1.3.4"

globals@^11.1.0:
  version "11.9.0"
  resolved "https://registry.yarnpkg.com/globals/-/globals-11.9.0.tgz#bde236808e987f290768a93d065060d78e6ab249"

globals@^9.18.0:
  version "9.18.0"
  resolved "https://registry.yarnpkg.com/globals/-/globals-9.18.0.tgz#aa3896b3e69b487f17e31ed2143d69a8e30c2d8a"

globby@^5.0.0:
  version "5.0.0"
  resolved "http://registry.npmjs.org/globby/-/globby-5.0.0.tgz#ebd84667ca0dbb330b99bcfc68eac2bc54370e0d"
  dependencies:
    array-union "^1.0.1"
    arrify "^1.0.0"
    glob "^7.0.3"
    object-assign "^4.0.1"
    pify "^2.0.0"
    pinkie-promise "^2.0.0"

globby@^6.1.0:
  version "6.1.0"
  resolved "http://registry.npmjs.org/globby/-/globby-6.1.0.tgz#f5a6d70e8395e21c858fb0489d64df02424d506c"
  dependencies:
    array-union "^1.0.1"
    glob "^7.0.3"
    object-assign "^4.0.1"
    pify "^2.0.0"
    pinkie-promise "^2.0.0"

globby@^7.1.1:
  version "7.1.1"
  resolved "https://registry.yarnpkg.com/globby/-/globby-7.1.1.tgz#fb2ccff9401f8600945dfada97440cca972b8680"
  dependencies:
    array-union "^1.0.1"
    dir-glob "^2.0.0"
    glob "^7.1.2"
    ignore "^3.3.5"
    pify "^3.0.0"
    slash "^1.0.0"

globule@^1.0.0:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/globule/-/globule-1.2.1.tgz#5dffb1b191f22d20797a9369b49eab4e9839696d"
  dependencies:
    glob "~7.1.1"
    lodash "~4.17.10"
    minimatch "~3.0.2"

got@^6.7.1:
  version "6.7.1"
  resolved "http://registry.npmjs.org/got/-/got-6.7.1.tgz#240cd05785a9a18e561dc1b44b41c763ef1e8db0"
  dependencies:
    create-error-class "^3.0.0"
    duplexer3 "^0.1.4"
    get-stream "^3.0.0"
    is-redirect "^1.0.0"
    is-retry-allowed "^1.0.0"
    is-stream "^1.0.0"
    lowercase-keys "^1.0.0"
    safe-buffer "^5.0.1"
    timed-out "^4.0.0"
    unzip-response "^2.0.1"
    url-parse-lax "^1.0.0"

graceful-fs@^4.1.11, graceful-fs@^4.1.2, graceful-fs@^4.1.6:
  version "4.1.15"
  resolved "https://registry.yarnpkg.com/graceful-fs/-/graceful-fs-4.1.15.tgz#ffb703e1066e8a0eeaa4c8b80ba9253eeefbfb00"

hammerjs@^2.0.8:
  version "2.0.8"
  resolved "https://registry.yarnpkg.com/hammerjs/-/hammerjs-2.0.8.tgz#04ef77862cff2bb79d30f7692095930222bf60f1"

handle-thing@^1.2.5:
  version "1.2.5"
  resolved "http://registry.npmjs.org/handle-thing/-/handle-thing-1.2.5.tgz#fd7aad726bf1a5fd16dfc29b2f7a6601d27139c4"

handlebars@^4.0.1, handlebars@^4.0.11:
  version "4.0.12"
  resolved "https://registry.yarnpkg.com/handlebars/-/handlebars-4.0.12.tgz#2c15c8a96d46da5e266700518ba8cb8d919d5bc5"
  dependencies:
    async "^2.5.0"
    optimist "^0.6.1"
    source-map "^0.6.1"
  optionalDependencies:
    uglify-js "^3.1.4"

har-schema@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/har-schema/-/har-schema-2.0.0.tgz#a94c2224ebcac04782a0d9035521f24735b7ec92"

har-validator@~5.1.0:
  version "5.1.3"
  resolved "https://registry.yarnpkg.com/har-validator/-/har-validator-5.1.3.tgz#1ef89ebd3e4996557675eed9893110dc350fa080"
  dependencies:
    ajv "^6.5.5"
    har-schema "^2.0.0"

has-ansi@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/has-ansi/-/has-ansi-2.0.0.tgz#34f5049ce1ecdf2b0649af3ef24e45ed35416d91"
  dependencies:
    ansi-regex "^2.0.0"

has-binary2@~1.0.2:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/has-binary2/-/has-binary2-1.0.3.tgz#7776ac627f3ea77250cfc332dab7ddf5e4f5d11d"
  dependencies:
    isarray "2.0.1"

has-cors@1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/has-cors/-/has-cors-1.1.0.tgz#5e474793f7ea9843d1bb99c23eef49ff126fff39"

has-flag@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/has-flag/-/has-flag-1.0.0.tgz#9d9e793165ce017a00f00418c43f942a7b1d11fa"

has-flag@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/has-flag/-/has-flag-3.0.0.tgz#b5d454dc2199ae225699f3467e5a07f3b955bafd"

has-unicode@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/has-unicode/-/has-unicode-2.0.1.tgz#e0e6fe6a28cf51138855e086d1691e771de2a8b9"

has-value@^0.3.1:
  version "0.3.1"
  resolved "https://registry.yarnpkg.com/has-value/-/has-value-0.3.1.tgz#7b1f58bada62ca827ec0a2078025654845995e1f"
  dependencies:
    get-value "^2.0.3"
    has-values "^0.1.4"
    isobject "^2.0.0"

has-value@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/has-value/-/has-value-1.0.0.tgz#18b281da585b1c5c51def24c930ed29a0be6b177"
  dependencies:
    get-value "^2.0.6"
    has-values "^1.0.0"
    isobject "^3.0.0"

has-values@^0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/has-values/-/has-values-0.1.4.tgz#6d61de95d91dfca9b9a02089ad384bff8f62b771"

has-values@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/has-values/-/has-values-1.0.0.tgz#95b0b63fec2146619a6fe57fe75628d5a39efe4f"
  dependencies:
    is-number "^3.0.0"
    kind-of "^4.0.0"

hash-base@^3.0.0:
  version "3.0.4"
  resolved "https://registry.yarnpkg.com/hash-base/-/hash-base-3.0.4.tgz#5fc8686847ecd73499403319a6b0a3f3f6ae4918"
  dependencies:
    inherits "^2.0.1"
    safe-buffer "^5.0.1"

hash.js@^1.0.0, hash.js@^1.0.3:
  version "1.1.7"
  resolved "https://registry.yarnpkg.com/hash.js/-/hash.js-1.1.7.tgz#0babca538e8d4ee4a0f8988d68866537a003cf42"
  dependencies:
    inherits "^2.0.3"
    minimalistic-assert "^1.0.1"

hmac-drbg@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/hmac-drbg/-/hmac-drbg-1.0.1.tgz#d2745701025a6c775a6c545793ed502fc0c649a1"
  dependencies:
    hash.js "^1.0.3"
    minimalistic-assert "^1.0.0"
    minimalistic-crypto-utils "^1.0.1"

hosted-git-info@^2.1.4, hosted-git-info@^2.6.0:
  version "2.7.1"
  resolved "https://registry.yarnpkg.com/hosted-git-info/-/hosted-git-info-2.7.1.tgz#97f236977bd6e125408930ff6de3eec6281ec047"

hpack.js@^2.1.6:
  version "2.1.6"
  resolved "https://registry.yarnpkg.com/hpack.js/-/hpack.js-2.1.6.tgz#87774c0949e513f42e84575b3c45681fade2a0b2"
  dependencies:
    inherits "^2.0.1"
    obuf "^1.0.0"
    readable-stream "^2.0.1"
    wbuf "^1.1.0"

html-entities@^1.2.0:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/html-entities/-/html-entities-1.2.1.tgz#0df29351f0721163515dfb9e5543e5f6eed5162f"

http-cache-semantics@^3.8.1:
  version "3.8.1"
  resolved "https://registry.yarnpkg.com/http-cache-semantics/-/http-cache-semantics-3.8.1.tgz#39b0e16add9b605bf0a9ef3d9daaf4843b4cacd2"

http-deceiver@^1.2.7:
  version "1.2.7"
  resolved "https://registry.yarnpkg.com/http-deceiver/-/http-deceiver-1.2.7.tgz#fa7168944ab9a519d337cb0bec7284dc3e723d87"

http-errors@1.6.3, http-errors@~1.6.2, http-errors@~1.6.3:
  version "1.6.3"
  resolved "http://registry.npmjs.org/http-errors/-/http-errors-1.6.3.tgz#8b55680bb4be283a0b5bf4ea2e38580be1d9320d"
  dependencies:
    depd "~1.1.2"
    inherits "2.0.3"
    setprototypeof "1.1.0"
    statuses ">= 1.4.0 < 2"

http-parser-js@>=0.4.0:
  version "0.5.0"
  resolved "https://registry.yarnpkg.com/http-parser-js/-/http-parser-js-0.5.0.tgz#d65edbede84349d0dc30320815a15d39cc3cbbd8"

http-proxy-agent@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/http-proxy-agent/-/http-proxy-agent-2.1.0.tgz#e4821beef5b2142a2026bd73926fe537631c5405"
  dependencies:
    agent-base "4"
    debug "3.1.0"

http-proxy-middleware@~0.18.0:
  version "0.18.0"
  resolved "http://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-0.18.0.tgz#0987e6bb5a5606e5a69168d8f967a87f15dd8aab"
  dependencies:
    http-proxy "^1.16.2"
    is-glob "^4.0.0"
    lodash "^4.17.5"
    micromatch "^3.1.9"

http-proxy@^1.13.0, http-proxy@^1.16.2:
  version "1.17.0"
  resolved "https://registry.yarnpkg.com/http-proxy/-/http-proxy-1.17.0.tgz#7ad38494658f84605e2f6db4436df410f4e5be9a"
  dependencies:
    eventemitter3 "^3.0.0"
    follow-redirects "^1.0.0"
    requires-port "^1.0.0"

http-signature@~1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/http-signature/-/http-signature-1.2.0.tgz#9aecd925114772f3d95b65a60abb8f7c18fbace1"
  dependencies:
    assert-plus "^1.0.0"
    jsprim "^1.2.2"
    sshpk "^1.7.0"

https-browserify@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/https-browserify/-/https-browserify-1.0.0.tgz#ec06c10e0a34c0f2faf199f7fd7fc78fffd03c73"

https-proxy-agent@^2.2.1:
  version "2.2.1"
  resolved "https://registry.yarnpkg.com/https-proxy-agent/-/https-proxy-agent-2.2.1.tgz#51552970fa04d723e04c56d04178c3f92592bbc0"
  dependencies:
    agent-base "^4.1.0"
    debug "^3.1.0"

humanize-ms@^1.2.1:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/humanize-ms/-/humanize-ms-1.2.1.tgz#c46e3159a293f6b896da29316d8b6fe8bb79bbed"
  dependencies:
    ms "^2.0.0"

iconv-lite@0.4.23:
  version "0.4.23"
  resolved "https://registry.yarnpkg.com/iconv-lite/-/iconv-lite-0.4.23.tgz#297871f63be507adcfbfca715d0cd0eed84e9a63"
  dependencies:
    safer-buffer ">= 2.1.2 < 3"

iconv-lite@^0.4.13, iconv-lite@^0.4.17, iconv-lite@^0.4.24, iconv-lite@^0.4.4, iconv-lite@~0.4.13:
  version "0.4.24"
  resolved "https://registry.yarnpkg.com/iconv-lite/-/iconv-lite-0.4.24.tgz#2022b4b25fbddc21d2f524974a474aafe733908b"
  dependencies:
    safer-buffer ">= 2.1.2 < 3"

ieee754@^1.1.4:
  version "1.1.12"
  resolved "https://registry.yarnpkg.com/ieee754/-/ieee754-1.1.12.tgz#50bf24e5b9c8bb98af4964c941cdb0918da7b60b"

iferr@^0.1.5:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/iferr/-/iferr-0.1.5.tgz#c60eed69e6d8fdb6b3104a1fcbca1c192dc5b501"

ignore-walk@^3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/ignore-walk/-/ignore-walk-3.0.1.tgz#a83e62e7d272ac0e3b551aaa82831a19b69f82f8"
  dependencies:
    minimatch "^3.0.4"

ignore@^3.3.5:
  version "3.3.10"
  resolved "https://registry.yarnpkg.com/ignore/-/ignore-3.3.10.tgz#0a97fb876986e8081c631160f8f9f389157f0043"

image-size@~0.5.0:
  version "0.5.5"
  resolved "https://registry.yarnpkg.com/image-size/-/image-size-0.5.5.tgz#09dfd4ab9d20e29eb1c3e80b8990378df9e3cb9c"

immediate@~3.0.5:
  version "3.0.6"
  resolved "https://registry.yarnpkg.com/immediate/-/immediate-3.0.6.tgz#9db1dbd0faf8de6fbe0f5dd5e56bb606280de69b"

import-cwd@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/import-cwd/-/import-cwd-2.1.0.tgz#aa6cf36e722761285cb371ec6519f53e2435b0a9"
  dependencies:
    import-from "^2.1.0"

import-from@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/import-from/-/import-from-2.1.0.tgz#335db7f2a7affd53aaa471d4b8021dee36b7f3b1"
  dependencies:
    resolve-from "^3.0.0"

import-lazy@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/import-lazy/-/import-lazy-2.1.0.tgz#05698e3d45c88e8d7e9d92cb0584e77f096f3e43"

import-local@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/import-local/-/import-local-2.0.0.tgz#55070be38a5993cf18ef6db7e961f5bee5c5a09d"
  dependencies:
    pkg-dir "^3.0.0"
    resolve-cwd "^2.0.0"

imurmurhash@^0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/imurmurhash/-/imurmurhash-0.1.4.tgz#9218b9b2b928a238b13dc4fb6b6d576f231453ea"

in-publish@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/in-publish/-/in-publish-2.0.0.tgz#e20ff5e3a2afc2690320b6dc552682a9c7fadf51"

indent-string@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/indent-string/-/indent-string-2.1.0.tgz#8e2d48348742121b4a8218b7a137e9a52049dc80"
  dependencies:
    repeating "^2.0.0"

indexof@0.0.1:
  version "0.0.1"
  resolved "https://registry.yarnpkg.com/indexof/-/indexof-0.0.1.tgz#82dc336d232b9062179d05ab3293a66059fd435d"

inflight@^1.0.4:
  version "1.0.6"
  resolved "https://registry.yarnpkg.com/inflight/-/inflight-1.0.6.tgz#49bd6331d7d02d0c09bc910a1075ba8165b56df9"
  dependencies:
    once "^1.3.0"
    wrappy "1"

inherits@2, inherits@2.0.3, inherits@^2.0.1, inherits@^2.0.3, inherits@~2.0.0, inherits@~2.0.1, inherits@~2.0.3:
  version "2.0.3"
  resolved "https://registry.yarnpkg.com/inherits/-/inherits-2.0.3.tgz#633c2c83e3da42a502f52466022480f4208261de"

inherits@2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/inherits/-/inherits-2.0.1.tgz#b17d08d326b4423e568eff719f91b0b1cbdf69f1"

ini@1.3.5, ini@^1.3.4, ini@~1.3.0:
  version "1.3.5"
  resolved "https://registry.yarnpkg.com/ini/-/ini-1.3.5.tgz#eee25f56db1c9ec6085e0c22778083f596abf927"

injection-js@^2.2.1:
  version "2.2.1"
  resolved "https://registry.yarnpkg.com/injection-js/-/injection-js-2.2.1.tgz#a8d6a085b2f0b8d8650f6f4487f6abb8cc0d67ce"

inquirer@3.0.6:
  version "3.0.6"
  resolved "https://registry.yarnpkg.com/inquirer/-/inquirer-3.0.6.tgz#e04aaa9d05b7a3cb9b0f407d04375f0447190347"
  dependencies:
    ansi-escapes "^1.1.0"
    chalk "^1.0.0"
    cli-cursor "^2.1.0"
    cli-width "^2.0.0"
    external-editor "^2.0.1"
    figures "^2.0.0"
    lodash "^4.3.0"
    mute-stream "0.0.7"
    run-async "^2.2.0"
    rx "^4.1.0"
    string-width "^2.0.0"
    strip-ansi "^3.0.0"
    through "^2.3.6"

inquirer@6.2.0:
  version "6.2.0"
  resolved "https://registry.yarnpkg.com/inquirer/-/inquirer-6.2.0.tgz#51adcd776f661369dc1e894859c2560a224abdd8"
  dependencies:
    ansi-escapes "^3.0.0"
    chalk "^2.0.0"
    cli-cursor "^2.1.0"
    cli-width "^2.0.0"
    external-editor "^3.0.0"
    figures "^2.0.0"
    lodash "^4.17.10"
    mute-stream "0.0.7"
    run-async "^2.2.0"
    rxjs "^6.1.0"
    string-width "^2.1.0"
    strip-ansi "^4.0.0"
    through "^2.3.6"

internal-ip@^3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/internal-ip/-/internal-ip-3.0.1.tgz#df5c99876e1d2eb2ea2d74f520e3f669a00ece27"
  dependencies:
    default-gateway "^2.6.0"
    ipaddr.js "^1.5.2"

interpret@^1.0.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/interpret/-/interpret-1.1.0.tgz#7ed1b1410c6a0e0f78cf95d3b8440c63f78b8614"

invariant@^2.2.2:
  version "2.2.4"
  resolved "https://registry.yarnpkg.com/invariant/-/invariant-2.2.4.tgz#610f3c92c9359ce1db616e538008d23ff35158e6"
  dependencies:
    loose-envify "^1.0.0"

invert-kv@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/invert-kv/-/invert-kv-1.0.0.tgz#104a8e4aaca6d3d8cd157a8ef8bfab2d7a3ffdb6"

invert-kv@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/invert-kv/-/invert-kv-2.0.0.tgz#7393f5afa59ec9ff5f67a27620d11c226e3eec02"

ip-regex@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/ip-regex/-/ip-regex-2.1.0.tgz#fa78bf5d2e6913c911ce9f819ee5146bb6d844e9"

ip@^1.1.0, ip@^1.1.5:
  version "1.1.5"
  resolved "https://registry.yarnpkg.com/ip/-/ip-1.1.5.tgz#bdded70114290828c0a039e72ef25f5aaec4354a"

ipaddr.js@1.8.0:
  version "1.8.0"
  resolved "https://registry.yarnpkg.com/ipaddr.js/-/ipaddr.js-1.8.0.tgz#eaa33d6ddd7ace8f7f6fe0c9ca0440e706738b1e"

ipaddr.js@^1.5.2:
  version "1.8.1"
  resolved "https://registry.yarnpkg.com/ipaddr.js/-/ipaddr.js-1.8.1.tgz#fa4b79fa47fd3def5e3b159825161c0a519c9427"

is-accessor-descriptor@^0.1.6:
  version "0.1.6"
  resolved "https://registry.yarnpkg.com/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz#a9e12cb3ae8d876727eeef3843f8a0897b5c98d6"
  dependencies:
    kind-of "^3.0.2"

is-accessor-descriptor@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz#169c2f6d3df1f992618072365c9b0ea1f6878656"
  dependencies:
    kind-of "^6.0.0"

is-arrayish@^0.2.1:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/is-arrayish/-/is-arrayish-0.2.1.tgz#77c99840527aa8ecb1a8ba697b80645a7a926a9d"

is-binary-path@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/is-binary-path/-/is-binary-path-1.0.1.tgz#75f16642b480f187a711c814161fd3a4a7655898"
  dependencies:
    binary-extensions "^1.0.0"

is-buffer@^1.1.5:
  version "1.1.6"
  resolved "https://registry.yarnpkg.com/is-buffer/-/is-buffer-1.1.6.tgz#efaa2ea9daa0d7ab2ea13a97b2b8ad51fefbe8be"

is-builtin-module@^1.0.0:
  version "1.0.0"
  resolved "http://registry.npmjs.org/is-builtin-module/-/is-builtin-module-1.0.0.tgz#540572d34f7ac3119f8f76c30cbc1b1e037affbe"
  dependencies:
    builtin-modules "^1.0.0"

is-ci@^1.0.10:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/is-ci/-/is-ci-1.2.1.tgz#e3779c8ee17fccf428488f6e281187f2e632841c"
  dependencies:
    ci-info "^1.5.0"

is-data-descriptor@^0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz#0b5ee648388e2c860282e793f1856fec3f301b56"
  dependencies:
    kind-of "^3.0.2"

is-data-descriptor@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz#d84876321d0e7add03990406abbbbd36ba9268c7"
  dependencies:
    kind-of "^6.0.0"

is-descriptor@^0.1.0:
  version "0.1.6"
  resolved "https://registry.yarnpkg.com/is-descriptor/-/is-descriptor-0.1.6.tgz#366d8240dde487ca51823b1ab9f07a10a78251ca"
  dependencies:
    is-accessor-descriptor "^0.1.6"
    is-data-descriptor "^0.1.4"
    kind-of "^5.0.0"

is-descriptor@^1.0.0, is-descriptor@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/is-descriptor/-/is-descriptor-1.0.2.tgz#3b159746a66604b04f8c81524ba365c5f14d86ec"
  dependencies:
    is-accessor-descriptor "^1.0.0"
    is-data-descriptor "^1.0.0"
    kind-of "^6.0.2"

is-directory@^0.3.1:
  version "0.3.1"
  resolved "https://registry.yarnpkg.com/is-directory/-/is-directory-0.3.1.tgz#61339b6f2475fc772fd9c9d83f5c8575dc154ae1"

is-dotfile@^1.0.0:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/is-dotfile/-/is-dotfile-1.0.3.tgz#a6a2f32ffd2dfb04f5ca25ecd0f6b83cf798a1e1"

is-equal-shallow@^0.1.3:
  version "0.1.3"
  resolved "https://registry.yarnpkg.com/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz#2238098fc221de0bcfa5d9eac4c45d638aa1c534"
  dependencies:
    is-primitive "^2.0.0"

is-extendable@^0.1.0, is-extendable@^0.1.1:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/is-extendable/-/is-extendable-0.1.1.tgz#62b110e289a471418e3ec36a617d472e301dfc89"

is-extendable@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/is-extendable/-/is-extendable-1.0.1.tgz#a7470f9e426733d81bd81e1155264e3a3507cab4"
  dependencies:
    is-plain-object "^2.0.4"

is-extglob@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-extglob/-/is-extglob-1.0.0.tgz#ac468177c4943405a092fc8f29760c6ffc6206c0"

is-extglob@^2.1.0, is-extglob@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/is-extglob/-/is-extglob-2.1.1.tgz#a88c02535791f02ed37c76a1b9ea9773c833f8c2"

is-finite@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/is-finite/-/is-finite-1.0.2.tgz#cc6677695602be550ef11e8b4aa6305342b6d0aa"
  dependencies:
    number-is-nan "^1.0.0"

is-fullwidth-code-point@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz#ef9e31386f031a7f0d643af82fde50c457ef00cb"
  dependencies:
    number-is-nan "^1.0.0"

is-fullwidth-code-point@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz#a3b30a5c4f199183167aaab93beefae3ddfb654f"

is-glob@^2.0.0, is-glob@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/is-glob/-/is-glob-2.0.1.tgz#d096f926a3ded5600f3fdfd91198cb0888c2d863"
  dependencies:
    is-extglob "^1.0.0"

is-glob@^3.1.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/is-glob/-/is-glob-3.1.0.tgz#7ba5ae24217804ac70707b96922567486cc3e84a"
  dependencies:
    is-extglob "^2.1.0"

is-glob@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/is-glob/-/is-glob-4.0.0.tgz#9521c76845cc2610a85203ddf080a958c2ffabc0"
  dependencies:
    is-extglob "^2.1.1"

is-installed-globally@^0.1.0:
  version "0.1.0"
  resolved "https://registry.yarnpkg.com/is-installed-globally/-/is-installed-globally-0.1.0.tgz#0dfd98f5a9111716dd535dda6492f67bf3d25a80"
  dependencies:
    global-dirs "^0.1.0"
    is-path-inside "^1.0.0"

is-module@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-module/-/is-module-1.0.0.tgz#3258fb69f78c14d5b815d664336b4cffb6441591"

is-npm@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-npm/-/is-npm-1.0.0.tgz#f2fb63a65e4905b406c86072765a1a4dc793b9f4"

is-number@^0.1.1:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/is-number/-/is-number-0.1.1.tgz#69a7af116963d47206ec9bd9b48a14216f1e3806"

is-number@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/is-number/-/is-number-2.1.0.tgz#01fcbbb393463a548f2f466cce16dece49db908f"
  dependencies:
    kind-of "^3.0.2"

is-number@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/is-number/-/is-number-3.0.0.tgz#24fd6201a4782cf50561c810276afc7d12d71195"
  dependencies:
    kind-of "^3.0.2"

is-number@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/is-number/-/is-number-4.0.0.tgz#0026e37f5454d73e356dfe6564699867c6a7f0ff"

is-obj@^1.0.0:
  version "1.0.1"
  resolved "http://registry.npmjs.org/is-obj/-/is-obj-1.0.1.tgz#3e4729ac1f5fde025cd7d83a896dab9f4f67db0f"

is-path-cwd@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-path-cwd/-/is-path-cwd-1.0.0.tgz#d225ec23132e89edd38fda767472e62e65f1106d"

is-path-in-cwd@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/is-path-in-cwd/-/is-path-in-cwd-1.0.1.tgz#5ac48b345ef675339bd6c7a48a912110b241cf52"
  dependencies:
    is-path-inside "^1.0.0"

is-path-inside@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/is-path-inside/-/is-path-inside-1.0.1.tgz#8ef5b7de50437a3fdca6b4e865ef7aa55cb48036"
  dependencies:
    path-is-inside "^1.0.1"

is-plain-object@^2.0.1, is-plain-object@^2.0.3, is-plain-object@^2.0.4:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/is-plain-object/-/is-plain-object-2.0.4.tgz#2c163b3fafb1b606d9d17928f05c2a1c38e07677"
  dependencies:
    isobject "^3.0.1"

is-posix-bracket@^0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz#3334dc79774368e92f016e6fbc0a88f5cd6e6bc4"

is-primitive@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/is-primitive/-/is-primitive-2.0.0.tgz#207bab91638499c07b2adf240a41a87210034575"

is-promise@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/is-promise/-/is-promise-2.1.0.tgz#79a2a9ece7f096e80f36d2b2f3bc16c1ff4bf3fa"

is-redirect@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-redirect/-/is-redirect-1.0.0.tgz#1d03dded53bd8db0f30c26e4f95d36fc7c87dc24"

is-retry-allowed@^1.0.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/is-retry-allowed/-/is-retry-allowed-1.1.0.tgz#11a060568b67339444033d0125a61a20d564fb34"

is-stream@^1.0.0, is-stream@^1.0.1, is-stream@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/is-stream/-/is-stream-1.1.0.tgz#12d4a3dd4e68e0b79ceb8dbc84173ae80d91ca44"

is-typedarray@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/is-typedarray/-/is-typedarray-1.0.0.tgz#e479c80858df0c1b11ddda6940f96011fcda4a9a"

is-utf8@^0.2.0:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/is-utf8/-/is-utf8-0.2.1.tgz#4b0da1442104d1b336340e80797e865cf39f7d72"

is-windows@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/is-windows/-/is-windows-1.0.2.tgz#d1850eb9791ecd18e6182ce12a30f396634bb19d"

is-wsl@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/is-wsl/-/is-wsl-1.1.0.tgz#1f16e4aa22b04d1336b66188a66af3c600c3a66d"

isarray@1.0.0, isarray@^1.0.0, isarray@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/isarray/-/isarray-1.0.0.tgz#bb935d48582cba168c06834957a54a3e07124f11"

isarray@2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/isarray/-/isarray-2.0.1.tgz#a37d94ed9cda2d59865c9f76fe596ee1f338741e"

isbinaryfile@^3.0.0:
  version "3.0.3"
  resolved "https://registry.yarnpkg.com/isbinaryfile/-/isbinaryfile-3.0.3.tgz#5d6def3edebf6e8ca8cae9c30183a804b5f8be80"
  dependencies:
    buffer-alloc "^1.2.0"

isexe@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/isexe/-/isexe-2.0.0.tgz#e8fbf374dc556ff8947a10dcb0572d633f2cfa10"

isobject@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/isobject/-/isobject-2.1.0.tgz#f065561096a3f1da2ef46272f815c840d87e0c89"
  dependencies:
    isarray "1.0.0"

isobject@^3.0.0, isobject@^3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/isobject/-/isobject-3.0.1.tgz#4e431e92b11a9731636aa1f9c8d1ccbcfdab78df"

isstream@~0.1.2:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/isstream/-/isstream-0.1.2.tgz#47e63f7af55afa6f92e1500e690eb8b8529c099a"

istanbul-api@^2.0.5:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/istanbul-api/-/istanbul-api-2.0.6.tgz#cd7b33ee678f6c01531d05f5e567ebbcd25f8ecc"
  dependencies:
    async "^2.6.1"
    compare-versions "^3.2.1"
    fileset "^2.0.3"
    istanbul-lib-coverage "^2.0.1"
    istanbul-lib-hook "^2.0.1"
    istanbul-lib-instrument "^3.0.0"
    istanbul-lib-report "^2.0.2"
    istanbul-lib-source-maps "^2.0.1"
    istanbul-reports "^2.0.1"
    js-yaml "^3.12.0"
    make-dir "^1.3.0"
    once "^1.4.0"

istanbul-instrumenter-loader@3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/istanbul-instrumenter-loader/-/istanbul-instrumenter-loader-3.0.1.tgz#9957bd59252b373fae5c52b7b5188e6fde2a0949"
  dependencies:
    convert-source-map "^1.5.0"
    istanbul-lib-instrument "^1.7.3"
    loader-utils "^1.1.0"
    schema-utils "^0.3.0"

istanbul-lib-coverage@^1.2.1:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/istanbul-lib-coverage/-/istanbul-lib-coverage-1.2.1.tgz#ccf7edcd0a0bb9b8f729feeb0930470f9af664f0"

istanbul-lib-coverage@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz#2aee0e073ad8c5f6a0b00e0dfbf52b4667472eda"

istanbul-lib-hook@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/istanbul-lib-hook/-/istanbul-lib-hook-2.0.1.tgz#918a57b75a0f951d552a08487ca1fa5336433d72"
  dependencies:
    append-transform "^1.0.0"

istanbul-lib-instrument@^1.7.3:
  version "1.10.2"
  resolved "https://registry.yarnpkg.com/istanbul-lib-instrument/-/istanbul-lib-instrument-1.10.2.tgz#1f55ed10ac3c47f2bdddd5307935126754d0a9ca"
  dependencies:
    babel-generator "^6.18.0"
    babel-template "^6.16.0"
    babel-traverse "^6.18.0"
    babel-types "^6.18.0"
    babylon "^6.18.0"
    istanbul-lib-coverage "^1.2.1"
    semver "^5.3.0"

istanbul-lib-instrument@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/istanbul-lib-instrument/-/istanbul-lib-instrument-3.0.0.tgz#b5f066b2a161f75788be17a9d556f40a0cf2afc9"
  dependencies:
    "@babel/generator" "^7.0.0"
    "@babel/parser" "^7.0.0"
    "@babel/template" "^7.0.0"
    "@babel/traverse" "^7.0.0"
    "@babel/types" "^7.0.0"
    istanbul-lib-coverage "^2.0.1"
    semver "^5.5.0"

istanbul-lib-report@^2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/istanbul-lib-report/-/istanbul-lib-report-2.0.2.tgz#430a2598519113e1da7af274ba861bd42dd97535"
  dependencies:
    istanbul-lib-coverage "^2.0.1"
    make-dir "^1.3.0"
    supports-color "^5.4.0"

istanbul-lib-source-maps@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/istanbul-lib-source-maps/-/istanbul-lib-source-maps-2.0.1.tgz#ce8b45131d8293fdeaa732f4faf1852d13d0a97e"
  dependencies:
    debug "^3.1.0"
    istanbul-lib-coverage "^2.0.1"
    make-dir "^1.3.0"
    rimraf "^2.6.2"
    source-map "^0.6.1"

istanbul-reports@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/istanbul-reports/-/istanbul-reports-2.0.1.tgz#fb8d6ea850701a3984350b977a969e9a556116a7"
  dependencies:
    handlebars "^4.0.11"

istanbul@0.4.5:
  version "0.4.5"
  resolved "https://registry.yarnpkg.com/istanbul/-/istanbul-0.4.5.tgz#65c7d73d4c4da84d4f3ac310b918fb0b8033733b"
  dependencies:
    abbrev "1.0.x"
    async "1.x"
    escodegen "1.8.x"
    esprima "2.7.x"
    glob "^5.0.15"
    handlebars "^4.0.1"
    js-yaml "3.x"
    mkdirp "0.5.x"
    nopt "3.x"
    once "1.x"
    resolve "1.1.x"
    supports-color "^3.1.0"
    which "^1.1.1"
    wordwrap "^1.0.0"

jasmine-core@~2.8.0:
  version "2.8.0"
  resolved "https://registry.yarnpkg.com/jasmine-core/-/jasmine-core-2.8.0.tgz#bcc979ae1f9fd05701e45e52e65d3a5d63f1a24e"

jasmine-core@~2.99.1:
  version "2.99.1"
  resolved "http://registry.npmjs.org/jasmine-core/-/jasmine-core-2.99.1.tgz#e6400df1e6b56e130b61c4bcd093daa7f6e8ca15"

jasmine-spec-reporter@~4.2.1:
  version "4.2.1"
  resolved "https://registry.yarnpkg.com/jasmine-spec-reporter/-/jasmine-spec-reporter-4.2.1.tgz#1d632aec0341670ad324f92ba84b4b32b35e9e22"
  dependencies:
    colors "1.1.2"

jasmine@2.8.0:
  version "2.8.0"
  resolved "https://registry.yarnpkg.com/jasmine/-/jasmine-2.8.0.tgz#6b089c0a11576b1f16df11b80146d91d4e8b8a3e"
  dependencies:
    exit "^0.1.2"
    glob "^7.0.6"
    jasmine-core "~2.8.0"

jasminewd2@^2.1.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/jasminewd2/-/jasminewd2-2.2.0.tgz#e37cf0b17f199cce23bea71b2039395246b4ec4e"

js-base64@^2.1.8:
  version "2.4.9"
  resolved "https://registry.yarnpkg.com/js-base64/-/js-base64-2.4.9.tgz#748911fb04f48a60c4771b375cac45a80df11c03"

"js-tokens@^3.0.0 || ^4.0.0", js-tokens@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/js-tokens/-/js-tokens-4.0.0.tgz#19203fb59991df98e3a287050d4647cdeaf32499"

js-tokens@^3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/js-tokens/-/js-tokens-3.0.2.tgz#9866df395102130e38f7f996bceb65443209c25b"

js-yaml@3.x, js-yaml@^3.12.0, js-yaml@^3.7.0, js-yaml@^3.9.0:
  version "3.12.0"
  resolved "https://registry.yarnpkg.com/js-yaml/-/js-yaml-3.12.0.tgz#eaed656ec8344f10f527c6bfa1b6e2244de167d1"
  dependencies:
    argparse "^1.0.7"
    esprima "^4.0.0"

jsbn@~0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/jsbn/-/jsbn-0.1.1.tgz#a5e654c2e5a2deb5f201d96cefbca80c0ef2f513"

jsdom@^8.1.0:
  version "8.5.0"
  resolved "http://registry.npmjs.org/jsdom/-/jsdom-8.5.0.tgz#d4d8f5dbf2768635b62a62823b947cf7071ebc98"
  dependencies:
    abab "^1.0.0"
    acorn "^2.4.0"
    acorn-globals "^1.0.4"
    array-equal "^1.0.0"
    cssom ">= 0.3.0 < 0.4.0"
    cssstyle ">= 0.2.34 < 0.3.0"
    escodegen "^1.6.1"
    iconv-lite "^0.4.13"
    nwmatcher ">= 1.3.7 < 2.0.0"
    parse5 "^1.5.1"
    request "^2.55.0"
    sax "^1.1.4"
    symbol-tree ">= 3.1.0 < 4.0.0"
    tough-cookie "^2.2.0"
    webidl-conversions "^3.0.1"
    whatwg-url "^2.0.1"
    xml-name-validator ">= 2.0.1 < 3.0.0"

jsesc@^1.3.0:
  version "1.3.0"
  resolved "http://registry.npmjs.org/jsesc/-/jsesc-1.3.0.tgz#46c3fec8c1892b12b0833db9bc7622176dbab34b"

jsesc@^2.5.1:
  version "2.5.2"
  resolved "https://registry.yarnpkg.com/jsesc/-/jsesc-2.5.2.tgz#80564d2e483dacf6e8ef209650a67df3f0c283a4"

jsesc@~0.5.0:
  version "0.5.0"
  resolved "http://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz#e7dee66e35d6fc16f710fe91d5cf69f70f08911d"

json-parse-better-errors@^1.0.0, json-parse-better-errors@^1.0.1, json-parse-better-errors@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz#bb867cfb3450e69107c131d1c514bab3dc8bcaa9"

json-schema-traverse@^0.3.0:
  version "0.3.1"
  resolved "https://registry.yarnpkg.com/json-schema-traverse/-/json-schema-traverse-0.3.1.tgz#349a6d44c53a51de89b40805c5d5e59b417d3340"

json-schema-traverse@^0.4.1:
  version "0.4.1"
  resolved "https://registry.yarnpkg.com/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz#69f6a87d9513ab8bb8fe63bdb0979c448e684660"

json-schema@0.2.3:
  version "0.2.3"
  resolved "https://registry.yarnpkg.com/json-schema/-/json-schema-0.2.3.tgz#b480c892e59a2f05954ce727bd3f2a4e882f9e13"

json-stringify-safe@~5.0.1:
  version "5.0.1"
  resolved "https://registry.yarnpkg.com/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz#1296a2d58fd45f19a0f6ce01d65701e2c735b6eb"

json3@^3.3.2:
  version "3.3.2"
  resolved "https://registry.yarnpkg.com/json3/-/json3-3.3.2.tgz#3c0434743df93e2f5c42aee7b19bcb483575f4e1"

json5@^0.5.0:
  version "0.5.1"
  resolved "http://registry.npmjs.org/json5/-/json5-0.5.1.tgz#1eade7acc012034ad84e2396767ead9fa5495821"

jsonfile@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/jsonfile/-/jsonfile-4.0.0.tgz#8771aae0799b64076b76640fca058f9c10e33ecb"
  optionalDependencies:
    graceful-fs "^4.1.6"

jsonparse@^1.2.0:
  version "1.3.1"
  resolved "https://registry.yarnpkg.com/jsonparse/-/jsonparse-1.3.1.tgz#3f4dae4a91fac315f71062f8521cc239f1366280"

jspdf@^1.4.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/jspdf/-/jspdf-1.4.1.tgz#8dbd437986346d65efe20ede5361927666b8e4ca"
  dependencies:
    canvg "^1.0"
    cf-blob.js "0.0.1"
    file-saver "1.3.8"
    omggif "1.0.7"
    stackblur "^1.0.0"

jsprim@^1.2.2:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/jsprim/-/jsprim-1.4.1.tgz#313e66bc1e5cc06e438bc1b7499c2e5c56acb6a2"
  dependencies:
    assert-plus "1.0.0"
    extsprintf "1.3.0"
    json-schema "0.2.3"
    verror "1.10.0"

jszip@^3.1.3:
  version "3.1.5"
  resolved "https://registry.yarnpkg.com/jszip/-/jszip-3.1.5.tgz#e3c2a6c6d706ac6e603314036d43cd40beefdf37"
  dependencies:
    core-js "~2.3.0"
    es6-promise "~3.0.2"
    lie "~3.1.0"
    pako "~1.0.2"
    readable-stream "~2.0.6"

karma-chrome-launcher@~2.2.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/karma-chrome-launcher/-/karma-chrome-launcher-2.2.0.tgz#cf1b9d07136cc18fe239327d24654c3dbc368acf"
  dependencies:
    fs-access "^1.0.0"
    which "^1.2.1"

karma-coverage-istanbul-reporter@~2.0.1:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/karma-coverage-istanbul-reporter/-/karma-coverage-istanbul-reporter-2.0.4.tgz#402ae4ed6eadb9d9dafbd408ffda17897c0d003a"
  dependencies:
    istanbul-api "^2.0.5"
    minimatch "^3.0.4"

karma-jasmine-html-reporter@^0.2.2:
  version "0.2.2"
  resolved "http://registry.npmjs.org/karma-jasmine-html-reporter/-/karma-jasmine-html-reporter-0.2.2.tgz#48a8e5ef18807617ee2b5e33c1194c35b439524c"
  dependencies:
    karma-jasmine "^1.0.2"

karma-jasmine@^1.0.2, karma-jasmine@~1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/karma-jasmine/-/karma-jasmine-1.1.2.tgz#394f2b25ffb4a644b9ada6f22d443e2fd08886c3"

karma-source-map-support@1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/karma-source-map-support/-/karma-source-map-support-1.3.0.tgz#36dd4d8ca154b62ace95696236fae37caf0a7dde"
  dependencies:
    source-map-support "^0.5.5"

karma@^3.1.3:
  version "3.1.3"
  resolved "https://registry.yarnpkg.com/karma/-/karma-3.1.3.tgz#6e251648e3aff900927bc1126dbcbcb92d3edd61"
  dependencies:
    bluebird "^3.3.0"
    body-parser "^1.16.1"
    chokidar "^2.0.3"
    colors "^1.1.0"
    combine-lists "^1.0.0"
    connect "^3.6.0"
    core-js "^2.2.0"
    di "^0.0.1"
    dom-serialize "^2.2.0"
    expand-braces "^0.1.1"
    flatted "^2.0.0"
    glob "^7.1.1"
    graceful-fs "^4.1.2"
    http-proxy "^1.13.0"
    isbinaryfile "^3.0.0"
    lodash "^4.17.5"
    log4js "^3.0.0"
    mime "^2.3.1"
    minimatch "^3.0.2"
    optimist "^0.6.1"
    qjobs "^1.1.4"
    range-parser "^1.2.0"
    rimraf "^2.6.0"
    safe-buffer "^5.0.1"
    socket.io "2.1.1"
    source-map "^0.6.1"
    tmp "0.0.33"
    useragent "2.3.0"

killable@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/killable/-/killable-1.0.1.tgz#4c8ce441187a061c7474fb87ca08e2a638194892"

kind-of@^3.0.2, kind-of@^3.0.3, kind-of@^3.2.0:
  version "3.2.2"
  resolved "https://registry.yarnpkg.com/kind-of/-/kind-of-3.2.2.tgz#31ea21a734bab9bbb0f32466d893aea51e4a3c64"
  dependencies:
    is-buffer "^1.1.5"

kind-of@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/kind-of/-/kind-of-4.0.0.tgz#20813df3d712928b207378691a45066fae72dd57"
  dependencies:
    is-buffer "^1.1.5"

kind-of@^5.0.0:
  version "5.1.0"
  resolved "https://registry.yarnpkg.com/kind-of/-/kind-of-5.1.0.tgz#729c91e2d857b7a419a1f9aa65685c4c33f5845d"

kind-of@^6.0.0, kind-of@^6.0.2:
  version "6.0.2"
  resolved "https://registry.yarnpkg.com/kind-of/-/kind-of-6.0.2.tgz#01146b36a6218e64e58f3a8d66de5d7fc6f6d051"

latest-version@^3.0.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/latest-version/-/latest-version-3.1.0.tgz#a205383fea322b33b5ae3b18abee0dc2f356ee15"
  dependencies:
    package-json "^4.0.0"

lcid@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/lcid/-/lcid-1.0.0.tgz#308accafa0bc483a3867b4b6f2b9506251d1b835"
  dependencies:
    invert-kv "^1.0.0"

lcid@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/lcid/-/lcid-2.0.0.tgz#6ef5d2df60e52f82eb228a4c373e8d1f397253cf"
  dependencies:
    invert-kv "^2.0.0"

less-loader@4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/less-loader/-/less-loader-4.1.0.tgz#2c1352c5b09a4f84101490274fd51674de41363e"
  dependencies:
    clone "^2.1.1"
    loader-utils "^1.1.0"
    pify "^3.0.0"

less-plugin-npm-import@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/less-plugin-npm-import/-/less-plugin-npm-import-2.1.0.tgz#823e6986c93318a98171ca858848b6bead55bf3e"
  dependencies:
    promise "~7.0.1"
    resolve "~1.1.6"

less@3.8.1:
  version "3.8.1"
  resolved "https://registry.yarnpkg.com/less/-/less-3.8.1.tgz#f31758598ef5a1930dd4caefa9e4340641e71e1d"
  dependencies:
    clone "^2.1.2"
  optionalDependencies:
    errno "^0.1.1"
    graceful-fs "^4.1.2"
    image-size "~0.5.0"
    mime "^1.4.1"
    mkdirp "^0.5.0"
    promise "^7.1.1"
    request "^2.83.0"
    source-map "~0.6.0"

less@^3.8.0:
  version "3.9.0"
  resolved "https://registry.yarnpkg.com/less/-/less-3.9.0.tgz#b7511c43f37cf57dc87dffd9883ec121289b1474"
  dependencies:
    clone "^2.1.2"
  optionalDependencies:
    errno "^0.1.1"
    graceful-fs "^4.1.2"
    image-size "~0.5.0"
    mime "^1.4.1"
    mkdirp "^0.5.0"
    promise "^7.1.1"
    request "^2.83.0"
    source-map "~0.6.0"

levn@~0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/levn/-/levn-0.3.0.tgz#3b09924edf9f083c0490fdd4c0bc4421e04764ee"
  dependencies:
    prelude-ls "~1.1.2"
    type-check "~0.3.2"

license-webpack-plugin@2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/license-webpack-plugin/-/license-webpack-plugin-2.0.2.tgz#9d34b521cb7fca8527945310b05be6ef0248b687"
  dependencies:
    webpack-sources "^1.2.0"

lie@~3.1.0:
  version "3.1.1"
  resolved "https://registry.yarnpkg.com/lie/-/lie-3.1.1.tgz#9a436b2cc7746ca59de7a41fa469b3efb76bd87e"
  dependencies:
    immediate "~3.0.5"

load-json-file@^1.0.0:
  version "1.1.0"
  resolved "http://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz#956905708d58b4bab4c2261b04f59f31c99374c0"
  dependencies:
    graceful-fs "^4.1.2"
    parse-json "^2.2.0"
    pify "^2.0.0"
    pinkie-promise "^2.0.0"
    strip-bom "^2.0.0"

load-json-file@^2.0.0:
  version "2.0.0"
  resolved "http://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz#7947e42149af80d696cbf797bcaabcfe1fe29ca8"
  dependencies:
    graceful-fs "^4.1.2"
    parse-json "^2.2.0"
    pify "^2.0.0"
    strip-bom "^3.0.0"

load-json-file@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/load-json-file/-/load-json-file-4.0.0.tgz#2f5f45ab91e33216234fd53adab668eb4ec0993b"
  dependencies:
    graceful-fs "^4.1.2"
    parse-json "^4.0.0"
    pify "^3.0.0"
    strip-bom "^3.0.0"

loader-runner@^2.3.0:
  version "2.3.1"
  resolved "https://registry.yarnpkg.com/loader-runner/-/loader-runner-2.3.1.tgz#026f12fe7c3115992896ac02ba022ba92971b979"

loader-utils@1.1.0, loader-utils@^1.0.1, loader-utils@^1.0.2, loader-utils@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/loader-utils/-/loader-utils-1.1.0.tgz#c98aef488bcceda2ffb5e2de646d6a754429f5cd"
  dependencies:
    big.js "^3.1.3"
    emojis-list "^2.0.0"
    json5 "^0.5.0"

locate-path@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/locate-path/-/locate-path-2.0.0.tgz#2b568b265eec944c6d9c0de9c3dbbbca0354cd8e"
  dependencies:
    p-locate "^2.0.0"
    path-exists "^3.0.0"

locate-path@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/locate-path/-/locate-path-3.0.0.tgz#dbec3b3ab759758071b58fe59fc41871af21400e"
  dependencies:
    p-locate "^3.0.0"
    path-exists "^3.0.0"

lodash.assign@^4.2.0:
  version "4.2.0"
  resolved "https://registry.yarnpkg.com/lodash.assign/-/lodash.assign-4.2.0.tgz#0d99f3ccd7a6d261d19bdaeb9245005d285808e7"

lodash.clonedeep@^4.3.2, lodash.clonedeep@^4.5.0:
  version "4.5.0"
  resolved "https://registry.yarnpkg.com/lodash.clonedeep/-/lodash.clonedeep-4.5.0.tgz#e23f3f9c4f8fbdde872529c1071857a086e5ccef"

lodash.debounce@^4.0.8:
  version "4.0.8"
  resolved "https://registry.yarnpkg.com/lodash.debounce/-/lodash.debounce-4.0.8.tgz#82d79bff30a67c4005ffd5e2515300ad9ca4d7af"

lodash.mergewith@^4.6.0:
  version "4.6.1"
  resolved "https://registry.yarnpkg.com/lodash.mergewith/-/lodash.mergewith-4.6.1.tgz#639057e726c3afbdb3e7d42741caa8d6e4335927"

lodash.tail@^4.1.1:
  version "4.1.1"
  resolved "https://registry.yarnpkg.com/lodash.tail/-/lodash.tail-4.1.1.tgz#d2333a36d9e7717c8ad2f7cacafec7c32b444664"

lodash@^4.0.0, lodash@^4.17.10, lodash@^4.17.4, lodash@^4.17.5, lodash@^4.3.0, lodash@^4.5.0, lodash@~4.17.10:
  version "4.17.11"
  resolved "https://registry.yarnpkg.com/lodash/-/lodash-4.17.11.tgz#b39ea6229ef607ecd89e2c8df12536891cac9b8d"

log4js@^3.0.0:
  version "3.0.6"
  resolved "https://registry.yarnpkg.com/log4js/-/log4js-3.0.6.tgz#e6caced94967eeeb9ce399f9f8682a4b2b28c8ff"
  dependencies:
    circular-json "^0.5.5"
    date-format "^1.2.0"
    debug "^3.1.0"
    rfdc "^1.1.2"
    streamroller "0.7.0"

loglevel@^1.4.1:
  version "1.6.1"
  resolved "https://registry.yarnpkg.com/loglevel/-/loglevel-1.6.1.tgz#e0fc95133b6ef276cdc8887cdaf24aa6f156f8fa"

loose-envify@^1.0.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/loose-envify/-/loose-envify-1.4.0.tgz#71ee51fa7be4caec1a63839f7e682d8132d30caf"
  dependencies:
    js-tokens "^3.0.0 || ^4.0.0"

loud-rejection@^1.0.0:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/loud-rejection/-/loud-rejection-1.6.0.tgz#5b46f80147edee578870f086d04821cf998e551f"
  dependencies:
    currently-unhandled "^0.4.1"
    signal-exit "^3.0.0"

lowercase-keys@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/lowercase-keys/-/lowercase-keys-1.0.1.tgz#6f9e30b47084d971a7c820ff15a6c5167b74c26f"

lru-cache@4.1.x, lru-cache@^4.0.1, lru-cache@^4.1.1, lru-cache@^4.1.2, lru-cache@^4.1.3:
  version "4.1.5"
  resolved "https://registry.yarnpkg.com/lru-cache/-/lru-cache-4.1.5.tgz#8bbe50ea85bed59bc9e33dcab8235ee9bcf443cd"
  dependencies:
    pseudomap "^1.0.2"
    yallist "^2.1.2"

magic-string@^0.25.0, magic-string@^0.25.1:
  version "0.25.1"
  resolved "https://registry.yarnpkg.com/magic-string/-/magic-string-0.25.1.tgz#b1c248b399cd7485da0fe7385c2fc7011843266e"
  dependencies:
    sourcemap-codec "^1.4.1"

make-dir@^1.0.0, make-dir@^1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/make-dir/-/make-dir-1.3.0.tgz#79c1033b80515bd6d24ec9933e860ca75ee27f0c"
  dependencies:
    pify "^3.0.0"

make-error@^1.1.1:
  version "1.3.5"
  resolved "https://registry.yarnpkg.com/make-error/-/make-error-1.3.5.tgz#efe4e81f6db28cadd605c70f29c831b58ef776c8"

make-fetch-happen@^4.0.1:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/make-fetch-happen/-/make-fetch-happen-4.0.1.tgz#141497cb878f243ba93136c83d8aba12c216c083"
  dependencies:
    agentkeepalive "^3.4.1"
    cacache "^11.0.1"
    http-cache-semantics "^3.8.1"
    http-proxy-agent "^2.1.0"
    https-proxy-agent "^2.2.1"
    lru-cache "^4.1.2"
    mississippi "^3.0.0"
    node-fetch-npm "^2.0.2"
    promise-retry "^1.1.1"
    socks-proxy-agent "^4.0.0"
    ssri "^6.0.0"

map-age-cleaner@^0.1.1:
  version "0.1.3"
  resolved "https://registry.yarnpkg.com/map-age-cleaner/-/map-age-cleaner-0.1.3.tgz#7d583a7306434c055fe474b0f45078e6e1b4b92a"
  dependencies:
    p-defer "^1.0.0"

map-cache@^0.2.2:
  version "0.2.2"
  resolved "https://registry.yarnpkg.com/map-cache/-/map-cache-0.2.2.tgz#c32abd0bd6525d9b051645bb4f26ac5dc98a0dbf"

map-obj@^1.0.0, map-obj@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/map-obj/-/map-obj-1.0.1.tgz#d933ceb9205d82bdcf4886f6742bdc2b4dea146d"

map-visit@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/map-visit/-/map-visit-1.0.0.tgz#ecdca8f13144e660f1b5bd41f12f3479d98dfb8f"
  dependencies:
    object-visit "^1.0.0"

math-random@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/math-random/-/math-random-1.0.1.tgz#8b3aac588b8a66e4975e3cdea67f7bb329601fac"

md5.js@^1.3.4:
  version "1.3.5"
  resolved "https://registry.yarnpkg.com/md5.js/-/md5.js-1.3.5.tgz#b5d07b8e3216e3e27cd728d72f70d1e6a342005f"
  dependencies:
    hash-base "^3.0.0"
    inherits "^2.0.1"
    safe-buffer "^5.1.2"

media-typer@0.3.0:
  version "0.3.0"
  resolved "http://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz#8710d7af0aa626f8fffa1ce00168545263255748"

mem@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/mem/-/mem-1.1.0.tgz#5edd52b485ca1d900fe64895505399a0dfa45f76"
  dependencies:
    mimic-fn "^1.0.0"

mem@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/mem/-/mem-4.0.0.tgz#6437690d9471678f6cc83659c00cbafcd6b0cdaf"
  dependencies:
    map-age-cleaner "^0.1.1"
    mimic-fn "^1.0.0"
    p-is-promise "^1.1.0"

memory-fs@^0.4.0, memory-fs@~0.4.1:
  version "0.4.1"
  resolved "https://registry.yarnpkg.com/memory-fs/-/memory-fs-0.4.1.tgz#3a9a20b8462523e447cfbc7e8bb80ed667bfc552"
  dependencies:
    errno "^0.1.3"
    readable-stream "^2.0.1"

meow@^3.7.0:
  version "3.7.0"
  resolved "http://registry.npmjs.org/meow/-/meow-3.7.0.tgz#72cb668b425228290abbfa856892587308a801fb"
  dependencies:
    camelcase-keys "^2.0.0"
    decamelize "^1.1.2"
    loud-rejection "^1.0.0"
    map-obj "^1.0.1"
    minimist "^1.1.3"
    normalize-package-data "^2.3.4"
    object-assign "^4.0.1"
    read-pkg-up "^1.0.1"
    redent "^1.0.0"
    trim-newlines "^1.0.0"

merge-descriptors@1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/merge-descriptors/-/merge-descriptors-1.0.1.tgz#b00aaa556dd8b44568150ec9d1b953f3f90cbb61"

methods@~1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/methods/-/methods-1.1.2.tgz#5529a4d67654134edcc5266656835b0f851afcee"

micromatch@^2.1.5, micromatch@^2.3.11:
  version "2.3.11"
  resolved "https://registry.yarnpkg.com/micromatch/-/micromatch-2.3.11.tgz#86677c97d1720b363431d04d0d15293bd38c1565"
  dependencies:
    arr-diff "^2.0.0"
    array-unique "^0.2.1"
    braces "^1.8.2"
    expand-brackets "^0.1.4"
    extglob "^0.3.1"
    filename-regex "^2.0.0"
    is-extglob "^1.0.0"
    is-glob "^2.0.1"
    kind-of "^3.0.2"
    normalize-path "^2.0.1"
    object.omit "^2.0.0"
    parse-glob "^3.0.4"
    regex-cache "^0.4.2"

micromatch@^3.1.10, micromatch@^3.1.4, micromatch@^3.1.8, micromatch@^3.1.9:
  version "3.1.10"
  resolved "https://registry.yarnpkg.com/micromatch/-/micromatch-3.1.10.tgz#70859bc95c9840952f359a068a3fc49f9ecfac23"
  dependencies:
    arr-diff "^4.0.0"
    array-unique "^0.3.2"
    braces "^2.3.1"
    define-property "^2.0.2"
    extend-shallow "^3.0.2"
    extglob "^2.0.4"
    fragment-cache "^0.2.1"
    kind-of "^6.0.2"
    nanomatch "^1.2.9"
    object.pick "^1.3.0"
    regex-not "^1.0.0"
    snapdragon "^0.8.1"
    to-regex "^3.0.2"

miller-rabin@^4.0.0:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/miller-rabin/-/miller-rabin-4.0.1.tgz#f080351c865b0dc562a8462966daa53543c78a4d"
  dependencies:
    bn.js "^4.0.0"
    brorand "^1.0.1"

"mime-db@>= 1.36.0 < 2", mime-db@~1.37.0:
  version "1.37.0"
  resolved "https://registry.yarnpkg.com/mime-db/-/mime-db-1.37.0.tgz#0b6a0ce6fdbe9576e25f1f2d2fde8830dc0ad0d8"

mime-types@^2.1.12, mime-types@~2.1.17, mime-types@~2.1.18, mime-types@~2.1.19:
  version "2.1.21"
  resolved "https://registry.yarnpkg.com/mime-types/-/mime-types-2.1.21.tgz#28995aa1ecb770742fe6ae7e58f9181c744b3f96"
  dependencies:
    mime-db "~1.37.0"

mime@1.4.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/mime/-/mime-1.4.1.tgz#121f9ebc49e3766f311a76e1fa1c8003c4b03aa6"

mime@^1.4.1:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/mime/-/mime-1.6.0.tgz#32cd9e5c64553bd58d19a568af452acff04981b1"

mime@^2.3.1:
  version "2.4.0"
  resolved "https://registry.yarnpkg.com/mime/-/mime-2.4.0.tgz#e051fd881358585f3279df333fe694da0bcffdd6"

mimic-fn@^1.0.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/mimic-fn/-/mimic-fn-1.2.0.tgz#820c86a39334640e99516928bd03fca88057d022"

mini-css-extract-plugin@0.4.4:
  version "0.4.4"
  resolved "https://registry.yarnpkg.com/mini-css-extract-plugin/-/mini-css-extract-plugin-0.4.4.tgz#c10410a004951bd3cedac1da69053940fccb625d"
  dependencies:
    loader-utils "^1.1.0"
    schema-utils "^1.0.0"
    webpack-sources "^1.1.0"

minimalistic-assert@^1.0.0, minimalistic-assert@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz#2e194de044626d4a10e7f7fbc00ce73e83e4d5c7"

minimalistic-crypto-utils@^1.0.0, minimalistic-crypto-utils@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz#f6c00c1c0b082246e5c4d99dfb8c7c083b2b582a"

"minimatch@2 || 3", minimatch@3.0.4, minimatch@^3.0.2, minimatch@^3.0.3, minimatch@^3.0.4, minimatch@~3.0.2:
  version "3.0.4"
  resolved "https://registry.yarnpkg.com/minimatch/-/minimatch-3.0.4.tgz#5166e286457f03306064be5497e8dbb0c3d32083"
  dependencies:
    brace-expansion "^1.1.7"

minimist@0.0.8:
  version "0.0.8"
  resolved "http://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz#857fcabfc3397d2625b8228262e86aa7a011b05d"

minimist@1.2.0, minimist@^1.1.3, minimist@^1.2.0:
  version "1.2.0"
  resolved "http://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz#a35008b20f41383eec1fb914f4cd5df79a264284"

minimist@~0.0.1:
  version "0.0.10"
  resolved "http://registry.npmjs.org/minimist/-/minimist-0.0.10.tgz#de3f98543dbf96082be48ad1a0c7cda836301dcf"

minipass@^2.2.1, minipass@^2.3.4, minipass@^2.3.5:
  version "2.3.5"
  resolved "https://registry.yarnpkg.com/minipass/-/minipass-2.3.5.tgz#cacebe492022497f656b0f0f51e2682a9ed2d848"
  dependencies:
    safe-buffer "^5.1.2"
    yallist "^3.0.0"

minizlib@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/minizlib/-/minizlib-1.1.1.tgz#6734acc045a46e61d596a43bb9d9cd326e19cc42"
  dependencies:
    minipass "^2.2.1"

mississippi@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/mississippi/-/mississippi-2.0.0.tgz#3442a508fafc28500486feea99409676e4ee5a6f"
  dependencies:
    concat-stream "^1.5.0"
    duplexify "^3.4.2"
    end-of-stream "^1.1.0"
    flush-write-stream "^1.0.0"
    from2 "^2.1.0"
    parallel-transform "^1.1.0"
    pump "^2.0.1"
    pumpify "^1.3.3"
    stream-each "^1.1.0"
    through2 "^2.0.0"

mississippi@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/mississippi/-/mississippi-3.0.0.tgz#ea0a3291f97e0b5e8776b363d5f0a12d94c67022"
  dependencies:
    concat-stream "^1.5.0"
    duplexify "^3.4.2"
    end-of-stream "^1.1.0"
    flush-write-stream "^1.0.0"
    from2 "^2.1.0"
    parallel-transform "^1.1.0"
    pump "^3.0.0"
    pumpify "^1.3.3"
    stream-each "^1.1.0"
    through2 "^2.0.0"

mixin-deep@^1.2.0:
  version "1.3.1"
  resolved "https://registry.yarnpkg.com/mixin-deep/-/mixin-deep-1.3.1.tgz#a49e7268dce1a0d9698e45326c5626df3543d0fe"
  dependencies:
    for-in "^1.0.2"
    is-extendable "^1.0.1"

mixin-object@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/mixin-object/-/mixin-object-2.0.1.tgz#4fb949441dab182540f1fe035ba60e1947a5e57e"
  dependencies:
    for-in "^0.1.3"
    is-extendable "^0.1.1"

mkdirp@0.5.x, "mkdirp@>=0.5 0", mkdirp@^0.5.0, mkdirp@^0.5.1, mkdirp@~0.5.0:
  version "0.5.1"
  resolved "http://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz#30057438eac6cf7f8c4767f38648d6697d75c903"
  dependencies:
    minimist "0.0.8"

move-concurrently@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/move-concurrently/-/move-concurrently-1.0.1.tgz#be2c005fda32e0b29af1f05d7c4b33214c701f92"
  dependencies:
    aproba "^1.1.1"
    copy-concurrently "^1.0.0"
    fs-write-stream-atomic "^1.0.8"
    mkdirp "^0.5.1"
    rimraf "^2.5.4"
    run-queue "^1.0.3"

ms@2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/ms/-/ms-2.0.0.tgz#5608aeadfc00be6c2901df5f9861788de0d597c8"

ms@^2.0.0, ms@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/ms/-/ms-2.1.1.tgz#30a5864eb3ebb0a66f2ebe6d727af06a09d86e0a"

multicast-dns-service-types@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/multicast-dns-service-types/-/multicast-dns-service-types-1.1.0.tgz#899f11d9686e5e05cb91b35d5f0e63b773cfc901"

multicast-dns@^6.0.1:
  version "6.2.3"
  resolved "https://registry.yarnpkg.com/multicast-dns/-/multicast-dns-6.2.3.tgz#a0ec7bd9055c4282f790c3c82f4e28db3b31b229"
  dependencies:
    dns-packet "^1.3.1"
    thunky "^1.0.2"

mute-stream@0.0.7:
  version "0.0.7"
  resolved "https://registry.yarnpkg.com/mute-stream/-/mute-stream-0.0.7.tgz#3075ce93bc21b8fab43e1bc4da7e8115ed1e7bab"

nan@^2.10.0, nan@^2.9.2:
  version "2.11.1"
  resolved "https://registry.yarnpkg.com/nan/-/nan-2.11.1.tgz#90e22bccb8ca57ea4cd37cc83d3819b52eea6766"

nanomatch@^1.2.9:
  version "1.2.13"
  resolved "https://registry.yarnpkg.com/nanomatch/-/nanomatch-1.2.13.tgz#b87a8aa4fc0de8fe6be88895b38983ff265bd119"
  dependencies:
    arr-diff "^4.0.0"
    array-unique "^0.3.2"
    define-property "^2.0.2"
    extend-shallow "^3.0.2"
    fragment-cache "^0.2.1"
    is-windows "^1.0.2"
    kind-of "^6.0.2"
    object.pick "^1.3.0"
    regex-not "^1.0.0"
    snapdragon "^0.8.1"
    to-regex "^3.0.1"

needle@^2.2.1:
  version "2.2.4"
  resolved "https://registry.yarnpkg.com/needle/-/needle-2.2.4.tgz#51931bff82533b1928b7d1d69e01f1b00ffd2a4e"
  dependencies:
    debug "^2.1.2"
    iconv-lite "^0.4.4"
    sax "^1.2.4"

negotiator@0.6.1:
  version "0.6.1"
  resolved "https://registry.yarnpkg.com/negotiator/-/negotiator-0.6.1.tgz#2b327184e8992101177b28563fb5e7102acd0ca9"

neo-async@^2.5.0:
  version "2.6.0"
  resolved "https://registry.yarnpkg.com/neo-async/-/neo-async-2.6.0.tgz#b9d15e4d71c6762908654b5183ed38b753340835"

ng-packagr@^4.2.0:
  version "4.4.5"
  resolved "https://registry.yarnpkg.com/ng-packagr/-/ng-packagr-4.4.5.tgz#8f87d4408e6e5d024a6eb7984f408057defe4fe4"
  dependencies:
    "@ngtools/json-schema" "^1.1.0"
    autoprefixer "^9.0.0"
    browserslist "^4.0.0"
    chalk "^2.3.1"
    chokidar "^2.0.3"
    clean-css "^4.1.11"
    commander "^2.12.0"
    fs-extra "^7.0.0"
    glob "^7.1.2"
    injection-js "^2.2.1"
    less "^3.8.0"
    less-plugin-npm-import "^2.1.0"
    node-sass "^4.9.3"
    node-sass-tilde-importer "^1.0.0"
    opencollective "^1.0.3"
    postcss "^7.0.0"
    postcss-url "^8.0.0"
    read-pkg-up "^4.0.0"
    rimraf "^2.6.1"
    rollup "^0.67.0"
    rollup-plugin-commonjs "^9.1.3"
    rollup-plugin-json "^3.1.0"
    rollup-plugin-node-resolve "^3.0.0"
    rollup-plugin-sourcemaps "^0.4.2"
    rxjs "^6.0.0"
    stylus "^0.54.5"
    uglify-js "^3.0.7"
    update-notifier "^2.3.0"

nice-try@^1.0.4:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/nice-try/-/nice-try-1.0.5.tgz#a3378a7696ce7d223e88fc9b764bd7ef1089e366"

node-fetch-npm@^2.0.2:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/node-fetch-npm/-/node-fetch-npm-2.0.2.tgz#7258c9046182dca345b4208eda918daf33697ff7"
  dependencies:
    encoding "^0.1.11"
    json-parse-better-errors "^1.0.0"
    safe-buffer "^5.1.1"

node-fetch@1.6.3:
  version "1.6.3"
  resolved "http://registry.npmjs.org/node-fetch/-/node-fetch-1.6.3.tgz#dc234edd6489982d58e8f0db4f695029abcd8c04"
  dependencies:
    encoding "^0.1.11"
    is-stream "^1.0.1"

node-forge@0.7.5:
  version "0.7.5"
  resolved "https://registry.yarnpkg.com/node-forge/-/node-forge-0.7.5.tgz#6c152c345ce11c52f465c2abd957e8639cd674df"

node-gyp@^3.8.0:
  version "3.8.0"
  resolved "https://registry.yarnpkg.com/node-gyp/-/node-gyp-3.8.0.tgz#540304261c330e80d0d5edce253a68cb3964218c"
  dependencies:
    fstream "^1.0.0"
    glob "^7.0.3"
    graceful-fs "^4.1.2"
    mkdirp "^0.5.0"
    nopt "2 || 3"
    npmlog "0 || 1 || 2 || 3 || 4"
    osenv "0"
    request "^2.87.0"
    rimraf "2"
    semver "~5.3.0"
    tar "^2.0.0"
    which "1"

node-libs-browser@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/node-libs-browser/-/node-libs-browser-2.1.0.tgz#5f94263d404f6e44767d726901fff05478d600df"
  dependencies:
    assert "^1.1.1"
    browserify-zlib "^0.2.0"
    buffer "^4.3.0"
    console-browserify "^1.1.0"
    constants-browserify "^1.0.0"
    crypto-browserify "^3.11.0"
    domain-browser "^1.1.1"
    events "^1.0.0"
    https-browserify "^1.0.0"
    os-browserify "^0.3.0"
    path-browserify "0.0.0"
    process "^0.11.10"
    punycode "^1.2.4"
    querystring-es3 "^0.2.0"
    readable-stream "^2.3.3"
    stream-browserify "^2.0.1"
    stream-http "^2.7.2"
    string_decoder "^1.0.0"
    timers-browserify "^2.0.4"
    tty-browserify "0.0.0"
    url "^0.11.0"
    util "^0.10.3"
    vm-browserify "0.0.4"

node-pre-gyp@^0.10.0:
  version "0.10.3"
  resolved "https://registry.yarnpkg.com/node-pre-gyp/-/node-pre-gyp-0.10.3.tgz#3070040716afdc778747b61b6887bf78880b80fc"
  dependencies:
    detect-libc "^1.0.2"
    mkdirp "^0.5.1"
    needle "^2.2.1"
    nopt "^4.0.1"
    npm-packlist "^1.1.6"
    npmlog "^4.0.2"
    rc "^1.2.7"
    rimraf "^2.6.1"
    semver "^5.3.0"
    tar "^4"

node-releases@^1.0.5:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/node-releases/-/node-releases-1.0.5.tgz#a641adcc968b039a27345d92ef10b093e5cbd41d"
  dependencies:
    semver "^5.3.0"

node-sass-tilde-importer@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/node-sass-tilde-importer/-/node-sass-tilde-importer-1.0.2.tgz#1a15105c153f648323b4347693fdb0f331bad1ce"
  dependencies:
    find-parent-dir "^0.3.0"

node-sass@4.10.0, node-sass@^4.9.3:
  version "4.10.0"
  resolved "https://registry.yarnpkg.com/node-sass/-/node-sass-4.10.0.tgz#dcc2b364c0913630945ccbf7a2bbf1f926effca4"
  dependencies:
    async-foreach "^0.1.3"
    chalk "^1.1.1"
    cross-spawn "^3.0.0"
    gaze "^1.0.0"
    get-stdin "^4.0.1"
    glob "^7.0.3"
    in-publish "^2.0.0"
    lodash.assign "^4.2.0"
    lodash.clonedeep "^4.3.2"
    lodash.mergewith "^4.6.0"
    meow "^3.7.0"
    mkdirp "^0.5.1"
    nan "^2.10.0"
    node-gyp "^3.8.0"
    npmlog "^4.0.0"
    request "^2.88.0"
    sass-graph "^2.2.4"
    stdout-stream "^1.4.0"
    "true-case-path" "^1.0.2"

"nopt@2 || 3", nopt@3.x:
  version "3.0.6"
  resolved "https://registry.yarnpkg.com/nopt/-/nopt-3.0.6.tgz#c6465dbf08abcd4db359317f79ac68a646b28ff9"
  dependencies:
    abbrev "1"

nopt@^4.0.1:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/nopt/-/nopt-4.0.1.tgz#d0d4685afd5415193c8c7505602d0d17cd64474d"
  dependencies:
    abbrev "1"
    osenv "^0.1.4"

normalize-package-data@^2.3.2, normalize-package-data@^2.3.4, normalize-package-data@^2.4.0:
  version "2.4.0"
  resolved "https://registry.yarnpkg.com/normalize-package-data/-/normalize-package-data-2.4.0.tgz#12f95a307d58352075a04907b84ac8be98ac012f"
  dependencies:
    hosted-git-info "^2.1.4"
    is-builtin-module "^1.0.0"
    semver "2 || 3 || 4 || 5"
    validate-npm-package-license "^3.0.1"

normalize-path@^2.0.0, normalize-path@^2.0.1, normalize-path@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/normalize-path/-/normalize-path-2.1.1.tgz#1ab28b556e198363a8c1a6f7e6fa20137fe6aed9"
  dependencies:
    remove-trailing-separator "^1.0.1"

normalize-range@^0.1.2:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/normalize-range/-/normalize-range-0.1.2.tgz#2d10c06bdfd312ea9777695a4d28439456b75942"

npm-bundled@^1.0.1:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/npm-bundled/-/npm-bundled-1.0.5.tgz#3c1732b7ba936b3a10325aef616467c0ccbcc979"

npm-package-arg@^6.0.0, npm-package-arg@^6.1.0:
  version "6.1.0"
  resolved "https://registry.yarnpkg.com/npm-package-arg/-/npm-package-arg-6.1.0.tgz#15ae1e2758a5027efb4c250554b85a737db7fcc1"
  dependencies:
    hosted-git-info "^2.6.0"
    osenv "^0.1.5"
    semver "^5.5.0"
    validate-npm-package-name "^3.0.0"

npm-packlist@^1.1.12, npm-packlist@^1.1.6:
  version "1.1.12"
  resolved "https://registry.yarnpkg.com/npm-packlist/-/npm-packlist-1.1.12.tgz#22bde2ebc12e72ca482abd67afc51eb49377243a"
  dependencies:
    ignore-walk "^3.0.1"
    npm-bundled "^1.0.1"

npm-pick-manifest@^2.1.0:
  version "2.2.3"
  resolved "https://registry.yarnpkg.com/npm-pick-manifest/-/npm-pick-manifest-2.2.3.tgz#32111d2a9562638bb2c8f2bf27f7f3092c8fae40"
  dependencies:
    figgy-pudding "^3.5.1"
    npm-package-arg "^6.0.0"
    semver "^5.4.1"

npm-registry-fetch@^3.8.0:
  version "3.8.0"
  resolved "https://registry.yarnpkg.com/npm-registry-fetch/-/npm-registry-fetch-3.8.0.tgz#aa7d9a7c92aff94f48dba0984bdef4bd131c88cc"
  dependencies:
    JSONStream "^1.3.4"
    bluebird "^3.5.1"
    figgy-pudding "^3.4.1"
    lru-cache "^4.1.3"
    make-fetch-happen "^4.0.1"
    npm-package-arg "^6.1.0"

npm-run-path@^2.0.0:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/npm-run-path/-/npm-run-path-2.0.2.tgz#35a9232dfa35d7067b4cb2ddf2357b1871536c5f"
  dependencies:
    path-key "^2.0.0"

"npmlog@0 || 1 || 2 || 3 || 4", npmlog@^4.0.0, npmlog@^4.0.2:
  version "4.1.2"
  resolved "https://registry.yarnpkg.com/npmlog/-/npmlog-4.1.2.tgz#08a7f2a8bf734604779a9efa4ad5cc717abb954b"
  dependencies:
    are-we-there-yet "~1.1.2"
    console-control-strings "~1.1.0"
    gauge "~2.7.3"
    set-blocking "~2.0.0"

null-check@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/null-check/-/null-check-1.0.0.tgz#977dffd7176012b9ec30d2a39db5cf72a0439edd"

num2fraction@^1.2.2:
  version "1.2.2"
  resolved "https://registry.yarnpkg.com/num2fraction/-/num2fraction-1.2.2.tgz#6f682b6a027a4e9ddfa4564cd2589d1d4e669ede"

number-is-nan@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/number-is-nan/-/number-is-nan-1.0.1.tgz#097b602b53422a522c1afb8790318336941a011d"

"nwmatcher@>= 1.3.7 < 2.0.0":
  version "1.4.4"
  resolved "https://registry.yarnpkg.com/nwmatcher/-/nwmatcher-1.4.4.tgz#2285631f34a95f0d0395cd900c96ed39b58f346e"

oauth-sign@~0.9.0:
  version "0.9.0"
  resolved "https://registry.yarnpkg.com/oauth-sign/-/oauth-sign-0.9.0.tgz#47a7b016baa68b5fa0ecf3dee08a85c679ac6455"

object-assign@^4.0.1, object-assign@^4.1.0:
  version "4.1.1"
  resolved "https://registry.yarnpkg.com/object-assign/-/object-assign-4.1.1.tgz#2109adc7965887cfc05cbbd442cac8bfbb360863"

object-component@0.0.3:
  version "0.0.3"
  resolved "https://registry.yarnpkg.com/object-component/-/object-component-0.0.3.tgz#f0c69aa50efc95b866c186f400a33769cb2f1291"

object-copy@^0.1.0:
  version "0.1.0"
  resolved "https://registry.yarnpkg.com/object-copy/-/object-copy-0.1.0.tgz#7e7d858b781bd7c991a41ba975ed3812754e998c"
  dependencies:
    copy-descriptor "^0.1.0"
    define-property "^0.2.5"
    kind-of "^3.0.3"

object-visit@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/object-visit/-/object-visit-1.0.1.tgz#f79c4493af0c5377b59fe39d395e41042dd045bb"
  dependencies:
    isobject "^3.0.0"

object.omit@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/object.omit/-/object.omit-2.0.1.tgz#1a9c744829f39dbb858c76ca3579ae2a54ebd1fa"
  dependencies:
    for-own "^0.1.4"
    is-extendable "^0.1.1"

object.pick@^1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/object.pick/-/object.pick-1.3.0.tgz#87a10ac4c1694bd2e1cbf53591a66141fb5dd747"
  dependencies:
    isobject "^3.0.1"

obuf@^1.0.0, obuf@^1.1.1:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/obuf/-/obuf-1.1.2.tgz#09bea3343d41859ebd446292d11c9d4db619084e"

omggif@1.0.7:
  version "1.0.7"
  resolved "https://registry.yarnpkg.com/omggif/-/omggif-1.0.7.tgz#59d2eecb0263de84635b3feb887c0c9973f1e49d"

on-finished@~2.3.0:
  version "2.3.0"
  resolved "https://registry.yarnpkg.com/on-finished/-/on-finished-2.3.0.tgz#20f1336481b083cd75337992a16971aa2d906947"
  dependencies:
    ee-first "1.1.1"

on-headers@~1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/on-headers/-/on-headers-1.0.1.tgz#928f5d0f470d49342651ea6794b0857c100693f7"

once@1.x, once@^1.3.0, once@^1.3.1, once@^1.4.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/once/-/once-1.4.0.tgz#583b1aa775961d4b113ac17d9c50baef9dd76bd1"
  dependencies:
    wrappy "1"

onetime@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/onetime/-/onetime-2.0.1.tgz#067428230fd67443b2794b22bba528b6867962d4"
  dependencies:
    mimic-fn "^1.0.0"

opencollective@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/opencollective/-/opencollective-1.0.3.tgz#aee6372bc28144583690c3ca8daecfc120dd0ef1"
  dependencies:
    babel-polyfill "6.23.0"
    chalk "1.1.3"
    inquirer "3.0.6"
    minimist "1.2.0"
    node-fetch "1.6.3"
    opn "4.0.2"

opn@4.0.2:
  version "4.0.2"
  resolved "http://registry.npmjs.org/opn/-/opn-4.0.2.tgz#7abc22e644dff63b0a96d5ab7f2790c0f01abc95"
  dependencies:
    object-assign "^4.0.1"
    pinkie-promise "^2.0.0"

opn@5.3.0:
  version "5.3.0"
  resolved "http://registry.npmjs.org/opn/-/opn-5.3.0.tgz#64871565c863875f052cfdf53d3e3cb5adb53b1c"
  dependencies:
    is-wsl "^1.1.0"

opn@^5.1.0:
  version "5.4.0"
  resolved "https://registry.yarnpkg.com/opn/-/opn-5.4.0.tgz#cb545e7aab78562beb11aa3bfabc7042e1761035"
  dependencies:
    is-wsl "^1.1.0"

optimist@^0.6.1, optimist@~0.6.0:
  version "0.6.1"
  resolved "https://registry.yarnpkg.com/optimist/-/optimist-0.6.1.tgz#da3ea74686fa21a19a111c326e90eb15a0196686"
  dependencies:
    minimist "~0.0.1"
    wordwrap "~0.0.2"

optionator@^0.8.1:
  version "0.8.2"
  resolved "https://registry.yarnpkg.com/optionator/-/optionator-0.8.2.tgz#364c5e409d3f4d6301d6c0b4c05bba50180aeb64"
  dependencies:
    deep-is "~0.1.3"
    fast-levenshtein "~2.0.4"
    levn "~0.3.0"
    prelude-ls "~1.1.2"
    type-check "~0.3.2"
    wordwrap "~1.0.0"

original@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/original/-/original-1.0.2.tgz#e442a61cffe1c5fd20a65f3261c26663b303f25f"
  dependencies:
    url-parse "^1.4.3"

os-browserify@^0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/os-browserify/-/os-browserify-0.3.0.tgz#854373c7f5c2315914fc9bfc6bd8238fdda1ec27"

os-homedir@^1.0.0:
  version "1.0.2"
  resolved "http://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz#ffbc4988336e0e833de0c168c7ef152121aa7fb3"

os-locale@^1.4.0:
  version "1.4.0"
  resolved "http://registry.npmjs.org/os-locale/-/os-locale-1.4.0.tgz#20f9f17ae29ed345e8bde583b13d2009803c14d9"
  dependencies:
    lcid "^1.0.0"

os-locale@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/os-locale/-/os-locale-2.1.0.tgz#42bc2900a6b5b8bd17376c8e882b65afccf24bf2"
  dependencies:
    execa "^0.7.0"
    lcid "^1.0.0"
    mem "^1.1.0"

os-locale@^3.0.0:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/os-locale/-/os-locale-3.0.1.tgz#3b014fbf01d87f60a1e5348d80fe870dc82c4620"
  dependencies:
    execa "^0.10.0"
    lcid "^2.0.0"
    mem "^4.0.0"

os-tmpdir@^1.0.0, os-tmpdir@~1.0.1, os-tmpdir@~1.0.2:
  version "1.0.2"
  resolved "http://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz#bbe67406c79aa85c5cfec766fe5734555dfa1274"

osenv@0, osenv@^0.1.4, osenv@^0.1.5:
  version "0.1.5"
  resolved "https://registry.yarnpkg.com/osenv/-/osenv-0.1.5.tgz#85cdfafaeb28e8677f416e287592b5f3f49ea410"
  dependencies:
    os-homedir "^1.0.0"
    os-tmpdir "^1.0.0"

p-defer@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/p-defer/-/p-defer-1.0.0.tgz#9f6eb182f6c9aa8cd743004a7d4f96b196b0fb0c"

p-finally@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/p-finally/-/p-finally-1.0.0.tgz#3fbcfb15b899a44123b34b6dcc18b724336a2cae"

p-is-promise@^1.1.0:
  version "1.1.0"
  resolved "http://registry.npmjs.org/p-is-promise/-/p-is-promise-1.1.0.tgz#9c9456989e9f6588017b0434d56097675c3da05e"

p-limit@^1.0.0, p-limit@^1.1.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/p-limit/-/p-limit-1.3.0.tgz#b86bd5f0c25690911c7590fcbfc2010d54b3ccb8"
  dependencies:
    p-try "^1.0.0"

p-limit@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/p-limit/-/p-limit-2.0.0.tgz#e624ed54ee8c460a778b3c9f3670496ff8a57aec"
  dependencies:
    p-try "^2.0.0"

p-locate@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/p-locate/-/p-locate-2.0.0.tgz#20a0103b222a70c8fd39cc2e580680f3dde5ec43"
  dependencies:
    p-limit "^1.1.0"

p-locate@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/p-locate/-/p-locate-3.0.0.tgz#322d69a05c0264b25997d9f40cd8a891ab0064a4"
  dependencies:
    p-limit "^2.0.0"

p-map@^1.1.1:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/p-map/-/p-map-1.2.0.tgz#e4e94f311eabbc8633a1e79908165fca26241b6b"

p-try@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/p-try/-/p-try-1.0.0.tgz#cbc79cdbaf8fd4228e13f621f2b1a237c1b207b3"

p-try@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/p-try/-/p-try-2.0.0.tgz#85080bb87c64688fa47996fe8f7dfbe8211760b1"

package-json@^4.0.0:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/package-json/-/package-json-4.0.1.tgz#8869a0401253661c4c4ca3da6c2121ed555f5eed"
  dependencies:
    got "^6.7.1"
    registry-auth-token "^3.0.1"
    registry-url "^3.0.3"
    semver "^5.1.0"

pacote@9.1.1:
  version "9.1.1"
  resolved "https://registry.yarnpkg.com/pacote/-/pacote-9.1.1.tgz#25091f75a25021de8be8d34cc6408728fca3579b"
  dependencies:
    bluebird "^3.5.2"
    cacache "^11.2.0"
    figgy-pudding "^3.5.1"
    get-stream "^4.1.0"
    glob "^7.1.3"
    lru-cache "^4.1.3"
    make-fetch-happen "^4.0.1"
    minimatch "^3.0.4"
    minipass "^2.3.5"
    mississippi "^3.0.0"
    mkdirp "^0.5.1"
    normalize-package-data "^2.4.0"
    npm-package-arg "^6.1.0"
    npm-packlist "^1.1.12"
    npm-pick-manifest "^2.1.0"
    npm-registry-fetch "^3.8.0"
    osenv "^0.1.5"
    promise-inflight "^1.0.1"
    promise-retry "^1.1.1"
    protoduck "^5.0.1"
    rimraf "^2.6.2"
    safe-buffer "^5.1.2"
    semver "^5.6.0"
    ssri "^6.0.1"
    tar "^4.4.6"
    unique-filename "^1.1.1"
    which "^1.3.1"

pako@~1.0.2, pako@~1.0.5:
  version "1.0.7"
  resolved "https://registry.yarnpkg.com/pako/-/pako-1.0.7.tgz#2473439021b57f1516c82f58be7275ad8ef1bb27"

parallel-transform@^1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/parallel-transform/-/parallel-transform-1.1.0.tgz#d410f065b05da23081fcd10f28854c29bda33b06"
  dependencies:
    cyclist "~0.2.2"
    inherits "^2.0.3"
    readable-stream "^2.1.5"

parse-asn1@^5.0.0:
  version "5.1.1"
  resolved "http://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.1.tgz#f6bf293818332bd0dab54efb16087724745e6ca8"
  dependencies:
    asn1.js "^4.0.0"
    browserify-aes "^1.0.0"
    create-hash "^1.1.0"
    evp_bytestokey "^1.0.0"
    pbkdf2 "^3.0.3"

parse-glob@^3.0.4:
  version "3.0.4"
  resolved "https://registry.yarnpkg.com/parse-glob/-/parse-glob-3.0.4.tgz#b2c376cfb11f35513badd173ef0bb6e3a388391c"
  dependencies:
    glob-base "^0.3.0"
    is-dotfile "^1.0.0"
    is-extglob "^1.0.0"
    is-glob "^2.0.0"

parse-json@^2.2.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/parse-json/-/parse-json-2.2.0.tgz#f480f40434ef80741f8469099f8dea18f55a4dc9"
  dependencies:
    error-ex "^1.2.0"

parse-json@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/parse-json/-/parse-json-4.0.0.tgz#be35f5425be1f7f6c747184f98a788cb99477ee0"
  dependencies:
    error-ex "^1.3.1"
    json-parse-better-errors "^1.0.1"

parse5@4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/parse5/-/parse5-4.0.0.tgz#6d78656e3da8d78b4ec0b906f7c08ef1dfe3f608"

parse5@^1.5.1:
  version "1.5.1"
  resolved "https://registry.yarnpkg.com/parse5/-/parse5-1.5.1.tgz#9b7f3b0de32be78dc2401b17573ccaf0f6f59d94"

parse5@^5.0.0:
  version "5.1.0"
  resolved "https://registry.yarnpkg.com/parse5/-/parse5-5.1.0.tgz#c59341c9723f414c452975564c7c00a68d58acd2"

parseqs@0.0.5:
  version "0.0.5"
  resolved "https://registry.yarnpkg.com/parseqs/-/parseqs-0.0.5.tgz#d5208a3738e46766e291ba2ea173684921a8b89d"
  dependencies:
    better-assert "~1.0.0"

parseuri@0.0.5:
  version "0.0.5"
  resolved "https://registry.yarnpkg.com/parseuri/-/parseuri-0.0.5.tgz#80204a50d4dbb779bfdc6ebe2778d90e4bce320a"
  dependencies:
    better-assert "~1.0.0"

parseurl@~1.3.2:
  version "1.3.2"
  resolved "https://registry.yarnpkg.com/parseurl/-/parseurl-1.3.2.tgz#fc289d4ed8993119460c156253262cdc8de65bf3"

pascalcase@^0.1.1:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/pascalcase/-/pascalcase-0.1.1.tgz#b363e55e8006ca6fe21784d2db22bd15d7917f14"

path-browserify@0.0.0:
  version "0.0.0"
  resolved "https://registry.yarnpkg.com/path-browserify/-/path-browserify-0.0.0.tgz#a0b870729aae214005b7d5032ec2cbbb0fb4451a"

path-dirname@^1.0.0:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/path-dirname/-/path-dirname-1.0.2.tgz#cc33d24d525e099a5388c0336c6e32b9160609e0"

path-exists@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/path-exists/-/path-exists-2.1.0.tgz#0feb6c64f0fc518d9a754dd5efb62c7022761f4b"
  dependencies:
    pinkie-promise "^2.0.0"

path-exists@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/path-exists/-/path-exists-3.0.0.tgz#ce0ebeaa5f78cb18925ea7d810d7b59b010fd515"

path-is-absolute@^1.0.0:
  version "1.0.1"
  resolved "http://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz#174b9268735534ffbc7ace6bf53a5a9e1b5c5f5f"

path-is-inside@^1.0.1:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/path-is-inside/-/path-is-inside-1.0.2.tgz#365417dede44430d1c11af61027facf074bdfc53"

path-key@^2.0.0, path-key@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/path-key/-/path-key-2.0.1.tgz#411cadb574c5a140d3a4b1910d40d80cc9f40b40"

path-parse@^1.0.5:
  version "1.0.6"
  resolved "https://registry.yarnpkg.com/path-parse/-/path-parse-1.0.6.tgz#d62dbb5679405d72c4737ec58600e9ddcf06d24c"

path-to-regexp@0.1.7:
  version "0.1.7"
  resolved "https://registry.yarnpkg.com/path-to-regexp/-/path-to-regexp-0.1.7.tgz#df604178005f522f15eb4490e7247a1bfaa67f8c"

path-type@^1.0.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/path-type/-/path-type-1.1.0.tgz#59c44f7ee491da704da415da5a4070ba4f8fe441"
  dependencies:
    graceful-fs "^4.1.2"
    pify "^2.0.0"
    pinkie-promise "^2.0.0"

path-type@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/path-type/-/path-type-2.0.0.tgz#f012ccb8415b7096fc2daa1054c3d72389594c73"
  dependencies:
    pify "^2.0.0"

path-type@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/path-type/-/path-type-3.0.0.tgz#cef31dc8e0a1a3bb0d105c0cd97cf3bf47f4e36f"
  dependencies:
    pify "^3.0.0"

pbkdf2@^3.0.3:
  version "3.0.17"
  resolved "https://registry.yarnpkg.com/pbkdf2/-/pbkdf2-3.0.17.tgz#976c206530617b14ebb32114239f7b09336e93a6"
  dependencies:
    create-hash "^1.1.2"
    create-hmac "^1.1.4"
    ripemd160 "^2.0.1"
    safe-buffer "^5.0.1"
    sha.js "^2.4.8"

performance-now@^2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/performance-now/-/performance-now-2.1.0.tgz#6309f4e0e5fa913ec1c69307ae364b4b377c9e7b"

pify@^2.0.0, pify@^2.3.0:
  version "2.3.0"
  resolved "http://registry.npmjs.org/pify/-/pify-2.3.0.tgz#ed141a6ac043a849ea588498e7dca8b15330e90c"

pify@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/pify/-/pify-3.0.0.tgz#e5a4acd2c101fdf3d9a4d07f0dbc4db49dd28176"

pinkie-promise@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/pinkie-promise/-/pinkie-promise-2.0.1.tgz#2135d6dfa7a358c069ac9b178776288228450ffa"
  dependencies:
    pinkie "^2.0.0"

pinkie@^2.0.0:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/pinkie/-/pinkie-2.0.4.tgz#72556b80cfa0d48a974e80e77248e80ed4f7f870"

pkg-dir@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/pkg-dir/-/pkg-dir-2.0.0.tgz#f6d5d1109e19d63edf428e0bd57e12777615334b"
  dependencies:
    find-up "^2.1.0"

pkg-dir@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/pkg-dir/-/pkg-dir-3.0.0.tgz#2749020f239ed990881b1f71210d51eb6523bea3"
  dependencies:
    find-up "^3.0.0"

portfinder@1.0.17:
  version "1.0.17"
  resolved "https://registry.yarnpkg.com/portfinder/-/portfinder-1.0.17.tgz#a8a1691143e46c4735edefcf4fbcccedad26456a"
  dependencies:
    async "^1.5.2"
    debug "^2.2.0"
    mkdirp "0.5.x"

portfinder@^1.0.9:
  version "1.0.20"
  resolved "https://registry.yarnpkg.com/portfinder/-/portfinder-1.0.20.tgz#bea68632e54b2e13ab7b0c4775e9b41bf270e44a"
  dependencies:
    async "^1.5.2"
    debug "^2.2.0"
    mkdirp "0.5.x"

posix-character-classes@^0.1.0:
  version "0.1.1"
  resolved "https://registry.yarnpkg.com/posix-character-classes/-/posix-character-classes-0.1.1.tgz#01eac0fe3b5af71a2a6c02feabb8c1fef7e00eab"

postcss-import@12.0.0:
  version "12.0.0"
  resolved "https://registry.yarnpkg.com/postcss-import/-/postcss-import-12.0.0.tgz#149f96a4ef0b27525c419784be8517ebd17e92c5"
  dependencies:
    postcss "^7.0.1"
    postcss-value-parser "^3.2.3"
    read-cache "^1.0.0"
    resolve "^1.1.7"

postcss-load-config@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/postcss-load-config/-/postcss-load-config-2.0.0.tgz#f1312ddbf5912cd747177083c5ef7a19d62ee484"
  dependencies:
    cosmiconfig "^4.0.0"
    import-cwd "^2.0.0"

postcss-loader@3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/postcss-loader/-/postcss-loader-3.0.0.tgz#6b97943e47c72d845fa9e03f273773d4e8dd6c2d"
  dependencies:
    loader-utils "^1.1.0"
    postcss "^7.0.0"
    postcss-load-config "^2.0.0"
    schema-utils "^1.0.0"

postcss-url@^8.0.0:
  version "8.0.0"
  resolved "https://registry.yarnpkg.com/postcss-url/-/postcss-url-8.0.0.tgz#7b10059bd12929cdbb1971c60f61a0e5af86b4ca"
  dependencies:
    mime "^2.3.1"
    minimatch "^3.0.4"
    mkdirp "^0.5.0"
    postcss "^7.0.2"
    xxhashjs "^0.2.1"

postcss-value-parser@^3.2.3, postcss-value-parser@^3.3.1:
  version "3.3.1"
  resolved "https://registry.yarnpkg.com/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz#9ff822547e2893213cf1c30efa51ac5fd1ba8281"

postcss@7.0.5:
  version "7.0.5"
  resolved "https://registry.yarnpkg.com/postcss/-/postcss-7.0.5.tgz#70e6443e36a6d520b0fd4e7593fcca3635ee9f55"
  dependencies:
    chalk "^2.4.1"
    source-map "^0.6.1"
    supports-color "^5.5.0"

postcss@^7.0.0, postcss@^7.0.1, postcss@^7.0.2, postcss@^7.0.5, postcss@^7.0.6:
  version "7.0.6"
  resolved "https://registry.yarnpkg.com/postcss/-/postcss-7.0.6.tgz#6dcaa1e999cdd4a255dcd7d4d9547f4ca010cdc2"
  dependencies:
    chalk "^2.4.1"
    source-map "^0.6.1"
    supports-color "^5.5.0"

prelude-ls@~1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/prelude-ls/-/prelude-ls-1.1.2.tgz#21932a549f5e52ffd9a827f570e04be62a97da54"

prepend-http@^1.0.1:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/prepend-http/-/prepend-http-1.0.4.tgz#d4f4562b0ce3696e41ac52d0e002e57a635dc6dc"

preserve@^0.2.0:
  version "0.2.0"
  resolved "https://registry.yarnpkg.com/preserve/-/preserve-0.2.0.tgz#815ed1f6ebc65926f865b310c0713bcb3315ce4b"

process-nextick-args@~1.0.6:
  version "1.0.7"
  resolved "https://registry.yarnpkg.com/process-nextick-args/-/process-nextick-args-1.0.7.tgz#150e20b756590ad3f91093f25a4f2ad8bff30ba3"

process-nextick-args@~2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/process-nextick-args/-/process-nextick-args-2.0.0.tgz#a37d732f4271b4ab1ad070d35508e8290788ffaa"

process@^0.11.10:
  version "0.11.10"
  resolved "https://registry.yarnpkg.com/process/-/process-0.11.10.tgz#7332300e840161bda3e69a1d1d91a7d4bc16f182"

promise-inflight@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/promise-inflight/-/promise-inflight-1.0.1.tgz#98472870bf228132fcbdd868129bad12c3c029e3"

promise-retry@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/promise-retry/-/promise-retry-1.1.1.tgz#6739e968e3051da20ce6497fb2b50f6911df3d6d"
  dependencies:
    err-code "^1.0.0"
    retry "^0.10.0"

promise@^7.1.1:
  version "7.3.1"
  resolved "https://registry.yarnpkg.com/promise/-/promise-7.3.1.tgz#064b72602b18f90f29192b8b1bc418ffd1ebd3bf"
  dependencies:
    asap "~2.0.3"

promise@~7.0.1:
  version "7.0.4"
  resolved "http://registry.npmjs.org/promise/-/promise-7.0.4.tgz#363e84a4c36c8356b890fed62c91ce85d02ed539"
  dependencies:
    asap "~2.0.3"

protoduck@^5.0.1:
  version "5.0.1"
  resolved "https://registry.yarnpkg.com/protoduck/-/protoduck-5.0.1.tgz#03c3659ca18007b69a50fd82a7ebcc516261151f"
  dependencies:
    genfun "^5.0.0"

protractor@~5.4.0:
  version "5.4.1"
  resolved "https://registry.yarnpkg.com/protractor/-/protractor-5.4.1.tgz#011a99e38df7aa45d22455b889ffbb13a6ce0bd9"
  dependencies:
    "@types/node" "^6.0.46"
    "@types/q" "^0.0.32"
    "@types/selenium-webdriver" "^3.0.0"
    blocking-proxy "^1.0.0"
    browserstack "^1.5.1"
    chalk "^1.1.3"
    glob "^7.0.3"
    jasmine "2.8.0"
    jasminewd2 "^2.1.0"
    optimist "~0.6.0"
    q "1.4.1"
    saucelabs "^1.5.0"
    selenium-webdriver "3.6.0"
    source-map-support "~0.4.0"
    webdriver-js-extender "2.1.0"
    webdriver-manager "^12.0.6"

proxy-addr@~2.0.4:
  version "2.0.4"
  resolved "https://registry.yarnpkg.com/proxy-addr/-/proxy-addr-2.0.4.tgz#ecfc733bf22ff8c6f407fa275327b9ab67e48b93"
  dependencies:
    forwarded "~0.1.2"
    ipaddr.js "1.8.0"

prr@~1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/prr/-/prr-1.0.1.tgz#d3fc114ba06995a45ec6893f484ceb1d78f5f476"

pseudomap@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/pseudomap/-/pseudomap-1.0.2.tgz#f052a28da70e618917ef0a8ac34c1ae5a68286b3"

psl@^1.1.24, psl@^1.1.28:
  version "1.1.29"
  resolved "https://registry.yarnpkg.com/psl/-/psl-1.1.29.tgz#60f580d360170bb722a797cc704411e6da850c67"

public-encrypt@^4.0.0:
  version "4.0.3"
  resolved "https://registry.yarnpkg.com/public-encrypt/-/public-encrypt-4.0.3.tgz#4fcc9d77a07e48ba7527e7cbe0de33d0701331e0"
  dependencies:
    bn.js "^4.1.0"
    browserify-rsa "^4.0.0"
    create-hash "^1.1.0"
    parse-asn1 "^5.0.0"
    randombytes "^2.0.1"
    safe-buffer "^5.1.2"

pump@^2.0.0, pump@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/pump/-/pump-2.0.1.tgz#12399add6e4cf7526d973cbc8b5ce2e2908b3909"
  dependencies:
    end-of-stream "^1.1.0"
    once "^1.3.1"

pump@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/pump/-/pump-3.0.0.tgz#b4a2116815bde2f4e1ea602354e8c75565107a64"
  dependencies:
    end-of-stream "^1.1.0"
    once "^1.3.1"

pumpify@^1.3.3:
  version "1.5.1"
  resolved "https://registry.yarnpkg.com/pumpify/-/pumpify-1.5.1.tgz#36513be246ab27570b1a374a5ce278bfd74370ce"
  dependencies:
    duplexify "^3.6.0"
    inherits "^2.0.3"
    pump "^2.0.0"

punycode@1.3.2:
  version "1.3.2"
  resolved "https://registry.yarnpkg.com/punycode/-/punycode-1.3.2.tgz#9653a036fb7c1ee42342f2325cceefea3926c48d"

punycode@^1.2.4, punycode@^1.4.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/punycode/-/punycode-1.4.1.tgz#c0d5a63b2718800ad8e1eb0fa5269c84dd41845e"

punycode@^2.1.0, punycode@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/punycode/-/punycode-2.1.1.tgz#b58b010ac40c22c5657616c8d2c2c02c7bf479ec"

q@1.4.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/q/-/q-1.4.1.tgz#55705bcd93c5f3673530c2c2cbc0c2b3addc286e"

q@^1.4.1:
  version "1.5.1"
  resolved "https://registry.yarnpkg.com/q/-/q-1.5.1.tgz#7e32f75b41381291d04611f1bf14109ac00651d7"

qjobs@^1.1.4:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/qjobs/-/qjobs-1.2.0.tgz#c45e9c61800bd087ef88d7e256423bdd49e5d071"

qs@6.5.2, qs@~6.5.2:
  version "6.5.2"
  resolved "https://registry.yarnpkg.com/qs/-/qs-6.5.2.tgz#cb3ae806e8740444584ef154ce8ee98d403f3e36"

querystring-es3@^0.2.0:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/querystring-es3/-/querystring-es3-0.2.1.tgz#9ec61f79049875707d69414596fd907a4d711e73"

querystring@0.2.0:
  version "0.2.0"
  resolved "https://registry.yarnpkg.com/querystring/-/querystring-0.2.0.tgz#b209849203bb25df820da756e747005878521620"

querystringify@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/querystringify/-/querystringify-2.1.0.tgz#7ded8dfbf7879dcc60d0a644ac6754b283ad17ef"

randomatic@^3.0.0:
  version "3.1.1"
  resolved "https://registry.yarnpkg.com/randomatic/-/randomatic-3.1.1.tgz#b776efc59375984e36c537b2f51a1f0aff0da1ed"
  dependencies:
    is-number "^4.0.0"
    kind-of "^6.0.0"
    math-random "^1.0.1"

randombytes@^2.0.0, randombytes@^2.0.1, randombytes@^2.0.5:
  version "2.0.6"
  resolved "https://registry.yarnpkg.com/randombytes/-/randombytes-2.0.6.tgz#d302c522948588848a8d300c932b44c24231da80"
  dependencies:
    safe-buffer "^5.1.0"

randomfill@^1.0.3:
  version "1.0.4"
  resolved "https://registry.yarnpkg.com/randomfill/-/randomfill-1.0.4.tgz#c92196fc86ab42be983f1bf31778224931d61458"
  dependencies:
    randombytes "^2.0.5"
    safe-buffer "^5.1.0"

range-parser@^1.0.3, range-parser@^1.2.0, range-parser@~1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/range-parser/-/range-parser-1.2.0.tgz#f49be6b487894ddc40dcc94a322f611092e00d5e"

raw-body@2.3.3:
  version "2.3.3"
  resolved "https://registry.yarnpkg.com/raw-body/-/raw-body-2.3.3.tgz#1b324ece6b5706e153855bc1148c65bb7f6ea0c3"
  dependencies:
    bytes "3.0.0"
    http-errors "1.6.3"
    iconv-lite "0.4.23"
    unpipe "1.0.0"

raw-loader@0.5.1:
  version "0.5.1"
  resolved "https://registry.yarnpkg.com/raw-loader/-/raw-loader-0.5.1.tgz#0c3d0beaed8a01c966d9787bf778281252a979aa"

rc@^1.0.1, rc@^1.1.6, rc@^1.2.7:
  version "1.2.8"
  resolved "https://registry.yarnpkg.com/rc/-/rc-1.2.8.tgz#cd924bf5200a075b83c188cd6b9e211b7fc0d3ed"
  dependencies:
    deep-extend "^0.6.0"
    ini "~1.3.0"
    minimist "^1.2.0"
    strip-json-comments "~2.0.1"

read-cache@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/read-cache/-/read-cache-1.0.0.tgz#e664ef31161166c9751cdbe8dbcf86b5fb58f774"
  dependencies:
    pify "^2.3.0"

read-pkg-up@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/read-pkg-up/-/read-pkg-up-1.0.1.tgz#9d63c13276c065918d57f002a57f40a1b643fb02"
  dependencies:
    find-up "^1.0.0"
    read-pkg "^1.0.0"

read-pkg-up@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/read-pkg-up/-/read-pkg-up-2.0.0.tgz#6b72a8048984e0c41e79510fd5e9fa99b3b549be"
  dependencies:
    find-up "^2.0.0"
    read-pkg "^2.0.0"

read-pkg-up@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/read-pkg-up/-/read-pkg-up-4.0.0.tgz#1b221c6088ba7799601c808f91161c66e58f8978"
  dependencies:
    find-up "^3.0.0"
    read-pkg "^3.0.0"

read-pkg@^1.0.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/read-pkg/-/read-pkg-1.1.0.tgz#f5ffaa5ecd29cb31c0474bca7d756b6bb29e3f28"
  dependencies:
    load-json-file "^1.0.0"
    normalize-package-data "^2.3.2"
    path-type "^1.0.0"

read-pkg@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/read-pkg/-/read-pkg-2.0.0.tgz#8ef1c0623c6a6db0dc6713c4bfac46332b2368f8"
  dependencies:
    load-json-file "^2.0.0"
    normalize-package-data "^2.3.2"
    path-type "^2.0.0"

read-pkg@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/read-pkg/-/read-pkg-3.0.0.tgz#9cbc686978fee65d16c00e2b19c237fcf6e38389"
  dependencies:
    load-json-file "^4.0.0"
    normalize-package-data "^2.3.2"
    path-type "^3.0.0"

"readable-stream@1 || 2", readable-stream@^2.0.0, readable-stream@^2.0.1, readable-stream@^2.0.2, readable-stream@^2.0.4, readable-stream@^2.0.6, readable-stream@^2.1.5, readable-stream@^2.2.2, readable-stream@^2.2.9, readable-stream@^2.3.0, readable-stream@^2.3.3, readable-stream@^2.3.6, readable-stream@~2.3.6:
  version "2.3.6"
  resolved "http://registry.npmjs.org/readable-stream/-/readable-stream-2.3.6.tgz#b11c27d88b8ff1fbe070643cf94b0c79ae1b0aaf"
  dependencies:
    core-util-is "~1.0.0"
    inherits "~2.0.3"
    isarray "~1.0.0"
    process-nextick-args "~2.0.0"
    safe-buffer "~5.1.1"
    string_decoder "~1.1.1"
    util-deprecate "~1.0.1"

readable-stream@~2.0.6:
  version "2.0.6"
  resolved "http://registry.npmjs.org/readable-stream/-/readable-stream-2.0.6.tgz#8f90341e68a53ccc928788dacfcd11b36eb9b78e"
  dependencies:
    core-util-is "~1.0.0"
    inherits "~2.0.1"
    isarray "~1.0.0"
    process-nextick-args "~1.0.6"
    string_decoder "~0.10.x"
    util-deprecate "~1.0.1"

readdirp@^2.0.0:
  version "2.2.1"
  resolved "https://registry.yarnpkg.com/readdirp/-/readdirp-2.2.1.tgz#0e87622a3325aa33e892285caf8b4e846529a525"
  dependencies:
    graceful-fs "^4.1.11"
    micromatch "^3.1.10"
    readable-stream "^2.0.2"

rechoir@^0.6.2:
  version "0.6.2"
  resolved "https://registry.yarnpkg.com/rechoir/-/rechoir-0.6.2.tgz#85204b54dba82d5742e28c96756ef43af50e3384"
  dependencies:
    resolve "^1.1.6"

redent@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/redent/-/redent-1.0.0.tgz#cf916ab1fd5f1f16dfb20822dd6ec7f730c2afde"
  dependencies:
    indent-string "^2.1.0"
    strip-indent "^1.0.1"

reflect-metadata@^0.1.2:
  version "0.1.12"
  resolved "https://registry.yarnpkg.com/reflect-metadata/-/reflect-metadata-0.1.12.tgz#311bf0c6b63cd782f228a81abe146a2bfa9c56f2"

regenerate@^1.2.1:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/regenerate/-/regenerate-1.4.0.tgz#4a856ec4b56e4077c557589cae85e7a4c8869a11"

regenerator-runtime@^0.10.0:
  version "0.10.5"
  resolved "https://registry.yarnpkg.com/regenerator-runtime/-/regenerator-runtime-0.10.5.tgz#336c3efc1220adcedda2c9fab67b5a7955a33658"

regenerator-runtime@^0.11.0:
  version "0.11.1"
  resolved "https://registry.yarnpkg.com/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz#be05ad7f9bf7d22e056f9726cee5017fbf19e2e9"

regex-cache@^0.4.2:
  version "0.4.4"
  resolved "https://registry.yarnpkg.com/regex-cache/-/regex-cache-0.4.4.tgz#75bdc58a2a1496cec48a12835bc54c8d562336dd"
  dependencies:
    is-equal-shallow "^0.1.3"

regex-not@^1.0.0, regex-not@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/regex-not/-/regex-not-1.0.2.tgz#1f4ece27e00b0b65e0247a6810e6a85d83a5752c"
  dependencies:
    extend-shallow "^3.0.2"
    safe-regex "^1.1.0"

regexpu-core@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/regexpu-core/-/regexpu-core-1.0.0.tgz#86a763f58ee4d7c2f6b102e4764050de7ed90c6b"
  dependencies:
    regenerate "^1.2.1"
    regjsgen "^0.2.0"
    regjsparser "^0.1.4"

registry-auth-token@^3.0.1:
  version "3.3.2"
  resolved "https://registry.yarnpkg.com/registry-auth-token/-/registry-auth-token-3.3.2.tgz#851fd49038eecb586911115af845260eec983f20"
  dependencies:
    rc "^1.1.6"
    safe-buffer "^5.0.1"

registry-url@^3.0.3:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/registry-url/-/registry-url-3.1.0.tgz#3d4ef870f73dde1d77f0cf9a381432444e174942"
  dependencies:
    rc "^1.0.1"

regjsgen@^0.2.0:
  version "0.2.0"
  resolved "http://registry.npmjs.org/regjsgen/-/regjsgen-0.2.0.tgz#6c016adeac554f75823fe37ac05b92d5a4edb1f7"

regjsparser@^0.1.4:
  version "0.1.5"
  resolved "http://registry.npmjs.org/regjsparser/-/regjsparser-0.1.5.tgz#7ee8f84dc6fa792d3fd0ae228d24bd949ead205c"
  dependencies:
    jsesc "~0.5.0"

remove-trailing-separator@^1.0.1:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz#c24bce2a283adad5bc3f58e0d48249b92379d8ef"

repeat-element@^1.1.2:
  version "1.1.3"
  resolved "https://registry.yarnpkg.com/repeat-element/-/repeat-element-1.1.3.tgz#782e0d825c0c5a3bb39731f84efee6b742e6b1ce"

repeat-string@^0.2.2:
  version "0.2.2"
  resolved "https://registry.yarnpkg.com/repeat-string/-/repeat-string-0.2.2.tgz#c7a8d3236068362059a7e4651fc6884e8b1fb4ae"

repeat-string@^1.5.2, repeat-string@^1.6.1:
  version "1.6.1"
  resolved "https://registry.yarnpkg.com/repeat-string/-/repeat-string-1.6.1.tgz#8dcae470e1c88abc2d600fff4a776286da75e637"

repeating@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/repeating/-/repeating-2.0.1.tgz#5214c53a926d3552707527fbab415dbc08d06dda"
  dependencies:
    is-finite "^1.0.0"

request@^2.55.0, request@^2.83.0, request@^2.87.0, request@^2.88.0:
  version "2.88.0"
  resolved "https://registry.yarnpkg.com/request/-/request-2.88.0.tgz#9c2fca4f7d35b592efe57c7f0a55e81052124fef"
  dependencies:
    aws-sign2 "~0.7.0"
    aws4 "^1.8.0"
    caseless "~0.12.0"
    combined-stream "~1.0.6"
    extend "~3.0.2"
    forever-agent "~0.6.1"
    form-data "~2.3.2"
    har-validator "~5.1.0"
    http-signature "~1.2.0"
    is-typedarray "~1.0.0"
    isstream "~0.1.2"
    json-stringify-safe "~5.0.1"
    mime-types "~2.1.19"
    oauth-sign "~0.9.0"
    performance-now "^2.1.0"
    qs "~6.5.2"
    safe-buffer "^5.1.2"
    tough-cookie "~2.4.3"
    tunnel-agent "^0.6.0"
    uuid "^3.3.2"

require-directory@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/require-directory/-/require-directory-2.1.1.tgz#8c64ad5fd30dab1c976e2344ffe7f792a6a6df42"

require-from-string@^2.0.1:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/require-from-string/-/require-from-string-2.0.2.tgz#89a7fdd938261267318eafe14f9c32e598c36909"

require-main-filename@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/require-main-filename/-/require-main-filename-1.0.1.tgz#97f717b69d48784f5f526a6c5aa8ffdda055a4d1"

requires-port@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/requires-port/-/requires-port-1.0.0.tgz#925d2601d39ac485e091cf0da5c6e694dc3dcaff"

resolve-cwd@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/resolve-cwd/-/resolve-cwd-2.0.0.tgz#00a9f7387556e27038eae232caa372a6a59b665a"
  dependencies:
    resolve-from "^3.0.0"

resolve-from@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/resolve-from/-/resolve-from-3.0.0.tgz#b22c7af7d9d6881bc8b6e653335eebcb0a188748"

resolve-url@^0.2.1:
  version "0.2.1"
  resolved "https://registry.yarnpkg.com/resolve-url/-/resolve-url-0.2.1.tgz#2c637fe77c893afd2a663fe21aa9080068e2052a"

resolve@1.1.x, resolve@~1.1.6:
  version "1.1.7"
  resolved "https://registry.yarnpkg.com/resolve/-/resolve-1.1.7.tgz#203114d82ad2c5ed9e8e0411b3932875e889e97b"

resolve@^1.1.6, resolve@^1.1.7, resolve@^1.3.2, resolve@^1.8.1:
  version "1.8.1"
  resolved "https://registry.yarnpkg.com/resolve/-/resolve-1.8.1.tgz#82f1ec19a423ac1fbd080b0bab06ba36e84a7a26"
  dependencies:
    path-parse "^1.0.5"

restore-cursor@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/restore-cursor/-/restore-cursor-2.0.0.tgz#9f7ee287f82fd326d4fd162923d62129eee0dfaf"
  dependencies:
    onetime "^2.0.0"
    signal-exit "^3.0.2"

ret@~0.1.10:
  version "0.1.15"
  resolved "https://registry.yarnpkg.com/ret/-/ret-0.1.15.tgz#b8a4825d5bdb1fc3f6f53c2bc33f81388681c7bc"

retry@^0.10.0:
  version "0.10.1"
  resolved "https://registry.yarnpkg.com/retry/-/retry-0.10.1.tgz#e76388d217992c252750241d3d3956fed98d8ff4"

rfdc@^1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/rfdc/-/rfdc-1.1.2.tgz#e6e72d74f5dc39de8f538f65e00c36c18018e349"

rgbcolor@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/rgbcolor/-/rgbcolor-1.0.1.tgz#d6505ecdb304a6595da26fa4b43307306775945d"

rimraf@2, rimraf@^2.2.8, rimraf@^2.5.2, rimraf@^2.5.4, rimraf@^2.6.0, rimraf@^2.6.1, rimraf@^2.6.2:
  version "2.6.2"
  resolved "https://registry.yarnpkg.com/rimraf/-/rimraf-2.6.2.tgz#2ed8150d24a16ea8651e6d6ef0f47c4158ce7a36"
  dependencies:
    glob "^7.0.5"

ripemd160@^2.0.0, ripemd160@^2.0.1:
  version "2.0.2"
  resolved "https://registry.yarnpkg.com/ripemd160/-/ripemd160-2.0.2.tgz#a1c1a6f624751577ba5d07914cbc92850585890c"
  dependencies:
    hash-base "^3.0.0"
    inherits "^2.0.1"

rollup-plugin-commonjs@^9.1.3:
  version "9.2.0"
  resolved "https://registry.yarnpkg.com/rollup-plugin-commonjs/-/rollup-plugin-commonjs-9.2.0.tgz#4604e25069e0c78a09e08faa95dc32dec27f7c89"
  dependencies:
    estree-walker "^0.5.2"
    magic-string "^0.25.1"
    resolve "^1.8.1"
    rollup-pluginutils "^2.3.3"

rollup-plugin-json@^3.1.0:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/rollup-plugin-json/-/rollup-plugin-json-3.1.0.tgz#7c1daf60c46bc21021ea016bd00863561a03321b"
  dependencies:
    rollup-pluginutils "^2.3.1"

rollup-plugin-node-resolve@^3.0.0:
  version "3.4.0"
  resolved "https://registry.yarnpkg.com/rollup-plugin-node-resolve/-/rollup-plugin-node-resolve-3.4.0.tgz#908585eda12e393caac7498715a01e08606abc89"
  dependencies:
    builtin-modules "^2.0.0"
    is-module "^1.0.0"
    resolve "^1.1.6"

rollup-plugin-sourcemaps@^0.4.2:
  version "0.4.2"
  resolved "https://registry.yarnpkg.com/rollup-plugin-sourcemaps/-/rollup-plugin-sourcemaps-0.4.2.tgz#62125aa94087aadf7b83ef4dfaf629b473135e87"
  dependencies:
    rollup-pluginutils "^2.0.1"
    source-map-resolve "^0.5.0"

rollup-pluginutils@^2.0.1, rollup-pluginutils@^2.3.1, rollup-pluginutils@^2.3.3:
  version "2.3.3"
  resolved "https://registry.yarnpkg.com/rollup-pluginutils/-/rollup-pluginutils-2.3.3.tgz#3aad9b1eb3e7fe8262820818840bf091e5ae6794"
  dependencies:
    estree-walker "^0.5.2"
    micromatch "^2.3.11"

rollup@^0.67.0:
  version "0.67.4"
  resolved "https://registry.yarnpkg.com/rollup/-/rollup-0.67.4.tgz#8ed6b0993337f84ec8a0387f824fa6c197e833ec"
  dependencies:
    "@types/estree" "0.0.39"
    "@types/node" "*"

run-async@^2.2.0:
  version "2.3.0"
  resolved "https://registry.yarnpkg.com/run-async/-/run-async-2.3.0.tgz#0371ab4ae0bdd720d4166d7dfda64ff7a445a6c0"
  dependencies:
    is-promise "^2.1.0"

run-queue@^1.0.0, run-queue@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/run-queue/-/run-queue-1.0.3.tgz#e848396f057d223f24386924618e25694161ec47"
  dependencies:
    aproba "^1.1.1"

rx@^4.1.0:
  version "4.1.0"
  resolved "https://registry.yarnpkg.com/rx/-/rx-4.1.0.tgz#a5f13ff79ef3b740fe30aa803fb09f98805d4782"

rxjs@6.3.3, rxjs@^6.0.0, rxjs@^6.1.0, rxjs@~6.3.3:
  version "6.3.3"
  resolved "https://registry.yarnpkg.com/rxjs/-/rxjs-6.3.3.tgz#3c6a7fa420e844a81390fb1158a9ec614f4bad55"
  dependencies:
    tslib "^1.9.0"

safe-buffer@5.1.2, safe-buffer@^5.0.1, safe-buffer@^5.1.0, safe-buffer@^5.1.1, safe-buffer@^5.1.2, safe-buffer@~5.1.0, safe-buffer@~5.1.1:
  version "5.1.2"
  resolved "https://registry.yarnpkg.com/safe-buffer/-/safe-buffer-5.1.2.tgz#991ec69d296e0313747d59bdfd2b745c35f8828d"

safe-regex@^1.1.0:
  version "1.1.0"
  resolved "http://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz#40a3669f3b077d1e943d44629e157dd48023bf2e"
  dependencies:
    ret "~0.1.10"

"safer-buffer@>= 2.1.2 < 3", safer-buffer@^2.0.2, safer-buffer@^2.1.0, safer-buffer@~2.1.0:
  version "2.1.2"
  resolved "https://registry.yarnpkg.com/safer-buffer/-/safer-buffer-2.1.2.tgz#44fa161b0187b9549dd84bb91802f9bd8385cd6a"

sass-graph@^2.2.4:
  version "2.2.4"
  resolved "https://registry.yarnpkg.com/sass-graph/-/sass-graph-2.2.4.tgz#13fbd63cd1caf0908b9fd93476ad43a51d1e0b49"
  dependencies:
    glob "^7.0.0"
    lodash "^4.0.0"
    scss-tokenizer "^0.2.3"
    yargs "^7.0.0"

sass-loader@7.1.0:
  version "7.1.0"
  resolved "https://registry.yarnpkg.com/sass-loader/-/sass-loader-7.1.0.tgz#16fd5138cb8b424bf8a759528a1972d72aad069d"
  dependencies:
    clone-deep "^2.0.1"
    loader-utils "^1.0.1"
    lodash.tail "^4.1.1"
    neo-async "^2.5.0"
    pify "^3.0.0"
    semver "^5.5.0"

saucelabs@^1.5.0:
  version "1.5.0"
  resolved "https://registry.yarnpkg.com/saucelabs/-/saucelabs-1.5.0.tgz#9405a73c360d449b232839919a86c396d379fd9d"
  dependencies:
    https-proxy-agent "^2.2.1"

sax@0.5.x:
  version "0.5.8"
  resolved "http://registry.npmjs.org/sax/-/sax-0.5.8.tgz#d472db228eb331c2506b0e8c15524adb939d12c1"

sax@>=0.6.0, sax@^1.1.4, sax@^1.2.4:
  version "1.2.4"
  resolved "https://registry.yarnpkg.com/sax/-/sax-1.2.4.tgz#2816234e2378bddc4e5354fab5caa895df7100d9"

schema-utils@^0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/schema-utils/-/schema-utils-0.3.0.tgz#f5877222ce3e931edae039f17eb3716e7137f8cf"
  dependencies:
    ajv "^5.0.0"

schema-utils@^0.4.4, schema-utils@^0.4.5:
  version "0.4.7"
  resolved "https://registry.yarnpkg.com/schema-utils/-/schema-utils-0.4.7.tgz#ba74f597d2be2ea880131746ee17d0a093c68187"
  dependencies:
    ajv "^6.1.0"
    ajv-keywords "^3.1.0"

schema-utils@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/schema-utils/-/schema-utils-1.0.0.tgz#0b79a93204d7b600d4b2850d1f66c2a34951c770"
  dependencies:
    ajv "^6.1.0"
    ajv-errors "^1.0.0"
    ajv-keywords "^3.1.0"

scss-tokenizer@^0.2.3:
  version "0.2.3"
  resolved "https://registry.yarnpkg.com/scss-tokenizer/-/scss-tokenizer-0.2.3.tgz#8eb06db9a9723333824d3f5530641149847ce5d1"
  dependencies:
    js-base64 "^2.1.8"
    source-map "^0.4.2"

select-hose@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/select-hose/-/select-hose-2.0.0.tgz#625d8658f865af43ec962bfc376a37359a4994ca"

selenium-webdriver@3.6.0, selenium-webdriver@^3.0.1:
  version "3.6.0"
  resolved "https://registry.yarnpkg.com/selenium-webdriver/-/selenium-webdriver-3.6.0.tgz#2ba87a1662c020b8988c981ae62cb2a01298eafc"
  dependencies:
    jszip "^3.1.3"
    rimraf "^2.5.4"
    tmp "0.0.30"
    xml2js "^0.4.17"

selfsigned@^1.9.1:
  version "1.10.4"
  resolved "https://registry.yarnpkg.com/selfsigned/-/selfsigned-1.10.4.tgz#cdd7eccfca4ed7635d47a08bf2d5d3074092e2cd"
  dependencies:
    node-forge "0.7.5"

semver-diff@^2.0.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/semver-diff/-/semver-diff-2.1.0.tgz#4bbb8437c8d37e4b0cf1a68fd726ec6d645d6d36"
  dependencies:
    semver "^5.0.3"

semver-dsl@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/semver-dsl/-/semver-dsl-1.0.1.tgz#d3678de5555e8a61f629eed025366ae5f27340a0"
  dependencies:
    semver "^5.3.0"

semver-intersect@1.4.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/semver-intersect/-/semver-intersect-1.4.0.tgz#bdd9c06bedcdd2fedb8cd352c3c43ee8c61321f3"
  dependencies:
    semver "^5.0.0"

"semver@2 || 3 || 4 || 5", semver@^5.0.0, semver@^5.0.3, semver@^5.1.0, semver@^5.3.0, semver@^5.4.1, semver@^5.5.0, semver@^5.6.0:
  version "5.6.0"
  resolved "https://registry.yarnpkg.com/semver/-/semver-5.6.0.tgz#7e74256fbaa49c75aa7c7a205cc22799cac80004"

semver@5.5.1:
  version "5.5.1"
  resolved "https://registry.yarnpkg.com/semver/-/semver-5.5.1.tgz#7dfdd8814bdb7cabc7be0fb1d734cfb66c940477"

semver@~5.3.0:
  version "5.3.0"
  resolved "http://registry.npmjs.org/semver/-/semver-5.3.0.tgz#9b2ce5d3de02d17c6012ad326aa6b4d0cf54f94f"

send@0.16.2:
  version "0.16.2"
  resolved "https://registry.yarnpkg.com/send/-/send-0.16.2.tgz#6ecca1e0f8c156d141597559848df64730a6bbc1"
  dependencies:
    debug "2.6.9"
    depd "~1.1.2"
    destroy "~1.0.4"
    encodeurl "~1.0.2"
    escape-html "~1.0.3"
    etag "~1.8.1"
    fresh "0.5.2"
    http-errors "~1.6.2"
    mime "1.4.1"
    ms "2.0.0"
    on-finished "~2.3.0"
    range-parser "~1.2.0"
    statuses "~1.4.0"

serialize-javascript@^1.4.0:
  version "1.5.0"
  resolved "https://registry.yarnpkg.com/serialize-javascript/-/serialize-javascript-1.5.0.tgz#1aa336162c88a890ddad5384baebc93a655161fe"

serve-index@^1.7.2:
  version "1.9.1"
  resolved "https://registry.yarnpkg.com/serve-index/-/serve-index-1.9.1.tgz#d3768d69b1e7d82e5ce050fff5b453bea12a9239"
  dependencies:
    accepts "~1.3.4"
    batch "0.6.1"
    debug "2.6.9"
    escape-html "~1.0.3"
    http-errors "~1.6.2"
    mime-types "~2.1.17"
    parseurl "~1.3.2"

serve-static@1.13.2:
  version "1.13.2"
  resolved "https://registry.yarnpkg.com/serve-static/-/serve-static-1.13.2.tgz#095e8472fd5b46237db50ce486a43f4b86c6cec1"
  dependencies:
    encodeurl "~1.0.2"
    escape-html "~1.0.3"
    parseurl "~1.3.2"
    send "0.16.2"

set-blocking@^2.0.0, set-blocking@~2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/set-blocking/-/set-blocking-2.0.0.tgz#045f9782d011ae9a6803ddd382b24392b3d890f7"

set-value@^0.4.3:
  version "0.4.3"
  resolved "https://registry.yarnpkg.com/set-value/-/set-value-0.4.3.tgz#7db08f9d3d22dc7f78e53af3c3bf4666ecdfccf1"
  dependencies:
    extend-shallow "^2.0.1"
    is-extendable "^0.1.1"
    is-plain-object "^2.0.1"
    to-object-path "^0.3.0"

set-value@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/set-value/-/set-value-2.0.0.tgz#71ae4a88f0feefbbf52d1ea604f3fb315ebb6274"
  dependencies:
    extend-shallow "^2.0.1"
    is-extendable "^0.1.1"
    is-plain-object "^2.0.3"
    split-string "^3.0.1"

setimmediate@^1.0.4:
  version "1.0.5"
  resolved "https://registry.yarnpkg.com/setimmediate/-/setimmediate-1.0.5.tgz#290cbb232e306942d7d7ea9b83732ab7856f8285"

setprototypeof@1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/setprototypeof/-/setprototypeof-1.1.0.tgz#d0bd85536887b6fe7c0d818cb962d9d91c54e656"

sha.js@^2.4.0, sha.js@^2.4.8:
  version "2.4.11"
  resolved "http://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz#37a5cf0b81ecbc6943de109ba2960d1b26584ae7"
  dependencies:
    inherits "^2.0.1"
    safe-buffer "^5.0.1"

shallow-clone@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/shallow-clone/-/shallow-clone-1.0.0.tgz#4480cd06e882ef68b2ad88a3ea54832e2c48b571"
  dependencies:
    is-extendable "^0.1.1"
    kind-of "^5.0.0"
    mixin-object "^2.0.1"

shebang-command@^1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/shebang-command/-/shebang-command-1.2.0.tgz#44aac65b695b03398968c39f363fee5deafdf1ea"
  dependencies:
    shebang-regex "^1.0.0"

shebang-regex@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/shebang-regex/-/shebang-regex-1.0.0.tgz#da42f49740c0b42db2ca9728571cb190c98efea3"

shelljs@^0.8.1:
  version "0.8.3"
  resolved "https://registry.yarnpkg.com/shelljs/-/shelljs-0.8.3.tgz#a7f3319520ebf09ee81275b2368adb286659b097"
  dependencies:
    glob "^7.0.0"
    interpret "^1.0.0"
    rechoir "^0.6.2"

signal-exit@^3.0.0, signal-exit@^3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/signal-exit/-/signal-exit-3.0.2.tgz#b5fdc08f1287ea1178628e415e25132b73646c6d"

slash@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/slash/-/slash-1.0.0.tgz#c41f2f6c39fc16d1cd17ad4b5d896114ae470d55"

smart-buffer@^4.0.1:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/smart-buffer/-/smart-buffer-4.0.1.tgz#07ea1ca8d4db24eb4cac86537d7d18995221ace3"

snapdragon-node@^2.0.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/snapdragon-node/-/snapdragon-node-2.1.1.tgz#6c175f86ff14bdb0724563e8f3c1b021a286853b"
  dependencies:
    define-property "^1.0.0"
    isobject "^3.0.0"
    snapdragon-util "^3.0.1"

snapdragon-util@^3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/snapdragon-util/-/snapdragon-util-3.0.1.tgz#f956479486f2acd79700693f6f7b805e45ab56e2"
  dependencies:
    kind-of "^3.2.0"

snapdragon@^0.8.1:
  version "0.8.2"
  resolved "https://registry.yarnpkg.com/snapdragon/-/snapdragon-0.8.2.tgz#64922e7c565b0e14204ba1aa7d6964278d25182d"
  dependencies:
    base "^0.11.1"
    debug "^2.2.0"
    define-property "^0.2.5"
    extend-shallow "^2.0.1"
    map-cache "^0.2.2"
    source-map "^0.5.6"
    source-map-resolve "^0.5.0"
    use "^3.1.0"

socket.io-adapter@~1.1.0:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/socket.io-adapter/-/socket.io-adapter-1.1.1.tgz#2a805e8a14d6372124dd9159ad4502f8cb07f06b"

socket.io-client@2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/socket.io-client/-/socket.io-client-2.1.1.tgz#dcb38103436ab4578ddb026638ae2f21b623671f"
  dependencies:
    backo2 "1.0.2"
    base64-arraybuffer "0.1.5"
    component-bind "1.0.0"
    component-emitter "1.2.1"
    debug "~3.1.0"
    engine.io-client "~3.2.0"
    has-binary2 "~1.0.2"
    has-cors "1.1.0"
    indexof "0.0.1"
    object-component "0.0.3"
    parseqs "0.0.5"
    parseuri "0.0.5"
    socket.io-parser "~3.2.0"
    to-array "0.1.4"

socket.io-parser@~3.2.0:
  version "3.2.0"
  resolved "http://registry.npmjs.org/socket.io-parser/-/socket.io-parser-3.2.0.tgz#e7c6228b6aa1f814e6148aea325b51aa9499e077"
  dependencies:
    component-emitter "1.2.1"
    debug "~3.1.0"
    isarray "2.0.1"

socket.io@2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/socket.io/-/socket.io-2.1.1.tgz#a069c5feabee3e6b214a75b40ce0652e1cfb9980"
  dependencies:
    debug "~3.1.0"
    engine.io "~3.2.0"
    has-binary2 "~1.0.2"
    socket.io-adapter "~1.1.0"
    socket.io-client "2.1.1"
    socket.io-parser "~3.2.0"

sockjs-client@1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/sockjs-client/-/sockjs-client-1.3.0.tgz#12fc9d6cb663da5739d3dc5fb6e8687da95cb177"
  dependencies:
    debug "^3.2.5"
    eventsource "^1.0.7"
    faye-websocket "~0.11.1"
    inherits "^2.0.3"
    json3 "^3.3.2"
    url-parse "^1.4.3"

sockjs@0.3.19:
  version "0.3.19"
  resolved "https://registry.yarnpkg.com/sockjs/-/sockjs-0.3.19.tgz#d976bbe800af7bd20ae08598d582393508993c0d"
  dependencies:
    faye-websocket "^0.10.0"
    uuid "^3.0.1"

socks-proxy-agent@^4.0.0:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/socks-proxy-agent/-/socks-proxy-agent-4.0.1.tgz#5936bf8b707a993079c6f37db2091821bffa6473"
  dependencies:
    agent-base "~4.2.0"
    socks "~2.2.0"

socks@~2.2.0:
  version "2.2.2"
  resolved "https://registry.yarnpkg.com/socks/-/socks-2.2.2.tgz#f061219fc2d4d332afb4af93e865c84d3fa26e2b"
  dependencies:
    ip "^1.1.5"
    smart-buffer "^4.0.1"

source-list-map@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/source-list-map/-/source-list-map-2.0.1.tgz#3993bd873bfc48479cca9ea3a547835c7c154b34"

source-list-map@~0.1.7:
  version "0.1.8"
  resolved "https://registry.yarnpkg.com/source-list-map/-/source-list-map-0.1.8.tgz#c550b2ab5427f6b3f21f5afead88c4f5587b2106"

source-map-loader@0.2.4:
  version "0.2.4"
  resolved "https://registry.yarnpkg.com/source-map-loader/-/source-map-loader-0.2.4.tgz#c18b0dc6e23bf66f6792437557c569a11e072271"
  dependencies:
    async "^2.5.0"
    loader-utils "^1.1.0"

source-map-resolve@^0.5.0:
  version "0.5.2"
  resolved "https://registry.yarnpkg.com/source-map-resolve/-/source-map-resolve-0.5.2.tgz#72e2cc34095543e43b2c62b2c4c10d4a9054f259"
  dependencies:
    atob "^2.1.1"
    decode-uri-component "^0.2.0"
    resolve-url "^0.2.1"
    source-map-url "^0.4.0"
    urix "^0.1.0"

source-map-support@0.5.9, source-map-support@^0.5.5, source-map-support@^0.5.6, source-map-support@~0.5.6:
  version "0.5.9"
  resolved "https://registry.yarnpkg.com/source-map-support/-/source-map-support-0.5.9.tgz#41bc953b2534267ea2d605bccfa7bfa3111ced5f"
  dependencies:
    buffer-from "^1.0.0"
    source-map "^0.6.0"

source-map-support@~0.4.0:
  version "0.4.18"
  resolved "https://registry.yarnpkg.com/source-map-support/-/source-map-support-0.4.18.tgz#0286a6de8be42641338594e97ccea75f0a2c585f"
  dependencies:
    source-map "^0.5.6"

source-map-url@^0.4.0:
  version "0.4.0"
  resolved "https://registry.yarnpkg.com/source-map-url/-/source-map-url-0.4.0.tgz#3e935d7ddd73631b97659956d55128e87b5084a3"

source-map@0.1.x:
  version "0.1.43"
  resolved "http://registry.npmjs.org/source-map/-/source-map-0.1.43.tgz#c24bc146ca517c1471f5dacbe2571b2b7f9e3346"
  dependencies:
    amdefine ">=0.0.4"

source-map@0.5.6:
  version "0.5.6"
  resolved "http://registry.npmjs.org/source-map/-/source-map-0.5.6.tgz#75ce38f52bf0733c5a7f0c118d81334a2bb5f412"

source-map@0.7.3, source-map@^0.7.3:
  version "0.7.3"
  resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.7.3.tgz#5302f8169031735226544092e64981f751750383"

source-map@^0.4.2, source-map@~0.4.1:
  version "0.4.4"
  resolved "http://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz#eba4f5da9c0dc999de68032d8b4f76173652036b"
  dependencies:
    amdefine ">=0.0.4"

source-map@^0.5.0, source-map@^0.5.6, source-map@^0.5.7:
  version "0.5.7"
  resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.5.7.tgz#8a039d2d1021d22d1ea14c80d8ea468ba2ef3fcc"

source-map@^0.6.0, source-map@^0.6.1, source-map@~0.6.0, source-map@~0.6.1:
  version "0.6.1"
  resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.6.1.tgz#74722af32e9614e9c287a8d0bbde48b5e2f1a263"

source-map@~0.2.0:
  version "0.2.0"
  resolved "http://registry.npmjs.org/source-map/-/source-map-0.2.0.tgz#dab73fbcfc2ba819b4de03bd6f6eaa48164b3f9d"
  dependencies:
    amdefine ">=0.0.4"

sourcemap-codec@^1.4.1:
  version "1.4.4"
  resolved "https://registry.yarnpkg.com/sourcemap-codec/-/sourcemap-codec-1.4.4.tgz#c63ea927c029dd6bd9a2b7fa03b3fec02ad56e9f"

spdx-correct@^3.0.0:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/spdx-correct/-/spdx-correct-3.0.2.tgz#19bb409e91b47b1ad54159243f7312a858db3c2e"
  dependencies:
    spdx-expression-parse "^3.0.0"
    spdx-license-ids "^3.0.0"

spdx-exceptions@^2.1.0:
  version "2.2.0"
  resolved "https://registry.yarnpkg.com/spdx-exceptions/-/spdx-exceptions-2.2.0.tgz#2ea450aee74f2a89bfb94519c07fcd6f41322977"

spdx-expression-parse@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/spdx-expression-parse/-/spdx-expression-parse-3.0.0.tgz#99e119b7a5da00e05491c9fa338b7904823b41d0"
  dependencies:
    spdx-exceptions "^2.1.0"
    spdx-license-ids "^3.0.0"

spdx-license-ids@^3.0.0:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/spdx-license-ids/-/spdx-license-ids-3.0.2.tgz#a59efc09784c2a5bada13cfeaf5c75dd214044d2"

spdy-transport@^2.0.18:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/spdy-transport/-/spdy-transport-2.1.1.tgz#c54815d73858aadd06ce63001e7d25fa6441623b"
  dependencies:
    debug "^2.6.8"
    detect-node "^2.0.3"
    hpack.js "^2.1.6"
    obuf "^1.1.1"
    readable-stream "^2.2.9"
    safe-buffer "^5.0.1"
    wbuf "^1.7.2"

spdy@^3.4.1:
  version "3.4.7"
  resolved "https://registry.yarnpkg.com/spdy/-/spdy-3.4.7.tgz#42ff41ece5cc0f99a3a6c28aabb73f5c3b03acbc"
  dependencies:
    debug "^2.6.8"
    handle-thing "^1.2.5"
    http-deceiver "^1.2.7"
    safe-buffer "^5.0.1"
    select-hose "^2.0.0"
    spdy-transport "^2.0.18"

speed-measure-webpack-plugin@1.2.3:
  version "1.2.3"
  resolved "https://registry.yarnpkg.com/speed-measure-webpack-plugin/-/speed-measure-webpack-plugin-1.2.3.tgz#de170b5cefbfa1c039d95e639edd3ad50cfc7c48"
  dependencies:
    chalk "^2.0.1"

split-string@^3.0.1, split-string@^3.0.2:
  version "3.1.0"
  resolved "https://registry.yarnpkg.com/split-string/-/split-string-3.1.0.tgz#7cb09dda3a86585705c64b39a6466038682e8fe2"
  dependencies:
    extend-shallow "^3.0.0"

sprintf-js@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/sprintf-js/-/sprintf-js-1.1.1.tgz#36be78320afe5801f6cea3ee78b6e5aab940ea0c"

sprintf-js@~1.0.2:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/sprintf-js/-/sprintf-js-1.0.3.tgz#04e6926f662895354f3dd015203633b857297e2c"

sshpk@^1.7.0:
  version "1.15.2"
  resolved "https://registry.yarnpkg.com/sshpk/-/sshpk-1.15.2.tgz#c946d6bd9b1a39d0e8635763f5242d6ed6dcb629"
  dependencies:
    asn1 "~0.2.3"
    assert-plus "^1.0.0"
    bcrypt-pbkdf "^1.0.0"
    dashdash "^1.12.0"
    ecc-jsbn "~0.1.1"
    getpass "^0.1.1"
    jsbn "~0.1.0"
    safer-buffer "^2.0.2"
    tweetnacl "~0.14.0"

ssri@^5.2.4:
  version "5.3.0"
  resolved "https://registry.yarnpkg.com/ssri/-/ssri-5.3.0.tgz#ba3872c9c6d33a0704a7d71ff045e5ec48999d06"
  dependencies:
    safe-buffer "^5.1.1"

ssri@^6.0.0, ssri@^6.0.1:
  version "6.0.1"
  resolved "https://registry.yarnpkg.com/ssri/-/ssri-6.0.1.tgz#2a3c41b28dd45b62b63676ecb74001265ae9edd8"
  dependencies:
    figgy-pudding "^3.5.1"

stackblur-canvas@^1.4.1:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/stackblur-canvas/-/stackblur-canvas-1.4.1.tgz#849aa6f94b272ff26f6471fa4130ed1f7e47955b"

stackblur@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/stackblur/-/stackblur-1.0.0.tgz#b407a7e05c93b08d66883bb808d7cba3a503f12f"

static-extend@^0.1.1:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/static-extend/-/static-extend-0.1.2.tgz#60809c39cbff55337226fd5e0b520f341f1fb5c6"
  dependencies:
    define-property "^0.2.5"
    object-copy "^0.1.0"

stats-webpack-plugin@0.7.0:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/stats-webpack-plugin/-/stats-webpack-plugin-0.7.0.tgz#ccffe9b745de8bbb155571e063f8263fc0e2bc06"
  dependencies:
    lodash "^4.17.4"

"statuses@>= 1.4.0 < 2":
  version "1.5.0"
  resolved "https://registry.yarnpkg.com/statuses/-/statuses-1.5.0.tgz#161c7dac177659fd9811f43771fa99381478628c"

statuses@~1.3.1:
  version "1.3.1"
  resolved "https://registry.yarnpkg.com/statuses/-/statuses-1.3.1.tgz#faf51b9eb74aaef3b3acf4ad5f61abf24cb7b93e"

statuses@~1.4.0:
  version "1.4.0"
  resolved "https://registry.yarnpkg.com/statuses/-/statuses-1.4.0.tgz#bb73d446da2796106efcc1b601a253d6c46bd087"

stdout-stream@^1.4.0:
  version "1.4.1"
  resolved "https://registry.yarnpkg.com/stdout-stream/-/stdout-stream-1.4.1.tgz#5ac174cdd5cd726104aa0c0b2bd83815d8d535de"
  dependencies:
    readable-stream "^2.0.1"

stream-browserify@^2.0.1:
  version "2.0.1"
  resolved "http://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.1.tgz#66266ee5f9bdb9940a4e4514cafb43bb71e5c9db"
  dependencies:
    inherits "~2.0.1"
    readable-stream "^2.0.2"

stream-each@^1.1.0:
  version "1.2.3"
  resolved "https://registry.yarnpkg.com/stream-each/-/stream-each-1.2.3.tgz#ebe27a0c389b04fbcc233642952e10731afa9bae"
  dependencies:
    end-of-stream "^1.1.0"
    stream-shift "^1.0.0"

stream-http@^2.7.2:
  version "2.8.3"
  resolved "https://registry.yarnpkg.com/stream-http/-/stream-http-2.8.3.tgz#b2d242469288a5a27ec4fe8933acf623de6514fc"
  dependencies:
    builtin-status-codes "^3.0.0"
    inherits "^2.0.1"
    readable-stream "^2.3.6"
    to-arraybuffer "^1.0.0"
    xtend "^4.0.0"

stream-shift@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/stream-shift/-/stream-shift-1.0.0.tgz#d5c752825e5367e786f78e18e445ea223a155952"

streamroller@0.7.0:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/streamroller/-/streamroller-0.7.0.tgz#a1d1b7cf83d39afb0d63049a5acbf93493bdf64b"
  dependencies:
    date-format "^1.2.0"
    debug "^3.1.0"
    mkdirp "^0.5.1"
    readable-stream "^2.3.0"

string-width@^1.0.1, string-width@^1.0.2:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/string-width/-/string-width-1.0.2.tgz#118bdf5b8cdc51a2a7e70d211e07e2b0b9b107d3"
  dependencies:
    code-point-at "^1.0.0"
    is-fullwidth-code-point "^1.0.0"
    strip-ansi "^3.0.0"

"string-width@^1.0.2 || 2", string-width@^2.0.0, string-width@^2.1.0, string-width@^2.1.1:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/string-width/-/string-width-2.1.1.tgz#ab93f27a8dc13d28cac815c462143a6d9012ae9e"
  dependencies:
    is-fullwidth-code-point "^2.0.0"
    strip-ansi "^4.0.0"

string_decoder@^1.0.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/string_decoder/-/string_decoder-1.2.0.tgz#fe86e738b19544afe70469243b2a1ee9240eae8d"
  dependencies:
    safe-buffer "~5.1.0"

string_decoder@~0.10.x:
  version "0.10.31"
  resolved "http://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz#62e203bc41766c6c28c9fc84301dab1c5310fa94"

string_decoder@~1.1.1:
  version "1.1.1"
  resolved "http://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz#9cf1611ba62685d7030ae9e4ba34149c3af03fc8"
  dependencies:
    safe-buffer "~5.1.0"

strip-ansi@^3.0.0, strip-ansi@^3.0.1:
  version "3.0.1"
  resolved "http://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz#6a385fb8853d952d5ff05d0e8aaf94278dc63dcf"
  dependencies:
    ansi-regex "^2.0.0"

strip-ansi@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/strip-ansi/-/strip-ansi-4.0.0.tgz#a8479022eb1ac368a871389b635262c505ee368f"
  dependencies:
    ansi-regex "^3.0.0"

strip-bom@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/strip-bom/-/strip-bom-2.0.0.tgz#6219a85616520491f35788bdbf1447a99c7e6b0e"
  dependencies:
    is-utf8 "^0.2.0"

strip-bom@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/strip-bom/-/strip-bom-3.0.0.tgz#2334c18e9c759f7bdd56fdef7e9ae3d588e68ed3"

strip-eof@^1.0.0:
  version "1.0.0"
  resolved "http://registry.npmjs.org/strip-eof/-/strip-eof-1.0.0.tgz#bb43ff5598a6eb05d89b59fcd129c983313606bf"

strip-indent@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/strip-indent/-/strip-indent-1.0.1.tgz#0c7962a6adefa7bbd4ac366460a638552ae1a0a2"
  dependencies:
    get-stdin "^4.0.1"

strip-json-comments@~2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/strip-json-comments/-/strip-json-comments-2.0.1.tgz#3c531942e908c2697c0ec344858c286c7ca0a60a"

style-loader@0.23.1:
  version "0.23.1"
  resolved "https://registry.yarnpkg.com/style-loader/-/style-loader-0.23.1.tgz#cb9154606f3e771ab6c4ab637026a1049174d925"
  dependencies:
    loader-utils "^1.1.0"
    schema-utils "^1.0.0"

stylus-loader@3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/stylus-loader/-/stylus-loader-3.0.2.tgz#27a706420b05a38e038e7cacb153578d450513c6"
  dependencies:
    loader-utils "^1.0.2"
    lodash.clonedeep "^4.5.0"
    when "~3.6.x"

stylus@0.54.5, stylus@^0.54.5:
  version "0.54.5"
  resolved "https://registry.yarnpkg.com/stylus/-/stylus-0.54.5.tgz#42b9560931ca7090ce8515a798ba9e6aa3d6dc79"
  dependencies:
    css-parse "1.7.x"
    debug "*"
    glob "7.0.x"
    mkdirp "0.5.x"
    sax "0.5.x"
    source-map "0.1.x"

supports-color@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/supports-color/-/supports-color-2.0.0.tgz#535d045ce6b6363fa40117084629995e9df324c7"

supports-color@^3.1.0:
  version "3.2.3"
  resolved "https://registry.yarnpkg.com/supports-color/-/supports-color-3.2.3.tgz#65ac0504b3954171d8a64946b2ae3cbb8a5f54f6"
  dependencies:
    has-flag "^1.0.0"

supports-color@^5.1.0, supports-color@^5.3.0, supports-color@^5.4.0, supports-color@^5.5.0:
  version "5.5.0"
  resolved "https://registry.yarnpkg.com/supports-color/-/supports-color-5.5.0.tgz#e2e69a44ac8772f78a1ec0b35b689df6530efc8f"
  dependencies:
    has-flag "^3.0.0"

symbol-observable@1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/symbol-observable/-/symbol-observable-1.2.0.tgz#c22688aed4eab3cdc2dfeacbb561660560a00804"

"symbol-tree@>= 3.1.0 < 4.0.0":
  version "3.2.2"
  resolved "https://registry.yarnpkg.com/symbol-tree/-/symbol-tree-3.2.2.tgz#ae27db38f660a7ae2e1c3b7d1bc290819b8519e6"

tapable@^1.0.0, tapable@^1.1.0:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/tapable/-/tapable-1.1.1.tgz#4d297923c5a72a42360de2ab52dadfaaec00018e"

tar@^2.0.0:
  version "2.2.1"
  resolved "http://registry.npmjs.org/tar/-/tar-2.2.1.tgz#8e4d2a256c0e2185c6b18ad694aec968b83cb1d1"
  dependencies:
    block-stream "*"
    fstream "^1.0.2"
    inherits "2"

tar@^4, tar@^4.4.6:
  version "4.4.8"
  resolved "https://registry.yarnpkg.com/tar/-/tar-4.4.8.tgz#b19eec3fde2a96e64666df9fdb40c5ca1bc3747d"
  dependencies:
    chownr "^1.1.1"
    fs-minipass "^1.2.5"
    minipass "^2.3.4"
    minizlib "^1.1.1"
    mkdirp "^0.5.0"
    safe-buffer "^5.1.2"
    yallist "^3.0.2"

term-size@^1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/term-size/-/term-size-1.2.0.tgz#458b83887f288fc56d6fffbfad262e26638efa69"
  dependencies:
    execa "^0.7.0"

terser-webpack-plugin@1.1.0:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/terser-webpack-plugin/-/terser-webpack-plugin-1.1.0.tgz#cf7c25a1eee25bf121f4a587bb9e004e3f80e528"
  dependencies:
    cacache "^11.0.2"
    find-cache-dir "^2.0.0"
    schema-utils "^1.0.0"
    serialize-javascript "^1.4.0"
    source-map "^0.6.1"
    terser "^3.8.1"
    webpack-sources "^1.1.0"
    worker-farm "^1.5.2"

terser@^3.8.1:
  version "3.10.13"
  resolved "https://registry.yarnpkg.com/terser/-/terser-3.10.13.tgz#00a8b2e9c1bec3f681257d90f96c3b1292ada97a"
  dependencies:
    commander "~2.17.1"
    source-map "~0.6.1"
    source-map-support "~0.5.6"

through2@^2.0.0:
  version "2.0.5"
  resolved "https://registry.yarnpkg.com/through2/-/through2-2.0.5.tgz#01c1e39eb31d07cb7d03a96a70823260b23132cd"
  dependencies:
    readable-stream "~2.3.6"
    xtend "~4.0.1"

"through@>=2.2.7 <3", through@X.X.X, through@^2.3.6:
  version "2.3.8"
  resolved "http://registry.npmjs.org/through/-/through-2.3.8.tgz#0dd4c9ffaabc357960b1b724115d7e0e86a2e1f5"

thunky@^1.0.2:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/thunky/-/thunky-1.0.3.tgz#f5df732453407b09191dae73e2a8cc73f381a826"

timed-out@^4.0.0:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/timed-out/-/timed-out-4.0.1.tgz#f32eacac5a175bea25d7fab565ab3ed8741ef56f"

timers-browserify@^2.0.4:
  version "2.0.10"
  resolved "https://registry.yarnpkg.com/timers-browserify/-/timers-browserify-2.0.10.tgz#1d28e3d2aadf1d5a5996c4e9f95601cd053480ae"
  dependencies:
    setimmediate "^1.0.4"

tmp@0.0.30:
  version "0.0.30"
  resolved "https://registry.yarnpkg.com/tmp/-/tmp-0.0.30.tgz#72419d4a8be7d6ce75148fd8b324e593a711c2ed"
  dependencies:
    os-tmpdir "~1.0.1"

tmp@0.0.33, tmp@0.0.x, tmp@^0.0.33:
  version "0.0.33"
  resolved "https://registry.yarnpkg.com/tmp/-/tmp-0.0.33.tgz#6d34335889768d21b2bcda0aa277ced3b1bfadf9"
  dependencies:
    os-tmpdir "~1.0.2"

to-array@0.1.4:
  version "0.1.4"
  resolved "https://registry.yarnpkg.com/to-array/-/to-array-0.1.4.tgz#17e6c11f73dd4f3d74cda7a4ff3238e9ad9bf890"

to-arraybuffer@^1.0.0:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz#7d229b1fcc637e466ca081180836a7aabff83f43"

to-fast-properties@^1.0.3:
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/to-fast-properties/-/to-fast-properties-1.0.3.tgz#b83571fa4d8c25b82e231b06e3a3055de4ca1a47"

to-fast-properties@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/to-fast-properties/-/to-fast-properties-2.0.0.tgz#dc5e698cbd079265bc73e0377681a4e4e83f616e"

to-object-path@^0.3.0:
  version "0.3.0"
  resolved "https://registry.yarnpkg.com/to-object-path/-/to-object-path-0.3.0.tgz#297588b7b0e7e0ac08e04e672f85c1f4999e17af"
  dependencies:
    kind-of "^3.0.2"

to-regex-range@^2.1.0:
  version "2.1.1"
  resolved "https://registry.yarnpkg.com/to-regex-range/-/to-regex-range-2.1.1.tgz#7c80c17b9dfebe599e27367e0d4dd5590141db38"
  dependencies:
    is-number "^3.0.0"
    repeat-string "^1.6.1"

to-regex@^3.0.1, to-regex@^3.0.2:
  version "3.0.2"
  resolved "https://registry.yarnpkg.com/to-regex/-/to-regex-3.0.2.tgz#13cfdd9b336552f30b51f33a8ae1b42a7a7599ce"
  dependencies:
    define-property "^2.0.2"
    extend-shallow "^3.0.2"
    regex-not "^1.0.2"
    safe-regex "^1.1.0"

tough-cookie@^2.2.0:
  version "2.5.0"
  resolved "https://registry.yarnpkg.com/tough-cookie/-/tough-cookie-2.5.0.tgz#cd9fb2a0aa1d5a12b473bd9fb96fa3dcff65ade2"
  dependencies:
    psl "^1.1.28"
    punycode "^2.1.1"

tough-cookie@~2.4.3:
  version "2.4.3"
  resolved "https://registry.yarnpkg.com/tough-cookie/-/tough-cookie-2.4.3.tgz#53f36da3f47783b0925afa06ff9f3b165280f781"
  dependencies:
    psl "^1.1.24"
    punycode "^1.4.1"

tr46@~0.0.3:
  version "0.0.3"
  resolved "https://registry.yarnpkg.com/tr46/-/tr46-0.0.3.tgz#8184fd347dac9cdc185992f3a6622e14b9d9ab6a"

tree-kill@1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/tree-kill/-/tree-kill-1.2.0.tgz#5846786237b4239014f05db156b643212d4c6f36"

trim-newlines@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/trim-newlines/-/trim-newlines-1.0.0.tgz#5887966bb582a4503a41eb524f7d35011815a613"

trim-right@^1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/trim-right/-/trim-right-1.0.1.tgz#cb2e1203067e0c8de1f614094b9fe45704ea6003"

"true-case-path@^1.0.2":
  version "1.0.3"
  resolved "https://registry.yarnpkg.com/true-case-path/-/true-case-path-1.0.3.tgz#f813b5a8c86b40da59606722b144e3225799f47d"
  dependencies:
    glob "^7.1.2"

ts-node@~7.0.0:
  version "7.0.1"
  resolved "https://registry.yarnpkg.com/ts-node/-/ts-node-7.0.1.tgz#9562dc2d1e6d248d24bc55f773e3f614337d9baf"
  dependencies:
    arrify "^1.0.0"
    buffer-from "^1.1.0"
    diff "^3.1.0"
    make-error "^1.1.1"
    minimist "^1.2.0"
    mkdirp "^0.5.1"
    source-map-support "^0.5.6"
    yn "^2.0.0"

tsickle@>=0.29.0:
  version "0.34.0"
  resolved "https://registry.yarnpkg.com/tsickle/-/tsickle-0.34.0.tgz#10187fa6401a288a65efb93a60bf28b2ff95f90b"
  dependencies:
    minimist "^1.2.0"
    mkdirp "^0.5.1"
    source-map "^0.7.3"

tslib@^1.7.1, tslib@^1.8.0, tslib@^1.8.1, tslib@^1.9.0:
  version "1.9.3"
  resolved "https://registry.yarnpkg.com/tslib/-/tslib-1.9.3.tgz#d7e4dd79245d85428c4d7e4822a79917954ca286"

tslint@~5.11.0:
  version "5.11.0"
  resolved "https://registry.yarnpkg.com/tslint/-/tslint-5.11.0.tgz#98f30c02eae3cde7006201e4c33cb08b48581eed"
  dependencies:
    babel-code-frame "^6.22.0"
    builtin-modules "^1.1.1"
    chalk "^2.3.0"
    commander "^2.12.1"
    diff "^3.2.0"
    glob "^7.1.1"
    js-yaml "^3.7.0"
    minimatch "^3.0.4"
    resolve "^1.3.2"
    semver "^5.3.0"
    tslib "^1.8.0"
    tsutils "^2.27.2"

tsutils@^2.27.2:
  version "2.29.0"
  resolved "https://registry.yarnpkg.com/tsutils/-/tsutils-2.29.0.tgz#32b488501467acbedd4b85498673a0812aca0b99"
  dependencies:
    tslib "^1.8.1"

tty-browserify@0.0.0:
  version "0.0.0"
  resolved "https://registry.yarnpkg.com/tty-browserify/-/tty-browserify-0.0.0.tgz#a157ba402da24e9bf957f9aa69d524eed42901a6"

tunnel-agent@^0.6.0:
  version "0.6.0"
  resolved "https://registry.yarnpkg.com/tunnel-agent/-/tunnel-agent-0.6.0.tgz#27a5dea06b36b04a0a9966774b290868f0fc40fd"
  dependencies:
    safe-buffer "^5.0.1"

tweetnacl@^0.14.3, tweetnacl@~0.14.0:
  version "0.14.5"
  resolved "https://registry.yarnpkg.com/tweetnacl/-/tweetnacl-0.14.5.tgz#5ae68177f192d4456269d108afa93ff8743f4f64"

type-check@~0.3.2:
  version "0.3.2"
  resolved "https://registry.yarnpkg.com/type-check/-/type-check-0.3.2.tgz#5884cab512cf1d355e3fb784f30804b2b520db72"
  dependencies:
    prelude-ls "~1.1.2"

type-is@~1.6.16:
  version "1.6.16"
  resolved "https://registry.yarnpkg.com/type-is/-/type-is-1.6.16.tgz#f89ce341541c672b25ee7ae3c73dee3b2be50194"
  dependencies:
    media-typer "0.3.0"
    mime-types "~2.1.18"

typedarray@^0.0.6:
  version "0.0.6"
  resolved "https://registry.yarnpkg.com/typedarray/-/typedarray-0.0.6.tgz#867ac74e3864187b1d3d47d996a78ec5c8830777"

typescript@3.1.6, typescript@~3.1.6:
  version "3.1.6"
  resolved "https://registry.yarnpkg.com/typescript/-/typescript-3.1.6.tgz#b6543a83cfc8c2befb3f4c8fba6896f5b0c9be68"

uglify-es@^3.3.4:
  version "3.3.9"
  resolved "https://registry.yarnpkg.com/uglify-es/-/uglify-es-3.3.9.tgz#0c1c4f0700bed8dbc124cdb304d2592ca203e677"
  dependencies:
    commander "~2.13.0"
    source-map "~0.6.1"

uglify-js@^3.0.7, uglify-js@^3.1.4:
  version "3.4.9"
  resolved "https://registry.yarnpkg.com/uglify-js/-/uglify-js-3.4.9.tgz#af02f180c1207d76432e473ed24a28f4a782bae3"
  dependencies:
    commander "~2.17.1"
    source-map "~0.6.1"

uglifyjs-webpack-plugin@^1.2.4:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/uglifyjs-webpack-plugin/-/uglifyjs-webpack-plugin-1.3.0.tgz#75f548160858163a08643e086d5fefe18a5d67de"
  dependencies:
    cacache "^10.0.4"
    find-cache-dir "^1.0.0"
    schema-utils "^0.4.5"
    serialize-javascript "^1.4.0"
    source-map "^0.6.1"
    uglify-es "^3.3.4"
    webpack-sources "^1.1.0"
    worker-farm "^1.5.2"

ultron@~1.1.0:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/ultron/-/ultron-1.1.1.tgz#9fe1536a10a664a65266a1e3ccf85fd36302bc9c"

union-value@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/union-value/-/union-value-1.0.0.tgz#5c71c34cb5bad5dcebe3ea0cd08207ba5aa1aea4"
  dependencies:
    arr-union "^3.1.0"
    get-value "^2.0.6"
    is-extendable "^0.1.1"
    set-value "^0.4.3"

unique-filename@^1.1.0, unique-filename@^1.1.1:
  version "1.1.1"
  resolved "https://registry.yarnpkg.com/unique-filename/-/unique-filename-1.1.1.tgz#1d69769369ada0583103a1e6ae87681b56573230"
  dependencies:
    unique-slug "^2.0.0"

unique-slug@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/unique-slug/-/unique-slug-2.0.1.tgz#5e9edc6d1ce8fb264db18a507ef9bd8544451ca6"
  dependencies:
    imurmurhash "^0.1.4"

unique-string@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/unique-string/-/unique-string-1.0.0.tgz#9e1057cca851abb93398f8b33ae187b99caec11a"
  dependencies:
    crypto-random-string "^1.0.0"

universalify@^0.1.0:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/universalify/-/universalify-0.1.2.tgz#b646f69be3942dabcecc9d6639c80dc105efaa66"

unpipe@1.0.0, unpipe@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/unpipe/-/unpipe-1.0.0.tgz#b2bf4ee8514aae6165b4817829d21b2ef49904ec"

unset-value@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/unset-value/-/unset-value-1.0.0.tgz#8376873f7d2335179ffb1e6fc3a8ed0dfc8ab559"
  dependencies:
    has-value "^0.3.1"
    isobject "^3.0.0"

unzip-response@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/unzip-response/-/unzip-response-2.0.1.tgz#d2f0f737d16b0615e72a6935ed04214572d56f97"

upath@^1.0.5:
  version "1.1.0"
  resolved "https://registry.yarnpkg.com/upath/-/upath-1.1.0.tgz#35256597e46a581db4793d0ce47fa9aebfc9fabd"

update-notifier@^2.3.0:
  version "2.5.0"
  resolved "https://registry.yarnpkg.com/update-notifier/-/update-notifier-2.5.0.tgz#d0744593e13f161e406acb1d9408b72cad08aff6"
  dependencies:
    boxen "^1.2.1"
    chalk "^2.0.1"
    configstore "^3.0.0"
    import-lazy "^2.1.0"
    is-ci "^1.0.10"
    is-installed-globally "^0.1.0"
    is-npm "^1.0.0"
    latest-version "^3.0.0"
    semver-diff "^2.0.0"
    xdg-basedir "^3.0.0"

uri-js@^4.2.2:
  version "4.2.2"
  resolved "https://registry.yarnpkg.com/uri-js/-/uri-js-4.2.2.tgz#94c540e1ff772956e2299507c010aea6c8838eb0"
  dependencies:
    punycode "^2.1.0"

urix@^0.1.0:
  version "0.1.0"
  resolved "https://registry.yarnpkg.com/urix/-/urix-0.1.0.tgz#da937f7a62e21fec1fd18d49b35c2935067a6c72"

url-parse-lax@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/url-parse-lax/-/url-parse-lax-1.0.0.tgz#7af8f303645e9bd79a272e7a14ac68bc0609da73"
  dependencies:
    prepend-http "^1.0.1"

url-parse@^1.4.3:
  version "1.4.4"
  resolved "https://registry.yarnpkg.com/url-parse/-/url-parse-1.4.4.tgz#cac1556e95faa0303691fec5cf9d5a1bc34648f8"
  dependencies:
    querystringify "^2.0.0"
    requires-port "^1.0.0"

url@^0.11.0:
  version "0.11.0"
  resolved "https://registry.yarnpkg.com/url/-/url-0.11.0.tgz#3838e97cfc60521eb73c525a8e55bfdd9e2e28f1"
  dependencies:
    punycode "1.3.2"
    querystring "0.2.0"

use@^3.1.0:
  version "3.1.1"
  resolved "https://registry.yarnpkg.com/use/-/use-3.1.1.tgz#d50c8cac79a19fbc20f2911f56eb973f4e10070f"

useragent@2.3.0:
  version "2.3.0"
  resolved "https://registry.yarnpkg.com/useragent/-/useragent-2.3.0.tgz#217f943ad540cb2128658ab23fc960f6a88c9972"
  dependencies:
    lru-cache "4.1.x"
    tmp "0.0.x"

util-deprecate@~1.0.1:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/util-deprecate/-/util-deprecate-1.0.2.tgz#450d4dc9fa70de732762fbd2d4a28981419a0ccf"

util@0.10.3:
  version "0.10.3"
  resolved "http://registry.npmjs.org/util/-/util-0.10.3.tgz#7afb1afe50805246489e3db7fe0ed379336ac0f9"
  dependencies:
    inherits "2.0.1"

util@^0.10.3:
  version "0.10.4"
  resolved "https://registry.yarnpkg.com/util/-/util-0.10.4.tgz#3aa0125bfe668a4672de58857d3ace27ecb76901"
  dependencies:
    inherits "2.0.3"

utils-merge@1.0.1:
  version "1.0.1"
  resolved "https://registry.yarnpkg.com/utils-merge/-/utils-merge-1.0.1.tgz#9f95710f50a267947b2ccc124741c1028427e713"

uuid@^3.0.1, uuid@^3.3.2:
  version "3.3.2"
  resolved "https://registry.yarnpkg.com/uuid/-/uuid-3.3.2.tgz#1b4af4955eb3077c501c23872fc6513811587131"

validate-npm-package-license@^3.0.1:
  version "3.0.4"
  resolved "https://registry.yarnpkg.com/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz#fc91f6b9c7ba15c857f4cb2c5defeec39d4f410a"
  dependencies:
    spdx-correct "^3.0.0"
    spdx-expression-parse "^3.0.0"

validate-npm-package-name@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/validate-npm-package-name/-/validate-npm-package-name-3.0.0.tgz#5fa912d81eb7d0c74afc140de7317f0ca7df437e"
  dependencies:
    builtins "^1.0.3"

vary@~1.1.2:
  version "1.1.2"
  resolved "https://registry.yarnpkg.com/vary/-/vary-1.1.2.tgz#2299f02c6ded30d4a5961b0b9f74524a18f634fc"

verror@1.10.0:
  version "1.10.0"
  resolved "https://registry.yarnpkg.com/verror/-/verror-1.10.0.tgz#3a105ca17053af55d6e270c1f8288682e18da400"
  dependencies:
    assert-plus "^1.0.0"
    core-util-is "1.0.2"
    extsprintf "^1.2.0"

vm-browserify@0.0.4:
  version "0.0.4"
  resolved "https://registry.yarnpkg.com/vm-browserify/-/vm-browserify-0.0.4.tgz#5d7ea45bbef9e4a6ff65f95438e0a87c357d5a73"
  dependencies:
    indexof "0.0.1"

void-elements@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/void-elements/-/void-elements-2.0.1.tgz#c066afb582bb1cb4128d60ea92392e94d5e9dbec"

watchpack@^1.5.0:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/watchpack/-/watchpack-1.6.0.tgz#4bc12c2ebe8aa277a71f1d3f14d685c7b446cd00"
  dependencies:
    chokidar "^2.0.2"
    graceful-fs "^4.1.2"
    neo-async "^2.5.0"

wbuf@^1.1.0, wbuf@^1.7.2:
  version "1.7.3"
  resolved "https://registry.yarnpkg.com/wbuf/-/wbuf-1.7.3.tgz#c1d8d149316d3ea852848895cb6a0bfe887b87df"
  dependencies:
    minimalistic-assert "^1.0.0"

webdriver-js-extender@2.1.0:
  version "2.1.0"
  resolved "https://registry.yarnpkg.com/webdriver-js-extender/-/webdriver-js-extender-2.1.0.tgz#57d7a93c00db4cc8d556e4d3db4b5db0a80c3bb7"
  dependencies:
    "@types/selenium-webdriver" "^3.0.0"
    selenium-webdriver "^3.0.1"

webdriver-manager@^12.0.6:
  version "12.1.0"
  resolved "https://registry.yarnpkg.com/webdriver-manager/-/webdriver-manager-12.1.0.tgz#f6601e52de5f0c97fc7024c889eeb2416f2f1d9d"
  dependencies:
    adm-zip "^0.4.9"
    chalk "^1.1.1"
    del "^2.2.0"
    glob "^7.0.3"
    ini "^1.3.4"
    minimist "^1.2.0"
    q "^1.4.1"
    request "^2.87.0"
    rimraf "^2.5.2"
    semver "^5.3.0"
    xml2js "^0.4.17"

webidl-conversions@^3.0.0, webidl-conversions@^3.0.1:
  version "3.0.1"
  resolved "https://registry.yarnpkg.com/webidl-conversions/-/webidl-conversions-3.0.1.tgz#24534275e2a7bc6be7bc86611cc16ae0a5654871"

webpack-core@^0.6.8:
  version "0.6.9"
  resolved "https://registry.yarnpkg.com/webpack-core/-/webpack-core-0.6.9.tgz#fc571588c8558da77be9efb6debdc5a3b172bdc2"
  dependencies:
    source-list-map "~0.1.7"
    source-map "~0.4.1"

webpack-dev-middleware@3.4.0:
  version "3.4.0"
  resolved "https://registry.yarnpkg.com/webpack-dev-middleware/-/webpack-dev-middleware-3.4.0.tgz#1132fecc9026fd90f0ecedac5cbff75d1fb45890"
  dependencies:
    memory-fs "~0.4.1"
    mime "^2.3.1"
    range-parser "^1.0.3"
    webpack-log "^2.0.0"

webpack-dev-server@3.1.10:
  version "3.1.10"
  resolved "https://registry.yarnpkg.com/webpack-dev-server/-/webpack-dev-server-3.1.10.tgz#507411bee727ee8d2fdffdc621b66a64ab3dea2b"
  dependencies:
    ansi-html "0.0.7"
    bonjour "^3.5.0"
    chokidar "^2.0.0"
    compression "^1.5.2"
    connect-history-api-fallback "^1.3.0"
    debug "^3.1.0"
    del "^3.0.0"
    express "^4.16.2"
    html-entities "^1.2.0"
    http-proxy-middleware "~0.18.0"
    import-local "^2.0.0"
    internal-ip "^3.0.1"
    ip "^1.1.5"
    killable "^1.0.0"
    loglevel "^1.4.1"
    opn "^5.1.0"
    portfinder "^1.0.9"
    schema-utils "^1.0.0"
    selfsigned "^1.9.1"
    serve-index "^1.7.2"
    sockjs "0.3.19"
    sockjs-client "1.3.0"
    spdy "^3.4.1"
    strip-ansi "^3.0.0"
    supports-color "^5.1.0"
    webpack-dev-middleware "3.4.0"
    webpack-log "^2.0.0"
    yargs "12.0.2"

webpack-log@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/webpack-log/-/webpack-log-2.0.0.tgz#5b7928e0637593f119d32f6227c1e0ac31e1b47f"
  dependencies:
    ansi-colors "^3.0.0"
    uuid "^3.3.2"

webpack-merge@4.1.4:
  version "4.1.4"
  resolved "https://registry.yarnpkg.com/webpack-merge/-/webpack-merge-4.1.4.tgz#0fde38eabf2d5fd85251c24a5a8c48f8a3f4eb7b"
  dependencies:
    lodash "^4.17.5"

webpack-sources@1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/webpack-sources/-/webpack-sources-1.2.0.tgz#18181e0d013fce096faf6f8e6d41eeffffdceac2"
  dependencies:
    source-list-map "^2.0.0"
    source-map "~0.6.1"

webpack-sources@1.3.0, webpack-sources@^1.1.0, webpack-sources@^1.2.0, webpack-sources@^1.3.0:
  version "1.3.0"
  resolved "https://registry.yarnpkg.com/webpack-sources/-/webpack-sources-1.3.0.tgz#2a28dcb9f1f45fe960d8f1493252b5ee6530fa85"
  dependencies:
    source-list-map "^2.0.0"
    source-map "~0.6.1"

webpack-subresource-integrity@1.1.0-rc.6:
  version "1.1.0-rc.6"
  resolved "https://registry.yarnpkg.com/webpack-subresource-integrity/-/webpack-subresource-integrity-1.1.0-rc.6.tgz#37f6f1264e1eb378e41465a98da80fad76ab8886"
  dependencies:
    webpack-core "^0.6.8"

webpack@4.23.1:
  version "4.23.1"
  resolved "https://registry.yarnpkg.com/webpack/-/webpack-4.23.1.tgz#db7467b116771ae020c58bdfe2a0822785bb8239"
  dependencies:
    "@webassemblyjs/ast" "1.7.10"
    "@webassemblyjs/helper-module-context" "1.7.10"
    "@webassemblyjs/wasm-edit" "1.7.10"
    "@webassemblyjs/wasm-parser" "1.7.10"
    acorn "^5.6.2"
    acorn-dynamic-import "^3.0.0"
    ajv "^6.1.0"
    ajv-keywords "^3.1.0"
    chrome-trace-event "^1.0.0"
    enhanced-resolve "^4.1.0"
    eslint-scope "^4.0.0"
    json-parse-better-errors "^1.0.2"
    loader-runner "^2.3.0"
    loader-utils "^1.1.0"
    memory-fs "~0.4.1"
    micromatch "^3.1.8"
    mkdirp "~0.5.0"
    neo-async "^2.5.0"
    node-libs-browser "^2.0.0"
    schema-utils "^0.4.4"
    tapable "^1.1.0"
    uglifyjs-webpack-plugin "^1.2.4"
    watchpack "^1.5.0"
    webpack-sources "^1.3.0"

websocket-driver@>=0.5.1:
  version "0.7.0"
  resolved "https://registry.yarnpkg.com/websocket-driver/-/websocket-driver-0.7.0.tgz#0caf9d2d755d93aee049d4bdd0d3fe2cca2a24eb"
  dependencies:
    http-parser-js ">=0.4.0"
    websocket-extensions ">=0.1.1"

websocket-extensions@>=0.1.1:
  version "0.1.3"
  resolved "https://registry.yarnpkg.com/websocket-extensions/-/websocket-extensions-0.1.3.tgz#5d2ff22977003ec687a4b87073dfbbac146ccf29"

whatwg-url@^2.0.1:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/whatwg-url/-/whatwg-url-2.0.1.tgz#5396b2043f020ee6f704d9c45ea8519e724de659"
  dependencies:
    tr46 "~0.0.3"
    webidl-conversions "^3.0.0"

when@~3.6.x:
  version "3.6.4"
  resolved "https://registry.yarnpkg.com/when/-/when-3.6.4.tgz#473b517ec159e2b85005497a13983f095412e34e"

which-module@^1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/which-module/-/which-module-1.0.0.tgz#bba63ca861948994ff307736089e3b96026c2a4f"

which-module@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/which-module/-/which-module-2.0.0.tgz#d9ef07dce77b9902b8a3a8fa4b31c3e3f7e6e87a"

which@1, which@^1.1.1, which@^1.2.1, which@^1.2.9, which@^1.3.1:
  version "1.3.1"
  resolved "https://registry.yarnpkg.com/which/-/which-1.3.1.tgz#a45043d54f5805316da8d62f9f50918d3da70b0a"
  dependencies:
    isexe "^2.0.0"

wide-align@^1.1.0:
  version "1.1.3"
  resolved "https://registry.yarnpkg.com/wide-align/-/wide-align-1.1.3.tgz#ae074e6bdc0c14a431e804e624549c633b000457"
  dependencies:
    string-width "^1.0.2 || 2"

widest-line@^2.0.0:
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/widest-line/-/widest-line-2.0.1.tgz#7438764730ec7ef4381ce4df82fb98a53142a3fc"
  dependencies:
    string-width "^2.1.1"

wordwrap@^1.0.0, wordwrap@~1.0.0:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/wordwrap/-/wordwrap-1.0.0.tgz#27584810891456a4171c8d0226441ade90cbcaeb"

wordwrap@~0.0.2:
  version "0.0.3"
  resolved "https://registry.yarnpkg.com/wordwrap/-/wordwrap-0.0.3.tgz#a3d5da6cd5c0bc0008d37234bbaf1bed63059107"

worker-farm@^1.5.2:
  version "1.6.0"
  resolved "https://registry.yarnpkg.com/worker-farm/-/worker-farm-1.6.0.tgz#aecc405976fab5a95526180846f0dba288f3a4a0"
  dependencies:
    errno "~0.1.7"

wrap-ansi@^2.0.0:
  version "2.1.0"
  resolved "http://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz#d8fc3d284dd05794fe84973caecdd1cf824fdd85"
  dependencies:
    string-width "^1.0.1"
    strip-ansi "^3.0.1"

wrappy@1:
  version "1.0.2"
  resolved "https://registry.yarnpkg.com/wrappy/-/wrappy-1.0.2.tgz#b5243d8f3ec1aa35f1364605bc0d1036e30ab69f"

write-file-atomic@^2.0.0:
  version "2.3.0"
  resolved "https://registry.yarnpkg.com/write-file-atomic/-/write-file-atomic-2.3.0.tgz#1ff61575c2e2a4e8e510d6fa4e243cce183999ab"
  dependencies:
    graceful-fs "^4.1.11"
    imurmurhash "^0.1.4"
    signal-exit "^3.0.2"

ws@~3.3.1:
  version "3.3.3"
  resolved "https://registry.yarnpkg.com/ws/-/ws-3.3.3.tgz#f1cf84fe2d5e901ebce94efaece785f187a228f2"
  dependencies:
    async-limiter "~1.0.0"
    safe-buffer "~5.1.0"
    ultron "~1.1.0"

xdg-basedir@^3.0.0:
  version "3.0.0"
  resolved "https://registry.yarnpkg.com/xdg-basedir/-/xdg-basedir-3.0.0.tgz#496b2cc109eca8dbacfe2dc72b603c17c5870ad4"

"xml-name-validator@>= 2.0.1 < 3.0.0":
  version "2.0.1"
  resolved "https://registry.yarnpkg.com/xml-name-validator/-/xml-name-validator-2.0.1.tgz#4d8b8f1eccd3419aa362061becef515e1e559635"

xml2js@^0.4.17:
  version "0.4.19"
  resolved "https://registry.yarnpkg.com/xml2js/-/xml2js-0.4.19.tgz#686c20f213209e94abf0d1bcf1efaa291c7827a7"
  dependencies:
    sax ">=0.6.0"
    xmlbuilder "~9.0.1"

xmlbuilder@~9.0.1:
  version "9.0.7"
  resolved "http://registry.npmjs.org/xmlbuilder/-/xmlbuilder-9.0.7.tgz#132ee63d2ec5565c557e20f4c22df9aca686b10d"

xmldom@^0.1.22:
  version "0.1.27"
  resolved "https://registry.yarnpkg.com/xmldom/-/xmldom-0.1.27.tgz#d501f97b3bdb403af8ef9ecc20573187aadac0e9"

xmlhttprequest-ssl@~1.5.4:
  version "1.5.5"
  resolved "https://registry.yarnpkg.com/xmlhttprequest-ssl/-/xmlhttprequest-ssl-1.5.5.tgz#c2876b06168aadc40e57d97e81191ac8f4398b3e"

xregexp@4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/xregexp/-/xregexp-4.0.0.tgz#e698189de49dd2a18cc5687b05e17c8e43943020"

xtend@^4.0.0, xtend@~4.0.1:
  version "4.0.1"
  resolved "https://registry.yarnpkg.com/xtend/-/xtend-4.0.1.tgz#a5c6d532be656e23db820efb943a1f04998d63af"

xxhashjs@^0.2.1:
  version "0.2.2"
  resolved "https://registry.yarnpkg.com/xxhashjs/-/xxhashjs-0.2.2.tgz#8a6251567621a1c46a5ae204da0249c7f8caa9d8"
  dependencies:
    cuint "^0.2.2"

y18n@^3.2.1:
  version "3.2.1"
  resolved "https://registry.yarnpkg.com/y18n/-/y18n-3.2.1.tgz#6d15fba884c08679c0d77e88e7759e811e07fa41"

"y18n@^3.2.1 || ^4.0.0", y18n@^4.0.0:
  version "4.0.0"
  resolved "https://registry.yarnpkg.com/y18n/-/y18n-4.0.0.tgz#95ef94f85ecc81d007c264e190a120f0a3c8566b"

yallist@^2.1.2:
  version "2.1.2"
  resolved "https://registry.yarnpkg.com/yallist/-/yallist-2.1.2.tgz#1c11f9218f076089a47dd512f93c6699a6a81d52"

yallist@^3.0.0, yallist@^3.0.2:
  version "3.0.3"
  resolved "https://registry.yarnpkg.com/yallist/-/yallist-3.0.3.tgz#b4b049e314be545e3ce802236d6cd22cd91c3de9"

yargs-parser@^10.1.0:
  version "10.1.0"
  resolved "https://registry.yarnpkg.com/yargs-parser/-/yargs-parser-10.1.0.tgz#7202265b89f7e9e9f2e5765e0fe735a905edbaa8"
  dependencies:
    camelcase "^4.1.0"

yargs-parser@^5.0.0:
  version "5.0.0"
  resolved "https://registry.yarnpkg.com/yargs-parser/-/yargs-parser-5.0.0.tgz#275ecf0d7ffe05c77e64e7c86e4cd94bf0e1228a"
  dependencies:
    camelcase "^3.0.0"

yargs-parser@^7.0.0:
  version "7.0.0"
  resolved "https://registry.yarnpkg.com/yargs-parser/-/yargs-parser-7.0.0.tgz#8d0ac42f16ea55debd332caf4c4038b3e3f5dfd9"
  dependencies:
    camelcase "^4.1.0"

yargs@12.0.2:
  version "12.0.2"
  resolved "https://registry.yarnpkg.com/yargs/-/yargs-12.0.2.tgz#fe58234369392af33ecbef53819171eff0f5aadc"
  dependencies:
    cliui "^4.0.0"
    decamelize "^2.0.0"
    find-up "^3.0.0"
    get-caller-file "^1.0.1"
    os-locale "^3.0.0"
    require-directory "^2.1.1"
    require-main-filename "^1.0.1"
    set-blocking "^2.0.0"
    string-width "^2.0.0"
    which-module "^2.0.0"
    y18n "^3.2.1 || ^4.0.0"
    yargs-parser "^10.1.0"

yargs@9.0.1:
  version "9.0.1"
  resolved "https://registry.yarnpkg.com/yargs/-/yargs-9.0.1.tgz#52acc23feecac34042078ee78c0c007f5085db4c"
  dependencies:
    camelcase "^4.1.0"
    cliui "^3.2.0"
    decamelize "^1.1.1"
    get-caller-file "^1.0.1"
    os-locale "^2.0.0"
    read-pkg-up "^2.0.0"
    require-directory "^2.1.1"
    require-main-filename "^1.0.1"
    set-blocking "^2.0.0"
    string-width "^2.0.0"
    which-module "^2.0.0"
    y18n "^3.2.1"
    yargs-parser "^7.0.0"

yargs@^7.0.0:
  version "7.1.0"
  resolved "https://registry.yarnpkg.com/yargs/-/yargs-7.1.0.tgz#6ba318eb16961727f5d284f8ea003e8d6154d0c8"
  dependencies:
    camelcase "^3.0.0"
    cliui "^3.2.0"
    decamelize "^1.1.1"
    get-caller-file "^1.0.1"
    os-locale "^1.4.0"
    read-pkg-up "^1.0.1"
    require-directory "^2.1.1"
    require-main-filename "^1.0.1"
    set-blocking "^2.0.0"
    string-width "^1.0.2"
    which-module "^1.0.0"
    y18n "^3.2.1"
    yargs-parser "^5.0.0"

yarn@^1.12.3:
  version "1.12.3"
  resolved "https://registry.yarnpkg.com/yarn/-/yarn-1.12.3.tgz#fb4599bf1f8da01552bcc7e1571dfd4e53788203"

yeast@0.1.2:
  version "0.1.2"
  resolved "https://registry.yarnpkg.com/yeast/-/yeast-0.1.2.tgz#008e06d8094320c372dbc2f8ed76a0ca6c8ac419"

yn@^2.0.0:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/yn/-/yn-2.0.0.tgz#e5adabc8acf408f6385fc76495684c88e6af689a"

zone.js@~0.8.26:
  version "0.8.26"
  resolved "https://registry.yarnpkg.com/zone.js/-/zone.js-0.8.26.tgz#7bdd72f7668c5a7ad6b118148b4ea39c59d08d2d"
export * from './src/public_api'
