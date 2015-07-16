
//====================================== 
////                                        .year .month .day .isLeap
//function Lunar(objDate) {
//
//var i, leap=0, temp=0;
//var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
//
//for(i=1900; i<2050 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }
//
//if(offset<0) { offset+=temp; i--; }
//
//this.year = i;
//
//leap = leapMonth(i); //
//this.isLeap = false;
//
//for(i=1; i<13 && offset>0; i++) {
////
//if(leap>0 && i==(leap+1) && this.isLeap==false)
//{ --i; this.isLeap = true; temp = leapDays(this.year); }
//else
//{ temp = monthDays(this.year, i); }
//
////
//if(this.isLeap==true && i==(leap+1)) this.isLeap = false;
//
//offset -= temp;
//}
//
//if(offset==0 && leap>0 && i==leap+1)
//if(this.isLeap)
//{ this.isLeap = false; }
//else
//{ this.isLeap = true; --i; }
//
//if(offset<0){ offset += temp; --i; }
//
//this.month = i;
//this.day = offset + 1;
//}
//
