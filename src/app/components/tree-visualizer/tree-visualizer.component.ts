import { Component, OnInit } from "@angular/core";
import { FormulaBuilderService } from "../../services/formula-builder.service";

@Component({
    selector: "app-tree-visualizer",
    templateUrl: "./tree-visualizer.component.html",
    styleUrls: ["./tree-visualizer.component.css"],
})
export class TreeVisualizerComponent implements OnInit {
    syntaxTree: any;

    constructor(private formulaService: FormulaBuilderService) {}

    ngOnInit(): void {
        this.formulaService.syntaxTree$.subscribe((tree) => {
            this.syntaxTree = tree;
        });
    }
}
