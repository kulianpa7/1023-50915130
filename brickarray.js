const brick1 = {
    easy: [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ],
    medium: [
        [1, 2, 2, 1, 1, 1],
        [1, 1, 2, 0, 1, 1],
        [0, 2, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
    ],
    hard: [
        [2, 2, 2, 2, 1, 1],
        [1, 1, 3, 2, 1, 1],
        [3, 3, 1, 3, 1, 0],
        [1, 1, 3, 3, 1, 0],
    ]
};
const brick2 = {
    easy: [
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
    ],
    medium: [
        [2, 2, 2, 2, 1, 1],
        [1, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, 1, 2],
        [1, 1, 2, 2, 1, 2],
    ],
    hard: [
        [2, 2, 2, 2, 1, 1],
        [1, 1, 3, 2, 1, 1],
        [3, 3, 1, 3, 1, 0],
        [1, 1, 3, 3, 1, 0],
    ]
};
const brick3 = {
    easy: [
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 2],
        [0, 1, 0, 1, 2, 0],
    ],
    medium: [
        [0, 3, 0, 2, 1, 1],
        [1, 1, 0, 0, 2, 1],
        [2, 2, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 0],
    ],
    hard: [
        [1, 2, 1, 2, 1, 1],
        [1, 1, 3, 2, 1, 1],
        [3, 3, 1, 3, 3, 0],
        [1, 1, 3, 3, 1, 3],
    ]
};
const brick4 = {
    easy: [
        [1, 0, 0, 0, 3, 3],
        [0, 1, 1, 0, 3, 3],
        [0, 0, 0, 1, 2, 2],
        [0, 0, 0, 1, 0, 0],
    ],
    medium: [
        [3, 3, 2, 1, 3, 1],
        [1, 1, 3, 1, 1, 3],
        [2, 2, 1, 1, 1, 3],
        [1, 1, 1, 1, 1,2],
    ],
    hard: [
        [2, 2, 2, 2, 3, 1],
        [3, 3, 3, 2, 2, 1],
        [3, 3, 2, 3, 2, 2],
        [3, 2, 3, 3, 2, 2],
    ]
};
const brick5 = {
    easy: [
        [1, 2, 2, 2, 1, 2],
        [2, 1, 1, 2, 2, 1],
        [2, 1, 1, 2, 1, 1],
        [2, 2, 1, 2, 2, 1],
    ],
    medium: [
        [3, 2, 2, 1, 1, 1],
        [1, 3, 1, 0, 2, 2],
        [2, 0, 1, 1, 1, 2],
        [1, 1, 2, 2, 1, 2],
    ],
    hard: [
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3],
    ]
};
const brickArray = [brick1,brick2,brick3,brick4,brick5]