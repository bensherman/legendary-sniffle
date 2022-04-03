function setup() {
  var canvas = document.getElementById("myCanvas")
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(Ax, Ay);
  ctx.lineTo(Bx, By);
  ctx.lineTo(Cx, Cy);
  ctx.closePath();
  ctx.stroke();
  return ctx;
}

function random_triangle() {
  Ax = Math.random() * 1000
  Ay = Math.random() * 1000
  Bx = Math.random() * 1000
  By = Math.random() * 1000
  Cx = Math.random() * 1000
  Cy = Math.random() * 1000
  return ([[Ax, Ay], [Bx, By], [Cx, Cy]])
}


function place_dot(coords) {
  ctx.beginPath();
  ctx.arc(coords[0], coords[1], 2, 0, 2 * Math.PI);
  ctx.stroke();
}

function find_halfway_point(coords_a, coords_b) {
  let x = (coords_a[0] + coords_b[0]) / 2
  let y = (coords_a[1] + coords_b[1]) / 2
  return ([x, y]);
}

function area_of_triangle(coords_a, coords_b, coords_c) {
  let [x1, y1, x2, y2, x3, y3] = [
    coords_a[0], coords_a[1],
    coords_b[0], coords_b[1],
    coords_c[0], coords_c[1]
  ];
  // get the length of all 3 sides
  let a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  let b = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3))
  let c = Math.sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1))

  // Use Heron's formula to get the area from the side lengths
  let s = (a + b + c) / 2
  let area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
  return area;
}

function is_inside(coords) {
  let a1 = area_of_triangle(A_coords, B_coords, coords);
  let a2 = area_of_triangle(B_coords, C_coords, coords);
  let a3 = area_of_triangle(C_coords, A_coords, coords);
  let a = a1 + a2 + a3
  let b = area_of_triangle(A_coords, B_coords, C_coords);
  return a <= b;
}

function random_dot() {
  let random_x = Math.floor(Math.random() * 1000)
  let random_y = Math.floor(Math.random() * 1000)
  while (!is_inside([random_x, random_y])) {
    random_x = Math.floor(Math.random() * 1000)
    random_y = Math.floor(Math.random() * 1000)
  }
  place_dot([random_x, random_y]);
  return ([random_x, random_y]);
}

function random_vertex() {
  let random_vertex = Math.floor(Math.random() * 3)
  if (random_vertex == 0) {
    return (A_coords);
  } else if (random_vertex == 1) {
    return (B_coords);
  } else {
    return (C_coords);
  }
}

var Ax
var Ay
var Bx
var By
var Cx
var Cy
var A_coords
var B_coords
var C_coords
var [A_coords, B_coords, C_coords] = random_triangle();


ctx = setup();
place_dot(A_coords);
place_dot(B_coords);
place_dot(C_coords);

var old_coords = random_dot()
for (var i = 0; i < 100=00; i++) {
  let random_vertex_coords = random_vertex()
  let new_coords = find_halfway_point(old_coords, random_vertex_coords)
  place_dot(new_coords);
  old_coords = new_coords
}



