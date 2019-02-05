import { httpGet } from './HeaderInputActions';
import { LOCAL_URL } from './HeaderInputActions';

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_LIST_ERROR';

export const SHOW_DETAILS_REQUEST = 'SHOW_DETAILS_REQUEST';
export const SHOW_DETAILS_SUCCESS = 'SHOW_DETAILS_SUCCESS';
export const SHOW_DETAILS_ERROR = 'SHOW_DETAILS_ERROR';

const FIR_URL = 'https://rosreestr.ru/fir_lite_rest/api/gkn/fir_lite_object/';

//make simple object from response
const convertJSON = (response, objectType) => {
	let result = JSON.parse(response).objectData;

	let resultShort = {};
	resultShort.dateCreated = result.dateCreated;
	resultShort.name = result.name;

	switch (objectType) {
		case 'parcel':
			resultShort.encumbrances = result.parcelData.encumbrancesExists;
			break;
		case 'building':
			resultShort.encumbrances = result.building.encumbrancesExists;
			break;
		case 'construction':
			resultShort.encumbrances = result.construction.encumbrancesExists;
			break;
		case 'flat':
			resultShort.encumbrances = result.flat.encumbrancesExists;
			break;
		default:
			resultShort.encumbrances = false;
	}

	return resultShort;
};

//fetch details for modal window
export function showDetails(objectId, objectType) {
	return dispatch => {
		dispatch({
			type: SHOW_DETAILS_REQUEST,
			payload: objectId,
		});

		const url = FIR_URL + objectId;

		let result = [];

		httpGet(url).then(
			response => {
				//convert response to array
				result = convertJSON(response, objectType);
				dispatch({
					type: SHOW_DETAILS_SUCCESS,
					payload: result,
				});
			},
			error => {
				//if can not fetch cross-domen then fetch local
				const localURLDetailed = LOCAL_URL + objectType + '.json';
				httpGet(localURLDetailed).then(
					response => {
						//convert response to filtered array
						result = convertJSON(response, objectType);
						dispatch({
							type: SHOW_DETAILS_SUCCESS,
							payload: result,
						});
					},
					error => {
						dispatch({
							type: SHOW_DETAILS_ERROR,
							payload: error,
						});
					}
				);
			}
		);
	};
}
