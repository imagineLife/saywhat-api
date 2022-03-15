function sortByWordAlpha(a: string | { word: string}, b: string | { word: string }): number{

  // bail on bad types
  const badAType = typeof a !== 'string' && (
    typeof a === 'object' && 
    !a.word
  );
   const badBType = typeof b !== 'string' && (
    typeof b === 'object' && 
    !b.word
  );
  if(badAType && badBType){
    throw new Error('check input on sortByWordAlpha');
  }

  // strings
  if (typeof a === 'string' && typeof b === 'string') {
    if (a < b) { return -1; }
    return 1
  }
    return a.word < b.word ? -1 : 1;
}

// eslint-disable-next-line import/prefer-default-export
export { sortByWordAlpha };