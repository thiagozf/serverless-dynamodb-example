import { create, get, list, update } from "./pages-functions";
import { withTestEvent, withTestContext, clearTable } from "~/test/utils";
import { decode } from "~/utils/json";
import { createPage } from "./pages-repository";
import { DeepPartial } from "~/utils/types";
import { Page, PageEditable } from "./pages-model";

describe("Pages", () => {
  beforeEach(async () => {
    // Clear table between tests
    await clearTable();
  });

  it("should create page", async () => {
    const pageInput = { name: "Testing" };
    const result = await create(withTestEvent(pageInput), withTestContext());

    expect(result.statusCode).toBe(200);
    expect(decode(result.body)).toEqual(
      expect.objectContaining({
        ...pageInput,
        id: expect.any(String),
        tenant: expect.any(String),
        createdAt: expect.any(String),
        createdBy: "user:thiagozf"
      })
    );
  });

  it("should get page", async () => {
    const page: DeepPartial<Page> = {
      tenant: "ema",
      id: "test-page",
      name: "Test page",
      status: "PREVIEW",
      createdBy: "user:thiagozf"
    };
    await createPage(page);

    const result = await get(
      withTestEvent({}, { id: "test-page" }),
      withTestContext()
    );

    expect(result.statusCode).toBe(200);
    expect(decode(result.body)).toEqual(expect.objectContaining(page));
  });

  it("should update page", async () => {
    const page: DeepPartial<Page> = {
      tenant: "ema",
      id: "test-page",
      name: "Test page",
      status: "PREVIEW",
      createdBy: "user:thiagozf"
    };
    await createPage(page);

    const updatedPage: PageEditable = {
      name: "Updated page",
      status: "PUBLISHED"
    };

    const result = await update(
      withTestEvent(updatedPage, { id: "test-page" }),
      withTestContext()
    );

    expect(result.statusCode).toBe(200);
    expect(decode(result.body)).toEqual(expect.objectContaining(updatedPage));
  });

  it("should list pages", async () => {
    const page: DeepPartial<Page> = {
      tenant: "ema",
      id: "test-page",
      name: "Test page",
      status: "PREVIEW",
      createdBy: "user:thiagozf"
    };
    await createPage(page);

    const result = await list(withTestEvent(), withTestContext());

    expect(result.statusCode).toBe(200);
    expect(decode(result.body)).toEqual(
      expect.arrayContaining([expect.objectContaining(page)])
    );
  });
});
