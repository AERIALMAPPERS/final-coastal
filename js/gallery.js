document.addEventListener("DOMContentLoaded", loadImages);

    function addImage() {
      const input = document.getElementById('imageInput');
      const gallery = document.getElementById('gallery');

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = "Gallery Image";
          gallery.appendChild(img);
          saveImage(event.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function saveImage(imageSrc) {
      let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
      images.push(imageSrc);
      localStorage.setItem('galleryImages', JSON.stringify(images));
    }

    function loadImages() {
      const gallery = document.getElementById('gallery');
      let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Gallery Image";
        gallery.appendChild(img);
      });
    }

    ///////////////////////////////////////////

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