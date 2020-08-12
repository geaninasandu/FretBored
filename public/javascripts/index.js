const fretboardDiv = document.getElementById('fretboard');
const image = document.getElementById('fretboard-img');
const fretNumbersDiv = document.getElementById('fret-numbers');
let imageWidth, imageHeight;

/**
 * Update the image width and height and recalculate the note buttons coordinates upon image resize;
 */
function updateImageSize() {
    imageWidth = image.offsetWidth;
    imageHeight = image.offsetHeight;

    fretboardNotes.forEach(applyCoordinates);
    openNotes.forEach(applyCoordinates);

    removeChildren();

    removeOpenNotes();
    showOpenNotes();

    removeFretNumbers();
    showFretNumbers();
}

/**
 * Create buttons and display the six open notes on the left of the fretboard;
 */
function showOpenNotes() {
    openNotes.forEach(function (note) {
        const noteButton = createButton(note);

        noteButton.style.height = noteButton.style.width = imageHeight / 7 + 'px';
        noteButton.style.margin = 2 + 'px';

        fretboardDiv.insertBefore(noteButton, fretboardDiv.firstChild);
    });
}

/**
 * Display the button that corresponds to the hovered note;
 */
function showNote(event) {
    const note = findNote(event);
    if (!note) {
        return;
    }

    if (fretboardDiv.lastChild !== image) {
        if (fretboardDiv.lastChild.innerHTML === note.note) {
            return;
        }

        removeChildren();
    }

    fretboardDiv.appendChild(createButton(note));
}

/**
 * Return the note that fits within the cursor coordinates;
 */
function findNote(event) {
    const x = getCoordinates(event)[0];
    const y = getCoordinates(event)[1];

    return fretboardNotes.find(function (note) {
        return note.topX <= x && note.bottomX >= x && note.topY <= y && note.bottomY >= y;
    });
}

/**
 * Toggle the visibility of the info panel and the question mark div;
 */
function toggleInfoPanel() {
    const infoPanel = document.getElementById("info");
    const questionMark = document.getElementById("question-mark");

    if (infoPanel.style.visibility === "hidden") {
        infoPanel.style.visibility = "visible";
        questionMark.style.visibility = "hidden";
        return;
    }

    infoPanel.style.visibility = "hidden";
    questionMark.style.visibility = "visible";
}

function showFretNumbers() {
    for (let i = 1; i <= 24; i++) {
        let fretNumber = document.createElement('label');

        fretNumber.innerHTML = i;
        fretNumber.style.position = "absolute";
        fretNumber.style.fontSize = 1 + "vw";
        fretNumber.style.left = 130 + (fretCoordinates[i] * imageWidth) / 1000 + 5 + 'px';
        fretNumber.style.top = fretboardDiv.getBoundingClientRect().top - 36 + 'px';

        fretNumbersDiv.insertBefore(fretNumber, fretNumbersDiv.firstChild);
    }
}