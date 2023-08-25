export function generateQueryStatement(options): string {
  let string = "";
  const optionsArray = Object.keys(options);
  for (let i = 0; i < optionsArray.length; i++) {
    if (string) {
      string = string + ` and "${optionsArray[i]}" =:${optionsArray[i]}`;
    } else {
      string = string + `"${optionsArray[i]}" =:${optionsArray[i]}`;
    }
  }
  return string;
}
