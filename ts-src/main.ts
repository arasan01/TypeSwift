import * as ts from "typescript";

function getJSON(fileName: string) {
  const program = ts.createProgram([fileName], {});
  const checker = program.getTypeChecker();

  const sourceFile = program.getSourceFile(fileName);

  const results: { name: string; type: string }[] = [];

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name!);
      const type = checker.getTypeOfSymbolAtLocation(symbol!, node.name!);
      results.push({
        name: node.name!.getText(),
        type: checker.typeToString(type),
      });
    }

    if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name!);
      const type = checker.getTypeOfSymbolAtLocation(symbol!, node.name!);
      results.push({
        name: node.name!.getText(),
        type: checker.typeToString(type),
      });
    }

    if (ts.isTypeAliasDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name);
      const type = checker.getTypeOfSymbolAtLocation(symbol!, node.name);
      results.push({
        name: node.name.getText(),
        type: checker.typeToString(type),
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile!);

  return JSON.stringify(results, null, 4);
}

// read command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: ts-node main.ts <file.ts>");
  process.exit(1);
}
const filePath = args[0];
const json = getJSON(filePath);
console.log(json);
