import { GqlExecutionContext } from "@nestjs/graphql";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);

import { SetMetadata } from "@nestjs/common";
export const AllowAny = () => SetMetadata("allow-any", true);
