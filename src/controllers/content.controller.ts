import { Request, Response } from "express";
import logger from "../config/logger";
import httpStatus from "http-status";
import contentService from "../services/content.service";
import catchAsync from "../utils/catchAsync";
import { pick } from "../utils/pick";

const addPage = catchAsync(async (req: Request, res: Response) => {
  const page = await contentService.addPage(req.body);
  res.status(httpStatus.CREATED).send(page);
});

const addSectionOfContent = catchAsync(async (req: Request, res: Response) => {
  const section = await contentService.addSectionOfContent(
    req.params.pageId,
    req.body
  );
  res.status(httpStatus.CREATED).send(section);
});

const getAllPages = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "alias"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "search"]);
  const result = await contentService.getPages(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getPageById = catchAsync(async (req: Request, res: Response) => {
  const page = await contentService.getPageById(req.params.id);
  res.status(httpStatus.OK).send(page);
});

const getPageByAlias = catchAsync(async (req: Request, res: Response) => {
  const page = await contentService.getPageByAlias(req.params.alias);
  res.status(httpStatus.OK).send(page);
});

const updateSectionOfContentById = catchAsync(
  async (req: Request, res: Response) => {
    const section = await contentService.updateSectionOfContentById(
      req.params.pageId,
      req.params.sectionId,
      req.body
    );
    res.status(httpStatus.OK).send(section);
  }
);

const updatePageById = catchAsync(async (req: Request, res: Response) => {
  const page = await contentService.updatePageById(req.params.id, req.body);
  res.status(httpStatus.OK).send(page);
});

const deletePageById = catchAsync(async (req: Request, res: Response) => {
  const page = await contentService.deletePageById(req.params.id);
  res.status(httpStatus.OK).send(page);
});

const deleteSectionOfContentById = catchAsync(
  async (req: Request, res: Response) => {
    const section = await contentService.deleteSectionOfContentById(
      req.params.pageId,
      req.params.sectionId
    );
    res.status(httpStatus.OK).send(section);
  }
);

export default {
  addPage,
  addSectionOfContent,
  getAllPages,
  getPageById,
  getPageByAlias,
  updateSectionOfContentById,
  updatePageById,
  deletePageById,
  deleteSectionOfContentById,
};
