state = {
    dots: [],
}

const G = 0.5

const drawBg = () => {
    background(120, 120, 120, 30);
}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES)

    let prev = createVector(0, 0)
    state.l = 10
    while (state.dots.length < 21) {
        const l = 15//random(5, 15)
        const pos = prev.copy().add(createVector(l, 0))
        state.dots.push(getDot(pos, l))
        prev = pos
    }


    state.min = createVector(0, 0)
    state.max = createVector(0, 0)
}


function draw() {
    background(120, 120, 120, 30)

    //update
    let prevPos = createVector(0, 0)

    for (let i = 0; i < state.dots.length; i++) {
        const dot = state.dots[i]
        const pos = prevPos.copy().add(createVector(dot.l, 0)).rotate(dot.r) // * (i % 2 == 0 ? 1 : -1)
        dot.pos = pos
        dot.r += 1

        prevPos = pos

        // update min max
        state.min.x = pos.x < state.min.x ? pos.x : state.min.x
        state.min.y = pos.y < state.min.y ? pos.y : state.min.y
        state.max.x = pos.x > state.max.x ? pos.x : state.max.x
        state.max.y = pos.y > state.max.y ? pos.y : state.max.y
    }

    push()
    translate(width / 2, height / 2)
    prevPos = createVector(0, 0)

    state.dots.forEach(d => {
        drawDot(d)
        prevPos = d.pos
    })
    pop()

    state.min = createVector(0, 0)
    state.max = createVector(0, 0)
}

function getDot(pos, l) {
    return {
        pos,
        r: 0,
        l
    }
}

function drawDot(dot) {
    fill(0, 0, 0)
    //noStroke()
    stroke(0)
    ellipse(dot.pos.x, dot.pos.y, 3, 3)

    const mappedX = map(dot.pos.x, state.min.x, state.max.x, -200, 200)
    const mappedY = map(dot.pos.y, state.min.y, state.max.y, -200, 200)
    //ellipse(mappedX, mappedY, 3, 3)
}