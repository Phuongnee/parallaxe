let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let tabs = document.querySelectorAll('.tab');
let container = document.querySelector('.container');
let heightDefault = container.offsetHeight;
let topBefore = 0;
let body = document.querySelector('body');

window.addEventListener('wheel', function(event){
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY/3) * scrollSpeed;
    window.scrollTo(0, scrollValue);



    let top = scrollValue;
    listBg.forEach((bg, index) => {
        if(index != 0){
            bg.animate({
                transform: `translateY(${(-top*index)}px)`
            }, { duration: 1000, fill: "forwards" });
        }
        if(index == listBg.length - 1){
            tabs.forEach(tab => {
                tab.animate({
                    transform: `translateY(${(-top*index)}px)`
                }, { duration: 500, fill: "forwards" });
            })

            if(topBefore < top){
                setHeight = heightDefault-window.scrollY*index;
                container.animate({
                    height: `${(setHeight + 100)}px`
                }, { duration: 50, fill: "forwards" });
                topBefore = window.scrollY;
            }
        }
        tabs.forEach((tab, index) => {
            // console.log(tab.offsetTop - top, window.innerHeight);
            if((tab.offsetTop - top) <= window.innerHeight*(index+1)){
                let content = tab.getElementsByClassName('content')[0];
                let transformContent = window.innerHeight*(index+1) - (tab.offsetTop - top);
                console.log(tab);
                content.animate({
                    transform: `translateY(${(-transformContent + (100*index))}px)`
                }, { duration: 500, fill: "forwards" });
            }
        })
    })
}, { passive: false });
const slider = document.getElementById("timeline-slider");
      const slides = document.querySelectorAll(".slide");

      // Définir différentes positions et rotations pour chaque image
      const positions = [
        { left: "10%", bottom: "10%", angle: "-5deg" },
        { left: "60%", bottom: "15%", angle: "8deg" },
        { left: "30%", bottom: "5%", angle: "-10deg" },
        { left: "50%", bottom: "20%", angle: "5deg" },
        { left: "20%", bottom: "25%", angle: "-8deg" },
        
      ];
      // Initialiser la première diapositive comme active
      function initializeSlider() {
        const initialIndex = parseInt(slider.value);
        slides.forEach((slide, i) => {
          slide.classList.remove("active", "inactive");
          if (i === initialIndex) {
            slide.style.setProperty("--left", positions[i].left);
            slide.style.setProperty("--bottom", positions[i].bottom);
            slide.style.setProperty("--angle", positions[i].angle);
            slide.classList.add("active");
          }
          // Les autres restent cachées par défaut
        });
      }

      slider.addEventListener("input", () => {
        const currentIndex = parseInt(slider.value);

        slides.forEach((slide, i) => {
          // Réinitialiser les classes et styles spécifiques à la position active
          slide.classList.remove("active", "inactive");
          slide.style.removeProperty("--left");
          slide.style.removeProperty("--bottom");
          slide.style.removeProperty("--angle");
          slide.style.top = ""; // Réinitialiser le style 'top' inline
          slide.style.left = ""; // Réinitialiser le style 'left' inline

          if (i === currentIndex) {
            // Appliquer le style actif
            slide.style.setProperty("--left", positions[i].left);
            slide.style.setProperty("--bottom", positions[i].bottom);
            slide.style.setProperty("--angle", positions[i].angle);
            slide.classList.add("active");
          } else if (i < currentIndex) {
            // Appliquer le style inactif pour les images précédentes
            slide.classList.add("inactive");

            if (i === 0) {
              // Première image inactive : coin supérieur gauche
              slide.style.top = '20px';
              slide.style.left = '20px';
              // Assurez-vous que 'right' n'est pas défini si vous l'utilisiez ailleurs
              slide.style.right = 'auto';
            } else if (i === 1) {
              // Deuxième image inactive : coin supérieur droit
              slide.style.top = '20px';
              // Positionner près du bord droit. Ajustez '120px' selon la taille souhaitée ou utilisez un pourcentage.
              slide.style.left = 'calc(100% - 120px)';
              slide.style.right = 'auto'; // Alternative: slide.style.right = '20px'; slide.style.left = 'auto';
            } else {
              // Autres images inactives : position aléatoire dans la partie supérieure
              const randomTop = 15 + Math.random() * 50; // Position top aléatoire entre 15px et 65px
              const randomLeft = 10 + Math.random() * 80; // Position left aléatoire entre 10% et 90%
              slide.style.top = `${randomTop}px`;
              slide.style.left = `${randomLeft}%`;
              slide.style.right = 'auto';
            }
          }
          // Les images avec i > currentIndex n'ont aucune classe ajoutée,
          // elles utiliseront donc le style .slide par défaut (caché).
        });
      });

      // Appeler l'initialisation au chargement
      initializeSlider();