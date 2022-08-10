import { act, renderHook } from '@testing-library/react-hooks';
import { useCartStore } from './index';
import { makeServer } from '../../miragejs/server';

describe('Cart Store', () => {
  let server;

  let result;
  let add;
  let toggle;
  let remove;
  let clear;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(useCartStore).result;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
    remove = result.current.actions.remove;
    clear = result.current.actions.clear;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it('should return open equals false on initial state', () => {
    expect(result.current.state.open).toBe(false);
  });

  it('should have an empty array when store is initialized', () => {
    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it('should add 2 products to the list', () => {
    const products = server.createList('product', 2);

    for (const product of products) {
      act(() => add(product));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should not add the same product twice', () => {
    const product = server.create('product');

    act(() => add(product));
    act(() => add(product));

    expect(result.current.state.products).toHaveLength(1);
  });

  it('should toggle open', () => {
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
  });

  it('should remove a product from the store', () => {
    const [product1, product2] = server.createList('product', 2);

    act(() => {
      add(product1);
      add(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => remove(product1));

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual(product2);
  });

  it('should clear cart', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      for (const product of products) {
        clear();
      }
    });

    expect(result.current.state.products).toHaveLength(0);
  });
});
