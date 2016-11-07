/**
 * Created by Jason Zhao Jie on 2016/11/1.
 */

(function () {

    /*
     *
     *
     */
    this.libArmyAnt.DateTime = this.libArmyAnt.Object.inherit({
        jsTime: null,
        timeZone: "GMT",

        ctor: function (httpStringOrCSeconds,formatTypeOrTimeZone) {
            this.base.ctor();
            var tmp = formatTypeOrTimeZone;
            if((typeof httpStringOrCSeconds == "undefined" || !httpStringOrCSeconds)&&(typeof formatTypeOrTimeZone == "undefined" || !formatTypeOrTimeZone))
                this.jsTime = (new Date());
            else {
                if(     (formatTypeOrTimeZone != NaN && (typeof formatTypeOrTimeZone == "number" || Number(formatTypeOrTimeZone) != NaN))
                        (typeof formatTypeOrTimeZone == "string" && (typeof httpStringOrCSeconds == "undefined" || !httpStringOrCSeconds))
                   ){
                    formatTypeOrTimeZone = httpStringOrCSeconds;
                    httpStringOrCSeconds = tmp;
                }
                if(httpStringOrCSeconds != NaN && (typeof httpStringOrCSeconds == "number" || Number(httpStringOrCSeconds) != NaN)){
                    this.jsTime = new Date();
                    this.jsTime.setTime(httpStringOrCSeconds * 1000);
                    if(typeof formatTypeOrTimeZone == "string")
                        this.timeZone = formatTypeOrTimeZone;
                }else if(typeof httpStringOrCSeconds == "string"){
                    if(!this._setFromHttpString(httpStringOrCSeconds,formatTypeOrTimeZone) && (typeof formatTypeOrTimeZone == "string" || !this._setFromHttpString(formatTypeOrTimeZone, httpStringOrCSeconds))){
                        libArmyAnt.warn("Cannot parse the time string of : ", httpStringOrCSeconds);
                    }
                }
            }
        },

        getHttpDateTimeString: function () {
            return this.libArmyAnt.DateTime.weekday[libArmyAnt.DateTime.daysInWeek[this.jsTime.getDay()]] + "," + this.jsTime.getDate() +
                " " + libArmyAnt.DateTime.month[libArmyAnt.DateTime.monthsInYear[this.jsTime.getMonth()]] + " " + this.jsTime.getFullYear() +
                " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.timeZone;
        },

        getHttpDateTimeString: function () {
            return libArmyAnt.DateTime.daysInWeek[this.jsTime.getDay()] + "," + this.jsTime.getDate() + "-" + libArmyAnt.DateTime.month[libArmyAnt.DateTime.monthsInYear[this.jsTime.getMonth()]] +
                "-" + this.jsTime.getFullYear().toString(10).slice(2) + " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.timeZone;
        },

        getAscDateTimeString: function () {
            return this.libArmyAnt.DateTime.weekday[libArmyAnt.DateTime.daysInWeek[this.jsTime.getDay()]] + "," +libArmyAnt.DateTime.month[libArmyAnt.DateTime.monthsInYear[this.jsTime.getMonth()]] +
                " " + this.jsTime.getDate() + " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.jsTime.getFullYear();
        },

        getTimeString: function(){
            return this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds();
        },

        getCTimeSeconds: function(){
            return this.jsTime.getTime() / 1000;
        },

        getMilliseconds: function(){
            return this.jsTime.getMilliseconds();
        },


        _setFromHttpString: function(str, type) {
            // Parse to words
            var words = libArmyAnt.parseToWords(str, "TIME");
            if (!words)
                return false;

            // Remove no-use separators
            words.remove(" ");
            words.remove("\t");
            words.remove("\r");
            words.remove("\n");
            words.remove("-");
            words.remove(":");
            words.remove(",");

            // Check words number
            if (words.length !== 8 || (type == libArmyAnt.DateTime.TimeStringType.Ansi && words.length !== 7))
                return false;
            if (((typeof type == "undefined" || !type) && (Number(words[2]) !== NaN && Number(words[1]) === NaN)) || (type === libArmyAnt.DateTime.TimeStringType.Ansi)) {
                var tmp = words[1];
                words[1] = words[2];
                words[2] = tmp;
                tmp = words[6];
                words[6] = words[5];
                words[5] = words[4];
                words[4] = words[3];
                words[3] = tmp;
            }

            // Check words type
            if (isNaN(Number(words[1])) || isNaN(Number(words[3])) || isNaN(Number(words[4])) || isNaN(Number(words[5])) || isNaN(Number(words[6])) || !isNaN(Number(words[0])) || !isNaN(Number(words[2])))
                return false;

            // Set time
            this.jsTime = new Date();
            var year = parseInt(words[3],10);
            if(year<100)
                year += (year>=70?1900:2000);
            this.jsTime.setYear(year);
            this.jsTime.setMonth(libArmyAnt.DateTime.monthsInYear.contains(libArmyAnt.DateTime.month.contains(words[2])));
            this.jsTime.setDate(parseInt(words[1],10));
            this.jsTime.setHours(parseInt(words[4],10),parseInt(words[5],10),parseInt(words[6],10));
            if(words[7])
                this.timeZone = words[7];
            return words[7] === libArmyAnt.DateTime.daysInWeek[this.jsTime.getDay()] || words[7] === libArmyAnt.DateTime.weekday[libArmyAnt.DateTime.daysInWeek[this.jsTime.getDay()]];
        }
    });

    this.libArmyAnt.DateTime.TimeStringType = {Obsolete:"RFC1036",Http:"RFC1123",Ansi:"ANSI"};

    this.libArmyAnt.DateTime.daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.libArmyAnt.DateTime.weekday = {
        Sunday: "Sun",
        Monday: "Mon",
        Tuesday: "Tues",
        Wednesday: "Wed",
        Thursday: "Thur",
        Friday: "Fri",
        Saturday: "Sat"
    };

    this.libArmyAnt.DateTime.monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.libArmyAnt.DateTime.month = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec"
    };

    this.libArmyAnt._onInitialized();
})();