function sortByWordAlpha(a, b): [ string | {word: string}]{
  if (typeof a === 'string') {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
  }
  if (a.word < b.word) { return -1; }
  if (a.word > b.word) { return 1; }

  return 1;
}

// eslint-disable-next-line import/prefer-default-export
export { sortByWordAlpha };