class LipsyncHi {

  constructor() {
    this.visemes = {
      'अ': 'A', 'आ': 'AA', 'इ': 'I', 'ई': 'I', 'उ': 'U', 'ऊ': 'UU', 'ऋ': 'RR',
      'ए': 'E', 'ऐ': 'E', 'ओ': 'O', 'औ': 'O', 'अं': 'A', 'आं': 'AA', 'इं': 'I',
      'ईं': 'I', 'उं': 'U', 'ऊं': 'UU', 'एं': 'E', 'ऐं': 'E', 'ओं': 'O', 'औं': 'O',
      'आः': 'AA', 'एः': 'E', 'ओः': 'O', 'आःं': 'AA', 'एःं': 'E', 'ओःं': 'O',
      'क': 'K', 'ख': 'K', 'ग': 'G', 'घ': 'G', 'ङ': 'G', 'च': 'CH', 'छ': 'CH', 
      'ज': 'J', 'झ': 'J', 'ञ': 'J', 'ट': 'T', 'ठ': 'T', 'ड': 'D', 'ढ': 'D',
      'ण': 'D', 'त': 'T', 'थ': 'T', 'द': 'D', 'ध': 'D', 'न': 'N', 'प': 'P',
      'फ': 'P', 'ब': 'B', 'भ': 'B', 'म': 'M', 'य': 'Y', 'र': 'R', 'ल': 'L', 
      'व': 'V', 'श': 'SH', 'ष': 'SH', 'स': 'S', 'ह': 'H', 'क्ष': 'KSH', 
      'त्र': 'TR', '्': 'halant', 'ै': 'AI', 'ो': 'O', 'ू': 'UU', 'ु': 'U',
      'ी': 'I', 'ा': 'AA', 'े': 'E', 'ि': 'I', 'ॉ': 'O', 'ौ': 'O', 'ृ': 'RR',
      '़': 'nuqta', '॒': 'lowAnusvar', '॑': 'highAnusvar', 'ॆ': 'E'
    };

    this.visemeDurations = {
      'A': 0.95, 'AA': 0.95, 'I': 0.92, 'U': 0.95, 'UU': 0.95, 'RR': 0.88,
      'E': 0.90, 'O': 0.96, 'K': 1.21, 'G': 1.21, 'CH': 1.23, 'J': 1.05,
      'T': 1.05, 'D': 1.05, 'N': 0.88, 'P': 1.08, 'B': 1.08, 'M': 1.08,
      'Y': 1, 'R': 0.88, 'L': 0.88, 'V': 1, 'SH': 1.23, 'S': 1.23, 'H': 1.23,
      'KSH': 1.23, 'TR': 1.05, 'halant': 0.5, 'AI': 0.95, 'nuqta': 0.5,
      'lowAnusvar': 0.5, 'highAnusvar': 0.5
    };

    this.specialDurations = { ' ': 1, ',': 3, '-': 0.5 };
  }

  preProcessText(s) {
    return s.replace(/[#_*'\":;]/g,'')
            .replace('%', ' प्रतिशत ')
            .replace('€', ' यूरो ')
            .replace('&', ' और ')
            .replace('+', ' प्लस ')
            .replace(/\d+/g, this.numberToHindiWords.bind(this))
            .trim();
  }

  numberToHindiWords(x) {
    // Implementation of number to words conversion in Hindi
    return x;
  }

  wordsToVisemes(w) {
    let o = { words: w, visemes: [], times: [], durations: [] };
    let t = 0;

    const chars = [...w];
    for (let i = 0; i < chars.length; i++) {
      const viseme = this.visemes[chars[i]];
      if (viseme) {
        if (o.visemes.length && o.visemes[o.visemes.length - 1] === viseme) {
          const d = 0.7 * (this.visemeDurations[viseme] || 1);
          o.durations[o.durations.length - 1] += d;
          t += d;
        } else {
          const d = this.visemeDurations[viseme] || 1;
          o.visemes.push(viseme);
          o.times.push(t);
          o.durations.push(d);
          t += d;
        }
      } else {
        t += this.specialDurations[chars[i]] || 0;
      }
    }

    return o;
  }

}

export { LipsyncHi };
