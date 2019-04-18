// canvas要素を作る
var canvas = document.getElementById('cv');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

// 棒クラス
class Stick{
  constructor(r, T){
    this.r = r;
    this.T = T;
    this.t = 0;
    this.w = (2 * Math.PI) / this.T;
  }
  update(){
    this.t += 1;
  }
  render(context){
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    var x = width/2 + this.r * Math.cos(this.w * this.t);
    var y = height/2 - this.r * Math.sin(this.w * this.t);
    context.moveTo(width/2, height/2);
    context.lineTo(x, y);
    context.stroke();
  }
}
class Sticks{
  constructor(sticks){
    this.t = 0;
    this.sticks = sticks;
  }
  update(){
    this.t += 1;
  }
  render(context){
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 2;
    var x = width/2, y = height/2;
    this.sticks.forEach(function(value){
      x += value.r * Math.cos(value.w * value.t);
      y -= value.r * Math.sin(value.w * value.t);
    })
    context.moveTo(width/2, height/2);
    context.lineTo(x, y);
    context.stroke();
  }
}

// 棒を管理する配列
sticks = [];
add();
add();
Sticks = new Sticks(sticks);

// 範囲内でのランダムな数値を出力する関数
function getRandom(min, max) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    return random;
}
// 棒を追加する関数
function add() {
  var r = getRandom(50, 100);
  var t = getRandom(50, 400);
  sticks.push(new Stick(r, t));
}
// 棒を削除する関数
function del() {
  sticks.pop();
}

// ループさせる関数
function loop(timestamp) {
  // 前の描画を消す
  context.clearRect(0, 0, width, height);
  // 棒の状態を更新する
  sticks.forEach((stick) => stick.update());
  Sticks.update();
　// 棒を描画する
  sticks.forEach((stick) => stick.render(context));
  Sticks.render(context);
  // requestAnimationFrameを呼び出す
  window.requestAnimationFrame((ts) => loop(ts));
}

// requestAnimationFrameを1回だけ呼び出す
window.requestAnimationFrame((ts) => loop(ts));
