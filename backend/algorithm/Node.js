

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
   static insert(data){
        if( this.root==null){
            this.root= new Node(data)
        }
        else {
            let node= this.root
            let newNode =  new Node(data)
            const searchTree = (node) => {
                if (data< node.data && node.leftChild!== null){
                    searchTree(node.leftChild)
                }else if (data< node.data && node.leftChild === null){
                    node.leftChild = newNode
                } else if (data< node.data && node.rightChild !== null){
                    searchTree(node.rightChild)
                }
                else if (data< node.data && node.leftChild===null){
                    node.rightChild = newNode
                }
            }
            console.log(" insert finish")
            return searchTree(node)
        }
    }
   static findNode(data){
        let node= this.root;
        console.log(node.data)
        console.log(data)
        const search=  (node)=>{
            if (node === null){
                return null;
            }
            if(data< node.data){
                search(node.leftChild)
            }
            else if(data> node.data) {
                search(node.rightChild)
            }else if(data===node.data) {
                return  node.data
            }
        }
        return search(node);
     }
}

