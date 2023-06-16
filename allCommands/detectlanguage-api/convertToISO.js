import { config } from 'dotenv';
import DetectLanguage from 'detectlanguage';

config();
const API_KEY = process.env.DetectLanguage_API_KEY;

const detectlanguage = new DetectLanguage(API_KEY);
let conversionList;


// initialising Language to ISO code conversion list
async function initialiseConversionList(){
    detectlanguage.languages().then((result) => {
        const str = JSON.stringify(result).toLowerCase();
        conversionList = JSON.parse(str);
    });
}

// check if the inputted language is valid or not
function isValidLanguage(language){
    for(let {name, code} of conversionList){
        // console.log(`${name} - ${code}`);
        if(language === name || language === code) return code;
    };
    return false;
}

export { initialiseConversionList, isValidLanguage };