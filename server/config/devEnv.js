// const username = "PRINTGALORE4U"
const username = "tristan@endlinesolutions.com "
const password = "Elijah123!"
const AccessTokenURL = `https://api.paytrace.com/oauth/token?grant_type=password&username=${username}&password=${password}`
exports.AccessTokenURL = AccessTokenURL

const DBURI = 'mongodb+srv://maduUN:maduPW@cluster0.do5rk.mongodb.net/printglore?retryWrites=true&w=majority'
exports.DBURI = DBURI