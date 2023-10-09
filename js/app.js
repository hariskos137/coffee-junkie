eventListeners();

function eventListeners() {
  const ui = new UI();

  //preloader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });
  //nav btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });
  //control video
  document.querySelector(".video-switch").addEventListener("click", function() {
    ui.videoControls();
  });
  //submit form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastName, email);

      if (value) {
        let customer = new Customer(name, lastName, email);

        ui.addCustomer(customer);

        ui.showFeedback("customer added to the list", "success");
        ui.clearFields();
      } else {
        ui.showFeedback("some form values are empty", "error");
      }
    });

  // // display modal
  const links = document.querySelectorAll(".work-item-icon");

  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });

  hide modal
    document
      .querySelector(".work-modal-close")
      .addEventListener("click", function() {
        ui.closeModal();
      });
}

//constructor function
function UI() {}

//hide preloader
// UI.prototype.hidePreloader = function() {
//   document.querySelector(".preloader").style.display = "none";
// };

//show nav
UI.prototype.showNav = function() {
  document.querySelector("nav").classList.toggle("nav-show");
};

//play/pause video
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video-switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video-item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video-item").play();
  }
};

//check for empty values
UI.prototype.checkEmpty = function(name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function(text, type) {
  if (type === "success") {
    let feedback = document.querySelector(".drink-form-feedback");
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    let feedback = document.querySelector(".drink-form-feedback");
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};
//remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form-feedback").classList.remove(type);
  }, 3000);
};
// add customer
UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img
                class="person-thumbnail"
                src="/img/person${random}.jpg"
                alt="person"
              />
              <h4 class="person-name">${customer.name}</h4>
              <h4 class="person-last-name">${customer.lastname}</h4>`;
  document.querySelector(".drink-card-list").appendChild(div);
};
//clear fields
UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};
//show modal
// UI.prototype.showModal = function(event)
//hide modal
// UI.prototype.closeModal = function() {
//   document.querySelector(".work-modal").classList.remove(".work-modal-show");
// };

function Customer(name, lastname, email) {
  (this.name = name), (this.lastname = lastname), (this.email = email);
}
