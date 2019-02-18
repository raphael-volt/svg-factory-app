/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';

/**
 * If the application will be indexed by Google Search, the following is required.
 * Googlebot uses a renderer based on Chrome 41.
 * https://developers.google.com/search/docs/guides/rendering
 **/
// import 'core-js/es6/array';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */

// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
// (window as any).__Zone_enable_cross_context_check = true;

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
if (!CSSStyleSheet.prototype.deleteRule)
    CSSStyleSheet.prototype.deleteRule = CSSStyleSheet.prototype.removeRule;
(function (Sheet_proto) {
    var originalInsertRule = Sheet_proto.insertRule;

    if (originalInsertRule.length === 2) { // 2 mandatory arguments: (selector, rules)
        Sheet_proto.insertRule = function (selectorAndRule) {
            // First, separate the selector from the rule
            a: for (var i = 0, Len = selectorAndRule.length, isEscaped = 0, newCharCode = 0; i !== Len; ++i) {
                newCharCode = selectorAndRule.charCodeAt(i);
                if (!isEscaped && (newCharCode === 123)) { // 123 = "{".charCodeAt(0)
                    // Secondly, find the last closing bracket
                    var openBracketPos = i, closeBracketPos = -1;

                    for (; i !== Len; ++i) {
                        newCharCode = selectorAndRule.charCodeAt(i);
                        if (!isEscaped && (newCharCode === 125)) { // 125 = "}".charCodeAt(0)
                            closeBracketPos = i;
                        }
                        isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
                    }

                    if (closeBracketPos === -1) break a; // No closing bracket was found!
                  /*else*/ return originalInsertRule.call(
                        this, // the sheet to be changed
                        selectorAndRule.substring(0, openBracketPos), // The selector
                        selectorAndRule.substring(closeBracketPos), // The rule
                        arguments[3] // The insert index
                    );
                }

                // Works by if the char code is a backslash, then isEscaped
                // gets flipped (XOR-ed by 1), and if it is not a backslash
                // then isEscaped gets XORed by itself, zeroing it
                isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
            }
            // Else, there is no unescaped bracket
            return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
        };
    }
})(CSSStyleSheet.prototype);