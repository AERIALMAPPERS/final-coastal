function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,mr',  // Add languages you want to include
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    let votingForm = document.getElementById("goog-gt-votingForm");
    let votingPane = document.getElementById("goog-gt-votingHiddenPane");

    // Check if the elements exist and remove them
    if (votingForm) {
      votingForm.remove();
    }
    if (votingPane) {
      votingPane.remove();
    }

    // Add ARIA labels if the dynamic form elements exist
    let translateDropdown = document.querySelector('.goog-te-combo');
    if (translateDropdown) {
      translateDropdown.setAttribute('aria-label', 'Select your language');
    }

    let translateButton = document.querySelector('.goog-te-button');
    if (translateButton) {
      translateButton.setAttribute('aria-label', 'Translate page');
    }

  }, 3000); // Delay to ensure elements are injected before removal
});
