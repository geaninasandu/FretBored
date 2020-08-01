const notes = [];

class Note {
    constructor(note, string, fret, color) {
        this.note = note;
        this.string = string;
        this.fret = fret;
        this.topX = Math.floor(fretCoordinates[fret] * imageWidth / 1000);
        this.topY = Math.floor(stringCoordinates[string] * imageHeight / 120);
        this.bottomX = Math.floor((fretCoordinates[fret] + imageHeight / 6) * imageWidth / 1000);
        this.bottomY = Math.floor((stringCoordinates[string] + imageHeight / 8) * imageHeight / 120);
        this.color = color;
    }
}

function pushNotes(string, firstNote) {
    let index = musicalNotes.indexOf(firstNote);

    for (let fretNumber = 0; fretNumber < 24; fretNumber++) {
        notes.push(new Note(musicalNotes[index], string, fretNumber + 1, buttonColors[index]));

        index++;
        if (index === musicalNotes.length) {
            index = 0;
        }
    }
}

function buildNoteSequence() {
    pushNotes(1, "F");
    pushNotes(2, "C");
    pushNotes(3, "G#");
    pushNotes(4, "D#");
    pushNotes(5, "A#");
    pushNotes(6, "F");
}

buildNoteSequence();