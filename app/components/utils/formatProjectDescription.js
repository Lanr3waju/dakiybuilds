export function addNewLineBeforeHyphen(inputString) {
  // Replace each occurrence of " - " with "\n- "
  return inputString?.replace(/ - /g, '\n- ')
}
