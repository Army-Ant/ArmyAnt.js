let mode = "note"

export default {
    /**
     * Print debug messages with setting mode
     * @param mode : string
     *              Set the mode, one of "log" "warn" "assert" "error"
     * @param array : Array
     * @private
     */

    _print (mode, array) {
        let modeNum = 0;
        switch (mode) {
            case "log":
                modeNum = 1;
                break;
            case "warn":
                modeNum = 2;
                break;
            case "assert":
                modeNum = 3;
                break;
            case "error":
                modeNum = 4;
                break;
            default:
                modeNum = 0;
                return;
        }
        let ret = "ArmyAnt : ";
        for (let i = 0; i < array.length; i++) {
            ret += " " + array[i];
        }
        switch (mode) {
            case "log":
                if (modeNum > 1)
                    return;
                console.log(ret);
                break;
            case "warn":
                if (modeNum > 2)
                    return;
                console.warn(ret);
                break;
            case "assert":
                if (modeNum > 3)
                    return;
                console.assert(ret);
                break;
            case "error":
                if (modeNum > 4)
                    return;
                console.error(ret);
                break;
            default:
                console.info(ret);
                break;
        }
    },

    log (...args) {
        this._print("log", args);
    },
    warn (...args) {
        this._print("warn", args);
    },
    assert (...args) {
        this._print("assert", args);
    },
    error (...args) {
        this._print("error", args);
    },

    parseToWords (string, separators = "default") {
        if (separators === "PRO") {
            separators = ["===", "!==", "::", "++", "--", "+=", "-=", "*=", "/=", "%=", "<=", ">=", "==", "!=", "||", "&&",
                ",", ' ', '\t', '\r', '\n', ':', '.', '+', '-', '*', '/', '%', '&', '!', '|', '?', '>', '<', ';']
        } else if (separators === "TIME") {
            separators = [" ", "\r", "\n", "\t", ":", "-", ","];
        } else if (separators === "NAT") {
            separators = [" ", "\t", ":", ",", ".", ";", "\n", "\r", "?", "!", '"', "'", "<", ">", "(", ")", "[", "]"];
        }
        let ret = [];
        let curr = "";
        for (let i = 0; i < string.length; ++i) {
            let index = i + 3 < string.length ? separators.contains(string.slice(i, i + 4)) : false;
            if (index === false)
                index = i + 2 < string.length ? separators.contains(string.slice(i, i + 3)) : false;
            if (index === false)
                index = i + 1 < string.length ? separators.contains(string.slice(i, i + 2)) : false;
            if (index === false)
                index = i < string.length ? separators.contains(string[i]) : false;
            if (index === false)
                curr += string[i];
            else {
                if (curr !== "")
                    ret.push(curr);
                ret.push(separators[index]);
                curr = "";
                i += separators[index].length - 1;
            }
        }
        if (curr !== "") {
            ret.push(curr);
        }
        return ret;
    },

}