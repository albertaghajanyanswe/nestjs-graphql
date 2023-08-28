"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectMessage = void 0;
function collectMessage(message, options) {
    let result = message;
    for (let i = 0; i < options.length; i++) {
        result = result.replace(`$${i + 1}`, options[i]);
    }
    return result;
}
exports.collectMessage = collectMessage;
//# sourceMappingURL=collect.message.js.map