document.addEventListener('DOMContentLoaded', function() {
    const mathSymbols = ['∑', '∫', 'π', '∞', '√', '∏', 'θ', 'φ', 'λ', 'μ', 'σ', 'Ω', '∂', '∇', 'ℝ', 'ℕ', 'ℤ', '∈', '∉', '⊆', '⊂', '∪', '∩', '≠', '≈', '≤', '≥'];
    const equations = [
        'E = mc²',
        'eiπ + 1 = 0',
        '∫ex dx = ex + C',
        'sin²θ + cos²θ = 1',
        'a² + b² = c²',
        'F = G(m₁m₂)/r²',
        '∑(1/n²) = π²/6',
        'xⁿ + yⁿ = zⁿ',
        'P(A|B) = P(B|A)P(A)/P(B)',
        'dx/dt = λx',
        'Δx·Δp ≥ ℏ/2',
        'ζ(s) = ∑(1/ns)',
        '∇ × E = -∂B/∂t',
        'det(A-λI) = 0'
    ];

    function createMathElement() {
        const container = document.querySelector('.math-symbols');
        const element = document.createElement('div');
        
        if (Math.random() > 0.3) {
            element.className = 'math-symbol';
            const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
            element.textContent = symbol;
        } else {
            element.className = 'math-equations';
            element.textContent = equations[Math.floor(Math.random() * equations.length)];
        }

        element.style.left = Math.random() * 100 + '%';
        element.style.fontSize = Math.random() * (48 - 24) + 24 + 'px';
        
        const duration = Math.random() * (20 - 8) + 8;
        element.style.animationDuration = duration + 's';
        
        container.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }

    // Create initial elements
    for(let i = 0; i < 20; i++) {
        setTimeout(createMathElement, Math.random() * 3000);
    }

    setInterval(createMathElement, 300);
}); 