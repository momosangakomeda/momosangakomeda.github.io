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
//-------------------------------------------------------------------------------------------
//　グローバル変数
//-------------------------------------------------------------------------------------------
var sekki24 = new Array("春分","清明","穀雨","立夏","小満","芒種",
					"夏至","小暑","大暑","立秋","処暑","白露",
					"秋分","寒露","霜降","立冬","小雪","大雪",
					"冬至","小寒","大寒","立春","雨水","啓蟄");
var rokuyo = new Array("","","","","","");//迷信削除
var	jukkan = new Array( "甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var	junishi = new Array( "子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","癸");

//-------------------------------------------------------------------------------------------
//　年月日からユリウス日への変換
//　　引き数　year：年　month：月　day:日（時間は少数で表現）
//            timeOffset：時差（単位：時間　日本の場合-9）
//            1582/10/15以後はグレゴリオ暦の年月日、それ以前はユリウス暦の年月日
//　　戻り値　ユリウス日（世界時）
//-------------------------------------------------------------------------------------------
function getJulianDay(year,month,day,timeOffset) {
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
}
//-------for debugging--------------------------------------------------------------------
function printJulianDay(year,month,day,timeOffset) { 
	var jd = getJulianDay(year,month,day,timeOffset);
	document.write("JD=",jd," Date=");
	document.write(getStringDate(year,month,day,timeOffset));
}

//-------------------------------------------------------------------------------------------
//　世界時から力学時への変換
//　　引き数　jd：ユリウス日（世界時）
//　　戻り値　J2000.0（2000.1.1.12hTD）基準のユリウス世紀（力学時）
//-------------------------------------------------------------------------------------------
function UTCtoTD(jd) {
	var t;
	t = 65*(jd-2415020)/115264134000000;
	t +=  (jd-2451545)/36525;
	return t;
}

//-------------------------------------------------------------------------------------------
//　ユリウス日から年月日への変換
//　　引き数　jd:ユリウス日（世界時）
//            timeOffset：時差（単位：時間　日本の場合-9）
//　　プロパティ　グレゴリオ暦の年月日
//　　　　　　　　year：年　month：月　day:日（時間は少数で表現）
//-------------------------------------------------------------------------------------------
function JulianToDate(jd,timeOffset) {
	var y,m,d;
	var n,z,f,aa,a,b,c,k,e;
	n = jd - timeOffset/24 + 0.5;
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
	this.year = y;
	this.month = m;
	this.day = d;
}
//-------for debugging--------------------------------------------------------------------
function printDate(jd,timeOffset) { 
	var date = new JulianToDate(jd,timeOffset);
	document.write("JD=",jd," Date=");
	document.write(getStringDate(date.year,date.month,date.day,timeOffset));
}

//-------------------------------------------------------------------------------------------
//　角度を0-360の範囲に正規化
//　　引き数　angle：角度（単位：度）
//　　戻り値　角度（単位：度）0<=角度<360
//-------------------------------------------------------------------------------------------
function regAngle(angle) {
	var a;
	a = Math.floor(angle/360);
	a = angle-a*360;
	return a;
}

//-------------------------------------------------------------------------------------------
//　角度を-180-180の範囲に正規化
//　　引き数　angle：角度（単位：度）
//　　戻り値　角度（単位：度）-180<=角度<180
//-------------------------------------------------------------------------------------------
function regAngle180(angle) {
	var a;
	a = regAngle(angle) ;
	if(a>180) a-=360;
	return a;
}

//-------------------------------------------------------------------------------------------
//　年月日を表示用に文字列に変換
//　　引き数　year：年　month：月　day:日（時間は少数で表現）
// 				timeOffset：時差（単位：時間　日本の場合-9）
//　　戻り値　日付けの文字列　例：2002.01.12 13:05:24 UTC-0900
//-------------------------------------------------------------------------------------------
function getStringDate(year,month,day,timeOffset) {
	var dateStr = "";
	year = Math.floor(year);
	month = Math.floor(month);
	timeOffset = Math.floor(timeOffset);
	var a = day;		var d = Math.floor(a);
	var a = (a-d)*24;	var h = Math.floor(a);
	var a = (a-h)*60;	var m = Math.floor(a);
	var a = (a-m)*60;	var s = Math.floor(a+0.5);
    
	dateStr += intToString(year,4);
	dateStr += "."+intToString(month,2);
	dateStr += "."+intToString(d,2);
	dateStr += " "+intToString(h,2);
	dateStr += ":"+intToString(m,2);
	dateStr += ":"+intToString(s,2);
	if(timeOffset<0) {
		dateStr += " UTC-"+intToString(Math.abs(timeOffset),2);
	} else {
		dateStr += " UTC+"+intToString(timeOffset,2);
	}
	dateStr += "00";
	return dateStr;
}

//-------------------------------------------------------------------------------------------
//　年月日を表示用に文字列に変換（短い表示）
//　　引き数　year：年　month：月　day:日
//　　戻り値　日付けの文字列　例：02.01.12
//-------------------------------------------------------------------------------------------
function getShortStringDate(year,month,day) {
	var dateStr = "";
	year = Math.floor(year)%100;
	month = Math.floor(month);
	day = Math.floor(day);
	dateStr += intToString(year,2);
	dateStr += "."+intToString(month,2);
	dateStr += "."+intToString(day,2);
	return dateStr;
}

//-------------------------------------------------------------------------------------------
//　整数を指定桁の文字列に変換
//　　引き数　n：整数　stringLength：出力桁数
//　　戻り値　0を前につけて桁数を合わせた文字列
//-------------------------------------------------------------------------------------------
function intToString(n,stringLength) {
	var str = "" + Math.abs(n);	
	if( str.length<stringLength ) {
		var k = stringLength-str.length;
		for(j=0;j<k;j++)  str = "0"+str;
	}
	if(n<0)  str = "-"+str;
	return str;
}	

//-------------------------------------------------------------------------------------------
//　太陽の視黄経を求める
//　　引き数　t:ユリウス世紀（力学）
//　　戻り値　太陽の視黄経（単位：度）
//-------------------------------------------------------------------------------------------
function LongitudeSun(t) {
	var kr = Math.PI / 180;
	var a;
	//-----------------------------------------------------------------------
	// 計算誤差を最小にするため、小さな項から加算する
	//-----------------------------------------------------------------------
	with(Math) {
	a  = 0.0004 * cos( kr*regAngle( 31557*t + 161 ) );
	a += 0.0004 * cos( kr*regAngle( 29930*t + 48 ) );
	a += 0.0005 * cos( kr*regAngle( 2281*t + 221 ) );
	a += 0.0005 * cos( kr*regAngle( 155*t + 118 ) );
	a += 0.0006 * cos( kr*regAngle( 33718*t + 316 ) );
	a += 0.0007 * cos( kr*regAngle( 9038*t + 64 ) );
	a += 0.0007 * cos( kr*regAngle( 3035*t + 110 ) );
	a += 0.0007 * cos( kr*regAngle( 65929*t + 45 ) );
	a += 0.0013 * cos( kr*regAngle( 22519*t + 352 ) );
	a += 0.0015 * cos( kr*regAngle( 45038*t + 254 ) );
	a += 0.0018 * cos( kr*regAngle( 445267*t + 208 ) );
	a += 0.0018 * cos( kr*regAngle( 19*t + 159 ) );
	a += 0.0020 * cos( kr*regAngle( 32964*t + 158 ) );
	a -= 0.0048 * cos( kr*regAngle( 35999*t + 268 ) ) * t;
	a += 0.0200 * cos( kr*regAngle( 71998.1*t + 265.1 ) );
	a += 1.9147 * cos( kr*regAngle( 35999.05*t + 267.52 ) );
	a += regAngle( 36000.7695*t + 280.4659 );
	//　光行差による視黄経への変換
	a += -0.0057 + 0.0048*cos( kr*regAngle( 1934*t + 145 ) );
	}
	return regAngle(a);
}

//-------------------------------------------------------------------------------------------
//　月の視黄経を求める
//　　引き数　t:ユリウス世紀（力学）
//　　戻り値　月の視黄経（単位：度）
//-------------------------------------------------------------------------------------------
function LongitudeMoon(t) {
	var kr = Math.PI / 180;
	var a;
	//-----------------------------------------------------------------------
	// 計算誤差を最小にするため、小さな項から加算する
	//-----------------------------------------------------------------------
	with(Math) {
	a  = 0.0003 * cos( kr*regAngle( 2322131*t + 191 ) );
	a += 0.0003 * cos( kr*regAngle( 4067*t + 70 ) );
	a += 0.0003 * cos( kr*regAngle( 549197*t + 220 ) );
	a += 0.0003 * cos( kr*regAngle( 1808933*t + 58 ) );
	a += 0.0003 * cos( kr*regAngle( 349472*t + 337 ) );
	a += 0.0003 * cos( kr*regAngle( 381404*t + 354 ) );
	a += 0.0003 * cos( kr*regAngle( 958465*t + 340 ) );
	a += 0.0004 * cos( kr*regAngle( 12006*t + 187 ) );
	a += 0.0004 * cos( kr*regAngle( 39871*t + 223 ) );
	a += 0.0005 * cos( kr*regAngle( 509131*t + 242 ) );
	a += 0.0005 * cos( kr*regAngle( 1745069*t + 24 ) );
	a += 0.0005 * cos( kr*regAngle( 1908795*t + 90 ) );
	a += 0.0006 * cos( kr*regAngle( 2258267*t + 156 ) );
	a += 0.0006 * cos( kr*regAngle( 111869*t + 38 ) );
	a += 0.0007 * cos( kr*regAngle( 27864*t + 127 ) );
	a += 0.0007 * cos( kr*regAngle( 485333*t + 186 ) );
	a += 0.0007 * cos( kr*regAngle( 405201*t + 50 ) );
	a += 0.0007 * cos( kr*regAngle( 790672*t + 114 ) );
	a += 0.0008 * cos( kr*regAngle( 1403732*t + 98 ) );
	a += 0.0009 * cos( kr*regAngle( 858602*t + 129 ) );
	a += 0.0011 * cos( kr*regAngle( 1920802*t + 186 ) );
	a += 0.0012 * cos( kr*regAngle( 1267871*t + 249 ) );
	a += 0.0016 * cos( kr*regAngle( 1856938*t + 152 ) );
	a += 0.0018 * cos( kr*regAngle( 401329*t + 274 ) );
	a += 0.0021 * cos( kr*regAngle( 341337*t + 16 ) );
	a += 0.0021 * cos( kr*regAngle( 71998*t + 85 ) );
	a += 0.0021 * cos( kr*regAngle( 990397*t + 357 ) );
	a += 0.0022 * cos( kr*regAngle( 818536*t + 151 ) );
	a += 0.0023 * cos( kr*regAngle( 922466*t + 163 ) );
	a += 0.0024 * cos( kr*regAngle( 99863*t + 122 ) );
	a += 0.0026 * cos( kr*regAngle( 1379739*t + 17 ) );
	a += 0.0027 * cos( kr*regAngle( 918399*t + 182 ) );
	a += 0.0028 * cos( kr*regAngle( 1934*t + 145 ) );
	a += 0.0037 * cos( kr*regAngle( 541062*t + 259 ) );
	a += 0.0038 * cos( kr*regAngle( 1781068*t + 21 ) );
	a += 0.0040 * cos( kr*regAngle( 133*t + 29 ) );
	a += 0.0040 * cos( kr*regAngle( 1844932*t + 56 ) );
	a += 0.0040 * cos( kr*regAngle( 1331734*t + 283 ) );
	a += 0.0050 * cos( kr*regAngle( 481266*t + 205 ) );
	a += 0.0052 * cos( kr*regAngle( 31932*t + 107 ) );
	a += 0.0068 * cos( kr*regAngle( 926533*t + 323 ) );
	a += 0.0079 * cos( kr*regAngle( 449334*t + 188 ) );
	a += 0.0085 * cos( kr*regAngle( 826671*t + 111 ) );
	a += 0.0100 * cos( kr*regAngle( 1431597*t + 315 ) );
	a += 0.0107 * cos( kr*regAngle( 1303870*t + 246 ) );
	a += 0.0110 * cos( kr*regAngle( 489205*t + 142 ) );
	a += 0.0125 * cos( kr*regAngle( 1443603*t + 52 ) );
	a += 0.0154 * cos( kr*regAngle( 75870*t + 41 ) );
	a += 0.0304 * cos( kr*regAngle( 513197.9*t + 222.5 ) );
	a += 0.0347 * cos( kr*regAngle( 445267.1*t + 27.9 ) );
	a += 0.0409 * cos( kr*regAngle( 441199.8*t + 47.4 ) );
	a += 0.0458 * cos( kr*regAngle( 854535.2*t + 148.2 ) );
	a += 0.0533 * cos( kr*regAngle( 1367733.1*t + 280.7 ) );
	a += 0.0571 * cos( kr*regAngle( 377336.3*t + 13.2 ) );
	a += 0.0588 * cos( kr*regAngle( 63863.5*t + 124.2 ) );
	a += 0.1144 * cos( kr*regAngle( 966404*t + 276.5 ) );
	a += 0.1851 * cos( kr*regAngle( 35999.05*t + 87.53 ) );
	a += 0.2136 * cos( kr*regAngle( 954397.74*t + 179.93 ) );
	a += 0.6583 * cos( kr*regAngle( 890534.22*t + 145.7 ) );
	a += 1.2740 * cos( kr*regAngle( 413335.35*t + 10.74 ) );
	a += 6.2888 * cos( kr*regAngle( 477198.868*t + 44.963 ) );
	a += regAngle( 481267.8809*t + 218.3162 );
	}
	return regAngle(a);
}

//-------------------------------------------------------------------------------------------
//　月齢を求める
//　　引き数　jd:ユリウス日（世界時）
//　　戻り値　月齢（単位：度）-180<=角度<180　朔の時が0
//-------------------------------------------------------------------------------------------
function MoonAge(jd) {
	var t = UTCtoTD(jd);
	return regAngle180(LongitudeMoon(t)-LongitudeSun(t));
}

//-------------------------------------------------------------------------------------------
//　太陽視黄経が引き数の角度になる入力日前後のユリウス日を求める
//　　引き数　ls：太陽視黄経（0<=ls<360）　jd：ユリウス日　timeOffset：時差
//　　　　　　ba：ba<=0の時入力日前　ba>0の時入力日後のユリウス日を求める
//　　戻り値　太陽視黄経がlsになる瞬間を含む年月日の午前0時（地方時）のユリウス日
//-------------------------------------------------------------------------------------------
function getSekkiDay(ls,jd,timeOffset,ba) {
	var k = 0.985647351;
	var offset = 0.5+timeOffset/24;
	var answer;
	var d0,a0,d1,a1,a,d;
	if(ba<=0) {
		d0 = Math.floor(jd-offset) + offset + 1;
		a0 = regLS(d0,ls);
		if(a0<0) a0 += 360;
	} else {
		d0 = Math.floor(jd-offset) + offset;
		a0 = regLS(d0,ls);
		if(a0>0) a0 -= 360;
	}
	d1 = Math.floor( d0-a0/k-offset+0.5 ) + offset;
	a1 = regLS(d1,ls);
	if(a1>0) {		
		for( d=d1,a=a1; d>d1-10; d-- ) {
			a = regLS(d-1,ls);
			if(a<=0) {
				answer = d-1;
				break;
			}
		}
	} else {
		for( d=d1,a=a1; d<d1+10; d++ ) {
			a = regLS(d+1,ls);
			if(a>0) {
				answer = d;
				break;
			}
		}
	}
	return answer;	
}

//-------------------------------------------------------------------------------------------
//　太陽視黄経が引き数の角度になった時に０となるよう正規化
//　　引き数　jd:ユリウス日（世界時）　ls：目標とする視黄経（単位：度）
//　　戻り値　視黄経の目標との差（単位：度）-180<=角度<180
//-------------------------------------------------------------------------------------------
function regLS(jd,ls) { 
	return regAngle180(LongitudeSun(UTCtoTD(jd))-ls);
}

//-------------------------------------------------------------------------------------------
//　年間の２４節気を求める（入力日以降のもの）
//　　引き数　jd:ユリウス日（世界時）
//　　プロパティ　name：２４節気の名前
//　　　　　　　　JD：２４節気を含む日午前０時のユリウス日（日本時間）
//-------------------------------------------------------------------------------------------
function get24Sekki(jd) {
	var timeOffset = -9;
	var sekkiName = new Array(24); 
	var sekkiJD = new Array(24); 
	
	var k = Math.ceil(LongitudeSun(UTCtoTD(jd))/15); 
	for(i=0;i<24;i++,k++) {
		if(k==24) k=0;
		sekkiName[i] = sekki24[k];
		sekkiJD[i] = getSekkiDay(k*15,jd,timeOffset,1)
	}
	this.name = sekkiName;
	this.JD = sekkiJD;
}
//-------for debugging--------------------------------------------------------------------
function print24Sekki(jd) { //
	var date = new JulianToDate(jd,-9);
	var sekki = new get24Sekki(jd);
	document.write("基準日=",date.year,".",date.month,".",date.month,"<br>");		
	for( i=0; i<24; i++) {
		date = new JulianToDate(sekki.JD[i],-9);
		document.write(sekki.name[i],"　",date.year,".",date.month,".",date.day,"<br>");
	}
}

//-------------------------------------------------------------------------------------------
//　入力日直前直後の二分ニ至（春分、夏至、秋分、冬至）を求める
//　　引き数　jd:ユリウス日（世界時）
//　　プロパティ　before：直前の二分ニ至　after：直後の二分ニ至
//　　　　　　　　JD1：直前の二分ニ至のユリウス日
//　　　　　　　　JD2：直後の二分ニ至のユリウス日
//-------------------------------------------------------------------------------------------
function get4Sekki(jd) {
	var timeOffset=-9;
	var k = Math.floor(LongitudeSun(UTCtoTD(jd))/90);
	this.before = k*6;
	this.JD1 = getSekkiDay(k*90,jd,timeOffset,-1)
	k++;	if(k==4) k=0;
	this.after = k*6;
	this.JD2 = getSekkiDay(k*90,jd,timeOffset,1)
}

//-------------------------------------------------------------------------------------------
//　陰暦の朔望日を求める
//　　引き数　jd:ユリウス日（世界時）
//　　プロパティ　moonDay：朔望日
//　　　　　　　　startDay：月が朔になる瞬間を含む年月日の午前0時（JST）のユリウス日
//　　　　　　　　daysOfMonth：月の日数
//　　　　　　　　chuki：この月が含む中気の24節気番号（含まない時は-1）
//-------------------------------------------------------------------------------------------
function getMoonDay(jd) {
	var k = 12.19074911;
	var d0,a0,d1,a1,a,d;
	var dStart,days;
	var ls1,ls2;
	d0 = jd+1;
	a0 = MoonAge(d0);
	if(a0<0) a0 += 360;
	d1 = d0 - Math.floor( a0/k+0.5 );
	a1 = MoonAge(d1);
	if(a1>0) {		
		for( d=d1,a=a1; d>d1-10; d-- ) {
			a = MoonAge(d-1);
			if(a<=0) {
				dStart = d-1;
				break;
			}
		}
	} else {
		for( d=d1,a=a1; d<d1+10; d++ ) {
			a = MoonAge(d+1);
			if(a>0) {
				dStart = d;
				break;
			}
		}
	}
	this.startDay = dStart;
	this.moonDay = jd-dStart+1;
	if(MoonAge(dStart+30)<0) {
		this.daysOfMonth = 30;
	} else {
		this.daysOfMonth = 29;
	}
	ls1 = Math.floor(LongitudeSun(UTCtoTD(this.startDay))/30);	
	ls2 = Math.floor(LongitudeSun(UTCtoTD(this.startDay+this.daysOfMonth))/30);	
	if(ls1==ls2) {
		this.chuki = -1;
	} else {
		this.chuki = ls2*2;
	}	
}

//-------------------------------------------------------------------------------------------
//　旧暦（天保暦）を求める
//　　引き数　year：年　month：月　day:日（日本標準時)
//　　プロパティ　month：月　day:日　rokuyo:六曜
//　　　　　　　　uruu：閏月(true/false)　daysOfMonth：月の日数
//-------------------------------------------------------------------------------------------
function getKyureki(year,month,day) {
	var timeOffset=-9;
	var sekki4,kmonth1,kmonth2,Kmonth;
	var jd0,jd;
	var k,k1,k2,diff;
	
	jd0 = getJulianDay(year,month,day,timeOffset);
	sekki4 = new get4Sekki(jd0) ;
	kmonth1 = sekki4.before/2 + 2;
	k1 = new getMoonDay(sekki4.JD1);
	k2 = new getMoonDay(sekki4.JD2);
	diff = k2.startDay-(k1.startDay+k1.daysOfMonth); 
	if( jd0<k1.startDay+k1.daysOfMonth ) {
		this.month = kmonth1;
		this.day = jd0 - k1.startDay + 1;
		this.daysOfMonth = k1.daysOfMonth;
		this.uruu = false;
	} else {
		jd = k1.startDay+k1.daysOfMonth;	
		kmonth = kmonth1+1;
		u = 0;
		for( i=0; i<4; i++) {
			k = new getMoonDay(jd);
			if(k.chuki<0) u = kmonth;
			if( (jd0>=k.startDay)&&(jd0<k.startDay+k.daysOfMonth) ) {
				this.month = kmonth;
				this.day = jd0 - k.startDay + 1;
				this.daysOfMonth = k.daysOfMonth;
		}
			jd += k.daysOfMonth;
			kmonth++;
			if(kmonth>12) kmonth-=12;
		}
		if((u>0)&&(diff>60)) { //間隔が60日超のとき閏月がある
			if(u<this.month) { //この月の前に閏月がある
				this.uruu = false;
				this.month--;
			} else if(u==this.month) { //この月が閏月である
				this.uruu = true;
				this.month--;
			} else { //この月の後に閏月がある
				this.uruu = false;
			}
		} else {
			this.uruu = false;
		}
	}	
	this.rokuyo = getRokuyo(this.month,this.day);
}

//-------------------------------------------------------------------------------------------
//　旧暦コンストラクタ
//　　引き数　uruu：閏月(true/false)　kmonth：旧暦の月　kday：旧暦の日
//　　プロパティ　uruu,month,day,rokuyo
//-------------------------------------------------------------------------------------------
function kDate(uruu,kmonth,kday) {
	this.uruu = uruu;
	this.month = kmonth;
	this.day = kday;
	this.rokuyo = getRokuyo(kmonth,kday);
}

//-------------------------------------------------------------------------------------------
//　六曜の計算
//　　引き数　kmonth：旧暦の月　kday：旧暦の日
//　　戻り値　その日の六曜　
//-------------------------------------------------------------------------------------------
function getRokuyo(kmonth,kday) {
	return rokuyo[(kmonth+kday-2)%6];
}

//-------------------------------------------------------------------------------------------
//　年の干支計算
//　　引き数　year:西暦年
//　　戻り値　その年の干支　
//-------------------------------------------------------------------------------------------
function eto_year(year) {
	return jukkan[(year+6)%10]+junishi[(year+8)%12];
}

//-------------------------------------------------------------------------------------------
//　日の干支計算
//　　引き数　year：年　month：月　day:日
//　　戻り値　その日の干支　
//-------------------------------------------------------------------------------------------
function eto_day(year,month,day) {
	var day0 = new Date(1900,0,1); //基準日
	var day = new Date(year,month-1,day);
	var time = day.getTime()-day0.getTime();
	var d = Math.floor(time/(24*60*60*1000)+.5); //基準日との差（単位：日）
	var d10 = (d+0)%10; if(d10<0) d10+=10;
	var d12 = (d+10)%12; if(d12<0) d12+=12;
	return jukkan[ d10 ]+junishi[ d12 ];
}

//-------------------------------------------------------------------------------------------
//　カレンダーをドキュメントに表示する
//　　引き数　year：年　month：月
//-------------------------------------------------------------------------------------------
function showCalender(year,month) {
	var startDay;
	var day;
	var date = new Date( year, month-1, 1);
	var monthdays = new Array( 31,28,31,30,31,30,31,31,30,31,30,31 );
	var days = new Array( "日","月","火","水","木","金","土" );
	var q; //旧暦オブジェクト
	var etoy,eto; //年の干支、日の干支
	var d;
	if(((year%4==0)&&(year%100!=0))||(year%400==0)) monthdays[1]=29;
	var thisMonthdays=monthdays[month-1];
	var qArray = new Array(thisMonthdays);
    
	q = new getKyureki(year,month,1);
	d = q.day;
	for(day=1; day<=thisMonthdays; day++) {
		if(d>q.daysOfMonth) {
			q = new getKyureki(year,month,day);
			d = 1;
		}
		qArray[day-1]= new kDate(q.uruu,q.month,d);
		d++;
	}
    
	startDay=date.getDay();
	document.write("<table border='1' bordercolor='#666666' cellspacing='0' cellpadding='2'bgcolor='#ffffff' >");
	document.write("<tr bgcolor='#000000'><th colspan='7'><div align=center><font color='#FFFFFF'>",year,'年 ',month,'月</th></tr>');
	document.write("<tr bgcolor='#bbbbbb'><th><div align='center'><font color='#FF0000'>"+days[0]+"</font></th>");
	for(i=1;i<7;i++){
		document.write("<th><div align='center'><font color='#000000'>",days[i],"</font></th>");
	}
	document.write("</tr>");
	document.write("<tr>");
	var col=0;
	for(i=0;i<startDay;i++){
		 document.write("<td>&nbsp;</td>");
		 col++;
	}
	for(day=1;day<=thisMonthdays;day++){
		eto = eto_day( year,month,day);
		if(col==0){
	 		document.write("<td> <div align='center'><b><font size='5' color='#FF0000'face='Arial Black'>",day,"</font></b><br>");
		} else {
		 	document.write("<td> <div align='center'><b><font size='5' color='#666666'face='Arial Black'>",day,"</font></b><br>");
		}
		if(qArray[day-1].uruu) {
	 		document.write("<font size='2' color='#000000'>閏",qArray[day-1].month,".",qArray[day-1].day,
											"<font size='1' color='#000000'>",getRokuyo(qArray[day-1].month,qArray[day-1].day),"<br><font size='2' color='#ffffff'>");
		} else {
	 		document.write("<font size='2' color='#000000'>",qArray[day-1].month,"月",qArray[day-1].day,
											"<font size='2' color='#666666'>日<br></font><font size='1' color='#666666'>",getRokuyo(qArray[day-1].month,qArray[day-1].day),"<font color=ffffff  size=1>");
		}
		document.write(eto,"</font></div></td>");
		col++;
		if(col==7){
			document.write("</tr><tr>");
			col=0;
		}
	}
	if(col>0) {
		for(;col<7;col++){
			 document.write("<td>&nbsp;</td>");
		}
	}
	document.write("</table>");
}

//-------------------------------------------------------------------------------------------
//　二十四節気をドキュメントに表示する（引き数以降の一年間）
//　　引き数　year：年　month：月　day：日
//-------------------------------------------------------------------------------------------
function show24Sekki(year,month,day) {
	var jd = getJulianDay(year,month,day,-9);
	sekki = new get24Sekki(jd);
	for( i=0;i<24;i++) {
		date = new JulianToDate(sekki.JD[i],-9);		
		document.write(sekki.name[i]," ");
		document.write(getShortStringDate(date.year,date.month,date.day));
		document.write("<br>");
	}
}

