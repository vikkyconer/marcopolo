const Router = require("koa-router");
const { wrapHandlerModule } = require("./requestResponseWrapper");
const handler = wrapHandlerModule(require("./handler"));

const router = new Router();

router.get("/", handler.getNumber);

module.exports = router
