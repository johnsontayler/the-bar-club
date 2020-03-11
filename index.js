let i = 0;

// document.addEventListener("mousedown", (evt, movedMouse) => {
//   const cube = document.getElementById("cube");
//   // cube.style.transform = `rotateY(${i}deg)`;
//   console.log(movedMouse.x);
// });

const cube = document.getElementById("cube");

let mouse = {
    start: {}
  },
  viewport = {
    x: 20,
    el: cube,
    move: coords => {
      if (coords) {
        if (typeof coords.x === "number") viewport.x = coords.x;
      }
      viewport.el.style.transform = "rotateY(" + viewport.x + "deg)";
    },
    reset: () => {
      this.move({ x: 0 });
    }
  };

const moveViewport = movedMouse => {
  const forward = (v1, v2) => {
    return v1 >= v2 ? true : false;
  };

  if (!mouse.last) {
    mouse.last = mouse.start;
  } else {
    if (
      forward(mouse.start.x, mouse.last.x) !=
      forward(mouse.last.x, movedMouse.x)
    ) {
      mouse.start.x = mouse.last.x;
    }
  }

  viewport.move({
    x: viewport.x + parseInt((mouse.start.x - movedMouse.x) / 2)
  });

  mouse.last.x = movedMouse.x;
};

document.addEventListener("mousedown", evt => {
  delete mouse.last;
  mouse.start.x = evt.pageX;

  document.addEventListener(
    "mousemove",
    (mouseMove = event => {
      event.preventDefault();
      moveViewport({
        x: event.pageX
      });
    })
  );

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", mouseMove);
    viewport.reset();
  });
});
