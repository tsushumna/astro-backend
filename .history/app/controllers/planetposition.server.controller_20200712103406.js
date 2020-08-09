'use strict';
var swisseph = require('swisseph');
var planets = require('../constants');
exports.getAllPlanetPositions = function (req, res) {
    swisseph.swe_set_ephe_path(__dirname + '/../ephe');
    var date = {
        year: req.date.getYear(),
        month: req.date.getMonth(),
        day: req.date.getDay(),
        hour: req.hours
    };
    swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SEFLG_SPEED, function (julday_ut) {
        console.log('Julian UT day for date:', julday_ut);
        var positions = [];
        swisseph.swe_houses(julday_ut, 16.05, 79.75, 'P', [], [], function (cusps) {
            console.log(cusps.house);
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