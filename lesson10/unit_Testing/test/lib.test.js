const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const res = lib.greet('Serhii');
    expect(res).toMatch(/Welcome Serhii/);
    expect(res).toContain('Serhii')
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const res = lib.getCurrencies();
    
    // Too general
    expect(res).toBeDefined();
    expect(res).not.toBeNull();

    // Too specific
    expect(res[0]).toBe('USD');
    expect(res[1]).toBe('AUD');
    expect(res[2]).toBe('EUR');

    expect(res.length).toBe(3)

    // Proper way
    expect(res).toContain('USD');
    expect(res).toContain('AUD');
    expect(res).toContain('EUR');

    // Ideal way
    expect(res).toEqual(expect.arrayContaining(['AUD', 'USD', 'EUR']))
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const res = lib.getProduct(1);
    // expect(res).toEqual({ id: 1,  price: 10 });
    expect(res).toMatchObject({ id: 1, price: 10 });
    expect(res).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy ',  () => {
    // null
    // undefined
    // NaN
    // ''
    // 0
    // false
    const args = [null, undefined, NaN, '', 0, false];
    
    args.forEach(a => {
      expect(() => { lib.registerUser(a) }).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const res = lib.registerUser('Serhii');
    expect(res).toMatchObject({ username: 'Serhii' });
    expect(res.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('apply 10% discount if customer has ore than 10 points', () => {
    db.getCustomerSync = function(customerId){
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 }
    }

    const order = { customerId: 1, totalPrice: 10 };

    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to customer', () => {

    // const mockFunc = jest.fn();
    // mockFunc.mockReturnValue(1)
    // mockFunc.mockResolveValue(1)
    // mockFunc.mockRejectedValue(new Error('...'))
    // const res = await mockFunc();
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn()

    // db.getCustomerSync = function(customerId) {
    //   return { email: 'a' };
    // };
    // let mailSent = false;

    // mail.send = function(email, message) {
    //   mailSent = true
    // }

    lib.notifyCustomer({ customerId: 1 });

    // expect(mailSent).toBe(true)
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});