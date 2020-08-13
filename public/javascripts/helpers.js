/**
 * Return the cursor coordinates in px on mouse movement;
 */
function getCoordinates(event) {
    const x = event.clientX - document.getElementById('fretboard-img').offsetLeft;
    const y = event.clientY - document.getElementById('fretboard-img').offsetTop;

    return [x, y];
}

/**
 * Calculate the note coordinates and apply them to the object;
 */
function applyCoordinates(note) {
    note.topX = Math.floor(fretCoordinates[note.fret] * imageWidth / 1000);
    note.topY = Math.floor(stringCoordinates[note.string] * imageHeight / 120);
    note.bottomX = Math.floor((fretCoordinates[note.fret] + imageHeight / 6) * imageWidth / 1000);
    note.bottomY = Math.floor((stringCoordinates[note.string] + imageHeight / 8) * imageHeight / 120);
}

/**
 * Create a button for the selected note;
 */
function createButton(note) {
    const noteButton = document.createElement('button');
    noteButton.innerHTML = note.note;
    noteButton.addEventListener('click', function () {
        new Audio('/sounds/' + note.sound).play().then(r => console.log(r));
    });

    noteButton.classList.add('note-button');
    noteButton.style.backgroundColor = note.color;
    noteButton.style.height = noteButton.style.width = imageHeight / 6 + 'px';
    noteButton.style.left = 130 + note.topX + 'px';
    noteButton.style.top = fretboardDiv.getBoundingClientRect().top + note.topY + 'px';

    return noteButton;
}

/**
 * Remove all the button children of the fretboardDiv;
 */
function removeChildren() {
    while (fretboardDiv.lastChild !== image) {
        fretboardDiv.removeChild(fretboardDiv.lastChild);
    }
}

/**
 * Remove the buttons corresponding to the open strings;
 */
function removeOpenNotes() {
    while (fretboardDiv.firstChild !== image) {
        fretboardDiv.removeChild(fretboardDiv.firstChild);
    }
}

/**
 * Remove the labels containing the fret numbers;
 */
function removeFretNumbers() {
    while (fretNumbersDiv.firstChild) {
        fretNumbersDiv.removeChild(fretNumbersDiv.firstChild);
    }
}
