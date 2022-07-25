"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const commentAnalyzer_1 = require("./commentAnalyzer");
class Main {
}
_a = Main;
Main.addToatals = () => {
    const dirPath = path_1.default.resolve("./docs");
    fs_1.default.readdir(dirPath, (err, files) => {
        try {
            if (err) {
                throw Error("Oops something went wrong!");
            }
            /////////// looping in all the files
            files.forEach((file, idx) => __awaiter(void 0, void 0, void 0, function* () {
                const line = readline_1.default.createInterface({
                    input: (0, fs_1.createReadStream)(path_1.default.resolve(`./docs/${file}`)),
                });
                try {
                    //////////// check if it is a text file
                    if (path_1.default.extname(file) !== ".txt") {
                        throw Error("Only text files allowed");
                    }
                    const commentAnalyzer = new commentAnalyzer_1.CommentAnalyzer(file, line);
                    commentAnalyzer.analyze();
                    //////////// check if it is the last file and print the results in the console
                    line.on("close", () => {
                        const totals = commentAnalyzer.totals;
                        if (idx === files.length - 1) {
                            console.log("RESULTS\n=======");
                            Object.keys(totals).forEach((key) => console.log(`${key}: ${totals[key]}`));
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
};
Main.addToatals();
