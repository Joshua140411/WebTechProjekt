function consoleMessage() {
    console.log("Die Viewport-Breite beträgt: " + getViewportWidth() + " Pixel.")
}

function getViewportWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
}
