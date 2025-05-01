// Function to determine entrance direction based on index
export const getAnimationDirection = (index) => {
    // Create a pattern of directions based on position in the grid
    const position = index % 4;
    switch (position) {
        case 0: return 'translate-x-full opacity-0'; // From right
        case 1: return '-translate-y-full opacity-0'; // From top
        case 2: return '-translate-x-full opacity-0'; // From left
        case 3: return 'translate-y-full opacity-0';  // From bottom
        default: return 'opacity-0';
    }
};

// Calculate delay for staggered animation
export const getAnimationDelay = (index) => {
    return `${100 + (index * 75)}ms`;
};
