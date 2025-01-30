
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,mr'  // Add languages you want to include
  }, 'google_translate_element');
}