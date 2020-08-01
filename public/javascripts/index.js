let fretboardDiv = document.getElementById('fretboard');
let image = document.getElementById('fretboard-img');
let imageWidth = image.offsetWidth;
let imageHeight = image.offsetHeight;

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

    return foundNote;
}

function createButton(note) {
    let noteButton = document.createElement('button');
    noteButton.innerHTML = note.note;

    noteButton.classList.add('note-button');
    noteButton.style.backgroundColor = note.color;
    noteButton.style.height = noteButton.style.width = imageHeight / 6 + 'px';
    noteButton.style.left = 100 + note.topX + 'px';
    noteButton.style.top = fretboardDiv.getBoundingClientRect().top + note.topY - 2 + 'px';

    return noteButton;
}

function showNote(event) {
    const note = findNote(event);
    if (!note) {
        return;
    }

    if (fretboardDiv.lastChild != image) {
        if (fretboardDiv.lastChild.innerHTML === note.note) {
            return;
        }

        removeChildren();
    }

    fretboardDiv.appendChild(createButton(note));
}

function removeChildren() {
    while (fretboardDiv.lastChild != image) {
        fretboardDiv.removeChild(fretboardDiv.lastChild);
    }
}

