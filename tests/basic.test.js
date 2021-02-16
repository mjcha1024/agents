var World, world;

beforeAll(() => {
    World = require('../run.js');
});

beforeEach(() => {
    world = new World();
});

afterEach(() => {
    world = {};
});

test('world is created', () => {
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);
});

test('world is reset', () => {
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);

    world = new World();
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);

});

test('numAgents() count is correct', () => {
    world.addNewAgent(0,0);
    world.addNewAgent(0,0);
    expect(world.numAgents([0,0])).toBe(2);
});
