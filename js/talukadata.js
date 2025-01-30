$(document).ready(function () {
    // Earth GIF hiding and map container showing
    setTimeout(function () {
        $('#earthGif').hide();
        $('#map-container').css('display', 'block');

        // Initialize Leaflet map
        var map = L.map('map-container').setView([20.5937, 78.9629], 5); // India coordinates

        // Base maps
        var imageryMap = L.tileLayer.provider('Esri.WorldImagery');
        var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
        var stamenMap = L.tileLayer.provider('Stadia.StamenWatercolor');
        var cyclOSMMap = L.tileLayer.provider('CyclOSM');
        var darkMap = L.tileLayer.provider('Stadia.AlidadeSmoothDark');
        var smoothMap = L.tileLayer.provider('Stadia.AlidadeSmooth');

        // Overlay maps
        var geoServerIPPort = 'localhost:8080';
        var geoServerWorkspace = 'GIS';
        var stateLayerName = 'GIS:ind_st';

        var indStateLayer = L.tileLayer.wms(
            "http://" + geoServerIPPort + "/geoserver/" + geoServerWorkspace + "/wms",
            {
                layers: stateLayerName,
                format: "image/png",
                transparent: true,
                version: "1.1.0",
                tiled: true,
            }
        );

        var baseMaps = {
            'World Imagery': imageryMap,
            'OpenStreetMap': osmMap,
            'Stamen Watercolor': stamenMap,
            'CyclOSM': cyclOSMMap,
            'Alidade Smooth Dark': darkMap,
            'Stadia Smooth': smoothMap,
        };

        var overlayMaps = {
            'India States': indStateLayer
        };

        // Add layers and controls
        L.control.layers(baseMaps, overlayMaps).addTo(map);
        imageryMap.addTo(map); // Default base map
        indStateLayer.addTo(map); // Default overlay map
        L.control.fullscreen().addTo(map);
        L.Control.geocoder().addTo(map);

        // Adding measurement control
        var polylineMeasure = L.control.polylineMeasure({
            position: 'topright',
            unit: 'kilometres',
            showBearings: true,
            clearMeasurementsOnStop: false,
            showClearControl: true,
            showUnitControl: true
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

        // Data structure
        const data = {
            "Palghar": {
                "Talasari": {
                   "contourKmlURL": "./data/AMBEWADI CONTOUR.kml ",
                    "chainageURL": " ./data/CHAINAGE/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/PALGHAR/TALASARI/ZAI.kml",
                    "ECWURL": "https://www.idrive.com/idrive/sh/sh?k=y2t9v2v8a6",
                    "dsmURL": " ",
                    "dtmURL": "./data/MANGALWEDA.kml ",
                    "topoplanURL": " ",
                    "VillageMapURL": " ./data/VILLAGE MAP/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "VillageMapKmlURL": "./data/VILLAGE MAP/KML/PALGHAR/TALASARI/ZAI.kml",
                    "APCURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "APCKmlURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "NPCURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "NPCKmlURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "UPCURL": "./data/PROTECTED LINES/UNPROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "UPCKmlURL": "./data/PROTECTED LINES/UNPROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "VurnableCoastlineURL": " ",
                    "HighTideLineURL": "./data/TIDE LINES/HIGH TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "HighTideLineKmlURL": "./data/TIDE LINES/HIGH TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "LowTideLineURL": " ./data/TIDE LINES/LOW TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "LowTideLineKmlURL": "./data/TIDE LINES/LOW TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "SeawallURL": " ./data/SEAWALL/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "SeawallKmlURL": " ./data/SEAWALL/KML/PALGHAR/TALSARI/ZAI.kml",
                    "HazardLineURL": "./data/HAZARDS LINE/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "HazardLineKmlURL": "./data/HAZARDS LINE/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "EcosensativeZoneURL": "./data/ECOLOGICALLY SENSITIVE AREA/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "EcosensativeZoneKmlURL": "./data/ECOLOGICALLY SENSITIVE AREA/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "MangrooveURL": "./data/MANGROOVES/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "MangrooveKmlURL": " ./data/MANGROOVES/KML/PALGHAR/TALSARI/ZAI.kml",
                    "BufferZoneURL": "./data/MANGROOVES BUFFER ZONE/DWG/PALGHAR/TALASARI/ZAI.dwg  ",
                    "BufferZoneKmlURL": "./data/MANGROOVES BUFFER ZONE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "DGPSPointURL": " ",
                    "PillerLocationURL": "./data/PILLAR LOCATION/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "PillerLocationKmlURL": "./data/PILLAR LOCATION/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "FerryLocationURL": " ",
                    "YearWizeCoastlineURL": " ",
                    "RiverURL": "./data/RIVER/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "RiverKmlURL": "./data/RIVER/KML/PALGHAR/TALSARI/ZAI.kml ",
                    

                },
                "Dahanu": {
                   "contourKmlURL": "./data/AMBEWADI CONTOUR.kml ",
                    "chainageURL": " ./data/CHAINAGE/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/PALGHAR/TALASARI/ZAI.kml",
                    "ECWURL": "https://www.idrive.com/idrive/sh/sh?k=y2t9v2v8a6",
                    "dsmURL": " ",
                    "dtmURL": "./data/MANGALWEDA.kml ",
                    "topoplanURL": " ",
                    "VillageMapURL": " ./data/VILLAGE MAP/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "VillageMapKmlURL": "./data/VILLAGE MAP/KML/PALGHAR/TALASARI/ZAI.kml",
                    "APCURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "APCKmlURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "NPCURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "NPCKmlURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "UPCURL": "./data/PROTECTED LINES/UNPROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "UPCKmlURL": "./data/PROTECTED LINES/UNPROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "VurnableCoastlineURL": " ",
                    "HighTideLineURL": "./data/TIDE LINES/HIGH TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "HighTideLineKmlURL": "./data/TIDE LINES/HIGH TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "LowTideLineURL": " ./data/TIDE LINES/LOW TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "LowTideLineKmlURL": "./data/TIDE LINES/LOW TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "SeawallURL": " ./data/SEAWALL/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "SeawallKmlURL": " ./data/SEAWALL/KML/PALGHAR/TALSARI/ZAI.kml",
                    "HazardLineURL": "./data/HAZARDS LINE/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "HazardLineKmlURL": "./data/HAZARDS LINE/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "EcosensativeZoneURL": "./data/ECOLOGICALLY SENSITIVE AREA/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "EcosensativeZoneKmlURL": "./data/ECOLOGICALLY SENSITIVE AREA/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "MangrooveURL": "./data/MANGROOVES/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "MangrooveKmlURL": " ./data/MANGROOVES/KML/PALGHAR/TALSARI/ZAI.kml",
                    "BufferZoneURL": "./data/MANGROOVES BUFFER ZONE/DWG/PALGHAR/TALASARI/ZAI.dwg  ",
                    "BufferZoneKmlURL": "./data/MANGROOVES BUFFER ZONE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "DGPSPointURL": " ",
                    "PillerLocationURL": "./data/PILLAR LOCATION/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "PillerLocationKmlURL": "./data/PILLAR LOCATION/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "FerryLocationURL": " ",
                    "YearWizeCoastlineURL": " ",
                    "RiverURL": "./data/RIVER/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "RiverKmlURL": "./data/RIVER/KML/PALGHAR/TALSARI/ZAI.kml ",
                    
                },
                "Vasai": {
                    "contourKmlURL": "./data/AMBEWADI CONTOUR.kml ",
                    "chainageURL": " ./data/CHAINAGE/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/PALGHAR/TALASARI/ZAI.kml",
                    "ECWURL": "https://www.idrive.com/idrive/sh/sh?k=y2t9v2v8a6",
                    "dsmURL": " ",
                    "dtmURL": "./data/MANGALWEDA.kml ",
                    "topoplanURL": " ",
                    "VillageMapURL": " ./data/VILLAGE MAP/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "VillageMapKmlURL": "./data/VILLAGE MAP/KML/PALGHAR/TALASARI/ZAI.kml",
                    "APCURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "APCKmlURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "NPCURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "NPCKmlURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "UPCURL": "./data/PROTECTED LINES/UNPROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "UPCKmlURL": "./data/PROTECTED LINES/UNPROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "VurnableCoastlineURL": " ",
                    "HighTideLineURL": "./data/TIDE LINES/HIGH TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "HighTideLineKmlURL": "./data/TIDE LINES/HIGH TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "LowTideLineURL": " ./data/TIDE LINES/LOW TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "LowTideLineKmlURL": "./data/TIDE LINES/LOW TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "SeawallURL": " ./data/SEAWALL/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "SeawallKmlURL": " ./data/SEAWALL/KML/PALGHAR/TALSARI/ZAI.kml",
                    "HazardLineURL": "./data/HAZARDS LINE/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "HazardLineKmlURL": "./data/HAZARDS LINE/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "EcosensativeZoneURL": "./data/ECOLOGICALLY SENSITIVE AREA/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "EcosensativeZoneKmlURL": "./data/ECOLOGICALLY SENSITIVE AREA/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "MangrooveURL": "./data/MANGROOVES/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "MangrooveKmlURL": " ./data/MANGROOVES/KML/PALGHAR/TALSARI/ZAI.kml",
                    "BufferZoneURL": "./data/MANGROOVES BUFFER ZONE/DWG/PALGHAR/TALASARI/ZAI.dwg  ",
                    "BufferZoneKmlURL": "./data/MANGROOVES BUFFER ZONE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "DGPSPointURL": " ",
                    "PillerLocationURL": "./data/PILLAR LOCATION/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "PillerLocationKmlURL": "./data/PILLAR LOCATION/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "FerryLocationURL": " ",
                    "YearWizeCoastlineURL": " ",
                    "RiverURL": "./data/RIVER/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "RiverKmlURL": "./data/RIVER/KML/PALGHAR/TALSARI/ZAI.kml ",
                    
                },
                "Palghar":{
                    "contourKmlURL": "./data/AMBEWADI CONTOUR.kml ",
                    "chainageURL": " ./data/CHAINAGE/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/PALGHAR/TALASARI/ZAI.kml",
                    "ECWURL": "https://www.idrive.com/idrive/sh/sh?k=y2t9v2v8a6",
                    "dsmURL": " ",
                    "dtmURL": "./data/MANGALWEDA.kml ",
                    "topoplanURL": " ",
                    "VillageMapURL": " ./data/VILLAGE MAP/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "VillageMapKmlURL": "./data/VILLAGE MAP/KML/PALGHAR/TALASARI/ZAI.kml",
                    "APCURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "APCKmlURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "NPCURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "NPCKmlURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "UPCURL": "./data/PROTECTED LINES/UNPROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "UPCKmlURL": "./data/PROTECTED LINES/UNPROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "VurnableCoastlineURL": " ",
                    "HighTideLineURL": "./data/TIDE LINES/HIGH TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "HighTideLineKmlURL": "./data/TIDE LINES/HIGH TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "LowTideLineURL": " ./data/TIDE LINES/LOW TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "LowTideLineKmlURL": "./data/TIDE LINES/LOW TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "SeawallURL": " ./data/SEAWALL/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "SeawallKmlURL": " ./data/SEAWALL/KML/PALGHAR/TALSARI/ZAI.kml",
                    "HazardLineURL": "./data/HAZARDS LINE/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "HazardLineKmlURL": "./data/HAZARDS LINE/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "EcosensativeZoneURL": "./data/ECOLOGICALLY SENSITIVE AREA/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "EcosensativeZoneKmlURL": "./data/ECOLOGICALLY SENSITIVE AREA/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "MangrooveURL": "./data/MANGROOVES/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "MangrooveKmlURL": " ./data/MANGROOVES/KML/PALGHAR/TALSARI/ZAI.kml",
                    "BufferZoneURL": "./data/MANGROOVES BUFFER ZONE/DWG/PALGHAR/TALASARI/ZAI.dwg  ",
                    "BufferZoneKmlURL": "./data/MANGROOVES BUFFER ZONE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "DGPSPointURL": " ",
                    "PillerLocationURL": "./data/PILLAR LOCATION/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "PillerLocationKmlURL": "./data/PILLAR LOCATION/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "FerryLocationURL": " ",
                    "YearWizeCoastlineURL": " ",
                    "RiverURL": "./data/RIVER/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "RiverKmlURL": "./data/RIVER/KML/PALGHAR/TALSARI/ZAI.kml ",
                    
                }
            },
            "Thane": {
                "Thane": {
                    "chainageURL": "./data/CHAINAGE/DWG/THANE/THANE/TARANDI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/THANE/THANE/TARANDI.kml",
                },
            },
            "Mumbai":{
                "Mumbai city":{
                "contourKmlURL": "./data/AMBEWADI CONTOUR.kml ",
                    "chainageURL": " ./data/CHAINAGE/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "chainageKmlURL": " ./data/CHAINAGE/KML/PALGHAR/TALASARI/ZAI.kml",
                    "ECWURL": "https://www.idrive.com/idrive/sh/sh?k=y2t9v2v8a6",
                    "dsmURL": " ",
                    "dtmURL": "./data/MANGALWEDA.kml ",
                    "topoplanURL": " ",
                    "VillageMapURL": " ./data/VILLAGE MAP/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "VillageMapKmlURL": "./data/VILLAGE MAP/KML/PALGHAR/TALASARI/ZAI.kml",
                    "APCURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "APCKmlURL": "./data/PROTECTED LINES/ARTIFICIALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "NPCURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "NPCKmlURL": "./data/PROTECTED LINES/NATURALLY PROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "UPCURL": "./data/PROTECTED LINES/UNPROTECTED LINES/DWG/PALGHAR/TALASARI/ZAI.dwg",
                    "UPCKmlURL": "./data/PROTECTED LINES/UNPROTECTED LINES/KML/PALGHAR/TALASARI/ZAI.kml",
                    "VurnableCoastlineURL": " ",
                    "HighTideLineURL": "./data/TIDE LINES/HIGH TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "HighTideLineKmlURL": "./data/TIDE LINES/HIGH TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "LowTideLineURL": " ./data/TIDE LINES/LOW TIDE/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "LowTideLineKmlURL": "./data/TIDE LINES/LOW TIDE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "SeawallURL": " ./data/SEAWALL/DWG/PALGHAR/TALSARI/ZAI.dwg",
                    "SeawallKmlURL": " ./data/SEAWALL/KML/PALGHAR/TALSARI/ZAI.kml",
                    "HazardLineURL": "./data/HAZARDS LINE/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "HazardLineKmlURL": "./data/HAZARDS LINE/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "EcosensativeZoneURL": "./data/ECOLOGICALLY SENSITIVE AREA/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "EcosensativeZoneKmlURL": "./data/ECOLOGICALLY SENSITIVE AREA/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "MangrooveURL": "./data/MANGROOVES/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "MangrooveKmlURL": " ./data/MANGROOVES/KML/PALGHAR/TALSARI/ZAI.kml",
                    "BufferZoneURL": "./data/MANGROOVES BUFFER ZONE/DWG/PALGHAR/TALASARI/ZAI.dwg  ",
                    "BufferZoneKmlURL": "./data/MANGROOVES BUFFER ZONE/KML/PALGHAR/TALSARI/ZAI.kml ",
                    "DGPSPointURL": " ",
                    "PillerLocationURL": "./data/PILLAR LOCATION/DWG/PALGHAR/TALASARI/ZAI.dwg ",
                    "PillerLocationKmlURL": "./data/PILLAR LOCATION/KML/PALGHAR/TALASARI/ZAI.kml ",
                    "FerryLocationURL": " ",
                    "YearWizeCoastlineURL": " ",
                    "RiverURL": "./data/RIVER/DWG/PALGHAR/TALSARI/ZAI.dwg ",
                    "RiverKmlURL": "./data/RIVER/KML/PALGHAR/TALSARI/ZAI.kml ",
                    
            }
        }


            // ... other districts and talukas
        };

        const districtSelect = document.getElementById("district");
        const talukaSelect = document.getElementById("taluka");
        const showButton = document.getElementById('ShowButton');
        const downloadButton = document.getElementById('DownloadButton');

        // Populate the district dropdown
        for (let district in data) {
            const option = document.createElement("option");
            option.value = district;
            option.text = district;
            districtSelect.add(option);
        }

        // Function to populate the taluka dropdown based on the selected district
        districtSelect.addEventListener('change', function () {
            talukaSelect.innerHTML = ""; // Clear previous options
            const selectedDistrict = districtSelect.value;
            if (selectedDistrict && data[selectedDistrict]) {
                for (let taluka in data[selectedDistrict]) {
                    const option = document.createElement("option");
                    option.value = taluka;
                    option.text = taluka;
                    talukaSelect.add(option);
                }
            }
        });

        // Function to add KML layer to map
        var currentKMLLayer = null;

        function addKMLLayer(kmlURL) {
            fetch(kmlURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch KML file');
                    }
                    return response.text();
                })
                .then(kmlText => {
                    var parser = new DOMParser();
                    var kmlDoc = parser.parseFromString(kmlText, 'text/xml');
                    var kmlLayer = omnivore.kml.parse(kmlText, null, L.geoJson(null, {
                        style: function (feature) {
                            var style = getKMLStyle(feature);
                            return style;
                        },
                        pointToLayer: function (feature, latlng) {
                            var text = feature.properties.name || "Default Text";
                            var marker = L.marker(latlng, {
                                icon: L.divIcon({
                                    className: 'text-label',
                                    html: text,
                                    iconSize: [0, 0] // Adjust size if needed
                                })
                            });
                            return marker;
                        }
                    })).addTo(map);

                    function getKMLStyle(feature) {
                        var style = {};
                        var styleUrl = feature.properties.styleUrl;
                        if (styleUrl) {
                            var styleId = styleUrl.replace('#', '');
                            var styleElement = kmlDoc.getElementById(styleId);
                            if (styleElement) {
                                var lineStyle = styleElement.getElementsByTagName('LineStyle')[0];
                                var polyStyle = styleElement.getElementsByTagName('PolyStyle')[0];
                                if (lineStyle) {
                                    var color = lineStyle.getElementsByTagName('color')[0].textContent;
                                    var width = lineStyle.getElementsByTagName('width')[0].textContent;
                                    style.color = '#' + color.substr(6, 2) + color.substr(4, 2) + color.substr(2, 2);
                                    style.weight = parseFloat(width) + 2; // Increase the weight to bold the boundary
                                }
                                if (polyStyle) {
                                    var fillColor = polyStyle.getElementsByTagName('color')[0].textContent;
                                    style.fillColor = '#' + fillColor.substr(6, 2) + fillColor.substr(4, 2) + fillColor.substr(2, 2);
                                    style.fillOpacity = parseInt(fillColor.substr(0, 2), 16) / 255.0;
                                }
                            }
                        }
                        // Ensure the boundary is bold by setting a default style if no style is found
                        style.weight = style.weight || 5;
                        style.color = style.color || '#000000';

                        return style;
                    }

                    // Fit map to bounds of KML layer
                    map.fitBounds(kmlLayer.getBounds());

                    // Update the current KML layer reference
                    currentKMLLayer = kmlLayer;
                })
                .catch(error => {
                    console.error('Error loading KML file:', error);
                    alert('Error loading KML file');
                });
        }

        function removeCurrentKMLLayer() {
            if (currentKMLLayer) {
                map.removeLayer(currentKMLLayer);
                currentKMLLayer = null;
            }
        }

        // Event listener for show button
        showButton.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedDistrict = districtSelect.value;
            const selectedTaluka = talukaSelect.value;
            const talukaData = data[selectedDistrict]?.[selectedTaluka];

            // Check if at least one checkbox is selected
            const checkedCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).length > 0;

            if (selectedDistrict && selectedTaluka && talukaData) {
                // Remove the current KML layer before checking and adding new ones
                removeCurrentKMLLayer();

                const checkboxes = [
                    { checkbox: 'checkbox1', url: 'chainageKmlURL' },
                    { checkbox: 'checkbox2', url: 'ECWURL' },
                    { checkbox: 'checkbox3', url: 'dtmURL' },
                    { checkbox: 'checkbox4', url: 'dsmURL' },
                    { checkbox: 'checkbox5', url: 'contourKmlURL' },
                    { checkbox: 'checkbox6', url: 'topoplanURL' },
                    { checkbox: 'checkbox7', url: 'VillageMapKmlURL' },
                    { checkbox: 'checkbox8', url: 'APCKmlURL' },
                    { checkbox: 'checkbox9', url: 'NPCKmlURL' },
                    { checkbox: 'checkbox10', url: 'UPCKmlURL' },
                    { checkbox: 'checkbox11', url: 'ShortTermKmlURL' },
                    { checkbox: 'checkbox12', url: 'HighTideLineKmlURL' },
                    { checkbox: 'checkbox13', url: 'LowTideLineKmlURL' },
                    { checkbox: 'checkbox14', url: 'BundKMLURL' },
                    { checkbox: 'checkbox15', url: 'SeawallKmlURL' },
                    { checkbox: 'checkbox16', url: 'HarbourKmlURL' },
                    { checkbox: 'checkbox17', url: 'HazardLineKmlURL' },
                    { checkbox: 'checkbox18', url: 'SanddaneKmlURL' },
                    { checkbox: 'checkbox19', url: 'EcosensativeZoneKmlURL' },
                    { checkbox: 'checkbox20', url: 'MangrooveKmlURL' },
                    { checkbox: 'checkbox21', url: 'BufferZoneKmlURL' },
                    { checkbox: 'checkbox22', url: 'LongTermKmlURL' },
                    { checkbox: 'checkbox23', url: 'PillerLocationKmlURL' },
                    { checkbox: 'checkbox24', url: 'FerryLocationKmlURL' },
                    { checkbox: 'checkbox25', url: 'YearWizeCoastlineKmlURL' },
                    { checkbox: 'checkbox26', url: 'CreekKmlURL' },
                    { checkbox: 'checkbox27', url: 'RiverKmlURL' },
                    { checkbox: 'checkbox28', url: 'JettyKmlURL' },
                    { checkbox: 'checkbox29', url: 'DGPS Control Point' },
                    { checkbox: 'checkbox30', url: 'BreakwaterStructureKmlURL' }
                ];

                // Check each checkbox and add corresponding KML layers
                checkboxes.forEach(item => {
                    const checkbox = document.querySelector(`input[name="${item.checkbox}"]:checked`);
                    if (checkbox) {
                        const kmlURL = talukaData[item.url];
                        if (kmlURL) {
                            addKMLLayer(kmlURL);
                        } else {
                            alert(`${item.url} is not available. Please select another option.`);
                        }
                    }
                });
            } else if (!checkedCheckbox) {
                alert("Please select at least one checkbox.");
            } else {
                alert("Please select a district and taluka.");
            }
        });


        ////////////////////////////////////////////////////

        // Event listener for download button
        document.getElementById('downloadButton').addEventListener('click', function (event) {
            event.preventDefault();
        
            const selectedDistrict = districtSelect.value;
            const selectedTaluka = talukaSelect.value;
            const TalukaData = data[selectedDistrict]?.[selectedTaluka];
        
            if (selectedDistrict && selectedTaluka  && TalukaData) {
                const chainageCheckbox = document.querySelector('input[name="checkbox1"]:checked');
                    const ecwCheckbox = document.querySelector('input[name="checkbox2"]:checked');
                    const dtmCheckbox = document.querySelector('input[name="checkbox3"]:checked');
                    const dsmCheckbox = document.querySelector('input[name="checkbox4"]:checked');
                    const contourCheckbox = document.querySelector('input[name="checkbox5"]:checked'); // Fix variable name
                    const topoplanCheckbox = document.querySelector('input[name="checkbox6"]:checked');
                    const VillageMapCheckbox = document.querySelector('input[name="checkbox7"]:checked');
                    const APCCheckbox = document.querySelector('input[name="checkbox8"]:checked');
                    const NPCCheckbox = document.querySelector('input[name="checkbox9"]:checked'); // Fix checkbox name
                    const UPCCheckbox = document.querySelector('input[name="checkbox10"]:checked'); // Fix checkbox name
                    const ShortTermCheckbox = document.querySelector('input[name="checkbox11"]:checked');
                    const HighTideLineCheckbox = document.querySelector('input[name="checkbox12"]:checked');
                    const LowTideLineCheckbox = document.querySelector('input[name="checkbox13"]:checked');
                    const BundCheckbox = document.querySelector('input[name="checkbox14"]:checked');
                    const SeawallCheckbox = document.querySelector('input[name="checkbox15"]:checked');
                    const HarbourCheckbox = document.querySelector('input[name="checkbox16"]:checked');
                    const HazardLineCheckbox = document.querySelector('input[name="checkbox17"]:checked');
                    const SanddaneCheckbox = document.querySelector('input[name="checkbox18"]:checked');
                    const EcosensativeZoneCheckbox = document.querySelector('input[name="checkbox19"]:checked');
                    const MangrooveCheckbox = document.querySelector('input[name="checkbox20"]:checked');
                    const BufferZoneCheckbox = document.querySelector('input[name="checkbox21"]:checked');
                    const LongTermCheckbox = document.querySelector('input[name="checkbox22"]:checked');
                    const PillerLocationCheckbox = document.querySelector('input[name="checkbox23"]:checked');
                    const FerryLocationCheckbox = document.querySelector('input[name="checkbox24"]:checked');
                    const YearWizeCoastlineCheckbox = document.querySelector('input[name="checkbox25"]:checked');
                    const CreekCheckbox = document.querySelector('input[name="checkbox26"]:checked');
                    const RiverCheckbox = document.querySelector('input[name="checkbox27"]:checked');
                    const JettyCheckbox = document.querySelector('input[name="checkbox28"]:checked');
                    const DGPSControlPointCheckbox = document.querySelector('input[name="checkbox29"]:checked');
                    const BreakwaterStructureCheckbox = document.querySelector('input[name="checkbox30"]:checked');
        
                    if (chainageCheckbox && TalukaData['chainageURL']) {
                        const chainageURL = TalukaData['chainageURL'];

                        const chainageLink = document.createElement('a');
                        chainageLink.href = chainageURL;
                        chainageLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(chainageLink);
                        chainageLink.click();
                        document.body.removeChild(chainageLink);
                    } else if (ecwCheckbox && TalukaData['ECWURL']) {
                        const ecwURL = TalukaData['ECWURL'];

                        const ecwLink = document.createElement('a');
                        ecwLink.href = ecwURL;
                        ecwLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(ecwLink);
                        ecwLink.click();
                        document.body.removeChild(ecwLink);
                    } else if (dsmCheckbox && TalukaData['dsmURL']) {
                        const dsmURL = TalukaData['dsmURL'];

                        const dsmLink = document.createElement('a');
                        dsmLink.href = dsmURL;
                        dsmLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(dsmLink);
                        dsmLink.click();
                        document.body.removeChild(dsmLink);
                    }
                    else if (dtmCheckbox && TalukaData['dtmURL']) {
                        const dtmURL = TalukaData['dtmURL'];

                        const dtmLink = document.createElement('a');
                        dtmLink.href = dtmURL;
                        dtmLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(dtmLink);
                        dtmLink.click();
                        document.body.removeChild(dtmLink);
                    }
                    else if (contourCheckbox && TalukaData['contourURL']) {
                        const contourURL = TalukaData['contourURL'];

                        const contourLink = document.createElement('a');
                        contourLink.href = contourURL;
                        contourLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(contourLink);
                        contourLink.click();
                        document.body.removeChild(contourLink);
                    }
                    else if (topoplanCheckbox && TalukaData['topoplanURL']) {
                        const topoplanURL = TalukaData['topoplanURL'];

                        const topoplanLink = document.createElement('a');
                        topoplanLink.href = topoplanURL;
                        topoplanLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(topoplanLink);
                        topoplanLink.click();
                        document.body.removeChild(topoplanLink);
                    }
                    else if (VillageMapCheckbox && TalukaData['VillageMapURL']) {
                        const VillageMapURL = TalukaData['VillageMapURL'];

                        const VillageMapLink = document.createElement('a');
                        VillageMapLink.href = VillageMapURL;
                        VillageMapLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(VillageMapLink);
                        VillageMapLink.click();
                        document.body.removeChild(VillageMapLink);
                    }
                    else if (APCCheckbox && TalukaData['APCURL']) {
                        const APCURL = TalukaData['APCURL'];

                        const APCLink = document.createElement('a');
                        APCLink.href = APCURL;
                        APCLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(APCLink);
                        APCLink.click();
                        document.body.removeChild(APCLink);
                    }
                    else if (NPCCheckbox &&TalukaData['NPCURL']) {
                        const NPCURL = TalukaData['NPCURL'];

                        const NPCLink = document.createElement('a');
                        NPCLink.href = NPCURL;
                        NPCLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(NPCLink);
                        NPCLink.click();
                        document.body.removeChild(NPCLink);
                    }
                    else if (UPCCheckbox && TalukaData['UPCURL']) {
                        const UPCURL =TalukaData['UPCURL'];

                        const UPCLink = document.createElement('a');
                        UPCLink.href = UPCURL;
                        UPCLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(UPCLink);
                        UPCLink.click();
                        document.body.removeChild(UPCLink);
                    }
                    else if (ShortTermCheckbox && TalukaData['ShortTermURL']) {
                        const ShortTermURL =TalukaData['ShortTermURL'];

                        const ShortTermLink = document.createElement('a');
                        ShortTermLink.href = ShortTermURL;
                        ShortTermLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(ShortTermLink);
                        ShortTermLink.click();
                        document.body.removeChild(ShortTermLink);
                    }
                    else if (HighTideLineCheckbox && TalukaData['HighTideLineURL']) {
                        const HighTideLineURL = TalukaData['HighTideLineURL'];

                        const HighTideLineLink = document.createElement('a');
                        HighTideLineLink.href = HighTideLineURL;
                        HighTideLineLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(HighTideLineLink);
                        HighTideLineLink.click();
                        document.body.removeChild(HighTideLineLink);
                    }
                    else if (LowTideLineCheckbox && TalukaData['LowTideLineURL']) {
                        const LowTideLineURL = TalukaData['LowTideLineURL'];

                        const LowTideLineLink = document.createElement('a');
                        LowTideLineLink.href = LowTideLineURL;
                        LowTideLineLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(LowTideLineLink);
                        LowTideLineLink.click();
                        document.body.removeChild(LowTideLineLink);
                    }
                    else if (BundCheckbox && TalukaData['BundURL']) {
                        const BundURL = TalukaData['BundURL'];

                        const BundLink = document.createElement('a');
                        BundLink.href = BundURL;
                        BundLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(BundLink);
                        BundLink.click();
                        document.body.removeChild(BundLink);
                    }
                    else if (SeawallCheckbox && TalukaData['SeawallURL']) {
                        const SeawallURL = TalukaData['SeawallURL'];

                        const SeawallLink = document.createElement('a');
                        SeawallLink.href = SeawallURL;
                        SeawallLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(SeawallLink);
                        SeawallLink.click();
                        document.body.removeChild(SeawallLink);
                    }
                    else if (HarbourCheckbox && TalukaData['HarbourURL']) {
                        const HarbourURL = TalukaData['HarbourURL'];

                        const HarbourLink = document.createElement('a');
                        HarbourLink.href = HarbourURL;
                        HarbourLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(HarbourLink);
                        HarbourLink.click();
                        document.body.removeChild(HarbourLink);
                    }
                    else if (HazardLineCheckbox && TalukaData['HazardLineURL']) {
                        const HazardLineURL = TalukaData['HazardLineURL'];

                        const HazardLineLink = document.createElement('a');
                        HazardLineLink.href = HazardLineURL;
                        HazardLineLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(HazardLineLink);
                        HazardLineLink.click();
                        document.body.removeChild(HazardLineLink);
                    }
                    else if (SanddaneCheckbox && TalukaData['SanddaneURL']) {
                        const SanddaneURL = TalukaData['SanddaneURL'];

                        const SanddaneLink = document.createElement('a');
                        SanddaneLink.href = SanddaneURL;
                        SanddaneLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(SanddaneLink);
                        SanddaneLink.click();
                        document.body.removeChild(SanddaneLink);
                    }
                    else if (EcosensativeZoneCheckbox && TalukaData['EcosensativeZoneURL']) {
                        const EcosensativeZoneURL =TalukaData['EcosensativeZoneURL'];

                        const EcosensativeZoneLink = document.createElement('a');
                        EcosensativeZoneLink.href = EcosensativeZoneURL;
                        EcosensativeZoneLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(EcosensativeZoneLink);
                        EcosensativeZoneLink.click();
                        document.body.removeChild(EcosensativeZoneLink);
                    }
                    else if (MangrooveCheckbox && TalukaData['MangrooveURL']) {
                        const MangrooveURL = TalukaData['MangrooveURL'];

                        const MangrooveLink = document.createElement('a');
                        MangrooveLink.href = MangrooveURL;
                        MangrooveLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(MangrooveLink);
                        MangrooveLink.click();
                        document.body.removeChild(MangrooveLink);
                    }
                    else if (BufferZoneCheckbox && TalukaData['BufferZoneURL']) {
                        const BufferZoneURL = TalukaData['BufferZoneURL'];

                        const BufferZoneLink = document.createElement('a');
                        BufferZoneLink.href = BufferZoneURL;
                        BufferZoneLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(BufferZoneLink);
                        BufferZoneLink.click();
                        document.body.removeChild(BufferZoneLink);
                    }
                    else if (LongTermCheckbox && TalukaData['LongTermURL']) {
                        const LongTermURL = TalukaData['LongTermURL'];

                        const LongTermLink = document.createElement('a');
                        LongTermLink.href =LongTermURL;
                        LongTermLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(LongTermLink);
                        LongTermLink.click();
                        document.body.removeChild(LongTermLink);
                    }
                    else if (PillerLocationCheckbox && TalukaData['PillerLocationURL']) {
                        const PillerLocationURL = TalukaData['PillerLocationURL'];

                        const PillerLocationLink = document.createElement('a');
                        PillerLocationLink.href = PillerLocationURL;
                        PillerLocationLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(PillerLocationLink);
                        PillerLocationLink.click();
                        document.body.removeChild(PillerLocationLink);
                    }
                    else if (FerryLocationCheckbox && TalukaData['FerryLocationURL']) {
                        const FerryLocationURL = TalukaData['FerryLocationURL'];

                        const FerryLocationLink = document.createElement('a');
                        FerryLocationLink.href = FerryLocationURL;
                        FerryLocationLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(FerryLocationLink);
                        FerryLocationLink.click();
                        document.body.removeChild(FerryLocationLink);
                    }
                    else if (YearWizeCoastlineCheckbox && TalukaData['YearWizeCoastlineURL']) {
                        const YearWizeCoastlineURL = TalukaData['YearWizeCoastlineURL'];

                        const YearWizeCoastlineLink = document.createElement('a');
                        YearWizeCoastlineLink.href = YearWizeCoastlineURL;
                        YearWizeCoastlineLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(YearWizeCoastlineLink);
                        YearWizeCoastlineLink.click();
                        document.body.removeChild(YearWizeCoastlineLink);
                    }
                    //////////////////
                    else if (CreekCheckbox && TalukaData['CreekURL']) {
                        const CreekURL =TalukaData['CreekURL'];

                        const CreekLink = document.createElement('a');
                        CreekLink.href = CreekURL;
                        CreekLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(CreekLink);
                        CreekLink.click();
                        document.body.removeChild(CreekLink);
                    }
                    else if (RiverCheckbox && TalukaData['RiverURL']) {
                        const RiverURL = TalukaData['RiverURL'];

                        const RiverLink = document.createElement('a');
                        RiverLink.href = RiverURL;
                        RiverLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(RiverLink);
                        RiverLink.click();
                        document.body.removeChild(RiverLink);
                    }
                    else if (JettyCheckbox && TalukaData['JettyURL']) {
                        const JettyURL = TalukaData['JettyURL'];

                        const JettyLink = document.createElement('a');
                        JettyLink.href = JettyURL;
                        JettyLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(JettyLink);
                        JettyLink.click();
                        document.body.removeChild(JettyLink);
                    }
                   
                    else if (BreakwaterStructureCheckbox && TalukaData['BreakwaterStructureURL']) {
                        const BreakwaterStructureURL = TalukaData['BreakwaterStructureURL'];

                        const BreakwaterStructureLink = document.createElement('a');
                        BreakwaterStructureLink.href = BreakwaterStructureURL;
                        BreakwaterStructureLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(BreakwaterStructureLink);
                        BreakwaterStructureLink.click();
                        document.body.removeChild(BreakwaterStructureLink);
                    }
                    else if (DGPSControlPointCheckbox && TalukaData['DGPSControlPointURL']) {
                        const DGPSControlPointURL = TalukaData['DGPSControlPointURL'];

                        const DGPSControlPointLink = document.createElement('a');
                        DGPSControlPointLink.href = DGPSControlPointURL;
                        DGPSControlPointLink.download = ''; // You can specify a custom filename here if needed
                        document.body.appendChild(DGPSControlPointLink);
                        DGPSControlPointLink.click();
                        document.body.removeChild(DGPSControlPointLink);
                    }
                   

                    else {
                        alert("Please select another Checkbox.");
                    }
                } else {
                    alert("Please select a district, taluka.");
                }
            });

        
        // Function to handle file downloads
        function downloadFile(url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = ''; // You can specify a custom filename here if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

}, 1000); // 10-second delay











