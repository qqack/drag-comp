import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BasicModal from '../components/modal';

export default () => {
  const [initXY, setInitXY] = useState({ innerX: 0, innerY: 0 });
  const [visible, setVisible] = useState(false);

  window.addEventListener('resize', () => {
    const ball = document.getElementById('ball') as HTMLElement;
    const { left = '0', top = '0' } = ball.style;
    if (parseInt(left) + 10 > document.body.clientWidth) {
      ball.style.left = `${document.body.clientWidth - 10}px`;
    } else if (parseInt(top) + 10 > document.body.clientHeight) {
      ball.style.top = `${document.body.clientHeight - 10}px`;
    }
    // TODO: 拉伸窗口时也需要隐藏按钮跟着移动
  });

  // const onMouseDown = (event: { clientX: number; clientY: number }) => {
  //   const ball = document.getElementById('ball') as HTMLElement;
  //   let innerX = event.clientX - ball.offsetLeft;
  //   let innerY = event.clientY - ball.offsetTop;
  //   setInitXY({ innerX, innerY });

  //   // setStartTime(new Date().getTime());
  // };

  // const onMouseMove = () => {
  //   console.log('move');
  //   const ball = document.getElementById('ball') as HTMLElement;
  //   ball.style.position = 'absolute';
  //   ball.style.zIndex = '1000';
  //   document.body.append(ball);
  //   document.onmousemove = (event: { clientX: number; clientY: number }) => {
  //     const { innerX, innerY } = initXY;
  //     ball.style.left = event.clientX - innerX + 'px';
  //     ball.style.top = event.clientY - innerY + 'px';
  //   };
  // };

  // const onMouseUp = () => {
  //   console.log('up');

  //   const ball = document.getElementById('ball') as HTMLElement;
  //   document.removeEventListener('mousemove', onMouseMove);
  //   ball.onmouseup = null;
  //   ball.ondragstart = function () {
  //     return false;
  //   };
  // };

  const changePosition = (event: { clientX: any; clientY: any }) => {
    const ball = document.getElementById('ball') as HTMLElement;
    const { innerX, innerY } = initXY;
    const { clientX, clientY } = event;
    let left = clientX - innerX;
    let top = clientY - innerY;
    ball.style.left = left + 'px';
    ball.style.top = top + 'px';

    hideIcon(ball, {
      left,
      top,
      right: document.body.clientWidth - left,
      bottom: document.body.clientHeight - top,
    });
  };

  const hideIcon = (ball: any, distances: any) => {
    const types = ['left', 'right', 'top', 'bottom'];
    types.forEach((item) => {
      if (distances[item] <= 20) {
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
    <>
      <span
        id="ball"
        draggable
        tabIndex={1}
        onClick={() => {
          setVisible(true);
        }}
        onDragStart={(event) => {
          const ball = document.getElementById('ball') as HTMLElement;
          const innerX = event.clientX - ball.getBoundingClientRect().left;
          const innerY = event.clientY - ball.getBoundingClientRect().top;
          setInitXY({ innerX, innerY });
          ball.style.position = 'absolute';
          ball.style.zIndex = '1000';
        }}
        onDrag={(event) => {
          const ball = document.getElementById('ball') as HTMLElement;
          const { innerX, innerY } = initXY;
          ball.style.left = event.pageX - innerX + 'px';
          ball.style.top = event.pageY - innerY + 'px';
        }}
        onDragEnd={changePosition}
      >
        <InfoCircleOutlined style={{ fontSize: 20 }} />
      </span>
      <BasicModal visible={visible} setVisible={setVisible} />
    </>
  );
};
