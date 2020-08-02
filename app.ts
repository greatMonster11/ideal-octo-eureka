import {Application, Router, Status} from "https://deno.land/x/oak/mod.ts";

// Initilize app
const app = new Application()

// Initilize router
const router = new Router()

// Create first default route
router.get("/", (ctx: any) => {
    ctx.response.status = Status.OK;
    ctx.response.body = {message: "It's work OK"}
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log("🚀 Deno start !")
await app.listen("0.0.0.0:3001")
