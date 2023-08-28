export function collectMessage(message, options) {
  let result = message;
  for (let i = 0; i < options.length; i++) {
    result = result.replace(`$${i + 1}`, options[i]);
  }
  return result;
}
