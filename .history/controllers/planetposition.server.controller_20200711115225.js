'use strict';
var swisseph = require('swisseph');
var planets = require('../constants');
exports.getAllPlanetPositions = function (req, res) {
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
        planets.forEach(eachPlanet =>{
            swisseph.swe_calc_ut(julday_ut, eachPlanet.flag, flag, function (planetPosition) {
                console.log('Sun position:', body);
            });
        });
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (planetPosition) {
            console.log('Sun position:', body);
        });
    });
};