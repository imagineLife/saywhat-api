import { act } from 'react-dom/test-utils';

const updateComponentWithAct = (wrapper) => {
  act(() => {
    // await new Promise((resolve) => { setTimeout(resolve, 0); });
    wrapper.update();
  });
};

export default updateComponentWithAct;
