// Ideas:
// > [action: send signal to a sensor]
// > [3d, sunlight, seafloor vents, landscape, gravity]

// Future:
// > Environment
// > Bonds
// > Genes: Action, strength of action, sensory slot
// > Movement control
// > Sensor Energy Cost
// > Energy
// > Behavior
// > Sensors: Free Receptors
// > Sensors: Association with Actions
// > Sensors: Restrict to only 8
// > Implement grid simulation: https://sanojian.github.io/cellauto/
// > Sensors: Ability to detect whether a location is occupied
// > Give world the ability to track occupied locations
// > Every time an agent is moved somewhere, world is notified
// > Test numAgents with Jest
// > Change location to object instead

// Pass 6:
// > Test: isAtLoc()
// > Change world into a class

class Agent {
    constructor(world, id, x, y) {
        this.world = world;
        this.id = id;
        this.x = x;
        this.y = y;
        this.actions = [];
        this.sensors = [

        ];
    }

    static actionPool = [
        function (agent, str) {   // MoveX
            agent.move(str,0);
        },
        function (agent, str) {   // MoveY
            agent.move(0,str);
        }
    ]

    act() {
        this.moveRand();
        this.reproduce();
        this.sense();
        console.log(`${this.id}: ${this.getLoc()}`);
    }

    getLoc() {
        return [this.x, this.y];
    }

    isAtLoc(x, y) {
        return Boolean(!(this.x - x) && !(this.y - y));
    }

    move(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        // > [todo: reduce energy by distance moved]
    }

    moveRand() {
        this.x = this.x + this.randMoveAmount();
        this.y = this.y + this.randMoveAmount();
    }

    randMoveAmount() {
        return Math.floor(Math.random() * 3) - 1;
    }

    reproduce() {
        this.world.addNewAgent(this.x, this.y);
    }

    // senseSurroundings() {
    //     this.sensors[0] = this.world.numAgents(this.getLoc()) - 1;
    //
    //     // /todo: sense position relative to self
    //     // for (let i = 0; i < 8; i++) {
    //     //     this.sensors[i] = this.world.numAgents(this.getLoc());
    //     // }
    // }
}

// const world = {
//     agents: [],
//     nextID: 0,
//
//     addNewAgent(x, y) {
//         this.agents.push(new Agent(this, this.nextID, x, y));
//         this.nextID = this.nextID + 1;
//     },
//
//     printAgents() {
//         function printAgent(agent) {
//             console.log(`${agent.id}: ${agent.getLoc()}`);
//         }
//         this.agents.forEach(printAgent);
//     },
//
//     runRound(round) {
//         // if (round === 5) {  // TEST
//         //     this.agents[0].reproduce();
//         // }
//         this.agents.forEach(
//             agent => agent.act()
//         );
//     },
//
//     numAgents(x, y) {
//         function agentAccumulator(totalNum, agent) {
//             return totalNum + agent.isAtLoc(x, y);
//         }
//         return this.agents.reduce(agentAccumulator, initialValue = 0);
//     }
// };

const rounds = 5;



class World {
    constructor() {
        this.agents = [];
        this.nextID = 0;
    }

    addNewAgent(x, y) {
        this.agents.push(new Agent(this, this.nextID, x, y));
        this.nextID = this.nextID + 1;
    }

    printAgents() {
        function printAgent(agent) {
            console.log(`${agent.id}: ${agent.getLoc()}`);
        }
        this.agents.forEach(printAgent);
    }

    runRound(round) {
        // if (round === 5) {  // TEST
        //     this.agents[0].reproduce();
        // }
        this.agents.forEach(
            agent => agent.act()
        );
    }

    numAgents(x, y) {
        function agentAccumulator(totalNum, agent) {
            return totalNum + agent.isAtLoc(x, y);
        }
        return this.agents.reduce(agentAccumulator, initialValue = 0);
    }
};

module.exports = World;


// world.addNewAgent(0,0);
//
// [...Array(rounds).keys()].forEach(world.runRound.bind(world));
//
// console.log("---")
//
// world.printAgents();
