'use strict';
var swisseph = require('swisseph');
var planets = require('../constants');
exports.getAllPlanetPositions = function (req, res) {
    req.date = new Date();
    req.hours = 9;
    req.minutes = 30;
    swisseph.swe_set_ephe_path(__dirname + '/../ephe');
    var date = {
        year: req.date.getYear(),
        month: req.date.getMonth(),
        day: req.date.getDay(),
        hour: (Number(req.hours) + ((Number(req.minutes) / 60)))
    };
    swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SEFLG_SPEED, function (julday_ut) {
        console.log('Julian UT day for date:', julday_ut);
        var positions = [];
        planets.planetNames.forEach(function (eachPlanet) {
            swisseph.swe_calc_ut(julday_ut, eachPlanet.flag, swisseph.SEFLG_SPEED, function (planetPosition) {
            });
        });
    });
};