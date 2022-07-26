import { act, renderHook } from '@testing-library/react-hooks';
import { useCartStore } from './index';

describe('Cart Store', () => {
  it('should return open equals false on initial state', () => {
    const { result } = renderHook(useCartStore);

    expect(result.current.state.open).toBe(false);
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
