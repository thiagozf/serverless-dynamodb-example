import * as t from "io-ts";
import { withDefault } from "~/model";
import { Id } from "~/model/id-model";
import { Audit } from "~/model/audit-model";
import { Tenancy } from "~/model/multitenant-model";

const PageEditable = t.intersection([
  t.type({
    name: t.string,
    status: withDefault(
      t.keyof({
        PREVIEW: null,
        PUBLISHED: null
      }),
      "PREVIEW"
    )
  }),
  t.partial({
    content: t.string
  })
]);

type PageEditable = t.TypeOf<typeof PageEditable>;

const Page = t.intersection([Id, Tenancy, Audit, PageEditable]);

type Page = t.TypeOf<typeof Page>;

export { Page, PageEditable };
