/**
 * @fileOverview
 * @author bian17888 16/7/11 17:13
 */

module.exports = {
    'api/avengers': require('./avengers/list').response,
    'api/films': require('./films/list').response,
    // mock post 请求
    'api.other': require('./other').response
};
