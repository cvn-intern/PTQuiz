import { tokens } from '../../stores/token';
import { getMe } from '../../utils/auth';
import { createAPI } from '../../+server';

export const load = async (request) => {
	const { apiNoAuth, apiWithAuth } = createAPI(request);

	const response = await apiWithAuth.get('/auth/me');
	const result = response.data;
	console.log(result);
	return {
		props: {
			user: result?.data
		}
	};

	// const result = await getMe();
	// return {
	// 	props: {
	// 		user: result?.data
	// 	}
	// };
};
