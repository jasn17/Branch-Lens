// Define the interface for a node in the binary tree
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

// Function to insert a node
function insertNode(): void {
    const keyInput: HTMLInputElement = document.getElementById('keyInput') as HTMLInputElement;
    const key: number = parseInt(keyInput.value, 10);
    fetch('/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Insert Response:', data);
        getTree(); // Refresh tree visualization after insert
    })
    .catch(error => console.error('Error:', error));
}

// Function to delete a node
function deleteNode(): void {
    const keyInput: HTMLInputElement = document.getElementById('keyInput') as HTMLInputElement;
    const key: number = parseInt(keyInput.value, 10);
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Delete Response:', data);
        getTree(); // Refresh tree visualization after delete
    })
    .catch(error => console.error('Error:', error));
}

// Function to search for a node
function searchNode(): void {
    const keyInput: HTMLInputElement = document.getElementById('keyInput') as HTMLInputElement;
    const key: number = parseInt(keyInput.value, 10);
    fetch(`/search?key=${key}`)
    .then(response => response.json())
    .then(data => {
        const message = data.found ? `Node with value ${data.found} found.` : "Node not found.";
        alert(message);
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch and display the tree structure
function getTree(): void {
    fetch('/get_tree')
    .then(response => response.json())
    .then(treeData => {
        console.log('Tree Data:', treeData);
        drawTree(treeData); // Assume drawTree is a function you will define to visualize the tree
    })
    .catch(error => console.error('Error fetching tree data:', error));
}

// Stub for the drawTree function to visualize the binary tree using D3.js or another visualization library
function drawTree(treeData: TreeNode | null): void {
    // This is where you would set up your D3.js tree visualization logic
    console.log('Visualizing tree data:', treeData);
    // Example placeholder: Log the data or update a visual element as a placeholder
    const visualization = document.getElementById('treeVisualization');
    if (visualization) {
        visualization.textContent = JSON.stringify(treeData, null, 2); // Simple JSON rendering as a placeholder
    }
}