'use strict';
var swisseph = require('swisseph');
var planets = require('../constants');
exports.getAllPlanetPositions = function (req, res) {
    swisseph.swe_set_ephe_path(__dirname + '/../ephe');
    var data = req.body;
    var date = new Date(data.date);
    var date = {
        year: date.getYear(),
        month: date.getMonth(),
        day: date.getDay(),
        hour: data.hours
    };
    swisseph.swe_julday(date.year, date.month, date.day, date.hour + 5.5, 2 + 256 + 65536 + 16, function (julday_ut) {
        console.log('Julian UT day for date:', julday_ut);
        var positions = [];
        swisseph.swe_houses(julday_ut, 16.05, 79.75, 'P', [], [], function (cusps) {
            console.log(cusps.house);
            getPlanetPositions(julday_ut, function (planetPositions) {
                res.jsonp({ cusps: cusps.house, planets: planetPositions });
            })
            res.jsonp(cusps.house);
        });
        // planets.planetNames.forEach(function (eachPlanet) {
        //     swisseph.swe_calc_ut(julday_ut, eachPlanet.flag, swisseph.SEFLG_SPEED, function (planetPosition) {
        //         planetPosition['name'] = eachPlanet.planetName;
        //         positions.push(planetPosition);
        //         console.log(positions);
        //     });
        // });
    });

};
function getPlanetPositions(julday_ut, done) {
    var positions = [];
    planets.planetNames.forEach(function (eachPlanet) {
        swisseph.swe_calc_ut(julday_ut, eachPlanet.flag, swisseph.SEFLG_SPEED, function (planetPosition) {
            planetPosition['name'] = eachPlanet.planetName;
            positions.push(planetPosition);
            console.log(positions);
        });
    });
    async.forEachSeries(planets.planetNames, function (eachPlanet, callback) {
        swisseph.swe_calc_ut(julday_ut, eachPlanet.flag, 2 + 256 + 26 + 65536, function (planetPosition) {
            planetPosition['name'] = eachPlanet.planetName;
            positions.push(planetPosition);
        });
    }, function () {
        done(positions);
    });
}