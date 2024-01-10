

class Node{
    data;
    leftChild;
    rightChild;
    constructor(data){
        this.data = data;
        this.leftChild =null;
        this.rightChild =null;
    }
}
module.exports= class Tree{
     constructor(){
        this.root= null
    }
    searchTree(node, data) {
        if (node === null) {
            return new Node(data);
        }
        if (data < node.data) {
            node.leftChild = this.searchTree(node.leftChild, data);
            console.log("insert")
        } else if (data > node.data) {
            node.rightChild = this.searchTree(node.rightChild, data);
        }
        return node;
    }

    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
        } else {
            this.searchTree(this.root, data);
        }
        return this.root;
    }

    findNode(data) {
        let node = this.root;
        console.log(data);
        while (node !== null) {
            console.log(node.data)
            if (data < node.data) {
                node = node.leftChild;
            } else if (data > node.data) {
                node = node.rightChild;
            } else {
                return { msg:`Find the node with data ${node.data}`, node: node }
            }
        }
        return null;
    }
}

