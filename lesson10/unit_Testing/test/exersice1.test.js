const exercise = require('../exercise1')

describe('exercise1', () => {
  it('should return throw an Error if input is not a number', () => {
    const args = ['', null, undefined, NaN, false, true, [], {}]

    args.forEach( arg => {
      expect(() => exercise.fizzBuzz(arg).toThrow());
    })
  });

  it('should return an input if input is not %divisible by 3 and 5', () => {
    const input = 11
    const res = exercise.fizzBuzz(input)

    expect(res).toBe(input)

  });

  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const input = 15
    const res = exercise.fizzBuzz(input)
    expect(res).toBe('FizzBuzz')
  });

  it('should return Fizz if input is divisible by 3', () => {
    const input = 3
    const res = exercise.fizzBuzz(input)
    expect(res).toBe('Fizz')
  });

  it('should return Buzz if input is divisible by 3', () => {
    const input = 5
    const res = exercise.fizzBuzz(input)
    expect(res).toBe('Buzz')
  });
})