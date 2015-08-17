var strftime = require('strftime');
var sprintf = require("sprintf-js").sprintf;
var kyureki = require('./kyureki');

console.log(kyureki.getKyureki(2015,8,13));


//var x = new kyureki.JulianToDate(2457247, 9);
//console.log(x);

//for(var i = 2457247.125;i < 2457900;i++){
//for(var i = 2457235.125;i <  2457265;i++){
for(var i = 2440235.5;i <  2458265;i++){
    //console.log(i);
    //console.log(kyureki.UTCtoTD(i));
    var dt = new kyureki.getDateFromJulian(i, 9);
    //console.log("----");
    //console.log(dt);
    //console.log(dt.toISOString());
    //console.log("----");
    var kdt = kyureki.getKyureki(dt.getFullYear(),dt.getMonth(),Math.floor(dt.getDate()));
    //console.log(kdt);
    //
    //console.log(kyureki.getStringDateISO(dt.year, dt.month, dt.day, 9));
    var kdyy = kdt.year;
    var kdmm = sprintf("%02d", parseInt(kdt.month, 10));
    var kmur = kdt.uruu ? 1 : 0;
    var kddd = sprintf("%02d", parseInt(kdt.day, 10));
    var kdom = sprintf("%02d", parseInt(kdt.daysOfMonth, 10));
    var kdyymmdd = kdyy + "/" + kdmm + "/" + kmur + "/" + kddd;
    console.log(strftime('%Y/%m/%d', dt) + " " + kdyymmdd + " " + kdom);
}




/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
var formatDate = function (date, format) {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};
