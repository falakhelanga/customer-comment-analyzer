"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentAnalyzer = void 0;
const fs_1 = require("fs");
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
let res = {
    SHORTER_THAN_15: 0,
    MOVER_MENTIONS: 0,
    SHAKER_MENTION: 0,
    QUESTIONS: 0,
    SPAM: 0,
};
const matcher = (condition, type, newValue) => {
    if (condition) {
        return res[type] + newValue;
    }
    return res[type];
};
const commentAnalyzer = (file, files, idx) => {
    const line = readline_1.default.createInterface({
        input: (0, fs_1.createReadStream)(path_1.default.resolve(`./docs/${file}`)),
    });
    line.on("line", (line) => {
        const moverMatches = line.match(/mover/gi);
        const shakerMatches = line.match(/shaker/gi);
        const urlMatch = line.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);
        const questionMatcher = line.includes("?");
        const shortMatches = line.length <= 15;
        res.SHAKER_MENTION = matcher(!!shakerMatches, "SHAKER_MENTION", shakerMatches === null || shakerMatches === void 0 ? void 0 : shakerMatches.length);
        res.MOVER_MENTIONS = matcher(!!moverMatches, "MOVER_MENTIONS", moverMatches === null || moverMatches === void 0 ? void 0 : moverMatches.length);
        res.SPAM = matcher(!!urlMatch, "SPAM", 1);
        res.SHORTER_THAN_15 = matcher(shortMatches, "SHORTER_THAN_15", 1);
        res.QUESTIONS = matcher(questionMatcher, "QUESTIONS", 1);
    });
    line.on("close", () => {
        if (idx === files.length - 1) {
            console.log("RESULTS\n=======");
            console.log(Object.keys(res).forEach((key) => console.log(`${key}: ${res[key]}`)));
        }
    });
};
exports.commentAnalyzer = commentAnalyzer;
