import { decode } from "~/validation";
import { handler, ok } from "~/rest";
import { asCreateData, asUpdateData } from "~/model";
import { Page, PageEditable } from "./pages-model";
import {
  getPages,
  createPage,
  getPageById,
  updatePage
} from "./pages-repository";
import "source-map-support/register";

export const list = handler(async args => {
  const pages: Page[] = await getPages(args.tenant);
  return ok(pages);
});

export const get = handler(async args => {
  const page: Page = await getPageById(
    args.tenant,
    args.event.pathParameters.id
  );
  return ok(page);
});

export const update = handler(async args => {
  const tenant = args.tenant;
  const id = args.event.pathParameters.id;
  const page: PageEditable = await decode(PageEditable, asUpdateData(args));
  const response: Page = await updatePage(tenant, id, page);
  return ok(response);
});

export const create = handler(async args => {
  const page: PageEditable = await decode(PageEditable, asCreateData(args));
  const response: Page = await createPage(page);
  return ok(response);
});
