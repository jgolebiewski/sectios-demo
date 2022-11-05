const countries = require('./mocks/countries.json');
const meansOfTransport = require('./mocks/means-of-transport.json');
const reports = require('./mocks/reports.json');
const draftReports = require('./mocks/draft-reports.json');

module.exports = () => {
    const data = { ...countries, ...meansOfTransport, ...reports, ...draftReports };
    return data;
}