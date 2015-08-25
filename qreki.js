//-------------------------------------------------------------------------------------------
//　旧暦を計算するためのスクリプト集　Ver.0.9　Rev.020118
//　　
//　　旧暦を求めるためには太陽と月の黄経を正確に計算する必要があります。
//　　そのための天文計算スクリプト集です。フリーウエアとしてご使用下さい。
//　　ただし計算誤差やバグのために生じる間違いについては保証しません。
//
//　　基本アルゴリズムとデータは下記資料に基づいています。
//　　　　暦計算研究会編「新こよみ便利帳」1991年　恒星社厚生閣
//
// 　　　　　　　　　　　　　　　　　　　　　http://www.geocities.jp/tocifumi/
//　　　　　　　　　　　　　　　　　　　　　(c)Copyright 2002 Toshifumi Inoue
//-------------------------------------------------------------------------------------------
qreki = typeof exports === 'undefined' ?  {} : exports;

// 日本の時差 9時間
qreki.TIMEOFFSET_JP = -9;

//-------------------------------------------------------------------------------------------
//　太陽歴 年月日からユリウス日への変換
//  ユリウス日とは紀元前4713年1月1日からの連続した通し番号の日数
//　　引き数　year：年　month：月　day:日（時間は小数で表現）
//            timeOffset：時差（単位：時間　日本の場合-9）
//            1582/10/15以後はグレゴリオ暦の年月日、それ以前はユリウス暦の年月日
//　　戻り値　ユリウス日（世界時）
//-------------------------------------------------------------------------------------------
qreki.getJulianDay = function(year, month, day, timeOffset) {
	var y,m,d;
	var a,b,c,jd;
	if(month>2) {
		y = year;
		m = month;
	} else {
		y = year -1;
		m = month + 12;
	}
	d = day;
	a = Math.floor(y/100);
	if((year>1582)||((year==1582)&&(month>10))||((year==1582)&&(month==10)&&(day>=15))) {
		b = 2 - a + Math.floor(a/4);
	} else {
		b = 0;
	}
	if( y>0) {
		c = Math.floor(365.25*y);
	} else {
		c = Math.floor(365.25*y-0.75);
	}
	jd = 1720994.5 + Math.floor(30.6001*(m+1)) + b + c + d + timeOffset/24;
	return jd;
};

//-------------------------------------------------------------------------------------------
//　世界時から力学時への変換
//　　引き数　jd：ユリウス日（世界時）
//　　戻り値　J2000.0（2000.1.1.12hTD）基準のユリウス世紀（力学時）
//-------------------------------------------------------------------------------------------
qreki.UTCtoTD = function(jd) {
	var t;
	t = 65*(jd-2415020)/115264134000000;
	t +=  (jd-2451545)/36525;
	return t;
};

//-------------------------------------------------------------------------------------------
//　ユリス日から年月日への変換
//　　引き数　jd:ユリウス日（世界時）
//            timeOffset：時差（単位：時間　日本の場合-9）
//　　プロパティ　グレゴリオ暦の年月日
//　　　　　　　　year：年　month：月　day:日（時間は少数で表現）
//-------------------------------------------------------------------------------------------
qreki.getDateFromJulian = function(jd, timeOffset){
	var y,m,d;
	var n,z,f,aa,a,b,c,k,e;
	n = jd + 0.5;
	z = Math.floor(n);
	f = n - z;
	if(z>=2299161) {
		aa = Math.floor((z-1867216.25)/36524.25);
		a = z +1 + aa - Math.floor(aa/4);
	} else {
		a = z;
	}
	b = a + 1524;
	c = Math.floor((b-122.1)/365.25);
	k = Math.floor(365.25*c);
	e = Math.floor((b-k)/30.6001);
	d = b - k - Math.floor(30.6001*e) + f;
	if(e<13.5) {
		m = e - 1;
	} else {
		m = e - 13;
	}
	if(m>2.5) {
		y = c - 4716;
	} else {
		y = c - 4715;
	}
    var datestr = qreki.getStringDateISO(y, m, d, timeOffset);
    //return new Date(datestr);
    return new Date(y, m - 1, d);
};

//-------------------------------------------------------------------------------------------
//　角度を0-360の範囲に正規化
//　　引き数　angle：角度（単位：度）
//　　戻り値　角度（単位：度）0<=角度<360
//-------------------------------------------------------------------------------------------
qreki.regAngle = function(angle) {
	var a;
	a = Math.floor(angle/360);
	a = angle-a*360;
	return a;
};

//-------------------------------------------------------------------------------------------
//　角度を-180-180の範囲に正規化
//　　引き数　angle：角度（単位：度）
//　　戻り値　角度（単位：度）-180<=角度<180
//-------------------------------------------------------------------------------------------
qreki.regAngle180 = function(angle) {
	var a;
	a = qreki.regAngle(angle) ;
	if(a>180) a-=360;
	return a;
};

//-------------------------------------------------------------------------------------------
//　年月日を表示用に文字列に変換
//　　引き数　year：年　month：月　day:日（時間は少数で表現）
// 				timeOffset：時差（単位：時間　日本の場合-9）
//　　戻り値　日付けの文字列　例：2002.01.12 13:05:24 UTC-0900
//-------------------------------------------------------------------------------------------
qreki.getStringDate = function(year, month, day, timeOffset) {
	var dateStr = "";
	year = Math.floor(year);
	month = Math.floor(month);
	timeOffset = Math.floor(timeOffset);
	var a = day;		var d = Math.floor(a);
	var a = (a-d)*24;	var h = Math.floor(a);
	var a = (a-h)*60;	var m = Math.floor(a);
	var a = (a-m)*60;	var s = Math.floor(a+0.5);
    
	dateStr += qreki.intToString(year,4);
	dateStr += "."+qreki.intToString(month,2);
	dateStr += "."+qreki.intToString(d,2);
	dateStr += " "+qreki.intToString(h,2);
	dateStr += ":"+qreki.intToString(m,2);
	dateStr += ":"+qreki.intToString(s,2);
	if(timeOffset<0) {
		dateStr += " UTC-"+qreki.intToString(Math.abs(timeOffset),2);
	} else {
		dateStr += " UTC+"+qreki.intToString(timeOffset,2);
	}
	dateStr += "00";
	return dateStr;
};

//-------------------------------------------------------------------------------------------
//　年月日を表示用に文字列に変換 ISO8601
//　　引き数　year：年　month：月　day:日（時間は少数で表現）
// 				timeOffset：時差（単位：時間　日本の場合-9）
//　　戻り値　日付けの文字列　例：20020112T130524+0900
//-------------------------------------------------------------------------------------------
qreki.getStringDateISO = function(year, month, day, timeOffset) {
	var dateStr = "";
	year = Math.floor(year);
	month = Math.floor(month);
	timeOffset = Math.floor(timeOffset);
	var a = day;		var d = Math.floor(a);
	var a = (a-d)*24;	var h = Math.floor(a);
	var a = (a-h)*60;	var m = Math.floor(a);
	var a = (a-m)*60;	var s = Math.floor(a+0.5);
    
	dateStr += qreki.intToString(year,4);
	dateStr += "-" + qreki.intToString(month,2);
	dateStr += "-" + qreki.intToString(d,2);
	dateStr += "T" + qreki.intToString(h,2);
	dateStr += ":" + qreki.intToString(m,2);
	dateStr += ":" + qreki.intToString(s,2);
    
	if(timeOffset<0) {
		dateStr += "-"+qreki.intToString(Math.abs(timeOffset),2);
	} else {
		dateStr += "+"+qreki.intToString(timeOffset,2);
	}
	dateStr += "00";
   
	return dateStr;
};

//-------------------------------------------------------------------------------------------
//　年月日を表示用に文字列に変換（短い表示）
//　　引き数　year：年　month：月　day:日
//　　戻り値　日付けの文字列　例：02.01.12
//-------------------------------------------------------------------------------------------
qreki.getShortStringDate = function(year, month, day) {
	var dateStr = "";
	year     = Math.floor(year)%100; 
	month    = Math.floor(month);    
	day      = Math.floor(day);      
	dateStr += qreki.intToString(year,2);
	dateStr += "."+qreki.intToString(month,2);
	dateStr += "."+qreki.intToString(day,2);
	return dateStr;
};

//-------------------------------------------------------------------------------------------
//　整数を指定桁の文字列に変換
//　　引き数　n：整数　stringLength：出力桁数
//　　戻り値　0を前につけて桁数を合わせた文字列
//-------------------------------------------------------------------------------------------
qreki.intToString = function(n,stringLength) {
	var str = "" + Math.abs(n);	
	if( str.length<stringLength ) {
		var k = stringLength-str.length;
		for(j=0;j<k;j++)  str = "0"+str;
	}
	if(n<0)  str = "-"+str;
	return str;
};

//-------------------------------------------------------------------------------------------
//　太陽の視黄経を求める
//　　引き数　t:ユリウス世紀（力学）
//　　戻り値　太陽の視黄経（単位：度）
//-------------------------------------------------------------------------------------------
qreki.getLongitudeSun = function(t) {
	var kr = Math.PI / 180;
	var a;
	//-----------------------------------------------------------------------
	// 計算誤差を最小にするため、小さな項から加算する
	//-----------------------------------------------------------------------
	with(Math) {
	a  = 0.0004 * cos( kr*qreki.regAngle( 31557*t + 161 ) );
	a += 0.0004 * cos( kr*qreki.regAngle( 29930*t + 48 ) );
	a += 0.0005 * cos( kr*qreki.regAngle( 2281*t + 221 ) );
	a += 0.0005 * cos( kr*qreki.regAngle( 155*t + 118 ) );
	a += 0.0006 * cos( kr*qreki.regAngle( 33718*t + 316 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 9038*t + 64 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 3035*t + 110 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 65929*t + 45 ) );
	a += 0.0013 * cos( kr*qreki.regAngle( 22519*t + 352 ) );
	a += 0.0015 * cos( kr*qreki.regAngle( 45038*t + 254 ) );
	a += 0.0018 * cos( kr*qreki.regAngle( 445267*t + 208 ) );
	a += 0.0018 * cos( kr*qreki.regAngle( 19*t + 159 ) );
	a += 0.0020 * cos( kr*qreki.regAngle( 32964*t + 158 ) );
	a -= 0.0048 * cos( kr*qreki.regAngle( 35999*t + 268 ) ) * t;
	a += 0.0200 * cos( kr*qreki.regAngle( 71998.1*t + 265.1 ) );
	a += 1.9147 * cos( kr*qreki.regAngle( 35999.05*t + 267.52 ) );
	a += qreki.regAngle( 36000.7695*t + 280.4659 );
	//　光行差による視黄経への変換
	a += -0.0057 + 0.0048*cos( kr*qreki.regAngle( 1934*t + 145 ) );
	}
	return qreki.regAngle(a);
};

//-------------------------------------------------------------------------------------------
//　月の視黄経を求める
//　　引き数　t:ユリウス世紀（力学）
//　　戻り値　月の視黄経（単位：度）
//-------------------------------------------------------------------------------------------
qreki.getLongitudeMoon = function(t) {
	var kr = Math.PI / 180;
	var a;
	//-----------------------------------------------------------------------
	// 計算誤差を最小にするため、小さな項から加算する
	//-----------------------------------------------------------------------
	with(Math) {
	a  = 0.0003 * cos( kr*qreki.regAngle( 2322131*t + 191 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 4067*t + 70 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 549197*t + 220 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 1808933*t + 58 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 349472*t + 337 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 381404*t + 354 ) );
	a += 0.0003 * cos( kr*qreki.regAngle( 958465*t + 340 ) );
	a += 0.0004 * cos( kr*qreki.regAngle( 12006*t + 187 ) );
	a += 0.0004 * cos( kr*qreki.regAngle( 39871*t + 223 ) );
	a += 0.0005 * cos( kr*qreki.regAngle( 509131*t + 242 ) );
	a += 0.0005 * cos( kr*qreki.regAngle( 1745069*t + 24 ) );
	a += 0.0005 * cos( kr*qreki.regAngle( 1908795*t + 90 ) );
	a += 0.0006 * cos( kr*qreki.regAngle( 2258267*t + 156 ) );
	a += 0.0006 * cos( kr*qreki.regAngle( 111869*t + 38 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 27864*t + 127 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 485333*t + 186 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 405201*t + 50 ) );
	a += 0.0007 * cos( kr*qreki.regAngle( 790672*t + 114 ) );
	a += 0.0008 * cos( kr*qreki.regAngle( 1403732*t + 98 ) );
	a += 0.0009 * cos( kr*qreki.regAngle( 858602*t + 129 ) );
	a += 0.0011 * cos( kr*qreki.regAngle( 1920802*t + 186 ) );
	a += 0.0012 * cos( kr*qreki.regAngle( 1267871*t + 249 ) );
	a += 0.0016 * cos( kr*qreki.regAngle( 1856938*t + 152 ) );
	a += 0.0018 * cos( kr*qreki.regAngle( 401329*t + 274 ) );
	a += 0.0021 * cos( kr*qreki.regAngle( 341337*t + 16 ) );
	a += 0.0021 * cos( kr*qreki.regAngle( 71998*t + 85 ) );
	a += 0.0021 * cos( kr*qreki.regAngle( 990397*t + 357 ) );
	a += 0.0022 * cos( kr*qreki.regAngle( 818536*t + 151 ) );
	a += 0.0023 * cos( kr*qreki.regAngle( 922466*t + 163 ) );
	a += 0.0024 * cos( kr*qreki.regAngle( 99863*t + 122 ) );
	a += 0.0026 * cos( kr*qreki.regAngle( 1379739*t + 17 ) );
	a += 0.0027 * cos( kr*qreki.regAngle( 918399*t + 182 ) );
	a += 0.0028 * cos( kr*qreki.regAngle( 1934*t + 145 ) );
	a += 0.0037 * cos( kr*qreki.regAngle( 541062*t + 259 ) );
	a += 0.0038 * cos( kr*qreki.regAngle( 1781068*t + 21 ) );
	a += 0.0040 * cos( kr*qreki.regAngle( 133*t + 29 ) );
	a += 0.0040 * cos( kr*qreki.regAngle( 1844932*t + 56 ) );
	a += 0.0040 * cos( kr*qreki.regAngle( 1331734*t + 283 ) );
	a += 0.0050 * cos( kr*qreki.regAngle( 481266*t + 205 ) );
	a += 0.0052 * cos( kr*qreki.regAngle( 31932*t + 107 ) );
	a += 0.0068 * cos( kr*qreki.regAngle( 926533*t + 323 ) );
	a += 0.0079 * cos( kr*qreki.regAngle( 449334*t + 188 ) );
	a += 0.0085 * cos( kr*qreki.regAngle( 826671*t + 111 ) );
	a += 0.0100 * cos( kr*qreki.regAngle( 1431597*t + 315 ) );
	a += 0.0107 * cos( kr*qreki.regAngle( 1303870*t + 246 ) );
	a += 0.0110 * cos( kr*qreki.regAngle( 489205*t + 142 ) );
	a += 0.0125 * cos( kr*qreki.regAngle( 1443603*t + 52 ) );
	a += 0.0154 * cos( kr*qreki.regAngle( 75870*t + 41 ) );
	a += 0.0304 * cos( kr*qreki.regAngle( 513197.9*t + 222.5 ) );
	a += 0.0347 * cos( kr*qreki.regAngle( 445267.1*t + 27.9 ) );
	a += 0.0409 * cos( kr*qreki.regAngle( 441199.8*t + 47.4 ) );
	a += 0.0458 * cos( kr*qreki.regAngle( 854535.2*t + 148.2 ) );
	a += 0.0533 * cos( kr*qreki.regAngle( 1367733.1*t + 280.7 ) );
	a += 0.0571 * cos( kr*qreki.regAngle( 377336.3*t + 13.2 ) );
	a += 0.0588 * cos( kr*qreki.regAngle( 63863.5*t + 124.2 ) );
	a += 0.1144 * cos( kr*qreki.regAngle( 966404*t + 276.5 ) );
	a += 0.1851 * cos( kr*qreki.regAngle( 35999.05*t + 87.53 ) );
	a += 0.2136 * cos( kr*qreki.regAngle( 954397.74*t + 179.93 ) );
	a += 0.6583 * cos( kr*qreki.regAngle( 890534.22*t + 145.7 ) );
	a += 1.2740 * cos( kr*qreki.regAngle( 413335.35*t + 10.74 ) );
	a += 6.2888 * cos( kr*qreki.regAngle( 477198.868*t + 44.963 ) );
	a += qreki.regAngle( 481267.8809*t + 218.3162 );
	}
	return qreki.regAngle(a);
};

//-------------------------------------------------------------------------------------------
//　月齢を求める
//　　引き数　jd:ユリウス日（世界時）
//　　戻り値　月齢（単位：度）-180<=角度<180　朔の時が0
//-------------------------------------------------------------------------------------------
qreki.getMoonAge = function(jd) {
	var t = qreki.UTCtoTD(jd);
	return qreki.regAngle180(qreki.getLongitudeMoon(t)-qreki.getLongitudeSun(t));
};

//-------------------------------------------------------------------------------------------
//　太陽視黄経が引き数の角度になる入力日前後のユリウス日を求める
//　　引き数　ls：太陽視黄経（0<=ls<360）　jd：ユリウス日　timeOffset：時差
//　　　　　　ba：ba<=0の時入力日前　ba>0の時入力日後のユリウス日を求める
//　　戻り値　太陽視黄経がlsになる瞬間を含む年月日の午前0時（地方時）のユリウス日
//-------------------------------------------------------------------------------------------
qreki.getSekkiDay = function(ls, jd, timeOffset, ba) {
	var k = 0.985647351;
	var offset = 0.5+timeOffset/24;
	var answer;
	var d0,a0,d1,a1,a,d;
	if(ba<=0) {
		d0 = Math.floor(jd-offset) + offset + 1;
		a0 = qreki.regLS(d0,ls);
		if(a0<0) a0 += 360;
	} else {
		d0 = Math.floor(jd-offset) + offset;
		a0 = qreki.regLS(d0,ls);
		if(a0>0) a0 -= 360;
	}
	d1 = Math.floor( d0-a0/k-offset+0.5 ) + offset;
	a1 = qreki.regLS(d1,ls);
	if(a1>0) {		
		for( d=d1,a=a1; d>d1-10; d-- ) {
			a = qreki.regLS(d-1,ls);
			if(a<=0) {
				answer = d-1;
				break;
			}
		}
	} else {
		for( d=d1,a=a1; d<d1+10; d++ ) {
			a = qreki.regLS(d+1,ls);
			if(a>0) {
				answer = d;
				break;
			}
		}
	}
	return answer;	
};

//-------------------------------------------------------------------------------------------
//　太陽視黄経が引き数の角度になった時に０となるよう正規化
//　　引き数　jd:ユリウス日（世界時）　ls：目標とする視黄経（単位：度）
//　　戻り値　視黄経の目標との差（単位：度）-180<=角度<180
//-------------------------------------------------------------------------------------------
qreki.regLS = function(jd,ls){ 
	return qreki.regAngle180(qreki.getLongitudeSun(qreki.UTCtoTD(jd))-ls);
};

//-------------------------------------------------------------------------------------------
//　入力日直前直後の二分ニ至（春分、夏至、秋分、冬至）を求める
//　　引き数　jd:ユリウス日（世界時）
//　　プロパティ　before：直前の二分ニ至　after：直後の二分ニ至
//　　　　　　　　JD1：直前の二分ニ至のユリウス日
//　　　　　　　　JD2：直後の二分ニ至のユリウス日
//-------------------------------------------------------------------------------------------
qreki.Sekki4 = function(jd) {
	var k = Math.floor(qreki.getLongitudeSun(qreki.UTCtoTD(jd))/90);
	this.before = k*6;
	this.JD1 = qreki.getSekkiDay(k*90, jd, qreki.TIMEOFFSET_JP, -1)
	k++;
    if(k==4) k=0;
	this.after = k*6;
	this.JD2 = qreki.getSekkiDay(k*90,jd, qreki.TIMEOFFSET_JP, 1)
};

//------------------------------------------------------------------------------------------
//　陰暦の朔望日 オブジェクト コンストラクタ
//　　プロパティ　moonDay：朔望日
//　　　　　　　　startDay：月が朔になる瞬間を含む年月日の午前0時（JST）のユリウス日
//　　　　　　　　daysOfMonth：月の日数
//　　　　　　　　chuki：この月が含む中気の24節気番号（含まない時は-1）
//------------------------------------------------------------------------------------------
qreki.MoonDay = function() {};

//-------------------------------------------------------------------------------------------
//　陰暦の朔望日を求める
//　　引き数　jd:ユリウス日（世界時）
//　　プロパティ　moonDay：朔望日
//　　　　　　　　startDay：月が朔になる瞬間を含む年月日の午前0時（JST）のユリウス日
//　　　　　　　　daysOfMonth：月の日数
//　　　　　　　　chuki：この月が含む中気の24節気番号（含まない時は-1）
//-------------------------------------------------------------------------------------------
qreki.getMoonDay = function(jd) {
	var k = 12.19074911;
	var d0,a0,d1,a1,a,d;
	var dStart,days;
	var ls1,ls2;

    var moonday = new qreki.MoonDay();

	d0 = jd+1;
	a0 = qreki.getMoonAge(d0);
	if(a0<0) a0 += 360;
	d1 = d0 - Math.floor( a0/k+0.5 );
	a1 = qreki.getMoonAge(d1);
	if(a1>0) {		
		for( d=d1,a=a1; d>d1-10; d-- ) {
			a = qreki.getMoonAge(d-1);
			if(a<=0) {
				dStart = d-1;
				break;
			}
		}
	} else {
		for( d=d1,a=a1; d<d1+10; d++ ) {
			a = qreki.getMoonAge(d+1);
			if(a>0) {
				dStart = d;
				break;
			}
		}
	}
	moonday.startDay = dStart;
	moonday.moonDay = jd-dStart+1;
	if(qreki.getMoonAge(dStart+30)<0) {
		moonday.daysOfMonth = 30;
	} else {
		moonday.daysOfMonth = 29;
	}
	ls1 = Math.floor(qreki.getLongitudeSun(qreki.UTCtoTD(moonday.startDay))/30);	
	ls2 = Math.floor(qreki.getLongitudeSun(
                qreki.UTCtoTD(moonday.startDay+moonday.daysOfMonth))/30);	
	if(ls1==ls2) {
		moonday.chuki = -1;
	} else {
		moonday.chuki = ls2*2;
	}	
    return moonday;
};

//-------------------------------------------------------------------------------------------
//　旧暦（天保暦）を求める
//　　引き数　year：年　month：月　day:日（日本標準時)
//　　プロパティ　month：月　day:日
//　　　　　　　　uruu：閏月(true/false)　daysOfMonth：月の日数
//-------------------------------------------------------------------------------------------
qreki.getKyureki = function(year, month, day) {
	var kmonth1, kmonth2, Kmonth;
	var jd0,jd;
	var k,k1,k2,diff;
	var jd0 = qreki.getJulianDay(year, month, day, qreki.TIMEOFFSET_JP);  
	var sekki4    = new qreki.Sekki4(jd0);                                

    var qdate = new qreki.Qdate();
	kmonth1   = sekki4.before / 2 + 2;                             
	k1        = qreki.getMoonDay(sekki4.JD1); 
	k2        = qreki.getMoonDay(sekki4.JD2); 
	diff      = k2.startDay - (k1.startDay + k1.daysOfMonth); 
	if( jd0 < k1.startDay+k1.daysOfMonth ) {
		qdate.month       = kmonth1;
		qdate.day         = jd0 - k1.startDay + 1;
		qdate.daysOfMonth = k1.daysOfMonth;
		qdate.uruu        = false;
	} else {
		jd = k1.startDay+k1.daysOfMonth;	
		kmonth = kmonth1+1;
		u = 0;
		for( i=0; i<4; i++) {
			k = qreki.getMoonDay(jd);
			if(k.chuki<0) u = kmonth;
			if((jd0>=k.startDay) && (jd0<k.startDay+k.daysOfMonth)) {
				qdate.month = kmonth;
				qdate.day = jd0 - k.startDay + 1;
				qdate.daysOfMonth = k.daysOfMonth;
            }
			jd += k.daysOfMonth;
			kmonth++;
			if(kmonth>12) {
                kmonth -= 12;
            }
		}
		if((u>0)&&(diff>60)) { //間隔が60日超のとき閏月がある
			if(u<qdate.month) { //この月の前に閏月がある
				qdate.uruu = false;
				qdate.month--;
			} else if(u==qdate.month) { //この月が閏月である
				qdate.uruu = true;
				qdate.month--;
			} else { //この月の後に閏月がある
				qdate.uruu = false;
			}
		} else {
			qdate.uruu = false;
		}
	}	
    if(month < qdate.month){
        qdate.year = year - 1;
    } else {
        qdate.year = year;
    }
    return qdate;
};

//-------------------------------------------------------------------------------------------
//　旧暦コンストラクタ
//　　引き数　uruu：閏月(true/false)　kmonth：旧暦の月　kday：旧暦の日
//　　プロパティ　uruu,month,day
//-------------------------------------------------------------------------------------------
qreki.Qdate = function() {};

qreki.getQrekiToDateString = function(qy, qm, qu, qd) {
    var i,ret,date1,qdate1;
    var sunyy,sunmm,sundd;
    var jd1 = qreki.getJulianDay(qy, 1, 6, qreki.TIMEOFFSET_JP);
    var jd2 = qreki.getJulianDay(qy + 1, 4, 1, qreki.TIMEOFFSET_JP);

    i = jd1;
    for(i = jd1;i < jd2; i++) {
        date1 = qreki.getDateFromJulian(i, qreki.TIMEOFFSET_JP);
        sunyy = date1.getFullYear();
        sunmm = date1.getMonth() + 1;
        sundd = date1.getDate();
        qdate1 = qreki.getKyureki(sunyy, sunmm, sundd);
        //if(qy < qdate1.year)
        //    break;
        if(qy == qdate1.year) {
            if(qy == qdate1.year && qdate1.month == qm && qdate1.day == qd){
              ret = date1;
              break;
            }
        }
    }
    var str = "";
    if(ret) {
        str += qreki.intToString(ret.getFullYear(), 4) + "年";
        str += qreki.intToString(ret.getMonth() + 1, 2) + "月";
        str += qreki.intToString(ret.getDate(), 2) + "日";
    }
    return str;
};

