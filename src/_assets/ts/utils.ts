export const isHtmlElement = (element: unknown): element is HTMLElement => {
  return typeof element === 'object' && Object.prototype.hasOwnProperty.call(element, 'style')
}
