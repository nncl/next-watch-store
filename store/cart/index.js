import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

const addProductToCart = (store, product) => {
  if (store.state.products.includes(product)) {
    return store.state.products;
  }
  return [...store.state.products, product];
};

export const useCartStore = create((set) => ({
  state: initialState,
  actions: {
    toggle: () => set((store) => ({ state: { ...store.state, open: !store.state.open } })),
    reset: () => set(() => ({ state: initialState })),
    add: (product) =>
      set((store) => ({ state: { open: true, products: addProductToCart(store, product) } })),
  },
}));
