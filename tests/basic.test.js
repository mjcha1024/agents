var world;


beforeAll(() => {
    world = require('../run.js');
});

test('world is created', () => {
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);
});


test('numAgents() count is correct', () => {
    expect(world.numAgents([0,0])).toBe(1);
});
