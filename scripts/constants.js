const constants = {
    types: {
        UNDEFINED: "undefined",
        NULL: "null",
        BOOLEAN: "boolean",
        NUMBER: "number",
        STRING: "string",
        OBJECT: "object",
        ARRAY: "array",
        SYMBOL: "symbol",
        FUNCTION: "function",
        MAP: "map",
        SET: "set"
    },
    specials: {
        NAN: Number.NaN,
        INFINITE: Number.NEGATIVE_INFINITY,
        ZERO: 0,
        D_ZERO: -0,
        EMPTY_STRING: "",
        TRUE: true,
        FALSE: false,
    },
    numbers: {},
    strings: {}
}

export default constants;
