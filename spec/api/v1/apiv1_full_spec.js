/**
 * Created by alex on 26/04/16.
 */
var globo = require('../../../server.js');

require('./bootstrap.js');

// Clients Tests
require('./steps/people_spec.js')(globo.app);
