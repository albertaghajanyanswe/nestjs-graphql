"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryStatement = void 0;
function generateQueryStatement(options) {
    let string = "";
    const optionsArray = Object.keys(options);
    for (let i = 0; i < optionsArray.length; i++) {
        if (string) {
            string = string + ` and "${optionsArray[i]}" =:${optionsArray[i]}`;
        }
        else {
            string = string + `"${optionsArray[i]}" =:${optionsArray[i]}`;
        }
    }
    return string;
}
exports.generateQueryStatement = generateQueryStatement;
//# sourceMappingURL=query.statement.js.map