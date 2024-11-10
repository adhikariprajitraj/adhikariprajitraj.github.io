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
        
        // Updated colors with brighter dark mode
        this.colors = {
            light: {
                node: '#2196F3',
                edge: 'rgba(33, 150, 243, 0.2)',
                particle: 'rgba(33, 150, 243, 0.4)'
            },
            dark: {
                node: '#7CFF8B',  // Brighter green
                edge: 'rgba(124, 255, 139, 0.3)',  // More visible edges
                particle: 'rgba(124, 255, 139, 0.5)'  // More visible particles
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
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    createEdges() {
        this.edges = [];
        for (let i = 0; i < this.edgeCount; i++) {
            const from = Math.floor(Math.random() * this.nodeCount);
            const to = Math.floor(Math.random() * this.nodeCount);
            if (from !== to) {
                this.edges.push({ from, to });
            }
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Keep within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
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
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.nodeRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.node;
            this.ctx.fill();
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