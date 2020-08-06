let fretboardDiv = document.getElementById('fretboard');
let image = document.getElementById('fretboard-img');
let imageWidth = image.offsetWidth;
let imageHeight = image.offsetHeight;
let body = document.getElementsByTagName('body')[0];

function showOpenNotes() {
    openNotes.forEach(function(note) {
        let noteButton = createButton(note);

        noteButton.style.height = noteButton.style.width = imageHeight / 7 + 'px';
        noteButton.style.margin = 2 + 'px';

        body.appendChild(noteButton);
    });
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

function getCoordinates(event) {
    const x = event.clientX - document.getElementById("fretboard-img").offsetLeft;
    const y = event.clientY - document.getElementById("fretboard-img").offsetTop;

    return [x, y];
}

function findNote(event) {
    const x = getCoordinates(event)[0];
    const y = getCoordinates(event)[1];

    const foundNote = fretboardNotes.find(function (note) {
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
    noteButton.style.left = 130 + note.topX + 'px';
    noteButton.style.top = fretboardDiv.getBoundingClientRect().top + note.topY + 'px';

    return noteButton;
}

function updateImageSize() {
    imageWidth = document.getElementById('fretboard-img').offsetWidth;
    imageHeight = document.getElementById('fretboard-img').offsetHeight;

    fretboardNotes.forEach(function (note) {
        note.topX = Math.floor(fretCoordinates[note.fret] * imageWidth / 1000);
        note.topY = Math.floor(stringCoordinates[note.string] * imageHeight / 120);
        note.bottomX = Math.floor((fretCoordinates[note.fret] + imageHeight / 6) * imageWidth / 1000);
        note.bottomY = Math.floor((stringCoordinates[note.string] + imageHeight / 8) * imageHeight / 120);
    });

    removeChildren();
}

function removeChildren() {
    while (fretboardDiv.lastChild != image) {
        fretboardDiv.removeChild(fretboardDiv.lastChild);
    }
}

