const carDataset = {
    "Maruti Suzuki": {
        "Alto": {
            "variants": [
                { "name": "800 Std", "fuel": ["Petrol", "CNG"], "transmission": ["MT"], "body_type": "Hatchback", "years": "2012-2024", "engine_cc": 796, "seating": 4 },
                { "name": "800 LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT"], "body_type": "Hatchback", "years": "2012-2024", "engine_cc": 796, "seating": 4 },
                { "name": "800 VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT"], "body_type": "Hatchback", "years": "2012-2024", "engine_cc": 796, "seating": 4 },

                { "name": "K10 LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2022-2025", "engine_cc": 998, "seating": 5 },
                { "name": "K10 VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2022-2025", "engine_cc": 998, "seating": 5 },
                { "name": "K10 VXi+", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2022-2025", "engine_cc": 998, "seating": 5 }
            ]
        },

        "Swift": {
            "variants": [
                { "name": "LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "ZXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },

                { "name": "LDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "VDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "ZDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2020", "engine_cc": 1248, "seating": 5 }
            ]
        },

        "Dzire": {
            "variants": [
                { "name": "LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "ZXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2017-2025", "engine_cc": 1197, "seating": 5 },

                { "name": "LDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2010-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "VDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2010-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "ZDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact Sedan", "years": "2010-2020", "engine_cc": 1248, "seating": 5 }
            ]
        },

        "Baleno": {
            "variants": [
                { "name": "Sigma", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT", "CVT"], "body_type": "Premium Hatchback", "years": "2015-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Delta", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT", "CVT"], "body_type": "Premium Hatchback", "years": "2015-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Zeta", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT", "CVT"], "body_type": "Premium Hatchback", "years": "2015-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Alpha", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT", "CVT"], "body_type": "Premium Hatchback", "years": "2015-2025", "engine_cc": 1197, "seating": 5 }
            ]
        },

        "Wagon R": {
            "variants": [
                { "name": "LXi 1.0", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2025", "engine_cc": 998, "seating": 5 },
                { "name": "VXi 1.0", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2025", "engine_cc": 998, "seating": 5 },
                { "name": "ZXi 1.0", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2025", "engine_cc": 998, "seating": 5 },

                { "name": "VXi 1.2", "fuel": ["Petrol"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "ZXi 1.2", "fuel": ["Petrol"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2010-2025", "engine_cc": 1197, "seating": 5 }
            ]
        },

        "Ertiga": {
            "variants": [
                { "name": "LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2012-2025", "engine_cc_petrol": 1462, "engine_cc_diesel": 1248, "seating": 7 },
                { "name": "VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2012-2025", "engine_cc_petrol": 1462, "engine_cc_diesel": 1248, "seating": 7 },
                { "name": "ZXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2012-2025", "engine_cc_petrol": 1462, "engine_cc_diesel": 1248, "seating": 7 }
            ]
        },

        "Brezza": {
            "variants": [
                { "name": "LXi (Petrol)", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "Compact SUV", "years": "2022-2025", "engine_cc": 1462, "seating": 5 },
                { "name": "VXi (Petrol)", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "Compact SUV", "years": "2022-2025", "engine_cc": 1462, "seating": 5 },
                { "name": "ZXi (Petrol)", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AT"], "body_type": "Compact SUV", "years": "2022-2025", "engine_cc": 1462, "seating": 5 },

                { "name": "LDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact SUV", "years": "2016-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "VDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact SUV", "years": "2016-2020", "engine_cc": 1248, "seating": 5 },
                { "name": "ZDi", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact SUV", "years": "2016-2020", "engine_cc": 1248, "seating": 5 }
            ]
        },

        "Celerio": {
            "variants": [
                { "name": "LXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2014-2025", "engine_cc": 998, "seating": 5 },
                { "name": "VXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2014-2025", "engine_cc": 998, "seating": 5 },
                { "name": "ZXi", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2014-2025", "engine_cc": 998, "seating": 5 }
            ]
        }
    },


    "Hyundai": {
        "i10 Grand / Grand i10 Nios": {
            "variants": [
                { "name": "Era", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2013-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Magna", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2013-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Sportz", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2013-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Asta", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2013-2025", "engine_cc": 1197, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2013-2020", "engine_cc": 1186, "seating": 5 }
            ]
        },

        "i20 Elite/i20": {
            "variants": [
                { "name": "Era", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Premium Hatchback", "years": "2014-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Magna", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Premium Hatchback", "years": "2014-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Sportz", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Premium Hatchback", "years": "2014-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "Asta", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Premium Hatchback", "years": "2014-2025", "engine_cc": 1197, "seating": 5 },

                { "name": "Turbo DCT", "fuel": ["Turbo Petrol"], "transmission": ["DCT"], "body_type": "Premium Hatchback", "years": "2020-2025", "engine_cc": 998, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "Premium Hatchback", "years": "2014-2022", "engine_cc": 1493, "seating": 5 }
            ]
        },

        "Creta": {
            "variants": [
                { "name": "E (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "EX (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "S (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "SX (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1497, "seating": 5 },

                { "name": "E (Diesel)", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "EX (Diesel)", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "S (Diesel)", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "SX (Diesel)", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2015-2025", "engine_cc": 1493, "seating": 5 },

                { "name": "Turbo Petrol DCT", "fuel": ["Turbo Petrol"], "transmission": ["DCT"], "body_type": "SUV", "years": "2020-2025", "engine_cc": 1482, "seating": 5 }
            ]
        },

        "Verna": {
            "variants": [
                { "name": "E (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Sedan", "years": "2017-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "S (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Sedan", "years": "2017-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "V (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Sedan", "years": "2017-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "VX (Petrol)", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "Sedan", "years": "2017-2025", "engine_cc": 1497, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "Sedan", "years": "2017-2023", "engine_cc": 1493, "seating": 5 }
            ]
        },

        "Venue": {
            "variants": [
                { "name": "E (Petrol)", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "S (Petrol)", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 1197, "seating": 5 },
                { "name": "SX (Petrol)", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 1197, "seating": 5 },

                { "name": "Turbo Petrol iMT", "fuel": ["Turbo Petrol"], "transmission": ["iMT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 998, "seating": 5 },
                { "name": "Turbo Petrol DCT", "fuel": ["Turbo Petrol"], "transmission": ["DCT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 998, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2019-2025", "engine_cc": 1493, "seating": 5 }
            ]
        }
    },


    "Tata": {
        "Nexon": {
            "variants": [
                { "name": "Petrol", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT", "AT"], "body_type": "Compact SUV", "years": "2017-2025", "engine_cc_petrol": 1199, "seating": 5 },
                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AMT"], "body_type": "Compact SUV", "years": "2017-2025", "engine_cc_diesel": 1497, "seating": 5 }
            ]
        },
        "Punch": {
            "variants": [
                { "name": "Pure", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Micro SUV", "years": "2021-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "Adventure", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Micro SUV", "years": "2021-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "Accomplished", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Micro SUV", "years": "2021-2025", "engine_cc": 1199, "seating": 5 }
            ]
        },
        "Tiago": {
            "variants": [
                { "name": "XB", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2016-2025", "engine_cc_petrol": 1199, "seating": 5 },
                { "name": "XE", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2016-2025", "engine_cc_petrol": 1199, "seating": 5 },
                { "name": "XM", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2016-2025", "engine_cc_petrol": 1199, "seating": 5 },
                { "name": "XT", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2016-2025", "engine_cc_petrol": 1199, "seating": 5 },
                { "name": "XZ", "fuel": ["Petrol", "CNG"], "transmission": ["MT", "AMT"], "body_type": "Hatchback", "years": "2016-2025", "engine_cc_petrol": 1199, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "Hatchback", "years": "2016-2020", "engine_cc_diesel": 1047, "seating": 5 }
            ]
        }
    },

    "Mahindra": {
        "Scorpio": {
            "variants": [
                { "name": "S3 Classic", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "SUV", "years": "2014-2025", "engine_cc": 2179, "seating": 7 },
                { "name": "S5 Classic", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "SUV", "years": "2014-2025", "engine_cc": 2179, "seating": 7 },
                { "name": "S7 Classic", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "SUV", "years": "2014-2025", "engine_cc": 2179, "seating": 7 },
                { "name": "S9 Classic", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "SUV", "years": "2014-2025", "engine_cc": 2179, "seating": 7 },
                { "name": "S11 Classic", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "SUV", "years": "2014-2025", "engine_cc": 2179, "seating": 7 },

                { "name": "Scorpio N Z2 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_petrol": 1997, "seating": 6 },
                { "name": "Scorpio N Z2 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_diesel": 2184, "seating": 6 },
                { "name": "Scorpio N Z4 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_petrol": 1997, "seating": 6 },
                { "name": "Scorpio N Z4 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_diesel": 2184, "seating": 6 },
                { "name": "Scorpio N Z6 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_petrol": 1997, "seating": 6 },
                { "name": "Scorpio N Z6 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_diesel": 2184, "seating": 6 },
                { "name": "Scorpio N Z8 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_petrol": 1997, "seating": 6 },
                { "name": "Scorpio N Z8 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2022-2025", "engine_cc_diesel": 2184, "seating": 6 }
            ]
        },
        "XUV700": {
            "variants": [
                { "name": "MX Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_petrol": 1997, "seating": 7 },
                { "name": "AX3 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_petrol": 1997, "seating": 7 },
                { "name": "AX5 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_petrol": 1997, "seating": 7 },
                { "name": "AX7 Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_petrol": 1997, "seating": 7 },

                { "name": "MX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_diesel": 2184, "seating": 7 },
                { "name": "AX3 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_diesel": 2184, "seating": 7 },
                { "name": "AX5 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_diesel": 2184, "seating": 7 },
                { "name": "AX7 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2021-2025", "engine_cc_diesel": 2184, "seating": 7 }
            ]
        },
        "Thar": {
            "variants": [
                { "name": "AX Opt Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "Off-Road SUV", "years": "2020-2025", "engine_cc_petrol": 1997, "seating": 4 },
                { "name": "AX Opt Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "Off-Road SUV", "years": "2020-2025", "engine_cc_diesel": 2184, "seating": 4 },
                { "name": "LX Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "Off-Road SUV", "years": "2020-2025", "engine_cc_petrol": 1997, "seating": 4 },
                { "name": "LX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "Off-Road SUV", "years": "2020-2025", "engine_cc_diesel": 2184, "seating": 4 }
            ]
        }
    },


    "Honda": {
        "City": {
            "variants": [
                { "name": "E", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Sedan", "years": "2014-2025", "engine_cc": 1498, "seating": 5 },
                { "name": "S", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Sedan", "years": "2014-2025", "engine_cc": 1498, "seating": 5 },
                { "name": "V", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Sedan", "years": "2014-2025", "engine_cc": 1498, "seating": 5 },
                { "name": "VX", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Sedan", "years": "2014-2025", "engine_cc": 1498, "seating": 5 },
                { "name": "ZX", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Sedan", "years": "2014-2025", "engine_cc": 1498, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "Sedan", "years": "2014-2020", "engine_cc": 1498, "seating": 5 }
            ]
        },
        "Amaze": {
            "variants": [
                { "name": "E", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Compact Sedan", "years": "2013-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "S", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Compact Sedan", "years": "2013-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "V", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Compact Sedan", "years": "2013-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "VX", "fuel": ["Petrol"], "transmission": ["MT", "CVT"], "body_type": "Compact Sedan", "years": "2013-2025", "engine_cc": 1199, "seating": 5 },

                { "name": "Diesel", "fuel": ["Diesel"], "transmission": ["MT", "CVT"], "body_type": "Compact Sedan", "years": "2013-2022", "engine_cc": 1498, "seating": 5 }
            ]
        }
    },

    "Toyota": {
        "Fortuner": {
            "variants": [
                { "name": "4x2 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2016-2025", "engine_cc": 2755, "seating": 7 },
                { "name": "4x4 Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2016-2025", "engine_cc": 2755, "seating": 7 },
                { "name": "Petrol", "fuel": ["Petrol"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2016-2022", "engine_cc": 2694, "seating": 7 }
            ]
        },
        "Innova Crysta": {
            "variants": [
                { "name": "GX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2016-2025", "engine_cc": 2393, "seating": 8 },
                { "name": "VX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2016-2025", "engine_cc": 2393, "seating": 8 },
                { "name": "ZX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "MUV", "years": "2016-2025", "engine_cc": 2393, "seating": 7 }
            ]
        },
        "Hycross":{
            "variants":[
                { "name": "Hycross Hybrid", "fuel": ["Hybrid"], "transmission": ["CVT"], "body_type": "MUV", "years": "2023-2025", "engine_cc": 1987, "seating": 8 },
                { "name": "Hycross Petrol", "fuel": ["Petrol"], "transmission": ["CVT"], "body_type": "MUV", "years": "2023-2025", "engine_cc": 1987, "seating": 8 }
            ]
        }
    },


    "Kia": {
        "Seltos": {
            "variants": [
                { "name": "HTE Petrol", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "HTK Petrol", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1497, "seating": 5 },
                { "name": "HTX Petrol", "fuel": ["Petrol"], "transmission": ["MT", "IVT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1497, "seating": 5 },

                { "name": "HTE Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "HTK Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "HTX Diesel", "fuel": ["Diesel"], "transmission": ["MT", "AT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1493, "seating": 5 },

                { "name": "GTX Turbo Petrol iMT", "fuel": ["Turbo Petrol"], "transmission": ["iMT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1482, "seating": 5 },
                { "name": "X-Line Turbo Petrol DCT", "fuel": ["Turbo Petrol"], "transmission": ["DCT"], "body_type": "SUV", "years": "2019-2025", "engine_cc": 1482, "seating": 5 }
            ]
        },
        "Sonet": {
            "variants": [
                { "name": "HTE Petrol", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "HTK Petrol", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 1199, "seating": 5 },
                { "name": "HTX Petrol", "fuel": ["Petrol"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 1199, "seating": 5 },

                { "name": "Turbo Petrol iMT", "fuel": ["Turbo Petrol"], "transmission": ["iMT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 998, "seating": 5 },
                { "name": "Turbo Petrol DCT", "fuel": ["Turbo Petrol"], "transmission": ["DCT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 998, "seating": 5 },

                { "name": "Diesel MT", "fuel": ["Diesel"], "transmission": ["MT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 1493, "seating": 5 },
                { "name": "Diesel AT", "fuel": ["Diesel"], "transmission": ["AT"], "body_type": "Compact SUV", "years": "2020-2025", "engine_cc": 1493, "seating": 5 }
            ]
        }
    }

}

export default carDataset