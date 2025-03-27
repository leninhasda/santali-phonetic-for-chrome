import SantaliParser from 'santali-parser'

var parser = new SantaliParser();
var isOn = false;
const KEY_S = 'S';
const KEY_SPACE = 'Space';
const KEY_ENTER = 'Enter';

// switching keyboard
window.addEventListener('keyup', (e: KeyboardEvent) => {
    console.log('keycode pressed are', e.key, e.code)
    if (e.ctrlKey && e.shiftKey && e.key == KEY_S) {
        isOn = !isOn
        console.log('keyboard switching to santali:', isOn)
        chrome.runtime.sendMessage({ isOn: isOn })
    }
})

// handling key press event
var keyupEventHandler = ($element: HTMLTextAreaElement | HTMLInputElement, e: KeyboardEvent) => {
    console.log('event handler invoked')
    if (!isOn ||
        (e.code != KEY_SPACE && e.code != KEY_ENTER)) {
        console.log('nothing to handle because', isOn, e.code)
        return
    }

    console.log("santali parser is on. parsing...")

    // get current word
    var caretStart = $element.selectionStart;
    var front = ($element.value).substring(0, caretStart)
    var frontSpace = "", backSpace = ""
    if (front.charAt(front.length - 1) == " ") { // ignore last space
        backSpace = " "
        front = front.substring(0, front.length - 1)
    }
    var back = ($element.value).substring(caretStart, $element.value.length)
    var lastSpace = front.lastIndexOf(" ") < 0 ? 0 : front.lastIndexOf(" ")
    var currentWord = front.substring(!lastSpace ? lastSpace : lastSpace + 1, front.length)
    front = front.substring(0, front.length - currentWord.length)
    if (front.length > 0 && front.charAt(front.length - 1) != " ")
        frontSpace = " "

    console.log("found current word", currentWord)

    // parse the word
    let parsedWord = parser.parse(currentWord)
    console.log("parsed word", parsedWord)
    if (currentWord == parsedWord) {
        console.log("skipping as current word is same as parsed word")
        return
    }

    // update the word in text
    $element.value = front + frontSpace + parsedWord + backSpace + back

    // re-position caret
    caretStart = caretStart - currentWord.length + parsedWord.length
    $element.selectionStart = caretStart
    $element.selectionEnd = caretStart
    console.log("parsing done")
}

// attach events to input areas
const $allTextArea = <HTMLTextAreaElement[]><any>document.querySelectorAll('textarea')
const $allTextInput = <HTMLInputElement[]><any>document.querySelectorAll('input[type=text]')
const $allSearchInput = <HTMLInputElement[]><any>document.querySelectorAll('input[type=search]')

const $allInputs = [
    ...$allTextArea,
    ...$allTextInput,
    ...$allSearchInput
]

$allInputs.forEach(($editor: HTMLTextAreaElement | HTMLInputElement) => {
    $editor.addEventListener('keyup', (e: KeyboardEvent) => {
        keyupEventHandler($editor, e)
    })
});
