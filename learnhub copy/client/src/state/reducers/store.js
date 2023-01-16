export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "addToCart":
      let { _id } = action?.payload?.course;
      let alreadyInCart = false;

      state.cart?.map((item) => {
        if (item._id === _id) {
          return (alreadyInCart = true);
        }
      });

      if (!alreadyInCart) {
        return { ...state, cart: [...state.cart, action.payload.course] };
      } else {
        return state;
      }

    case "addToWishlist":
      let course = action?.payload?.course;
      let _alreadyInCart = false;

      state.cart?.map((item) => {
        if (item._id === course?._id) {
          return (_alreadyInCart = true);
        }
      });

      if (!_alreadyInCart) {
        return {
          ...state,
          wishList: [...state.wishList, action.payload.course],
        };
      } else {
        return state;
      }

    case "deleteCartItem":
      let courseId = action.payload;
      console.log(action.payload);
      let cart = state?.cart.filter((item) => {
        return item._id !== courseId;
      });
      return { ...state, cart };

    case "deleteWishlistItem":
      let _courseId = action.payload;

      let wishList = state?.wishList.filter((item) => {
        return item._id !== _courseId;
      });
      return { ...state, wishList };
    default:
      return state;
  }
};
