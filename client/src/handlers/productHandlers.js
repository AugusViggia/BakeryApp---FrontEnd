import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../redux/slice/homeSlice";

export const useProductHandlers = (setModalEmptyOpen) => {
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.homeSlice.cartList);


    const handleAddToCart = (product, quantity) => {
        const existingProductIndex = cartList.findIndex(
            (cartProduct) => cartProduct.id === product.id
        );

        if (existingProductIndex !== -1) {
            const updatedQuantity = cartList[existingProductIndex].quantity + quantity;
            dispatch(
                updateQuantity({ productId: product.id, quantity: updatedQuantity })
            );
        } else {
            const productToAdd = {
                name: product.name,
                price: product.price,
                ...product,
                quantity,
            };

            dispatch(addToCart(productToAdd));
        }
    };

    const handleIncrementDetail = (product, quantity) => {
        if (quantity < 100) {
            const newQuantity = quantity + 1;
            dispatch(
                updateQuantity({ productId: product.id, quantity: newQuantity })
            );
        }
    };

    const handleDecrementDetail = (product, quantity) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            dispatch(
                updateQuantity({ productId: product.id, quantity: newQuantity })
            );
        }
    };

    const handleIncrementCart = (product) => {
        if (product.quantity < 100) {
            const newQuantity = product.quantity + 1;
            dispatch(
                updateQuantity({ productId: product.id, quantity: newQuantity })
            );
        }
    };

    const handleDecrementCart = (product) => {
        if (product.quantity > 1) {
            const newQuantity = product.quantity - 1;
            dispatch(
                updateQuantity({ productId: product.id, quantity: newQuantity })
            );
        }
    };

    const handleDelete = (productId) => {
        dispatch(removeFromCart({ id: productId }));
        setModalEmptyOpen(false);
    };

    const handleModalCancel = () => {
        setModalEmptyOpen(false);
    };

    return {
        handleAddToCart,
        handleIncrementDetail,
        handleDecrementDetail,
        handleIncrementCart,
        handleDecrementCart,
        handleDelete,
        handleModalCancel,
    };
};