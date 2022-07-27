import { act, renderHook } from '@testing-library/react-hooks';
import { useCartStore } from './index';
import { makeServer } from '../../miragejs/server';

describe('Cart Store', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return open equals false on initial state', () => {
    const { result } = renderHook(useCartStore);

    expect(result.current.state.open).toBe(false);
  });

  it('should have an empty array when store is initialized', () => {
    const { result } = renderHook(useCartStore);

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it('should have add product in store', () => {
    const products = server.createList('product', 2);

    const { result } = renderHook(useCartStore);
    const {
      actions: { add },
    } = result.current;

    for (const product of products) {
      act(() => add(product));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should toggle open', () => {
    const { result } = renderHook(useCartStore);
    const {
      actions: { toggle },
    } = result.current;

    expect(result.current.state.open).toBe(false);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
  });
});
