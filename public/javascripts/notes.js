const notes = [];

class Note {
    constructor(note, octave, string, fret) {
        this.note = note;
        this.octave = octave;
        this.string = string;
        this.fret = fret;
        this.topX = Math.floor(fretCoordinates[fret][0] * imageWidth / 1000);
        this.topY = Math.floor(stringCoordinates[string] * imageHeight / 120);
        this.bottomX = Math.floor(fretCoordinates[fret][1] * imageWidth / 1000);
        this.bottomY = Math.floor((stringCoordinates[string] + imageHeight / 8) * imageHeight / 120);
    }
}

function pushNotes(string, firstNote, octave) {
    let index = musicalNotes.indexOf(firstNote);

    for (let fretNumber = 0; fretNumber < 24; fretNumber++) {
        notes.push(new Note(musicalNotes[index], octave, string, fretNumber + 1));

        index++;
        if (index === musicalNotes.length) {
            index = 0;
            octave++;
        }
    }
}

function buildNoteSequence() {
    pushNotes(1, "F", 4);
    pushNotes(2, "C", 3);
    pushNotes(3, "G#", 3);
    pushNotes(4, "D#", 3);
    pushNotes(5, "A#", 2);
    pushNotes(6, "F", 2);
}

buildNoteSequence();