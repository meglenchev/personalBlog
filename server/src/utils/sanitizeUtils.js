import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const SANITIZE_CONFIG = {
    ALLOWED_TAGS: ['p', 'b', 'i', 'u', 's', 'strong', 'em', 'strike', 'blockquote', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'a', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'style', 'class']
};

export const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, SANITIZE_CONFIG);
};