const form = document.getElementById('quote-form');
const calculateBtn = document.getElementById('calculate-btn');
const downloadPdfBtn = document.getElementById('download-pdf');
const quoteResultDiv = document.getElementById('quote-result');

const basePricePerSqUnit = 6.5; 
const materialFactors = {
    wood: 1.3,
    plastic: 1.1,
    metal: 1.2
};
const colorSurchargeRate = 0.05;

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const material = document.getElementById('material').value;
    const color = document.getElementById('color').value;

    const area = width * height;
    const baseCost = area * basePricePerSqUnit;
    const materialFactor = materialFactors[material] || 1.0;
    const adjustedCost = baseCost * materialFactor;
    const colorSurcharge = colorSurchargeRate * adjustedCost * (color === 'premium' ? 1 : 0);
    const quote = adjustedCost + colorSurcharge;

    quoteResultDiv.innerText = `Quote: R${quote.toFixed(2)}`;
    downloadPdfBtn.style.display = 'block';
});

downloadPdfBtn.addEventListener('click', () => {
    try {
        const doc = new jsPDF();
        
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;
        const material = document.getElementById('material').value;
        const color = document.getElementById('color').value;
        const quote = quoteResultDiv.innerText.split(': ')[1];
    
        doc.text('Quote', 10, 10);
        doc.text(`Width: ${width} cm`, 10, 20);
        doc.text(`Height: ${height} cm`, 10, 30);
        doc.text(`Material: ${material}`, 10, 40);
        doc.text(`Color: ${color}`, 10, 50);
        doc.text(`Quote: R${quote}`, 10, 60);
        
        doc.save('quote.pdf');
    } catch (ex) {
        alert('The system could not generate your quote. You might not have an internet connection.');        
    }
});