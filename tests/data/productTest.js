import { Product, Clothing, Appliance } from '../../data/products.js';

describe('Product class', () => {
  const product = new Product({
    id: 'test-id',
    image: 'test-image',
    name: 'test-name',
    rating: { stars: 4, count: 10 },
    priceCents: 1000,
  });

  it('has correct properties', () => {
    expect(product.id).toBe('test-id');
    expect(product.image).toBe('test-image');
    expect(product.name).toBe('test-name');
    expect(product.rating.stars).toBe(4);
    expect(product.rating.count).toBe(10);
    expect(product.priceCents).toBe(1000);
  });

  it('getPrice method returns correct price', () => {
    expect(product.getPrice()).toBe(' $10.00');
  });

  it('extraInfoHTML method returns empty string', () => {
    expect(product.extraInfoHTML()).toBe('');
  });
});

describe('Clothing class', () => {
  const clothing = new Clothing({
    id: 'test-id',
    image: 'test-image',
    name: 'test-name',
    rating: { stars: 4, count: 10 },
    priceCents: 1000,
    type: 'clothing',
    sizeChartLink: 'test-size-chart-link',
  });

  it('has correct properties', () => {
    expect(clothing.id).toBe('test-id');
    expect(clothing.image).toBe('test-image');
    expect(clothing.name).toBe('test-name');
    expect(clothing.rating.stars).toBe(4);
    expect(clothing.rating.count).toBe(10);
    expect(clothing.priceCents).toBe(1000);
    expect(clothing.sizeChartLink).toBe('test-size-chart-link');
  });

  it('extraInfoHTML method returns correct HTML', () => {
    expect(clothing.extraInfoHTML()).toContain('Size chart');
  });
});

describe('Appliance class', () => {
  const appliance = new Appliance({
    id: 'test-id',
    image: 'test-image',
    name: 'test-name',
    rating: { stars: 4, count: 10 },
    priceCents: 1000,
    type: 'appliance',
    instructionLink: 'test-instruction-link',
    warrantyLink: 'test-warranty-link',
  });

  it('has correct properties', () => {
    expect(appliance.id).toBe('test-id');
    expect(appliance.image).toBe('test-image');
    expect(appliance.name).toBe('test-name');
    expect(appliance.rating.stars).toBe(4);
    expect(appliance.rating.count).toBe(10);
    expect(appliance.priceCents).toBe(1000);
    expect(appliance.instructionLink).toBe('test-instruction-link');
    expect(appliance.warrantyLink).toBe('test-warranty-link');
  });

  it('extraInfoHTML method returns correct HTML', () => {
    expect(appliance.extraInfoHTML()).toContain('Instructions');
    expect(appliance.extraInfoHTML()).toContain('Warranty');
  });
});