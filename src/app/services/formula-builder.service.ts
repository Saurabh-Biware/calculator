import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FormulaBuilderService {
    public syntaxTreeSource = new BehaviorSubject<any>(null);
    syntaxTree$ = this.syntaxTreeSource.asObservable();

    setSyntaxTree(tree: any) {
        this.syntaxTreeSource.next(tree);
    }

    deleteNode(path: string[]) {
        console.log(path);
        if (!path || path.length === 0) return;
        const tree = this.syntaxTreeSource.getValue();
        if (!tree) return;

        const clonedTree = JSON.parse(JSON.stringify(tree));

        // Traverse to the parent of the node to delete
        let parent = clonedTree;
        for (let i = 0; i < path.length - 1; i++) {
            parent = parent[path[i]];
            if (!parent) return;
        }

        // Delete the target node
        const keyToDelete = path[path.length - 1];
        if (Array.isArray(parent)) {
            parent.splice(Number(keyToDelete), 1);
        } else {
            delete parent[keyToDelete];
        }

        // Update the syntax tree
        this.setSyntaxTree(clonedTree);
    }
}
