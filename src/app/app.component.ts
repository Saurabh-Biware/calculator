import { Component, OnInit } from "@angular/core";
import { FormulaBuilderService } from "./services/formula-builder.service";

// @ts-ignore
import * as Parser from "./parser/formula-parser.js";
const parse = Parser.parse;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
    visualizerOutput: string = "";
    syntaxTreeJson: string = "";

    constructor(private formulaService: FormulaBuilderService) {}

    ngOnInit() {
        this.formulaService.syntaxTree$.subscribe((tree) => {
            this.syntaxTreeJson = tree
                ? JSON.stringify(tree, null, 2)
                : "No AST available.";
        });
    }

    updateAstView() {
        try {
            const tree = parse(this.formula);
            console.log("The AST is: ", tree);
            this.syntaxTreeJson = JSON.stringify(tree, null, 2);
            this.formulaService.setSyntaxTree(tree);
        } catch (error) {
            alert("Parsing error: Please double check the input formula.");
            this.syntaxTreeJson = "Error parsing formula.";
            this.formulaService.setSyntaxTree(null);
        }
    }

    astToFormula(node: any): string {
        if (!node) return "";

        switch (node.type) {
            case "ADDITION":
                return `${this.astToFormula(node.left)} + ${this.astToFormula(
                    node.right
                )}`;
            case "SUBTRACTION":
                return `${this.astToFormula(node.left)} - ${this.astToFormula(
                    node.right
                )}`;
            case "MULTIPLICATION":
                return `${this.astToFormula(node.left)} * ${this.astToFormula(
                    node.right
                )}`;
            case "DIVISION":
                 return `${this.astToFormula(node.left)} / ${this.astToFormula(
                     node.right
                 )}`;
                // const left = this.astToFormula(node.left);
                // const right = this.astToFormula(node.right);
                // const leftPart = left ? `(${left})` : "";
                // const rightPart = right ? `(${right})` : "";
                // if (leftPart && rightPart) {
                //     return `${leftPart} / ${rightPart}`;
                // } else if (leftPart) {
                //     return leftPart;
                // } else if (rightPart) {
                //     return ` / ${rightPart}`;
                // } else {
                //     return "";
                // }
            case "POWER":
                return `${this.astToFormula(
                    node.expression
                )} ^ ${this.astToFormula(node.power)}`;
            case "NEGATION":
                return `-${this.astToFormula(node.expression)}`;
            case "PAREN":
                const innerExpr = this.astToFormula(node.expression);
                // Only add parentheses if the inner expression is non-empty
                return innerExpr ? `(${innerExpr})` : "";
            case "NUMBER":
                return node.value.toString();
            case "E":
                return "E";
            case "PI":
                return "PI";
            case "VARIABLE":
                return node.name;
            case "FUNCTION":
                const args = node.arguments
                    .map((arg: any) => this.astToFormula(arg))
                    .filter((arg: any) => arg.trim() !== "")
                    .join(", ");
                return `${node.name}(${args})`;
            default:
                return "";
        }
    }

    convertAstToFormula() {
        const tree = this.formulaService.syntaxTreeSource.getValue();
        if (!tree) {
            this.visualizerOutput = "No AST to convert.";
            return;
        }
        try {
            this.visualizerOutput = this.astToFormula(tree);
            console.log("Converted formula:", this.visualizerOutput);
        } catch (error) {
            console.error("Conversion error:", error);
            this.visualizerOutput = "Error converting AST to formula.";
        }
    }

    onFormulaChange(event: any) {
        this.formula = event.target.value;
    }
}
