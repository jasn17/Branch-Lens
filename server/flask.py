from flask import Flask, jsonify, request
from tree import BinaryTree, TreeNode

app = Flask(__name__)
tree = BinaryTree()
root = None

@app.route('/insert', methods=['POST'])
def insert():
    global root
    key = request.json['key']
    root = tree.insert(root, key)
    return jsonify(success=True)

@app.route('/delete', methods=['POST'])
def delete():
    global root
    key = request.json['key']
    root = tree.delete(root, key)
    return jsonify(success=True)

@app.route('/search', methods=['GET'])
def search():
    global root
    key = request.args.get('key', type=int)
    found = tree.search(root, key)
    if found:
        return jsonify(found=found.val)
    else:
        return jsonify(found=False)

@app.route('/get_tree', methods=['GET'])
def get_tree():
    # This function will return the entire tree structure in JSON format
    global root
    def serialize(node):
        if node is None:
            return None
        return {
            'val': node.val,
            'left': serialize(node.left),
            'right': serialize(node.right)
        }
    tree_data = serialize(root)
    return jsonify(tree_data)

if __name__ == '__main__':
    app.run(debug=True)