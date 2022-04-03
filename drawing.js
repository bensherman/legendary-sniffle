



function setup() {
  var canvas = document.getElementById("myCanvas")
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.stroke();
  return ctx;
}

function random_triangle() {
  ax = Math.random() * 1000
  ay = Math.random() * 1000
  bx = Math.random() * 1000
  by = Math.random() * 1000
  cx = Math.random() * 1000
  cy = Math.random() * 1000
}

function place_dot(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.stroke();
}

function find_halfway_point(x1, y1, x2, y2) {
  let x = (x1 + x2) / 2
  let y = (y1 + y2) / 2
  return ([x, y]);
}

function area_of_triangle(x1, y1, x2, y2, x3, y3) {
  let a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  let b = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3))
  let c = Math.sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1))
  let s = (a + b + c) / 2
  let area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
  return area
}

function is_inside(x, y) {
  let a1 = area_of_triangle(ax, ay, bx, by, x, y);
  let a2 = area_of_triangle(bx, by, cx, cy, x, y);
  let a3 = area_of_triangle(cx, cy, ax, ay, x, y);
  let a = a1 + a2 + a3
  let b = area_of_triangle(ax, ay, bx, by, cx, cy);
  return a <= b;
}

function random_dot() {
  let random_x = Math.floor(Math.random() * 1000)
  let random_y = Math.floor(Math.random() * 1000)
  while (!is_inside(random_x, random_y)) {
    random_x = Math.floor(Math.random() * 1000)
    random_y = Math.floor(Math.random() * 1000)
  }
  place_dot(random_x, random_y);
  return ([random_x, random_y]);
}

function random_vertex() {
  let random_vertex = Math.floor(Math.random() * 3)
  if (random_vertex == 0) {
    return ([ax, ay]);
  } else if (random_vertex == 1) {
    return ([bx, by]);
  } else {
    return ([cx, cy]);
  }
}



var ax = 500
var ay = 100
var bx = 200
var by = 700
var cx = 800
var cy = 800

random_triangle()

ctx = setup();
place_dot(ax, ay);
place_dot(bx, by);
place_dot(cx, cy);

var [x, y] = random_dot()
for (var i = 0; i < 10000; i++) {
  let [vx, vy] = random_vertex()
  let [new_x, new_y] = find_halfway_point(x, y, vx, vy)
  place_dot(new_x, new_y);
  x = new_x
  y = new_y
}



