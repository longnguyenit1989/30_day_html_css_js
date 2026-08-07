const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Buttons
const clearBtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeBtn = document.getElementById("size");
const colorInput = document.getElementById("color");
const saveBtn = document.getElementById("save");

// Brush
let brushSize = 20;
let brushColor = "#000000";

sizeBtn.textContent = brushSize;

// Draw state
let drawing = false;
let currentStroke = null;

// History
let strokes = [];
let redoStack = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height =
        window.innerHeight - document.querySelector(".tool").offsetHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    redraw();
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

canvas.addEventListener("mousedown", (e) => {
    drawing = true;

    const pos = getMousePos(e);

    currentStroke = {
        color: brushColor,
        size: brushSize,
        points: [pos],
    };
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const pos = getMousePos(e);

    currentStroke.points.push(pos);

    redraw();
});

window.addEventListener("mouseup", () => {
    if (!drawing) return;

    drawing = false;

    strokes.push(currentStroke);

    currentStroke = null;

    // Sau khi vẽ mới thì không thể redo các nét cũ nữa
    redoStack = [];
});

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = [...strokes];

    if (currentStroke) {
        allStrokes.push(currentStroke);
    }

    allStrokes.forEach((stroke) => {
        if (stroke.points.length === 0) return;

        ctx.beginPath();

        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Nếu chỉ click 1 điểm thì vẽ chấm
        if (stroke.points.length === 1) {
            const p = stroke.points[0];

            ctx.arc(p.x, p.y, stroke.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = stroke.color;
            ctx.fill();

            return;
        }

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

        for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }

        ctx.stroke();
    });
}

// Increase size
increaseBtn.addEventListener("click", () => {
    brushSize += 5;
    sizeBtn.textContent = brushSize;
});

// Decrease size
decreaseBtn.addEventListener("click", () => {
    brushSize = Math.max(5, brushSize - 5);
    sizeBtn.textContent = brushSize;
});

// Change color
colorInput.addEventListener("input", () => {
    brushColor = colorInput.value;
});

// Clear
clearBtn.addEventListener("click", () => {
    strokes = [];
    redoStack = [];
    currentStroke = null;

    redraw();
});

// Undo
undoBtn.addEventListener("click", () => {
    if (strokes.length === 0) return;

    redoStack.push(strokes.pop());

    redraw();
});

// Redo
redoBtn.addEventListener("click", () => {
    if (redoStack.length === 0) return;

    strokes.push(redoStack.pop());

    redraw();
});

// Save PNG
saveBtn.addEventListener("click", () => {
    const link = document.createElement("a");

    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
});