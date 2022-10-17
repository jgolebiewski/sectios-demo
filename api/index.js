const countries = require('./mocks/countries.json');
const meansOfTransport = require('./mocks/means-of-transport.json');
const reports = require('./mocks/reports.json');

module.exports = () => {
    const data = { countries, meansOfTransport, reports };
    return data;
}