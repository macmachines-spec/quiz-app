let currentLang = "en";
let isTranslating = false;

const uiText = {
  en: {
    welcome: "50 questions. 30 seconds each.<br>How well do you know the world?",
    langLabel: "Choose your language",
    playBtn: "Play Now",
    timeLeft: "Time left:",
    playAgain: "Play Again",
    highScore: "High Score:",
    newRecord: "New record!",
    outOf: "out of",
    youScored: "You scored",
    translating: "Translating quiz...",
subtitle: "Test your general knowledge"
  }
};

async function translateText(text, targetLang) {
  if (targetLang === "en") return text;
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map(item => item[0]).join("");
  } catch (e) {
    return text;
  }
}

async function translateQuestion(q, targetLang) {
  if (targetLang === "en") return q;
  const translatedQuestion = await translateText(q.question, targetLang);
  const translatedAnswers = await Promise.all(
    q.answers.map(a => translateText(a, targetLang))
  );
  return {
    question: translatedQuestion,
    answers: translatedAnswers,
    correct: q.correct
  };
}

async function translateUI(targetLang) {
  if (targetLang === "en") {
  document.getElementById("welcome-text").innerHTML = uiText.en.welcome;
  document.getElementById("lang-label").textContent = uiText.en.langLabel;
  document.getElementById("play-btn").textContent = uiText.en.playBtn;
  document.getElementById("restart-btn").textContent = uiText.en.playAgain;
  document.getElementById("subtitle-text").textContent = uiText.en.subtitle;
  document.body.removeAttribute("dir");
  return;
  }

  if (targetLang === "ar") {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.removeAttribute("dir");
  }

  const keys = ["welcome", "langLabel", "playBtn", "playAgain"];
  const translations = await Promise.all([
    translateText(uiText.en.welcome, targetLang),
    translateText(uiText.en.langLabel, targetLang),
    translateText(uiText.en.playBtn, targetLang),
    translateText(uiText.en.playAgain, targetLang),
    translateText(uiText.en.subtitle, targetLang),
  ]);

  document.getElementById("welcome-text").innerHTML = translations[0];
  document.getElementById("lang-label").textContent = translations[1];
  document.getElementById("play-btn").textContent = translations[2];
  document.getElementById("restart-btn").textContent = translations[3];
  document.getElementById("subtitle-text").textContent = translations[4];
}
const questionBank = [
  { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
  { question: "Which planet is closest to the sun?", answers: ["Earth", "Mercury", "Venus", "Mars"], correct: 1 },
  { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
  { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correct: 1 },
  { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
  { question: "What is the chemical symbol for water?", answers: ["WA", "H2O", "HO", "OX"], correct: 1 },
  { question: "Which country has the largest population?", answers: ["USA", "India", "China", "Russia"], correct: 1 },
  { question: "What is the fastest land animal?", answers: ["Lion", "Horse", "Cheetah", "Leopard"], correct: 2 },
  { question: "How many sides does a hexagon have?", answers: ["5", "6", "7", "8"], correct: 1 },
  { question: "Which gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
  { question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Bangkok", "Tokyo"], correct: 3 },
  { question: "Who wrote Romeo and Juliet?", answers: ["Charles Dickens", "Shakespeare", "Jane Austen", "Homer"], correct: 1 },
  { question: "What is the hardest natural substance?", answers: ["Gold", "Iron", "Diamond", "Quartz"], correct: 2 },
  { question: "Which organ pumps blood in the human body?", answers: ["Liver", "Lungs", "Kidney", "Heart"], correct: 3 },
  { question: "What is the largest planet in our solar system?", answers: ["Saturn", "Neptune", "Jupiter", "Uranus"], correct: 2 },
  { question: "How many bones are in the adult human body?", answers: ["196", "206", "216", "226"], correct: 1 },
  { question: "What language is spoken in Brazil?", answers: ["Spanish", "French", "English", "Portuguese"], correct: 3 },
  { question: "Which element has the symbol O?", answers: ["Gold", "Oxygen", "Osmium", "Oxide"], correct: 1 },
  { question: "What is the tallest mountain in the world?", answers: ["K2", "Kilimanjaro", "Everest", "Denali"], correct: 2 },
  { question: "How many players are on a football team?", answers: ["9", "10", "11", "12"], correct: 2 },
  { question: "Which country invented pizza?", answers: ["France", "Greece", "Spain", "Italy"], correct: 3 },
  { question: "What is the capital of Australia?", answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
  { question: "Who discovered gravity?", answers: ["Einstein", "Newton", "Galileo", "Darwin"], correct: 1 },
  { question: "What is the smallest country in the world?", answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], correct: 2 },
  { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
  { question: "What is the currency of the UK?", answers: ["Euro", "Dollar", "Pound", "Franc"], correct: 2 },
  { question: "How many hours are in a day?", answers: ["12", "18", "24", "36"], correct: 2 },
  { question: "Which animal is known as the King of the Jungle?", answers: ["Tiger", "Elephant", "Lion", "Gorilla"], correct: 2 },
  { question: "What is the capital of Germany?", answers: ["Munich", "Hamburg", "Frankfurt", "Berlin"], correct: 3 },
  { question: "Which is the longest river in the world?", answers: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
  { question: "What year did World War II end?", answers: ["1943", "1944", "1945", "1946"], correct: 2 },
  { question: "How many strings does a standard guitar have?", answers: ["4", "5", "6", "7"], correct: 2 },
  { question: "What is the main ingredient in bread?", answers: ["Rice", "Corn", "Flour", "Oats"], correct: 2 },
  { question: "Which country is home to the kangaroo?", answers: ["New Zealand", "South Africa", "Australia", "Brazil"], correct: 2 },
  { question: "What is the boiling point of water in Celsius?", answers: ["90°C", "95°C", "100°C", "105°C"], correct: 2 },
  { question: "Who was the first man on the moon?", answers: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], correct: 2 },
  { question: "What is the capital of Canada?", answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: 3 },
  { question: "What is the square root of 144?", answers: ["10", "11", "12", "13"], correct: 2 },
  { question: "Which country has the Eiffel Tower?", answers: ["Italy", "Spain", "France", "Belgium"], correct: 2 },
  { question: "How many letters are in the English alphabet?", answers: ["24", "25", "26", "27"], correct: 2 },
  { question: "What is the largest continent?", answers: ["Africa", "Asia", "Europe", "America"], correct: 1 },
  { question: "Which instrument has black and white keys?", answers: ["Guitar", "Violin", "Piano", "Drums"], correct: 2 },
  { question: "What is the capital of Italy?", answers: ["Milan", "Naples", "Venice", "Rome"], correct: 3 },
  { question: "How many meters are in a kilometer?", answers: ["10", "100", "1000", "10000"], correct: 2 },
  { question: "Which bird is the symbol of peace?", answers: ["Eagle", "Dove", "Sparrow", "Crane"], correct: 1 },
  { question: "What is the largest mammal on Earth?", answers: ["Elephant", "Giraffe", "Blue Whale", "Hippo"], correct: 2 },
  { question: "Which sport uses a shuttlecock?", answers: ["Tennis", "Squash", "Badminton", "Volleyball"], correct: 2 },
  { question: "What is the capital of Spain?", answers: ["Barcelona", "Seville", "Madrid", "Valencia"], correct: 2 },
  { question: "How many planets are in our solar system?", answers: ["7", "8", "9", "10"], correct: 1 },
  { question: "What is the currency of Japan?", answers: ["Yuan", "Won", "Yen", "Peso"], correct: 2 },
  { question: "What is the capital of Nigeria?", answers: ["Lagos", "Abuja", "Kano", "Ibadan"], correct: 1 },
  { question: "Which is the largest country in Africa by area?", answers: ["Sudan", "Libya", "Algeria", "DR Congo"], correct: 2 },
  { question: "What is the longest river in Africa?", answers: ["Congo", "Niger", "Zambezi", "Nile"], correct: 3 },
  { question: "Which African country has the largest population?", answers: ["Ethiopia", "Egypt", "Nigeria", "South Africa"], correct: 2 },
  { question: "What is the capital of South Africa?", answers: ["Cape Town", "Johannesburg", "Pretoria", "Durban"], correct: 2 },
  { question: "Which mountain is the highest in Africa?", answers: ["Mount Kenya", "Kilimanjaro", "Rwenzori", "Atlas"], correct: 1 },
  { question: "What is the capital of Kenya?", answers: ["Mombasa", "Kisumu", "Nairobi", "Nakuru"], correct: 2 },
  { question: "Which African country was never colonized?", answers: ["Ghana", "Ethiopia", "Senegal", "Tanzania"], correct: 1 },
  { question: "What is the capital of Egypt?", answers: ["Alexandria", "Luxor", "Giza", "Cairo"], correct: 3 },
  { question: "Which is the smallest country in Africa?", answers: ["Djibouti", "Gambia", "Seychelles", "Comoros"], correct: 1 },
  { question: "What is the capital of Ghana?", answers: ["Kumasi", "Takoradi", "Accra", "Tamale"], correct: 2 },
  { question: "Which African country is known as the Rainbow Nation?", answers: ["Kenya", "Nigeria", "South Africa", "Tanzania"], correct: 2 },
  { question: "What is the capital of Ethiopia?", answers: ["Dire Dawa", "Addis Ababa", "Gondar", "Hawassa"], correct: 1 },
  { question: "Which ocean borders Africa to the west?", answers: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"], correct: 2 },
  { question: "What is the capital of Morocco?", answers: ["Casablanca", "Marrakech", "Fez", "Rabat"], correct: 3 },
  { question: "Which African country is home to the Pyramids of Giza?", answers: ["Sudan", "Libya", "Egypt", "Tunisia"], correct: 2 },
  { question: "What is the capital of Tanzania?", answers: ["Zanzibar", "Mwanza", "Dodoma", "Dar es Salaam"], correct: 2 },
  { question: "Which African country produces the most cocoa?", answers: ["Ghana", "Nigeria", "Ivory Coast", "Cameroon"], correct: 2 },
  { question: "What is the capital of Senegal?", answers: ["Dakar", "Abidjan", "Conakry", "Bamako"], correct: 0 },
  { question: "Which African country hosted the 2010 FIFA World Cup?", answers: ["Nigeria", "Kenya", "Egypt", "South Africa"], correct: 3 },
  { question: "What is the capital of Uganda?", answers: ["Entebbe", "Kampala", "Jinja", "Gulu"], correct: 1 },
  { question: "Which is the largest desert in Africa?", answers: ["Kalahari", "Namib", "Sahara", "Karoo"], correct: 2 },
  { question: "What is the capital of Cameroon?", answers: ["Douala", "Yaoundé", "Bafoussam", "Garoua"], correct: 1 },
  { question: "What is the capital of Zimbabwe?", answers: ["Bulawayo", "Harare", "Mutare", "Gweru"], correct: 1 },
  { question: "Which African country has the most pyramids?", answers: ["Egypt", "Sudan", "Libya", "Ethiopia"], correct: 1 },
  { question: "What is the capital of Angola?", answers: ["Benguela", "Huambo", "Luanda", "Lubango"], correct: 2 },
  { question: "Which African lake is the largest by area?", answers: ["Lake Tanganyika", "Lake Malawi", "Lake Victoria", "Lake Chad"], correct: 2 },
  { question: "What is the capital of Ivory Coast?", answers: ["Abidjan", "Bouaké", "Yamoussoukro", "Korhogo"], correct: 2 },
  { question: "Which African country is known as the Giant of Africa?", answers: ["South Africa", "Ethiopia", "Nigeria", "Egypt"], correct: 2 },
  { question: "What is the speed of light?", answers: ["200,000 km/s", "300,000 km/s", "400,000 km/s", "500,000 km/s"], correct: 1 },
  { question: "Which planet has the most moons?", answers: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: 1 },
  { question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], correct: 2 },
  { question: "How many elements are in the periodic table?", answers: ["108", "112", "118", "124"], correct: 2 },
  { question: "What is the atomic number of carbon?", answers: ["4", "6", "8", "12"], correct: 1 },
  { question: "Which planet has rings around it?", answers: ["Jupiter", "Mars", "Saturn", "Neptune"], correct: 2 },
  { question: "What gas makes up most of Earth's atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], correct: 3 },
  { question: "What is the closest star to Earth?", answers: ["Sirius", "Proxima Centauri", "The Sun", "Betelgeuse"], correct: 2 },
  { question: "Which blood type is the universal donor?", answers: ["A", "B", "AB", "O"], correct: 3 },
  { question: "What is the human body's largest organ?", answers: ["Liver", "Brain", "Skin", "Lungs"], correct: 2 },
  { question: "How many chromosomes do humans have?", answers: ["23", "44", "46", "48"], correct: 2 },
  { question: "What is the chemical symbol for gold?", answers: ["Go", "Gd", "Au", "Ag"], correct: 2 },
  { question: "Which vitamin does the sun provide?", answers: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correct: 3 },
  { question: "What is the most abundant gas in the universe?", answers: ["Oxygen", "Helium", "Hydrogen", "Carbon"], correct: 2 },
  { question: "How many hearts does an octopus have?", answers: ["1", "2", "3", "4"], correct: 2 },
  { question: "Which organ produces insulin?", answers: ["Liver", "Kidney", "Pancreas", "Stomach"], correct: 2 },
  { question: "What force keeps planets in orbit?", answers: ["Magnetism", "Gravity", "Friction", "Electricity"], correct: 1 },
  { question: "Which planet rotates on its side?", answers: ["Neptune", "Saturn", "Uranus", "Jupiter"], correct: 2 },
  { question: "Who invented the telephone?", answers: ["Edison", "Tesla", "Bell", "Marconi"], correct: 2 },
  { question: "In which year did the Titanic sink?", answers: ["1910", "1912", "1914", "1916"], correct: 1 },
  { question: "Who was the first President of the United States?", answers: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], correct: 2 },
  { question: "In which year did World War I begin?", answers: ["1912", "1913", "1914", "1915"], correct: 2 },
  { question: "Who was the first woman to win a Nobel Prize?", answers: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Florence Nightingale"], correct: 0 },
  { question: "Which ancient wonder still exists today?", answers: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"], correct: 2 },
  { question: "Who was the first African American US President?", answers: ["Colin Powell", "Barack Obama", "Jesse Jackson", "Martin Luther King"], correct: 1 },
  { question: "In which year did humans first land on the moon?", answers: ["1965", "1967", "1969", "1971"], correct: 2 },
  { question: "Which empire was the largest in history?", answers: ["Roman Empire", "British Empire", "Mongol Empire", "Ottoman Empire"], correct: 1 },
  { question: "Who invented the light bulb?", answers: ["Tesla", "Bell", "Edison", "Newton"], correct: 2 },
  { question: "Who was the first female Prime Minister of the UK?", answers: ["Queen Elizabeth", "Margaret Thatcher", "Theresa May", "Mary Queen of Scots"], correct: 1 },
  { question: "Which country was the first to give women the right to vote?", answers: ["USA", "UK", "New Zealand", "France"], correct: 2 },
  { question: "Who wrote the Declaration of Independence?", answers: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"], correct: 1 },
  { question: "In which year did the Berlin Wall fall?", answers: ["1987", "1988", "1989", "1990"], correct: 2 },
  { question: "Which sport has the most players on the field at once?", answers: ["Football", "Rugby", "Cricket", "Baseball"], correct: 2 },
  { question: "How many rings are on the Olympic flag?", answers: ["4", "5", "6", "7"], correct: 1 },
  { question: "Which country has won the most FIFA World Cups?", answers: ["Germany", "Argentina", "Italy", "Brazil"], correct: 3 },
  { question: "In tennis, what is a score of zero called?", answers: ["Nil", "Zero", "Love", "Blank"], correct: 2 },
  { question: "Which country invented the Olympic Games?", answers: ["Rome", "Egypt", "Greece", "Persia"], correct: 2 },
  { question: "How long is a marathon in kilometers?", answers: ["40km", "41km", "42.195km", "43km"], correct: 2 },
  { question: "Which sport is played at Wimbledon?", answers: ["Cricket", "Squash", "Tennis", "Badminton"], correct: 2 },
  { question: "How many players are on a basketball team on court?", answers: ["4", "5", "6", "7"], correct: 1 },
  { question: "Which country hosted the 2016 Summer Olympics?", answers: ["China", "UK", "Brazil", "Japan"], correct: 2 },
  { question: "In which sport can you score a birdie?", answers: ["Cricket", "Golf", "Tennis", "Baseball"], correct: 1 },
  { question: "Which African country has won the most Africa Cup of Nations titles?", answers: ["Nigeria", "Ghana", "Cameroon", "Egypt"], correct: 3 },
  { question: "How many points is a try worth in rugby union?", answers: ["3", "4", "5", "6"], correct: 2 },
  { question: "Which sport uses a puck?", answers: ["Football", "Hockey", "Cricket", "Polo"], correct: 1 },
  { question: "Who holds the record for most Olympic gold medals?", answers: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"], correct: 1 },
  { question: "In which sport is a slam dunk performed?", answers: ["Volleyball", "Handball", "Basketball", "Netball"], correct: 2 },
  { question: "Who sang Thriller?", answers: ["Prince", "Michael Jackson", "Stevie Wonder", "James Brown"], correct: 1 },
  { question: "Which band sang Bohemian Rhapsody?", answers: ["The Beatles", "Led Zeppelin", "Queen", "Rolling Stones"], correct: 2 },
  { question: "How many strings does a violin have?", answers: ["3", "4", "5", "6"], correct: 1 },
  { question: "Which country does reggae music come from?", answers: ["Cuba", "Trinidad", "Jamaica", "Barbados"], correct: 2 },
  { question: "Who is known as the Queen of Pop?", answers: ["Beyoncé", "Rihanna", "Madonna", "Lady Gaga"], correct: 2 },
  { question: "Who sang Rolling in the Deep?", answers: ["Taylor Swift", "Adele", "Beyoncé", "Rihanna"], correct: 1 },
  { question: "Which African music genre originated in South Africa?", answers: ["Afrobeats", "Highlife", "Amapiano", "Bongo Flava"], correct: 2 },
  { question: "How many musicians are in a quartet?", answers: ["2", "3", "4", "5"], correct: 2 },
  { question: "Who is known as the King of Rock and Roll?", answers: ["Chuck Berry", "Elvis Presley", "Jerry Lee Lewis", "Buddy Holly"], correct: 1 },
  { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"], correct: 0 },
  { question: "What does CPU stand for?", answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correct: 0 },
  { question: "Which company makes the iPhone?", answers: ["Samsung", "Google", "Apple", "Microsoft"], correct: 2 },
  { question: "What does Wi-Fi stand for?", answers: ["Wireless Fidelity", "Wide Frequency", "Wireless Firefox", "Web Frequency"], correct: 0 },
  { question: "Which company created the Android operating system?", answers: ["Apple", "Microsoft", "Google", "Samsung"], correct: 2 },
  { question: "What does USB stand for?", answers: ["Universal Serial Bus", "Ultra Speed Broadband", "United System Base", "Universal System Boot"], correct: 0 },
  { question: "Which programming language is known as the language of the web?", answers: ["Python", "Java", "C++", "JavaScript"], correct: 3 },
  { question: "What does RAM stand for?", answers: ["Random Access Memory", "Read And Modify", "Runtime Access Module", "Rapid Access Mode"], correct: 0 },
  { question: "Which company owns YouTube?", answers: ["Facebook", "Apple", "Google", "Microsoft"], correct: 2 },
  { question: "What does GPS stand for?", answers: ["Global Positioning System", "General Path Sensor", "Geographic Positioning Software", "Global Path Signal"], correct: 0 },
  { question: "What is the capital of Brazil?", answers: ["Rio de Janeiro", "São Paulo", "Salvador", "Brasília"], correct: 3 },
  { question: "Which country is home to the Amazon rainforest?", answers: ["Colombia", "Peru", "Brazil", "Venezuela"], correct: 2 },
  { question: "What is the capital of China?", answers: ["Shanghai", "Hong Kong", "Guangzhou", "Beijing"], correct: 3 },
  { question: "Which country has the longest coastline?", answers: ["USA", "Russia", "Australia", "Canada"], correct: 3 },
  { question: "What is the capital of India?", answers: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correct: 1 },
  { question: "Which is the smallest continent?", answers: ["Europe", "Antarctica", "Australia", "South America"], correct: 2 },
  { question: "What is the capital of Russia?", answers: ["St Petersburg", "Vladivostok", "Moscow", "Kazan"], correct: 2 },
  { question: "Which country has the most natural lakes?", answers: ["USA", "Russia", "Brazil", "Canada"], correct: 3 },
  { question: "What is the capital of Argentina?", answers: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], correct: 2 },
  { question: "Which desert is the largest in the world?", answers: ["Sahara", "Gobi", "Arabian", "Antarctic"], correct: 3 },
  { question: "What is the capital of Mexico?", answers: ["Guadalajara", "Monterrey", "Mexico City", "Puebla"], correct: 2 },
  { question: "Which country is known as the Land of the Rising Sun?", answers: ["China", "South Korea", "Japan", "Vietnam"], correct: 2 },
  { question: "What is the capital of Saudi Arabia?", answers: ["Jeddah", "Mecca", "Medina", "Riyadh"], correct: 3 },
  { question: "Which is the deepest lake in the world?", answers: ["Lake Superior", "Lake Victoria", "Caspian Sea", "Lake Baikal"], correct: 3 },
  { question: "What is the capital of Turkey?", answers: ["Istanbul", "Izmir", "Ankara", "Bursa"], correct: 2 },
  { question: "What is 15% of 200?", answers: ["25", "30", "35", "40"], correct: 1 },
  { question: "How many degrees are in a right angle?", answers: ["45", "60", "90", "180"], correct: 2 },
  { question: "What is 7 multiplied by 8?", answers: ["48", "54", "56", "64"], correct: 2 },
  { question: "What is the value of Pi to 2 decimal places?", answers: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
  { question: "How many sides does an octagon have?", answers: ["6", "7", "8", "9"], correct: 2 },
  { question: "What is the square root of 256?", answers: ["14", "15", "16", "17"], correct: 2 },
  { question: "How many seconds are in an hour?", answers: ["1800", "2400", "3600", "4800"], correct: 2 },
  { question: "What is 25 squared?", answers: ["525", "600", "625", "650"], correct: 2 },
  { question: "What is the perimeter of a square with side 5cm?", answers: ["15cm", "20cm", "25cm", "30cm"], correct: 1 },
  { question: "How many degrees are in a triangle?", answers: ["90", "120", "180", "360"], correct: 2 },
  { question: "Which animal has the longest neck?", answers: ["Camel", "Giraffe", "Elephant", "Ostrich"], correct: 1 },
  { question: "How many legs does a spider have?", answers: ["6", "7", "8", "10"], correct: 2 },
  { question: "Which is the only mammal that can fly?", answers: ["Flying Squirrel", "Bat", "Eagle", "Dragonfly"], correct: 1 },
  { question: "What is a group of lions called?", answers: ["Pack", "Herd", "Pride", "Flock"], correct: 2 },
  { question: "Which animal is known for changing color?", answers: ["Gecko", "Iguana", "Chameleon", "Salamander"], correct: 2 },
  { question: "What is the largest bird in the world?", answers: ["Eagle", "Condor", "Ostrich", "Albatross"], correct: 2 },
  { question: "How many legs does a crab have?", answers: ["6", "8", "10", "12"], correct: 2 },
  { question: "Which animal sleeps standing up?", answers: ["Elephant", "Horse", "Giraffe", "Hippo"], correct: 1 },
  { question: "What is the fastest fish in the ocean?", answers: ["Tuna", "Marlin", "Sailfish", "Swordfish"], correct: 2 },
  { question: "Which African animal is known as the laughing animal?", answers: ["Jackal", "Hyena", "Meerkat", "Baboon"], correct: 1 },
  { question: "Which artist painted the Sistine Chapel ceiling?", answers: ["Da Vinci", "Raphael", "Michelangelo", "Donatello"], correct: 2 },
  { question: "What is the most spoken language in the world?", answers: ["English", "Spanish", "Hindi", "Mandarin"], correct: 3 },
  { question: "In which country is the Taj Mahal located?", answers: ["Pakistan", "Bangladesh", "India", "Nepal"], correct: 2 },
  { question: "Which planet is known as the Morning Star?", answers: ["Mars", "Mercury", "Venus", "Jupiter"], correct: 2 },
  { question: "Who wrote the Harry Potter series?", answers: ["Tolkien", "C.S. Lewis", "J.K. Rowling", "Roald Dahl"], correct: 2 },
  { question: "What is the national animal of Australia?", answers: ["Koala", "Kangaroo", "Emu", "Platypus"], correct: 1 },
  { question: "What is the most translated book in the world?", answers: ["The Quran", "The Bible", "Harry Potter", "Don Quixote"], correct: 1 },
  { question: "Which country drinks the most tea per capita?", answers: ["China", "India", "UK", "Turkey"], correct: 3 },
  { question: "What is the national flower of Japan?", answers: ["Rose", "Lotus", "Cherry Blossom", "Chrysanthemum"], correct: 2 },
  { question: "Who invented the World Wide Web?", answers: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"], correct: 2 },
  { question: "Who wrote the novel 1984?", answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correct: 1 },
  { question: "What is the rarest blood type?", answers: ["A negative", "B negative", "O negative", "AB negative"], correct: 3 },
  { question: "How many time zones does Russia have?", answers: ["9", "10", "11", "12"], correct: 2 },
  { question: "Which country consumes the most chocolate?", answers: ["Belgium", "USA", "Switzerland", "Germany"], correct: 2 },
  { question: "What is the most common surname in the world?", answers: ["Smith", "Wang", "Garcia", "Patel"], correct: 1 },
  { question: "What is the capital of Rwanda?", answers: ["Bujumbura", "Kigali", "Gitega", "Butare"], correct: 1 },
  { question: "Which country in Africa has the most official languages?", answers: ["Nigeria", "Cameroon", "South Africa", "Ethiopia"], correct: 2 },
  { question: "What is the capital of Zambia?", answers: ["Ndola", "Kitwe", "Lusaka", "Livingstone"], correct: 2 },
  { question: "Which African country is the leading producer of gold?", answers: ["Nigeria", "Zimbabwe", "Ghana", "South Africa"], correct: 3 },
  { question: "What is the capital of Mozambique?", answers: ["Beira", "Nampula", "Maputo", "Tete"], correct: 2 },
  { question: "Which African country has the Serengeti National Park?", answers: ["Kenya", "Tanzania", "Uganda", "Rwanda"], correct: 1 },
  { question: "What is the capital of Mali?", answers: ["Timbuktu", "Bamako", "Gao", "Mopti"], correct: 1 },
  { question: "Which African country is the world's largest producer of diamonds?", answers: ["South Africa", "Zimbabwe", "Botswana", "Angola"], correct: 2 },
  { question: "What is the capital of Botswana?", answers: ["Francistown", "Maun", "Gaborone", "Lobatse"], correct: 2 },
  { question: "Which African country has the largest economy?", answers: ["South Africa", "Egypt", "Nigeria", "Ethiopia"], correct: 2 },
  { question: "What is the capital of Namibia?", answers: ["Swakopmund", "Walvis Bay", "Windhoek", "Lüderitz"], correct: 2 },
  { question: "Which African country was formerly known as Rhodesia?", answers: ["Zambia", "Malawi", "Zimbabwe", "Mozambique"], correct: 2 },
  { question: "What is the capital of Sudan?", answers: ["Omdurman", "Port Sudan", "Khartoum", "Kassala"], correct: 2 },
  { question: "What is the capital of Liberia?", answers: ["Freetown", "Monrovia", "Abidjan", "Conakry"], correct: 1 },
  { question: "Which African country is home to the Maasai people?", answers: ["Ethiopia", "Uganda", "Kenya", "Tanzania"], correct: 2 },
  { question: "What is the capital of Somalia?", answers: ["Hargeisa", "Kismayo", "Mogadishu", "Berbera"], correct: 2 },
  { question: "What is the capital of Burkina Faso?", answers: ["Bobo-Dioulasso", "Ouagadougou", "Koudougou", "Banfora"], correct: 1 },
  { question: "What is the capital of Niger?", answers: ["Zinder", "Maradi", "Niamey", "Agadez"], correct: 2 },
  { question: "Which African country has the Victoria Falls?", answers: ["Zambia only", "Zimbabwe only", "Both Zambia and Zimbabwe", "Mozambique"], correct: 2 },
  { question: "What is the capital of Chad?", answers: ["Moundou", "N'Djamena", "Sarh", "Abéché"], correct: 1 },
  { question: "Which African country is known as the Pearl of Africa?", answers: ["Rwanda", "Kenya", "Uganda", "Tanzania"], correct: 2 },
  { question: "What is the capital of Congo (DRC)?", answers: ["Brazzaville", "Lubumbashi", "Kinshasa", "Mbuji-Mayi"], correct: 2 },
  { question: "What is the capital of Eritrea?", answers: ["Massawa", "Keren", "Asmara", "Assab"], correct: 2 },
  { question: "Which African country is the leading oil producer?", answers: ["Libya", "Algeria", "Angola", "Nigeria"], correct: 3 },
  { question: "What is the capital of Gabon?", answers: ["Port-Gentil", "Franceville", "Libreville", "Oyem"], correct: 2 },
];

let playCount = 0;
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval = null;
let shuffledQuestions = [];

const welcomeBox = document.getElementById("welcome-box");
const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-btn");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerNum = document.getElementById("timer-num");
const timerBar = document.getElementById("timer-bar");
const progressText = document.getElementById("progress-text");
const highScoreDisplay = document.getElementById("high-score-display");
const newRecord = document.getElementById("new-record");
const playBtn = document.getElementById("play-btn");

const sounds = {
  correct: new Audio("https://assets.mixkit.co/active_storage/sfx/2058/2058-preview.mp3"),
  wrong: new Audio("https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3"),
  fanfare: new Audio("https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3")
};

function playSound(type) {
  try {
    sounds[type].currentTime = 0;
    sounds[type].play();
  } catch(e) {
    console.log("Sound error:", e);
  }
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const celebration = document.getElementById("celebration");
  celebration.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const pieces = [];
  const colors = ["#00f5d4", "#7b2ff7", "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 12 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 4 - 2
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(function(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.angle += p.spin;
      if (p.y > canvas.height) p.y = -10;
    });
    frame++;
    if (frame < 180) {
      requestAnimationFrame(draw);
    } else {
      celebration.style.display = "none";
    }
  }
  draw();

  const msg = document.getElementById("celebration-message");
  if (msg) msg.remove();
  const popup = document.createElement("div");
  popup.id = "celebration-message";
  popup.innerHTML = "<h2>New Record!</h2><p>You're on fire!</p>";
  document.body.appendChild(popup);
  setTimeout(function() { popup.remove(); }, 3000);
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickQuestions() {
  const shuffled = shuffleArray(questionBank);
  return shuffled.slice(0, 50);
}

function startQuiz() {
  playCount++;
  currentQuestion = 0;
  score = 0;
  shuffledQuestions = pickQuestions();
  welcomeBox.style.display = "none";
  resultBox.style.display = "none";
  questionBox.style.display = "block";
  loadQuestion();
}

function startTimer() {
  timeLeft = 30;
  timerNum.textContent = timeLeft;
  timerBar.style.width = "100%";
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timeLeft--;
    timerNum.textContent = timeLeft;
    timerBar.style.width = (timeLeft / 30 * 100) + "%";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      highlightCorrect();
      setTimeout(nextQuestion, 1000);
    }
  }, 1000);
}

function highlightCorrect() {
  const correct = shuffledQuestions[currentQuestion].correct;
  answerButtons.forEach(function(b) {
    b.disabled = true;
    b.style.background = "transparent";
  });
  answerButtons[correct].style.background = "green";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    questionBox.style.display = "none";
    resultBox.style.display = "block";
    scoreDisplay.textContent = score;
    playSound("fanfare");

    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScoreDisplay.textContent = score;
      newRecord.style.display = "block";
      setTimeout(launchConfetti, 400);
    } else {
      highScoreDisplay.textContent = highScore;
      newRecord.style.display = "none";
    }
  }
}

async function loadQuestion() {
  const raw = shuffledQuestions[currentQuestion];
  progressText.textContent = "Question " + (currentQuestion + 1) + " of 50";

  answerButtons.forEach(function(btn) {
    btn.textContent = "...";
    btn.style.background = "transparent";
    btn.style.borderColor = "#7b2ff7";
    btn.disabled = true;
  });

  const q = await translateQuestion(raw, currentLang);

  questionText.textContent = q.question;
  answerButtons.forEach(function(btn, index) {
    btn.textContent = q.answers[index];
    btn.disabled = false;
  });
  startTimer();
}

answerButtons.forEach(function(btn, index) {
  btn.addEventListener("click", function() {
    clearInterval(timerInterval);
    const correct = shuffledQuestions[currentQuestion].correct;
    if (index === correct) {
      btn.style.background = "green";
      score++;
      playSound("correct");
    } else {
      btn.style.background = "red";
      answerButtons[correct].style.background = "green";
      playSound("wrong");
    }
    answerButtons.forEach(b => b.disabled = true);
    setTimeout(nextQuestion, 1000);
  });
});

playBtn.addEventListener("click", function() {
  Object.values(sounds).forEach(s => { s.load(); });
  startQuiz();
});

document.querySelectorAll(".lang-btn").forEach(function(btn) {
  btn.addEventListener("click", async function() {
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    currentLang = this.getAttribute("data-lang");
    await translateUI(currentLang);
  });
});

restartBtn.addEventListener("click", function() {
  newRecord.style.display = "none";
  startQuiz();
});
