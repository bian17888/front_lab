/**
 * @fileOverview
 * @author bian17888 16/7/11 17:13
 */

module.exports = {
    'articles/recommend': require('./articles/recommend').response,
    // mock post 请求
    'send-auth-code': require('./other').response
}
