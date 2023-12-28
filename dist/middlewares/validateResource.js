"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.body,
            params: req.params,
        });
    }
    catch (e) {
        return res.status(400).send(e.error);
    }
};
exports.default = validate;
