import * as ts from "typescript";
const program = ts.createProgram(["ts-src/test.ts"], {});
const source = program.getSourceFile("ts-src/test.ts");
if (source) {
  console.log(source.statements);
}
