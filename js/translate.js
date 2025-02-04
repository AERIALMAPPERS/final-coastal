
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,mr'  // Add languages you want to include
  }, 'google_translate_element');
}
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
      let votingForm = document.getElementById("goog-gt-votingForm");
      let votingPane = document.getElementById("goog-gt-votingHiddenPane");
      if (votingForm) votingForm.remove();
      if (votingPane) votingPane.remove();
  }, 3000); // Delay to ensure elements are injected before removal
});


document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
      // Fix ARIA label for Language Dropdown
      let translateCombo = document.querySelector(".goog-te-combo");
      if (translateCombo) {
          translateCombo.setAttribute("aria-label", "Select Language");
      }

      // Remove Google Translate Voting Form & Unnecessary Elements
      let removeElements = [
          "#goog-gt-votingForm",
          "#goog-gt-votingHiddenPane",
          "#goog-gt-thumbUpButton",
          "#goog-gt-thumbDownButton",
          "#goog-gt-thumbUpIcon",
          "#goog-gt-thumbDownIcon",
          "#goog-gt-thumbUpIconFilled",
          "#goog-gt-thumbDownIconFilled"
      ];
      removeElements.forEach(selector => {
          let el = document.querySelector(selector);
          if (el) el.remove();
      });

      // Hide auto-injected Google Translate elements from screen readers
      let googleElements = document.querySelectorAll(".VIpgJd, .goog-te-gadget");
      googleElements.forEach(function (el) {
          el.setAttribute("aria-hidden", "true");
      });

      // Fix missing ARIA labels inside Google Translate (if any)
      let inputs = document.querySelectorAll("input[id^='goog-gt-votingInput']");
      inputs.forEach(input => {
          input.setAttribute("aria-label", "Google Translate Input");
      });

      console.log("Google Translate ARIA Fix Applied!");
  }, 3000); // Wait for Google Translate to fully load
});

/////////////
