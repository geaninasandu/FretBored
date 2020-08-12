class Note {
    constructor(note, octave, string, fret, color) {
        this.note = note;
        this.string = string;
        this.fret = fret;
        this.color = color;
        this.sound = note + octave + '.mp3';

        applyCoordinates(this);
    }
}

/**
 * Add the notes to the array of fretboard notes;
 * @param string        the current string;
 * @param firstNote     the first note on the string;
 * @param octave        the octave of the first note;
 */
function pushNotes(string, firstNote, octave) {
    let index = musicalNotes.indexOf(firstNote);

    for (let fretNumber = 0; fretNumber < 24; fretNumber++) {
        fretboardNotes.push(new Note(musicalNotes[index], octave, string, fretNumber + 1, buttonColors[index]));

        index++;
        if (index === musicalNotes.length) {
            index = 0;
            octave++;
        }
    }
}

/**
 * Push the open notes to the array;
 */
function pushOpenNotes() {
    openNotes.push(new Note("E", 4, 1, 0, buttonColors[musicalNotes.indexOf("E")]));
    openNotes.push(new Note("B", 3, 2, 0, buttonColors[musicalNotes.indexOf("B")]));
    openNotes.push(new Note("G", 3, 3, 0, buttonColors[musicalNotes.indexOf("G")]));
    openNotes.push(new Note("D", 3, 4, 0, buttonColors[musicalNotes.indexOf("D")]));
    openNotes.push(new Note("A", 2, 5, 0, buttonColors[musicalNotes.indexOf("A")]));
    openNotes.push(new Note("E", 2, 6, 0, buttonColors[musicalNotes.indexOf("E")]));
}

function buildNotesArray() {
    pushOpenNotes();

    pushNotes(1, "F", 4);
    pushNotes(2, "C", 4);
    pushNotes(3, "G♯", 3);
    pushNotes(4, "D♯", 3);
    pushNotes(5, "A♯", 2);
    pushNotes(6, "F", 2);
}

buildNotesArray();
