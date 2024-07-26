import express from "express";
import validate from "../middlewares/validate";
import contentValidation from "../validators/content.validation";
import contentController from "../controllers/content.controller";

const router = express.Router();

router.post(
  "/",
  validate(contentValidation.addContentSchema),
  contentController.addPage
);

router.post(
  "/:pageId",
  validate(contentValidation.addSectionOfContentSchema),
  contentController.addSectionOfContent
);

router.get("/", contentController.getAllPages);

router.get(
  "/:id",
  validate(contentValidation.getPageByIdSchema),
  contentController.getPageById
);

router.get(
  "/alias/:alias",
  validate(contentValidation.getPageByAliasSchema),
  contentController.getPageByAlias
);

router.put(
  "/:pageId/:sectionId",
  validate(contentValidation.updateSectionOfContentByIdSchema),
  contentController.updateSectionOfContentById
);

router.put(
  "/:id",
  validate(contentValidation.updatePageSchema),
  contentController.updatePageById
);

router.delete(
  "/:id",
  validate(contentValidation.deletePageSchema),
  contentController.deletePageById
);

router.delete(
  "/:pageId/:sectionId",
  validate(contentValidation.deleteSectionOfContentSchema),
  contentController.deleteSectionOfContentById
);

export default router;
