import { sortByWordAlpha } from './helpers.ts';
import wordList from './mock-word-list-arr.json';

describe('CommonWords Context -> sortByWordAlpha helper', () => {
  const res = wordList.sort(sortByWordAlpha);

  it('throws error on bd type', () => {
    expect(() => {
      sortByWordAlpha({dog:'cat'}, {horse: 'frnak'})
    }).toThrow('check input on sortByWordAlpha')
  })
  it('with arr of objs { word: water, count: 4 }', () => {
    const expectedRes = [
      { word: 'all', occurances: 4 },
      { word: 'america', occurances: 3 },
      { word: 'are', occurances: 4 },
      { word: 'obama', occurances: 3 },
      { word: 'our', occurances: 6 },
      { word: 'people', occurances: 5 },
      { word: 'power', occurances: 3 },
      { word: 'president', occurances: 5 },
      { word: 'will', occurances: 4 },
      { word: 'your', occurances: 4 }
    ]
    expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes))
  })
  it('with arr of words [ice,box,forever]', () => {
    const inputArr = ['ice','box','forever'];
    const hereRes = inputArr.sort(sortByWordAlpha)
    expect(JSON.stringify(hereRes)).toBe('["box","forever","ice"]');
  })

  it('with arr of words [forever,box,ice]', () => {
    const inputArr = ['forever','ice','box'];
    const thisRes = inputArr.sort(sortByWordAlpha)
    expect(JSON.stringify(thisRes)).toBe('["box","forever","ice"]');
  })

  it('with [{word: abe}, {word: horse}]', () => {
    const abeHorseRes = sortByWordAlpha({word: 'abe'}, {word: 'horse'})
    expect(abeHorseRes).toBe(-1)
  })

  it('with [{word: horse}, {word: abe}]', () => {
    const abeHorseRes = sortByWordAlpha({word: 'horse'}, {word: 'abe'})
    expect(abeHorseRes).toBe(1)
  })
})