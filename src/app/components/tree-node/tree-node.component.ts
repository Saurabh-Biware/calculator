import { Component, Input } from "@angular/core";
import { FormulaBuilderService } from "../../services/formula-builder.service";

@Component({
    selector: "app-tree-node",
    templateUrl: "./tree-node.component.html",
    styleUrls: ["./tree-node.component.css"],
})
export class TreeNodeComponent {
    @Input() node: any;
    @Input() path: any[] = [];

    constructor(private formulaService: FormulaBuilderService) {}

    getNodeLabel(node: any): string {
        switch (node.type) {
            case "ADDITION":
            case "SUBTRACTION":
            case "MULTIPLICATION":
            case "DIVISION":
            case "POWER":
                return node.type;
            case "NEGATION":
                return node.type;
            case "NUMBER":
                return node.value.toString();
            case "E":
            case "PI":
                return node.type;
            case "VARIABLE":
                return node.name;
            case "FUNCTION":
                return `${node.name}(${node.arguments.length})`;
            default:
                return node.type;
        }
    }

    getNodeStyle(node: any): any {
        switch (node.type) {
            case "ADDITION":
            case "SUBTRACTION":
            case "MULTIPLICATION":
            case "DIVISION":
            case "POWER":
                return { "background-color": "#FFD700" };
            case "FUNCTION":
                return { "background-color": "#ADFF2F" };
            case "NUMBER":
            case "E":
            case "PI":
            case "VARIABLE":
                return { "background-color": "#87CEFA" };
            default:
                return { "background-color": "#D3D3D3" };
        }
    }

    confirmDelete() {
        if (confirm("Are you sure you want to delete this node?")) {
            this.deleteCurrentNode();
        }
    }

    deleteCurrentNode() {
        if (this.path.length === 0) {
            alert("Cannot delete the root node.");
            return;
        }
        this.formulaService.deleteNode(this.path);
    }
}
