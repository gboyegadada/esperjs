export function noise(ctx: CanvasRenderingContext2D) {

  var w = ctx.canvas.width,
      h = ctx.canvas.height,
      idata = ctx.createImageData(w, h),
      buffer32 = new Uint32Array(idata.data.buffer),
      len = buffer32.length,
      run = 0,
      color = 0,
      m = Math.random() * 6 + 4,
      band = Math.random() * 256 * 256,
      p = 0,
      i = 0;

  for (; i < len;) {
      if (run < 0) {
          run = m * Math.random();
          p = Math.pow(Math.random(), 0.4);
          if (i > band && i < band + 48 * 256) {
              p = Math.random();
          }
          color = (255 * p) << 24;
      }
      run -= 1;
      buffer32[i++] = color;
  }

  ctx.putImageData(idata, 0, 0);
}


var frame = 0;

// added toggle to get 30 FPS instead of 60 FPS
export default function createLoop(ctx: CanvasRenderingContext2D) {
  return function loop() { 
    frame += 1;
    if (frame === 3) {
    		frame = 0
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
  }
}