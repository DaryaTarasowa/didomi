export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            "tsConfig": "tsconfig.node.json"
        }
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};