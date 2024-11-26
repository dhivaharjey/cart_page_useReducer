export const ACTIONS = {
  ADD_TO_CART: "add to cart",
  REMOVE_FROM_CART: "remove from cart",
  CHANGE_CART_QUANTITY: "change cart quantity",
  SORT_BY_PRICE: "sort by price",
  FILTER_BY_STOCK: "filter by stock",
  FILTER_BY_DELIVERY: "filter by delivery",
  FILTER_BY_RATING: "filter by rating",
  FILTER_BY_SEARCH: "filter by search",
  CLEAR_FILTER: "clear filter",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action?.payload, qty: 1 }],
      };
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state?.cart?.filter((item) => item.id !== action?.payload.id),
      };
    case ACTIONS.CHANGE_CART_QUANTITY:
      return {
        ...state,
        cart: state?.cart?.filter((item) =>
          item.id === action?.payload.id
            ? (item.qty = action?.payload.qty)
            : item.qty
        ),
      };
    default:
      state;
  }
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SORT_BY_PRICE:
      return { ...state, sort: action.payload };
    case ACTIONS.FILTER_BY_STOCK:
      return { ...state, byStock: !state.byStock };
    case ACTIONS.FILTER_BY_DELIVERY:
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case ACTIONS.FILTER_BY_RATING:
      return { ...state, byRating: action.payload };
    case ACTIONS.FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.CLEAR_FILTER:
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    default:
      state;
  }
};
