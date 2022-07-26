import fs, { createReadStream } from "fs";
import readline from "readline";
import path from "path";
import { CommentAnalyzer } from "./commentAnalyzer";
const events = require("events");
class Main {
  static addToatals = () => {
    const dirPath = path.resolve("./docs");
    const files = fs.readdirSync(dirPath);
    if (files.length > 0) {
      /////////// looping through each file
      files.forEach(async (file, idx) => {
        const line = readline.createInterface({
          input: createReadStream(path.resolve(`./docs/${file}`)),
        });

        try {
          //////////// check if it is a text file
          if (path.extname(file) !== ".txt") {
            throw Error("Only text files allowed");
          }
          const commentAnalyzer = new CommentAnalyzer(file, line);
          commentAnalyzer.analyze();

          //////////// check if it is the last file and print the results in the console

          line.on("close", () => {
            const totals = commentAnalyzer.totals;
            if (idx === files.length - 1) {
              console.log("RESULTS\n=======");

              Object.keys(totals).forEach((key) =>
                console.log(`${key}: ${totals[key as keyof typeof totals]}`)
              );
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
  };
}

Main.addToatals();
