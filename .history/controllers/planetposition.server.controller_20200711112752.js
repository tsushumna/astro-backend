'use strict';
var swisseph = require('swisseph');

exports.getAllPlanetPositions = function (req, res) {
    swisseph.swe_set_ephe_path(__dirname + '/../ephe');

    var day = req.date.getDay();
    var
    var date = {
        year: req.date.getYear(),
        month: req.date.getMonth(),
        day: req.date.getDay(),
        hour: (Number(req.hours) + ((Number(req.minutes) / 60)))
    };
    var julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);
    var flag = swisseph.SEFLG_SPEED;

    // path to ephemeris data

    // Julian day
    swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
        console.log('Julian UT day for date:', julday_ut);

        // Sun position
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body) {
            console.log('Sun position:', body);
        });

        // Moon position
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, function (body) {
            console.log('Moon position:', body);
        });
    }