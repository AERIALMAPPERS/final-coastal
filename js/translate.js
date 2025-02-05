
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

