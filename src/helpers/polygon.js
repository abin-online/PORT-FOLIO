// Pentagon SVG path generator

export const createPentagonPath = (size) => {
    const radius = size / 2;
    const points = [];
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from the top
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    return `M${points.join(' L')} Z`;
};


