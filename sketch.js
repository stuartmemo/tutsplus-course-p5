var bubbles = [],
    totalBubbles = 80;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (var i = 0; i < totalBubbles; i++) {
        bubbles.push({
            x: random(width),
            y: height + 100,
            diameter: random(50, 100),
            speed: random(1, 10),
            popped: false,
            opacity: 1
        });
    }
}

function draw() {
    background('#FBE571');
    drawBubble();
}

function drawBubble() {
    bubbles.forEach(function (bubble) {
        if (bubble.y < -100) {
            bubble.y = height + 100;
        }

        if (bubble.popped) {
            noStroke();
            fill('rgba(0, 0, 0, ' + bubble.opacity + ')');

            textSize(24);
            textAlign(CENTER);
            text('*pop*', bubble.x, bubble.y);

            if (bubble.opacity > 0.1) {
                bubble.opacity = bubble.opacity - 0.01;
            } else {
                bubble.opacity = 0;
            }
        } else {
            stroke('white');
            fill('#CABFE2');
            bubble.y = bubble.y - bubble.speed;
            ellipse(bubble.x, bubble.y, bubble.diameter, bubble.diameter);
            addShine(bubble);
        }
    });
}

function addShine(bubble) {
    var shinelength = bubble.diameter / 16,
        xOffset = bubble.diameter / 8,
        yOffset = -bubble.diameter / 3;

    line(
        bubble.x + xOffset,
        bubble.y + yOffset,
        bubble.x + (2 * xOffset),
        bubble.y + yOffset + shinelength + 2
    );
}

function wasClickInsideBubble(bubble) {
    var bubbleRadius = bubble.diameter / 2;

    if (
        (mouseX > bubble.x - bubbleRadius) &&
        (mouseX < bubble.x + bubbleRadius) &&
        (mouseY > bubble.y - bubbleRadius) &&
        (mouseY < bubble.y + bubbleRadius)
    ) {
        return true;
    } else {
        return false;
    }
}

function mouseClicked() {
    bubbles.forEach(function (bubble) {
        if (wasClickInsideBubble(bubble)) {
            bubble.popped = true;
        }
    });
}
