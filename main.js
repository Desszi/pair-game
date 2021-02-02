(function() {

    const icons = [
        'fa-car',
        'fa-paw',
        'fa-linux',
        'fa-bank',
        'fa-heart',
    ];
   
let points = 0;
const getOneCard = (icon) => {
    const div = document.createElement('div');
    div.classList.add('col-2');
    div.classList.add('card');
    div.innerHTML = ` <div class="card__front">
    <i class="fa ${icon}"></i>
        </div>
        <div class="card__back">
            <img src="/img/card-back.png" alt=back">
        </div>
        </div>`;
    return div;
    };

    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      const iconArray = icons.concat(icons);
      shuffle(iconArray);
      const row1 = document.querySelector('.card-row:nth-child(2)')
      const row2 = document.querySelector('.card-row:nth-child(3)')
      let i=0; 
      for (const icon of iconArray) {
          i++;
          const card = getOneCard(icon);
            if(i<6) {
                row1.appendChild(card);
            } else {
                row2.appendChild(card);
            }
      }
      
      let blockClick = false;
      const cardClick = (ev) => {
          if(blockClick) { 
              return; 
            }
        ev.currentTarget.classList.toggle('flipped');
        const flippedCards = document.querySelectorAll('.card.flipped');
          if(flippedCards.length>1) {
              blockClick = true;
              const to = setTimeout( ()=> {
                  clearTimeout(to);
                  blockClick = false;
                  document.querySelectorAll('.card').forEach(card => {
                      card.classList.remove('flipped');
                });
              }, 2000);
              checkPair();
          }


      };
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
          card.addEventListener('click', cardClick);
      })

      const showPoints = (points) => {
          document.querySelector('.user-points').textContent = points;
      }

      const checkPair = () => {
          const firtCardIcon = document.querySelector('card.flipped i');
          if (firtCardIcon) {
              const firstIconClass = firstCardIcon.className.split(' ');
              const pair= document.querySelectorAll(`.card.flipped .${firtIconClass.pop()}`);
              if (pair.length==2) {
                  points++;
                  showPoints(points);
                  document.querySelectorAll(`.card.flipped`).forEach(
                      card => card.classList.add('found')
                );
              }
          }
      }
})();