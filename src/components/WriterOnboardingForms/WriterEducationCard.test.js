import React, { useState as useStateMock } from "react";
import { createStore } from "redux";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WriterEducationForm from "./WriterEducationForm.js";
import { initialState as initialReducerState } from "../../store/reducers/collegesReducer";
import reducer from "../../store/reducers/collegesReducer";

import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import axiosMock from "axios";

let educationFormStateMock = {
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  searchCollege: "How",
};

let formHelperTextMock = {
  firstName: undefined,
  lastName: undefined,
  sector: undefined,
  city: undefined,
  state: undefined,
  zip: undefined,
  country: undefined,
  website: undefined,
  bio: undefined,
};

function render(
  ui,
  {
    initialState = initialReducerState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// "How" text in input

test("can render with redux with custom initial state", () => {
  render(
    <WriterEducationForm
      educationFormState={educationFormStateMock}
      formHelperText={formHelperTextMock}
    />,
    {
      initialState: {
        collegeList: {
          colleges: [
            { "school.name": "Howard College", id: 225520 },
            { "school.name": "Howard University", id: 131520 },
            { "school.name": "Howard Payne University", id: 225548 },
            { "school.name": "Howard Community College", id: 162779 },
            { "school.name": "Specs Howard School of Media Arts", id: 172325 },
            {
              "school.name": "Howell Cheney THS/CT Aero Tech School",
              id: 417248,
            },
          ],
        },
        isLoading: false,
      },
    }
  );
  // fireEvent.click(screen.getByText('-'))

  expect(screen.getByTestId("colleges-options")).toBeInTheDocument();
});

// jest.mock('axios')

// const mockStore = configureStore([]);

// let store;
// let component;

// beforeEach(() => {
//   store = mockStore({
//     collegeList: {
//       colleges: [],
//       isLoading: false,
//     },
//   });

//   component = renderer.create(
//     <Provider store={store}>
//       <WriterEducationForm
//         educationFormState={educationFormState}
//         formHelperText={formHelperText}
//         enableButton={enableButton}
//       />
//     </Provider>
//   );
// });

// let educationFormState = {
//   firstName: "",
//   lastName: "",
//   city: "",
//   state: "",
//   zip: "",
//   country: "",
// };

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
// const enableButton = jest.fn(() => false);
// const setEducationFormStateMock = jest.fn(function () {
//   return (educationFormState = {
//     college: "Howard University",
//     searchCollege: "",
//     startDate: "Today",
//     endDate: "Tomorrow",
//     stillAttending: "Doctoral degree",
//     anticipatedGraduation: "",
//     degree: "Doctoral degree",
//   });
// });

let enableButton = false;

// // const setDisableButtonMock = jest.fn(function () {
// //   return true
// // });

// const formHelperText = {
//   college: "",
//   searchCollege: "",
//   startDate: "",
//   endDate: "",
//   stillAttending: false,
//   anticipatedGraduation: "",
//   degree: "",
// };

// beforeEach(() => {
//   useStateMock.mockImplementation((init) => [init, setEducationFormStateMock]);
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// test("contact information is visible", () => {
//   const { getByText } = render(
//     <WriterEducationForm
//       educationFormState={educationFormState}
//       formHelperText={formHelperText}
//       enableButton={enableButton}
//     />
//   );
//   const header = getByText(/contact information/i);
//   expect(header).toBeVisible();
// });

test("inputs are visible", () => {
  const { getByLabelText, getByTestId } = render(
    <WriterEducationForm
      educationFormState={educationFormStateMock}
      formHelperText={formHelperTextMock}
      enableButton={enableButton}
    />,
    {
      initialState: {
        collegeList: {
          colleges: [
            { "school.name": "Howard College", id: 225520 },
            { "school.name": "Howard University", id: 131520 },
            { "school.name": "Howard Payne University", id: 225548 },
            { "school.name": "Howard Community College", id: 162779 },
            { "school.name": "Specs Howard School of Media Arts", id: 172325 },
            {
              "school.name": "Howell Cheney THS/CT Aero Tech School",
              id: 417248,
            },
          ],
        },
        isLoading: false,
      },
    }
  );

  // const educationLabelText = getByLabelText(/education/i);
  const schoolLabelText = getByTestId("schoolname");
  const startDateLabelText = getByLabelText(/start date/i);
  const endDateLabelText = getByLabelText(/end date/i);
  // const zipLabelText = getByLabelText(/Zip/i);
  // const countryLabelText = getByLabelText(/country/i);
  const collegeDropdowns = getByTestId("colleges-options");

  // expect(educationLabelText).toBeVisible();
  expect(schoolLabelText).toBeVisible();
  expect(startDateLabelText).toBeVisible();
  expect(endDateLabelText).toBeVisible();
  // expect(zipLabelText).toBeVisible();
  expect(collegeDropdowns).toBeVisible();
});

// test("form submit adds contact info to state", () => {
//   const { getByLabelText, getByText } = render(
//     <WriterEducationForm
//       educationFormState={educationFormState}
//       formHelperText={formHelperText}
//       enableButton={enableButton}
//     />
//   );

//   const searchCollegeLabelText = getByLabelText(/Enter School Name/i);
//   const startDateLabelText = getByLabelText(/Start Date/i);
//   const endDateLabelText = getByLabelText(/End Date/i);
//   const currentlyEnrolledLabelText = getByLabelText(/Currently Enrolled/i);
//   const degreeEarnedLabelText = getByLabelText(/degree-earned-label/i);
//   //   const countryLabelText = getByLabelText(/country/i);

//   fireEvent.change(searchCollegeLabelText, {
//     target: { value: "Howard University" },
//   });
//   fireEvent.change(startDateLabelText, { target: { value: "Today" } });
//   fireEvent.change(endDateLabelText, { target: { value: "Tomorrow" } });
//   fireEvent.change(currentlyEnrolledLabelText, { target: { value: false } });
//   fireEvent.change(degreeEarnedLabelText, {
//     target: { value: "Doctoral degree" },
//   });
//   //   fireEvent.change(countryLabelText, {
//   //     target: { value: "No Country for Blue Men" },
//   //   });
//   userEvent.click(getByText(/next/i));

//   expect(educationFormState).toEqual({
//     college: "Howard University",
//     searchCollege: "",
//     startDate: "Today",
//     endDate: "Tomorrow",
//     stillAttending: "Doctoral degree",
//     anticipatedGraduation: "",
//     degree: "Doctoral degree",
//   });
// });