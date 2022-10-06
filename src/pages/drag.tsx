import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export default () => {
  // const [ball, setBall] = useState<HTMLElement>();
  const [initXY, setInitXY] = useState({ innerX: 0, innerY: 0 });

  // function moveAt(event: any) {
  //   const { pageX, pageY } = event;
  //   // const ball = document.querySelector('#ball') as HTMLElement;
  //   const x = pageX - initXY.innerX;
  //   const y = pageY - initXY.innerY;
  //   if (ball) {
  //     ball.style.left = x + 'px';
  //     ball.style.top = y + 'px';
  //   }

  //   setInitXY({ innerX: x, innerY: y });
  //   // changePosition(event);
  // }

  // function onMouseMove(event: { pageX: number; pageY: number }) {
  //   moveAt(event);
  // }

  useEffect(() => {
    const ball = document.querySelector('#ball') as HTMLElement;
    if (!ball) return;
    ball.onmousedown = function (event: {
      clientX: number;
      clientY: number;
      pageX: any;
      pageY: any;
    }) {
      let shiftX = event.clientX - ball.getBoundingClientRect().left;
      let shiftY = event.clientY - ball.getBoundingClientRect().top;
      setInitXY({ innerX: shiftX, innerY: shiftY });
      ball.style.position = 'absolute';
      ball.style.zIndex = '1000';
      document.body.append(ball);
      // moveAt(event)
      moveAt(event.pageX, event.pageY); // 移动现在位于坐标 (pageX, pageY) 上的球 // 将初始的偏移考虑在内
      function moveAt(pageX: number, pageY: number) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
      }
      // 在 mousemove 事件上移动球
      function onMouseMove(event: { pageX: number; pageY: number }) {
        moveAt(event.pageX, event.pageY);
      }
      document.addEventListener('mousemove', onMouseMove); // 放下球，并移除不需要的处理程序
      ball.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
        changePosition();
      };
      // 监听鼠标离开页面
      document.body.addEventListener('mouseout', (event) => {
        let evt = event as any;
        if (!event) evt = window.event;
        var to = evt?.relatedTarget! || evt?.toElement!;
        if (!to || to.nodeName == 'HTML') {
          document.removeEventListener('mousemove', onMouseMove);
          if (ball) ball.onmouseup = null;
        }
      });
    };
    ball.ondragstart = function () {
      return false;
    };
  });

  window.addEventListener('resize', () => {
    const ball = document.getElementById('ball') as HTMLElement;
    if (!ball) return;
    const { left = '0', top = '0' } = ball.style;
    if (parseInt(left) + 10 > document.body.clientWidth) {
      ball.style.left = `${document.body.clientWidth - 10}px`;
    } else if (parseInt(top) + 10 > document.body.clientHeight) {
      ball.style.top = `${document.body.clientHeight - 10}px`;
    }
    // TODO: 拉伸窗口时也需要隐藏按钮跟着移动
  });
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     const ball = document.getElementById('ball') as HTMLElement;
  //     const { left = '0', top = '0' } = ball.style;
  //     if (parseInt(left) + 10 > document.body.clientWidth) {
  //       ball.style.left = `${document.body.clientWidth - 10}px`;
  //     } else if (parseInt(top) + 10 > document.body.clientHeight) {
  //       ball.style.top = `${document.body.clientHeight - 10}px`;
  //     }

  //     console.log(initXY);

  //     if (hideType === 'right') {
  //       ball.style.left = `${document.body.clientWidth - 10}px`;
  //     } else if (hideType === 'bottom') {
  //       ball.style.top = `${document.body.clientHeight - 10}px`;
  //     }
  //   });
  // }, []);

  const changePosition = () => {
    const ball = document.getElementById('ball') as HTMLElement;
    if (!ball) return;
    const { left, top } = ball?.style;
    const leftNumber = left.split('px')[0];
    const topNumber = top.split('px')[0];
    hideIcon(ball, {
      left: +leftNumber,
      top: +topNumber,
      right: document.body.clientWidth - +leftNumber,
      bottom: document.body.clientHeight - +topNumber,
    });
  };

  const hideIcon = (ball: any, distances: any) => {
    const types = ['left', 'right', 'top', 'bottom'];
    types.forEach((item) => {
      if (distances[item] <= 100) {
        setTimeout(() => {
          if (item === 'right') {
            ball.style.left = `${document.body.clientWidth - 10}px`;
          } else if (item === 'bottom') {
            ball.style.top = `${document.body.clientHeight - 10}px`;
          } else {
            ball.style[item] = '-10px';
          }
        }, 2000);
        return;
      }
    });
  };

  return (
    // <Popover title="弹窗标题" content="弹窗内容" trigger="click">
    <span
      id="ball1"
      tabIndex={1}
      onClick={() => {
        console.log(111);
      }}
      // onMouseDown={onMouseDown}
      // onMouseMove={onMouseMove}
      // onMouseUp={onMouseUp}
      // draggable
      // onDragStart={(event) => {
      //   const ball = document.getElementById('ball') as HTMLElement;
      //   const innerX = event.clientX - ball.getBoundingClientRect().left;
      //   const innerY = event.clientY - ball.getBoundingClientRect().top;
      //   setInitXY({ innerX, innerY });
      //   ball.style.position = 'absolute';
      //   ball.style.zIndex = '1000';
      //   ball.style.top = '0';
      //   document.body.append(ball);
      // }}
      // onDrag={(event) => {
      //   const ball = document.getElementById('ball') as HTMLElement;
      //   const { innerX, innerY } = initXY;
      //   ball.style.left = event.pageX - innerX + 'px';
      //   ball.style.top = event.pageY - innerY + 'px';
      // }}
      // onDragOver={(e) => {
      //   e.preventDefault();
      // }}
      // onDragEnd={changePosition}
      // style={{ backgroundColor: 'red', borderRadius: 50 }}
    >
      <InfoCircleOutlined style={{ fontSize: 20 }} />
    </span>
    // </Popover>
  );
};
