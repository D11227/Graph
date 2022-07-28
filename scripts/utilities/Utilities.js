export function randomBetween(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
}

export function generatorColors() {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);

        return { r, g, b };
}
