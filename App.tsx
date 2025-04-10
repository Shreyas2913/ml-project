import React, { useState } from 'react';
import { Search, AlertCircle, Heart, ThumbsUp, Stethoscope } from 'lucide-react';

interface Drug {
  id: number;
  name: string;
  description: string;
  usage: string;
  rating: number;
  effectiveness: number;
  conditions: string[];
  symptoms: string[];
}

const sampleDrugs: Drug[] = [
  {
    id: 1,
    name: "Ibuprofen",
    description: "Non-steroidal anti-inflammatory drug (NSAID)",
    usage: "Pain relief, fever reduction, and anti-inflammatory",
    rating: 4.5,
    effectiveness: 85,
    conditions: ["Arthritis", "Headache", "Muscle Pain"],
    symptoms: ["Pain", "Fever", "Inflammation", "Joint Pain"]
  },
  {
    id: 2,
    name: "Amoxicillin",
    description: "Penicillin antibiotic",
    usage: "Bacterial infections treatment",
    rating: 4.2,
    effectiveness: 90,
    conditions: ["Strep Throat", "Pneumonia", "Bronchitis"],
    symptoms: ["Sore Throat", "Fever", "Cough", "Chest Pain"]
  },
  {
    id: 3,
    name: "Loratadine",
    description: "Antihistamine medication",
    usage: "Allergy relief and symptoms management",
    rating: 4.0,
    effectiveness: 75,
    conditions: ["Allergic Rhinitis", "Hay Fever", "Hives"],
    symptoms: ["Sneezing", "Runny Nose", "Itchy Eyes", "Skin Rash"]
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'condition' | 'symptom'>('symptom');

  const matchedDrugs = sampleDrugs.filter(drug => {
    const searchLower = searchTerm.toLowerCase();
    if (searchType === 'condition') {
      return drug.conditions.some(condition => 
        condition.toLowerCase().includes(searchLower)
      );
    } else {
      return drug.symptoms.some(symptom => 
        symptom.toLowerCase().includes(searchLower)
      );
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Drug Recommendation System</h1>
          <p className="text-gray-600">Find medications based on your conditions or symptoms</p>
        </header>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4 mb-4 justify-center">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                searchType === 'symptom' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50'
              }`}
              onClick={() => setSearchType('symptom')}
            >
              Search by Symptom
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                searchType === 'condition' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50'
              }`}
              onClick={() => setSearchType('condition')}
            >
              Search by Condition
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={searchType === 'symptom' ? 'Enter your symptoms (e.g., fever, cough)' : 'Enter your condition (e.g., arthritis, allergies)'}
              className="w-full px-4 py-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-4.5 text-gray-400 w-6 h-6" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            matchedDrugs.length > 0 ? (
              <div className="grid gap-6">
                {matchedDrugs.map(drug => (
                  <div
                    key={drug.id}
                    className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{drug.name}</h3>
                        <p className="text-gray-600 mt-1">{drug.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-gray-700">{drug.rating}/5</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-gray-700">{drug.effectiveness}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Usage</h4>
                      <p className="text-gray-600">{drug.usage}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Conditions Treated</h4>
                        <div className="flex flex-wrap gap-2">
                          {drug.conditions.map((condition, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Symptoms Addressed</h4>
                        <div className="flex flex-wrap gap-2">
                          {drug.symptoms.map((symptom, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No medications found matching your {searchType}.</p>
                <p className="text-gray-400 mt-2">Try using different keywords or consult with a healthcare professional.</p>
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <Stethoscope className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Enter your {searchType} above to find relevant medications.</p>
              <p className="text-gray-400 mt-2">Example: {searchType === 'symptom' ? 'fever, cough, headache' : 'arthritis, allergies, bronchitis'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;