/**
 * Created by Jason Zhao Jie on 2016/11/1.
 */

/**
 * Copyright (c) 2015 ArmyAnt
 * 版权所有 (c) 2015 ArmyAnt
 *
 * Licensed under the BSD License, Version 2.0 (the License);
 * 本软件使用BSD协议保护, 协议版本:2.0
 * you may not use this file except in compliance with the License.
 * 使用本开源代码文件的内容, 视为同意协议
 * You can read the license content in the file "LICENSE" at the root of this project
 * 您可以在本项目的根目录找到名为"LICENSE"的文件, 来阅读协议内容
 * You may also obtain a copy of the License at
 * 您也可以在此处获得协议的副本:
 *
 *     http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 除非法律要求或者版权所有者书面同意,本软件在本协议基础上的发布没有任何形式的条件和担保,无论明示的或默许的.
 * See the License for the specific language governing permissions and limitations under the License.
 * 请在特定限制或语言管理权限下阅读协议
 */
"use strict";

import constants from "../constants";
import logger from "./logger";

/**
 * The datetime class, used to convert between different format of datetime
 * 一个表示日期时间的类, 可以进行不同格式的时间的转换和输出
 */
export default class DateTime {

    /**
     * Constructor, with params, the position of params can be exchange
     * @param httpStringOrCSeconds : String/Number
     *          The datetime string in HTTP format, or the ANSI-C time number
     *          HTTP格式的日期时间字符串, 或者ANSI-C标准的时间数字(从1970年开始的秒数)
     * @param formatTypeOrTimeZone : String ( DateTime.TimeStringType )
     *          The member of DateTime.TimeStringType, as the format of the HTTP string, it will be automatically judged if this param is null
     *          Or : The TimeZone string. If the first param is the ANSI-C time number, you need to input the time zone string, or the default time zone is "GMT"
     *          如果第一个参数是HTTP的日期时间字符串, 则本参数传入字符串的类型,本方法将按照指定类型进行解析.如不传,则本方法将逐一检测字符串的类型
     *          如果第一个参数是ANSI-C格式的秒数, 则本参数传入时区代表字符串. 如不传, 则默认为GMT
     */
    constructor(httpStringOrCSeconds = null, formatTypeOrTimeZone = null) {
        this.jsTime = null;
        this.timeZone = DateTime.GMT;
        if (!httpStringOrCSeconds && !formatTypeOrTimeZone)
            this.jsTime = (new Date());
        else {
            if (!Number.isNaN(Number(formatTypeOrTimeZone)) || !httpStringOrCSeconds) {
                [formatTypeOrTimeZone, httpStringOrCSeconds] = [httpStringOrCSeconds, formatTypeOrTimeZone];
            }
            if (!Number.isNaN(Number(httpStringOrCSeconds))) {
                this.jsTime = new Date();
                this.jsTime.setTime(Number(httpStringOrCSeconds) * 1000);
                if (typeof formatTypeOrTimeZone === constants.types.STRING)
                    this.timeZone = formatTypeOrTimeZone;
            } else if (typeof httpStringOrCSeconds === constants.types.STRING) {
                if (!this._setFromHttpString(httpStringOrCSeconds, formatTypeOrTimeZone) && (typeof formatTypeOrTimeZone === constants.types.STRING || !this._setFromHttpString(formatTypeOrTimeZone, httpStringOrCSeconds))) {
                    logger.warn("Cannot parse the time string of : ", httpStringOrCSeconds);
                }
            }
        }
    }

    /**
     * Output the datetime as the HTTP string by format "RFC1123"
     * @returns {string}
     */
    getHttpDateTimeString() {
        return DateTime.weekday[DateTime.daysInWeek[this.jsTime.getDay()]] + "," + this.jsTime.getDate() +
            " " + DateTime.month[DateTime.monthsInYear[this.jsTime.getMonth()]] + " " + this.jsTime.getFullYear() +
            " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.timeZone;
    }

    /**
     * Output the datetime as the HTTP string by format "RFC1036"
     * @returns {string}
     */
    getObsoleteDateTimeString() {
        return DateTime.daysInWeek[this.jsTime.getDay()] + "," + this.jsTime.getDate() + "-" + DateTime.month[DateTime.monthsInYear[this.jsTime.getMonth()]] +
            "-" + this.jsTime.getFullYear().toString(10).slice(2) + " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.timeZone;
    }

    /**
     * Output the datetime as the HTTP string by format "ANSI-C"
     * @returns {string}
     */
    getAscDateTimeString() {
        return DateTime.weekday[DateTime.daysInWeek[this.jsTime.getDay()]] + "," + DateTime.month[DateTime.monthsInYear[this.jsTime.getMonth()]] +
            " " + this.jsTime.getDate() + " " + this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds() + " " + this.jsTime.getFullYear();
    }

    /**
     * Output the time string only by the format "HH:MM:SS"
     * @returns {string}
     */
    getTimeString() {
        return this.jsTime.getHours() + ":" + this.jsTime.getMinutes() + ":" + this.jsTime.getSeconds();
    }

    /**
     * Output the datetime as the ANSI-C time seconds number
     * @returns {number}
     */
    getCTimeSeconds() {
        return this.jsTime.getTime() / 1000;
    }

    /**
     * Output the datetime as the ANSI-C time milliseconds number
     * @returns {number}
     */
    getMilliseconds() {
        return this.jsTime.getMilliseconds();
    }


    _setFromHttpString(str, type = DateTime.TimeStringType.Http) {
        // Parse to words
        let words = logger.parseToWords(str, "TIME");
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
        if (words.length !== 8 || (type === DateTime.TimeStringType.Ansi && words.length !== 7))
            return false;
        if (type === DateTime.TimeStringType.Ansi) {
            let tmp = words[1];
            words[1] = words[2];
            words[2] = tmp;
            tmp = words[6];
            words[6] = words[5];
            words[5] = words[4];
            words[4] = words[3];
            words[3] = tmp;
        }

        // Check words type
        if (Number.isNaN(Number(words[1])) || Number.isNaN(Number(words[3])) || Number.isNaN(Number(words[4])) || Number.isNaN(Number(words[5])) || Number.isNaN(Number(words[6])) || !Number.isNaN(Number(words[0])) || !Number.isNaN(Number(words[2])))
            return false;

        // Set time
        this.jsTime = new Date();
        let year = parseInt(words[3], 10);
        if (year < 100)
            year += (year >= 70 ? 1900 : 2000);
        this.jsTime.setYear(year);
        this.jsTime.setMonth(DateTime.monthsInYear.contains(DateTime.month.contains(words[2])));
        this.jsTime.setDate(parseInt(words[1], 10));
        this.jsTime.setHours(parseInt(words[4], 10), parseInt(words[5], 10), parseInt(words[6], 10));
        if (words[7])
            this.timeZone = words[7];
        return words[7] === DateTime.daysInWeek[this.jsTime.getDay()] || words[7] === DateTime.weekday[DateTime.daysInWeek[this.jsTime.getDay()]];
    }

}

/**
 * The strings present by the HTTP time string format
 * @type {{Obsolete: string, Http: string, Ansi: string}}
 */
DateTime.TimeStringType = {Obsolete: Symbol("RFC1036"), Http: Symbol("RFC1123"), Ansi: Symbol("ANSI")};

/**
 * The array of each day in a week
 * @type {string[]}
 */
DateTime.daysInWeek = [Symbol("Sunday"), Symbol("Monday"), Symbol("Tuesday"), Symbol("Wednesday"), Symbol("Thursday"), Symbol("Friday"), Symbol("Saturday")];

DateTime.weekday = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tues",
    Wednesday: "Wed",
    Thursday: "Thur",
    Friday: "Fri",
    Saturday: "Sat"
};

/**
 * The array of each month in a year
 * @type {string[]}
 */
DateTime.monthsInYear = [Symbol("January"), Symbol("February"), Symbol("March"), Symbol("April"), Symbol("May"), Symbol("June"), Symbol("July"), Symbol("August"), Symbol("September"), Symbol("October"), Symbol("November"), Symbol("December")];
DateTime.month = {
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

DateTime.GMT = "GMT";
