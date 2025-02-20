   // Open the modal
   function openAddDataModal() {
    document.getElementById("addDataModal").style.display = "block";
  }

  // Close the modal
  function closeAddDataModal() {
    document.getElementById("addDataModal").style.display = "none";
  }

  // Submit new data
  function submitNewData(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('district', document.getElementById('addDistrict').value);
    formData.append('taluka', document.getElementById('addTaluka').value);
    formData.append('village', document.getElementById('addVillage').value);
    formData.append('selectLayer', document.getElementById('selectLayer').value);

    const kmlFile = document.getElementById('addKMLFile').files[0];
    const dwgFile = document.getElementById('addDWGFile').files[0];

    if (kmlFile) formData.append('kml_path', kmlFile);
    if (dwgFile) formData.append('dwg_path', dwgFile);

    // Send the POST request to the server
    fetch('http://localhost:3000/api/addData', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data added successfully:', data);
      alert('Data added successfully!');
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      alert('An error occurred while submitting the data: ' + error.message);
    });
  }

  // Attach event listener for form submission
  document.getElementById('addDataForm').addEventListener('submit', submitNewData);

// =====================================================================================================================
  // Logic for update data modal
 // Open and Close Modal Functions
 function openUpdateDataModal() {
    document.getElementById("updateDataModal").style.display = "block";
  }

  function closeUpdateDataModal() {
    document.getElementById("updateDataModal").style.display = "none";
  }

  // Fetch hierarchy data for dropdowns
  let hierarchyData = {}; 

  fetch("./hierarchy.json") 
    .then((response) => response.json())
    .then((data) => {
      hierarchyData = data;
      populateDistrictsForUpdate();
    })
    .catch((error) => console.error("Error loading hierarchy data:", error));

  // Populate District Dropdown
  function populateDistrictsForUpdate() {
    const districtSelect = document.getElementById("updateDistrict");
    districtSelect.innerHTML = "<option value=''>Select District</option>";
    hierarchyData.districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.name;
      option.textContent = district.name;
      districtSelect.appendChild(option);
    });
  }

  // Load Talukas Based on Selected District
  function loadTalukasForUpdate() {
    const districtName = document.getElementById("updateDistrict").value;
    const talukaSelect = document.getElementById("updateTaluka");
    talukaSelect.innerHTML = "<option value=''>Select Taluka</option>";
    document.getElementById("updateVillage").innerHTML = "<option value=''>Select Village</option>";
    document.getElementById("updateLayer").innerHTML = "<option value=''>Select Layer</option>";

    const district = hierarchyData.districts.find((d) => d.name === districtName);
    if (district) {
      district.talukas.forEach((taluka) => {
        const option = document.createElement("option");
        option.value = taluka.name;
        option.textContent = taluka.name;
        talukaSelect.appendChild(option);
      });
    }
  }

  // Load Villages Based on Selected Taluka
  function loadVillagesForUpdate() {
    const districtName = document.getElementById("updateDistrict").value;
    const talukaName = document.getElementById("updateTaluka").value;
    const villageSelect = document.getElementById("updateVillage");
    villageSelect.innerHTML = "<option value=''>Select Village</option>";
    document.getElementById("updateLayer").innerHTML = "<option value=''>Select Layer</option>";

    const district = hierarchyData.districts.find((d) => d.name === districtName);
    const taluka = district?.talukas.find((t) => t.name === talukaName);

    if (taluka) {
      taluka.villages.forEach((village) => {
        const option = document.createElement("option");
        option.value = village.name;
        option.textContent = village.name;
        villageSelect.appendChild(option);
      });
    }
  }

  // Load Layers Based on Selected Village
  function loadLayersForUpdate() {
    const districtName = document.getElementById("updateDistrict").value;
    const talukaName = document.getElementById("updateTaluka").value;
    const villageName = document.getElementById("updateVillage").value;
    const layerSelect = document.getElementById("updateLayer");
    layerSelect.innerHTML = "<option value=''>Select Layer</option>";

    const district = hierarchyData.districts.find((d) => d.name === districtName);
    const taluka = district?.talukas.find((t) => t.name === talukaName);
    const village = taluka?.villages.find((v) => v.name === villageName);

    if (village) {
      village.layers.forEach((layer) => {
        const option = document.createElement("option");
        option.value = layer.layerName;
        option.textContent = layer.layerName.charAt(0).toUpperCase() + layer.layerName.slice(1);
        layerSelect.appendChild(option);
      });
    }
  }

  // Handle Update Data Form Submission
  document.getElementById("updateDataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("district", document.getElementById("updateDistrict").value);
    formData.append("taluka", document.getElementById("updateTaluka").value);
    formData.append("village", document.getElementById("updateVillage").value);
    formData.append("selectLayer", document.getElementById("updateLayer").value);

    const kmlFile = document.getElementById("updateKMLFile").files[0];
    const dwgFile = document.getElementById("updateDWGFile").files[0];

    if (kmlFile) formData.append("kml_path", kmlFile);
    if (dwgFile) formData.append("dwg_path", dwgFile);

    try {
      const response = await fetch("http://localhost:3000/api/updateData", {
        method: "POST",
        body: formData,
      });
      

      const result = await response.json();
      if (result.success) {
        alert("Data updated successfully!");
        closeUpdateDataModal();
      } else {
        alert(result.message || "Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while updating data.");
    }
  });

// ===============================================================================================================
fetch("./hierarchy.json") 
.then((response) => response.json())
.then((data) => {
  hierarchyData = data;
  populateDistricts();
})
.catch((error) => console.error("Error loading hierarchy data:", error));

// Populate District Dropdown
function populateDistricts() {
  const districtSelect = document.getElementById("district");
  districtSelect.innerHTML = "<option value=''>Select District</option>";
  hierarchyData.districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district.name;
    option.textContent = district.name;
    districtSelect.appendChild(option);
  });
}

// Load Talukas Based on Selected District
function loadTalukas() {
  const districtName = document.getElementById("district").value;
  const talukaSelect = document.getElementById("taluka");
  talukaSelect.innerHTML = "<option value=''>Select Taluka</option>";
  document.getElementById("village").innerHTML = "<option value=''>Select Village</option>";
  document.getElementById("updateLayer").innerHTML = "<option value=''>Select Layer</option>";

  const district = hierarchyData.districts.find((d) => d.name === districtName);
  if (district) {
    district.talukas.forEach((taluka) => {
      const option = document.createElement("option");
      option.value = taluka.name;
      option.textContent = taluka.name;
      talukaSelect.appendChild(option);
    });
  }
}

// Load Villages Based on Selected Taluka
function loadVillages() {
  const districtName = document.getElementById("district").value;
  const talukaName = document.getElementById("taluka").value;
  const villageSelect = document.getElementById("village");
  villageSelect.innerHTML = "<option value=''>Select Village</option>";
  document.getElementById("updateLayer").innerHTML = "<option value=''>Select Layer</option>";

  const district = hierarchyData.districts.find((d) => d.name === districtName);
  const taluka = district?.talukas.find((t) => t.name === talukaName);

  if (taluka) {
    taluka.villages.forEach((village) => {
      const option = document.createElement("option");
      option.value = village.name;
      option.textContent = village.name;
      villageSelect.appendChild(option);
    });
  }
  resetMap();
}

function viewVillage() {
  const districtName = document.getElementById("district").value;
  const talukaName = document.getElementById("taluka").value;
  const villageName = document.getElementById("village").value;

  const district = hierarchyData.districts.find((d) => d.name === districtName);
  const taluka = district?.talukas.find((t) => t.name === talukaName);
  const village = taluka?.villages.find((v) => v.name === villageName);

  if (!village) {
    alert("Please select a valid district, taluka, and village.");
    return;
  }

  const selectedLayers = Array.from(document.querySelectorAll("input[name='layer']:checked"));
  if (selectedLayers.length === 0) {
    alert("Please select at least one layer to view.");
    return;
  }

  selectedLayers.forEach((layerCheckbox) => {
    const layerName = layerCheckbox.value;
    const layerData = village.layers.find(layer => layer.layerName === layerName);

    if (layerData?.kmlPath) {
      addKMLLayer(layerData.kmlPath);  // This will add the KML layer to the map
    } else {
      alert(`No KML available for layer: ${layerName}`);
    }
  });
}

let currentKMLLayers = {}; // Store multiple KML layers with their respective names

function addKMLLayer(kmlURL, layerName) {
  fetch(kmlURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch KML file");
      }
      return response.text();
    })
    .then((kmlText) => {
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlText, "text/xml");

      const kmlLayer = omnivore.kml.parse(kmlText, null, L.geoJson(null, {
        style: function (feature) {
          return getKMLStyle(feature, kmlDoc); // Apply original KML styles
        },
        pointToLayer: function (feature, latlng) {
          const text = feature.properties.name || "Default Text";
          return L.marker(latlng, {
            icon: L.divIcon({
              className: 'text-label',
              html: `<div>${text}</div>`,
              iconSize: [0, 0]
            })
          });
        }
      })).addTo(map);

      map.fitBounds(kmlLayer.getBounds());

      // Add the layer to the currentKMLLayers object
      if (currentKMLLayers[layerName]) {
        map.removeLayer(currentKMLLayers[layerName]);
      }
      currentKMLLayers[layerName] = kmlLayer;
    })
    .catch((error) => {
      console.error("Error loading KML layer:", error);
      alert(`Failed to load the KML layer: ${layerName}`);
    });
}

function viewVillage() {
  const districtName = document.getElementById("district").value;
  const talukaName = document.getElementById("taluka").value;
  const villageName = document.getElementById("village").value;

  const district = hierarchyData.districts.find((d) => d.name === districtName);
  const taluka = district?.talukas.find((t) => t.name === talukaName);
  const village = taluka?.villages.find((v) => v.name === villageName);

  if (!village) {
    alert("Please select a valid district, taluka, and village.");
    return;
  }

  const selectedLayers = Array.from(document.querySelectorAll("input[name='layer']:checked"));
  if (selectedLayers.length === 0) {
    alert("Please select at least one layer to view.");
    return;
  }

  // Remove unselected layers from the map
  const selectedLayerNames = selectedLayers.map(layer => layer.value);
  Object.keys(currentKMLLayers).forEach(layerName => {
    if (!selectedLayerNames.includes(layerName)) {
      map.removeLayer(currentKMLLayers[layerName]);
      delete currentKMLLayers[layerName];
    }
  });

  // Add selected layers to the map
  selectedLayers.forEach((layerCheckbox) => {
    const layerName = layerCheckbox.value;
    const layerData = village.layers.find(layer => layer.layerName === layerName);

    if (layerData?.kmlPath) {
      addKMLLayer(layerData.kmlPath, layerName);
    } else {
      alert(`No KML available for layer: ${layerName}`);
    }
  });
}

// Extract KML style to preserve original colors
function getKMLStyle(feature, kmlDoc) {
  const style = {};
  const styleUrl = feature.properties.styleUrl;

  if (styleUrl) {
    const styleId = styleUrl.replace("#", "");
    const styleElement = kmlDoc.getElementById(styleId);

    if (styleElement) {
      const lineStyle = styleElement.getElementsByTagName("LineStyle")[0];
      const polyStyle = styleElement.getElementsByTagName("PolyStyle")[0];

      if (lineStyle) {
        const color = lineStyle.getElementsByTagName("color")[0]?.textContent || "ff0000";
        const width = lineStyle.getElementsByTagName("width")[0]?.textContent || 2;

        style.color = `#${color.substr(6, 2)}${color.substr(4, 2)}${color.substr(2, 2)}`;
        style.weight = parseFloat(width) + 2;
      }

      if (polyStyle) {
        const fillColor = polyStyle.getElementsByTagName("color")[0]?.textContent || "7fff00";
        style.fillColor = `#${fillColor.substr(6, 2)}${fillColor.substr(4, 2)}${fillColor.substr(2, 2)}`;
        style.fillOpacity = parseInt(fillColor.substr(0, 2), 16) / 255.0;
      }
    }
  }

  return style;
}


// Download selected DWG files
function downloadFiles() {
  const districtName = document.getElementById("district").value;
  const talukaName = document.getElementById("taluka").value;
  const villageName = document.getElementById("village").value;

  // Find the selected district, taluka, and village from hierarchyData
  const district = hierarchyData.districts.find((d) => d.name === districtName);
  const taluka = district?.talukas.find((t) => t.name === talukaName);
  const village = taluka?.villages.find((v) => v.name === villageName);

  // Check if the village is found
  if (!village) {
    alert("Please select a valid district, taluka, and village.");
    return;
  }

  // Get selected layers
  const selectedLayers = Array.from(document.querySelectorAll("input[name='layer']:checked"));
  if (selectedLayers.length === 0) {
    alert("Please select at least one layer to download.");
    return;
  }

  // Loop through selected layers and trigger download for each one
  selectedLayers.forEach((layerCheckbox) => {
    const layerName = layerCheckbox.value;
    const layerData = village.layers.find(layer => layer.layerName === layerName);

    if (layerData?.dwgPath) {
      const link = document.createElement("a");
      link.href = layerData.dwgPath;  // Link to DWG file
      link.download = `${village.name}_${layerName}.dwg`;  // Use village and layer name for the file name

      // Append the link to the body, click to trigger download, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`No DWG available for layer: ${layerName}`);
    }
  });
}

// Reset map layers
function resetMap() {
  map.eachLayer((layer) => {
    if (!layer._url) {
      map.removeLayer(layer);
    }
  });
}

// ==============================================================================================================
// Leaflet Map Initialization

const map = L.map("map-container").setView([19.5, 73.5], 6);

L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
attribution: "Tiles © Esri & the GIS User Community",
}).addTo(map);

const baseMaps = {
OpenStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}),
"Esri World Imagery": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles © Esri & the GIS User Community",
}),
"Carto Light": L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "© OpenStreetMap, © CartoDB",
}),
};

// Add layer control to map
L.control.layers(baseMaps).addTo(map);

// =============================================================================================================================
// Function to add KML layer to map with text and color properties
// Add KML layer to the map and preserve original KML colors


var searchControl = L.Control.geocoder({
  defaultMarkGeocode: true 
}).addTo(map);
 var polylineMeasure = L.control.polylineMeasure({
  position: 'topright',
  unit: 'kilometres', 
  showBearings: true,
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true,
  imperial: false 
});

polylineMeasure.addTo(map);

// Adding drawing controls for circles and polygons
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawOptions = {
  position: 'topright',
  collapsed: false,
  edit: {
      featureGroup: editableLayers,
      poly: {
          allowIntersection: false
      }
  },
  
  draw: {
      polygon: {
          allowIntersection: false,
          showArea: true
      },
      circle: {
          shapeOptions: {
              color: 'blue'
          },
          showRadius: true,
          metric: true,
          feet: true,
          nautic: false
      }
  }
};

var drawControl = new L.Control.Draw(drawOptions);
map.addControl(drawControl);

function getElevation(lat, lng) {
  var url = `https://api.opentopodata.org/v1/test-dataset?locations=${lat},${lng}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var elevation = data.results[0].elevation.toFixed(2);
      document.querySelector(".coordinate-info").innerHTML =
        `X: ${lng}, Y: ${lat}, Z: ${elevation} m`;
    })
    .catch(error => console.log("Elevation data not available", error));
}

// When a new shape is drawn, add it to the editableLayers group
map.on("draw:created", function (event) {
  var layer = event.layer;
  editableLayers.addLayer(layer);

  if (event.layerType === "polyline") {
      var latlngs = layer.getLatLngs();
      var totalDistance = 0;

      for (var i = 0; i < latlngs.length - 1; i++) {
          totalDistance += latlngs[i].distanceTo(latlngs[i + 1]); // Calculate distance
      }

      // Convert to km
      totalDistance = (totalDistance / 1000).toFixed(2);

      // Show distance in a popup
      layer.bindPopup(`Total Distance: ${totalDistance} km`).openPopup();
  }
});

     
///////////////////////////////////

// Wait for the input field to be created, then add a label
setTimeout(() => {
  const geocoderInput = document.querySelector(".leaflet-control-geocoder-form input");

  if (geocoderInput) {
    // Add an ID to the input field
    geocoderInput.setAttribute("id", "geocoder-search");
    
    // Add an ARIA label (for screen readers)
    geocoderInput.setAttribute("aria-label", "Search location");

    // Create a visually hidden label for accessibility
    const label = document.createElement("label");
    label.setAttribute("for", "geocoder-search");
    label.innerText = "Search Location:";
    label.style.position = "absolute"; 
    label.style.left = "-9999px"; // Hide label visually but keep it readable for screen readers

    // Insert the label before the input field
    geocoderInput.parentNode.insertBefore(label, geocoderInput);
  }
}, 500); // Delay to ensure the input field is available
