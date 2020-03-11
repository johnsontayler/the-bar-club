const cubeContainer = document.getElementById("container");
const cubeFaces = document.querySelectorAll(".cube__face");

let mouse = {
    start: {}
  },
  viewport = {
    x: 0,
    el: cubeContainer,
    elSides: {
      front: cubeFaces[0],
      back: cubeFaces[1],
      right: cubeFaces[2],
      left: cubeFaces[3]
    },
    move: coords => {
      if (coords) {
        if (typeof coords.x === "number") viewport.x = coords.x;
      }
      viewport.el.style.transform = "rotateY(" + viewport.x + "deg)";
    },
    reset: () => {
      viewport.move({ x: 0 });
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
    x: viewport.x + parseInt(mouse.start.x - movedMouse.x) / 10
  });

  mouse.last.x = movedMouse.x;
};

const handleWallOpacity = () => {
  const map = (e, t, n, i, o) => {
    return i + (o - i) * ((e - t) / (n - t));
  };

  let y = Math.floor(viewport.x / 90) % 4,
    v = Math.abs(viewport.x % 360);
  viewport.x < 0 && ((y = 4 - Math.abs(y)), 4 == y && (y = 0), (v = 360 - v));
  let g = 0.2;
  switch (y) {
    case 0:
      // let b = map(v, 0, 90, 1, g);
      // viewport.elSides.front.style.opacity = 1;
      // let b = map(v, 0, 90, g, 1);
      // (viewport.elSides.right.style.opacity = b),
      //   (viewport.elSides.left.style.opacity = g);
      break;
    // case 1:
    //   let b = map(v, 90, 180, 1, g);
    //   viewport.elSides.right.style.opacity = 1;
    //   let b = map(v, 90, 180, g, 1);
    //   viewport.elSides.front.style.opacity = b,
    //     viewport.elSides.left.style.opacity = g;
    //   break;
    // case 2:
    //   let b = map(v, 180, 270, 1, g);
    //   viewport.elSides.front.style.opacity = 1;
    //   let b = map(v, 180, 270, g, 1);
    //   viewport.elSides.left.style.opacity = b,
    //     viewport.elSides.back.style.opacity = g;
    //   break;
    // case 3:
    //   let b = map(v, 270, 360, 1, g);
    //   viewport.elSides.left.style.opacity = 1;
    //   let b = map(v, 270, 360, g, 1);
    //   viewport.elSides.back.style.opacity = b,
    //     viewport.elSides.right.style.opacity = g;
  }
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
      handleWallOpacity();
    })
  );

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", mouseMove);
    // viewport.reset();
  });
});
