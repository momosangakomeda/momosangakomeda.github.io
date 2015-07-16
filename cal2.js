var lunarInfo=new Array(
	0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
	0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
	0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
	0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
	0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
	0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
	0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
	0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
	0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
	0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
	0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
	0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
	0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
	0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
	0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
	0x14b63);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','□');
var monthName = new Array("","","","","","","","","","","","");

//办忍淡前泣
var sFtv = new Array(
"0101*元旦节",/////傅枚
"0202 ",
"0210 ",
"0214 ",
"0301 ",
"0303 ",
"0305 ",
"0308 妇女节",/////韶谨泪
"0312 植树节 <br>孙中山逝世纪念日",/////竣践泪
"0314 ",
"0315 ",
"0317 ",
"0321 ",
"0322 ",
"0323 ",
"0324 ",
"0325 ",
"0330 ",
"0401 ",///// 愚人节
"0405   四五&#22825;&#23433;&#38376;&#20107;&#20214;纪念日",/////45欧奥嚏祸凤
"0422 ",
"0423 ",
"0424 ",
"0501*劳动节",/////
"0502*劳动节",/////假日
"0503*劳动节",/////假日
"0504 青年节",/////
"0505 ",
"0508 ",
"0512 ",
"0515 ",
"0517 ",
"0518 ",
"0520 ",
"0523 ",
"0531 ", 
"0601 儿童节",/////
"0604 六四&#22825;&#23433;&#38376;&#20107;&#20214;纪念日",/////64欧奥嚏祸凤
"0606 ",
"0617 ",
"0623 ",
"0625 ",
"0626 ",
"0701 建党节",/////贯沽手丛淡前泣/香港回归纪念日/氟呸泪
"0702 ",
"0707 ",/////钩泣里凌淡前泣/抗日战争纪念日
"0711 ",
"0730 ",
"0801 建军节",/////氟烦泪
"0808 ",
"0815 ",/////抗日战争胜利纪念
"0908 ",
"0909 ",/////逃卖澎炭泣/毛泽东逝世纪念
"0910 教师节", 
"0914 ",
"0916 ",
"0918 ",/////9.18祸恃/九·一八事变纪念日
"0920 ",
"0927 ",
"0928",/////功灰寐盲 孔子诞辰
"1001*国庆节 ",/////
"1002*国庆节 ",/////假日
"1003*国庆节",/////假日
"1004 ",
"1006 老人节",/////
"1008 ",
"1009 ",
"1010 辛亥革命纪念日<br> &#22283;&#24950;&#32000;&#24565;&#26085;&#40;&#21488;&#28286;&#41;",/////
"1013 ",
"1014 ",
"1015 ",
"1016 ",
"1017 ",
"1022 ",
"1024 ",
"1031 ",
"1107 ",
"1108 ",
"1109 ",
"1110 ",
"1111 ",
"1112 孙中山诞辰纪念日",/////
"1114 ",
"1117 ",
"1120",/////*彝族年
"1121 ",/////*彝族年
"1122",/////*彝族年
"1129 ",
"1201 ",
"1203 ",
"1205 ",
"1208 ",
"1209 ",
"1210 ",/////世界人权日
"1212 ",/////谰奥祸凤/西安事变纪念日
"1213 ",/////祁叠翟沪/南京大屠杀纪念日
"1220 ",
"1221 ",
"1224 ",/////平安夜
"1225 圣诞节",/////クリスマス
"1226 ")/////逃卖澎寐栏泣/毛泽东诞辰纪念

//奠务
var lFtv = new Array(
"0101*春节",
"0102*初二",
"0103*初三",
"0115 元宵节",
"0505 端午节",
"0707 七夕节",
"0715 中元节",
"0815 中秋节",
"0909 重阳节",
"1208 腊八节",
"1223 小年",
"0100 除夕")

//
var wFtv = new Array(
"0150 ", //
"0520 母亲节",///熟の泣
"0530 ",
"0630 父亲节",//摄の泣
"0730 ",
"0932 ",
"0940 ",
"0950 ",
"1011 ",
"1013 ",
"1144 ")///炊颊鹤

/*****************************************************************************

*****************************************************************************/

//====================================== 
function lYearDays(y) {
var i, sum = 348;
for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
return(sum+leapDays(y));
}

//====================================== 
function leapDays(y) {
if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
else return(0);
}

//====================================== 
function leapMonth(y) {
return(lunarInfo[y-1900] & 0xf);
}

//====================================== 
function monthDays(y,m) {
return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}


//====================================== 
//                                        .year .month .day .isLeap
function Lunar(objDate) {

var i, leap=0, temp=0;
var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

for(i=1900; i<2050 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

if(offset<0) { offset+=temp; i--; }

this.year = i;

leap = leapMonth(i); //
this.isLeap = false;

for(i=1; i<13 && offset>0; i++) {
//
if(leap>0 && i==(leap+1) && this.isLeap==false)
{ --i; this.isLeap = true; temp = leapDays(this.year); }
else
{ temp = monthDays(this.year, i); }

//
if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

offset -= temp;
}

if(offset==0 && leap>0 && i==leap+1)
if(this.isLeap)
{ this.isLeap = false; }
else
{ this.isLeap = true; --i; }

if(offset<0){ offset += temp; --i; }

this.month = i;
this.day = offset + 1;
}

//==============================
function solarDays(y,m) {
if(m==1)
return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
else
return(solarMonth[m]);
}
//============================== 
function cyclical(num) {
  return(Gan[num%10]+Zhi[num%12]);
}

//============================== 
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

this.isToday    = false;
//
this.sYear      = sYear;   //
this.sMonth     = sMonth;  //
this.sDay       = sDay;    //
this.week       = week;    //
//
this.lYear      = lYear;   //
this.lMonth     = lMonth;  //
this.lDay       = lDay;    //
this.isLeap     = isLeap;  //
//八字
this.cYear      = cYear;   //
this.cMonth     = cMonth;  //
this.cDay       = cDay;    //

this.color      = '';

this.lunarFestival = ''; //
this.solarFestival = ''; //
this.solarTerms    = ''; //
}

//===== 
function sTerm(y,n) {
var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
return(offDate.getUTCDate());
}




//============================== 
/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
function calendar(y,m) {
  var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
  var cY, cM, cD; //
  var lDPOS = new Array(3);
  var n = 0;
  var firstLM = 0;

  sDObj = new Date(y,m,1,0,0,0,0);
  this.length    = solarDays(y,m);
  this.firstWeek = sDObj.getDay();

  ////////
  if(m<2) 
    cY=cyclical(y-1900+36-1);
  else 
    cY=cyclical(y-1900+36);
  var term2=sTerm(y,2);

  ////////
  var firstNode = sTerm(y,m*2) //
  cM = cyclical((y-1900)*12+m+12);

  //
  //
  var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

  for(var i=0;i<this.length;i++) {
    if(lD>lX) {
      sDObj = new Date(y,m,i+1);
      lDObj = new Lunar(sDObj);
      lY    = lDObj.year;
      lM    = lDObj.month;
      lD    = lDObj.day;
      lL    = lDObj.isLeap;
      lX    = lL? leapDays(lY): monthDays(lY,lM);

      if(n==0) firstLM = lM;
      lDPOS[n++] = i-lD+1;
    }

    //
    if(m==1 && (i+1)==term2) 
      cY=cyclical(y-1900+36);

    //
    if((i+1)==firstNode) 
      cM = cyclical((y-1900)*12+m+13);

    //
    cD = cyclical(dayCyclical+i);

    //sYear,sMonth,sDay,week,
    //lYear,lMonth,lDay,isLeap,
    //cYear,cMonth,cDay
    this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                             lY, lM, lD++, lL,
                             cY ,cM, cD );
  }

  //
  tmp1=sTerm(y,m*2  )-1;
  tmp2=sTerm(y,m*2+1)-1;
  this[tmp1].solarTerms = solarTerm[m*2];
  this[tmp2].solarTerms = solarTerm[m*2+1];
  if(m==3) this[tmp1].color = 'red'; //

  //
  for(i in sFtv)
    if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
      if(Number(RegExp.$1)==(m+1)) {
        this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
        if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
      }

  //
  for(i in wFtv)
    if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
      if(Number(RegExp.$1)==(m+1)) {
        tmp1=Number(RegExp.$2);
        tmp2=Number(RegExp.$3);
        if(tmp1<5)
          this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
        else {
          tmp1 -= 5;
          tmp3 = (this.firstWeek+this.length-1)%7; //
          this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
        }
      }

  //
  for(i in lFtv)
    if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
      tmp1=Number(RegExp.$1)-firstLM;
      if(tmp1==-11) 
        tmp1=1;
      if(tmp1 >=0 && tmp1<n) {
        tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
        if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
          this[tmp2].lunarFestival += RegExp.$4 + ' ';
          if(RegExp.$3=='*') this[tmp2].color = 'red';
        }
      }
    }


  //
  if(m==2 || m==3) {
    var estDay = new easter(y);
    if(m == estDay.m)
      this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+'复活节';//イ〖スタ〖
  }


  if(m==2) this[20].solarFestival = this[20].solarFestival+unescape('');

  //
  if((this.firstWeek+12)%7==5)
    this[12].solarFestival += '';///////13FRI

  //
  if(y==tY && m==tM) this[tD-1].isToday = true;
}

//======================================= 
function easter(y) {

var term2=sTerm(y,5); //
var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //
var lDayTerm2 = new Lunar(dayTerm2); //

if(lDayTerm2.day<15) //
var lMlen= 15-lDayTerm2.day;
else
var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

//
var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //
var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //

this.m = dayEaster.getUTCMonth();
this.d = dayEaster.getUTCDate();

}

//====================== 
function cDay(d){
var s;

switch (d) {
case 10:
s = '初十'; break;
case 20:
s = '二十'; break;
break;
case 30:
s = '三十'; break;
break;
default :
s = nStr2[Math.floor(d/10)];
s += nStr1[d%10];
}
return(s);
}

///////////////////////////////////////////////////////////////////////////////

var cld;

function drawCld(SY,SM) {
var i,sD,s,size;
cld = new calendar(SY,SM);

if(SY>1874 && SY<1909) yDisplay = '光绪' + (((SY-1874)==1)?'元':SY-1874);
if(SY>1908 && SY<1912) yDisplay = '宣统' + (((SY-1908)==1)?'元':SY-1908);

if(SY>1911) yDisplay = '建国' + (((SY-1949)==1)?'元':SY-1949);

GZ.innerHTML = yDisplay +'年 农历 ' + cyclical(SY-1900+36) + '年 【'+Animals[(SY-4)%12]+'年】';

YMBG.innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];

for(i=0;i<42;i++) {

sObj=eval('SD'+ i);
lObj=eval('LD'+ i);

sObj.className = '';

sD = i - cld.firstWeek;

if(sD>-1 && sD<cld.length) { //
sObj.innerHTML = sD+1;

if(cld[sD].isToday) sObj.className = 'todyaColor'; //

sObj.style.color = cld[sD].color; //

if(cld[sD].lDay==1) //显
lObj.innerHTML = '<b>'+(cld[sD].isLeap?'闰':'') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'小':'大')+'</b>';
else //
lObj.innerHTML = cDay(cld[sD].lDay);

s=cld[sD].lunarFestival;
if(s.length>0) { //
if(s.length>6) s = s.substr(0, 4)+'...';
s = s.fontcolor('red');
}
else { //
s=cld[sD].solarFestival;
if(s.length>0) {
size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;
if(s.length>size+2) s = s.substr(0, size)+'...';
s=(s=='')?s.fontcolor('black'):s.fontcolor('blue');
}
else { //
s=cld[sD].solarTerms;
if(s.length>0) s = s.fontcolor('green');
}
}

if(cld[sD].solarTerms=='清明') s = '清明节'.fontcolor('red');
if(cld[sD].solarTerms=='芒种') s = '芒种节'.fontcolor('red');
if(cld[sD].solarTerms=='夏至') s = '夏至节'.fontcolor('red');
if(cld[sD].solarTerms=='冬至') s = '冬至节'.fontcolor('red');



if(s.length>0) lObj.innerHTML = s;

}
else { //
sObj.innerHTML = '';
lObj.innerHTML = '';
}
}
}


function changeCld() {
var y,m;
y=CLD.SY.selectedIndex+1900;
m=CLD.SM.selectedIndex;
drawCld(y,m);
}

function pushBtm(K) {
switch (K){
case 'YU' :
if(CLD.SY.selectedIndex>0) CLD.SY.selectedIndex--;
break;
case 'YD' :
if(CLD.SY.selectedIndex<150) CLD.SY.selectedIndex++;
break;
case 'MU' :
if(CLD.SM.selectedIndex>0) {
CLD.SM.selectedIndex--;
}
else {
CLD.SM.selectedIndex=11;
if(CLD.SY.selectedIndex>0) CLD.SY.selectedIndex--;
}
break;
case 'MD' :
if(CLD.SM.selectedIndex<11) {
CLD.SM.selectedIndex++;
}
else {
CLD.SM.selectedIndex=0;
if(CLD.SY.selectedIndex<150) CLD.SY.selectedIndex++;
}
break;
default :
CLD.SY.selectedIndex=tY-1900;
CLD.SM.selectedIndex=tM;
}
changeCld();
}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
//////////////////////////////////////////////////////////////////////////////

var width = "130";
var offsetx = 2;
var offsety = 8;

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;

var dStyle;
document.onmousemove = mEvn;

//
function mOvr(v) {
var s,festival;
var sObj=eval('SD'+ v);
var d=sObj.innerHTML-1;

//sYear,sMonth,sDay,week,
//lYear,lMonth,lDay,isLeap,
//cYear,cMonth,cDay

if(sObj.innerHTML!='') {

sObj.style.cursor = 's-resize';

if(cld[d].solarTerms == '' && cld[d].solarFestival == '' && cld[d].lunarFestival == '')
festival = '';
else
festival = '<TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR="#ffffff"><TR><TD>'+
'<FONT COLOR="#000000" STYLE="font-size:9pt;">'+cld[d].solarTerms + ' ' + cld[d].solarFestival + ' ' + cld[d].lunarFestival+'</FONT></TD>'+
'</TR></TABLE>';

s= '<TABLE WIDTH="130" BORDER=0 CELLPADDING="2" CELLSPACING=0 BGCOLOR="#ff0000" style="filter:Alpha(opacity=80)"><TR><TD>' +
'<TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD ALIGN="right"><FONT COLOR="#ffffff" STYLE="font-size:9pt;">'+
cld[d].sYear+' 年 '+cld[d].sMonth+' 月 '+cld[d].sDay+' 日<br>星期'+cld[d].week+'<br>'+
'<font color="white">农历'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日</font><br>'+
'<font color="ffffff">'+cld[d].cYear+'年 '+cld[d].cMonth+'月 '+cld[d].cDay + '日</font>'+
'</FONT></TD></TR></TABLE>'+ festival +'</TD></TR></TABLE>';

document.all["detail"].innerHTML = s;

if (snow == 0) {
dStyle.left = x+offsetx-(width/2);
dStyle.top = y+offsety;
dStyle.visibility = "visible";
snow = 1;
}
}
}

//
function mOut() {
if ( cnt >= 1 ) { sw = 0; }
if ( sw == 0 ) { snow = 0; dStyle.visibility = "hidden";}
else cnt++;
}

//
function mEvn() {
x=event.x;
y=event.y;
if (document.body.scrollLeft)
{x=event.x+document.body.scrollLeft; y=event.y+document.body.scrollTop;}
if (snow){
dStyle.left = x+offsetx-(width/2);
dStyle.top = y+offsety;
}
}


///////////////////////////////////////////////////////////////////////////

function changeTZ() {
   CITY.innerHTML = CLD.TZ.value.substr(6)
   setCookie("TZ",CLD.TZ.selectedIndex)
}


function tick() {
   var today
   today = new Date()
   Clock.innerHTML = today.toLocaleString()
   Clock2.innerHTML = TimeAdd(today.toGMTString(), CLD.TZ.value)
   window.setTimeout("tick()", 1000);
}


/////////////////////////////////////////////////////////

/*
function initial() {
   dStyle = detail.style;
   CLD.SY.selectedIndex=tY-1900;
   CLD.SM.selectedIndex=tM;
   drawCld(tY,tM);
   pushBtm('');
   CLD.TZ.selectedIndex=getCookie("TZ");
   changeTZ();
   tick();
}
*/

