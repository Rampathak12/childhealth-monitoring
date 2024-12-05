document.addEventListener('DOMContentLoaded', () => {
    // Get all checkboxes in the vaccine table
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
    // Add event listener to each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const vaccineName = event.target.closest('tr').querySelector('td:first-child').innerText;
        const status = event.target.checked ? 'Taken' : 'Pending';
        alert(`Vaccine: ${vaccineName}\nStatus: ${status}`);
      });
    });
  
    // Example congratulatory effect
    const congratulateButton = document.querySelector('#congratulate-btn');
    if (congratulateButton) {
      congratulateButton.addEventListener('click', () => {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti');
        document.body.appendChild(confettiContainer);
  
        // Generate confetti effect
        for (let i = 0; i < 100; i++) {
          const confettiPiece = document.createElement('div');
          confettiPiece.classList.add('confetti-piece');
          confettiPiece.style.left = Math.random() * 100 + 'vw';
          confettiPiece.style.animationDuration = Math.random() * 3 + 2 + 's';
          confettiContainer.appendChild(confettiPiece);
        }
  
        setTimeout(() => {
          confettiContainer.remove();
        }, 5000); // Remove confetti after 5 seconds
      });
    }
  });
  
  // Confetti CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .confetti-piece {
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      background-color: randomColor();
      animation: fall linear infinite;
    }
  
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Random color function for confetti
  function randomColor() {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  