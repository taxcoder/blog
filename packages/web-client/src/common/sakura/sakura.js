export class Sakura {
  constructor(x, y, s, r, fn, that, img) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
    this.that = that;
    this.img = img;
  }

  draw(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s);
    cxt.restore();
  }

  update() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
      this.r = this.that.getRandom('fnr');
      if (Math.random() > 0.4) {
        this.x = this.that.getRandom('x');
        this.y = 0;
        this.s = this.that.getRandom('s');
        this.r = this.that.getRandom('r');
      } else {
        this.x = window.innerWidth;
        this.y = this.that.getRandom('y');
        this.s = this.that.getRandom('s');
        this.r = this.that.getRandom('r');
      }
    }
  }
}

export class SakuraList {
  constructor() {
    this.list = [];
  }

  push(sakura) {
    this.list.push(sakura);
  }

  update() {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].update();
    }
  }

  draw(cxt) {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].draw(cxt);
    }
  }

  get(i) {
    return this.list[i];
  }

  size() {
    return this.list.length;
  }
}