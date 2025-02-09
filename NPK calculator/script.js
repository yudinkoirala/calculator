const npkValues = {
    tomato: { N: 200, P: 120, K: 100 },
    potato: { N: 220, P: 140, K: 140 },
    cabbage: { N: 240, P: 180, K: 80 },
    carrot: { N: 80, P: 50, K: 60 },
    onion: { N: 240, P: 180, K: 80 },
    broccoli: { N: 240, P: 180, K: 80 },
    spinach: { N: 160, P: 80, K: 60 },
    pepper: { N: 110, P: 70, K: 90 },
    cucumber: { N: 140, P: 100, K: 150 },
    cauliflower: { N: 200, P: 120, K: 80 },
    brinjal: { N: 195, P: 170, K: 78 },
    lettuce: { N: 90, P: 50, K: 80 },
    radish: { N: 100, P: 80, K: 40 },
    garlic: { N: 85, P: 60, K: 60 },
    pumpkin: { N: 100, P: 50, K: 100 },
    peas: { N: 30, P: 40, K: 120 },
    beetroot: { N: 110, P: 70, K: 90 },
    chili: { N: 150, P: 150, K: 150 }
};

const unitConversions = {
    m2: 1,
    kattha: 338.63,
    hectare: 10000,
    ropani: 508.72,
    dhur: 16.93
};

function calculateNPK() {
    let vegetable = document.getElementById("vegetable").value;
    let area = parseFloat(document.getElementById("area").value);
    let unit = document.getElementById("unit").value;
    let ph = parseFloat(document.getElementById("ph").value);
    let nitrogenLevel = document.querySelector('input[name="nitrogen"]:checked').value;
    let phosphorusLevel = document.querySelector('input[name="phosphorus"]:checked').value;
    let potassiumLevel = document.querySelector('input[name="potassium"]:checked').value;

    if (isNaN(area) || area <= 0) {
        document.getElementById("result").innerText = "Please enter a valid area.";
        return;
    }
    if (ph < 1 || ph > 14) {
        document.getElementById("result").innerText = "Please enter a pH value between 1 and 14.";
        return;
    }

    
    let areaInM2 = area * unitConversions[unit];
    let areaInHectares = areaInM2 * 0.0001;
    let npk = npkValues[vegetable];
    
    let doseFactors = { low: 1, medium: 0.5, high: 0.25 };
    let n = npk.N * areaInHectares * doseFactors[nitrogenLevel];
    let p = npk.P * areaInHectares * doseFactors[phosphorusLevel];
    let k = npk.K * areaInHectares * doseFactors[potassiumLevel];
    
    let limeGypsumSuggestion = "";
    if (ph < 5.5) {
        limeGypsumSuggestion = "Soil is acidic. Consider applying Agricultural Lime.";
    } else if (ph > 7.5) {
        limeGypsumSuggestion = "Soil is alkaline. Consider applying Gypsum.";
    } else {
        limeGypsumSuggestion = "Soil pH is optimal.";
    }
    
    document.getElementById("result").innerText = `Recommended NPK dose for ${vegetable} on ${area} ${unit}: \nN: ${n.toFixed(2)} kg, P: ${p.toFixed(2)} kg, K: ${k.toFixed(2)} kg\n${limeGypsumSuggestion}`;
}

function submitEmail() {
    alert("Email submitted successfully!");
}
