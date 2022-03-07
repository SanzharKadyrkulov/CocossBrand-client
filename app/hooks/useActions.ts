import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../store/cart/cart.actions';
import * as productActions from '../store/product/product.actions';
import * as orderActions from '../store/order/order.actions';
import * as userActions from '../store/user/user.actions';

const AllActions = {
	...cartActions,
	...productActions,
	...orderActions,
	...userActions,
};

const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(AllActions, dispatch);
};

export default useActions;
