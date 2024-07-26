"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}
exports.pick = pick;
