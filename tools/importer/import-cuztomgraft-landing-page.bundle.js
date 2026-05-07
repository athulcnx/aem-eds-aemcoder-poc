/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-cuztomgraft-landing-page.js
  var import_cuztomgraft_landing_page_exports = {};
  __export(import_cuztomgraft_landing_page_exports, {
    default: () => import_cuztomgraft_landing_page_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    function getBackgroundImage(el) {
      if (!el) return null;
      const style = el.style && el.style.backgroundImage;
      const computed = el.ownerDocument.defaultView ? el.ownerDocument.defaultView.getComputedStyle(el).backgroundImage : "";
      const bgValue = style || computed || "";
      const match = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
      if (match && match[1]) {
        const img = document.createElement("img");
        img.src = match[1];
        return img;
      }
      return null;
    }
    const bannerContainer = element.querySelector(".file-upload-form__banner");
    let heroImage = element.querySelector(":scope > img, :scope > picture");
    if (!heroImage && bannerContainer) {
      heroImage = bannerContainer.querySelector("img, picture");
    }
    if (!heroImage) {
      heroImage = getBackgroundImage(bannerContainer);
    }
    if (!heroImage) {
      heroImage = getBackgroundImage(element);
    }
    const cells = [];
    if (heroImage) {
      const imageFragment = document.createDocumentFragment();
      imageFragment.appendChild(document.createComment(" field:image "));
      imageFragment.appendChild(heroImage);
      cells.push([imageFragment]);
    } else {
      cells.push([""]);
    }
    cells.push([""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.before(block);
    const remaining = element.querySelectorAll("table");
    remaining.forEach((table) => element.before(table));
    element.remove();
  }

  // tools/importer/parsers/form.js
  function parse2(element, { document }) {
    var _a;
    const formId = element.getAttribute("id") || ((_a = element.querySelector("form")) == null ? void 0 : _a.getAttribute("id")) || "form-definition";
    const formJsonUrl = document.createElement("a");
    formJsonUrl.href = `/forms/${formId}.json`;
    formJsonUrl.textContent = `/forms/${formId}.json`;
    const formContentPath = document.createElement("p");
    formContentPath.textContent = `/content/forms/af/${formId}`;
    const cells = [
      [formJsonUrl],
      [formContentPath]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/cuztomgraft-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#emea-hcp"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.global-header",
        "footer.global-footer",
        "#demo-form-alert",
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/cuztomgraft-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName !== H2.after) return;
    const document = element.ownerDocument;
    const blockTables = element.querySelectorAll("table");
    if (blockTables.length < 2) return;
    for (let i = 1; i < blockTables.length; i++) {
      const table = blockTables[i];
      const prev = table.previousElementSibling;
      if (!prev || prev.tagName !== "HR") {
        const hr = document.createElement("hr");
        table.before(hr);
      }
    }
  }

  // tools/importer/import-cuztomgraft-landing-page.js
  var parsers = {
    "hero": parse,
    "form": parse2
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "cuztomgraft-landing-page",
    description: "CuztomGraft product landing page with hero, product information, features, and call-to-action sections",
    urls: [
      "https://cuztomgraft.zimvie.com/en-GB"
    ],
    blocks: [
      {
        name: "hero",
        instances: [".file-upload-form__background"]
      },
      {
        name: "form",
        instances: [".file-upload-form"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".file-upload-form__background",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Form",
        selector: ".file-upload-form",
        style: null,
        blocks: ["form"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Disclaimer",
        selector: ".container.rhythm--large.grid__gap--none",
        style: null,
        blocks: [],
        defaultContent: [".heading.heading--h3.heading--size-h4:last-of-type", ".container.rhythm--large.grid__gap--none i p"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          let depth = 0;
          let node = element;
          while (node.parentElement) {
            depth++;
            node = node.parentElement;
          }
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
            depth
          });
        });
      });
    });
    pageBlocks.sort((a, b) => b.depth - a.depth);
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_cuztomgraft_landing_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_cuztomgraft_landing_page_exports);
})();
