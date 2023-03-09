"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const app = (0, express_1.default)();
const port = 8080;
app.get("/", (req, res) => {
    res.send("Express server with TypeScript");
});
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=index.js.map