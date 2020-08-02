import {Router, Status} from "https://deno.land/x/oak/mod.ts";
import {jwtAuth} from "../middlewares/jwt.ts";

export function PrivateRoutes(router: Router) {
    // call our middleware before our private route
    return router.get("/private", jwtAuth, async (ctx) => {
        ctx.response.status = Status.OK;
        ctx.response.body = {message: "Conntected !"};
    });
}
