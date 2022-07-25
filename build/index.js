"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commentAnalyzer_1 = require("./commentAnalyzer");
const dirPath = path_1.default.resolve("./docs");
(() => {
    const files = fs_1.default.readdir(dirPath, (err, files) => {
        try {
            if (err) {
                throw new Error("Oops something went wrong!");
            }
            files.forEach((file, idx) => __awaiter(void 0, void 0, void 0, function* () {
                (0, commentAnalyzer_1.commentAnalyzer)(file, files, idx);
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
})();
