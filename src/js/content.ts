import SantaliParser from 'santali-parser'

var parser = new SantaliParser();
var isOn = false;
const KEY_E = 69;
const KEY_SPACE = 32;
const KEY_ENTER = 13;

// trigger phonetic parser
window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode == KEY_E) {
        isOn = !isOn
        chrome.runtime.sendMessage({ isOn: isOn })
    }
})

// attach events to input areas
const $allTextArea = <HTMLTextAreaElement[]><any>document.querySelectorAll('textarea')
const $allInput = <HTMLInputElement[]><any>document.querySelectorAll('input[type=text]')

var keyupEventHandler = ($element: HTMLTextAreaElement | HTMLInputElement, e: KeyboardEvent) => {
    if (!isOn || 
        (e.keyCode != KEY_SPACE && e.keyCode != KEY_ENTER))
        return

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

    // parse the word
    let parsedWord = parser.parse(currentWord)
    if (currentWord == parsedWord)
        return

    // update the word in text
    $element.value = front + frontSpace + parsedWord + backSpace + back

    // re-position caret
    caretStart = caretStart - currentWord.length + parsedWord.length
    $element.selectionStart = caretStart
    $element.selectionEnd = caretStart 
}

$allTextArea.forEach(($editor: HTMLTextAreaElement) => {
    $editor.addEventListener('keyup', (e: KeyboardEvent) => {
        keyupEventHandler($editor, e)
    })
});

$allInput.forEach(($editor: HTMLInputElement) => {
    $editor.addEventListener('keyup', (e: KeyboardEvent) => {
        keyupEventHandler($editor, e)
    })
});
