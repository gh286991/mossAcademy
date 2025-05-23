// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `src/content/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: false }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: ".",
  documentTypes: [Article]
});
export {
  Article,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FIW3PSOF.mjs.map
