'use strict';
var swisseph = require('swisseph');

exports.getAllPlanetPositions = function (req, res) {
    var day = req.date.getDay();
    var

    var date = { year: 2015, month: 1, day: 1, hour: 0 };

    var julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);

    var date = { year: 2012, month: 1, day: 1, hour: 0 };
    console.log('Test date:', date);

    var flag = swisseph.SEFLG_SPEED;

    // path to ephemeris data
    swisseph.swe_set_ephe_path(__dirname + '/../ephe');

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