import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import BoardProvider from './BoardProvider';

jest.spyOn(React, 'useEffect')

configure({ adapter: new Adapter() });

test('should load the provider with no boards', () => {

  jest.spyOn(React, 'useState').mockReturnValueOnce([false, f => f()]);
  jest.spyOn(React, 'useState').mockReturnValueOnce([null, f => f()]);
  jest.spyOn(React, 'useState').mockReturnValueOnce([[], f => f()]);

  const wrapper = shallow(<BoardProvider />);

  expect(wrapper.find('BoardContext')).toBeDefined();
  expect(React.useEffect).toHaveBeenCalledTimes(1);
  expect(React.useState).toHaveBeenCalledTimes(3);
})

test('should load the provider with boards', () => {
      
  jest.spyOn(React, 'useState').mockReturnValueOnce([false, f => f()]);
  jest.spyOn(React, 'useState').mockReturnValueOnce([null, f => f()]);
  jest.spyOn(React, 'useState').mockReturnValueOnce([
    [
      {
        id: 1,
        name: 'board1',
        assignments: [
          {
            id: 1,
            name: 'assignment1',
            status: "TODO",
            description: "description1",
            dueDate: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            submission: "file",
            courseId: 104
          }
        ]
      }
    ], f => f()]);

  const wrapper = shallow(<BoardProvider />);

  expect(wrapper.find('BoardContext').props().value.boards).toHaveLength(1);
  expect(wrapper.find('BoardContext')).toBeDefined();
  expect(React.useEffect).toHaveBeenCalledTimes(1);
  expect(React.useState).toHaveBeenCalledTimes(3);
})	
// describe('BoardProvider', () => {
  

//   it('should fetch data from the API', async () => {

//     const setBoards = jest.fn()
//     fetch = fetchMock.mockResponse([])
    
//     React.useState = jest.fn()
//       .mockReturnValueOnce([false, () => {}]) // reloadBoards, setReloadBoards
//       .mockReturnValueOnce([null, () => {}]) // selectedBoard, setSelectedBoard
//       .mockReturnValueOnce([[], setBoards]); // boards, setBoards

//     const container = shallow(<BoardProvider />);

//     console.log(container);
//     const myFetch = jest.spyOn(container, 'fetch').mockImplementation(() => {
//       return Promise.resolve({
//         json: () => Promise.resolve([]),
//       });
//     });


//     // Assert
//     expect(React.useState).toHaveBeenCalledTimes(3);
//     expect(myFetch).toHaveBeenCalledTimes(1);
//   });
// });