import React, { useState, useRef } from 'react';

const Jsonit = () => {
  const [resultMessage, setResultMessage] = useState('');
  const [jsonUrl, setJsonUrl] = useState('');
  const fileInputRef = useRef(null);

  const convertCSVtoJSON = () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      setResultMessage('Please select a CSV file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').filter(row => row.trim() !== '');
      const headers = rows[0].split(',').map(header => header.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });

      // Parse features into array of objects
      const parseFeatures = (featuresStr) => {
        if (!featuresStr || typeof featuresStr !== 'string') return [];
        const features = [];
        const featurePairs = featuresStr.split('|');
        for (let pair of featurePairs) {
          if (pair.includes(':')) {
            const [name, value] = pair.split(':', 2).map(item => item.trim());
            features.push({ feature_name: name, feature_value: value });
          }
        }
        return features;
      };

      // Apply features parsing and convert prices to numbers
      data.forEach(row => {
        row.features = parseFeatures(row.features);
        row.regular_price = parseFloat(row.regular_price) || 0;
        row.offer_price = parseFloat(row.offer_price) || 0;
      });

      // Group by product_category and title
      const grouped = {};
      data.forEach(row => {
        const key = `${row.product_category}-${row.title}`;
        if (!grouped[key]) {
          grouped[key] = { product_category: row.product_category, title: row.title, variations: [] };
        }
        grouped[key].variations.push({
          variation_name: row.variation_name,
          sku_code: row.sku_code,
          made_in: row.made_in,
          features: row.features,
          regular_price: row.regular_price,
          offer_price: row.offer_price,
          product_details: row.product_details,
          product_info: row.product_info,
          variation_value: row.variation_value,
          image_url: row.image_url
        });
      });

      // Convert grouped data to array
      const result = Object.values(grouped);
      const jsonString = JSON.stringify(result, null, 2);

      // Create downloadable file
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      setJsonUrl(url);
      setResultMessage('Conversion successful! Click the button below to download the JSON file.');
    };

    reader.onerror = () => {
      setResultMessage('Error reading the file.');
    };

    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (jsonUrl) {
      const link = document.createElement('a');
      link.href = jsonUrl;
      link.download = 'products.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(jsonUrl);
      setJsonUrl('');
    }
  };

  return (
    <div className="jsonit min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">CSV to Nested JSON Converter</h1>
        <p className="text-gray-600 mb-4 text-center">Upload your CSV file to convert it into a nested JSON format for Directus.</p>

        <div className="input-group mb-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          onClick={convertCSVtoJSON}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
        >
          Convert to JSON
        </button>

        {resultMessage && (
          <div className="text-center">
            <p className={`text-sm ${resultMessage.includes('successful') ? 'text-green-600' : 'text-red-600'} mb-2`}>
              {resultMessage}
            </p>
            {jsonUrl && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Download JSON
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jsonit;