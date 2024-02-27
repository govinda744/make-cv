import { safeJsonParse } from "./utils"

describe('Utils:safeJsonParse', () => {
  it('Should be able to parse object literals', () => {
    expect(safeJsonParse('{"a": "b", "b": 1, "c": true, "d": {"e": "f"}}', 'object')).toEqual({ a: "b", b: 1, c: true, d: { e: "f" } });
  })

  it('Should return an empty object if nothing is passed to it', () => {
    expect(safeJsonParse()).toEqual({});
  })

  it('Should return empty array if nothing is passed and type is \'array\'', () => {
    expect(safeJsonParse(undefined, 'array')).toEqual([]);
  })

  it('Should not fail on wrong parsing value', () => {
    expect(safeJsonParse(undefined, 'object')).toEqual({});
    expect(safeJsonParse(undefined, 'array')).toEqual([]);

    expect(safeJsonParse('', 'object')).toEqual({});
    expect(safeJsonParse('', 'array')).toEqual([]);

    expect(safeJsonParse('anything', 'object')).toEqual({});
    expect(safeJsonParse(null as unknown as undefined, 'array')).toEqual([]);
    expect(safeJsonParse(null as unknown as undefined, 'object')).toEqual({});
  })
})