
const { MongoClient } = require('mongodb');
const bcrypt = require("bcryptjs");
const uri = process.env.MONGO_URL;
 const MedDB=new MongoClient(uri);
async function connectToDB() {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const db=
          [
            {
              "medicine_name": "Paracetamol",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 50
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 45
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 48
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 49
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 46
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 47
                }
              ]
            },
            {
              "medicine_name": "Amoxicillin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 100
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 95
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 98
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 99
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 96
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 97
                }
              ]
            },
            {
              "medicine_name": "Ibuprofen",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 60
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 58
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 59
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 57
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 56
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 55
                }
              ]
            },
            {
              "medicine_name": "Metformin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 120
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 115
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 118
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 117
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 116
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 119
                }
              ]
            },
            {
              "medicine_name": "Amlodipine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 80
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 78
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 79
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 77
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 76
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 75
                }
              ]
            },
            {
              "medicine_name": "Atorvastatin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 150
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 145
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 148
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 149
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 146
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 147
                }
              ]
            },
            {
              "medicine_name": "Losartan",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 90
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 88
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 89
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 87
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 86
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 85
                }
              ]
            },
            {
              "medicine_name": "Simvastatin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 110
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 108
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 109
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 107
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 106
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 105
                }
              ]
            },
            {
              "medicine_name": "Lisinopril",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 75
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 72
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 74
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 73
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 70
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 71
                }
              ]
            },
            {
              "medicine_name": "Omeprazole",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 85
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 83
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 84
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 82
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 81
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 80
                }
              ]
            },
            {
              "medicine_name": "Levothyroxine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 90
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 88
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 89
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 87
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 86
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 85
                }
              ]
            },
            {
              "medicine_name": "Clopidogrel",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 120
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 118
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 119
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 117
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 116
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 115
                }
              ]
            },
            {
              "medicine_name": "Montelukast",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 70
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 68
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 69
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 67
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 66
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 65
                }
              ]
            },
            {
              "medicine_name": "Sertraline",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 140
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 138
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 139
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 137
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 136
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 135
                }
              ]
            },
            {
              "medicine_name": "Alprazolam",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 100
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 98
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 99
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 97
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 96
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 95
                }
              ]
            },
            {
              "medicine_name": "Diazepam",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 150
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 148
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 149
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 147
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 146
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 145
                }
              ]
            },
            {
              "medicine_name": "Citalopram",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 130
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 128
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 129
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 127
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 126
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 125
                }
              ]
            },
            {
              "medicine_name": "Fluoxetine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 140
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 138
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 139
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 137
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 136
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 135
                }
              ]
            },
            {
              "medicine_name": "Warfarin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 150
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 148
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 149
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 147
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 146
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 145
                }
              ]
            },
            {
              "medicine_name": "Clonazepam",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 130
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 128
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 129
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 127
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 126
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 125
                }
              ]
            },
            {
              "medicine_name": "Gabapentin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 120
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 118
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 119
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 117
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 116
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 115
                }
              ]
            },
            {
              "medicine_name": "Pregabalin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 140
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 138
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 139
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 137
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 136
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 135
                }
              ]
            },
            {
              "medicine_name": "Aspirin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 60
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 58
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 59
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 57
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 56
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 55
                }
              ]
            },
            {
              "medicine_name": "Rosuvastatin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 160
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 158
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 159
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 157
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 156
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 155
                }
              ]
            },
            {
              "medicine_name": "Furosemide",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 70
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 68
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 69
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 67
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 66
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 65
                }
              ]
            },
            {
              "medicine_name": "Spironolactone",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 130
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 128
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 129
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 127
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 126
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 125
                }
              ]
            },
            {
              "medicine_name": "Baclofen",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 110
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 108
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 109
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 107
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 106
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 105
                }
              ]
            },
            {
              "medicine_name": "Cetirizine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 40
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 38
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 39
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 37
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 36
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 35
                }
              ]
            },
            {
              "medicine_name": "Azithromycin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 100
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 98
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 99
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 97
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 96
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 95
                }
              ]
            },
            {
              "medicine_name": "Ciprofloxacin",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 90
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 88
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 89
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 87
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 86
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 85
                }
              ]
            },
            {
              "medicine_name": "Doxycycline",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 80
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 78
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 79
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 77
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 76
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 75
                }
              ]
            },
            {
              "medicine_name": "Ranitidine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 50
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 48
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 49
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 47
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 46
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 45
                }
              ]
            },
            {
              "medicine_name": "Pantoprazole",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 120
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 118
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 119
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 117
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 116
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 115
                }
              ]
            },
            {
              "medicine_name": "Loperamide",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 30
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 28
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 29
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 27
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 26
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 25
                }
              ]
            },
            {
              "medicine_name": "Metronidazole",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 70
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 68
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 69
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 67
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 66
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 65
                }
              ]
            },
            {
              "medicine_name": "Naproxen",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 80
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 78
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 79
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 77
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 76
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 75
                }
              ]
            },
            {
              "medicine_name": "Prednisone",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 110
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 108
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 109
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 107
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 106
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 105
                }
              ]
            },
            {
              "medicine_name": "Risperidone",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 140
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 138
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 139
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 137
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 136
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 135
                }
              ]
            },
            {
              "medicine_name": "Valacyclovir",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 130
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 128
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 129
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 127
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 126
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 125
                }
              ]
            },
            {
              "medicine_name": "Tramadol",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 80
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 78
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 79
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 77
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 76
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 75
                }
              ]
            },
            {
              "medicine_name": "Fluticasone",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 90
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 88
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 89
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 87
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 86
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 85
                }
              ]
            },
            {
              "medicine_name": "Folic Acid",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 40
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 38
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 39
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 37
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 36
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 35
                }
              ]
            },
            {
              "medicine_name": "Clonidine",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 150
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 148
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 149
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 147
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 146
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 145
                }
              ]
            },
            {
              "medicine_name": "Propranolol",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 100
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 98
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 99
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 97
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 96
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 95
                }
              ]
            },
            {
              "medicine_name": "Dextromethorphan",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 50
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 48
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 49
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 47
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 46
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 45
                }
              ]
            },
            {
              "medicine_name": "Lisinopril",
              "pharmacies": [
                {
                  "pharmacy_name": "City Pharmacy",
                  "price": 70
                },
                {
                  "pharmacy_name": "Health Care Pharmacy",
                  "price": 68
                },
                {
                  "pharmacy_name": "Wellness Chemist",
                  "price": 69
                },
                {
                  "pharmacy_name": "Local Chemist Store",
                  "price": 67
                },
                {
                  "pharmacy_name": "Neighborhood Pharmacy",
                  "price": 66
                },
                {
                  "pharmacy_name": "Care and Cure Pharmacy",
                  "price": 65
                }
              ]
            }
          ]
        const USERCOLLECTION = DATABASE.collection('Doctors');
          
         
          
        await USERCOLLECTION.updateMany(
          {}, // Filter: empty filter to update all documents
          {
              $set: {
                  rating:0
              }
          }
      );
    }
    catch(error){
        console.log(error);
    }
    finally {
        await MedDB.close();
    }
}

connectToDB();