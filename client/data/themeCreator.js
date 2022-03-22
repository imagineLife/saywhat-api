const fs = require('fs');


/*
	INPUT: themes tsv...
		sentenceNumber(2). themeWord	words,related,to,the,themeWord
		sentenceNumber(3). themeWord	more,words,related,to,the,themeWord....
	OUTPUTs an object...
		{
			themeWord: [array,or,words,that,point,to,the,theme,word],
			themeWord2: [array,or,words,that,point,to,the,theme,word2]
			themeWord3: [array,or,words,that,point,to,the,theme,word3]
		}
*/
fs.readFile('./themes.tsv', 'utf8', (err, data) => {
  if (err) {
    console.log('ERROR');
    console.log(err);
    return;
  }
  const parsed = data.split('\n');

  const themeObj = {};

  // loop through tsv lines
  parsed.forEach((d, dataIndex) => {
    // split line into theme & sentenceInddex
    const splat = d.split('\t');
    const thisTheme = splat[1];
    const arrOfKeyword = splat[2].split(',');


    if (themeObj[thisTheme]) {
      const newArr = [...themeObj[thisTheme], ...arrOfKeyword];
      themeObj[thisTheme] = [...new Set([...newArr])];
    } else {
      themeObj[thisTheme] = arrOfKeyword;
    }
  });
});
