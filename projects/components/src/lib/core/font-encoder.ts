import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
// Get binary file using XMLHttpRequest
const getBinary = (file): Observable<string> => {
    return Observable.create(
        (observer: Observer<string>) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", file);
            xhr.overrideMimeType("text/plain; charset=x-user-defined")
            xhr.addEventListener('error', (error) => {
                observer.error(error)
            })
            xhr.addEventListener('loadend', event => {
                observer.next(xhr.responseText)
                observer.complete()
            })
            xhr.send(null);
        }
    )
}

// Base64 encode binary string
// Stolen from http://stackoverflow.com/questions/7370943/retrieving-binary-file-content-using-javascript-base64-encode-it-and-reverse-de
const base64Encode = (str: string) => {
    const CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let out: string = ""
    let i: number = 0
    let len: number = str.length
    let c1: number;
    let c2: number;
    let c3: number;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}
export const encodeFont = (url: string): Observable<string> => {
    return getBinary(url).pipe(
        map((bynary: string) => {
            return base64Encode(bynary)
        })
    )
}
/*
// When menu is clicked, load font file, encode it and inline to the doc <head>
document.querySelector("button").addEventListener("click", function () {
    var base64EncodedFont = base64Encode(getBinary("http://fonts.gstatic.com/s/shadowsintolight/v6/clhLqOv7MXn459PTh0gXYMdQSYiIg2Yb25Hg13-ek1M.woff"));
    var fontCode = "@font-face { font-family: 'viljamis'; src: url('data:application/font-woff;base64," + base64EncodedFont + "') format('woff'); font-style: normal; font-weight: normal }";
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = fontCode;
    } else {
        styleElement.innerHTML = fontCode;
    }
    document.head.appendChild(styleElement);

    // Finally set the new font-family to some element
    element.style.fontFamily = "'viljamis', sans-serif";
}, false);
*/