"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceInMonths = void 0;
const differenceInMonths = (dateTo, dateFrom) => {
    const diffInMs = dateTo - dateFrom;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const months = Math.floor(diffInDays / 30);
    const days = Math.floor(diffInDays % 30);
    return {
        months,
        days,
    };
};
exports.differenceInMonths = differenceInMonths;
//# sourceMappingURL=calcilate.diff.dates.js.map