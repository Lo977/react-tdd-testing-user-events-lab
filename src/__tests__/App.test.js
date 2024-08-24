import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  // your test code here
  render(<App />);
  expect(screen.getByLabelText(/enter your name/i)).toBeInTheDocument();
  expect(
    screen.getByLabelText(/enter your email address/i)
  ).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  // your test code here
  render(<App />);
  expect(screen.getAllByRole("checkbox").length).toBe(3);
});

test("the checkboxes are initially unchecked", () => {
  // your test code here
  render(<App />);
  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const interest2 = screen.getByRole("checkbox", { name: /interest 2/i });
  const interest3 = screen.getByRole("checkbox", { name: /interest 3/i });
  expect(interest1).not.toBeChecked();
  expect(interest2).not.toBeChecked();
  expect(interest3).not.toBeChecked();
});
test("includes a form submit button ", () => {
  render(<App />);
  const submit = screen.getByRole("button", { name: /submit/i });
  expect(submit).toBeInTheDocument();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  // your test code here
  render(<App />);
  const name = screen.getByLabelText(/enter your name/i);
  const email = screen.getByLabelText(/enter your email address/i);
  userEvent.type(name, "Your Name");
  userEvent.type(email, "youremail@email.com");
  expect(name).toHaveValue("Your Name");
  expect(email).toHaveValue("youremail@email.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  // your test code here
  render(<App />);
  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const interest2 = screen.getByRole("checkbox", { name: /interest 2/i });
  const interest3 = screen.getByRole("checkbox", { name: /interest 3/i });
  userEvent.click(interest1);
  userEvent.click(interest2);
  userEvent.click(interest3);
  expect(interest1).toBeChecked();
  expect(interest2).toBeChecked();
  expect(interest3).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  // your test code here
  render(<App />);
  userEvent.type(screen.getByLabelText(/enter your name/i), "Your Name");
  userEvent.type(
    screen.getByLabelText(/enter your email address/i),
    "youremail@email.com"
  );
  userEvent.click(screen.getByRole("checkbox", { name: /interest 1/i }));
  userEvent.click(screen.getByRole("checkbox", { name: /interest 3/i }));
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(
    screen.getByText(
      "Thanks Your Name! You are signed up for these newsletters:"
    )
  ).toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Interest 1")).toBeInTheDocument();
  expect(screen.getByText("Interest 3")).toBeInTheDocument();
});
