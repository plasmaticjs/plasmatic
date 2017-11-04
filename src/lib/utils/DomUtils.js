function isHtmlTag(tag: string): boolean {
  const tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
    'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details',
    'dfn', 'div', 'dl', 'doctype', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
    'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
    'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label',
    'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav',
    'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre',
    'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
    'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
    'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
    'u', 'ul', 'var', 'video', 'wbr'];

  return tag !== null && typeof tag === 'string' && tags.indexOf(tag.toLowerCase()) > -1;
}

function setProps(domNode: HTMLElement, props: PropsType) {
  if (props !== null && typeof props === 'object') {
    Object.keys(props).forEach((name: string) => {
      if (Object.prototype.hasOwnProperty.call(props, name)) {
        const value = props[name];
        if (name === 'className') {
          domNode.setAttribute('class', value);
        } else {
          domNode.setAttribute(name, value);
        }
      }
    });
  }
}

export default {
  isHtmlTag,
  setProps,
};
