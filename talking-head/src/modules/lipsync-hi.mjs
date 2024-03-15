class LipsyncHi {

    constructor() {
      // Define rules for converting Hindi characters to visemes
      this.rules = {
        'अ': [{ regex: /अ/, visemes: ['aa'], move: 1 }],
        'आ': [{ regex: /आ/, visemes: ['aa'], move: 1 }],
        'इ': [{ regex: /इ/, visemes: ['ii'], move: 1 }],
        'ई': [{ regex: /ई/, visemes: ['ii'], move: 1 }],
        'उ': [{ regex: /उ/, visemes: ['uu'], move: 1 }],
        'ऊ': [{ regex: /ऊ/, visemes: ['uu'], move: 1 }],
        'ए': [{ regex: /ए/, visemes: ['ee'], move: 1 }],
        'ऐ': [{ regex: /ऐ/, visemes: ['ai'], move: 1 }],
        'ओ': [{ regex: /ओ/, visemes: ['oo'], move: 1 }],
        'औ': [{ regex: /औ/, visemes: ['au'], move: 1 }],
        'ऋ': [{ regex: /ऋ/, visemes: ['ri'], move: 1 }],
        'एं': [{ regex: /एं/, visemes: ['ang'], move: 2 }],
        'अः': [{ regex: /अः/, visemes: ['ah'], move: 2 }],
        'क': [{ regex: /क/, visemes: ['ka'], move: 1 }],
        'ख': [{ regex: /ख/, visemes: ['kha'], move: 1 }],
        'ग': [{ regex: /ग/, visemes: ['ga'], move: 1 }],
        'घ': [{ regex: /घ/, visemes: ['gha'], move: 1 }],
        'ङ': [{ regex: /ङ/, visemes: ['nga'], move: 1 }],
        'च': [{ regex: /च/, visemes: ['cha'], move: 1 }],
        'छ': [{ regex: /छ/, visemes: ['chha'], move: 1 }],
        'ज': [{ regex: /ज/, visemes: ['ja'], move: 1 }],
        'झ': [{ regex: /झ/, visemes: ['jha'], move: 1 }],
        'ञ': [{ regex: /ञ/, visemes: ['nya'], move: 1 }],
        'ट': [{ regex: /ट/, visemes: ['ta'], move: 1 }],
        'ठ': [{ regex: /ठ/, visemes: ['tha'], move: 1 }],
        'ड': [{ regex: /ड/, visemes: ['da'], move: 1 }],
        'ढ': [{ regex: /ढ/, visemes: ['dha'], move: 1 }],
        'ण': [{ regex: /ण/, visemes: ['na'], move: 1 }],
        'त': [{ regex: /त/, visemes: ['ta'], move: 1 }],
        'थ': [{ regex: /थ/, visemes: ['tha'], move: 1 }],
        'द': [{ regex: /द/, visemes: ['da'], move: 1 }],
        'ध': [{ regex: /ध/, visemes: ['dha'], move: 1 }],
        'न': [{ regex: /न/, visemes: ['na'], move: 1 }],
        'प': [{ regex: /प/, visemes: ['pa'], move: 1 }],
        'फ': [{ regex: /फ/, visemes: ['pha'], move: 1 }],
        'ब': [{ regex: /ब/, visemes: ['ba'], move: 1 }],
        'भ': [{ regex: /भ/, visemes: ['bha'], move: 1 }],
        'म': [{ regex: /म/, visemes: ['ma'], move: 1 }],
        'य': [{ regex: /य/, visemes: ['ya'], move: 1 }],
        'र': [{ regex: /र/, visemes: ['ra'], move: 1 }],
        'ल': [{ regex: /ल/, visemes: ['la'], move: 1 }],
        'व': [{ regex: /व/, visemes: ['va'], move: 1 }],
        'श': [{ regex: /श/, visemes: ['sha'], move: 1 }],
        'ष': [{ regex: /ष/, visemes: ['ssa'], move: 1 }],
        'स': [{ regex: /स/, visemes: ['sa'], move: 1 }],
        'ह': [{ regex: /ह/, visemes: ['ha'], move: 1 }],
        'क्ष': [{ regex: /क्ष/, visemes: ['ksha'], move: 2 }],
        'त्र': [{ regex: /त्र/, visemes: ['tra'], move: 2 }],
        'ज्ञ': [{ regex: /ज्ञ/, visemes: ['gya'], move: 2 }],
        '०': [{ regex: /०/, visemes: ['shunya'], move: 1 }], // ० represents zero
        '१': [{ regex: /१/, visemes: ['ek'], move: 1 }], // १ represents one
        '२': [{ regex: /२/, visemes: ['do'], move: 1 }], // २ represents two
        '३': [{ regex: /३/, visemes: ['teen'], move: 1 }], // ३ represents three
        '४': [{ regex: /४/, visemes: ['chaar'], move: 1 }], // ४ represents four
        '५': [{ regex: /५/, visemes: ['paanch'], move: 1 }], // ५ represents five
        '६': [{ regex: /६/, visemes: ['chhah'], move: 1 }], // ६ represents six
        '७': [{ regex: /७/, visemes: ['saat'], move: 1 }], // ७ represents seven
        '८': [{ regex: /८/, visemes: ['aath'], move: 1 }], // ८ represents eight
        '९': [{ regex: /९/, visemes: ['nau'], move: 1 }], // ९ represents nine
        'ा': [{ regex: /ा/, visemes: ['aa'], move: 1 }],     // ा (Aa)
    'ि': [{ regex: /ि/, visemes: ['ii'], move: 1 }],     // ि (I)
    'ी': [{ regex: /ी/, visemes: ['ii'], move: 1 }],     // ी (Ee)
    'ु': [{ regex: /ु/, visemes: ['uu'], move: 1 }],     // ु (U)
    'ू': [{ regex: /ू/, visemes: ['uu'], move: 1 }],     // ू (Oo)
    'े': [{ regex: /े/, visemes: ['ee'], move: 1 }],     // े (E)
    'ै': [{ regex: /ै/, visemes: ['ai'], move: 1 }],     // ै (Ai)
    'ो': [{ regex: /ो/, visemes: ['oo'], move: 1 }],     // ो (O)
    'ौ': [{ regex: /ौ/, visemes: ['au'], move: 1 }]      // ौ (Au)
    };
  
      // Define viseme durations for Hindi
      this.visemeDurations = {
        'aa': 0.95,   // Viseme duration for 'aa'
        'ii': 0.90,   // Viseme duration for 'ii'
        'uu': 0.96,   // Viseme duration for 'uu'
        'ee': 0.92,   // Viseme duration for 'ee'
        'oo': 0.98,   // Viseme duration for 'oo'
        'ai': 0.94,   // Viseme duration for 'ai'
        'au': 0.97,   // Viseme duration for 'au'
        'ka': 0.91,   // Viseme duration for 'ka'
        'kha': 0.92,  // Viseme duration for 'kha'
        'ga': 0.93,   // Viseme duration for 'ga'
        'gha': 0.94,  // Viseme duration for 'gha'
        'cha': 0.91,  // Viseme duration for 'cha'
        'chha': 0.92, // Viseme duration for 'chha'
        'ja': 0.93,   // Viseme duration for 'ja'
        'jha': 0.94,  // Viseme duration for 'jha'
        'ta': 0.91,   // Viseme duration for 'ta'
        'tha': 0.92,  // Viseme duration for 'tha'
        'da': 0.93,   // Viseme duration for 'da'
        'dha': 0.94,  // Viseme duration for 'dha'
        'na': 0.95,   // Viseme duration for 'na'
        'pa': 0.92,   // Viseme duration for 'pa'
        'pha': 0.93,  // Viseme duration for 'pha'
        'ba': 0.94,   // Viseme duration for 'ba'
        'bha': 0.95,  // Viseme duration for 'bha'
        'ma': 0.96,   // Viseme duration for 'ma'
        'ya': 0.92,   // Viseme duration for 'ya'
        'ra': 0.93,   // Viseme duration for 'ra'
        'la': 0.94,   // Viseme duration for 'la'
        'va': 0.95,   // Viseme duration for 'va'
        'sha': 0.92,  // Viseme duration for 'sha'
        'ssa': 0.93,  // Viseme duration for 'ssa'
        'sa': 0.94,   // Viseme duration for 'sa'
        'ha': 0.95,   // Viseme duration for 'ha'
        'ksha': 0.96, // Viseme duration for 'ksha'
        'tra': 0.97,  // Viseme duration for 'tra'
        'gya': 0.98,  // Viseme duration for 'gya'
        'shunya': 0.99,  // Viseme duration for 'shunya'
        'ek': 1.00,   // Viseme duration for 'ek'
        'do': 1.01,   // Viseme duration for 'do'
        'teen': 1.02, // Viseme duration for 'teen'
        'chaar': 1.03,  // Viseme duration for 'chaar'
        'paanch': 1.04, // Viseme duration for 'paanch'
        'chhah': 1.05,  // Viseme duration for 'chhah'
        'saat': 1.06,   // Viseme duration for 'saat'
        'aath': 1.07,   // Viseme duration for 'aath'
        'nau': 1.08    // Viseme duration for 'nau'
    };
  
      // Define special durations for pauses and other symbols
      this.specialDurations = {
        ' ': 1,
        ',': 3,
        '-': 0.5,
        // Define durations for other symbols...
      };
  
      // Define Hindi number words
      this.digits = ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ'];
      this.ones = ['','एक','दो','तीन','चार','पांच','छह','सात','आठ','नौ'];
      this.tens = ['','','बीस','तीस','चालीस','पचास','साठ','सत्तर','अस्सी','नब्बे'];
      this.teens = ['दस','ग्यारह','बारह','तेरह','चौदह','पंद्रह','सोलह','सत्रह','अट्ठारह','नौतीन'];
    }
  
    // Function to convert digits into Hindi words
    convert_digit_by_digit(num) {
      num = String(num).split("");
      var numWords = "";
      for(let m=0; m<num.length; m++) {
        numWords += this.digits[num[m]] + " ";
      }
      numWords = numWords.substring(0, numWords.length - 1); // Remove the final space
      return numWords;
    }
  
    // Function to convert sets of two digits into Hindi words
    convert_sets_of_two(num) {
      var firstNumHalf = String(num).substring(0, 2);
      var secondNumHalf = String(num).substring(2, 4);
      var numWords = this.convert_tens(firstNumHalf);
      numWords += " " + this.convert_tens(secondNumHalf);
      return numWords;
    }
  
    // Function to convert millions into Hindi words
    convert_millions(num){
      if (num>=1000000){
        return this.convert_millions(Math.floor(num/1000000))+" करोड़ "+this.convert_thousands(num%1000000);
      }
      else {
        return this.convert_thousands(num);
      }
    }
  
    // Function to convert thousands into Hindi words
    convert_thousands(num){
      if (num>=1000){
        return this.convert_hundreds(Math.floor(num/1000))+" हजार "+this.convert_hundreds(num%1000);
      }
      else{
        return this.convert_hundreds(num);
      }
    }
  
    // Function to convert hundreds into Hindi words
    convert_hundreds(num){
      if (num>99){
        return this.ones[Math.floor(num/100)]+" सौ "+this.convert_tens(num%100);
      }
      else{
        return this.convert_tens(num);
      }
    }
  
    // Function to convert tens into Hindi words
    convert_tens(num){
      if (num<10) return this.ones[num];
      else if (num>=10 && num<20) return this.teens[num-10];
      else{
        return this.tens[Math.floor(num/10)]+" "+this.ones[num%10];
      }
    }
  
    // Function to convert a number into Hindi words
    convertNumberToWords(num){
      if (num===0) {
        return "शून्य";
      } else if ((num<1000&&num>99)||(num>10000&&num<1000000)) { //read area and zip codes digit by digit
        return this.convert_digit_by_digit(num);
      } else if ((num > 1000 && num < 2000)||(num>2009&&num<3000)) { //read years as two sets of two digits
        return this.convert_sets_of_two(num);
      } else {
        return this.convert_millions(num);
      }
    }
  
    // Function to preprocess Hindi text
    preProcessText(s) {
      return s.replace(/[#_*'":;]/g,'')
              .replaceAll('  ',' ')
              .replaceAll('।','')
              .replace(/\d+/g, this.convertNumberToWords.bind(this))
              .trim();
    }
  
    // Function to convert words to visemes
    wordsToVisemes(w) {
      let o = { words: w.toUpperCase(), visemes: [], times: [], durations: [], i:0 };
      let t = 0;
  
      const chars = [...o.words];
      while( o.i < chars.length ) {
          const c = chars[o.i];
          const ruleset = this.rules[c];
          if ( ruleset ) {
              for(let i=0; i<ruleset.length; i++) {
                  const rule = ruleset[i];
                  const test = o.words.substring(0, o.i) + c.toLowerCase() + o.words.substring(o.i+1);
                  let matches = test.match(rule.regex);
                  if ( matches ) {
                      rule.visemes.forEach( viseme => {
                          if ( o.visemes.length && o.visemes[ o.visemes.length - 1 ] === viseme ) {
                              const d = 0.7 * (this.visemeDurations[viseme] || 1);
                              o.durations[ o.durations.length - 1 ] += d;
                              t += d;
                          } else {
                              const d = this.visemeDurations[viseme] || 1;
                              o.visemes.push( viseme );
                              o.times.push(t);
                              o.durations.push( d );
                              t += d;
                          }
                      })
                      o.i += rule.move;
                      break;
                  }
              }
          } else {
              o.i++;
              t += this.specialDurations[c] || 0;
          }
      }
  
      return o;
    }
  }
  
  export { LipsyncHi };
  