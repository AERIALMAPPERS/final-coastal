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
               
                   
            "Thane": {
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

            "Mumbai":{
              
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
            "Raigad":{
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
              "Ratnagiri":{
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
          "Sindhudurg":{
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


            // ... other districts and talukas
        };

        const districtSelect = document.getElementById("district");
        // const talukaSelect = document.getElementById("taluka");
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
                    option.value = district;
                    option.text = district;
                    districtSelect.add(option);
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

        showButton.addEventListener('click', function (event) {
            event.preventDefault();
        
            const selectedDistrict = districtSelect.value;
            const districtData = data[selectedDistrict];
        
            // Check if a district is selected
            if (selectedDistrict && districtData) {
                // Remove the current KML layer before adding new ones
                removeCurrentKMLLayer();
        
                // Check if at least one checkbox is selected
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

                let kmlAdded = false; // To check if any KML was added
                checkboxes.forEach(item => {
                    const checkbox = document.querySelector(`input[name="${item.checkbox}"]:checked`);
                    if (checkbox) {
                        const kmlURL = districtData[item.url];
                        if (kmlURL) {
                            addKMLLayer(kmlURL); // Add KML layer
                            kmlAdded = true; 
                        } else {
                            alert(`${item.url} is not available for the selected district.`);
                        }
                    }
                });
        
                if (!kmlAdded) {
                    alert("Please select a valid KML layer to display.");
                }
            } else {
                alert("Please select a district.");
            }
        });
        
        
        ////////////////////////////////////////////////////

        // Event listener for download button
        document.getElementById('downloadButton').addEventListener('click', function (event) {
            event.preventDefault();
        
            const selectedDistrict = districtSelect.value;
            // const selectedTaluka = talukaSelect.value;
            const districtData = data[selectedDistrict];
        
            if (selectedDistrict && districtData) {
                const chainageCheckbox = document.querySelector('input[name="checkbox1"]:checked');
                const ecwCheckbox = document.querySelector('input[name="checkbox2"]:checked');
        
                if (chainageCheckbox && districtData['chainageURL']) {
                    downloadFile(districtData['chainageURL']);
                } else if (ecwCheckbox && TalukData['ECWURL']) {
                    downloadFile(districtData['ECWURL']);
                } else {
                    alert("Please select at least one valid checkbox.");
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










