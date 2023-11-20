import { Express, Request, Response } from "express";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => res.send("lee pal ya ml"));
};

export default routes;
