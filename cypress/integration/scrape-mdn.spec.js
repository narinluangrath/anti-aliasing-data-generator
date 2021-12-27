const properties = [
  "all",
  "angle",
  "animation",
  "appearance",
  "background",
  "border",
  "bottom",
  "clear",
  "clip",
  "color",
  "columns",
  "contain",
  "content",
  "cursor",
  "dimension",
  "direction",
  "display",
  "filter",
  "flex",
  "float",
  "font",
  "frequency",
  "gap",
  "gradient",
  "grid",
  "height",
  "hyphens",
  "ident",
  "image",
  "inherit",
  "initial",
  "inset",
  "integer",
  "isolation",
  "left",
  "length",
  "margin",
  "mask",
  "number",
  "offset",
  "opacity",
  "order",
  "orphans",
  "outline",
  "overflow",
  "padding",
  "percentage",
  "perspective",
  "position",
  "quotes",
  "ratio",
  "resize",
  "resolution",
  "revert",
  "right",
  "rotate",
  "scale",
  "shape",
  "string",
  "time",
  "top",
  "transform",
  "transition",
  "translate",
  "unset",
  "visibility",
  "widows",
  "width"
];

const css = {}

describe('scrape', () => {
  properties.forEach(property => {
    it(property, () => {
      cy.visit(`https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`);
      cy.document().then(document => {
        const examples = document
          ?.querySelector('h2#syntax + div')
          ?.firstElementChild
          ?.innerText
          ?.split("\n")
          ?.filter(txt => txt.match(/.+:.+;$/));
          
        if (examples?.length) {
          css[property] = examples;
        }
      })
    })
  });

  it('save to file', () => {
    cy.task('saveJson', { obj: css, fileName: 'css.json' });
  })
})