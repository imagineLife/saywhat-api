type StringOrWordObj = string | { word: string };
function sortByWordAlpha(a: StringOrWordObj, b: StringOrWordObj): number{

  // bail on bad types
  const badAType = typeof a !== 'string' && !a.word
   const badBType = typeof b !== 'string' &&  !b.word
  if(badAType || badBType){
    throw new Error('check input on sortByWordAlpha');
  }

  // strings
  if (typeof a === 'string' && typeof b === 'string') {
    if (a < b) { return -1; }
    return 1
  }
    
  if(typeof a === "object" && "word" in a && typeof b === "object" && "word" in b){
    return a.word < b.word ? -1 : 1;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { sortByWordAlpha };