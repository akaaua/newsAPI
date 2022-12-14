import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import Database from "./infra/db";
import NewsController from "./controller/newsController";
import auth from "./infra/auth";

class StartUp {
  public app: express.Application;
  private _database: Database;
  private _bodyParser;

  constructor() {
    this.app = express();
    this._database = new Database();
    this._database.createConnection();
    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET, OPTIONS, PUT, POST, DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    this.app.use(auth.validate);

    this.app.route("/api/v1/news").get(NewsController.get);
    this.app.route("/api/v1/news").post(NewsController.create);
    this.app.route("/api/v1/news/:id").get(NewsController.getByID);
    this.app.route("/api/v1/news").put(NewsController.update);
    this.app.route("/api/v1/news:id").delete(NewsController.delete);
  }
}

export default new StartUp();
