/**
 * Created by alex on 26/04/16.
 */
var constants={
	ERRORS: {
		unknown: {
			code: 1,
			httpStatus: 500,
			desc: 'Unexpected error'
		},
		unauthorized: {
			code: 2,
			httpStatus: 403,
			desc: 'Not authorized'
		},
		duplicate_value: {
			code: 3,
			httpStatus: 401,
			desc: 'Value already exists'
		}
	}
};


//Node.js exports
if (typeof module !== 'undefined' && module.exports) {
	module.exports = constants;
}
