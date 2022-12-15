const Constraint = Matter.Constraint;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;


var con1, con2;
var ball2;

var ground;

var top_wall;
var ball;

var btn1;
var btn2;
function setup() {
  createCanvas(400,400);

  engine = Engine.create();
  world = engine.world;
  
   var ball_options = {
    restitution: 0.5,
  }
   
  var ball2_options = {
    isStatic: false,
  }
  
  btn2 = createImg('up.png');
  btn2.position(20,30);
  btn2.size(50,50);
  btn2.mouseClicked(vForce);

  ground = new Ground(200,390,400,20);

  ball2 = Bodies.circle(100, 250, 20, ball2_options)
  World.add(world, ball2);
  ball = Bodies.circle(100, 200, 20, ball_options);
  World.add(world, ball);
  
    con1 = Constraint.create ({ 
      pointA : {x:200, y:10},
      bodyB: ball,
      pointB : {x:0, y:0},
      stiffness: 0.01,
      length: 100
    })

    con2 = Constraint.create ({
      pointA: {x:0, y:0},
      bodyA: ball,
      pointB: {x:0, y:0},
      bodyB: ball2,
      stiffness: 0.01,
      length: 100
    })

    World.add(world, con1);
    
    World.add(world, con2);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}


function draw() {
  background(51);
  Engine.update(engine);

  push();

  stroke("#823287");
  line(con1.pointA.x, con1.pointA.y, ball.position.x, ball.position.y);

  pop();

  push();

  stroke("#823287");
  line(ball.position.x, ball.position.y, ball2.position.x, ball2.position.y);

  pop();

  ellipse(ball2.position.x, ball2.position.y, 20);

  ellipse(ball.position.x,ball.position.y,20);
  ground.show();
  
  Engine.update(engine);
}


function vForce() {
  Matter.Body.applyForce(ball2, {x:0,y:0}, {x:0.05,y:-0.05});
}
  


