let name, strzal, odpowiedzi, word, gameBroke, pozostaleLitery, gameHistory, szanse, category

gameHistory = []
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function game() {
  rysujWisielca("clear")
  const categories = Object.keys(words)
  username = prompt("Podaj imię")
  gameBroke = false
  while (!words[category]) {
    category = prompt("Wybierz kategorię: " + categories.join(", "))
    console.log(category)
    if (category == null) { return }
  }
  if (!gameBroke) {
    // wybierz losowe słowo
    word = words[category][Math.floor( Math.random() * words[category].length )]
    
    // konfiguracja tablicy z odpowiedziami
    odpowiedzi = []
    for(let i = 0; i < word.length; i++) {
      odpowiedzi.push('_')
    }
    
    pozostaleLitery = word.length
    szanse = 9
  }
  
  // gra
  while (pozostaleLitery > 0 && szanse >= 0) {
    rysujWisielca(szanse)
    await timeout(100)
    strzal = prompt(odpowiedzi.join(" ") + "\npodaj literę, lub wciśnij anuluj by zakończyć grę\nPozostało błędnych prób: " + szanse)
    if(strzal == null) {
      gameBroke = true
      gameHistory.push({"won": false, "word": word, "answers": odpowiedzi.join(""), "endReason": "Zatrzymana przez użytkownika"})
      break
    } else if(strzal.length > 1) {
      alert("Podaj tylko 1 literę")
    } else if(strzal.length == 0) {
      alert("Nic nie wpisałeś")
    } else if(szanse == 0) {
      alert("Zużyłeś/aś za dużo prób")
      gameBroke = true
      gameHistory.push({"won": false, "word": word, "answers": odpowiedzi.join(""), "endReason": "Za dużo prób"})
      break
    } else if (odpowiedzi.includes(strzal.toLowerCase())) {
      alert("Już to wpisałeś/aś!")
    } else {
      for(i=0; i<word.length; i++) {
        if(word[i] == strzal.toLowerCase()) {
          odpowiedzi[i] = strzal.toLowerCase()
          pozostaleLitery--
        }
      }
      if (!word.includes(strzal.toLowerCase())) { szanse-- }
    }
  }
  
  if(!gameBroke) {
    gameHistory.push({"won": true, "word": word, "answers": word, "endReason": "wygrana"})
    alert(odpowiedzi.join("") + "\nDobra robota! Szukane słowo to " + word)
  }
  $("tbody").append("<tr><th>" + gameHistory.length + "</th><td>" + username + "</td><td>" + gameHistory[gameHistory.length-1].won + "</td><td>" + word + "</td><td>" + odpowiedzi.join(" ") + "</td></tr>")
  category = undefined
}

function rysujWisielca(szanse) {
  const canvas = document.getElementById('wisielec');
  const ctx = canvas.getContext('2d');
  if (9 - szanse == 0) {
    ctx.beginPath();
    ctx.moveTo(0, 335);
    ctx.lineTo(50, 300);
    ctx.stroke();
  } else if (9 - szanse == 1) {
    ctx.beginPath();
    ctx.moveTo(100, 335);
    ctx.lineTo(50, 300);
    ctx.stroke();
  } else if (9 - szanse == 2) {
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(50, 300);
    ctx.stroke();
  } else if (9 - szanse == 3) {
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(200, 10);
    ctx.stroke();
  } else if (9 - szanse == 4) {
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 10);
    ctx.stroke();
  } else if (9 - szanse == 5) {
    ctx.beginPath();
    ctx.arc(200, 85, 35, 0, Math.PI * 2, true);
    ctx.stroke();
  } else if (9 - szanse == 6) {
    ctx.beginPath();
    ctx.ellipse(200, 180, 36, 60, 0, 0, Math.PI * 2, true);
    ctx.stroke();
  } else if (9 - szanse == 7) {
    ctx.beginPath();
    ctx.moveTo(110, 50);
    ctx.lineTo(175, 145);
    ctx.stroke();
  } else if (9 - szanse == 8) {
    ctx.beginPath();
    ctx.moveTo(175, 220);
    ctx.lineTo(150, 260);
    ctx.stroke();
  } else if (9 - szanse == 9) {
    ctx.beginPath();
    ctx.moveTo(230, 220);
    ctx.lineTo(250, 260);
    ctx.stroke();
  } else if (szanse == "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}