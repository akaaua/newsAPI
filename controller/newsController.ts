import NewsService from "../services/newsService";
import Helper from "../infra/helper";
import * as HttpStatus from "http-status";


class NewsController {
  get(req, res) {
    NewsService.get()
      .then((news) => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  getByID(req, res) {
    const _id = req.params.id;

    NewsService.getById(_id)
      .then((news) => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
    let vm = req.body;

    NewsService.create(vm)
      .then(news =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Notícia cadastrada com sucesso!"
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  update(req, res) {
    const _id = req.params.id;
    let news = req.body;

    NewsService.update(_id, news)
      .then((news) =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          `${news.title} foi atualizada com sucesso`
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  delete(req, res) {
    const _id = req.params.id;

    NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!")
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
