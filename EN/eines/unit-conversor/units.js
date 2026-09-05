const UnitConverter = {

    categories: {

        length: {
            name: "Length",
            base: "meter",
            units: {
                picometer: { name: "Picometer", symbol: "pm", factor: 1e-12 },
                nanometer: { name: "Nanometer", symbol: "nm", factor: 1e-9 },
                micrometer: { name: "Micrometer", symbol: "μm", factor: 1e-6 },
                millimeter: { name: "Millimeter", symbol: "mm", factor: 0.001 },
                centimeter: { name: "Centimeter", symbol: "cm", factor: 0.01 },
                decimeter: { name: "Decimeter", symbol: "dm", factor: 0.1 },
                meter: { name: "Meter", symbol: "m", factor: 1 },
                decameter: { name: "Decameter", symbol: "dam", factor: 10 },
                hectometer: { name: "Hectometer", symbol: "hm", factor: 100 },
                kilometer: { name: "Kilometer", symbol: "km", factor: 1000 },
                megameter: { name: "Megameter", symbol: "Mm", factor: 1000000 },
                gigameter: { name: "Gigameter", symbol: "Gm", factor: 1000000000 },
                angstrom: { name: "Ångström", symbol: "Å", factor: 1e-10 },
                inch: { name: "Inch", symbol: "in", factor: 0.0254 },
                foot: { name: "Foot", symbol: "ft", factor: 0.3048 },
                yard: { name: "Yard", symbol: "yd", factor: 0.9144 },
                mile: { name: "Mile", symbol: "mi", factor: 1609.344 },
                nauticalMile: { name: "Nautical Mile", symbol: "nmi", factor: 1852 },
                fathom: { name: "Fathom", symbol: "ftm", factor: 1.8288 },
                chain: { name: "Chain", symbol: "ch", factor: 20.1168 },
                rod: { name: "Rod", symbol: "rd", factor: 5.0292 },
                furlong: { name: "Furlong", symbol: "fur", factor: 201.168 },
                league: { name: "League", symbol: "lea", factor: 4828.032 },
                astronomicalUnit: { name: "Astronomical Unit", symbol: "AU", factor: 149597870700 },
                lightYear: { name: "Light Year", symbol: "ly", factor: 9460730472580800 },
                parsec: { name: "Parsec", symbol: "pc", factor: 30856775814913670 }
            }
        },

        area: {
            name: "Area",
            base: "squareMeter",
            units: {
                squareMillimeter: { name: "Square Millimeter", symbol: "mm²", factor: 0.000001 },
                squareCentimeter: { name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
                squareDecimeter: { name: "Square Decimeter", symbol: "dm²", factor: 0.01 },
                squareMeter: { name: "Square Meter", symbol: "m²", factor: 1 },
                squareKilometer: { name: "Square Kilometer", symbol: "km²", factor: 1000000 },
                hectare: { name: "Hectare", symbol: "ha", factor: 10000 },
                acre: { name: "Acre", symbol: "ac", factor: 4046.8564224 },
                squareInch: { name: "Square Inch", symbol: "in²", factor: 0.00064516 },
                squareFoot: { name: "Square Foot", symbol: "ft²", factor: 0.09290304 },
                squareYard: { name: "Square Yard", symbol: "yd²", factor: 0.83612736 },
                squareMile: { name: "Square Mile", symbol: "mi²", factor: 2589988.110336 },
                squareRod: { name: "Square Rod", symbol: "rd²", factor: 25.29285264 }
            }
        },

        volume: {
            name: "Volume",
            base: "liter",
            units: {
                microliter: { name: "Microliter", symbol: "μL", factor: 0.000001 },
                milliliter: { name: "Milliliter", symbol: "mL", factor: 0.001 },
                centiliter: { name: "Centiliter", symbol: "cL", factor: 0.01 },
                deciliter: { name: "Deciliter", symbol: "dL", factor: 0.1 },
                liter: { name: "Liter", symbol: "L", factor: 1 },
                cubicMeter: { name: "Cubic Meter", symbol: "m³", factor: 1000 },
                cubicCentimeter: { name: "Cubic Centimeter", symbol: "cm³", factor: 0.001 },
                cubicMillimeter: { name: "Cubic Millimeter", symbol: "mm³", factor: 0.000001 },
                teaspoon: { name: "Teaspoon", symbol: "tsp", factor: 0.00492892159375 },
                tablespoon: { name: "Tablespoon", symbol: "tbsp", factor: 0.01478676478125 },
                cup: { name: "Cup", symbol: "cup", factor: 0.2365882365 },
                pintUS: { name: "US Pint", symbol: "pt", factor: 0.473176473 },
                quartUS: { name: "US Quart", symbol: "qt", factor: 0.946352946 },
                gallonUS: { name: "US Gallon", symbol: "gal", factor: 3.785411784 },
                gallonUK: { name: "UK Gallon", symbol: "gal", factor: 4.54609 },
                cubicInch: { name: "Cubic Inch", symbol: "in³", factor: 0.016387064 },
                cubicFoot: { name: "Cubic Foot", symbol: "ft³", factor: 28.316846592 },
                cubicYard: { name: "Cubic Yard", symbol: "yd³", factor: 764.554857984 },
                oilBarrel: { name: "Oil Barrel", symbol: "bbl", factor: 158.987294928 }
            }
        },

        mass: {
            name: "Mass",
            base: "kilogram",
            units: {
                microgram: { name: "Microgram", symbol: "μg", factor: 0.000000001 },
                milligram: { name: "Milligram", symbol: "mg", factor: 0.000001 },
                gram: { name: "Gram", symbol: "g", factor: 0.001 },
                kilogram: { name: "Kilogram", symbol: "kg", factor: 1 },
                tonne: { name: "Metric Tonne", symbol: "t", factor: 1000 },
                ounce: { name: "Ounce", symbol: "oz", factor: 0.028349523125 },
                pound: { name: "Pound", symbol: "lb", factor: 0.45359237 },
                stone: { name: "Stone", symbol: "st", factor: 6.35029318 },
                grain: { name: "Grain", symbol: "gr", factor: 0.00006479891 },
                carat: { name: "Carat", symbol: "ct", factor: 0.0002 },
                slug: { name: "Slug", symbol: "slug", factor: 14.59390294 },
                shortTon: { name: "Short Ton", symbol: "ton", factor: 907.18474 },
                longTon: { name: "Long Ton", symbol: "LT", factor: 1016.0469088 },
                atomicMassUnit: { name: "Atomic Mass Unit", symbol: "u", factor: 1.6605390666e-27 }
            }
        },
                temperature: {
            name: "Temperature",
            base: "celsius",
            units: {
                celsius: {
                    name: "Celsius",
                    symbol: "°C",
                    toBase: value => value,
                    fromBase: value => value
                },
                fahrenheit: {
                    name: "Fahrenheit",
                    symbol: "°F",
                    toBase: value => (value - 32) * 5 / 9,
                    fromBase: value => value * 9 / 5 + 32
                },
                kelvin: {
                    name: "Kelvin",
                    symbol: "K",
                    toBase: value => value - 273.15,
                    fromBase: value => value + 273.15
                },
                rankine: {
                    name: "Rankine",
                    symbol: "°R",
                    toBase: value => (value - 491.67) * 5 / 9,
                    fromBase: value => (value + 273.15) * 9 / 5
                }
            }
        },

        time: {
            name: "Time",
            base: "second",
            units: {
                nanosecond: { name: "Nanosecond", symbol: "ns", factor: 1e-9 },
                microsecond: { name: "Microsecond", symbol: "μs", factor: 1e-6 },
                millisecond: { name: "Millisecond", symbol: "ms", factor: 0.001 },
                second: { name: "Second", symbol: "s", factor: 1 },
                minute: { name: "Minute", symbol: "min", factor: 60 },
                hour: { name: "Hour", symbol: "h", factor: 3600 },
                day: { name: "Day", symbol: "d", factor: 86400 },
                week: { name: "Week", symbol: "wk", factor: 604800 },
                fortnight: { name: "Fortnight", symbol: "fn", factor: 1209600 },
                month: { name: "Month", symbol: "mo", factor: 2629800 },
                year: { name: "Year", symbol: "yr", factor: 31557600 },
                leapYear: { name: "Leap Year", symbol: "ly", factor: 31622400 },
                decade: { name: "Decade", symbol: "dec", factor: 315576000 },
                century: { name: "Century", symbol: "c", factor: 3155760000 },
                millennium: { name: "Millennium", symbol: "mil", factor: 31557600000 }
            }
        },

        speed: {
            name: "Speed",
            base: "meterPerSecond",
            units: {
                meterPerSecond: { name: "Meter per Second", symbol: "m/s", factor: 1 },
                kilometerPerHour: { name: "Kilometer per Hour", symbol: "km/h", factor: 0.2777777778 },
                milePerHour: { name: "Mile per Hour", symbol: "mph", factor: 0.44704 },
                footPerSecond: { name: "Foot per Second", symbol: "ft/s", factor: 0.3048 },
                knot: { name: "Knot", symbol: "kn", factor: 0.5144444444 },
                mach: { name: "Mach", symbol: "Ma", factor: 340.29 },
                speedOfLight: { name: "Speed of Light", symbol: "c", factor: 299792458 }
            }
        },

        acceleration: {
            name: "Acceleration",
            base: "meterPerSecondSquared",
            units: {
                meterPerSecondSquared: { name: "Meter per Second²", symbol: "m/s²", factor: 1 },
                footPerSecondSquared: { name: "Foot per Second²", symbol: "ft/s²", factor: 0.3048 },
                gal: { name: "Gal", symbol: "Gal", factor: 0.01 },
                gravity: { name: "Standard Gravity", symbol: "g", factor: 9.80665 }
            }
        },

        angle: {
            name: "Angle",
            base: "radian",
            units: {
                radian: { name: "Radian", symbol: "rad", factor: 1 },
                degree: { name: "Degree", symbol: "°", factor: Math.PI / 180 },
                gradian: { name: "Gradian", symbol: "gon", factor: Math.PI / 200 },
                arcMinute: { name: "Arcminute", symbol: "'", factor: Math.PI / 10800 },
                arcSecond: { name: "Arcsecond", symbol: "\"", factor: Math.PI / 648000 },
                revolution: { name: "Revolution", symbol: "rev", factor: Math.PI * 2 }
            }
        },

        frequency: {
            name: "Frequency",
            base: "hertz",
            units: {
                microhertz: { name: "Microhertz", symbol: "μHz", factor: 1e-6 },
                millihertz: { name: "Millihertz", symbol: "mHz", factor: 0.001 },
                hertz: { name: "Hertz", symbol: "Hz", factor: 1 },
                kilohertz: { name: "Kilohertz", symbol: "kHz", factor: 1000 },
                megahertz: { name: "Megahertz", symbol: "MHz", factor: 1000000 },
                gigahertz: { name: "Gigahertz", symbol: "GHz", factor: 1000000000 },
                terahertz: { name: "Terahertz", symbol: "THz", factor: 1000000000000 },
                rpm: { name: "Revolutions per Minute", symbol: "RPM", factor: 1 / 60 }
            }
        },

        force: {
            name: "Force",
            base: "newton",
            units: {
                newton: { name: "Newton", symbol: "N", factor: 1 },
                kilonewton: { name: "Kilonewton", symbol: "kN", factor: 1000 },
                meganewton: { name: "Meganewton", symbol: "MN", factor: 1000000 },
                dyne: { name: "Dyne", symbol: "dyn", factor: 0.00001 },
                kilogramForce: { name: "Kilogram-force", symbol: "kgf", factor: 9.80665 },
                poundForce: { name: "Pound-force", symbol: "lbf", factor: 4.4482216152605 },
                ounceForce: { name: "Ounce-force", symbol: "ozf", factor: 0.278013851 }
            }
        },
                pressure: {
            name: "Pressure",
            base: "pascal",
            units: {
                micropascal: { name: "Micropascal", symbol: "μPa", factor: 1e-6 },
                millipascal: { name: "Millipascal", symbol: "mPa", factor: 0.001 },
                pascal: { name: "Pascal", symbol: "Pa", factor: 1 },
                hectopascal: { name: "Hectopascal", symbol: "hPa", factor: 100 },
                kilopascal: { name: "Kilopascal", symbol: "kPa", factor: 1000 },
                megapascal: { name: "Megapascal", symbol: "MPa", factor: 1000000 },
                gigapascal: { name: "Gigapascal", symbol: "GPa", factor: 1000000000 },
                bar: { name: "Bar", symbol: "bar", factor: 100000 },
                millibar: { name: "Millibar", symbol: "mbar", factor: 100 },
                atmosphere: { name: "Standard Atmosphere", symbol: "atm", factor: 101325 },
                technicalAtmosphere: { name: "Technical Atmosphere", symbol: "at", factor: 98066.5 },
                torr: { name: "Torr", symbol: "Torr", factor: 133.322368421 },
                mmHg: { name: "Millimeter of Mercury", symbol: "mmHg", factor: 133.322387415 },
                cmHg: { name: "Centimeter of Mercury", symbol: "cmHg", factor: 1333.22387415 },
                inchHg: { name: "Inch of Mercury", symbol: "inHg", factor: 3386.389 },
                psi: { name: "Pound per Square Inch", symbol: "psi", factor: 6894.757293168 },
                ksi: { name: "Kilopound per Square Inch", symbol: "ksi", factor: 6894757.293168 },
                psf: { name: "Pound per Square Foot", symbol: "psf", factor: 47.88025898 }
            }
        },

        energy: {
            name: "Energy",
            base: "joule",
            units: {
                microjoule: { name: "Microjoule", symbol: "μJ", factor: 1e-6 },
                millijoule: { name: "Millijoule", symbol: "mJ", factor: 0.001 },
                joule: { name: "Joule", symbol: "J", factor: 1 },
                kilojoule: { name: "Kilojoule", symbol: "kJ", factor: 1000 },
                megajoule: { name: "Megajoule", symbol: "MJ", factor: 1000000 },
                gigajoule: { name: "Gigajoule", symbol: "GJ", factor: 1000000000 },
                calorie: { name: "Calorie", symbol: "cal", factor: 4.184 },
                kilocalorie: { name: "Kilocalorie", symbol: "kcal", factor: 4184 },
                wattHour: { name: "Watt-hour", symbol: "Wh", factor: 3600 },
                kilowattHour: { name: "Kilowatt-hour", symbol: "kWh", factor: 3600000 },
                megawattHour: { name: "Megawatt-hour", symbol: "MWh", factor: 3600000000 },
                electronVolt: { name: "Electronvolt", symbol: "eV", factor: 1.602176634e-19 },
                britishThermalUnit: { name: "British Thermal Unit", symbol: "BTU", factor: 1055.05585262 },
                therm: { name: "Therm", symbol: "thm", factor: 105505585.257348 },
                erg: { name: "Erg", symbol: "erg", factor: 1e-7 }
            }
        },

        power: {
            name: "Power",
            base: "watt",
            units: {
                microwatt: { name: "Microwatt", symbol: "μW", factor: 1e-6 },
                milliwatt: { name: "Milliwatt", symbol: "mW", factor: 0.001 },
                watt: { name: "Watt", symbol: "W", factor: 1 },
                kilowatt: { name: "Kilowatt", symbol: "kW", factor: 1000 },
                megawatt: { name: "Megawatt", symbol: "MW", factor: 1000000 },
                gigawatt: { name: "Gigawatt", symbol: "GW", factor: 1000000000 },
                horsepowerMetric: { name: "Metric Horsepower", symbol: "PS", factor: 735.49875 },
                horsepowerMechanical: { name: "Mechanical Horsepower", symbol: "hp", factor: 745.699871582 },
                boilerHorsepower: { name: "Boiler Horsepower", symbol: "bhp", factor: 9810.657 },
                tonRefrigeration: { name: "Ton of Refrigeration", symbol: "TR", factor: 3516.852842 }
            }
        },

        electricCurrent: {
            name: "Electric Current",
            base: "ampere",
            units: {
                picoampere: { name: "Picoampere", symbol: "pA", factor: 1e-12 },
                nanoampere: { name: "Nanoampere", symbol: "nA", factor: 1e-9 },
                microampere: { name: "Microampere", symbol: "μA", factor: 1e-6 },
                milliampere: { name: "Milliampere", symbol: "mA", factor: 0.001 },
                ampere: { name: "Ampere", symbol: "A", factor: 1 },
                kiloampere: { name: "Kiloampere", symbol: "kA", factor: 1000 },
                megaampere: { name: "Megaampere", symbol: "MA", factor: 1000000 }
            }
        },

        voltage: {
            name: "Voltage",
            base: "volt",
            units: {
                microvolt: { name: "Microvolt", symbol: "μV", factor: 1e-6 },
                millivolt: { name: "Millivolt", symbol: "mV", factor: 0.001 },
                volt: { name: "Volt", symbol: "V", factor: 1 },
                kilovolt: { name: "Kilovolt", symbol: "kV", factor: 1000 },
                megavolt: { name: "Megavolt", symbol: "MV", factor: 1000000 },
                gigavolt: { name: "Gigavolt", symbol: "GV", factor: 1000000000 }
            }
        },
                resistance: {
            name: "Electrical Resistance",
            base: "ohm",
            units: {
                microohm: { name: "Microohm", symbol: "μΩ", factor: 1e-6 },
                milliohm: { name: "Milliohm", symbol: "mΩ", factor: 0.001 },
                ohm: { name: "Ohm", symbol: "Ω", factor: 1 },
                kiloohm: { name: "Kilohm", symbol: "kΩ", factor: 1000 },
                megaohm: { name: "Megohm", symbol: "MΩ", factor: 1000000 },
                gigaohm: { name: "Gigohm", symbol: "GΩ", factor: 1000000000 }
            }
        },

        conductance: {
            name: "Electrical Conductance",
            base: "siemens",
            units: {
                microsiemens: { name: "Microsiemens", symbol: "μS", factor: 1e-6 },
                millisiemens: { name: "Millisiemens", symbol: "mS", factor: 0.001 },
                siemens: { name: "Siemens", symbol: "S", factor: 1 },
                kilosiemens: { name: "Kilosiemens", symbol: "kS", factor: 1000 },
                megasiemens: { name: "Megasiemens", symbol: "MS", factor: 1000000 }
            }
        },

        capacitance: {
            name: "Capacitance",
            base: "farad",
            units: {
                picofarad: { name: "Picofarad", symbol: "pF", factor: 1e-12 },
                nanofarad: { name: "Nanofarad", symbol: "nF", factor: 1e-9 },
                microfarad: { name: "Microfarad", symbol: "μF", factor: 1e-6 },
                millifarad: { name: "Millifarad", symbol: "mF", factor: 0.001 },
                farad: { name: "Farad", symbol: "F", factor: 1 },
                kilofarad: { name: "Kilofarad", symbol: "kF", factor: 1000 }
            }
        },

        inductance: {
            name: "Inductance",
            base: "henry",
            units: {
                nanohenry: { name: "Nanohenry", symbol: "nH", factor: 1e-9 },
                microhenry: { name: "Microhenry", symbol: "μH", factor: 1e-6 },
                millihenry: { name: "Millihenry", symbol: "mH", factor: 0.001 },
                henry: { name: "Henry", symbol: "H", factor: 1 },
                kilohenry: { name: "Kilohenry", symbol: "kH", factor: 1000 }
            }
        },

        electricCharge: {
            name: "Electric Charge",
            base: "coulomb",
            units: {
                microcoulomb: { name: "Microcoulomb", symbol: "μC", factor: 1e-6 },
                millicoulomb: { name: "Millicoulomb", symbol: "mC", factor: 0.001 },
                coulomb: { name: "Coulomb", symbol: "C", factor: 1 },
                ampereHour: { name: "Ampere-hour", symbol: "Ah", factor: 3600 },
                milliampereHour: { name: "Milliampere-hour", symbol: "mAh", factor: 3.6 }
            }
        },

        magneticFlux: {
            name: "Magnetic Flux",
            base: "weber",
            units: {
                microweber: { name: "Microweber", symbol: "μWb", factor: 1e-6 },
                milliweber: { name: "Milliweber", symbol: "mWb", factor: 0.001 },
                weber: { name: "Weber", symbol: "Wb", factor: 1 },
                kiloweber: { name: "Kiloweber", symbol: "kWb", factor: 1000 },
                maxwell: { name: "Maxwell", symbol: "Mx", factor: 1e-8 }
            }
        },

        magneticFluxDensity: {
            name: "Magnetic Flux Density",
            base: "tesla",
            units: {
                microtesla: { name: "Microtesla", symbol: "μT", factor: 1e-6 },
                millitesla: { name: "Millitesla", symbol: "mT", factor: 0.001 },
                tesla: { name: "Tesla", symbol: "T", factor: 1 },
                gauss: { name: "Gauss", symbol: "G", factor: 0.0001 }
            }
        },

        electricFieldStrength: {
            name: "Electric Field Strength",
            base: "voltPerMeter",
            units: {
                voltPerMeter: { name: "Volt per Meter", symbol: "V/m", factor: 1 },
                kilovoltPerMeter: { name: "Kilovolt per Meter", symbol: "kV/m", factor: 1000 },
                megavoltPerMeter: { name: "Megavolt per Meter", symbol: "MV/m", factor: 1000000 }
            }
        },

        luminousFlux: {
            name: "Luminous Flux",
            base: "lumen",
            units: {
                lumen: { name: "Lumen", symbol: "lm", factor: 1 },
                kilolumen: { name: "Kilolumen", symbol: "klm", factor: 1000 },
                megalumen: { name: "Megalumen", symbol: "Mlm", factor: 1000000 }
            }
        },

        luminousIntensity: {
            name: "Luminous Intensity",
            base: "candela",
            units: {
                millicandela: { name: "Millicandela", symbol: "mcd", factor: 0.001 },
                candela: { name: "Candela", symbol: "cd", factor: 1 },
                kilocandela: { name: "Kilocandela", symbol: "kcd", factor: 1000 }
            }
        },

        illuminance: {
            name: "Illuminance",
            base: "lux",
            units: {
                lux: { name: "Lux", symbol: "lx", factor: 1 },
                kilolux: { name: "Kilolux", symbol: "klx", factor: 1000 },
                footCandle: { name: "Foot-candle", symbol: "fc", factor: 10.76391 }
            }
        },
                density: {
            name: "Density",
            base: "kilogramPerCubicMeter",
            units: {
                kilogramPerCubicMeter: { name: "Kilogram per Cubic Meter", symbol: "kg/m³", factor: 1 },
                gramPerCubicMeter: { name: "Gram per Cubic Meter", symbol: "g/m³", factor: 0.001 },
                gramPerCubicCentimeter: { name: "Gram per Cubic Centimeter", symbol: "g/cm³", factor: 1000 },
                gramPerMilliliter: { name: "Gram per Milliliter", symbol: "g/mL", factor: 1000 },
                kilogramPerLiter: { name: "Kilogram per Liter", symbol: "kg/L", factor: 1000 },
                poundPerCubicFoot: { name: "Pound per Cubic Foot", symbol: "lb/ft³", factor: 16.01846337 },
                poundPerCubicInch: { name: "Pound per Cubic Inch", symbol: "lb/in³", factor: 27679.90471 },
                ouncePerCubicInch: { name: "Ounce per Cubic Inch", symbol: "oz/in³", factor: 1729.994044 },
                ouncePerCubicFoot: { name: "Ounce per Cubic Foot", symbol: "oz/ft³", factor: 1.001153961 }
            }
        },

        specificVolume: {
            name: "Specific Volume",
            base: "cubicMeterPerKilogram",
            units: {
                cubicMeterPerKilogram: { name: "Cubic Meter per Kilogram", symbol: "m³/kg", factor: 1 },
                literPerKilogram: { name: "Liter per Kilogram", symbol: "L/kg", factor: 0.001 },
                cubicCentimeterPerGram: { name: "Cubic Centimeter per Gram", symbol: "cm³/g", factor: 0.001 },
                cubicFootPerPound: { name: "Cubic Foot per Pound", symbol: "ft³/lb", factor: 0.062427961 }
            }
        },

        flowRate: {
            name: "Flow Rate",
            base: "literPerSecond",
            units: {
                milliliterPerSecond: { name: "Milliliter per Second", symbol: "mL/s", factor: 0.001 },
                literPerSecond: { name: "Liter per Second", symbol: "L/s", factor: 1 },
                literPerMinute: { name: "Liter per Minute", symbol: "L/min", factor: 1 / 60 },
                literPerHour: { name: "Liter per Hour", symbol: "L/h", factor: 1 / 3600 },
                cubicMeterPerSecond: { name: "Cubic Meter per Second", symbol: "m³/s", factor: 1000 },
                cubicMeterPerMinute: { name: "Cubic Meter per Minute", symbol: "m³/min", factor: 1000 / 60 },
                cubicMeterPerHour: { name: "Cubic Meter per Hour", symbol: "m³/h", factor: 1000 / 3600 },
                gallonUSPerMinute: { name: "US Gallon per Minute", symbol: "GPM", factor: 3.785411784 / 60 },
                gallonUKPerMinute: { name: "UK Gallon per Minute", symbol: "GPM (UK)", factor: 4.54609 / 60 },
                cubicFootPerSecond: { name: "Cubic Foot per Second", symbol: "ft³/s", factor: 28.316846592 },
                cubicFootPerMinute: { name: "Cubic Foot per Minute", symbol: "CFM", factor: 28.316846592 / 60 }
            }
        },

        massFlowRate: {
            name: "Mass Flow Rate",
            base: "kilogramPerSecond",
            units: {
                gramPerSecond: { name: "Gram per Second", symbol: "g/s", factor: 0.001 },
                kilogramPerSecond: { name: "Kilogram per Second", symbol: "kg/s", factor: 1 },
                kilogramPerMinute: { name: "Kilogram per Minute", symbol: "kg/min", factor: 1 / 60 },
                kilogramPerHour: { name: "Kilogram per Hour", symbol: "kg/h", factor: 1 / 3600 },
                tonnePerHour: { name: "Tonne per Hour", symbol: "t/h", factor: 1000 / 3600 },
                poundPerSecond: { name: "Pound per Second", symbol: "lb/s", factor: 0.45359237 },
                poundPerMinute: { name: "Pound per Minute", symbol: "lb/min", factor: 0.45359237 / 60 }
            }
        },

        dynamicViscosity: {
            name: "Dynamic Viscosity",
            base: "pascalSecond",
            units: {
                micropascalSecond: { name: "Micropascal Second", symbol: "μPa·s", factor: 1e-6 },
                millipascalSecond: { name: "Millipascal Second", symbol: "mPa·s", factor: 0.001 },
                pascalSecond: { name: "Pascal Second", symbol: "Pa·s", factor: 1 },
                poise: { name: "Poise", symbol: "P", factor: 0.1 },
                centipoise: { name: "Centipoise", symbol: "cP", factor: 0.001 }
            }
        },

        kinematicViscosity: {
            name: "Kinematic Viscosity",
            base: "squareMeterPerSecond",
            units: {
                squareMeterPerSecond: { name: "Square Meter per Second", symbol: "m²/s", factor: 1 },
                stokes: { name: "Stokes", symbol: "St", factor: 0.0001 },
                centistokes: { name: "Centistokes", symbol: "cSt", factor: 0.000001 }
            }
        },

        torque: {
            name: "Torque",
            base: "newtonMeter",
            units: {
                newtonMeter: { name: "Newton Meter", symbol: "N·m", factor: 1 },
                kilonewtonMeter: { name: "Kilonewton Meter", symbol: "kN·m", factor: 1000 },
                poundFoot: { name: "Pound-foot", symbol: "lb·ft", factor: 1.3558179483314 },
                poundInch: { name: "Pound-inch", symbol: "lb·in", factor: 0.11298482902762 },
                ounceInch: { name: "Ounce-inch", symbol: "oz·in", factor: 0.007061551814226 }
            }
        },

        momentOfInertia: {
            name: "Moment of Inertia",
            base: "kilogramSquareMeter",
            units: {
                kilogramSquareMeter: { name: "Kilogram Square Meter", symbol: "kg·m²", factor: 1 },
                gramSquareCentimeter: { name: "Gram Square Centimeter", symbol: "g·cm²", factor: 1e-7 },
                poundSquareFoot: { name: "Pound Square Foot", symbol: "lb·ft²", factor: 0.0421401101 }
            }
        }
    }

};