// Ideas:
// > [action: send signal to a sensor]
// > [3d, sunlight, seafloor vents, landscape, gravity]
// > Implement grid simulation: https://sanojian.github.io/cellauto/
// > [todo: reduce energy by distance moved]

// Backlog:
// > Environment
// > Bonds
// > Genes: Action, strength of action, sensory slot
// > Movement control
// > Sensor Energy Cost
// > Energy
// > Behavior
// > Sensors: Free Receptors
// > Sensors: Association with Actions
// > Sensors: Add behavior to use sensor
// > Sensors: Ability to detect whether a location is occupied
// > Give world the ability to track occupied locations

// Pass 8:
// > Make it so that location checking calculation doesn't go up by square
// > Metric: location checking amount

// Pass 7:
// > Test: When an agent moves, occupied locations updates


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
        // this.sense();
        console.log(`${this.id}: ${this.getLoc()}`);
    }

    getLoc() {
        return [this.x, this.y];
    }

    isAtLoc(x, y) {
        return Boolean(!(this.x - x) && !(this.y - y));
    }

    move(x, y) {
        // console.log(this.x)
        // console.log(this.y)
        this.world.unsetOccupiedLoc(this.x, this.y)
        this.x = this.x + x;
        this.y = this.y + y;
        this.world.setOccupiedLoc(this.x, this.y);
    }

    moveRand() {
        function randMoveAmount() {
            return Math.floor(Math.random() * 3) - 1;
        }
        this.move(randMoveAmount(), randMoveAmount());
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

const rounds = 5;

class World {
    constructor() {
        this.agents = [];
        this.nextID = 0;
        this.occupiedLocs = {};
    }

    addNewAgent(x, y) {
        this.agents.push(new Agent(this, this.nextID, x, y));
        this.nextID = this.nextID + 1;
        this.setOccupiedLoc(x, y);
    }

    isOccupied(x, y) {
        return Boolean(this.occupiedLocs[x] && this.occupiedLocs[x][y]);
    }

    numAgents(x, y) {
        function agentAccumulator(totalNum, agent) {
            return totalNum + agent.isAtLoc(x, y);
        }
        return this.agents.reduce(agentAccumulator, 0);
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

    setOccupiedLoc(x, y) {
        // console.log(`[${x}, ${y}]`)
        if (!this.occupiedLocs[x]) {     // If x is undefined
            this.occupiedLocs[x] = {};
        }
        this.occupiedLocs[x][y] = true;
    }

    unsetOccupiedLoc(x, y) {
        this.occupiedLocs[x][y] = false;
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
