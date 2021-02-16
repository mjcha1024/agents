// beforeEach(() => {
//     let world = require('../run.js');
// });

// afterEach(() => {
    // world = {};
// })

// test('world is created', () => {
//     let world = require('../run.js');
//     world.addNewAgent(0,0);
//     expect(world.agents.length).toBe(1);
// });


// test('numAgents() count is correct', () => {
//     let world = require('../run.js');
//     world.addNewAgent(0,0);
//     world.addNewAgent(0,0);
//     expect(world.numAgents([0,0])).toBe(2);
// });


test('world is reset', () => {
    // let world = require('../run.js');
    // world.addNewAgent(0,0);
    // expect(world.agents.length).toBe(1);
    //
    // world = require('../run.js');
    // world.addNewAgent(0,0);
    // expect(world.agents.length).toBe(1);

    let World = require('../run.js');
    let world = new World();
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);

    world = new World();
    world.addNewAgent(0,0);
    expect(world.agents.length).toBe(1);

});
