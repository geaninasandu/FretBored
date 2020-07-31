let imageWidth = document.getElementById('fretboard-img').offsetWidth;
let imageHeight = document.getElementById('fretboard-img').offsetHeight;

function getCoordinates(event) {
    const x = event.clientX - document.getElementById("fretboard-img").offsetLeft;
    const y = event.clientY - document.getElementById("fretboard-img").offsetTop;

    return [x, y];
}

function updateImageSize() {
    imageWidth = document.getElementById('fretboard-img').offsetWidth;
    imageHeight = document.getElementById('fretboard-img').offsetHeight;

    notes.forEach(function (note) {
        note.topX = fretCoordinates[note.fret][0] * imageWidth / 1000;
        note.topY = stringCoordinates[note.string] * imageHeight / 120;
        note.bottomX = fretCoordinates[note.fret][1] * imageWidth / 1000;
        note.bottomY = (stringCoordinates[note.string] + 0.125 * imageHeight) * imageHeight / 120;
    });
}

function findNote(event) {
    const x = getCoordinates(event)[0];
    const y = getCoordinates(event)[1];

    const foundNote = notes.find(function (note) {
        return note.topX <= x && note.bottomX >= x && note.topY <= y && note.bottomY >= y;
    });

    console.log(foundNote);
}
