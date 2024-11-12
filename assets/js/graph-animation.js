class GraphAnimation {
    constructor() {
        this.canvas = document.getElementById('graphCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Animation parameters
        this.nodes = [];
        this.edges = [];
        this.nodeCount = 8;
        this.nodeRadius = 4;
        this.edgeCount = 12;
        
        // Three-color theorem colors
        this.colors = {
            light: {
                nodes: [
                    '#2196F3', // Blue
                    '#4CAF50', // Green
                    '#FFC107'  // Amber
                ],
                edge: 'rgba(33, 150, 243, 0.5)',
                particle: 'rgba(33, 150, 243, 0.4)'
            },
            dark: {
                nodes: [
                    '#7CB9E8', // Brighter Blue
                    '#7CFF8B', // Brighter Green
                    '#FFE066'  // Brighter Yellow
                ],
                edge: 'rgba(124, 255, 139, 0.3)',
                particle: 'rgba(124, 255, 139, 0.5)'
            }
        };
        
        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createNodes();
        this.createEdges();
        this.colorGraph();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                colorIndex: null // Will be assigned during coloring
            });
        }
    }

    createEdges() {
        this.edges = [];
        // Create a connected graph
        for (let i = 1; i < this.nodeCount; i++) {
            const to = Math.floor(Math.random() * i);
            this.edges.push({ from: i, to });
        }
        // Add some additional random edges
        for (let i = 0; i < this.edgeCount - (this.nodeCount - 1); i++) {
            const from = Math.floor(Math.random() * this.nodeCount);
            const to = Math.floor(Math.random() * this.nodeCount);
            if (from !== to && !this.edges.some(e => 
                (e.from === from && e.to === to) || 
                (e.from === to && e.to === from))) {
                this.edges.push({ from, to });
            }
        }
    }

    // Implement graph coloring using greedy algorithm
    colorGraph() {
        const adjacent = Array(this.nodeCount).fill().map(() => []);
        
        // Build adjacency list
        this.edges.forEach(edge => {
            adjacent[edge.from].push(edge.to);
            adjacent[edge.to].push(edge.from);
        });

        // Color nodes
        this.nodes.forEach((node, index) => {
            const usedColors = new Set(
                adjacent[index]
                    .map(adj => this.nodes[adj].colorIndex)
                    .filter(color => color !== null)
            );

            // Find the first available color
            for (let color = 0; color < 3; color++) {
                if (!usedColors.has(color)) {
                    node.colorIndex = color;
                    break;
                }
            }
        });
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges with some padding
            const padding = 50;
            if (node.x < padding || node.x > this.canvas.width - padding) {
                node.vx *= -1;
                node.x = Math.max(padding, Math.min(this.canvas.width - padding, node.x));
            }
            if (node.y < padding || node.y > this.canvas.height - padding) {
                node.vy *= -1;
                node.y = Math.max(padding, Math.min(this.canvas.height - padding, node.y));
            }
        });
    }

    draw() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const colors = this.colors[theme];

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw edges
        this.edges.forEach(edge => {
            const from = this.nodes[edge.from];
            const to = this.nodes[edge.to];
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = colors.edge;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.nodeRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.nodes[node.colorIndex];
            this.ctx.fill();
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.stroke();
        });
    }

    animate() {
        this.updateNodes();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GraphAnimation();
}); 