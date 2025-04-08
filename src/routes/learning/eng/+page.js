/** @type {import('./$types').PageLoad} */
export async function load() {
    return {};
};

const config = {
type: Phaser.AUTO,
width: 800,
height: 600,
scene: {
    preload: preload,
    create: create,
    update: update
}
};

const game = new Phaser.Game(config);

function preload() {
this.load.image('player', '../../../../static/eviltwin GGEZ.png');
}

function create() {
this.player = this.add.sprite(400, 300, 'player');
}

function update() {
this.player.x += 1; // เดินไปทางขวาทีละ 1 พิกเซล
}
