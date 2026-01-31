"use strict";

// access the form
const myForm = document.forms["bookForm"]; 
const elements = myForm.elements;

// containers for error messages
const errTitle = document.getElementById("err-title");
const errAuthor = document.getElementById("err-author");
const errGenre = document.getElementById("err-genre");
const errRating = document.getElementById("err-rating");
const errReview = document.getElementById("err-review");

const resultArea = document.getElementById("resultArea");


// applying valid confirmation
function markValid(field, errorBox) {
  field.classList.add("valid");
  field.classList.remove("invalid");
  errorBox.textContent = "";
}

// apply invalid confirmation
function markInvalid(field, errorBox, message) {
  field.classList.add("invalid");
  field.classList.remove("valid");
  errorBox.textContent = message;
}


// clear all things the user has written on clear
function clearCustom(e) {
  e.target.setCustomValidity("");
}
myForm.addEventListener("input", clearCustom);



// book title validation
function validateTitle() {
  const field = elements["title"];
  const value = field.value.trim();

  field.setCustomValidity("");

  // invalid title length check for minimum
  if (value.length < 2) {
    field.setCustomValidity("Title must be at least 2 characters.");
    markInvalid(field, errTitle, "Title must be at least 2 characters.");
    return false;
  }

  // valid title length check for maximum
  if (value.length > 100) {
    field.setCustomValidity("Title cannot exceed 100 characters.");
    markInvalid(field, errTitle, "Title cannot exceed 100 characters.");
    return false;
  }

  markValid(field, errTitle);
  return true;
}


// validate author name
function validateAuthor() {
  const field = elements["author"];
  const value = field.value.trim();

  field.setCustomValidity("");

  if (value.length < 2) {
    field.setCustomValidity("Author name must be at least 2 characters.");
    markInvalid(field, errAuthor, "Author name must be at least 2 characters.");
    return false;
  }

  markValid(field, errAuthor);
  return true;
}


// make sure the user selects a genre
function validateGenre() {
  const field = elements["genre"];

  field.setCustomValidity("");

  if (field.value === "") {
    field.setCustomValidity("Please select a genre.");
    markInvalid(field, errGenre, "Please select a genre.");
    return false;
  }

  markValid(field, errGenre);
  return true;
}


// validate the numeric rating of the book
function validateRating() {
  const field = elements["rating"];
  const num = Number(field.value);

  field.setCustomValidity("");

  if (isNaN(num) || num < 1 || num > 5) {
    field.setCustomValidity("Rating must be a number between 1 and 5.");
    markInvalid(field, errRating, "Rating must be a number between 1 and 5.");
    return false;
  }

  markValid(field, errRating);
  return true;
}


// validate the character count for the review
function validateReview() {
  const field = elements["review"];
  const v = field.value.trim();

  field.setCustomValidity("");

  if (v.length < 10) {
    field.setCustomValidity("Review must be at least 10 characters.");
    markInvalid(field, errReview, "Review must be at least 10 characters.");
    return false;
  }

  if (v.length > 250) {
    field.setCustomValidity("Review cannot exceed 250 characters.");
    markInvalid(field, errReview, "Review cannot exceed 250 characters.");
    return false;
  }

  markValid(field, errReview);
  return true;
}


// ensure instant validation
elements["title"].addEventListener("input", validateTitle);
elements["author"].addEventListener("input", validateAuthor);
elements["genre"].addEventListener("change", validateGenre);
elements["rating"].addEventListener("input", validateRating);
elements["review"].addEventListener("input", validateReview);


// submit action
myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // validate all fields
  const valid =
    validateTitle() &
    validateAuthor() &
    validateGenre() &
    validateRating() &
    validateReview();

  if (!valid) {
    resultArea.innerHTML = "<p style='color:red'>Fix errors above.</p>";
    return;
  }

  // retrieve all values
  const titleValue = elements["title"].value;
  const authorValue = elements["author"].value;
  const genreValue = elements["genre"].value;
  const ratingValue = elements["rating"].value;
  const reviewValue = elements["review"].value;

  // display submitted data
  resultArea.innerHTML =
    "<h3>Submitted Review</h3>" +
    "<p><b>Title:</b> " + titleValue + "</p>" +
    "<p><b>Author:</b> " + authorValue + "</p>" +
    "<p><b>Genre:</b> " + genreValue + "</p>" +
    "<p><b>Rating:</b> " + ratingValue + "</p>" +
    "<p><b>Review:</b> " + reviewValue + "</p>";

  // reset form and all outlines
  myForm.reset();
  for (let el of elements) {
    el.classList.remove("valid", "invalid");
  }
});
