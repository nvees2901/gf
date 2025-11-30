const button = document.getElementById("clickButton");
const canvas = document.getElementById("fireworksCanvas");
let ctx = null;
let fireworks = [];

if (canvas && canvas.getContext) {
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fireworks = [];
}


class Particle {
constructor(x, y, color) {
this.x = x;
this.y = y;
this.color = color;
this.radius = Math.random() * 4 + 2.5;
this.velocityX = (Math.random() - 0.5) * 8;
this.velocityY = (Math.random() - 0.5) * 8 - 2;
this.alpha = 1;
}
draw() {
ctx.save();
ctx.globalAlpha = this.alpha;

// Efeito de brilho intenso
ctx.shadowColor = this.color;
ctx.shadowBlur = 25;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

ctx.fillStyle = this.color;
ctx.beginPath();
ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
ctx.fill();

// Segundo círculo para mais brilho
ctx.globalAlpha = this.alpha * 0.5;
ctx.fillStyle = this.color;
ctx.beginPath();
ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
ctx.fill();

ctx.restore();
}
update() {
this.x += this.velocityX;
this.y += this.velocityY;
this.alpha -= 0.015;
}
}


function explode(x, y) {
const colors = ["#ff1744", "#ff5252", "#ff6e40", "#ffde59", "#76ff03", "#00e5ff", "#00bfff", "#9c27b0", "#ff1493"];
for (let i = 0; i < 100; i++) {
fireworks.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
}
}


function animate() {
	if (!ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fireworks.forEach((particle, index) => {
		particle.update();
		particle.draw();
		if (particle.alpha <= 0) fireworks.splice(index, 1);
	});
	requestAnimationFrame(animate);
}

// Só inicia a animação se o canvas existir
if (ctx) animate();


// Ajusta o tamanho do canvas ao redimensionar a janela
if (ctx) {
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	// Função para criar uma explosão em posição aleatória (top half da tela)
	function spawnRandomFirework() {
		const x = Math.random() * canvas.width;
		const y = Math.random() * (canvas.height * 0.6);
		explode(x, y);
	}

	// Agendamento pseudo-aleatório de explosões para criar o fundo animado
		(function scheduleRandom() {
			// Mais frequente: 0.3s - 1.2s
			const delay = 300 + Math.random() * 900; // 0.3s - 1.2s
			setTimeout(() => {
				// aumentar chance de sequências maiores (explosões encadeadas)
				if (Math.random() < 0.3) {
					spawnRandomFirework();
					setTimeout(spawnRandomFirework, 100);
					if (Math.random() < 0.35) setTimeout(spawnRandomFirework, 240);
				} else {
					spawnRandomFirework();
				}
				scheduleRandom();
			}, delay);
		})();
}


if (button) {
	button.addEventListener("click", () => {
		// Explode in center
		if (typeof explode === 'function') explode(window.innerWidth / 2, window.innerHeight / 2);

		setTimeout(() => {
			window.location.href = "main.html"; // Página principal
		}, 1200);
	});
}


      // Tenta tocar a música automaticamente; se for bloqueado, mostra o botão de play
      (function() {
        const audio = document.getElementById('bgMusic');
        const btn = document.getElementById('musicPlayButton');
        if (!audio || !btn) return;

        function hideBtn() {
          btn.style.display = 'none';
        }

        // Tenta tocar ao carregar
        window.addEventListener('load', () => {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              // autoplay funcionou
              hideBtn();
            }).catch(() => {
              // autoplay bloqueado — mostra botão para o usuário
              btn.style.display = 'block';
            });
          }
        });

        // Se o usuário clicar em qualquer lugar, tente tocar (conveniente)
        document.addEventListener('click', () => {
          if (audio.paused) audio.play().then(hideBtn).catch(()=>{});
        }, { once: true });

        // Clique no botão toca e oculta o botão
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          audio.play().then(hideBtn).catch(()=>{});
        });
      })();


      const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;

const firstClone = img[0].cloneNode();
imgs.appendChild(firstClone);

const allImgs = document.querySelectorAll("#img img");

function carrossel() {
  idx++;
  imgs.style.transition = "transform 0.5s ease-in-out";
  imgs.style.transform = `translateX(${-idx * 100}%)`;

  if (idx === allImgs.length - 1) {
    setTimeout(() => {
      imgs.style.transition = "none"; 
      imgs.style.transform = `translateX(0)`; 
      idx = 0;
    }, 500); 
  }
}

setInterval(carrossel, 3000);

// ------------------------------------------------------------------------------------------------------------------

function atualizarContador() {
    const nascimento = new Date(2025, 8, 13); //(Janeiro é 0)
    const agora = new Date();
  
    let anos = agora.getFullYear() - nascimento.getFullYear();
    let meses = agora.getMonth() - nascimento.getMonth();
    let dias = agora.getDate() - nascimento.getDate();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
  
    if (dias < 0) {
      meses -= 1;
      const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaDoMesAnterior;
    }
  
    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }
  
    document.getElementById("contador").innerText =
      `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos`;
}
  
  atualizarContador();
  setInterval(atualizarContador, 60000); 