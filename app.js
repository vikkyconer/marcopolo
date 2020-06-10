const router = require("./router");
const Koa = require("koa");
const koaBody = require("koa-body");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(koaBody());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3333, () => {
	console.log(`Marcopolo: 3333`)
})

module.exports = app;
