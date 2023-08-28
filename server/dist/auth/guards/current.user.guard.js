"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowAny = exports.CurrentUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
const common_2 = require("@nestjs/common");
const AllowAny = () => (0, common_2.SetMetadata)("allow-any", true);
exports.AllowAny = AllowAny;
//# sourceMappingURL=current.user.guard.js.map