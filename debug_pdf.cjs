const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));
console.log('Value of pdf:', pdf);
try {
    const fs = require('fs');
    // Create a dummy buffer to test
    const dummyBuffer = Buffer.from('test');
    // iterate over keys to find a function
    for (const key of Object.keys(pdf)) {
        if (typeof pdf[key] === 'function') {
            console.log(`Found function export: ${key}`);
            // Try calling it?
        }
    }
} catch (e) {
    console.log('Error:', e.message);
}
